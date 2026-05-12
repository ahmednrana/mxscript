import * as vscode from 'vscode';
import * as path from 'path';
import { ConfigService } from '../Config/ConfigService';
import { Logger } from '../Logger/Logger';
import { MaximoClientProvider } from '../../client/client';
import { MaximoEnvironment } from '../../webview/EnvironmentManager';
import { SystemPropertyWebview } from '../../webview/SystemPropertyWebview';
import { showError, showWarning, showInformation } from '../../utils/utils';

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

/**
 * Serialise a key→value map to standard Java .properties format.
 * Comment lines starting with `#` are preserved as-is.
 */
function serializeProperties(
    props: Record<string, string | null>,
    header?: string
): string {
    const lines: string[] = [];
    if (header) {
        lines.push(header);
        lines.push('');
    }
    for (const [key, value] of Object.entries(props).sort(([a], [b]) => a.localeCompare(b))) {
        lines.push(`${key}=${value ?? ''}`);
    }
    return lines.join('\n');
}


/**
 * Parse a .properties text into a key→value record.
 * Skips blank lines and lines starting with `#`.
 * Values are single-line only.
 */
function parseProperties(text: string): Record<string, string> {
    const result: Record<string, string> = {};
    for (const rawLine of text.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith('#')) { continue; }
        const eqIdx = line.indexOf('=');
        if (eqIdx === -1) { continue; }
        const key = line.substring(0, eqIdx).trim();
        const value = line.substring(eqIdx + 1); // no trimming — values may have leading spaces
        if (key) { result[key] = value; }
    }
    return result;
}

/**
 * Derive the filename classification from a .properties basename (without extension).
 * Returns one of:
 *   { kind: 'all',      envPart: string }
 *   { kind: 'single',   envPart: string, propName: string }
 *   { kind: 'multiple', envPart: string }
 *   { kind: 'unknown' }
 */
type PropertiesFileKind =
    | { kind: 'all';      envPart: string }
    | { kind: 'single';   envPart: string; propName: string }
    | { kind: 'multiple'; envPart: string }
    | { kind: 'unknown' };

function classifyPropertiesFilename(baseName: string): PropertiesFileKind {
    // baseName is without extension, e.g. "DEV-all", "PROD-mxe.int.enableosauth", "TEST-multiple"
    const lower = baseName.toLowerCase();

    if (lower.endsWith('-all')) {
        return { kind: 'all', envPart: baseName.slice(0, -4) };
    }
    if (lower.endsWith('-multiple')) {
        return { kind: 'multiple', envPart: baseName.slice(0, -9) };
    }
    // Anything with a hyphen that isn't the above is treated as a single-property file
    const lastHyphen = baseName.lastIndexOf('-');
    if (lastHyphen > 0) {
        return {
            kind: 'single',
            envPart: baseName.substring(0, lastHyphen),
            propName: baseName.substring(lastHyphen + 1)
        };
    }
    return { kind: 'unknown' };
}

/** Sanitize a string so it can be used safely in a filename */
function sanitizeForFilename(s: string): string {
    return s.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_').slice(0, 80);
}

// ─────────────────────────────────────────────────────────────
// Service
// ─────────────────────────────────────────────────────────────

export class SystemPropertyService {
    private readonly context: vscode.ExtensionContext;
    private readonly configService: ConfigService;
    private readonly logger: Logger;

    constructor(context: vscode.ExtensionContext, configService: ConfigService) {
        this.context = context;
        this.configService = configService;
        this.logger = Logger.getInstance();
    }

    // ── private helpers ────────────────────────────────────────

    private getMaximoClient() {
        return MaximoClientProvider.getInstance().getClient();
    }

    /** Full basename (without extension) of the file in the active editor. */
    private getActiveBaseName(): string {
        const editor = vscode.window.activeTextEditor;
        if (!editor) { return ''; }
        const full = path.basename(editor.document.fileName);
        // strip the last extension
        const dotIdx = full.lastIndexOf('.');
        return dotIdx !== -1 ? full.substring(0, dotIdx) : full;
    }

    /** Text content of the active editor (saved first). */
    private getSource(): string {
        const editor = vscode.window.activeTextEditor;
        if (!editor) { return ''; }
        editor.document.save();
        return editor.document.getText();
    }

