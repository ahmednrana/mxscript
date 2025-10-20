import * as vscode from 'vscode';
import { CacheService } from 'maximo-api-client';
import { MaximoClientProvider } from '../../client/client';
import { ConfigService } from '../Config/ConfigService';
import { Logger } from '../Logger/Logger';
import { showError, showInformation, showWarning } from '../../utils/utils';

interface CacheQuickPickItem extends vscode.QuickPickItem {
    value?: string;
    selectAll?: boolean;
}

interface CacheRefreshResult {
    name: string;
    success: boolean;
    error?: Error;
}

/**
 * Handles the Refresh Maximo Cache workflow, including environment detection
 * and invoking the Maximo cache API for the selected cache entries.
 */
export class CacheRefreshService {
    private readonly logger: Logger;

    private readonly manageCacheOptions: readonly string[] = [
        'EXPFUNC', 'MASPRODANDAPP', 'ATTRFORM', 'MASLIMAPPINFO', 'OSLCROUTES', 'WFMBONAME', 'AUTOLOCATECONFIG',
        'REPORTEXPVALUE', 'LookupKeyMap', 'CLASSDATA', 'GUESTTRUST', 'INSIGHT', 'LICPRDKEY', 'SIGNATURE',
        'MAXPROP', 'REPORTDATASOURCE', 'AHMETHODOLOGY', 'IMGLIB', 'PRODAPP', 'MASPRODAPPANDOPT', 'APILINKRES',
        'APPPAGE', 'SCRIPTWARN', 'MPFORMULA', 'NUMDATA', 'dpamswusagerange', 'THREADLOG', 'GEOMCONFIG',
        'ADMINMODE', 'DOMAINCACHE', 'OSLCDOMAIN', 'MAXIMODD', 'ROUTER', 'CTRLCONDPROP', 'MAPMANAGERCONFIG',
        'AICFG', 'MaxConditionCache', 'UITEXTDATA', 'MAXIFACEIN', 'MAXIMOMLDD', 'MAXIMOMOBILE', 'DMCEMGR',
        'REPORTATACHUNCPATH', 'PLGCOUNT', 'PRESENTATION', 'SCRIPT', 'OSEVENT', 'OSLCRES', 'MAXENDPOINT',
        'SYNDATA', 'ALNDATA', 'MAXLAUNCHENTRY', 'SET', 'OBJFORM', 'AUTOKEYCACHE', 'BMARK', 'PLG', 'OSLCACT',
        'DMEVENTLISTENERMGR', 'MAXRECORDLOCKCACHE', 'RESTSYSACT', 'AUTOINIT', 'OSNOTF', 'RAUTH',
        'EventListenerRegistration', 'SKDDD', 'BBOARDCACHE', 'OSLCBUS', 'MAXVARS', 'MAXLOGGERCACHE', 'MAXSVC',
        'MAXMESSAGECACHE', 'SITE', 'MGUESTAPIKEY', 'FILEEXTENSION', 'MAXDOMAIN', 'OBJECTAPPAUTH', 'INTLISTENER',
        'INTOBJECT', 'PUBENGINE', 'REPORTEMAILFILE', 'OSDESC', 'OSLCERR', 'OSLCMAP', 'DataRestriction',
        'MaxDomValConditionCache'
    ];

    private readonly classicCacheOptions: readonly string[] = [
        'EXPFUNC', 'MASPRODANDAPP', 'ATTRFORM', 'MASLIMAPPINFO', 'OSLCROUTES', 'WFMBONAME', 'REPORTEXPVALUE',
        'LookupKeyMap', 'CLASSDATA', 'INSIGHT', 'SIGNATURE', 'MAXPROP', 'REPORTDATASOURCE', 'IMGLIB',
        'MASPRODAPPANDOPT', 'APILINKRES', 'NUMDATA', 'dpamswusagerange', 'THREADLOG', 'GEOMCONFIG', 'ADMINMODE',
        'DOMAINCACHE', 'OSLCDOMAIN', 'MAXIMODD', 'GQS', 'CTRLCONDPROP', 'MaxConditionCache', 'UITEXTDATA',
        'MAXIFACEIN', 'MAXIMOMLDD', 'DMCEMGR', 'REPORTATACHUNCPATH', 'PRESENTATION', 'SCRIPT', 'OSEVENT',
        'OSLCRES', 'SYNDATA', 'ALNDATA', 'SET', 'OBJFORM', 'AUTOKEYCACHE', 'BMARK', 'OSLCACT',
        'DMEVENTLISTENERMGR', 'MAXRECORDLOCKCACHE', 'AUTOINIT', 'OSNOTF', 'RAUTH', 'EventListenerRegistration',
        'SKDDD', 'BBOARDCACHE', 'MAXVARS', 'MAXLOGGERCACHE', 'MAXSVC', 'MAXMESSAGECACHE', 'SITE', 'MAXDOMAIN',
        'OBJECTAPPAUTH', 'INTLISTENER', 'INTOBJECT', 'PUBENGINE', 'REPORTEMAILFILE', 'OSLCERR', 'OSLCMAP',
        'DataRestriction', 'MaxDomValConditionCache'
    ];

