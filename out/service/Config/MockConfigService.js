"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockConfigService = void 0;
class MockConfigService {
    constructor(authType) {
        this.vscode = require("vscode");
        this.path = require("path");
        this.hostname = '10.231.105.128';
        this.httpProtocol = 'http';
        this.port = 9080;
        this.username = 'maxadmin';
        this.password = 'maxadmin';
        this.apikey = '';
        this.os = 'MXSCRIPTOS';
        this.authType = authType;
        this.scriptLogLevel = 'DEBUG';
        this.isNextGen = true;
        this.prefersJython = true;
        this.url = this.generateUrl(this.httpProtocol, this.hostname, this.port);
        this.urlXML = this.generateUrlForXML(this.hostname, this.port, this.os);
        this.object = 'AUTOSCRIPT';
        this.nameSpaceAttr = 'xmlns';
        this.nameSpace = 'http://www.ibm.com/maximo';
        this.sourceTag = "SOURCE";
        this.LOG = "LOG";
        this.languageTag = "SCRIPTLANGUAGE";
        this.ignoreSsl = true;
    }
    ignoreSslError() {
        return this.ignoreSsl;
    }
    getLanguageTag() {
        return this.languageTag;
    }
    getFileExtension() {
        return "py";
    }
    getCreatePythonScriptInEditor() {
        return this.prefersJython;
    }
    getSourceTag() {
        return this.sourceTag;
    }
    getLogLevel() {
        return "ERROR";
    }
    getUrl() {
        return this.url;
    }
    isLdap() {
        return true;
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
    getApiKey() {
        return this.apikey;
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
    generateUrlForXML(url, port, os) {
        return this.url + '/meaweb/os/' + os;
    }
    generateUrl(httpProtocol, hostname, port) {
        let url = httpProtocol + "://" + hostname;
        url = (port && port > 0) ? url + ":" + port : url;
        return url;
    }
    getFilename() {
        return 'OSACTION.MXAPIINSPRESULT.CREATEWO';
    }
}
exports.MockConfigService = MockConfigService;
//# sourceMappingURL=MockConfigService.js.map