    // ── Methods ────────────────────────────────────────────────

    /**
     * UPLOAD — Push the open .properties file to the server (set each key=value).
     * Shows a confirmation warning before making any changes.
     */
    async upload(silent: boolean = false, targetEnvironment?: MaximoEnvironment): Promise<void> {
        try {
            this.logger.debug('Uploading system properties to server…');

            // Guard: only run on .properties files
            const editor = vscode.window.activeTextEditor;
            if (!editor || !editor.document.fileName.endsWith('.properties')) {
                showWarning('Please open a .properties file before uploading system properties.');
                return;
            }

            const source = this.getSource();
            if (!source || source.trim().length === 0) {
                showWarning('No content found in the active editor.');
                return;
            }

            const props = parseProperties(source);
            const keys = Object.keys(props);
            if (keys.length === 0) {
                showWarning('No key=value pairs found in the properties file.');
                return;
            }

            const client = targetEnvironment
                ? MaximoClientProvider.createClientFromEnvironment(targetEnvironment, this.logger)
                : this.getMaximoClient();
            const envName = targetEnvironment
                ? targetEnvironment.name
                : this.configService.getActiveEnvironmentName();
            const envUrl = targetEnvironment
                ? `${targetEnvironment.httpProtocol}://${targetEnvironment.hostname}:${targetEnvironment.port}`
                : this.configService.getUrl();

            // ── Confirmation ──────────────────
            if (!silent) {
                const confirmation = await vscode.window.showWarningMessage(
                    `This will update ${keys.length} system propert${keys.length === 1 ? 'y' : 'ies'} on "${envName}" [${envUrl}]. This cannot be undone.`,
                    'Update', 'Cancel'
                );
                if (confirmation !== 'Update') { return; }
            }

            const systemService = client.getSystemService();

            let successCount = 0;
            let failCount = 0;
            const errors: string[] = [];

            await vscode.window.withProgress(
                {
                    location: vscode.ProgressLocation.Notification,
                    title: `Uploading ${keys.length} properties to ${envName}`,
                    cancellable: true
                },
                async (progress, token) => {
                    progress.report({ increment: 0, message: 'Connecting…' });
                    const step = 100 / keys.length;

                    for (let i = 0; i < keys.length; i++) {
                        if (token.isCancellationRequested) { break; }
                        const key = keys[i];
                        const value = props[key];
                        progress.report({
                            increment: step,
                            message: `Setting ${key} (${i + 1}/${keys.length})`
                        });
                        try {
                            // setPropertyValue already performs live refresh internally
                            await systemService.setPropertyValue(key, value);
                            successCount++;
                        } catch (err) {
                            failCount++;
                            errors.push(`${key}: ${(err as Error).message}`);
                            this.logger.error(`Failed to set property ${key}: ${(err as Error).message}`);
                        }
                    }
                }
            );

            if (failCount === 0) {
                showInformation(
                    `Successfully uploaded ${successCount} system propert${successCount === 1 ? 'y' : 'ies'} to ${envName} [${envUrl}]`
                );
            } else {
                const detail = errors.slice(0, 5).join('\n') + (errors.length > 5 ? `\n…and ${errors.length - 5} more` : '');
                showError(
                    `Uploaded ${successCount} properties, but ${failCount} failed on ${envName}.\n${detail}`
                );
            }
        } catch (error) {
            showError(`Failed to upload system properties: ${(error as Error).message}`);
        }
    }

