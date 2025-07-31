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
    
    constructor(private readonly _context: vscode.ExtensionContext) {}
    
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
    setActiveEnvironment(environmentId: string, silent: boolean = false): void {
        // Save active environment ID
        this._context.globalState.update('mxscript.activeEnvironment', environmentId);
        
        // Get the environment details
        const globalEnvs = this._context.globalState.get<MaximoEnvironment[]>('mxscript.environments', []);
        const workspaceEnvs = this._context.workspaceState.get<MaximoEnvironment[]>('mxscript.environments', []);
        const environments = [...globalEnvs, ...workspaceEnvs];
        const environment = environments.find(env => env.id === environmentId);
        
        if (environment) {
            // Apply settings to VSCode configuration
            const config = vscode.workspace.getConfiguration('mxscript');
            
            config.update('serverSettings.hostname', environment.hostname, vscode.ConfigurationTarget.Workspace);
            config.update('serverSettings.port', environment.port, vscode.ConfigurationTarget.Workspace);
            config.update('authentication.username', environment.username, vscode.ConfigurationTarget.Workspace);
            config.update('authentication.password', environment.password, vscode.ConfigurationTarget.Workspace);
            config.update('authentication.apikey', environment.apikey, vscode.ConfigurationTarget.Workspace);
            config.update('authentication.authenticationType', environment.authenticationType, vscode.ConfigurationTarget.Workspace);
            config.update('serverSettings.objectStructure', environment.objectStructure, vscode.ConfigurationTarget.Workspace);
            config.update('serverSettings.httpProtocol', environment.httpProtocol, vscode.ConfigurationTarget.Workspace);
            config.update('scriptSettings.createPythonFileForJythonScripts', environment.createPythonFileForJythonScripts, vscode.ConfigurationTarget.Workspace);
            config.update('scriptSettings.logLevel', environment.logLevel, vscode.ConfigurationTarget.Workspace);
            config.update('scriptSettings.ignoresslerrors', environment.ignoreSslErrors, vscode.ConfigurationTarget.Workspace);
            config.update('serverSettings.activeEnvironmentName', environment.name, vscode.ConfigurationTarget.Workspace);
            config.update('appxml.formatOnDownloadAndCompare', environment.formatXmlOnDownloadAndCompare, vscode.ConfigurationTarget.Workspace);
            
            // Reinitialize the Maximo client with new environment settings
            try {
                MaximoClientProvider.forceReinitializeClient(environment);
            } catch (error) {
                console.warn('MaximoClientProvider not initialized yet, client will be initialized when needed');
            }
            
            if (!silent) {
                vscode.window.showInformationMessage(`Switched to Maximo environment: ${environment.name}`);
            }
        }
        
        // Refresh the tree view
        this.refresh();
    }
    
    /**
     * Delete an environment
     */
    deleteEnvironment(environmentId: string): void {
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
            // Set a new active environment or clear it
            const allEnvs = [...globalEnvs, ...workspaceEnvs];
            if (allEnvs.length > 0) {
                this._context.globalState.update('mxscript.activeEnvironment', allEnvs[0].id);
            } else {
                this._context.globalState.update('mxscript.activeEnvironment', undefined);
            }
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
}