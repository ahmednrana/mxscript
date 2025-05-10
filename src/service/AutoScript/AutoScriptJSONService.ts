import fetch, { Response } from 'node-fetch';
import { URL, URLSearchParams } from 'url';
import * as vscode from "vscode";
import { AuthService } from '../Authentication/AuthService';
import IConfigService from '../Config/IConfigService';
import { IAutoScriptService } from './IAutoScriptService';

export class AutoScriptJSONService implements IAutoScriptService {
    private authService: AuthService;
    private configService: IConfigService;
    private autoScriptURL: string;
    private vscode = require("vscode");
    private path = require("path");


    constructor(context: vscode.ExtensionContext, cs: IConfigService) {
        this.configService = cs;
        this.authService = new AuthService(this.configService, context);
        let url = this.configService.getUrl();
        let os = this.configService.getOS();
        this.autoScriptURL = url + '/maximo/oslc/os/' + os;
    }
    public async downloadAllScripts() {

    }
    public async updateScript() {
        if (!this.authService.isCookieSet()) {
            await this.authService.authenticate();
            if (!this.authService.isCookieSet()) {
                console.log("Twice authentication failed");
                return;
            }
        }
        let fileName = this.configService.getFilename();

        var url = new URL(this.autoScriptURL);

        var params = { 'oslc.select': 'source', 'oslc.where': `autoscript="${fileName}"` };

        url.search = new URLSearchParams(params).toString();
        let headers = this.authService.getAuthHeaders();
        let updateResponse: Response = await fetch(url, { headers: headers });

        if (!updateResponse.ok) {
            console.error('error');
            this.vscode.window.showErrorMessage("Error in fetching data " + updateResponse.status + " " + updateResponse.statusText);
        }

        if (updateResponse.url.includes('login.jsp')) {
            console.error('Cookie Expired');
            this.authService.disconnect();
            await this.authService.authenticate();
            headers = this.authService.getAuthHeaders();
            updateResponse = await fetch(this.autoScriptURL, { headers: headers });
        }
        let autoScriptData = await updateResponse.json();
        if (!autoScriptData["rdfs:member"]) {
            console.error('Malformed Response from server');
            return;
        }
        if (!autoScriptData["rdfs:member"][0]) {
            console.error('No Script by this name is found on server');
            vscode.window.showInformationMessage('No Script by this name is found on server\n' + updateResponse.body);
            return;
        }
        const sourceArray: string = autoScriptData["rdfs:member"].map((x: { [x: string]: string; }) => x['spi:source']);
        const source = sourceArray[0];

        // Write to File
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
            vscode.window.showInformationMessage('Success\n' + updateResponse.body);
            return vscode.workspace.applyEdit(edit);
        }
        else {
            vscode.window.showWarningMessage("The file open is not valid");
        }
    }
    public async uploadScript() {
        if (!this.authService.isCookieSet()) {
            await this.authService.authenticate();
        }
        var url = new URL(this.autoScriptURL);

        var params = { 'oslc.select': 'autoscript, language, source' };

        url.search = new URLSearchParams(params).toString();
        let headers = this.authService.getAuthHeaders();
        let syncResponse: Response = await fetch(url, { headers: headers });

        if (!syncResponse.ok) {
            console.error('error');
            this.vscode.window.showErrorMessage("Error in fetching data " + syncResponse.status + " " + syncResponse.statusText);
        }

        if (syncResponse.url.includes('login.jsp')) {
            console.error('Cookie Expired');
            this.authService.disconnect();
            await this.authService.authenticate();
            headers = this.authService.getAuthHeaders();
            syncResponse = await fetch(this.autoScriptURL, { headers: headers });
        }
        let autoScriptData = await syncResponse.json();
        if (!autoScriptData["rdfs:member"]) {
            console.error('Malformed Response from server');
            return;
        }
        if (!autoScriptData["rdfs:member"][0]) {
            console.error('No Script by this name is found on server');
            vscode.window.showInformationMessage('No Script by this name is found on server\n' + syncResponse.body);
            return;
        }
        let currentlyOpenTabfilePath: string = this.vscode.window.activeTextEditor.document.fileName;
        let filename: string = this.path.basename(currentlyOpenTabfilePath);

        console.log(currentlyOpenTabfilePath);
        console.log(filename);

      

    }
    public async compareWithServer() {
        if (!this.authService.isCookieSet()) {
            await this.authService.authenticate();
            if (!this.authService.isCookieSet()) {
                console.log("Twice authentication failed");
                return;
            }
        }
        let fileName = this.configService.getFilename();
        var url = new URL(this.autoScriptURL);
        var params = { 'oslc.select': 'source', 'oslc.where': `autoscript="${fileName}"` };

        url.search = new URLSearchParams(params).toString();
        let headers = this.authService.getAuthHeaders();
        let updateResponse: Response = await fetch(url, { headers: headers });

        if (!updateResponse.ok) {
            console.error('error');
            this.vscode.window.showErrorMessage("Error in fetching data " + updateResponse.status + " " + updateResponse.statusText);
        }

        if (updateResponse.url.includes('login.jsp')) {
            console.error('Cookie Expired');
            this.authService.disconnect();
            await this.authService.authenticate();
            headers = this.authService.getAuthHeaders();
            updateResponse = await fetch(this.autoScriptURL, { headers: headers });
        }
        let autoScriptData = await updateResponse.json();
        if (!autoScriptData["rdfs:member"]) {
            console.error('Malformed Response from server');
            return;
        }
        if (!autoScriptData["rdfs:member"][0]) {
            console.error('No Script by this name is found on server');
            vscode.window.showInformationMessage('No Script by this name is found on server\n' + updateResponse.body);
            return;
        }
        const sourceArray: string = autoScriptData["rdfs:member"].map((x: { [x: string]: string; }) => x['spi:source']);
        const source = sourceArray[0];
        // Compare To File

        let serverScript = vscode.Uri.parse('mxscript:' + source);
        const { activeTextEditor } = vscode.window;

        if (activeTextEditor) {
            const { document } = activeTextEditor;
            let original = document.uri;
            if (original !== null) {
                let title: string = fileName + "↔ " + this.configService.getUrl() + " version";
                vscode.commands.executeCommand('vscode.diff', original, serverScript, title);
            }
        }
        

    }


    public deleteScript() { }
    public executeScript() { }
}