    /**
     * UPDATE — Download current values from the server and refresh the open .properties file.
     */
    async update(targetEnvironment?: MaximoEnvironment): Promise<void> {
        try {
            this.logger.debug('Updating open .properties file from server…');

            // Guard: only run on .properties files
            const editor = vscode.window.activeTextEditor;
            if (!editor || !editor.document.fileName.endsWith('.properties')) {
                showWarning('Please open a .properties file before updating from the server.');
                return;
            }

            const source = editor.document.getText();
            const localProps = parseProperties(source);
            const keys = Object.keys(localProps);
            if (keys.length === 0) {
                showWarning('No key=value pairs found in the open file to refresh.');
                return;
            }

            const client = targetEnvironment
                ? MaximoClientProvider.createClientFromEnvironment(targetEnvironment, this.logger)
                : this.getMaximoClient();
            const envName = targetEnvironment
                ? targetEnvironment.name
                : this.configService.getActiveEnvironmentName();
            const envUrl = targetEnvironment
                ? `${targetEnvironment.httpProtocol}://${targetEnvironment.hostname}:${targetEnvironment.port}`
                : this.configService.getUrl();

            const systemService = client.getSystemService();

            await vscode.window.withProgress(
                {
                    location: vscode.ProgressLocation.Notification,
                    title: `Refreshing ${keys.length} properties from ${envName}`,
                    cancellable: false
                },
                async (progress) => {
                    progress.report({ increment: 20, message: 'Fetching from server…' });
                    const serverValues = await systemService.getProperties(keys);
                    progress.report({ increment: 60, message: 'Updating file…' });

                    // Preserve the original header comments, replace only the data lines
                    const headerLines = source.split(/\r?\n/)
                        .filter(l => l.trim().startsWith('#') || l.trim() === '');
                    const header = headerLines.join('\n').trimEnd();

                    const newContent = header
                        ? header + '\n\n' + serializeProperties(serverValues)
                        : serializeProperties(serverValues);

                    const fullRange = new vscode.Range(
                        editor.document.positionAt(0),
                        editor.document.positionAt(editor.document.getText().length)
                    );
                    const wsEdit = new vscode.WorkspaceEdit();
                    wsEdit.replace(editor.document.uri, fullRange, newContent);
                    await vscode.workspace.applyEdit(wsEdit);
                    await editor.document.save();
                    progress.report({ increment: 20, message: 'Done.' });
                }
            );

            showInformation(`Refreshed ${keys.length} properties from ${envName} [${envUrl}]`);
        } catch (error) {
            showError(`Failed to update from server: ${(error as Error).message}`);
        }
    }

