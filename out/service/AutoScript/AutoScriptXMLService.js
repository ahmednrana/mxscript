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
const vscode_1 = require("vscode");
const AutoScriptXML_model_1 = require("../../model/AutoScriptXML.model");
const Constants_1 = require("../../Constants");
var parseString = require('xml2js').parseString;
class AutoScriptXMLService {
    constructor(context, cs) {
        this.vscode = require("vscode");
        this.builder = require('xmlbuilder');
        this.configService = cs;
    }
    getAuthHeaders() {
        let headers = new node_fetch_1.Headers();
        if (this.configService.isLdap()) {
            headers.set('authorization', "Basic " + new Buffer(this.configService.getUsername() + ":" + this.configService.getPassword()).toString("base64"));
        }
        else {
            headers.set('maxauth', new Buffer(this.configService.getUsername() + ":" + this.configService.getPassword()).toString("base64"));
        }
        headers.set('content-type', 'application/xml');
        return headers;
    }
    // Get all scripts
    downloadAllScripts() {
        return __awaiter(this, void 0, void 0, function* () {
            // Getting folder to download scripts
            if (!vscode.workspace.workspaceFolders) {
                vscode.window.showErrorMessage("Please open a project first");
                return;
            }
            let rootFolder = vscode.workspace.workspaceFolders[0]; // Workspace root folder
            let packet = this.constructPacket(Constants_1.Constants.QUERYALL);
            var url = new url_1.URL(this.configService.getXMLUrl());
            let headers = this.getAuthHeaders();
            const options = {
                canSelectMany: false,
                openLabel: 'Select',
                canSelectFiles: false,
                canSelectFolders: true,
                defaultUri: rootFolder.uri,
                filters: {
                    'All files': ['*']
                }
            };
            let selectedFolderUri = yield vscode.window.showOpenDialog(options).then(folderUri => {
                if (folderUri && folderUri[0]) {
                    let selectedFolder = folderUri[0]; // User selected folder
                    let selectedFolderRoot = vscode.workspace.getWorkspaceFolder(selectedFolder);
                    if (selectedFolderRoot !== rootFolder) { // The selected folder is NOT part of already opened project
                        vscode.window.showErrorMessage("The selected folder is not part of project. Please select a folder from current project");
                        return;
                    }
                    console.log('Selected file: ' + selectedFolder.fsPath);
                    return selectedFolder;
                }
                return undefined;
            });
            if (selectedFolderUri === undefined) {
                vscode.window.showErrorMessage("Folder selection Error. It might not be part of project.");
                return;
            }
            let selectedFolderUriResolved = selectedFolderUri;
            let downloadAllResponse = new node_fetch_1.Response();
            vscode_1.window.withProgress({
                location: vscode_1.ProgressLocation.Notification,
                title: "Downloading All Scripts\n",
                cancellable: true
            }, (progress, token) => __awaiter(this, void 0, void 0, function* () {
                token.onCancellationRequested(() => {
                    console.log("User canceled the download all scripts operation");
                    return;
                });
                progress.report({ increment: 0, message: "Downloading scripts. Please wait..." });
                downloadAllResponse = yield node_fetch_1.default(url, { method: 'POST', body: packet, headers: headers })
                    .catch(e => {
                    console.log(e.message);
                    vscode.window.showErrorMessage('Error ' + e.status + " : " + e.message + "\n" + e.body);
                    return;
                });
                downloadAllResponse = downloadAllResponse;
                if (!downloadAllResponse.ok && downloadAllResponse.status !== 200 && downloadAllResponse.status !== 201) {
                    this.vscode.window.showErrorMessage("Error in fetching data " + downloadAllResponse.status + " " + downloadAllResponse.statusText);
                }
                let autoScriptData = yield downloadAllResponse.text();
                if (!autoScriptData.includes('creationDate')) {
                    this.vscode.window.showErrorMessage("Empty Response " + autoScriptData);
                    return;
                }
                progress.report({ increment: 50, message: "Writing scripts" });
                parseString(autoScriptData, function (err, parsedXML) {
                    return __awaiter(this, void 0, void 0, function* () {
                        let languageToExtension;
                        languageToExtension = new Map();
                        languageToExtension.set(Constants_1.Constants.LANG_GROOVY, Constants_1.Constants.EXT_GROOVY);
                        languageToExtension.set(Constants_1.Constants.LANG_PYTHON, Constants_1.Constants.EXT_PYTHON);
                        languageToExtension.set(Constants_1.Constants.LANG_JYTHON, Constants_1.Constants.EXT_JYTHON);
                        languageToExtension.set(Constants_1.Constants.LANG_NASHORN, Constants_1.Constants.EXT_NASHORN);
                        languageToExtension.set(Constants_1.Constants.LANG_JS, Constants_1.Constants.EXT_JS);
                        languageToExtension.set(Constants_1.Constants.LANG_JAVASCRIPT, Constants_1.Constants.EXT_JAVASCRIPT);
                        languageToExtension.set(Constants_1.Constants.LANG_ECMASCRIPT, Constants_1.Constants.EXT_ECMASCRIPT);
                        let firstKeyInParsedXML = Object.keys(parsedXML)[0];
                        if (parsedXML[Object.keys(parsedXML)[0]][Object.keys(parsedXML[firstKeyInParsedXML])[0]].rsCount === "0") {
                            vscode.window.showInformationMessage('No Script by this name is found on server\n' + autoScriptData);
                            return;
                        }
                        let autoScriptXml = parsedXML[Object.keys(parsedXML)[0]][Object.keys(parsedXML[firstKeyInParsedXML])[1]][0].AUTOSCRIPT;
                        let scripts = autoScriptXml.map(xml => new AutoScriptXML_model_1.default(xml));
                        for (let autoScript of scripts) {
                            let source = autoScript.getSource();
                            let scriptName = autoScript.getAutoScriptName();
                            let scriptLanguage = autoScript.getScriptLanguage();
                            let fileExt = languageToExtension.get(scriptLanguage.toUpperCase());
                            let fileToSearch = `${scriptName}.${fileExt}`;
                            console.log(scriptName + " " + scriptLanguage);
                            let workspacePath = selectedFolderUriResolved.fsPath;
                            const fsPromises = require('fs').promises;
                            if (vscode.workspace.workspaceFolders) {
                                console.log('Writing file: ', fileToSearch);
                                fsPromises.writeFile(`${workspacePath}/${fileToSearch}`, source);
                            }
                        }
                    });
                });
                var prom = new Promise(resolve => {
                    resolve();
                    console.log('Resolving Progressbar Promise');
                });
                console.log('Ending Progressbar');
                progress.report({ increment: 50, message: "Complete" });
                return prom;
            }));
        });
    }
    // update opened script from Maximo
    updateScript() {
        return __awaiter(this, void 0, void 0, function* () {
            var url = new url_1.URL(this.configService.getXMLUrl());
            let headers = this.getAuthHeaders();
            let packet = this.constructPacket(Constants_1.Constants.QUERY);
            console.log("PACKET: " + packet);
            let updateResponse = yield node_fetch_1.default(url, { method: 'POST', body: packet, headers: headers })
                .catch(e => {
                console.log(e.message);
                vscode.window.showErrorMessage('Error ' + e.status + " : " + e.message + "\n" + e.body);
                return;
            });
            updateResponse = updateResponse;
            if (!updateResponse.ok && updateResponse.status !== 200 && updateResponse.status !== 201) {
                this.vscode.window.showErrorMessage("Error in fetching data " + updateResponse.status + " " + updateResponse.statusText);
            }
            let autoScriptData = yield updateResponse.text();
            if (!autoScriptData.includes('creationDate')) {
                this.vscode.window.showErrorMessage("Empty Response " + autoScriptData);
                return;
            }
            parseString(autoScriptData, function (err, parsedXML) {
                let firstKeyInParsedXML = Object.keys(parsedXML)[0];
                if (parsedXML[Object.keys(parsedXML)[0]][Object.keys(parsedXML[firstKeyInParsedXML])[0]].rsCount === "0") {
                    vscode.window.showInformationMessage('No Script by this name is found on server\n' + autoScriptData);
                    return;
                }
                let autoScriptXml = parsedXML[Object.keys(parsedXML)[0]][Object.keys(parsedXML[firstKeyInParsedXML])[1]][0].AUTOSCRIPT;
                let scripts = autoScriptXml.map(xml => new AutoScriptXML_model_1.default(xml));
                let autoScript = scripts[0];
                let source = autoScript.getSource();
                const { activeTextEditor } = vscode.window;
                if (activeTextEditor) {
                    const { document } = activeTextEditor;
                    const fullText = document.getText();
                    const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(fullText.length));
                    const edit = new vscode.WorkspaceEdit();
                    edit.replace(document.uri, fullRange, source);
                    vscode.window.showInformationMessage('Success\n' + autoScriptData);
                    return vscode.workspace.applyEdit(edit);
                }
                else {
                    vscode.window.showWarningMessage("The file open is not valid");
                }
            });
        });
    }
    // Sync opened script
    syncScript() {
        return __awaiter(this, void 0, void 0, function* () {
            var url = new url_1.URL(this.configService.getXMLUrl());
            let headers = this.getAuthHeaders();
            let packet = this.constructPacket(Constants_1.Constants.SYNC);
            console.log("PACKET: " + packet);
            let syncResponse = yield node_fetch_1.default(url, { method: 'POST', body: packet, headers: headers })
                .catch(e => {
                console.log(e.message);
                vscode.window.showErrorMessage('Error ' + e.status + " : " + e.message + "\n" + e.body);
                return;
            });
            syncResponse = syncResponse;
            if (!syncResponse.ok && syncResponse.status !== 200 && syncResponse.status !== 201) {
                this.vscode.window.showErrorMessage("Error in fetching data " + syncResponse.status + " " + syncResponse.statusText);
            }
            let autoScriptData = yield syncResponse.text();
            if (autoScriptData.includes('creationDate')) {
                vscode.window.showInformationMessage('Success\n' + autoScriptData);
            }
            else {
                vscode.window.showErrorMessage('Error\n' + autoScriptData);
            }
        });
    }
    // Compare the server with currently open Editor
    compareWithServer() {
        return __awaiter(this, void 0, void 0, function* () {
            var url = new url_1.URL(this.configService.getXMLUrl());
            let headers = this.getAuthHeaders();
            let packet = this.constructPacket(Constants_1.Constants.QUERY);
            console.log("PACKET: " + packet);
            let compareResponse = yield node_fetch_1.default(url, { method: 'POST', body: packet, headers: headers })
                .catch(e => {
                console.log(e.message);
                vscode.window.showErrorMessage('Error ' + e.status + " : " + e.message + "\n" + e.body);
                return;
            });
            compareResponse = compareResponse;
            if (!compareResponse.ok && compareResponse.status !== 200 && compareResponse.status !== 201) {
                this.vscode.window.showErrorMessage("Error in fetching data " + compareResponse.status + " " + compareResponse.statusText);
            }
            let autoScriptData = yield compareResponse.text();
            if (!autoScriptData.includes('creationDate')) {
                this.vscode.window.showErrorMessage("Empty Response " + autoScriptData);
                return;
            }
            let filename = this.configService.getFilename();
            parseString(autoScriptData, function (err, parsedXML) {
                let firstKeyInParsedXML = Object.keys(parsedXML)[0];
                if (parsedXML[Object.keys(parsedXML)[0]][Object.keys(parsedXML[firstKeyInParsedXML])[0]].rsCount === "0") {
                    vscode.window.showInformationMessage('No Script by this name is found on server\n' + autoScriptData);
                    return;
                }
                let autoScriptXml = parsedXML[Object.keys(parsedXML)[0]][Object.keys(parsedXML[firstKeyInParsedXML])[1]][0].AUTOSCRIPT;
                let scripts = autoScriptXml.map(xml => new AutoScriptXML_model_1.default(xml));
                let autoScript = scripts[0];
                let source = autoScript.getSource();
                source = encodeURIComponent(source);
                let serverScript = vscode.Uri.parse('mxscript:' + source);
                const { activeTextEditor } = vscode.window;
                if (activeTextEditor) {
                    const { document } = activeTextEditor;
                    let original = document.uri;
                    if (original !== null) {
                        let title = filename + " ↔ Server's Version";
                        vscode.commands.executeCommand('vscode.diff', original, serverScript, title);
                    }
                    else {
                        vscode.window.showWarningMessage("The file open is not valid");
                    }
                }
            });
        });
    }
    constructPacket(actionType) {
        let initTag = actionType === Constants_1.Constants.QUERYALL ? Constants_1.Constants.QUERY : actionType; // For Query All even the start tag should be Query
        let rootElement = initTag + this.configService.getOS();
        let osSet = actionType === 'Sync' ? this.configService.getOS() + 'Set' : this.configService.getOS() + 'Query';
        let action = 'action';
        let operator = 'operator';
        let source = actionType === Constants_1.Constants.SYNC ? this.getSource() : '';
        let xml = this.builder.begin().ele(rootElement).att(this.configService.getNameSpaceAttr(), this.configService.getNameSpace());
        let startTag = (actionType === 'Sync') ? xml.ele(osSet).att(action, Constants_1.Constants.ACTIONS_ADDCHANGE) : xml.ele(osSet);
        let autoScript = startTag.ele(this.configService.getObjectName());
        switch (actionType) {
            case Constants_1.Constants.QUERY:
                autoScript.ele(this.configService.getObjectName(), this.configService.getFilename()).att(operator, Constants_1.Constants.OPERATOR_EQUALTO); // To search by = in a single script
                break;
            case Constants_1.Constants.QUERYALL:
                break; // 2nd Autoscript not needed in case of not filtered data
            case Constants_1.Constants.SYNC:
                autoScript.ele(this.configService.getObjectName(), this.configService.getFilename()); // 2nd AUTOSCRIPT TAG
                autoScript.ele(this.configService.getLogTag(), this.configService.getLogLevel()); // Adding log level
                autoScript.ele(this.configService.getSourceTag(), source); // Adding Source
                break;
            default:
                break;
        }
        xml = xml.end({ pretty: true });
        return xml;
    }
    getSource() {
        this.vscode.window.activeTextEditor.document.save();
        let source = this.vscode.window.activeTextEditor.document.getText();
        return source;
    }
}
exports.AutoScriptXMLService = AutoScriptXMLService;
//# sourceMappingURL=AutoScriptXMLService.js.map