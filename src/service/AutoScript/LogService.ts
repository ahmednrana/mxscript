import * as vscode from 'vscode';
import { MaximoClientProvider } from '../../client/client';
import { ConfigService } from '../Config/ConfigService';
import { Logger } from '../Logger/Logger';
import { MaximoClient, MaximoClientConfig } from '@maximomize/maximo-api-client';
import { showError, showInformation, showWarning, convertAuthType, getLogLevel } from '../../utils/utils';
import { EnvironmentLogContentProvider } from '../../webview/EnvironmentLogContentProvider';
import { MaximoEnvironment } from '../../webview/EnvironmentManager';

export interface FetchLogsResult {
    content: string;
    fetchedAt: Date;
    raw: any;
}

export class MaximoLoggingService {
    private readonly logger: Logger;

    constructor(private configService: ConfigService = new ConfigService()) {
        this.logger = Logger.getInstance();
    }
    /**
   * Gets the MaximoClient instance from the singleton wrapper
   * @returns The MaximoClient instance
   * @private
   */
    private getMaximoClient() {
        // Get client from the singleton wrapper
        return MaximoClientProvider.getInstance().getClient();
    }

    async fetchCurrentEnvironmentLogs(logContentProvider?: EnvironmentLogContentProvider) {
        logContentProvider = logContentProvider ?? new EnvironmentLogContentProvider();
        try {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: `Fetching logs for ${this.configService.getActiveEnvironmentName()}`,
                cancellable: false
            }, async (progress) => {
                progress.report({ increment: 15, message: 'Connecting to Maximo...' });

                const { content, fetchedAt } = await this.fetchManageLogs(this.getMaximoClient());

                progress.report({ increment: 45, message: 'Preparing log viewer...' });

                const activeEnvName = this.configService.getActiveEnvironmentName() || 'Active Environment';
                const sanitizedContent = this.ensureContent(content, activeEnvName);

                await this.openLogDocument(
                    activeEnvName,
                    activeEnvName,
                    sanitizedContent,
                    fetchedAt,
                    logContentProvider!,
                    progress
                );
            });

