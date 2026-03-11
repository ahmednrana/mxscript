export interface SimpleOSService {
    downloadAll: () => any;
    update: () => any;
    // syncAll : () => any;
    upload: (silent?: boolean) => any;
    compareWithServer: () => any;
    delete: (silent?: boolean) => any;
    execute?: () => any;
    openInMaximo?: (arg?: any) => Promise<void>;
}