import IConfigService from './IConfigService';
export class ConfigService implements IConfigService {
  private httpProtocol: string;
  private vscode = require("vscode");
  private path = require("path");
  private username: string;
  private password: string;
  private apikey: string;
  private hostname: string;
  private port: number;
  private os: string;
  private object: string;
  private nameSpaceAttr: string;
  private nameSpace: string;
  private urlXML: string;
  private url: string;
  private sourceTag: string;
  private languageTag: string;
  private scriptLogLevel: string;
  private authType: string;
  private LOG: string;
  private isNextGen: boolean;
  private prefersPythonInEditor: boolean;
  private ldapAuth: boolean;
  private activeEnvironmentName: string;
  private ignoreSsl: boolean;

  constructor() {
    this.hostname = this.vscode.workspace.getConfiguration().get('mxscript.serverSettings.hostname');
    this.httpProtocol = this.vscode.workspace.getConfiguration().get('mxscript.serverSettings.httpProtocol');
    this.port = this.vscode.workspace.getConfiguration().get('mxscript.serverSettings.port');
    this.username = this.vscode.workspace.getConfiguration().get('mxscript.authentication.username');
    this.password = this.vscode.workspace.getConfiguration().get('mxscript.authentication.password');
    this.apikey = this.vscode.workspace.getConfiguration().get('mxscript.authentication.apikey');
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
    this.activeEnvironmentName = this.vscode.workspace.getConfiguration().get('mxscript.serverSettings.activeEnvironmentName');
    this.ignoreSsl = this.vscode.workspace.getConfiguration().get("mxscript.scriptSettings.ignoresslerrors");
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = this.ignoreSsl ? '0' : '1';
  }
  getFileExtension(): string {
    let currentlyOpenTabfilePath: string = this.vscode.window.activeTextEditor.document.fileName;
    let filename: string = this.path.basename(currentlyOpenTabfilePath);
    filename = filename.toLowerCase();
    let extension = filename.substr(filename.lastIndexOf(".") + 1, filename.length);
    return extension;
  }
  getLanguageTag(): string {
    return this.languageTag;
  }
  getSourceTag(): string {
    return this.sourceTag;
  }
  getLogLevel(): string {
    return this.scriptLogLevel;
  }
  getCreatePythonScriptInEditor(): boolean {
    return this.prefersPythonInEditor;
  }
  public isLdap(): boolean {
    return this.ldapAuth;
  }
  public getUrl(): string {
    return this.url;
  }
  public getHttpProtocol(): string {
    return this.httpProtocol;
  }
  public getAuthType(): string {
    return this.authType;
  }
  public getLogTag(): string {
    return this.LOG;
  }
  public getPort(): Number {
    return this.port;
  }
  public getObjectName(): string {
    return this.object;
  }
  public getNameSpaceAttr(): string {
    return this.nameSpaceAttr;
  }
  public getNameSpace(): string {
    return this.nameSpace;
  }
  public getUsername(): string {
    return this.username;
  }
  public getPassword(): string {
    return this.password;
  }
  public getApiKey(): string {
    return this.apikey;
  }
  public getCredentials(): string {
    return this.username + ":" + this.password;
  }
  public getOS(): string {
    return this.os;
  }
  public getXMLUrl(): string {
    return this.urlXML;
  }

  public getIsNextGen(): boolean {
    return this.isNextGen;
  }
  private generateUrlForXML(url: string, port: number, os: string): string {
    return this.url + '/meaweb/os/' + os;
  }
  private generateUrl(httpProtocol: string, hostname: string, port: number): string {
    let url: string = httpProtocol + "://" + hostname;
    url = (port && port > 0) ? url + ":" + port : url;
    return url;
  }
  public getFilename(): string {
    let currentlyOpenTabfilePath: string = this.vscode.window.activeTextEditor.document.fileName;
    let filename: string = this.path.basename(currentlyOpenTabfilePath);
    filename = filename.toUpperCase();
    filename = filename.substr(0, filename.lastIndexOf("."));
    return filename;
  }
  public ignoreSslError(): boolean {
    return this.ignoreSsl;
  }
  public getHostname: () => string = () => {
    return this.hostname;
  };

  public getActiveEnvironmentName: () => string = () => {
    return this.activeEnvironmentName;
  };

  public toString(): string {
    return JSON.stringify({
      username: this.username,
      password: this.password,
      apikey: this.apikey,
      os: this.os,
      authType: this.authType,
      ldapAuth: this.ldapAuth,
      url: this.url,
      activeEnvironmentName: this.activeEnvironmentName,
      ignoreSsl: this.ignoreSsl
    });
  }

}