import * as vscode from 'vscode';
import { MaximoEnvironment } from '../webview/EnvironmentManager';
import { MaximoClientProvider } from '../client/client';

/**
 * TreeItem representing a Maximo environment
 */
export class MaximoEnvironmentTreeItem extends vscode.TreeItem {
    constructor(
        public readonly environment: MaximoEnvironment,
        public readonly isActive: boolean
    ) {
        super(environment.name, vscode.TreeItemCollapsibleState.None);

        // Set different icons based on active state and scope
        if (this.isActive) {
            const fileIcon = new vscode.ThemeIcon('file');
            this.iconPath = new vscode.ThemeIcon('radio-tower');
        } else if (environment.scope === 'global') {
            this.iconPath = new vscode.ThemeIcon('globe');
        } else {
            // Use a more reliable icon for workspace level environments
            this.iconPath = new vscode.ThemeIcon('symbol-folder');
        }

        // Set context value for context menu filtering
        this.contextValue = isActive ? 'activeEnvironment' : 'environment';

        // Add description that shows in the tree
        this.description = `${environment.httpProtocol}://${environment.hostname}:${environment.port}`;

        // Add detailed tooltip
        this.tooltip = `${environment.name} (${environment.scope})
URL: ${environment.httpProtocol}://${environment.hostname}:${environment.port}
Auth: ${environment.authenticationType}
Object Structure: ${environment.objectStructure}`;
    }
}

/**
 * TreeView provider for Maximo environments
 */
