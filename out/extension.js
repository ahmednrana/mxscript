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
        let cs = new ConfigService_1.ConfigService();
        let as = new AutoScriptXMLService_1.AutoScriptXMLService(context, cs);
        as.compareWithServer();
    });
    let upload = vscode.commands.registerCommand("mxscript.upload", () => {
        let as = new AutoScriptXMLService_1.AutoScriptXMLService(context, new ConfigService_1.ConfigService());
        as.uploadScript();
    });
    let update = vscode.commands.registerCommand("mxscript.update", () => {
        let cs = new ConfigService_1.ConfigService();
        let as = new AutoScriptXMLService_1.AutoScriptXMLService(context, cs);
        as.updateScript();
    });
    let downloadall = vscode.commands.registerCommand("mxscript.downloadall", () => {
        let as = new AutoScriptXMLService_1.AutoScriptXMLService(context, new ConfigService_1.ConfigService());
        as.downloadAllScripts();
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