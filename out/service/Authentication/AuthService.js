'use strict';
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
class AuthService {
    constructor(cService, context) {
        this.AUTH_PATH = '';
        this.WHO_AM_I_PATH = '/maximo/oslc/whoami';
        this.AUTH_TOKEN = 'AUTH_TOKEN';
        this._cookie = '';
        this._authType = '';
        this.authOptions = {};
        this.vscode = require("vscode");
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
    getCookie() {
        return this.context.workspaceState.get('AUTH_TOKEN', '');
    }
    get cookie() {
        if (this._cookie && this._cookie.length > 0) {
            return this._cookie;
        }
        return '';
    }
    set cookie(cookie) {
        this._cookie = cookie;
    }
    get authType() {
        return this._authType;
    }
    set authType(authType) {
        this._authType = authType;
    }
    isCookieSet() {
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
            default:
                this.AUTH_PATH = '/oslc/login'; // maxauth
                break;
        }
    }
    getInitAuthHeaders() {
        let headers = new node_fetch_1.Headers();
        switch (this.authType) {
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
    getAuthHeaders() {
        let headers = new node_fetch_1.Headers();
        switch (this.authType) {
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
    authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            let authResponse = yield node_fetch_1.default(this.authUrl, this.authOptions);
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
        });
    }
    checkAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isCookieSet()) {
                let headers = new node_fetch_1.Headers();
                headers.set('cookie', this._cookie);
                let whoAmIResponse = yield node_fetch_1.default(this.whoAmIUrl, { headers: headers });
                let userData = yield whoAmIResponse.json();
                this.vscode.window.showInformationMessage("You are logged in as " + userData.personid);
            }
            else {
                this.vscode.window.showErrorMessage("You are Not logged");
                this.disconnect();
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.cookie = '';
            this.context.workspaceState.update('AUTH_TOKEN', '');
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map