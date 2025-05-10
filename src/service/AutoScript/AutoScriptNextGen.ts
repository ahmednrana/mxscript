import * as vscode from 'vscode';
import { IAutoScriptService } from './IAutoScriptService';
import { MaximoClientProvider } from '../../client/client';
import { ConfigService } from '../Config/ConfigService';
import { Logger } from '../Logger/Logger';
import { getLanguageFromExtension } from '../../utils/utils';
import { AutoScript } from 'maximo-api-client';

export class AutoScriptNextGen implements IAutoScriptService {
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

    async updateScript(): Promise<void> {
        try {
            this.logger.debug('Updating script...');
            const fileName = this.configService.getFilename();
            if (!fileName) {
                this.displayError("No valid file is open");
                return;
            }
            const sourceFromServer = await this.getMaximoClient().autoScript.downloadScriptSource(fileName);
            if (!sourceFromServer) {
                vscode.window.showWarningMessage(`No script source found for the script ${fileName}`);
                this.logger.warn(`No script source found for the specified script ${fileName}`);
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
                vscode.workspace.applyEdit(edit);
                vscode.window.showInformationMessage(`Script ${this.configService.getFilename()} updated successfully from ${this.configService.getActiveEnvironmentName()}`);
                this.logger.debug(`Script ${this.configService.getFilename()} updated successfully from ${this.configService.getActiveEnvironmentName()}`);
            } else {
                vscode.window.showWarningMessage("The file open is not valid");
            }
        } catch (error) {
            this.displayError(`Failed to download script: ${(error as Error).message}`);
        }

    }

    async downloadAllScripts(): Promise<void> {
        try {
            this.logger.debug('Downloading all scripts...');
            if (!vscode.workspace.workspaceFolders) {
                this.displayError("Please open a workspace or folder first");
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
                        this.displayError("The selected folder is not part of the project. Please select a folder from the current project.");
                        return;
                    }
                    this.logger.debug('Selected file: ' + selectedFolder.fsPath);
                    return selectedFolder;
                }
                return undefined;
            });

            if (!selectedFolderUri) {
                this.displayError("Folder selection error. It might not be part of the project.");
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
            this.displayError(`Failed to download all scripts: ${(error as Error).message}`);
        }
    }

    async uploadScript(): Promise<void> {
        try {
            let language = getLanguageFromExtension(this.configService);
            this.logger.debug('Uploading script...');
            const source = this.getSource();
            if (!source || source.length === 0) {
                this.displayError("No file is open");
                return;
            }
            const autoscript: Partial<AutoScript> = {
                autoscript: this.configService.getFilename(),
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
                    this.logger.debug(`Script ${autoscript.autoscript} uploaded successfully to ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}`);
                    vscode.window.showInformationMessage(`Script ${autoscript.autoscript} uploaded successfully to ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}`);
                }
                else if (addUpdateResult.responses.length > 0) {
                    this.displayError(`Failed to upload script ${autoscript.autoscript} to ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}: ${addUpdateResult.responses[0].status}`);
                }
                else {
                    this.displayError(`Failed to upload script ${autoscript.autoscript} to ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}: ${addUpdateResult.data}`);
                }
            }
            else {
                this.displayError(`Failed to upload script ${autoscript.autoscript} to ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}: ${addUpdateResult.data}`);
            }
        } catch (error) {
            this.displayError(`Failed to upload script: ${(error as Error).message}`);
        }
    }

    async compareWithServer(): Promise<void> {
        try {
            this.logger.debug('Comparing script with server...');
            const scriptName = this.configService.getFilename();
            if (!scriptName) {
                this.displayError("No valid file is open or filename could not be determined.");
                return;
            }
            const sourceFromServer = await this.getMaximoClient().autoScript.downloadScriptSource(scriptName);
            if (!sourceFromServer) {
                vscode.window.showWarningMessage(`No script source found for the script ${scriptName}`);
                this.logger.warn(`No script source found for the specified script ${scriptName}`);
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
                    this.displayError("No active text editor found to compare the script.");
                }
            } else {
                this.displayError("No active text editor found to compare the script.");
            }
        } catch (error) {
            this.displayError(`Failed to download script: ${(error as Error).message}`);
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

    private displayError(message: string): void {
        vscode.window.showErrorMessage(message);
        this.logger.error(this.configService.toString() + message);
    }

}


