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
  getCredentials: () => string;
  getOS: () => string;
  getXMLUrl: () => string;
  getFilename: () => string;
  getFileExtension: () => string;
  getCreatePythonScriptInEditor:() => boolean;
  
}