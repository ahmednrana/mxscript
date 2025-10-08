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
            this.logger.debug('Downloading conditions (all/multiple) via picker...');

            // ensure workspace
            if (!vscode.workspace.workspaceFolders) {
                showError("Please open a workspace or folder first");
                return;
            }

            const rootFolder = vscode.workspace.workspaceFolders[0];

            // Helper: sanitize filename and ensure uniqueness
            const sanitizeFilename = (name: string) => {
                // remove illegal chars for Windows, keep it simple
                return name.replace(/[<>:"\\/\|\?\*]/g, '_').slice(0, 240);
            };

            // Helper: prompt for folder
            const promptForFolder = async (): Promise<vscode.Uri | undefined> => {
                const options: vscode.OpenDialogOptions = {
                    canSelectMany: false,
                    openLabel: 'Select',
                    canSelectFiles: false,
                    canSelectFolders: true,
                    defaultUri: rootFolder.uri,
                    filters: { 'All files': ['*'] }
                };
                const chosen = await vscode.window.showOpenDialog(options);
                if (chosen && chosen[0]) {
                    const selected = chosen[0];
                    const selectedFolderRoot = vscode.workspace.getWorkspaceFolder(selected);
                    if (selectedFolderRoot !== rootFolder) {
                        showError("The selected folder is not part of the project. Please select a folder from the current project.");
                        return undefined;
                    }
                    return selected;
                }
                return undefined;
            };

            // Fetch background lightweight list of conditions from server
            const fetchConditionList = async () => {
                const appQuery = new QueryBuilder<any>(this.getMaximoClient().getConditionExpressionService().getObjectStructure())
                    .select(['conditionnum', 'description'])
                    .where('type="EXPRESSION"')
                    .pageSize(3000);
                const list = await this.getMaximoClient().getConditionExpressionService().findAll(appQuery);
                return list || [];
            };

            // Helper: write list of conditions to folder
            const writeConditionsToFolder = async (conditions: any[], folderUri: vscode.Uri, progress: vscode.Progress<{ message?: string; increment?: number }>, token?: vscode.CancellationToken) => {
                if (!conditions || conditions.length === 0) return 0;

                for (let i = 0; i < conditions.length; i++) {
                    if (token?.isCancellationRequested) break;
                    const condition = conditions[i];
                    const baseName = sanitizeFilename((condition.conditionnum || condition.description || `condition_${i + 1}`).toString());
                    let fileName = `${baseName}.sql`;

                    const filePath = vscode.Uri.joinPath(folderUri, fileName);
                    const content = condition.expression || condition.description || '';
                    try {
                        await vscode.workspace.fs.writeFile(filePath, Buffer.from(content, 'utf8'));
                    } catch (writeErr) {
                        this.logger.error(`Failed to write file ${filePath.fsPath}: ${(writeErr as Error).message}`);
                        showError(`Failed to write file ${filePath.fsPath}: ${(writeErr as Error).message}`);
                    }

                    const increment = Math.max(1, Math.floor(80 / conditions.length));
                    progress.report({ increment, message: `Writing ${fileName} (${i + 1}/${conditions.length})` });
                }
                return conditions.length;
            };

            // Start background fetch early to reduce wait time for the Multiple flow
            const backgroundFetch = fetchConditionList();

            // Ask user if they want All or Multiple first. This is fast UI:
            const mode = await vscode.window.showQuickPick([
                { label: 'All', description: 'Download every SQL condition from the server' },
                { label: 'Multiple', description: 'Choose multiple conditions to download' }
            ], { placeHolder: 'Download All or Multiple conditions?' });

            if (!mode) return; // user cancelled

            // If user chose Multiple, wait for the background fetch to finish and then show the detailed picker
            let picked: vscode.QuickPickItem[] | undefined;
            let selectedFolderUri: vscode.Uri | undefined;

            if (mode.label === 'Multiple') {
                // Show a busy QuickPick immediately while background fetch runs
                const quickPick = vscode.window.createQuickPick<vscode.QuickPickItem>();
                quickPick.canSelectMany = true;
                quickPick.ignoreFocusOut = true;
                quickPick.busy = true;
                quickPick.placeholder = `Loading conditions from ${this.configService.getActiveEnvironmentName()}...`;
                quickPick.show();

                // track if user dismissed the picker while we were loading
                let wasHidden = false;
                quickPick.onDidHide(() => { wasHidden = true; });

                let conditions: any[] = [];
                try {
                    conditions = await backgroundFetch;
                } catch (fetchErr) {
                    quickPick.hide();
                    quickPick.dispose();
                    showError(`Failed to fetch conditions: ${(fetchErr as Error).message}`);
                    return;
                }

                if (wasHidden) {
                    // user dismissed picker while loading
                    quickPick.dispose();
                    return;
                }

                if (!conditions || conditions.length === 0) {
                    quickPick.hide();
                    quickPick.dispose();
                    showWarning(`No conditions found on ${this.configService.getActiveEnvironmentName()}`);
                    return;
                }

                quickPick.busy = false;
                quickPick.placeholder = `Search or select conditions (found ${conditions.length})`;

                const items: vscode.QuickPickItem[] = conditions.map((c: any) => ({
                    label: c.conditionnum || '<no-name>',
                    description: c.description ? (c.description.length > 120 ? c.description.substring(0, 117) + '...' : c.description) : ''
                }));
                quickPick.items = items;

                const chosen: vscode.QuickPickItem[] | undefined = await new Promise(resolve => {
                    quickPick.onDidAccept(() => { resolve([...quickPick.selectedItems]); quickPick.hide(); quickPick.dispose(); });
                    quickPick.onDidHide(() => { resolve(undefined); quickPick.dispose(); });
                });

                if (!chosen || chosen.length === 0) return; // cancelled or no pick
                picked = chosen;

                // Prompt for folder now that we have selection
                selectedFolderUri = await promptForFolder();
                if (!selectedFolderUri) return;

            } else {
                // mode === 'All'
                // prompt for folder immediately
                selectedFolderUri = await promptForFolder();
                if (!selectedFolderUri) {
                    showError("Folder selection error. It might not be part of the project.");
                    return;
                }
            }

            // Run actual download/write with progress
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: `Downloading Conditions from ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]`,
                cancellable: true
            }, async (progress, token) => {
                progress.report({ increment: 5, message: 'Preparing download...' });

                try {
                    let conditionQuery = '';
                    if (mode.label != 'All') { // It is multiselection
                        const conditions = await backgroundFetch; // should already be resolved but safe to await
                        const pickedLabels = picked!.map(p => p.label);
                        progress.report({ increment: 10, message: `Fetching ${picked!.length} selected conditions...` });

                        const selectedCondition = conditions
                            .filter((c: any) => pickedLabels.includes(c.conditionnum))
                            .map(c => c.conditionnum).join('","');
                        conditionQuery = `type="EXPRESSION" and conditionnum in ["${selectedCondition}"]`;
                    }
                    else { // All selected
                        progress.report({ increment: 10, message: `Fetching all conditions...` });
                        conditionQuery = `type="EXPRESSION"`;
                    }
                    this.logger.debug(`Fetching conditions with query: ${conditionQuery}`);
                    progress.report({ increment: 10, message: 'Fetching all conditions from server...' });
                    const conditionQueryBuilder = new QueryBuilder<any>(this.getMaximoClient().getConditionExpressionService().getObjectStructure())
                        .select(['conditionnum', 'expression'])
                        .where(conditionQuery)
                        .pageSize(3000);
                    const fullList = await this.getMaximoClient().getConditionExpressionService().findAll(conditionQueryBuilder);
                    if (!fullList || fullList.length === 0) {
                        showWarning(`No conditions found on ${this.configService.getActiveEnvironmentName()}`);
                        return;
                    }
                    progress.report({ increment: 20, message: `Found ${fullList.length} conditions. Writing files...` });
                    await writeConditionsToFolder(fullList, selectedFolderUri!, progress, token);
                    progress.report({ increment: 100, message: 'Download completed' });
                    showInformation(`Successfully downloaded ${fullList.length} conditions to ${selectedFolderUri!.fsPath}`);
                } catch (err) {
                    showError(`Failed to download conditions: ${(err as Error).message}`);
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