
// import { ConditionExpressionService } from "maximo-api-client";

// declare module 'maximo-api-client' {
//   export interface MaximoClientConfig { [k: string]: any; }
//   export interface ILogger { log: (...args: any[]) => void; info?: any; warn?: any; error?: any; }
//   // Enum-like objects
//   // export const AuthType: {
//   //   MAXIMO_NATIVE: 'MAXIMO_NATIVE';
//   //   LDAP_BASIC: 'LDAP_BASIC';
//   //   APIKEY: 'APIKEY';
//   // };
//   // export type AuthType = typeof AuthType[keyof typeof AuthType];

//   // export const LogLevel: {
//   //   ERROR: 'ERROR';
//   //   WARN: 'WARN';
//   //   INFO: 'INFO';
//   //   DEBUG: 'DEBUG';
//   // };
//   // export type LogLevel = typeof LogLevel[keyof typeof LogLevel];

//   class AutoScriptApi { downloadScriptSource(name: string): Promise<any>; bulkOperation(): any; executeBulkOperation(op: any): Promise<any>; findAll(q: string): Promise<any[]>; delete(obj: any): Promise<void>; downloadAllScripts(os?: string): Promise<any[]>; }
//   class AppXmlApi { bulkOperation(): any; executeBulkOperation(op: any): Promise<any>; }
//   class MaxAppService { getAppPresentation(name: string): Promise<any>; getAllAppPresentations(): Promise<any[]>; }

//   export class MaximoClient {
//     constructor(config: MaximoClientConfig);
//     oslcInfoService: { getWhoAmI(): Promise<any> };
//     autoScript: AutoScriptApi;
//     appXml: AppXmlApi;
//     getMaxAppService(): MaxAppService;
//     getLoggingService(): LoggingService;
//     getConditionExpressionService(): ConditionExpressionService;
//   }

//   // Placeholder export to satisfy existing imports
//   export class AutoScript { autoscript?: string; [k: string]: any; }
// }

// declare module 'maximo-api-client/dist/model/maxpresentation' {
//   export interface MaxPresentation { [k: string]: any; }
// }
