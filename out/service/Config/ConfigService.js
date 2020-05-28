"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigService {
    constructor() {
        this.vscode = require("vscode");
        this.path = require("path");
        this.hostname = this.vscode.workspace.getConfiguration().get('mxscript.serverSettings.hostname');
        this.httpProtocol = this.vscode.workspace.getConfiguration().get('mxscript.serverSettings.httpProtocol');
        this.port = this.vscode.workspace.getConfiguration().get('mxscript.serverSettings.port');
        this.username = this.vscode.workspace.getConfiguration().get('mxscript.authentication.username');
        this.password = this.vscode.workspace.getConfiguration().get('mxscript.authentication.password');
        this.os = this.vscode.workspace.getConfiguration().get('mxscript.serverSettings.objectStructure');
        this.authType = this.vscode.workspace.getConfiguration().get('mxscript.authentication.authenticationType');
        this.ldapAuth = (this.authType === 'internal') ? false : true;
        this.scriptLogLevel = this.vscode.workspace.getConfiguration().get('mxscript.scriptSettings.logLevel');
        this.isNextGen = this.vscode.workspace.getConfiguration().get('mxscript.version.supportsNextgenApi');
        this.prefersPythonInEditor = this.vscode.workspace.getConfiguration().get('mxscript.scriptSettings.createPythonFileForJythonScripts');
        this.url = this.generateUrl(this.httpProtocol, this.hostname, this.port);
        this.urlXML = this.generateUrlForXML(this.hostname, this.port, this.os);
        this.object = 'AUTOSCRIPT';
        this.nameSpaceAttr = 'xmlns';
        this.nameSpace = 'http://www.ibm.com/maximo';
        this.sourceTag = "SOURCE";
        this.languageTag = "SCRIPTLANGUAGE";
        this.LOG = "LOG";
    }
    getFileExtension() {
        let currentlyOpenTabfilePath = this.vscode.window.activeTextEditor.document.fileName;
        let filename = this.path.basename(currentlyOpenTabfilePath);
        filename = filename.toLowerCase();
        let extension = filename.substr(filename.lastIndexOf(".") + 1, filename.length);
        return extension;
    }
    getLanguageTag() {
        return this.languageTag;
    }
    getSourceTag() {
        return this.sourceTag;
    }
    getLogLevel() {
        return this.scriptLogLevel;
    }
    getCreatePythonScriptInEditor() {
        return this.prefersPythonInEditor;
    }
    isLdap() {
        return this.ldapAuth;
    }
    getUrl() {
        return this.url;
    }
    getHttpProtocol() {
        return this.httpProtocol;
    }
    getAuthType() {
        return this.authType;
    }
    getLogTag() {
        return this.LOG;
    }
    getPort() {
        return this.port;
    }
    getObjectName() {
        return this.object;
    }
    getNameSpaceAttr() {
        return this.nameSpaceAttr;
    }
    getNameSpace() {
        return this.nameSpace;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    getCredentials() {
        return this.username + ":" + this.password;
    }
    getOS() {
        return this.os;
    }
    getXMLUrl() {
        return this.urlXML;
    }
    getIsNextGen() {
        return this.isNextGen;
    }
    generateUrlForXML(url, port, os) {
        return this.url + '/meaweb/os/' + os;
    }
    generateUrl(httpProtocol, hostname, port) {
        let url = httpProtocol + "://" + hostname;
        url = (port && port > 0) ? url + ":" + port : url;
        return url;
    }
    getFilename() {
        let currentlyOpenTabfilePath = this.vscode.window.activeTextEditor.document.fileName;
        let filename = this.path.basename(currentlyOpenTabfilePath);
        filename = filename.toUpperCase();
        filename = filename.substr(0, filename.lastIndexOf("."));
        return filename;
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=ConfigService.js.map