export interface SimpleOSService {
    downloadAll: () => any;
    update: () => any;
    // syncAll : () => any;
    upload: (silent?: boolean) => any;
    compareWithServer: () => any;
    delete: (silent?: boolean) => any;
    execute?: (provider?: any) => any;
    uploadAndExecute?: (provider?: any) => any;
    openInMaximo?: (arg?: any) => Promise<void>;
}