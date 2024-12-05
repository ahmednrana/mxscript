import fetch, { Headers, Response } from 'node-fetch';
import { URL } from 'url';
import * as vscode from 'vscode';
import { ProgressLocation, window } from 'vscode';
import AutoScriptXMLModel from '../../model/AutoScriptXML.model';
import { Constants } from '../../Constants';
import IConfigService from '../Config/IConfigService';
import { IAutoScriptService } from './IAutoScriptService';
var parseString = require('xml2js').parseString;
var parseStringPromise = require('xml2js').parseStringPromise;


export class AutoScriptXMLService implements IAutoScriptService {
    private vscode = require("vscode");
    private builder = require('xmlbuilder');
    private configService: IConfigService;
    private languageToExtension: Map<string, string> = new Map<string, string>();

    constructor(context: vscode.ExtensionContext, cs: IConfigService) {
        this.configService = cs;
        this.initializeLanguages();
    }
    initializeLanguages() {
        this.languageToExtension.set(Constants.LANG_GROOVY, Constants.EXT_GROOVY);
        this.languageToExtension.set(Constants.LANG_NASHORN, Constants.EXT_NASHORN);
        this.languageToExtension.set(Constants.LANG_JS, Constants.EXT_JS);
        this.languageToExtension.set(Constants.LANG_JAVASCRIPT, Constants.EXT_JAVASCRIPT);
        this.languageToExtension.set(Constants.LANG_ECMASCRIPT, Constants.EXT_ECMASCRIPT);
        this.languageToExtension.set(Constants.LANG_PYTHON, Constants.EXT_PYTHON);
        if (this.configService.getCreatePythonScriptInEditor()) {
            this.languageToExtension.set(Constants.LANG_JYTHON, Constants.EXT_PYTHON);
        }
        else {
            this.languageToExtension.set(Constants.LANG_JYTHON, Constants.EXT_JYTHON);
        }
    }

