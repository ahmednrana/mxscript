import { MaximoEnvironment } from '../../webview/EnvironmentManager';

export interface SimpleOSService {
    downloadAll: () => any;
    update: (targetEnvironment?: MaximoEnvironment) => any;
    // syncAll : () => any;
    upload: (silent?: boolean, targetEnvironment?: MaximoEnvironment) => any;
    compareWithServer: () => any;
    delete: (silent?: boolean) => any;
    execute?: (provider?: any) => any;
    openInMaximo?: (arg?: any) => Promise<void>;
}