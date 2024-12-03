'use strict';

import fetch, { Headers, Response } from "node-fetch";
import * as vscode from "vscode";
import IConfigService from "../Config/IConfigService";
import { IAuthService } from './IAuthService';


export class AuthService implements IAuthService {
    getCookie(): string {
        return this.context.workspaceState.get('AUTH_TOKEN', '');
    }

    private AUTH_PATH: string = '';
    private WHO_AM_I_PATH: string = '/maximo/oslc/whoami';
    private AUTH_TOKEN: string = 'AUTH_TOKEN';
    private _cookie: string = '';
    private _authType: string = '';
    private configService: IConfigService;
    private authOptions: any = {};
    private authUrl: string;
    private whoAmIUrl: string;
    private isLdap: boolean;
    private vscode = require("vscode");
    private context: vscode.ExtensionContext;
    constructor(cService: IConfigService, context: vscode.ExtensionContext) {
        this.configService = cService;
        this.authType = this.configService.getAuthType();
        this.context = context;
        this.setAuthPath();
        this.cookie = this.getCookie();
        this.isLdap = this.authType === 'maxauth' ? false : true;
        this.authUrl = this.configService.getUrl() + this.AUTH_PATH;
        this.whoAmIUrl = this.configService.getUrl() + this.WHO_AM_I_PATH;
        this.authOptions = {
            headers: this.getInitAuthHeaders(),
            method: this.authType === 'basic' ? 'GET' : 'POST',
            credentials: 'same-origin',
            redirect: this.authType === 'basic' ? 'follow' : 'manual',
            body: this.getFormBodyForAuth()
        };
    }
    get cookie(): string {
        if (this._cookie && this._cookie.length > 0) {
            return this._cookie;
        }
        return '';
    }
    set cookie(cookie: string) {
        this._cookie = cookie;
    }
    get authType(): string {
        return this._authType;
    }
    set authType(authType: string) {
        this._authType = authType;
    }
    public isCookieSet(): boolean {
        return this._cookie && this._cookie.length > 0 ? true : false;
    }
    setAuthPath() {
        switch (this.authType) {
            case "basic":
                this.AUTH_PATH = '/maxrest/rest/login';
                break;

            case "form":
                this.AUTH_PATH = '/maximo/j_security_check';
                break;

            case "maxauth":
                this.AUTH_PATH = '/oslc/login';
                break;
            case 'apikey':
                this.AUTH_PATH = '/oslc/login';
                break;
            default:
                this.AUTH_PATH = '/oslc/login'; // maxauth
                break;
        }
    }
    getInitAuthHeaders(): Headers {
        let headers = new Headers();

        switch (this.authType) {
            case "apikey":
                headers.set('apikey', this.configService.getApiKey());

                break;
            case "basic":
                headers.set('Authorization', 'Basic ' + new Buffer(this.configService.getCredentials()).toString('base64'));

                break;

            case "form":
                headers.set('Content-Type', 'application/x-www-form-urlencoded');

                break;

            case "maxauth":
                headers.set('maxauth', new Buffer(this.configService.getCredentials()).toString('base64'));

                break;
            default:
                headers.set('maxauth', new Buffer(this.configService.getCredentials()).toString('base64'));

                break;
        }
        return headers;
    }
    getAuthHeaders(): Headers {
        let headers = new Headers();

        switch (this.authType) {
            case "apikey":
                headers.set('apikey', this.configService.getApiKey());
                break;

            case "basic":
                headers.set('cookie', this._cookie);

                break;

            case "form":
                headers.set('cookie', this._cookie);

                break;

            case "maxauth":
                headers.set('maxauth', new Buffer(this.configService.getCredentials()).toString('base64'));

                break;
            default:
                headers.set('maxauth', new Buffer(this.configService.getCredentials()).toString('base64'));

                break;
        }
        return headers;
    }
    getFormBodyForAuth() {
        if (this._authType === 'form') {
            const { URLSearchParams } = require('url');

            const params = new URLSearchParams();
            params.append('j_username', this.configService.getUsername());
            params.append('j_password', this.configService.getPassword());
            return params;
        }
        return null;
    }
    public async authenticate() {
        let authResponse: Response = await fetch(this.authUrl, this.authOptions);

        if (authResponse.url.endsWith('loginerror.jsp')) {
            console.log('error');
            this.vscode.window.showErrorMessage("Error unable to login. Please re check credentials");
        }
        else if (this.authType === 'basic' && !authResponse.ok) {
            console.log('error');
            this.vscode.window.showErrorMessage("Error unable to login. Please re check credentials");
        }
        else if (this.authType === 'form' && (!authResponse.ok && authResponse.status !== 302)) {
            console.log('error');
            this.vscode.window.showErrorMessage("Error unable to login. Please re check credentials");
        }
        else if (this.authType === 'maxauth' && !authResponse.ok) {
            console.log('Login error: ' + this.authType);
            this.vscode.window.showErrorMessage("Error unable to login. Please re check credentials");
        }
        else {
            console.log('fetched response');
            let cookieReceivedFromServer = authResponse.headers.get('set-cookie');
            if (cookieReceivedFromServer) {
                let cookieTypeToCheck = (this.isLdap) ? 'LtpaToken2' : 'JSESSIONID';

                if (cookieReceivedFromServer.includes(cookieTypeToCheck)) {
                    this.context.workspaceState.update(this.AUTH_TOKEN, cookieReceivedFromServer);
                    this.cookie = cookieReceivedFromServer;
                }
                else {
                    console.error('Login Error: No Valid Cookie returned');
                    this.vscode.window.showErrorMessage("No valid cookie returned");
                }

            }
            else {
                console.error('No cookie found in response');
                this.vscode.window.showErrorMessage("Error in login. No cookie returned.");
            }
        }
    }
    public async checkAuthentication() {
        if (this.isCookieSet()) {
            let headers = new Headers();
            headers.set('cookie', this._cookie);
            let whoAmIResponse: any = await fetch(this.whoAmIUrl, { headers: headers });
            let userData = await whoAmIResponse.json();
            this.vscode.window.showInformationMessage("You are logged in as " + userData.personid);
        }
        else {
            this.vscode.window.showErrorMessage("You are Not logged");
            this.disconnect();
        }
    }
    public async disconnect() {
        this.cookie = '';
        this.context.workspaceState.update('AUTH_TOKEN', '');
    }
}