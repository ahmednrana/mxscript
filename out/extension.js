"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.updateStatusBar = exports.activate = void 0;
const vscode = require("vscode");
const AutoScriptXMLService_1 = require("./service/AutoScript/AutoScriptXMLService");
const ConfigService_1 = require("./service/Config/ConfigService");
const MaximoEnvironmentTreeProvider_1 = require("./treeview/MaximoEnvironmentTreeProvider");
const EnvironmentEditorPanel_1 = require("./treeview/EnvironmentEditorPanel");
// Status bar item to show current environment
let statusBarItem;
function activate(context) {
    const MxScriptScheme = 'mxscript';
    const MxScriptProvider = new class {
        provideTextDocumentContent(uri, token) {
            return uri.path;
        }
    };
    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = "mxscript.manageEnvironments";
    statusBarItem.text = "$(globe) Maximo: No Environment";
    statusBarItem.tooltip = "Click to manage Maximo environments";
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
    // Create the tree view provider
    const maximoEnvironmentTreeProvider = new MaximoEnvironmentTreeProvider_1.MaximoEnvironmentTreeProvider(context);
    // Register the tree view
    const environmentTreeView = vscode.window.createTreeView('maximoEnvironments', {
        treeDataProvider: maximoEnvironmentTreeProvider,
        showCollapseAll: false
    });
    context.subscriptions.push(environmentTreeView);
    // Register tree view commands
    context.subscriptions.push(vscode.commands.registerCommand('maximoEnvironments.refreshEnvironments', () => {
        maximoEnvironmentTreeProvider.refresh();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('maximoEnvironments.addEnvironment', () => {
        // Open the editor webview for adding a new environment
        EnvironmentEditorPanel_1.EnvironmentEditorPanel.createOrShow(context.extensionUri, context, undefined, (environment) => {
            // Generate an ID for the new environment
            environment.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
            // Save environment to appropriate storage
            const targetStorage = environment.scope === 'workspace'
                ? context.workspaceState
                : context.globalState;
            const environments = targetStorage.get('mxscript.environments', []);
            environments.push(environment);
            targetStorage.update('mxscript.environments', environments);
            // Set as active if it's the first environment
            const globalEnvs = context.globalState.get('mxscript.environments', []);
            const workspaceEnvs = context.workspaceState.get('mxscript.environments', []);
            const allEnvs = [...globalEnvs, ...workspaceEnvs];
            if (allEnvs.length === 1) {
                context.globalState.update('mxscript.activeEnvironment', environment.id);
            }
            // Refresh the tree view
            maximoEnvironmentTreeProvider.refresh();
            // Update status bar
            updateStatusBar(context);
            vscode.window.showInformationMessage(`Added Maximo environment: ${environment.name}`);
        });
    }));
    context.subscriptions.push(vscode.commands.registerCommand('maximoEnvironments.editEnvironment', (item) => {
        if (item && item.environment) {
            // Open the editor webview for editing an existing environment
            EnvironmentEditorPanel_1.EnvironmentEditorPanel.createOrShow(context.extensionUri, context, item.environment, (updatedEnvironment) => {
                // Find and update environment in appropriate storage
                const globalEnvs = context.globalState.get('mxscript.environments', []);
                const workspaceEnvs = context.workspaceState.get('mxscript.environments', []);
                const globalIndex = globalEnvs.findIndex(e => e.id === updatedEnvironment.id);
                const workspaceIndex = workspaceEnvs.findIndex(e => e.id === updatedEnvironment.id);
                // Remove from current location
                if (globalIndex !== -1) {
                    globalEnvs.splice(globalIndex, 1);
                    context.globalState.update('mxscript.environments', globalEnvs);
                }
                else if (workspaceIndex !== -1) {
                    workspaceEnvs.splice(workspaceIndex, 1);
                    context.workspaceState.update('mxscript.environments', workspaceEnvs);
                }
                // Add to appropriate location based on scope
                if (updatedEnvironment.scope === 'workspace') {
                    workspaceEnvs.push(updatedEnvironment);
                    context.workspaceState.update('mxscript.environments', workspaceEnvs);
                }
                else {
                    globalEnvs.push(updatedEnvironment);
                    context.globalState.update('mxscript.environments', globalEnvs);
                }
                // If this was the active environment, apply the updated settings
                const activeEnvId = context.globalState.get('mxscript.activeEnvironment');
                if (activeEnvId === updatedEnvironment.id) {
                    // Update VSCode settings
                    maximoEnvironmentTreeProvider.setActiveEnvironment(updatedEnvironment.id);
                }
                // Refresh the tree view
                maximoEnvironmentTreeProvider.refresh();
                // Update status bar
                updateStatusBar(context);
                vscode.window.showInformationMessage(`Updated Maximo environment: ${updatedEnvironment.name}`);
            });
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('maximoEnvironments.deleteEnvironment', (item) => {
        if (item && item.environment) {
            vscode.window.showWarningMessage(`Are you sure you want to delete the environment "${item.environment.name}"?`, "Delete", "Cancel").then(selection => {
                if (selection === "Delete") {
                    maximoEnvironmentTreeProvider.deleteEnvironment(item.environment.id);
                    // Update status bar if needed
                    updateStatusBar(context);
                }
            });
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('maximoEnvironments.setActiveEnvironment', (item) => {
        if (item && item.environment) {
            maximoEnvironmentTreeProvider.setActiveEnvironment(item.environment.id);
            // Update status bar
            updateStatusBar(context);
        }
    }));
    // Register commands for existing functionality
    let compare = vscode.commands.registerCommand("mxscript.compare", () => {
        let as = new AutoScriptXMLService_1.AutoScriptXMLService(context, new ConfigService_1.ConfigService());
        as.compareWithServer();
    });
    let upload = vscode.commands.registerCommand("mxscript.upload", () => {
        let as = new AutoScriptXMLService_1.AutoScriptXMLService(context, new ConfigService_1.ConfigService());
        as.uploadScript();
    });
    let update = vscode.commands.registerCommand("mxscript.update", () => {
        let as = new AutoScriptXMLService_1.AutoScriptXMLService(context, new ConfigService_1.ConfigService());
        as.updateScript();
    });
    let downloadall = vscode.commands.registerCommand("mxscript.downloadall", () => {
        let as = new AutoScriptXMLService_1.AutoScriptXMLService(context, new ConfigService_1.ConfigService());
        as.downloadAllScripts();
    });
    vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('mxscript.scriptSettings.ignoresslerrors')) {
            let ignoreSsl = vscode.workspace.getConfiguration().get("mxscript.scriptSettings.ignoresslerrors");
            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = ignoreSsl ? '0' : '1';
        }
    });
    // Register the environment manager webview
    /* Commenting out the webview registration to remove it from the left sidebar
    const environmentManagerProvider = new EnvironmentManagerWebviewProvider(
      context.extensionUri,
      context,
      () => updateStatusBar(context) // Pass the status bar update function
    );
  
    context.subscriptions.push(
      vscode.window.registerWebviewViewProvider(
        EnvironmentManagerWebviewProvider.viewType,
        environmentManagerProvider
      )
    );
    */
    // Register command for webview-to-editor communication
    context.subscriptions.push(vscode.commands.registerCommand('mxscript.environments.add', () => {
        EnvironmentEditorPanel_1.EnvironmentEditorPanel.createOrShow(context.extensionUri, context, undefined, (environment) => {
            // Generate an ID for the new environment
            environment.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
            // Save environment to appropriate storage
            const targetStorage = environment.scope === 'workspace'
                ? context.workspaceState
                : context.globalState;
            const environments = targetStorage.get('mxscript.environments', []);
            environments.push(environment);
            targetStorage.update('mxscript.environments', environments);
            // Set as active if it's the first environment
            const globalEnvs = context.globalState.get('mxscript.environments', []);
            const workspaceEnvs = context.workspaceState.get('mxscript.environments', []);
            const allEnvs = [...globalEnvs, ...workspaceEnvs];
            if (allEnvs.length === 1) {
                context.globalState.update('mxscript.activeEnvironment', environment.id);
            }
            // Refresh the tree view
            maximoEnvironmentTreeProvider.refresh();
            // Update status bar
            updateStatusBar(context);
            vscode.window.showInformationMessage(`Added Maximo environment: ${environment.name}`);
        });
    }));
    context.subscriptions.push(vscode.commands.registerCommand('mxscript.environments.edit', (environment) => {
        EnvironmentEditorPanel_1.EnvironmentEditorPanel.createOrShow(context.extensionUri, context, environment, (updatedEnvironment) => {
            // Find and update environment in appropriate storage
            const globalEnvs = context.globalState.get('mxscript.environments', []);
            const workspaceEnvs = context.workspaceState.get('mxscript.environments', []);
            const globalIndex = globalEnvs.findIndex(e => e.id === updatedEnvironment.id);
            const workspaceIndex = workspaceEnvs.findIndex(e => e.id === updatedEnvironment.id);
            // Remove from current location
            if (globalIndex !== -1) {
                globalEnvs.splice(globalIndex, 1);
                context.globalState.update('mxscript.environments', globalEnvs);
            }
            else if (workspaceIndex !== -1) {
                workspaceEnvs.splice(workspaceIndex, 1);
                context.workspaceState.update('mxscript.environments', workspaceEnvs);
            }
            // Add to appropriate location based on scope
            if (updatedEnvironment.scope === 'workspace') {
                workspaceEnvs.push(updatedEnvironment);
                context.workspaceState.update('mxscript.environments', workspaceEnvs);
            }
            else {
                globalEnvs.push(updatedEnvironment);
                context.globalState.update('mxscript.environments', globalEnvs);
            }
            // If this was the active environment, apply the updated settings
            const activeEnvId = context.globalState.get('mxscript.activeEnvironment');
            if (activeEnvId === updatedEnvironment.id) {
                // Update VSCode settings
                maximoEnvironmentTreeProvider.setActiveEnvironment(updatedEnvironment.id);
            }
            // Refresh the tree view
            maximoEnvironmentTreeProvider.refresh();
            // Update status bar
            updateStatusBar(context);
            vscode.window.showInformationMessage(`Updated Maximo environment: ${updatedEnvironment.name}`);
        });
    }));
    let manageEnvironments = vscode.commands.registerCommand("mxscript.manageEnvironments", () => __awaiter(this, void 0, void 0, function* () {
        try {
            // Try to focus on either the tree view or the webview
            yield vscode.commands.executeCommand('maximoEnvironments.focus');
        }
        catch (e) {
            try {
                yield vscode.commands.executeCommand('workbench.view.extension.mxscript-environments');
            }
            catch (e) {
                vscode.window.showInformationMessage("Click on the Maximo Environments icon in the activity bar");
            }
        }
    }));
    context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(MxScriptScheme, MxScriptProvider));
    context.subscriptions.push(upload);
    context.subscriptions.push(downloadall);
    context.subscriptions.push(compare);
    context.subscriptions.push(update);
    context.subscriptions.push(manageEnvironments);
    // Initialize status bar with current environment
    updateStatusBar(context);
}
exports.activate = activate;
// Function to update status bar with current environment
function updateStatusBar(context) {
    const globalEnvs = context.globalState.get('mxscript.environments', []);
    const workspaceEnvs = context.workspaceState.get('mxscript.environments', []);
    const environments = [...globalEnvs, ...workspaceEnvs];
    const activeEnvId = context.globalState.get('mxscript.activeEnvironment');
    if (activeEnvId && environments.length > 0) {
        const activeEnv = environments.find(env => env.id === activeEnvId);
        if (activeEnv) {
            statusBarItem.text = `$(globe) Maximo: ${activeEnv.name}`;
            statusBarItem.tooltip = `Connected to ${activeEnv.name} (${activeEnv.hostname}:${activeEnv.port})`;
            return;
        }
    }
    // No active environment found
    statusBarItem.text = "$(globe) Maximo: No Environment";
    statusBarItem.tooltip = "Click to manage Maximo environments";
}
exports.updateStatusBar = updateStatusBar;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map