    /**
     * DOWNLOAD ALL — QuickPick: All / Single / Multiple.
     * Saves to a single .properties file in the workspace.
     */
    async downloadAll(): Promise<void> {
        try {
            this.logger.debug('Downloading system properties via picker…');

            if (!vscode.workspace.workspaceFolders) {
                showError('Please open a workspace or folder first.');
                return;
            }
            const rootFolder = vscode.workspace.workspaceFolders[0];
            const envName = sanitizeForFilename(this.configService.getActiveEnvironmentName() || 'env');
            const envUrl = this.configService.getUrl();
            const systemService = this.getMaximoClient().getSystemService();

            // ── Step 1: mode pick ──────────────────────────────
            const mode = await vscode.window.showQuickPick(
                [
                    { label: 'All', description: 'Download all system properties from the server into one file' },
                    { label: 'Multiple', description: 'Pick one or more properties to download into one file' },
                    { label: 'View / Edit', description: 'Interactive viewer to search, edit, compare and export all system properties' }
                ],
                { placeHolder: 'Which properties do you want to download?' }
            );
            if (!mode) { return; }

            if (mode.label === 'View / Edit') {
                await this.viewProperties();
                return;
            }

            // ── Step 2: fetch the full property-name list (needed for Single/Multiple) ──
            let allNames: string[] | undefined;
            if (mode.label !== 'All') {
                const qp = vscode.window.createQuickPick<vscode.QuickPickItem>();
                qp.canSelectMany = true;
                qp.ignoreFocusOut = true;
                qp.busy = true;
                qp.placeholder = `Loading property list from ${this.configService.getActiveEnvironmentName()}…`;
                qp.show();

                let wasHidden = false;
                qp.onDidHide(() => { wasHidden = true; });

                try {
                    allNames = await systemService.getAllPropertyNames();
                } catch (err) {
                    qp.hide();
                    qp.dispose();
                    showError(`Failed to fetch property list: ${(err as Error).message}`);
                    return;
                }

                if (wasHidden) { qp.dispose(); return; }
                if (!allNames || allNames.length === 0) {
                    qp.hide(); qp.dispose();
                    showWarning(`No system properties found on ${this.configService.getActiveEnvironmentName()}.`);
                    return;
                }

                qp.busy = false;
                qp.placeholder = `Found ${allNames.length} properties — select one or more`;
                qp.items = allNames.map(n => ({ label: n }));

                const chosen = await new Promise<vscode.QuickPickItem[] | undefined>(resolve => {
                    qp.onDidAccept(() => { resolve([...qp.selectedItems]); qp.hide(); qp.dispose(); });
                    qp.onDidHide(() => { resolve(undefined); qp.dispose(); });
                });

                if (!chosen || chosen.length === 0) { return; }

                const selectedNames = chosen.map(i => i.label);
                // If the user selected every property (e.g. via select-all checkbox),
                // treat it the same as the "All" mode and use the -all filename.
                const selectedAll = allNames !== undefined && selectedNames.length === allNames.length;

                // Compute filename before showing the folder picker so the user sees it
                let fileName: string;
                if (selectedAll) {
                    fileName = `sysprops-${envName}-all.properties`;
                } else if (selectedNames.length === 1) {
                    fileName = `sysprops-${envName}-${sanitizeForFilename(selectedNames[0])}.properties`;
                } else {
                    fileName = `sysprops-${envName}-multiple.properties`;
                }

                // ── Step 3: save dialog (user can edit filename, OS warns on overwrite) ──
                const fileUri = await vscode.window.showSaveDialog({
                    defaultUri: vscode.Uri.joinPath(rootFolder.uri, fileName),
                    filters: { 'Properties files': ['properties'], 'All files': ['*'] },
                    title: `Save system properties (${selectedNames.length} props from ${envName})`
                });
                if (!fileUri) { return; }

                await vscode.window.withProgress(
                    {
                        location: vscode.ProgressLocation.Notification,
                        title: `Downloading ${selectedNames.length} properties from ${envName}`,
                        cancellable: false
                    },
                    async (progress) => {
                        progress.report({ increment: 10, message: 'Fetching values…' });
                        const values = await systemService.getProperties(selectedNames);
                        progress.report({ increment: 60, message: `Writing ${path.basename(fileUri.fsPath)}…` });

                        const header =
                            `# Downloaded from: ${envName} [${envUrl}]\n` +
                            `# Date: ${new Date().toISOString()}\n` +
                            `# Properties: ${selectedNames.length}`;
                        const content = serializeProperties(values, header);
                        await vscode.workspace.fs.writeFile(fileUri, Buffer.from(content, 'utf8'));
                        progress.report({ increment: 30, message: 'Done.' });

                        showInformation(`Saved ${selectedNames.length} properties to ${fileUri.fsPath}`);
                        await vscode.window.showTextDocument(fileUri);
                    }
                );
                return;
            }

            // ── Mode: All ──────────────────────────────────────────
            const allFileName = `sysprops-${envName}-all.properties`;
            const allFileUri = await vscode.window.showSaveDialog({
                defaultUri: vscode.Uri.joinPath(rootFolder.uri, allFileName),
                filters: { 'Properties files': ['properties'], 'All files': ['*'] },
                title: `Save all system properties from ${envName}`
            });
            if (!allFileUri) { return; }

            await vscode.window.withProgress(
                {
                    location: vscode.ProgressLocation.Notification,
                    title: `Downloading all system properties from ${envName}`,
                    cancellable: false
                },
                async (progress) => {
                    progress.report({ increment: 10, message: 'Fetching property names…' });
                    const names = await systemService.getAllPropertyNames();
                    if (!names || names.length === 0) {
                        showWarning('No system properties found on the server.');
                        return;
                    }
                    progress.report({ increment: 20, message: `Fetching values for ${names.length} properties…` });
                    const values = await systemService.getProperties(names);
                    progress.report({ increment: 60, message: `Writing ${path.basename(allFileUri.fsPath)}…` });

                    const header =
                        `# Downloaded from: ${envName} [${envUrl}]\n` +
                        `# Date: ${new Date().toISOString()}\n` +
                        `# Total: ${names.length} properties`;
                    const content = serializeProperties(values, header);
                    await vscode.workspace.fs.writeFile(allFileUri, Buffer.from(content, 'utf8'));
                    progress.report({ increment: 10, message: 'Done.' });

                    showInformation(`Saved ${names.length} properties to ${allFileUri.fsPath}`);
                    await vscode.window.showTextDocument(allFileUri);
                }
            );
        } catch (error) {
            showError(`Failed to download system properties: ${(error as Error).message}`);
        }
    }

