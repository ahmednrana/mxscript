import * as vscode from "vscode";
import { AutoScriptXMLService } from './service/AutoScript/AutoScriptXMLService';
import { IAutoScriptService } from './service/AutoScript/IAutoScriptService';
import { ConfigService } from './service/Config/ConfigService';
import { EnvironmentManagerWebviewProvider } from './webview/EnvironmentManager'

export function activate(context: vscode.ExtensionContext) {
  const MxScriptScheme = 'mxscript';
  const MxScriptProvider = new class implements vscode.TextDocumentContentProvider {
    provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): string {
      return uri.path;
    }

  };
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
    context
  );
  
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      EnvironmentManagerWebviewProvider.viewType,
      environmentManagerProvider
    )
  );
  
  let manageEnvironments = vscode.commands.registerCommand("mxscript.manageEnvironments", () => {
    vscode.commands.executeCommand('workbench.view.extension.mxscript-environments-view');
  });

  // Add to existing subscriptions
  context.subscriptions.push(manageEnvironments);
}
// this method is called when your extension is deactivated
export function deactivate() { }
