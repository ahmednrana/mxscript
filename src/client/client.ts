import { AuthType, LogLevel, MaximoClient, MaximoClientConfig } from "maximo-api-client";
import IConfigService from "../service/Config/IConfigService";
import * as vscode from 'vscode';
import { Logger } from "../service/Logger/Logger";
import { convertAuthType, getLogLevel } from "../utils/utils";
import { ConfigService } from "../service/Config/ConfigService";
import { MaximoEnvironment } from "../webview/EnvironmentManager";

/**
 * A singleton provider for MaximoClient that manages client lifecycle
 * Handles configuration changes and provides access to a shared MaximoClient instance
 */
export class MaximoClientProvider {
    private static instance: MaximoClientProvider;
    private maximoClient: MaximoClient;
    private configService: IConfigService;
    private logger: Logger;

    // Configuration keys that should trigger client re-initialization when changed
    private configKeys: string[] = [
        'mxscript.serverSettings.httpProtocol',
        'mxscript.authentication.authenticationType',
        'mxscript.authentication.apikey',
        'mxscript.authentication.username',
        'mxscript.authentication.password',
        'mxscript.serverSettings.hostname',
        'mxscript.serverSettings.port',
        'mxscript.serverSettings.objectStructure',
        'mxscript.scriptSettings.logLevel',
        'mxscript.scriptSettings.ignoresslerrors',
        'mxscript.serverSettings.activeEnvironmentName',
        'mxscript.appxml.formatOnDownloadAndCompare',
        'mxscript.appxml.appxmlObjectStructure'
    ];

    /**
     * Private constructor to enforce singleton pattern
     */
    private constructor(cs: IConfigService) {
        this.configService = cs;
        this.logger = Logger.getInstance();

        // Create initial Maximo client instance
        const config = this.createClientConfig();
        this.maximoClient = new MaximoClient(config);
    }

    /**
     * Get the singleton instance of MaximoClientProvider
     */
    public static getInstance(): MaximoClientProvider {
        if (!MaximoClientProvider.instance) {
            throw new Error('MaximoClientProvider not initialized. Call initialize() first.');
        }
        return MaximoClientProvider.instance;
    }

    /**
     * Initialize the singleton instance with required dependencies
     */
    public static initialize(context: vscode.ExtensionContext, cs: IConfigService): MaximoClientProvider {
        if (!MaximoClientProvider.instance) {
            MaximoClientProvider.instance = new MaximoClientProvider(cs);

            // Listen for configuration changes
            context.subscriptions.push(
                vscode.workspace.onDidChangeConfiguration(e => {
                    // Check if any relevant config has changed
                    const instance = MaximoClientProvider.instance;
                    const hasConfigChanged = instance.configKeys.some(key => e.affectsConfiguration(key));

                    if (hasConfigChanged) {
                        instance.logger.debug('Maximo configuration changed, reinitializing client');
                        instance.initializeClient(); // Create a new client instance
                    }
                })
            );
        }
        return MaximoClientProvider.instance;
    }

    /**
     * Get the underlying MaximoClient instance
     */
    public getClient(): MaximoClient {
        return this.maximoClient;
    }

    /**
     * Static method to directly access the MaximoClient instance
     * Provides convenient access from anywhere in the application
     * 
     * @throws Error if the singleton hasn't been initialized
     * @returns The MaximoClient instance
     */
    public static getMaximoClient(): MaximoClient {
        if (!MaximoClientProvider.instance) {
            throw new Error('MaximoClientProvider not initialized. Call initialize() first.');
        }
        return MaximoClientProvider.instance.maximoClient;
    }

    /**
     * Force reinitialize the client with current configuration
     * Useful when environment settings change and we need a fresh client instance
     */
    public reinitializeClient(): void {
        this.initializeClient();
    }

    /**
     * Static method to force reinitialize the client
     */
    public static reinitializeClient(): void {
        MaximoClientProvider.instance.reinitializeClient();
    }
    /**
     * Static method to force reinitialize the client with custom config
     */
    public static forceReinitializeClient(environment: MaximoEnvironment): void {
        MaximoClientProvider.instance.forceReinitializeClient(environment);
    }

    public forceReinitializeClient(environment: MaximoEnvironment): void {
        this.initializeClient(environment);
    }

    /**
     * Create client configuration from current settings
     */
    private createClientConfig(): MaximoClientConfig {
        const hostname = this.configService.getHostname();
        return {
            baseUrl: hostname,
            ssl: this.configService.getHttpProtocol() === 'https',
            authType: convertAuthType(this.configService.getAuthType()),
            userName: this.configService.getUsername(),
            password: this.configService.getPassword(),
            apiKey: this.configService.getApiKey(),
            port: Number(this.configService.getPort()),
            autoscriptObjectStructure: this.configService.getOS(),
            appXmlObjectStructure: this.configService.getAppxmlOs(),
            logLevel: getLogLevel(this.configService.getLogLevel()),
            leanMode: true,
            autoAuthenticate: true,
            rejectUnauthorized: !this.configService.getIgnoreSslErrors(),
            logger: this.logger
        };
    }
    private createClientConfigFromEnvironment(environment: MaximoEnvironment): MaximoClientConfig {
        return {
            baseUrl: environment.hostname,
            ssl: environment.httpProtocol === 'https',
            authType: convertAuthType(environment.authenticationType),
            userName: environment.username,
            password: environment.password,
            apiKey: environment.apikey,
            port: Number(environment.port),
            autoscriptObjectStructure: environment.objectStructure,
            appXmlObjectStructure: environment.appxml_objectStructure,
            logLevel: getLogLevel(environment.logLevel),
            autoAuthenticate: true,
            rejectUnauthorized: !environment.ignoreSslErrors,
            leanMode: true,
            logger: this.logger
        };
    }

    /**
     * Create a new MaximoClient instance with current config
     */
    private initializeClient(environment?: MaximoEnvironment): void {
        this.configService = new ConfigService();
        // If an environment is provided, use its settings to create the client config
        const newConfig = (environment) ? this.createClientConfigFromEnvironment(environment) : this.createClientConfig();

        this.logger.info('Creating new MaximoClient instance with updated configuration');
        this.maximoClient = new MaximoClient(newConfig);
    }
}