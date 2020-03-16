import IConfigService from './IConfigService';
export class MockConfigService implements IConfigService{

 
  private httpProtocol: string;
  private vscode = require("vscode");
  private path = require("path");
  private username: string;
  private password: string;
  private hostname: string;
  private port: number;
  private os: string;
  private object: string;
  private nameSpaceAttr: string;
  private nameSpace: string;
  private urlXML: string;
  private url: string;
  private sourceTag: string;
  private scriptLogLevel: string;
  private authType: string;
  private LOG: string;
  private isNextGen: boolean;
  private prefersJython: boolean;

  constructor(authType: string) {
    this.hostname = '10.231.105.128';
    this.httpProtocol = 'http';
    this.port = 9080;
    this.username = 'maxadmin';
    this.password = 'maxadmin';
    this.os = 'MXAPIAUTOSCRIPT';
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
  }

  getSourceTag(): string {
    return this.sourceTag;
  }
  getLogLevel(): string {
    return "ERROR";
  }
  public getUrl(): string {
    return this.url;
  }
  public isLdap(): boolean {
    return true;
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
  public getCredentials(): string {
    return this.username + ":" + this.password;
  }
  public getOS(): string {
    return this.os;
  }
  public getXMLUrl(): string {
    return this.urlXML;
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
    return 'OSACTION.MXAPIINSPRESULT.CREATEWO';
  }

}