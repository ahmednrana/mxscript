"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const AutoScriptXMLService_1 = require("./service/AutoScript/AutoScriptXMLService");
const ConfigService_1 = require("./service/Config/ConfigService");
function activate(context) {
    const MxScriptScheme = 'mxscript';
    const MxScriptProvider = new class {
        provideTextDocumentContent(uri, token) {
            return uri.path;
        }
    };
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
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map