export class MaximoEnvironmentTreeProvider implements vscode.TreeDataProvider<MaximoEnvironmentTreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<MaximoEnvironmentTreeItem | undefined | null | void> = new vscode.EventEmitter<MaximoEnvironmentTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<MaximoEnvironmentTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

    constructor(private readonly _context: vscode.ExtensionContext) { }

    /**
     * Refresh the tree view
     */
    public refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    /**
     * Get the tree item for a given element
     */
    getTreeItem(element: MaximoEnvironmentTreeItem): vscode.TreeItem {
        return element;
    }

    /**
     * Get children of a tree item
     */
    getChildren(element?: MaximoEnvironmentTreeItem): Thenable<MaximoEnvironmentTreeItem[]> {
        if (element) {
            // No children for environment items
            return Promise.resolve([]);
        }

        // Get environments from extension state
        const globalEnvs = this._context.globalState.get<MaximoEnvironment[]>('mxscript.environments', []);
        const workspaceEnvs = this._context.workspaceState.get<MaximoEnvironment[]>('mxscript.environments', []);
        const environments = [...globalEnvs, ...workspaceEnvs];

        // Get active environment
        const activeEnvId = this._context.globalState.get<string>('mxscript.activeEnvironment');

        // Create tree items for each environment
        const items = environments.map(env =>
            new MaximoEnvironmentTreeItem(env, env.id === activeEnvId)
        );

        // Sort: active first, then alphabetically
        items.sort((a, b) => {
            if (a.isActive && !b.isActive) return -1;
            if (!a.isActive && b.isActive) return 1;
            return a.environment.name.localeCompare(b.environment.name);
        });

        return Promise.resolve(items);
    }

    /**
     * Set an environment as active
     */
    async setActiveEnvironment(environmentId: string | undefined, silent: boolean = false): Promise<void> {
        // Save active environment ID
        await this._context.globalState.update('mxscript.activeEnvironment', environmentId);

        // Get the environment details
        const globalEnvs = this._context.globalState.get<MaximoEnvironment[]>('mxscript.environments', []);
        const workspaceEnvs = this._context.workspaceState.get<MaximoEnvironment[]>('mxscript.environments', []);
        const environments = [...globalEnvs, ...workspaceEnvs];
        const environment = environments.find(env => env.id === environmentId);

        const config = vscode.workspace.getConfiguration('mxscript');
        const updatePromises: Thenable<any>[] = [];

        if (environment) {
            // Apply settings to VSCode configuration (collect promises and await them)
            updatePromises.push(config.update('serverSettings.hostname', environment.hostname, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('serverSettings.port', environment.port, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('authentication.username', environment.username, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('authentication.password', environment.password, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('authentication.apikey', environment.apikey, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('authentication.authenticationType', environment.authenticationType, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('serverSettings.objectStructure', environment.objectStructure, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('serverSettings.httpProtocol', environment.httpProtocol, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('scriptSettings.createPythonFileForJythonScripts', environment.createPythonFileForJythonScripts, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('scriptSettings.logLevel', environment.logLevel, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('scriptSettings.ignoresslerrors', environment.ignoreSslErrors, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('serverSettings.activeEnvironmentName', environment.name, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('appxml.formatOnDownloadAndCompare', environment.formatXmlOnDownloadAndCompare, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('scriptSettings.sslcertificate', environment.sslcertificate, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('appxml.objectStructure', environment.appxml_objectStructure, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('condition.objectStructure', environment.condition_objectStructure, vscode.ConfigurationTarget.Workspace));

            // Wait for configuration updates to complete before reinitializing client and updating UI
            try {
                await Promise.all(updatePromises);
            } catch (err) {
                console.warn('Error applying workspace configuration for active environment', err);
            }

            // Reinitialize the Maximo client with new environment settings
            try {
                MaximoClientProvider.forceReinitializeClient(environment);
            } catch (error) {
                console.warn('MaximoClientProvider not initialized yet, client will be initialized when needed');
            }

            if (!silent) {
                vscode.window.showInformationMessage(`Switched to Maximo environment: ${environment.name}`);
            }
        } else {
            // No environment found or ID is undefined, so clear the settings
            updatePromises.push(config.update('serverSettings.hostname', undefined, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('serverSettings.port', undefined, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('authentication.username', undefined, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('authentication.password', undefined, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('authentication.apikey', undefined, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('authentication.authenticationType', undefined, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('serverSettings.objectStructure', undefined, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('serverSettings.httpProtocol', undefined, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('scriptSettings.createPythonFileForJythonScripts', undefined, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('scriptSettings.logLevel', undefined, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('scriptSettings.ignoresslerrors', undefined, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('serverSettings.activeEnvironmentName', undefined, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('appxml.formatOnDownloadAndCompare', undefined, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('scriptSettings.sslcertificate', undefined, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('appxml.objectStructure', undefined, vscode.ConfigurationTarget.Workspace));
            updatePromises.push(config.update('condition.objectStructure', undefined, vscode.ConfigurationTarget.Workspace));

            try {
                await Promise.all(updatePromises);
            } catch (err) {
                console.warn('Error clearing workspace configuration for active environment', err);
            }
        }

        // Refresh the tree view
        this.refresh();
        // Tell the extension to update its status bar (keeps UI decoupled)
        try {
            await vscode.commands.executeCommand('mxscript.updateStatusBar');
        } catch (e) {
            // ignore if command not registered yet
        }
    }

    /**
     * Delete an environment
     */
    async deleteEnvironment(environmentId: string): Promise<void> {
        // Get environments
        const globalEnvs = this._context.globalState.get<MaximoEnvironment[]>('mxscript.environments', []);
        const workspaceEnvs = this._context.workspaceState.get<MaximoEnvironment[]>('mxscript.environments', []);

        // Find environment
        const globalIndex = globalEnvs.findIndex(env => env.id === environmentId);
        const workspaceIndex = workspaceEnvs.findIndex(env => env.id === environmentId);

        let deletedEnv: MaximoEnvironment | undefined;

        // Remove from appropriate store
        if (globalIndex !== -1) {
            deletedEnv = globalEnvs[globalIndex];
            globalEnvs.splice(globalIndex, 1);
            this._context.globalState.update('mxscript.environments', globalEnvs);
        } else if (workspaceIndex !== -1) {
            deletedEnv = workspaceEnvs[workspaceIndex];
            workspaceEnvs.splice(workspaceIndex, 1);
            this._context.workspaceState.update('mxscript.environments', workspaceEnvs);
        }

        // Check if active environment was deleted
        const activeEnvId = this._context.globalState.get<string>('mxscript.activeEnvironment');
        if (activeEnvId === environmentId) {
            // Delegate to setActiveEnvironment which will persist and update UI
            await this.setActiveEnvironment(undefined, true); // Clear active settings silently
        }

        // Show notification
        if (deletedEnv) {
            vscode.window.showInformationMessage(`Deleted Maximo environment: ${deletedEnv.name}`);
        }

        // Refresh the tree view
        this.refresh();
    }

    /**
     * Open WebView to edit an environment
     */
    editEnvironment(environmentId: string): void {
        // Get environments
        const globalEnvs = this._context.globalState.get<MaximoEnvironment[]>('mxscript.environments', []);
        const workspaceEnvs = this._context.workspaceState.get<MaximoEnvironment[]>('mxscript.environments', []);
        const environments = [...globalEnvs, ...workspaceEnvs];

        // Find the environment
        const environment = environments.find(env => env.id === environmentId);

        if (environment) {
            // Open the editor webview in the main editor area
            vscode.commands.executeCommand('mxscript.environments.edit', environment);
        }
    }

    /**
     * Open WebView to add a new environment
     */
    addEnvironment(): void {
        // Open the editor webview in the main editor area
        vscode.commands.executeCommand('mxscript.environments.add');
    }

    /**
     * Gets all environments from both global and workspace state
     * @returns Array of all available Maximo environments
     */
    public getEnvironments(): MaximoEnvironment[] {
        // Get environments from both global and workspace state
        const globalEnvs = this._context.globalState.get<MaximoEnvironment[]>('mxscript.environments', []);
        const workspaceEnvs = this._context.workspaceState.get<MaximoEnvironment[]>('mxscript.environments', []);

        // Combine both arrays
        return [...globalEnvs, ...workspaceEnvs];
    }

    /**
     * Export environments to a JSON file
     */
    async exportEnvironments(): Promise<void> {
        const environments = this.getEnvironments();
        if (environments.length === 0) {
            vscode.window.showInformationMessage('No environments to export.');
            return;
        }

        // Ask user if they want to export credentials
        const exportCredentials = await vscode.window.showQuickPick(
            ['No (Recommended)', 'Yes'],
            {
                placeHolder: 'Include ApiKeys and Passwords in the export file?',
                ignoreFocusOut: true
            }
        );

        if (!exportCredentials) {
            return; // Cancelled
        }

        const includeCredentials = exportCredentials === 'Yes';

        // Prepare data
        const exportData = environments.map(env => {
            const envCopy = { ...env };
            if (!includeCredentials) {
                envCopy.apikey = '';
                envCopy.password = '';
            }
            return envCopy;
        });

        const uri = await vscode.window.showSaveDialog({
            filters: {
                'JSON Files': ['json']
            },
            defaultUri: vscode.Uri.file('maximo-environments.json'),
            saveLabel: 'Export Environments'
        });

        if (uri) {
            try {
                const data = new TextEncoder().encode(JSON.stringify(exportData, null, 2));
                await vscode.workspace.fs.writeFile(uri, data);
                vscode.window.showInformationMessage(`Successfully exported ${environments.length} environments.`);
            } catch (error: any) {
                vscode.window.showErrorMessage(`Failed to export environments: ${error.message}`);
            }
        }
    }

    /**
     * Import environments from a JSON file
     */
    async importEnvironments(): Promise<void> {
        const uris = await vscode.window.showOpenDialog({
            canSelectMany: false,
            openLabel: 'Import Environments',
            filters: {
                'JSON Files': ['json']
            }
        });

        if (!uris || uris.length === 0) {
            return;
        }

        const scopeSelection = await vscode.window.showQuickPick(
            [
                { label: 'Global', description: 'Available in all workspaces' },
                { label: 'Workspace', description: 'Only in this workspace' }
            ],
            {
                placeHolder: 'Where should the imported environments be saved?',
                ignoreFocusOut: true
            }
        );

        if (!scopeSelection) {
            return; // Cancelled
        }

        const importScope = scopeSelection.label.toLowerCase() as 'global' | 'workspace';

        try {
            const data = await vscode.workspace.fs.readFile(uris[0]);
            const jsonString = new TextDecoder().decode(data);
            const importedEnvs = JSON.parse(jsonString) as MaximoEnvironment[];

            if (!Array.isArray(importedEnvs)) {
                throw new Error('Invalid format: Expected an array of environments.');
            }

            let importCount = 0;

            // Get current environments based on selected scope
            const currentStateKey = 'mxscript.environments';
            let currentEnvs: MaximoEnvironment[] = [];

            if (importScope === 'global') {
                currentEnvs = this._context.globalState.get<MaximoEnvironment[]>(currentStateKey, []);
            } else {
                currentEnvs = this._context.workspaceState.get<MaximoEnvironment[]>(currentStateKey, []);
            }

            // Process and add imported environments
            for (const env of importedEnvs) {
                if (!env.name || !env.hostname) {
                    console.warn('Skipping invalid environment entry:', env);
                    continue;
                }

                // Generate new ID to prevent conflicts
                env.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
                env.scope = importScope;

                currentEnvs.push(env);
                importCount++;
            }

            // Save back to state
            if (importScope === 'global') {
                await this._context.globalState.update(currentStateKey, currentEnvs);
            } else {
                await this._context.workspaceState.update(currentStateKey, currentEnvs);
            }

            this.refresh();

            // Inform webview if it's open (triggers a refresh across the board)
            vscode.commands.executeCommand('mxscript.environments.refresh');

            vscode.window.showInformationMessage(`Successfully imported ${importCount} environments to ${scopeSelection.label} scope.`);

        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to import environments: ${error.message}`);
        }
    }
}