    /**
     * COMPARE WITH SERVER — context-aware diff based on filename.
     */
    async compareWithServer(): Promise<void> {
        await this._compare(undefined);
    }

    /**
     * COMPARE WITH ENVIRONMENT — context-aware diff against a selected environment.
     */
    async compareWithEnvironment(environment: MaximoEnvironment): Promise<void> {
        await this._compare(environment);
    }

    /** Shared compare implementation. */
    private async _compare(targetEnvironment?: MaximoEnvironment): Promise<void> {
        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor || !editor.document.fileName.endsWith('.properties')) {
                showWarning('Please open a .properties file to compare.');
                return;
            }

            const baseName = this.getActiveBaseName();
            const localText = editor.document.getText();
            const localProps = parseProperties(localText);
            const localKeys = Object.keys(localProps);

            if (localKeys.length === 0) {
                showWarning('No key=value pairs found in the local file to compare.');
                return;
            }

            const client = targetEnvironment
                ? MaximoClientProvider.createClientFromEnvironment(targetEnvironment, this.logger)
                : this.getMaximoClient();
            const envLabel = targetEnvironment
                ? targetEnvironment.name
                : this.configService.getActiveEnvironmentName();

            // ── Ask the user which comparison mode they want ────────────────
            const mode = await vscode.window.showQuickPick(
                [
                    {
                        label: '$(list-filter) Matching keys only',
                        description: `Compare the ${localKeys.length} local keys against their current values on ${envLabel}`,
                        detail: 'Only shows value differences for properties that exist in both the local file and the server.',
                        id: 'scoped'
                    },
                    {
                        label: '$(server) All server properties',
                        description: `Fetch every property from ${envLabel} and compare against the local file`,
                        detail: 'Shows value differences AND highlights properties that exist only on the server or only locally.',
                        id: 'full'
                    }
                ] as (vscode.QuickPickItem & { id: string })[],
                {
                    placeHolder: 'How do you want to compare?',
                    matchOnDescription: true,
                    matchOnDetail: true
                }
            );
            if (!mode) { return; }

            const systemService = client.getSystemService();
            let serverText: string;

            if (mode.id === 'full') {
                // Full compare: fetch ALL properties from server
                await vscode.window.withProgress(
                    {
                        location: vscode.ProgressLocation.Notification,
                        title: `Fetching all properties from ${envLabel}…`,
                        cancellable: false
                    },
                    async (progress) => {
                        progress.report({ increment: 20, message: 'Getting property names…' });
                        const names = await systemService.getAllPropertyNames();
                        progress.report({ increment: 40, message: `Fetching ${names.length} values…` });
                        const values = await systemService.getProperties(names);
                        progress.report({ increment: 40, message: 'Preparing diff…' });
                        serverText = serializeProperties(values);
                    }
                );
            } else {
                // Scoped compare: fetch only the keys present in the local file
                await vscode.window.withProgress(
                    {
                        location: vscode.ProgressLocation.Notification,
                        title: `Fetching ${localKeys.length} properties from ${envLabel}…`,
                        cancellable: false
                    },
                    async (progress) => {
                        progress.report({ increment: 30, message: 'Fetching values…' });
                        const values = await systemService.getProperties(localKeys);
                        progress.report({ increment: 70, message: 'Preparing diff…' });
                        serverText = serializeProperties(values);
                    }
                );
            }

            // Strip comments/blanks from local side so both sides are pure key=value
            const localStripped = serializeProperties(localProps);

