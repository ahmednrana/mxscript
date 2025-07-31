import * as vscode from 'vscode';
import { SimpleOSService } from './ISimpleOSService';
import { MaximoClientProvider } from '../../client/client';
import { ConfigService } from '../Config/ConfigService';
import { Logger } from '../Logger/Logger';
import { getFilename, getLanguageFromExtension, showError, showInformation, showWarning } from '../../utils/utils';

import { AutoScript } from 'maximo-api-client';

export class AutoScriptNextGen implements SimpleOSService {
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
            this.logger.debug('Updating script...');
            const fileName = getFilename();
            const sourceFromServer = await this.getMaximoClient().autoScript.downloadScriptSource(fileName);
            if (!sourceFromServer) {
                showWarning(`No script source found for the script ${fileName} on ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}`);
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
                    showInformation(`Script ${fileName} updated successfully from ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}`);
                } else {
                    showError(`Failed to apply edits to the document.`);
                }
            } else {
                showWarning("The file open is not valid");
            }
        } catch (error) {
            showError(`Failed to download script: ${(error as Error).message}`);
        }

    }

    async downloadAll(): Promise<void> {
        try {
            this.logger.debug('Downloading all scripts...');
            if (!vscode.workspace.workspaceFolders) {
                showError("Please open a workspace or folder first");
                return;
            }

            let rootFolder = vscode.workspace.workspaceFolders[0]; // Workspace root folder
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
                    let selectedFolder = folderUri[0]; // User selected folder
                    let selectedFolderRoot = vscode.workspace.getWorkspaceFolder(selectedFolder);
                    if (selectedFolderRoot !== rootFolder) { // The selected folder is NOT part of already opened project
                        showError("The selected folder is not part of the project. Please select a folder from the current project.");
                        return;
                    }
                    this.logger.debug('Selected file: ' + selectedFolder.fsPath);
                    return selectedFolder;
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
                title: `Downloading Scripts from ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}`,
                cancellable: false,
            }, async (progress) => {
                // Step 1: Start downloading scripts
                progress.report({ increment: 0, message: "Downloading all scripts..." });
                let downloadAllResponse = (await this.getMaximoClient().autoScript.downloadAllScripts(this.configService.getOS()))

                if (downloadAllResponse.length === 0) {
                    vscode.window.showWarningMessage("No scripts found on the server");
                    this.logger.warn("No scripts found on the server");
                    return;
                }

                // Step 2: Full response received
                progress.report({ increment: 50, message: "Download complete. Preparing to write scripts..." });

                // Step 3: Write scripts to files
                for (const script of downloadAllResponse) {
                    const scriptName = script.autoscript;
                    const scriptLanguage = script.scriptlanguage;
                    const fileExtension = this.getFileExtensionFromLanguage(scriptLanguage ?? '');
                    const fileName = `${scriptName}.${fileExtension}`;
                    const filePath = vscode.Uri.joinPath(selectedFolderUriResolved, fileName);

                    await vscode.workspace.fs.writeFile(filePath, Buffer.from(script.source || '', 'utf8'));
                }

                // Step 4: Writing complete
                progress.report({ increment: 25, message: "Writing scripts to files..." });

                // Step 5: Finalize
                progress.report({ increment: 25, message: "All scripts downloaded and written successfully!" });
                const successMsg = `All ${downloadAllResponse.length} scripts downloaded and written successfully to ${selectedFolderUriResolved.fsPath}!`;
                this.logger.info(successMsg);
                vscode.window.showInformationMessage(successMsg);
            });
        } catch (error) {
            showError(`Failed to download all scripts: ${(error as Error).message}`);
        }
    }

    async upload(): Promise<void> {
        try {
            let language = getLanguageFromExtension(this.configService);
            this.logger.debug('Uploading script...');
            const source = this.getSource();
            if (!source || source.length === 0) {
                showError("No file is open");
                return;
            }
            const autoscript: Partial<AutoScript> = {
                autoscript: getFilename(),
                description: '',
                scriptlanguage: language,
                source: source,
                status: 'Active',
                properties: 'autoscript,description,source,status,scriptlanguage'
            }
            const addUpdateBuilder = this.getMaximoClient().autoScript.bulkOperation().addUpdate(autoscript);
            const addUpdateResult = await this.getMaximoClient().autoScript.executeBulkOperation(addUpdateBuilder);
            if (addUpdateResult.success) {
                // there could be errors in the responses
                if (addUpdateResult.responses.length > 0 &&
                    addUpdateResult.responses[0].status >= 200 && addUpdateResult.responses[0].status < 300) {
                    showInformation(`Script ${autoscript.autoscript} uploaded successfully to ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}`);
                }
                else if (addUpdateResult.responses.length > 0) {
                    showError(`Failed to upload script ${autoscript.autoscript} to ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}: ${addUpdateResult.responses[0].status}`);
                }
                else {
                    showError(`Failed to upload script ${autoscript.autoscript} to ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}: ${addUpdateResult.data}`);
                }
            }
            else {
                showError(`Failed to upload script ${autoscript.autoscript} to ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}: ${addUpdateResult.responses?.[0]?.error?.message || addUpdateResult.data}`);
            }
        } catch (error) {
            showError(`Failed to upload script: ${(error as Error).message}`);
        }
    }

    async compareWithServer(): Promise<void> {
        try {
            this.logger.debug('Comparing script with server...');
            const scriptName = getFilename();
            const sourceFromServer = await this.getMaximoClient().autoScript.downloadScriptSource(scriptName);
            if (!sourceFromServer) {
                vscode.window.showWarningMessage(`No script source found for the script ${scriptName}`);
                this.logger.warn(`No script source found for the script ${scriptName} from ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}`);
                return;
            }
            // Create a virtual document URI for the server script content
            let serverScript = vscode.Uri.parse('mxscript:' + encodeURIComponent(sourceFromServer));
            const { activeTextEditor } = vscode.window;

            if (activeTextEditor) {
                const { document } = activeTextEditor;
                let original = document.uri;
                if (original !== null) {
                    let title: string = `Local: ${scriptName} ↔ Server (${this.configService.getActiveEnvironmentName() || this.configService.getUrl()})`;
                    vscode.commands.executeCommand('vscode.diff', original, serverScript, title);
                } else {
                    showError("No active text editor found to compare the script.");
                }
            } else {
                showError("No active text editor found to compare the script.");
            }
        } catch (error) {
            showError(`Failed to download script: ${(error as Error).message}`);
        }

    }
    async delete(): Promise<void> {
        try {
            this.logger.debug('Deleting script...');
            const scriptName = getFilename();
            if (!scriptName) {
                showWarning("No valid file is open or filename could not be determined.");
                return;
            }

            // Use showWarningMessage with Delete/Cancel buttons
            const serverName = this.configService.getActiveEnvironmentName() || this.configService.getUrl();
            vscode.window.showWarningMessage(
                `Are you sure you want to delete the script "${scriptName}" from server "${serverName}"?`,
                "Delete",
                "Cancel"
            ).then(async selection => {
                if (selection === "Delete") {
                    try {
                        // User clicked Delete, proceed with deletion
                        const scriptFromServer = await this.getMaximoClient().autoScript.findAll(`autoscript="${scriptName}"`);
                        if (scriptFromServer.length === 0) {
                            showWarning(`No script found on the server ${serverName} with the name ${scriptName}`);
                            return;
                        }

                        this.logger.debug(`Script ${scriptName} found on the server. Proceeding to delete...`);
                        await this.getMaximoClient().autoScript.delete(scriptFromServer[0]);
                        this.logger.debug(`Script ${scriptName} deleted successfully from ${serverName}`);
                        showInformation(`Script ${scriptName} deleted successfully from ${serverName}`);
                    } catch (error) {
                        showError(`Failed to delete script: ${(error as Error).message}`);
                    }
                } else {
                    // User clicked Cancel or dismissed the dialog
                    this.logger.debug(`User canceled deletion of script ${scriptName}`);
                }
            });
        } catch (error) {
            showError(`Failed to delete script: ${(error as Error).message}`);
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

    /**
     * Maps script language to file extension.
     * @param language The script language (e.g., "jython", "javascript").
     * @returns The corresponding file extension (e.g., "py", "js").
     */
    private getFileExtensionFromLanguage(language: string): string {
        const languageToExtension: Record<string, string> = {
            groovy: 'groovy',
            nashorn: 'js',
            javascript: 'js',
            ecmascript: 'js',
            python: 'py',
            jython: 'py',
        };

        return languageToExtension[language.toLowerCase()] || 'txt'; // Default to 'txt' if language is unknown
    }



}
