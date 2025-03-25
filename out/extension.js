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
const EnvironmentManager_1 = require("./webview/EnvironmentManager");
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
    context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(MxScriptScheme, MxScriptProvider));
    context.subscriptions.push(upload);
    context.subscriptions.push(downloadall);
    context.subscriptions.push(compare);
    context.subscriptions.push(update);
    // Register the environment manager webview
    const environmentManagerProvider = new EnvironmentManager_1.EnvironmentManagerWebviewProvider(context.extensionUri, context, () => updateStatusBar(context) // Pass the status bar update function
    );
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(EnvironmentManager_1.EnvironmentManagerWebviewProvider.viewType, environmentManagerProvider));
    let manageEnvironments = vscode.commands.registerCommand("mxscript.manageEnvironments", () => __awaiter(this, void 0, void 0, function* () {
        // First attempt - should work if view container ID is "mxscript-environments"
        vscode.commands.executeCommand('workbench.view.extension.mxscript-environments');
        vscode.window.showInformationMessage("Click on the Maximo Environments icon in the activity bar");
    }));
    // Add to existing subscriptions
    context.subscriptions.push(manageEnvironments);
    // Initialize status bar with current environment
    updateStatusBar(context);
}
exports.activate = activate;
// Function to update status bar with current environment
function updateStatusBar(context) {
    const environments = context.globalState.get('mxscript.environments', []);
    const activeEnvId = context.globalState.get('mxscript.activeEnvironment');
    if (activeEnvId && environments) {
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