import * as vscode from "vscode";
import { AutoScriptXMLService } from './service/AutoScript/AutoScriptXMLService';
import { IAutoScriptService } from './service/AutoScript/IAutoScriptService';
import { ConfigService } from './service/Config/ConfigService';
import { EnvironmentManagerWebviewProvider } from './webview/EnvironmentManager';

// Status bar item to show current environment
let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
  const MxScriptScheme = 'mxscript';
  const MxScriptProvider = new class implements vscode.TextDocumentContentProvider {
    provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): string {
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
    let as: IAutoScriptService = new AutoScriptXMLService(context, new ConfigService());
    as.compareWithServer();
  });
  let upload = vscode.commands.registerCommand("mxscript.upload", () => {
    let as: AutoScriptXMLService = new AutoScriptXMLService(context, new ConfigService());
    as.uploadScript();
  });
  let update = vscode.commands.registerCommand("mxscript.update", () => {
    let as: IAutoScriptService = new AutoScriptXMLService(context, new ConfigService());
    as.updateScript();
  });
  let downloadall = vscode.commands.registerCommand("mxscript.downloadall", () => {
    let as: AutoScriptXMLService = new AutoScriptXMLService(context, new ConfigService());
    as.downloadAllScripts();
  });

  vscode.workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('mxscript.scriptSettings.ignoresslerrors')) {
      let ignoreSsl = vscode.workspace.getConfiguration().get("mxscript.scriptSettings.ignoresslerrors")
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = ignoreSsl ? '0' : '1';
    }
  });

  context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(MxScriptScheme, MxScriptProvider));
  context.subscriptions.push(upload);
  context.subscriptions.push(downloadall);
  context.subscriptions.push(compare);
  context.subscriptions.push(update);

  // Register the environment manager webview
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

  let manageEnvironments = vscode.commands.registerCommand("mxscript.manageEnvironments", async () => {
    // First attempt - should work if view container ID is "mxscript-environments"
    vscode.commands.executeCommand('workbench.view.extension.mxscript-environments');
   
    vscode.window.showInformationMessage("Click on the Maximo Environments icon in the activity bar");
  });

  // Add to existing subscriptions
  context.subscriptions.push(manageEnvironments);

  // Initialize status bar with current environment
  updateStatusBar(context);
}

// Function to update status bar with current environment
export function updateStatusBar(context: vscode.ExtensionContext) {
  const environments = context.globalState.get<any[]>('mxscript.environments', []);
  const activeEnvId = context.globalState.get<string>('mxscript.activeEnvironment');

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

export function deactivate() { }
