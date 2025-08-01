export default interface IConfigService {
  isLdap: () => boolean;
  getSourceTag: () => string;
  getLanguageTag: () => string;
  getLogLevel: () => any;
  getUrl: () => string;
  getHttpProtocol: () => string;
  getAuthType: () => string;
  getLogTag: () => string;
  getPort: () => Number;
  getObjectName: () => string;
  getNameSpaceAttr: () => string;
  getNameSpace: () => string;
  getUsername: () => string;
  getPassword: () => string;
  getApiKey: () => string;
  getCredentials: () => string;
  getOS: () => string;
  getXMLUrl: () => string;
  getHostname: () => string;
  getCreatePythonScriptInEditor: () => boolean;
  ignoreSslError: () => boolean;
  getActiveEnvironmentName(): string;
  getFormatXmlOnDownloadAndCompare(): boolean;
  toString(): string;
  getAppxmlOs: () => string;
  getIgnoreSslErrors: () => boolean;
}