    constructor(private readonly _context: vscode.ExtensionContext, private configService: ConfigService = new ConfigService()) {
        this.logger = Logger.getInstance();
    }

    /**
    * Gets the MaximoClient instance from the singleton wrapper
    * @returns The MaximoClient instance
    * @private
    */
    private getMaximoClient() {
        // Get client from the singleton wrapper
        return MaximoClientProvider.getInstance().getClient();
    }

    /**
     * Determines the cache options for the active environment, prompts the user,
     * and triggers the refresh for the selected cache entries.
     */
    public async refreshCaches(): Promise<void> {
        try {
            this.logger.debug('Starting cache refresh workflow...');
            const client = this.getMaximoClient();
            const environmentName = this.configService.getActiveEnvironmentName() || 'Active Environment';
            this.logger.debug(`Active environment for cache refresh: ${environmentName}`);

            let isManageInstance = false;
            try {
                const response = await client.getSystemService().isManage();
                isManageInstance = Boolean(response);
                this.logger.debug(`Detected environment type: ${isManageInstance ? 'Manage' : 'Classic Maximo'}`);
            } catch (detectError) {
                const message = detectError instanceof Error ? detectError.message : String(detectError);
                this.logger.warn(`Unable to determine environment type via system service: ${message}`);
            }

            const cacheOptions = isManageInstance ? this.manageCacheOptions : this.classicCacheOptions;
            if (cacheOptions.length === 0) {
                showWarning('No cache entries are configured for this environment.');
                return;
            }

            const selected = await this.promptForCaches(cacheOptions, isManageInstance);
            if (!selected || selected.length === 0) {
                showWarning('Cache refresh cancelled. No caches were selected.');
                return;
            }

            const results = await this.refreshSelectedCaches(selected);
            const failures = results.filter(r => !r.success);
            const successCount = results.length - failures.length;

            if (failures.length === 0) {
                const suffix = successCount === 1 ? '' : 's';
                showInformation(`Successfully refreshed ${successCount} cache${suffix}.`);
                return;
            }

            const failedNames = failures.map(f => f.name).join(', ');
            const successSuffix = successCount === 1 ? '' : 's';

            if (successCount > 0) {
                showWarning(`Refreshed ${successCount} cache${successSuffix}, but failed for: ${failedNames}.`);
            } else {
                showError(`Failed to refresh selected caches: ${failedNames}.`);
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            this.logger.error(`Cache refresh workflow failed: ${message}`);
            showError(`Failed to refresh caches: ${message}`);
        }
    }

    /**
     * Presents a multi-select quick pick to choose cache entries to refresh.
     */
    private async promptForCaches(caches: readonly string[], isManage: boolean): Promise<string[] | undefined> {
        const title = 'Refresh Maximo Cache';
        const placeHolder = isManage
            ? 'Select Manage caches to refresh'
            : 'Select caches to refresh';

        const items: CacheQuickPickItem[] = [
            // {
            //     label: '$(check-all) Select All',
            //     description: 'Refresh every cache in this list',
            //     selectAll: true
            // },
            ...caches.map(cacheName => ({
                label: cacheName,
                value: cacheName
            }))
        ];

        const picks = await vscode.window.showQuickPick(items, {
            canPickMany: true,
            title,
            placeHolder,
            ignoreFocusOut: true
        });

        if (!picks) {
            return undefined;
        }

        if (picks.some(pick => pick.selectAll)) {
            return [...new Set(caches)];
        }

        return picks
            .filter(pick => Boolean(pick.value))
            .map(pick => pick.value!)
            .filter((value, index, self) => self.indexOf(value) === index);
    }

    /**
     * Invokes the cache refresh API for each selected cache and reports progress to the user.
     */
    private async refreshSelectedCaches(cacheNames: string[]): Promise<CacheRefreshResult[]> {
        const results: CacheRefreshResult[] = [];
        const total = cacheNames.length || 1;

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Refreshing ${cacheNames.length} cache${cacheNames.length === 1 ? '' : 's'}`,
            cancellable: false
        }, async (progress) => {
            const increment = Math.max(1, Math.floor(100 / total));

            for (let index = 0; index < cacheNames.length; index++) {
                const cacheName = cacheNames[index];
                progress.report({
                    increment,
                    message: `Refreshing ${cacheName} (${index + 1}/${cacheNames.length})`
                });

                try {
                    await CacheService.refreshCache(cacheName);
                    this.logger.debug(`Refreshed cache: ${cacheName}`);
                    results.push({ name: cacheName, success: true });
                } catch (err) {
                    const message = err instanceof Error ? err.message : String(err);
                    this.logger.error(`Failed to refresh cache ${cacheName}: ${message}`);
                    results.push({
                        name: cacheName,
                        success: false,
                        error: err instanceof Error ? err : new Error(message)
                    });
                }
            }
        });

        return results;
    }

}