    getAuthHeaders(): Headers {
        let headers = new Headers();
        if(this.configService.getAuthType() === 'apikey'){
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
    public async downloadAllScripts() {

        // Getting folder to download scripts
        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage("Please open a project first");
            return;
        }
        let rootFolder = vscode.workspace.workspaceFolders[0]; // Workspace root folder
        let packet: string = this.constructPacket(Constants.QUERYALL);
        var url = new URL(this.configService.getXMLUrl());
        let headers: Headers = this.getAuthHeaders();
        const options: vscode.OpenDialogOptions = {
            canSelectMany: false,
            openLabel: 'Select',
            canSelectFiles: false,
            canSelectFolders: true,
            defaultUri: rootFolder.uri,
            filters: {
                'All files': ['*']
            }
        };
        let selectedFolderUri: vscode.Uri | undefined = await vscode.window.showOpenDialog(options).then(folderUri => {

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
        let selectedFolderUriResolved: vscode.Uri = selectedFolderUri as vscode.Uri;
        let downloadAllResponse: Response | void = new Response();

        window.withProgress({
            location: ProgressLocation.Notification,
            title: "Downloading All Scripts\n",
            cancellable: true
        }, async (progress, token) => {
            token.onCancellationRequested(() => {
                console.log("User canceled the download all scripts operation");
                return;
            });
            progress.report({ increment: 0, message: "Downloading scripts. Please wait..." });
            const https = require('https');
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false,
            });
            let payload: any = { method: 'POST', body: packet, headers: headers };

            if (this.configService.getHttpProtocol() === "https") {
                payload = { ...payload, agent: httpsAgent };
            }
            console.log(`URL: ${url} Auth: ${this.configService.getAuthType()} \nPACKET: \n ${packet}`);

            downloadAllResponse = await fetch(url, payload)
                .catch(e => {
                    console.log(e.message);
                    vscode.window.showErrorMessage('Error ' + e.status + " : " + e.message + "\n" + e.body);
                    return;
                });
            downloadAllResponse = downloadAllResponse as Response;
            let autoScriptData: string = await downloadAllResponse.text();

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
            parseStringPromise(autoScriptData).then((parsedXML: any) => {
                console.log(parsedXML);
                let firstKeyInParsedXML = Object.keys(parsedXML)[0];
                if (parsedXML[Object.keys(parsedXML)[0]][Object.keys(parsedXML[firstKeyInParsedXML])[0]].rsCount === "0") {
                    vscode.window.showInformationMessage('No Script by this name is found on server\n' + autoScriptData);
                    return;
                }
                let autoScriptXml: any[] = parsedXML[Object.keys(parsedXML)[0]][Object.keys(parsedXML[firstKeyInParsedXML])[1]][0].AUTOSCRIPT;
                let scripts: AutoScriptXMLModel[] = autoScriptXml.map(
                    xml => new AutoScriptXMLModel(xml)
                );

                for (let autoScript of scripts) {
                    let source: string = autoScript.getSource();
                    let scriptName: string = autoScript.getAutoScriptName();
                    let scriptLanguage: string = autoScript.getScriptLanguage();
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
            }).catch(function (err: any) {
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
            var prom = new Promise<void>(resolve => {
                resolve();
                console.log('Resolving Progressbar Promise');
            });
            console.log('Ending Progressbar');
            progress.report({ increment: 50, message: "Complete" });
            return prom;
        });


    }

    // update opened script from Maximo
    public async updateScript() {

        var url = new URL(this.configService.getXMLUrl());
        let headers: Headers = this.getAuthHeaders();
        let packet: string = this.constructPacket(Constants.QUERY);
        console.log(`URL: ${url} Auth: ${this.configService.getAuthType()} \nPACKET: \n ${packet}`);
        const https = require('https');
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
        let payload: any = { method: 'POST', body: packet, headers: headers };

        if (this.configService.getHttpProtocol() === "https") {
            payload = { ...payload, agent: httpsAgent };
        }
        let updateResponse = await fetch(url, payload)
            .catch(e => {
                console.log(e.message);
                vscode.window.showErrorMessage('Error ' + e.status + " : " + e.message + "\n" + e.body);
                return;
            });
        updateResponse = updateResponse as Response;
        let autoScriptData: string = await updateResponse.text();
        if (!updateResponse.ok && updateResponse.status !== 200 && updateResponse.status !== 201) {
            this.vscode.window.showErrorMessage("Error in fetching data " + autoScriptData);
            return;
        }
        if (!autoScriptData.includes('creationDate')) {
            this.vscode.window.showErrorMessage("Empty Response " + autoScriptData);
            return;
        }
        parseString(autoScriptData, function (err: any, parsedXML: any) {
            let firstKeyInParsedXML = Object.keys(parsedXML)[0];

            if (parsedXML[Object.keys(parsedXML)[0]][Object.keys(parsedXML[firstKeyInParsedXML])[0]].rsCount === "0") {
                vscode.window.showInformationMessage('No Script by this name is found on server\n' + autoScriptData);
                return;
            }
            let autoScriptXml: any[] = parsedXML[Object.keys(parsedXML)[0]][Object.keys(parsedXML[firstKeyInParsedXML])[1]][0].AUTOSCRIPT;

            let scripts: AutoScriptXMLModel[] = autoScriptXml.map(
                xml => new AutoScriptXMLModel(xml)
            );
            let autoScript: AutoScriptXMLModel = scripts[0];
            let source: string = autoScript.getSource();

            const { activeTextEditor } = vscode.window;

            if (activeTextEditor) {
                const { document } = activeTextEditor;
                const fullText = document.getText();
                const fullRange = new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(fullText.length)
                );

                const edit = new vscode.WorkspaceEdit();
                edit.replace(document.uri, fullRange, source);
                vscode.window.showInformationMessage('Success\n' + autoScriptData);
                return vscode.workspace.applyEdit(edit);
            }
            else {
                vscode.window.showWarningMessage("The file open is not valid");
            }
        });
    }

    // Sync opened script
    public async uploadScript() {
        var url = new URL(this.configService.getXMLUrl());
        let headers: Headers = this.getAuthHeaders();
        let packet: string = this.constructPacket(Constants.SYNC);
        console.log(`URL: ${url} Auth: ${this.configService.getAuthType()} \nPACKET: \n ${packet}`);

        const https = require('https');
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
        let payload: any = { method: 'POST', body: packet, headers: headers };

        if (this.configService.getHttpProtocol() === "https") {
            payload = { ...payload, agent: httpsAgent };
        }
        let syncResponse = await fetch(url, payload)
            .catch(e => {
                console.log(e.message);
                vscode.window.showErrorMessage('Error ' + e.status + " : " + e.message + "\n" + e.body);
                return;
            });
        syncResponse = syncResponse as Response;
        console.log(`upload script status = ${syncResponse.status}`)
        let autoScriptData: string = await syncResponse.text();

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
    }
    // Compare the server with currently open Editor
    public async compareWithServer() {

        var url = new URL(this.configService.getXMLUrl());
        let headers: Headers = this.getAuthHeaders();
        let packet: string = this.constructPacket(Constants.QUERY);
        console.log(`URL: ${url} Auth: ${this.configService.getAuthType()} \nPACKET: \n ${packet}`);
        const https = require('https');
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
        let payload: any = { method: 'POST', body: packet, headers: headers };

        if (this.configService.getHttpProtocol() === "https") {
            payload = { ...payload, agent: httpsAgent };
        }
        let compareResponse = await fetch(url, payload)
            .catch(e => {
                console.log(`Error: ${e.message}`);
                vscode.window.showErrorMessage('Error ' + e.status + " : " + e.message + "\n" + e.body);
                return;
            });
        compareResponse = compareResponse as Response;
        console.log(`upload script status = ${compareResponse.status}`)
        let autoScriptData: string = await compareResponse.text();
        if (!compareResponse.ok && compareResponse.status !== 200 && compareResponse.status !== 201) {
            this.vscode.window.showErrorMessage("Error in fetching data " + autoScriptData);
            return;
        }
        if (!autoScriptData.includes('creationDate')) {
            this.vscode.window.showErrorMessage("Empty Response " + autoScriptData);
            return;
        }
        let filename: string = this.configService.getFilename();
        parseString(autoScriptData, function (err: any, parsedXML: any) {
            let firstKeyInParsedXML = Object.keys(parsedXML)[0];

            if (parsedXML[Object.keys(parsedXML)[0]][Object.keys(parsedXML[firstKeyInParsedXML])[0]].rsCount === "0") {
                vscode.window.showInformationMessage('No Script by this name is found on server\n' + autoScriptData);
                return;
            }
            let autoScriptXml: any[] = parsedXML[Object.keys(parsedXML)[0]][Object.keys(parsedXML[firstKeyInParsedXML])[1]][0].AUTOSCRIPT;

            let scripts: AutoScriptXMLModel[] = autoScriptXml.map(
                xml => new AutoScriptXMLModel(xml)
            );
            let autoScript: AutoScriptXMLModel = scripts[0];
            let source: string = autoScript.getSource();
            source = encodeURIComponent(source);

            let serverScript = vscode.Uri.parse('mxscript:' + source);
            const { activeTextEditor } = vscode.window;

            if (activeTextEditor) {
                const { document } = activeTextEditor;
                let original = document.uri;
                if (original !== null) {
                    let title: string = filename + " ↔ Server's Version";
                    vscode.commands.executeCommand('vscode.diff', original, serverScript, title);
                }

                else {
                    vscode.window.showWarningMessage("The file open is not valid");
                }
            }
        });
    }


    private constructPacket(actionType: string) {
        let initTag: string = actionType === Constants.QUERYALL ? Constants.QUERY : actionType; // For Query All even the start tag should be Query
        let rootElement: string = initTag + this.configService.getOS();
        let osSet = actionType === 'Sync' ? this.configService.getOS() + 'Set' : this.configService.getOS() + 'Query';
        let action: string = 'action';
        let operator: string = 'operator';
        let source: string = actionType === Constants.SYNC ? this.getSource() : '';

        let xml = this.builder.begin().ele(rootElement).att(this.configService.getNameSpaceAttr(), this.configService.getNameSpace());
        let startTag = (actionType === 'Sync') ? xml.ele(osSet).att(action, Constants.ACTIONS_ADDCHANGE) : xml.ele(osSet);

        let autoScript = startTag.ele(this.configService.getObjectName());
        switch (actionType) {
            case Constants.QUERY:
                autoScript.ele(this.configService.getObjectName(), this.configService.getFilename()).att(operator, Constants.OPERATOR_EQUALTO);// To search by = in a single script
                break;
            case Constants.QUERYALL:
                break; // 2nd Autoscript not needed in case of not filtered data
            case Constants.SYNC:
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
    getLanguageFromExtension(extension: string): string {
        let language = [...this.languageToExtension.entries()]
            .filter(({ 1: v }) => v === extension)
            .map(([k]) => k);
        return language[0];
    }

    getSource(): string {
        this.vscode.window.activeTextEditor.document.save();
        let source: string = this.vscode.window.activeTextEditor.document.getText();
        return source;
    }

}