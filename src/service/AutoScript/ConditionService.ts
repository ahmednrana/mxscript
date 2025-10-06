import * as vscode from 'vscode';
import { ConfigService } from '../Config/ConfigService';
import { Logger } from '../Logger/Logger';
import { MaximoClientProvider } from '../../client/client';
import { MaximoEnvironment } from '../../webview/EnvironmentManager';
import { showError, showWarning, showInformation } from '../../utils/utils';
import { getFilename } from '../../utils/utils';
import { SimpleOSService } from './ISimpleOSService';
import { ConditionExpression } from 'maximo-api-client';
import { QueryBuilder } from 'maximo-api-client/dist/core/query-builder';

export class ConditionService implements SimpleOSService {
    private context: vscode.ExtensionContext;
    private configService: ConfigService;
    private logger: Logger;

    constructor(context: vscode.ExtensionContext, configService: ConfigService) {
        this.context = context;
        this.configService = configService;
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

    async update(): Promise<void> {
        try {
            this.logger.debug('Updating condition...');
            const fileName = getFilename();
            const sourceFromServer = await this.getMaximoClient().getConditionExpressionService().downloadCondition(fileName);
            if (!sourceFromServer) {
                showWarning(`No condition source found for the condition ${fileName} on ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]`);
                return;
            }
            const { activeTextEditor } = vscode.window;

            if (activeTextEditor) {
                const { document } = activeTextEditor;
                const fullText = document.getText();
                const fullRange = new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(fullText.length)
                );

                const edit = new vscode.WorkspaceEdit();
                edit.replace(document.uri, fullRange, sourceFromServer);
                const success = await vscode.workspace.applyEdit(edit);
                if (success) {
                    showInformation(`Successfully updated condition ${fileName} from ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]`);
                } else {
                    showError("Failed to apply changes to the editor");
                }
            } else {
                showWarning("The file open is not valid");
            }
        } catch (error) {
            showError(`Failed to download condition: ${(error as Error).message}`);
        }
    }

