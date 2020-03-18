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
const node_fetch_1 = require("node-fetch");
const url_1 = require("url");
const vscode = require("vscode");
const AuthService_1 = require("../Authentication/AuthService");
class AutoScriptJSONService {
    constructor(context, cs) {
        this.vscode = require("vscode");
        this.path = require("path");
        this.configService = cs;
        this.authService = new AuthService_1.AuthService(this.configService, context);
        let url = this.configService.getUrl();
        let os = this.configService.getOS();
        this.autoScriptURL = url + '/maximo/oslc/os/' + os;
    }
    downloadAllScripts() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    updateScript() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.authService.isCookieSet()) {
                yield this.authService.authenticate();
                if (!this.authService.isCookieSet()) {
                    console.log("Twice authentication failed");
                    return;
                }
            }
            let fileName = this.configService.getFilename();
            var url = new url_1.URL(this.autoScriptURL);
            var params = { 'oslc.select': 'source', 'oslc.where': `autoscript="${fileName}"` };
            url.search = new url_1.URLSearchParams(params).toString();
            let headers = this.authService.getAuthHeaders();
            let updateResponse = yield node_fetch_1.default(url, { headers: headers });
            if (!updateResponse.ok) {
                console.error('error');
                this.vscode.window.showErrorMessage("Error in fetching data " + updateResponse.status + " " + updateResponse.statusText);
            }
            if (updateResponse.url.includes('login.jsp')) {
                console.error('Cookie Expired');
                this.authService.disconnect();
                yield this.authService.authenticate();
                headers = this.authService.getAuthHeaders();
                updateResponse = yield node_fetch_1.default(this.autoScriptURL, { headers: headers });
            }
            let autoScriptData = yield updateResponse.json();
            if (!autoScriptData["rdfs:member"]) {
                console.error('Malformed Response from server');
                return;
            }
            if (!autoScriptData["rdfs:member"][0]) {
                console.error('No Script by this name is found on server');
                vscode.window.showInformationMessage('No Script by this name is found on server\n' + updateResponse.body);
                return;
            }
            const sourceArray = autoScriptData["rdfs:member"].map((x) => x['spi:source']);
            const source = sourceArray[0];
            // Write to File
            const { activeTextEditor } = vscode.window;
            if (activeTextEditor) {
                const { document } = activeTextEditor;
                const fullText = document.getText();
                const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(fullText.length));
                const edit = new vscode.WorkspaceEdit();
                edit.replace(document.uri, fullRange, source);
                vscode.window.showInformationMessage('Success\n' + updateResponse.body);
                return vscode.workspace.applyEdit(edit);
            }
            else {
                vscode.window.showWarningMessage("The file open is not valid");
            }
        });
    }
    uploadScript() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.authService.isCookieSet()) {
                yield this.authService.authenticate();
            }
            var url = new url_1.URL(this.autoScriptURL);
            var params = { 'oslc.select': 'autoscript, language, source' };
            url.search = new url_1.URLSearchParams(params).toString();
            let headers = this.authService.getAuthHeaders();
            let syncResponse = yield node_fetch_1.default(url, { headers: headers });
            if (!syncResponse.ok) {
                console.error('error');
                this.vscode.window.showErrorMessage("Error in fetching data " + syncResponse.status + " " + syncResponse.statusText);
            }
            if (syncResponse.url.includes('login.jsp')) {
                console.error('Cookie Expired');
                this.authService.disconnect();
                yield this.authService.authenticate();
                headers = this.authService.getAuthHeaders();
                syncResponse = yield node_fetch_1.default(this.autoScriptURL, { headers: headers });
            }
            let autoScriptData = yield syncResponse.json();
            if (!autoScriptData["rdfs:member"]) {
                console.error('Malformed Response from server');
                return;
            }
            if (!autoScriptData["rdfs:member"][0]) {
                console.error('No Script by this name is found on server');
                vscode.window.showInformationMessage('No Script by this name is found on server\n' + syncResponse.body);
                return;
            }
            let currentlyOpenTabfilePath = this.vscode.window.activeTextEditor.document.fileName;
            let filename = this.path.basename(currentlyOpenTabfilePath);
            console.log(currentlyOpenTabfilePath);
            console.log(filename);
        });
    }
    compareWithServer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.authService.isCookieSet()) {
                yield this.authService.authenticate();
                if (!this.authService.isCookieSet()) {
                    console.log("Twice authentication failed");
                    return;
                }
            }
            let fileName = this.configService.getFilename();
            var url = new url_1.URL(this.autoScriptURL);
            var params = { 'oslc.select': 'source', 'oslc.where': `autoscript="${fileName}"` };
            url.search = new url_1.URLSearchParams(params).toString();
            let headers = this.authService.getAuthHeaders();
            let updateResponse = yield node_fetch_1.default(url, { headers: headers });
            if (!updateResponse.ok) {
                console.error('error');
                this.vscode.window.showErrorMessage("Error in fetching data " + updateResponse.status + " " + updateResponse.statusText);
            }
            if (updateResponse.url.includes('login.jsp')) {
                console.error('Cookie Expired');
                this.authService.disconnect();
                yield this.authService.authenticate();
                headers = this.authService.getAuthHeaders();
                updateResponse = yield node_fetch_1.default(this.autoScriptURL, { headers: headers });
            }
            let autoScriptData = yield updateResponse.json();
            if (!autoScriptData["rdfs:member"]) {
                console.error('Malformed Response from server');
                return;
            }
            if (!autoScriptData["rdfs:member"][0]) {
                console.error('No Script by this name is found on server');
                vscode.window.showInformationMessage('No Script by this name is found on server\n' + updateResponse.body);
                return;
            }
            const sourceArray = autoScriptData["rdfs:member"].map((x) => x['spi:source']);
            const source = sourceArray[0];
            // Compare To File
            let serverScript = vscode.Uri.parse('mxscript:' + source);
            const { activeTextEditor } = vscode.window;
            if (activeTextEditor) {
                const { document } = activeTextEditor;
                let original = document.uri;
                if (original !== null) {
                    let title = fileName + "↔ " + this.configService.getUrl() + " version";
                    vscode.commands.executeCommand('vscode.diff', original, serverScript, title);
                }
            }
        });
    }
}
exports.AutoScriptJSONService = AutoScriptJSONService;
//# sourceMappingURL=AutoScriptJSONService.js.map