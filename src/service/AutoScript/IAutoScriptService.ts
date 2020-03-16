export interface IAutoScriptService {
    downloadAllScripts : () => any;
    updateScript : () => any;
    // syncAll : () => any;
    syncScript : () => any;
    compareWithServer : () => any;
}