            const localUri  = vscode.Uri.parse('mxscript:' + encodeURIComponent(localStripped));
            const serverUri = vscode.Uri.parse('mxscript:' + encodeURIComponent(serverText!));
            const modeLabel = mode.id === 'full' ? 'All server props' : 'Matching keys';
            const title = `${baseName} (Local) ↔ ${envLabel} [${modeLabel}]`;
            await vscode.commands.executeCommand('vscode.diff', localUri, serverUri, title);
        } catch (error) {
            showError(`Failed to compare system properties: ${(error as Error).message}`);
        }
    }

    /**
     * DELETE — System properties cannot be deleted; show a clear error.
     */
    async delete(_silent?: boolean): Promise<void> {
        showError('System properties cannot be deleted from VS Code.');
    }

    /**
     * OPEN IN MAXIMO — Opens the System Properties application in the browser.
     */
    async openInMaximo(arg?: any): Promise<void> {
        try {
            const { extractEnvironmentFromItem, getActiveMaximoEnvironment } = await import('../../utils/utils');
            let env = extractEnvironmentFromItem(arg);
            if (!env) {
                env = getActiveMaximoEnvironment(this.context);
            }
            if (!env) {
                showWarning('Could not resolve active environment.');
                return;
            }

            const client = MaximoClientProvider.createClientFromEnvironment(env, this.logger);
            const url = client.getWebUrl({ value: 'PROPMAINT' });

            const { openBrowserWithChoice } = await import('../../utils/browserUtils');
            await openBrowserWithChoice(url, env, this.context);
        } catch (error) {
            showError(`Failed to open in Maximo: ${(error as Error).message}`);
        }
    }
    /**
     * VIEW PROPERTIES — Fetches all properties and their values, then presents a searchable QuickPick.
     */
    async viewProperties(): Promise<void> {
        try {
            const client = this.getMaximoClient();
            const systemService = client.getSystemService();
            const envName = this.configService.getActiveEnvironmentName() || 'Maximo';

            await vscode.window.withProgress(
                {
                    location: vscode.ProgressLocation.Notification,
                    title: `Fetching properties from ${envName}`,
                    cancellable: false
                },
                async (progress) => {
                    progress.report({ increment: 10, message: 'Fetching property names…' });
                    const names = await systemService.getAllPropertyNames();
                    if (!names || names.length === 0) {
                        showWarning('No properties found on the server.');
                        return;
                    }

                    progress.report({ increment: 20, message: `Fetching values for ${names.length} properties…` });
                    const valuesMap = await systemService.getProperties(names);
                    
                    progress.report({ increment: 60, message: 'Opening interactive viewer…' });
                    SystemPropertyWebview.show(
                        this.context, 
                        valuesMap as Record<string, string>, 
                        envName,
                        async (changes) => {
                            // This runs when the user clicks "Push" in the webview
                            await this._handleWebviewPush(changes, envName);
                            
                            // Refresh the webview data after a successful push
                            const refreshed = await systemService.getProperties(Object.keys(valuesMap));
                            SystemPropertyWebview.show(this.context, refreshed as Record<string, string>, envName);
                        },
                        async (key) => {
                            // This runs when the user clicks "Live Refresh" icon in the webview
                            try {
                                await vscode.window.withProgress(
                                    { location: vscode.ProgressLocation.Notification, title: `Refreshing ${key}...` },
                                    async () => {
                                        await systemService.liveRefreshProperty(key);
                                        // Also fetch the value again in case it changed
                                        const newVal = await systemService.getPropertyValue(key);
                                        const currentProps = { ...valuesMap, [key]: newVal };
                                        SystemPropertyWebview.show(this.context, currentProps as Record<string, string>, envName);
                                    }
                                );
                                showInformation(`Successfully refreshed property: ${key}`);
                            } catch (error) {
                                showError(`Failed to refresh property ${key}: ${(error as Error).message}`);
                            }
                        },
                        async () => {
                            // This runs when the user clicks "Compare" in the webview
                            const globalEnvs = this.context.globalState.get<any[]>('mxscript.environments', []);
                            const workspaceEnvs = this.context.workspaceState.get<any[]>('mxscript.environments', []);
                            const allEnvs = [...globalEnvs, ...workspaceEnvs];
                            
                            // Filter out current env if possible (envName comparison)
                            const otherEnvs = allEnvs.filter(e => e.name !== envName);
                            
                            if (otherEnvs.length === 0) {
                                showWarning("No other environments found to compare with.");
                                return;
                            }

                            const selected = await vscode.window.showQuickPick(
                                otherEnvs.map(e => ({ label: e.name, description: `${e.hostname}`, env: e })),
                                { placeHolder: "Select environment to compare with" }
                            );

                            if (selected) {
                                try {
                                    await vscode.window.withProgress(
                                        { location: vscode.ProgressLocation.Notification, title: `Comparing with ${selected.label}...` },
                                        async () => {
                                            const otherClient = MaximoClientProvider.createClientFromEnvironment(selected.env, Logger.getInstance());
                                            const otherSystemService = otherClient.getSystemService();
                                            
                                            // Fetch ALL properties from the other system
                                            const otherNames = await otherSystemService.getAllPropertyNames();
                                            const otherProps = await otherSystemService.getProperties(otherNames);
                                            const otherValuesMap = otherProps as Record<string, string>;
                                            
                                            // Get union of keys
                                            const allKeys = new Set([...Object.keys(valuesMap), ...Object.keys(otherValuesMap)]);
                                            
                                            // Update the webview's base property list to include keys missing in A
                                            const unionValuesMap: Record<string, string | null> = {};
                                            allKeys.forEach(key => {
                                                unionValuesMap[key] = valuesMap[key] ?? null;
                                            });

                                            // Re-send current properties (union) so they show up in the table
                                            SystemPropertyWebview.show(this.context, unionValuesMap as any, envName);
                                            
                                            // Send comparison data
                                            SystemPropertyWebview.sendComparison(otherValuesMap, selected.label);
                                        }
                                    );
                                } catch (error) {
                                    showError(`Failed to fetch comparison data: ${(error as Error).message}`);
                                }
                            }
                        },
                        async (exportProps) => {
                            // This runs when the user clicks "Export Properties" in the webview
                            const rootFolder = vscode.workspace.workspaceFolders?.[0];
                            const defaultUri = rootFolder 
                                ? vscode.Uri.joinPath(rootFolder.uri, `sysprops-${sanitizeForFilename(envName)}-all.properties`)
                                : undefined;

                            const fileUri = await vscode.window.showSaveDialog({
                                defaultUri,
                                filters: { 'Properties files': ['properties', 'props'], 'All files': ['*'] },
                                title: `Export system properties from ${envName}`
                            });

                            if (fileUri) {
                                const header = `# Exported from: ${envName} [${this.configService.getUrl()}]\n# Date: ${new Date().toISOString()}`;
                                const content = serializeProperties(exportProps, header);
                                await vscode.workspace.fs.writeFile(fileUri, Buffer.from(content, 'utf8'));
                                showInformation(`Successfully exported properties to ${fileUri.fsPath}`);
                                await vscode.window.showTextDocument(fileUri);
                            }
                        }
                    );
                    progress.report({ increment: 10, message: 'Done.' });
                }
            );
        } catch (error) {
            showError(`Failed to open properties viewer: ${(error as Error).message}`);
        }
    }

    /**
     * Internal helper to push changes from webview to server with progress.
     */
    private async _handleWebviewPush(changes: Record<string, string>, envName: string): Promise<void> {
        const keys = Object.keys(changes);
        const systemService = this.getMaximoClient().getSystemService();

        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: `Updating ${keys.length} properties on ${envName}`,
                cancellable: false
            },
            async (progress) => {
                let successCount = 0;
                let failCount = 0;
                const errors: string[] = [];
                const step = 100 / keys.length;

                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const value = changes[key];
                    progress.report({
                        increment: step,
                        message: `Updating ${key} (${i + 1}/${keys.length})`
                    });

                    try {
                        await systemService.setPropertyValue(key, value);
                        successCount++;
                    } catch (err) {
                        failCount++;
                        errors.push(`${key}: ${(err as Error).message}`);
                    }
                }

                if (failCount === 0) {
                    showInformation(`Successfully updated ${successCount} properties on ${envName}.`);
                } else {
                    const detail = errors.slice(0, 5).join('\n') + (errors.length > 5 ? `\n…and ${errors.length - 5} more` : '');
                    showError(`Updated ${successCount} properties, but ${failCount} failed.\n${detail}`);
                    throw new Error('Some updates failed');
                }
            }
        );
    }
}