            showInformation(`Logs fetched for ${this.configService.getActiveEnvironmentName()}.`);
        } catch (error) {
            showError(`Failed to fetch logs: ${(error as Error).message}. Logs are supported for Manage only`);
        }
    };

    async fetchEnvironmentLogs(environment: MaximoEnvironment, logContentProvider?: EnvironmentLogContentProvider) {
        if (!environment) {
            showWarning('No environment provided to fetch logs from.');
            return;
        }

        logContentProvider = logContentProvider ?? new EnvironmentLogContentProvider();

        try {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: `Fetching logs for ${environment.name}`,
                cancellable: false
            }, async (progress) => {
                progress.report({ increment: 15, message: `Connecting to ${environment.hostname}...` });

                const client = MaximoClientProvider.createClientFromEnvironment(environment);
                const { content, fetchedAt } = await this.fetchManageLogs(client);

                progress.report({ increment: 45, message: 'Preparing log viewer...' });

                const sanitizedContent = this.ensureContent(content, environment.name);

                await this.openLogDocument(
                    environment.id,
                    environment.name,
                    sanitizedContent,
                    fetchedAt,
                    logContentProvider!,
                    progress
                );
            });

            showInformation(`Logs fetched for ${environment.name}.`);
        } catch (error) {
            showError(`Failed to fetch logs for ${environment.name}: ${(error as Error).message}. Logs are supported for Manage only`);
        }
    }

    /** it fetches the log based on the Maximo client passed to it */
    public async fetchManageLogs(client: MaximoClient): Promise<FetchLogsResult> {
        const loggingService = client.getLoggingService();
        this.logger.debug('Requesting logs from Maximo Manage logging service...');

        // The response can be a very large string, which can cause a "Too many properties to enumerate"
        try {
            const response = await loggingService.streamLogsFromManage();

            if (!response || response.status !== 200) {
                this.logger.error('Failed to fetch logs from Maximo Manage logging service', response);
                throw new Error('Failed to fetch logs from Maximo Manage logging service');
            }
            const normalizedContent = this.normalizeLogResponse(response.data);

            this.logger.info(
                `Fetched ${normalizedContent.length} characters of logs from ${this.configService.getActiveEnvironmentName() || 'Maximo environment'}`
            );
            return {
                content: normalizedContent,
                fetchedAt: new Date(),
                raw: response
            };
        } catch (error) {
            this.logger.error('Error fetching logs from Maximo Manage logging service', error);
            const errorMessage = (typeof error === 'object' && error !== null && 'message' in error) ? (error as { message?: string }).message : undefined;
            throw new Error(errorMessage || 'Error fetching logs from Maximo Manage logging service');
        }
    }

    private normalizeLogResponse(response: any): string {
        if (response === null || response === undefined) {
            return '';
        }
        return String(response);
    }

    private ensureContent(content: string, environmentName: string): string {
        if (content && content.trim().length > 0) {
            return content;
        }

        return `No log data returned from ${environmentName}`;
    }

    private async openLogDocument(
        environmentId: string,
        environmentName: string,
        content: string,
        fetchedAt: Date,
        logContentProvider: EnvironmentLogContentProvider,
        progress?: vscode.Progress<{ message?: string; increment?: number }>
    ): Promise<void> {
        const logUri = logContentProvider.updateContent(environmentId, environmentName, content);
        const document = await vscode.workspace.openTextDocument(logUri);
        const logDocument = await vscode.languages.setTextDocumentLanguage(document, 'log');

        progress?.report({ increment: 30, message: 'Opening logs...' });

        await vscode.window.showTextDocument(logDocument, { preview: false });

        progress?.report({ increment: 10, message: `Fetched at ${fetchedAt.toLocaleString()}` });
    }

    public async uploadLogs(environment: MaximoEnvironment): Promise<void> {
        const confirm = await vscode.window.showWarningMessage(
            'This will submit a request to upload Manage logs to S3 Cloud Storage. Continue?',
            'Yes', 'No'
        );

        if (confirm !== 'Yes') return;

        try {
            await vscode.window.withProgress(
                {
                    location: vscode.ProgressLocation.Notification,
                    title: 'Submitting log upload request...',
                    cancellable: false
                },
                async () => {

                    let client: MaximoClient;
                    // Check if the passed environment is the active one, if so use the singleton client
                    // Since ConfigService might not have getActiveEnvironmentId, we can compare with the name which is usually unique or just always create a new client if needed, 
                    // but let's check ConfigService. For now, assuming name might be used or we can just use the provided environment to create a client always or use the singleton if names match.
                    // Let's safe bet: create client from environment if ID is passed, but environment object is passed.
                    // Actually, MaximoClientProvider.getInstance().getClient() returns the client for the *active* environment.
                    // Let's check if the passed environment's ID matches the active one.
                    // If ConfigService doesn't have ID, we might have to rely on name.
                    const activeEnvName = this.configService.getActiveEnvironmentName();
                    if (environment.name === activeEnvName) {
                        client = this.getMaximoClient();
                    } else {
                        client = MaximoClientProvider.createClientFromEnvironment(environment);
                    }

                    const result = await client.getLoggingService().uploadLogsToS3();

                    // Expected format: {"return":"1002-1767713985445"}
                    if (result && result.return) {
                        const returnStr = result.return;
                        const logRequestNum = returnStr.split('-')[0];
                        vscode.window.showInformationMessage(`Log upload request submitted. Request #${logRequestNum}. Check LOGREQUEST table.`);
                        this.logger.info(`Log upload request successful: ${JSON.stringify(result)}`);
                    } else {
                        vscode.window.showWarningMessage('Log upload request submitted but returned unexpected format. Check server logs.');
                        this.logger.warn(`Log upload request returned unexpected format: ${JSON.stringify(result)}`);
                    }
                }
            );
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(`Log upload failed: ${errorMessage}`);
            vscode.window.showErrorMessage(`Log upload failed: ${errorMessage}`);
        }
    }
}
