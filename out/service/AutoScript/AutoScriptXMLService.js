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
exports.AutoScriptXMLService = void 0;
const node_fetch_1 = require("node-fetch");
const url_1 = require("url");
const vscode = require("vscode");
const vscode_1 = require("vscode");
const AutoScriptXML_model_1 = require("../../model/AutoScriptXML.model");
const Constants_1 = require("../../Constants");
var parseString = require('xml2js').parseString;
var parseStringPromise = require('xml2js').parseStringPromise;
class AutoScriptXMLService {
    constructor(context, cs) {
        this.vscode = require("vscode");
        this.builder = require('xmlbuilder');
        this.languageToExtension = new Map();
        this.configService = cs;
        this.initializeLanguages();
    }
    initializeLanguages() {
        this.languageToExtension.set(Constants_1.Constants.LANG_GROOVY, Constants_1.Constants.EXT_GROOVY);
        this.languageToExtension.set(Constants_1.Constants.LANG_NASHORN, Constants_1.Constants.EXT_NASHORN);
        this.languageToExtension.set(Constants_1.Constants.LANG_JS, Constants_1.Constants.EXT_JS);
        this.languageToExtension.set(Constants_1.Constants.LANG_JAVASCRIPT, Constants_1.Constants.EXT_JAVASCRIPT);
        this.languageToExtension.set(Constants_1.Constants.LANG_ECMASCRIPT, Constants_1.Constants.EXT_ECMASCRIPT);
        this.languageToExtension.set(Constants_1.Constants.LANG_PYTHON, Constants_1.Constants.EXT_PYTHON);
        if (this.configService.getCreatePythonScriptInEditor()) {
            this.languageToExtension.set(Constants_1.Constants.LANG_JYTHON, Constants_1.Constants.EXT_PYTHON);
        }
        else {
            this.languageToExtension.set(Constants_1.Constants.LANG_JYTHON, Constants_1.Constants.EXT_JYTHON);
        }
    }
    getAuthHeaders() {
        let headers = new node_fetch_1.Headers();
        if (this.configService.getAuthType() === 'apikey') {
            headers.set('apikey', this.configService.getApiKey());
        }
        else if (this.configService.isLdap()) {
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
                const https = require('https');
                const httpsAgent = new https.Agent({
                    rejectUnauthorized: false,
                });
                let payload = { method: 'POST', body: packet, headers: headers };
                if (this.configService.getHttpProtocol() === "https") {
                    payload = Object.assign(Object.assign({}, payload), { agent: httpsAgent });
                }
                console.log(`URL: ${url} Auth: ${this.configService.getAuthType()} \nPACKET: \n ${packet}`);
                downloadAllResponse = yield (0, node_fetch_1.default)(url, payload)
                    .catch(e => {
                    console.log(e.message);
                    vscode.window.showErrorMessage('Error ' + e.status + " : " + e.message + "\n" + e.body);
                    return;
                });
                downloadAllResponse = downloadAllResponse;
                let autoScriptData = yield downloadAllResponse.text();
                if (!downloadAllResponse.ok && downloadAllResponse.status !== 200 && downloadAllResponse.status !== 201) {
                    this.vscode.window.showErrorMessage("Error in fetching data " + autoScriptData);
                    return;
                }
                if (!autoScriptData.includes('creationDate')) {
                    this.vscode.window.showErrorMessage("Empty Response " + autoScriptData);
                    return;
                }
                progress.report({ increment: 50, message: "Writing scripts" });
                // parseStringPromise(autoScriptData).then(function (result: string) {
                //     console.dir(result);
                //     console.log('Done');
                // })
                //     .catch(function (err: any) {
                //         // Failed
                //     });
                parseStringPromise(autoScriptData).then((parsedXML) => {
                    console.log(parsedXML);
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
                        let fileExt = this.languageToExtension.get(scriptLanguage);
                        let fileToSearch = `${scriptName}.${fileExt}`;
                        console.log(scriptName + " " + scriptLanguage);
                        let workspacePath = selectedFolderUriResolved.fsPath;
                        const fsPromises = require('fs').promises;
                        if (vscode.workspace.workspaceFolders) {
                            console.log('Writing file: ', fileToSearch);
                            fsPromises.writeFile(`${workspacePath}/${fileToSearch}`, source);
                        }
                    }
                }).catch(function (err) {
                    console.log(err);
                    vscode.window.showWarningMessage("There was an error in downloading all scripts\n" + err);
                });
                // parseString(autoScriptData, async function (err: any, parsedXML: any) {
                //     let languageToExtension: Map<string, string>;
                //     languageToExtension = new Map<string, string>();
                //     languageToExtension.set(Constants.LANG_GROOVY, Constants.EXT_GROOVY);
                //     languageToExtension.set(Constants.LANG_PYTHON, Constants.EXT_PYTHON);
                //     languageToExtension.set(Constants.LANG_JYTHON, Constants.EXT_JYTHON);
                //     languageToExtension.set(Constants.LANG_NASHORN, Constants.EXT_NASHORN);
                //     languageToExtension.set(Constants.LANG_JS, Constants.EXT_JS);
                //     languageToExtension.set(Constants.LANG_JAVASCRIPT, Constants.EXT_JAVASCRIPT);
                //     languageToExtension.set(Constants.LANG_ECMASCRIPT, Constants.EXT_ECMASCRIPT);
                //     let firstKeyInParsedXML = Object.keys(parsedXML)[0];
                //     if (parsedXML[Object.keys(parsedXML)[0]][Object.keys(parsedXML[firstKeyInParsedXML])[0]].rsCount === "0") {
                //         vscode.window.showInformationMessage('No Script by this name is found on server\n' + autoScriptData);
                //         return;
                //     }
                //     let autoScriptXml: any[] = parsedXML[Object.keys(parsedXML)[0]][Object.keys(parsedXML[firstKeyInParsedXML])[1]][0].AUTOSCRIPT;
                //     let scripts: AutoScriptXMLModel[] = autoScriptXml.map(
                //         xml => new AutoScriptXMLModel(xml)
                //     );
                //     for (let autoScript of scripts) {
                //         let source: string = autoScript.getSource();
                //         let scriptName: string = autoScript.getAutoScriptName();
                //         let scriptLanguage: string = autoScript.getScriptLanguage();
                //         let fileExt = languageToExtension.get(scriptLanguage);
                //         let fileToSearch = `${scriptName}.${fileExt}`;
                //         console.log(scriptName + " " + scriptLanguage);
                //         let workspacePath = selectedFolderUriResolved.fsPath;
                //         const fsPromises = require('fs').promises;
                //         if (vscode.workspace.workspaceFolders) {
                //             console.log('Writing file: ', fileToSearch);
                //             fsPromises.writeFile(`${workspacePath}/${fileToSearch}`, source);
                //         }
                //     }
                // }).bind(this);
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
            console.log(`URL: ${url} Auth: ${this.configService.getAuthType()} \nPACKET: \n ${packet}`);
            const https = require('https');
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false,
            });
            let payload = { method: 'POST', body: packet, headers: headers };
            if (this.configService.getHttpProtocol() === "https") {
                payload = Object.assign(Object.assign({}, payload), { agent: httpsAgent });
            }
            let updateResponse = yield (0, node_fetch_1.default)(url, payload)
                .catch(e => {
                console.log(e.message);
                vscode.window.showErrorMessage('Error ' + e.status + " : " + e.message + "\n" + e.body);
                return;
            });
            updateResponse = updateResponse;
            let autoScriptData = yield updateResponse.text();
            if (!updateResponse.ok && updateResponse.status !== 200 && updateResponse.status !== 201) {
                this.vscode.window.showErrorMessage("Error in fetching data " + autoScriptData);
                return;
            }
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
    uploadScript() {
        return __awaiter(this, void 0, void 0, function* () {
            var url = new url_1.URL(this.configService.getXMLUrl());
            let headers = this.getAuthHeaders();
            let packet = this.constructPacket(Constants_1.Constants.SYNC);
            console.log(`URL: ${url} Auth: ${this.configService.getAuthType()} \nPACKET: \n ${packet}`);
            const https = require('https');
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false,
            });
            let payload = { method: 'POST', body: packet, headers: headers };
            if (this.configService.getHttpProtocol() === "https") {
                payload = Object.assign(Object.assign({}, payload), { agent: httpsAgent });
            }
            let syncResponse = yield (0, node_fetch_1.default)(url, payload)
                .catch(e => {
                console.log(e.message);
                vscode.window.showErrorMessage('Error ' + e.status + " : " + e.message + "\n" + e.body);
                return;
            });
            syncResponse = syncResponse;
            console.log(`upload script status = ${syncResponse.status}`);
            let autoScriptData = yield syncResponse.text();
            if (!syncResponse.ok && syncResponse.status !== 200 && syncResponse.status !== 201) {
                this.vscode.window.showErrorMessage("Error in uploading script " + autoScriptData);
                return;
            }
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
            console.log(`URL: ${url} Auth: ${this.configService.getAuthType()} \nPACKET: \n ${packet}`);
            const https = require('https');
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false,
            });
            let payload = { method: 'POST', body: packet, headers: headers };
            if (this.configService.getHttpProtocol() === "https") {
                payload = Object.assign(Object.assign({}, payload), { agent: httpsAgent });
            }
            let compareResponse = yield (0, node_fetch_1.default)(url, payload)
                .catch(e => {
                console.log(`Error: ${e.message}`);
                vscode.window.showErrorMessage('Error ' + e.status + " : " + e.message + "\n" + e.body);
                return;
            });
            compareResponse = compareResponse;
            console.log(`upload script status = ${compareResponse.status}`);
            let autoScriptData = yield compareResponse.text();
            if (!compareResponse.ok && compareResponse.status !== 200 && compareResponse.status !== 201) {
                this.vscode.window.showErrorMessage("Error in fetching data " + autoScriptData);
                return;
            }
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
                let language = (this.configService.getCreatePythonScriptInEditor() && this.configService.getFileExtension() === 'py') ? 'jython' : this.getLanguageFromExtension(this.configService.getFileExtension());
                autoScript.ele(this.configService.getLanguageTag(), language);
                break;
            default:
                break;
        }
        xml = xml.end({ pretty: true });
        return xml;
    }
    getLanguageFromExtension(extension) {
        let language = [...this.languageToExtension.entries()]
            .filter(({ 1: v }) => v === extension)
            .map(([k]) => k);
        return language[0];
    }
    getSource() {
        this.vscode.window.activeTextEditor.document.save();
        let source = this.vscode.window.activeTextEditor.document.getText();
        return source;
    }
}
exports.AutoScriptXMLService = AutoScriptXMLService;
//# sourceMappingURL=AutoScriptXMLService.js.map