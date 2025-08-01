import IConfigService from './IConfigService';
import * as path from 'path';

export class ConfigService implements IConfigService {
  private httpProtocol: string;
  private username: string;
  private password: string;
  private apikey: string;
  private hostname: string;
  private port: number;
  private os: string;
  private appxmlOs: string;
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
  private vscode = require("vscode");
  private formatXmlOnDownloadAndCompare: boolean;

  constructor() {
    const config = this.vscode.workspace.getConfiguration('mxscript');

    this.hostname = config.get('serverSettings.hostname');
    this.httpProtocol = config.get('serverSettings.httpProtocol');
    this.port = config.get('serverSettings.port');
    this.username = config.get('authentication.username');
    this.password = config.get('authentication.password');
    this.apikey = config.get('authentication.apikey');
    this.os = config.get('serverSettings.objectStructure');
    this.appxmlOs = config.get('appxml.objectStructure');
    this.authType = config.get('authentication.authenticationType');
    this.ldapAuth = (this.authType === 'internal' || this.authType === 'api') ? false : true;
    this.scriptLogLevel = config.get('scriptSettings.logLevel');
    this.isNextGen = config.get('version.supportsNextgenApi');
    this.prefersPythonInEditor = config.get('scriptSettings.createPythonFileForJythonScripts');
    this.url = this.generateUrl(this.httpProtocol, this.hostname, this.port);
    this.urlXML = this.generateUrlForXML(this.hostname, this.port, this.os);
    this.object = 'AUTOSCRIPT';
    this.nameSpaceAttr = 'xmlns';
    this.nameSpace = 'http://www.ibm.com/maximo';
    this.sourceTag = 'SOURCE';
    this.languageTag = 'SCRIPTLANGUAGE';
    this.LOG = 'LOG';
    this.activeEnvironmentName = config.get('serverSettings.activeEnvironmentName');
    this.ignoreSsl = config.get("scriptSettings.ignoresslerrors");
    // NOTE: The line below is a global side-effect. It's better to manage this in extension.ts
    // using vscode.workspace.onDidChangeConfiguration to avoid race conditions and redundancy.
    // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = this.ignoreSsl ? '0' : '1';
    this.formatXmlOnDownloadAndCompare = config.get("appxml.formatOnDownloadAndCompare") !== false;
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
  public ignoreSslError(): boolean {
    return this.ignoreSsl;
  }
  public getHostname(): string {
    return this.hostname;
  }

  public getActiveEnvironmentName(): string {
    return this.activeEnvironmentName;
  }

  public getFormatXmlOnDownloadAndCompare(): boolean {
    return this.formatXmlOnDownloadAndCompare;
  }

  public getAppxmlOs(): string {
    return this.appxmlOs;
  }
  public getIgnoreSslErrors(): boolean {
    return this.ignoreSsl;
  }

  public toString(): string {
    return JSON.stringify({
      username: this.username,
      password: this.password,
      apikey: this.apikey,
      os: this.os,
      appxmlOs: this.appxmlOs,
      authType: this.authType,
      ldapAuth: this.ldapAuth,
      url: this.url,
      activeEnvironmentName: this.activeEnvironmentName,
      ignoreSsl: this.ignoreSsl
    });
  }

}