    async downloadAll(): Promise<void> {
        try {
            this.logger.debug('Downloading all conditions...');
            if (!vscode.workspace.workspaceFolders) {
                showError("Please open a workspace or folder first");
                return;
            }

            let rootFolder = vscode.workspace.workspaceFolders[0];
            const options: vscode.OpenDialogOptions = {
                canSelectMany: false,
                openLabel: 'Select',
                canSelectFiles: false,
                canSelectFolders: true,
                defaultUri: rootFolder.uri,
                filters: {
                    'All files': ['*']
                }
            };

            let selectedFolderUri: vscode.Uri | undefined = await vscode.window.showOpenDialog(options).then(folderUri => {
                if (folderUri && folderUri[0]) {
                    return folderUri[0];
                }
                return undefined;
            });

            if (!selectedFolderUri) {
                showError("Folder selection error. It might not be part of the project.");
                return;
            }

            let selectedFolderUriResolved: vscode.Uri = selectedFolderUri as vscode.Uri;

            // Show progress bar
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: `Downloading Conditions from ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]`,
                cancellable: false,
            }, async (progress) => {
                // Step 1: Start downloading conditions
                progress.report({ increment: 10, message: "Starting download..." });

                try {
                    // const conditions = await this.getMaximoClient().getConditionExpressionService().downloadAllConditions();
                    const appQuery = new QueryBuilder<any>(this.getMaximoClient().getConditionExpressionService().getObjectStructure())
                        .select(['conditionnum', 'description', 'type', 'expression'])
                        .where('type="EXPRESSION"')
                        .pageSize(2000);
                    const conditions = await this.getMaximoClient().getConditionExpressionService().findAll(appQuery);

                    if (!conditions || conditions.length === 0) {
                        showWarning(`No conditions found on ${this.configService.getActiveEnvironmentName()}`);
                        return;
                    }

                    progress.report({ increment: 30, message: `Found ${conditions.length} conditions. Writing files...` });

                    // Write each condition to a file
                    for (let i = 0; i < conditions.length; i++) {
                        const condition = conditions[i];
                        const fileName = `${condition.conditionnum || condition.description}.sql`; // Assuming SQL format
                        const filePath = vscode.Uri.joinPath(selectedFolderUriResolved, fileName);

                        await vscode.workspace.fs.writeFile(filePath, Buffer.from(condition.expression || condition.description || '', 'utf8'));

                        const progressIncrement = Math.floor(60 / conditions.length);
                        progress.report({ increment: progressIncrement, message: `Writing ${fileName}...` });
                    }

                    progress.report({ increment: 100, message: "Download completed!" });
                    showInformation(`Successfully downloaded ${conditions.length} conditions to ${selectedFolderUriResolved.fsPath}`);

                } catch (error) {
                    showError(`Failed to download conditions: ${(error as Error).message}`);
                }
            });
        } catch (error) {
            showError(`Failed to download all conditions: ${(error as Error).message}`);
        }
    }

    async upload(): Promise<void> {
        try {
            this.logger.debug('Uploading condition...');
            const source = this.getSource();
            if (!source || source.length === 0) {
                showWarning("No content found in the active editor to upload");
                return;
            }

            const conditionName = getFilename();
            const condition: ConditionExpression = {
                conditionnum: conditionName,
                expression: source,
                properties: 'condition,description,source'
            };
            const addUpdateBuilder = this.getMaximoClient().getConditionExpressionService().bulkOperation().addUpdate(condition);
            const addUpdateResult = await this.getMaximoClient().getConditionExpressionService().executeBulkOperation(addUpdateBuilder);
            if (addUpdateResult.success) {
                // there could be errors in the responses
                if (addUpdateResult.responses.length > 0 &&
                    addUpdateResult.responses[0].status >= 200 && addUpdateResult.responses[0].status < 300) {
                    showInformation(`Condition ${conditionName} uploaded successfully to ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]`);
                }
                else if (addUpdateResult.responses.length > 0) {
                    showError(`Failed to upload condition ${conditionName} to ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]: ${addUpdateResult.responses[0].status}`);
                }
                else {
                    showError(`Failed to upload condition ${conditionName} to ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]: ${addUpdateResult.data}`);
                }
            } else {
                showError(`Failed to upload condition ${conditionName} to ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]: ${addUpdateResult.responses?.[0]?.error?.message || addUpdateResult.data}`);
            }
        } catch (error) {
            showError(`Failed to upload condition: ${(error as Error).message}`);
        }
    }

    async compareWithServer(): Promise<void> {
        try {
            this.logger.debug('Comparing condition with server...');
            const conditionName = getFilename();
            const sourceFromServer = await this.getMaximoClient().getConditionExpressionService().downloadCondition(conditionName);
            if (!sourceFromServer) {
                showWarning(`No condition source found for the condition "${conditionName}"`);
                return;
            }

            // Create a virtual document URI for the server condition content
            let serverCondition = vscode.Uri.parse('mxscript:' + encodeURIComponent(sourceFromServer));
            const { activeTextEditor } = vscode.window;

            if (activeTextEditor) {
                // Open diff view
                vscode.commands.executeCommand('vscode.diff', activeTextEditor.document.uri, serverCondition, `${conditionName} (Local) ↔ ${conditionName} (Server)`);
            } else {
                showWarning("No active text editor found");
            }
        } catch (error) {
            showError(`Failed to download condition: ${(error as Error).message}`);
        }
    }

    async compareWithEnvironment(environment: MaximoEnvironment): Promise<void> {
        try {
            this.logger.debug('Comparing condition with environment...');
            const conditionName = getFilename();

            // Create client for the target environment
            const { MaximoClientProvider } = await import('../../client/client');
            const targetClient = MaximoClientProvider.createClientFromEnvironment(environment, this.logger);

            const sourceFromServer = await targetClient.getConditionExpressionService().downloadCondition(conditionName);

            if (!sourceFromServer) {
                showWarning(`Condition compare not yet implemented for "${conditionName}" on environment ${environment.name}`);
                return;
            }

            // Create a virtual document URI for the server condition content
            let serverCondition = vscode.Uri.parse('mxscript:' + encodeURIComponent(sourceFromServer));
            const { activeTextEditor } = vscode.window;

            if (activeTextEditor) {
                // Open diff view
                vscode.commands.executeCommand('vscode.diff', activeTextEditor.document.uri, serverCondition, `${conditionName} (Local) ↔ ${environment.name}`);
            } else {
                showWarning("No active text editor found");
            }
        } catch (error) {
            showError(`Failed to download condition: ${(error as Error).message}`);
        }
    }

    async delete(): Promise<void> {
        try {
            this.logger.debug('Deleting condition...');
            const conditionName = getFilename();
            if (!conditionName) {
                showWarning("No condition name could be determined from the current file");
                return;
            }

            // Use showWarningMessage with Delete/Cancel buttons
            const serverName = this.configService.getActiveEnvironmentName() || this.configService.getUrl();
            vscode.window.showWarningMessage(
                `Are you sure you want to delete the condition "${conditionName}" from server "${serverName}"?`,
                "Delete",
                "Cancel"
            ).then(async selection => {
                if (selection === "Delete") {
                    try {
                        const condition = await this.getMaximoClient().getConditionExpressionService().findAll(`conditionnum="${conditionName}"`);
                        if (condition.length === 0) {
                            showWarning(`No condition found on the server ${serverName} with the name ${conditionName}`);
                            return;
                        }

                        this.logger.debug(`Condition ${conditionName} found on the server. Proceeding to delete...`);
                        await this.getMaximoClient().getConditionExpressionService().delete(condition[0]);
                        this.logger.debug(`Condition ${conditionName} deleted successfully from ${serverName}`);
                        showInformation(`Condition ${conditionName} deleted successfully from ${serverName}`);
                    } catch (deleteError) {
                        showError(`Failed to delete condition: ${(deleteError as Error).message}`);
                    }
                }
            });
        } catch (error) {
            showError(`Failed to delete condition: ${(error as Error).message}`);
        }
    }

    getSource(): string {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            this.logger.warn("Attempted to get source but no active text editor found.");
            return '';
        }
        editor.document.save();
        let source: string = editor.document.getText();
        return source;
    }
}