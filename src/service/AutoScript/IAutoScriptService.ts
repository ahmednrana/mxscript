export interface IAutoScriptService {
    downloadAllScripts : () => any;
    updateScript : () => any;
    // syncAll : () => any;
    uploadScript : () => any;
    compareWithServer : () => any;
    deleteScript : () => any;
    executeScript : () => any;
}