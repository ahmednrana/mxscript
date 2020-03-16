import * as vscode from "vscode";
import { AutoScriptXMLService } from './service/AutoScript/AutoScriptXMLService';
import { IAutoScriptService } from './service/AutoScript/IAutoScriptService';
import { ConfigService } from './service/Config/ConfigService';
import IConfigService from './service/Config/IConfigService';


export function activate(context: vscode.ExtensionContext) {
  const MxScriptScheme = 'mxscript';
  const MxScriptProvider = new class implements vscode.TextDocumentContentProvider {
    provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): string {
      return uri.path;
    }

  };
  let compare = vscode.commands.registerCommand("extension.compare", () => {
    let cs: ConfigService = new ConfigService();
    let as: IAutoScriptService = new AutoScriptXMLService(context, cs);
    as.compareWithServer();
  });
  let sync = vscode.commands.registerCommand("extension.sync", () => {
    let as: AutoScriptXMLService = new AutoScriptXMLService(context, new ConfigService());
    as.syncScript();
  });
  let update = vscode.commands.registerCommand("extension.update", () => {
    let cs: IConfigService = new ConfigService();
    let as: IAutoScriptService = new AutoScriptXMLService(context, cs);
    as.updateScript();
  });
  let downloadall = vscode.commands.registerCommand("extension.downloadall", () => {
    let as: AutoScriptXMLService = new AutoScriptXMLService(context, new ConfigService());
    as.downloadAllScripts();
  });
  context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(MxScriptScheme, MxScriptProvider));
  context.subscriptions.push(sync);
  context.subscriptions.push(downloadall);
  context.subscriptions.push(compare);
  context.subscriptions.push(update);
}
// this method is called when your extension is deactivated
export function deactivate() { }
