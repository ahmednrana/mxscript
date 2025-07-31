import * as vscode from 'vscode';
import { SimpleOSService } from './ISimpleOSService';
import { MaximoClientProvider } from '../../client/client';
import { ConfigService } from '../Config/ConfigService';
import { Logger } from '../Logger/Logger';
import { getFilename, showError, showInformation, showWarning } from '../../utils/utils';
import { MaxPresentation } from 'maximo-api-client/dist/model/maxpresentation';
// import * as xmlFormatter from 'xml-formatter';
import xmlFormat from 'xml-formatter';

export class AppXmlService implements SimpleOSService {
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
            this.logger.debug('Updating xml...');
            const fileName = getFilename();

            let xmlFromServer = await this.getMaximoClient().appXml.downloadAppXml(fileName);
            if (!xmlFromServer) {
                showWarning(`No application xml found for the ${fileName} on ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}`);
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
                if (this.configService.getFormatXmlOnDownloadAndCompare()){
                    xmlFromServer = await this.formatXmlContent(xmlFromServer);
                }
                edit.replace(document.uri, fullRange, xmlFromServer);
                const success = await vscode.workspace.applyEdit(edit);
                if (success) {
                    showInformation(`Xml ${fileName} updated successfully from ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}`);
                } else {
                    showError(`Failed to apply edits to the document.`);
                }
            } else {
                showWarning("The file open is not valid");
            }
        } catch (error) {
            showError(`Failed to download application xml: ${(error as Error).message}`);
        }

    }

    async downloadAll(): Promise<void> {
        try {
            this.logger.debug('Downloading all applications xmls...');
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
                title: `Downloading app xmls from ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}`,
                cancellable: false,
            }, async (progress) => {
                // Step 1: Start downloading application xmls
                progress.report({ increment: 0, message: "Downloading application xmls..." });
                let downloadAllResponse = (await this.getMaximoClient().appXml.downloadAllAppXmls());

                if (downloadAllResponse.length === 0) {
                    vscode.window.showWarningMessage("No application xmls found on the server");
                    this.logger.warn("No application xmls found on the server");
                    return;
                }

                // Step 2: Full response received
                progress.report({ increment: 50, message: "Download complete. Preparing to write appxmls..." });

                // Step 3: Write application xmls to files
                for (const appxml of downloadAllResponse) {
                    const appName = appxml.app;
                    const fileExtension = 'xml';
                    const fileName = `${appName}.${fileExtension}`;
                    const filePath = vscode.Uri.joinPath(selectedFolderUriResolved, fileName);
                    const xmlContent = (this.configService.getFormatXmlOnDownloadAndCompare()) ? await this.formatXmlContent(appxml.presentation || '')
                     : appxml.presentation;
                    await vscode.workspace.fs.writeFile(filePath, Buffer.from(xmlContent || '', 'utf8'));
                }

                // Step 4: Writing complete
                progress.report({ increment: 25, message: "Writing application xmls to files..." });

                // Step 5: Finalize
                progress.report({ increment: 25, message: "All application xmls downloaded and written successfully!" });
                const successMsg = `All ${downloadAllResponse.length} application xmls downloaded and written successfully to ${selectedFolderUriResolved.fsPath}!`;
                this.logger.info(successMsg);
                vscode.window.showInformationMessage(successMsg);
            });
        } catch (error) {
            showError(`Failed to download application xmls: ${(error as Error).message}`);
        }
    }

    async upload(): Promise<void> {
        try {
            this.logger.debug('Uploading application xml...');
            const source = this.getSource();
            if (!source || source.length === 0) {
                showError("No file is open");
                return;
            }
            const appxml: Partial<MaxPresentation> = {
                app: getFilename(),
                presentation: source,
                properties: 'app'
            }
            const addUpdateBuilder = this.getMaximoClient().appXml.bulkOperation().addUpdate(appxml);
            const addUpdateResult = await this.getMaximoClient().appXml.executeBulkOperation(addUpdateBuilder);
            if (addUpdateResult.success) {
                // there could be errors in the responses
                if (addUpdateResult.responses.length > 0 &&
                    addUpdateResult.responses[0].status >= 200 && addUpdateResult.responses[0].status < 300) {
                    showInformation(`${appxml.app}.xml uploaded successfully to ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}`);
                }
                else if (addUpdateResult.responses.length > 0) {
                    showError(`Failed to upload application xml ${appxml.app} to ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}: ${addUpdateResult.responses[0].status}`);
                }
                else {
                    showError(`Failed to upload application xml ${appxml.app} to ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}: ${addUpdateResult.data}`);
                }
            }
            else {
                showError(`Failed to upload application xml ${appxml.app} to ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}: ${addUpdateResult.responses?.[0]?.error?.message || addUpdateResult.data}`);
            }
        } catch (error) {
            showError(`Failed to upload application xml: ${(error as Error).message}`);
        }
    }

    async compareWithServer(): Promise<void> {
        try {
            this.logger.debug('Comparing application xml with server...');
            const appName = getFilename();
            let sourceFromServer = await this.getMaximoClient().appXml.downloadAppXml(appName);
            if (!sourceFromServer) {
                vscode.window.showWarningMessage(`No application xml source found for the app ${appName}`);
                this.logger.warn(`No application xml found for the app ${appName} from ${this.configService.getActiveEnvironmentName() || this.configService.getUrl()}`);
                return;
            }

            const { activeTextEditor } = vscode.window;

            if (activeTextEditor) {
                const { document } = activeTextEditor;

                let localContent = document.getText();
                if (this.configService.getFormatXmlOnDownloadAndCompare()) {
                    localContent = await this.formatXmlContent(localContent);
                    sourceFromServer = await this.formatXmlContent(sourceFromServer);
                }
                const serverXml = vscode.Uri.parse('mxscript:' + encodeURIComponent(sourceFromServer));
                const localXml = vscode.Uri.parse('mxscript:' + encodeURIComponent(localContent));

                let title: string = `Local: ${appName} ↔ Server (${this.configService.getActiveEnvironmentName() || this.configService.getUrl()})`;

                // Execute diff command
                vscode.commands.executeCommand('vscode.diff', localXml, serverXml, title);

            } else {
                showError("No active text editor found to compare the application xml.");
            }
        } catch (error) {
            showError(`Failed to download application xml: ${(error as Error).message}`);
        }

    }

    async delete(): Promise<void> {
        //pass
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
     * Formats XML content for better readability
     * @param input XML content as string
     * @returns Formatted XML string
     */
    private async formatXmlContent(input: string): Promise<string> {
        try {
            // Use xml-formatter library for reliable formatting
            return xmlFormat(input, {
                indentation: '  ',
                // filter: (node) => node.type !== 'Comment', // remove comments
                collapseContent: true,
                lineSeparator: '\n'
            });
        } catch (error) {
            this.logger.warn(`XML formatting with xml-formatter failed: ${error}`);
            // Fallback to basic formatting if xml-formatter fails
            return this.basicXmlFormat(input);
        }
    }

    /**
     * Basic XML formatting fallback when xml-formatter is not available
     * @param xmlContent Raw XML content
     * @returns Formatted XML string
     */
    private basicXmlFormat(xmlContent: string): string {
        try {
            // Remove extra whitespace and format with basic indentation
            let formatted = xmlContent
                .replace(/>\s*</g, '><') // Remove whitespace between tags
                .replace(/></g, '>\n<'); // Add newlines between tags

            // Add basic indentation
            const lines = formatted.split('\n');
            let indentLevel = 0;
            const indentSize = 2;

            return lines.map(line => {
                const trimmed = line.trim();
                if (!trimmed) return '';

                // Decrease indent for closing tags
                if (trimmed.startsWith('</')) {
                    indentLevel = Math.max(0, indentLevel - 1);
                }

                const indented = ' '.repeat(indentLevel * indentSize) + trimmed;

                // Increase indent for opening tags (but not self-closing)
                if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
                    indentLevel++;
                }

                return indented;
            }).join('\n');
        } catch (error) {
            this.logger.warn(`Basic XML formatting failed: ${error}`);
            return xmlContent; // Return original if even basic formatting fails
        }
    }
}
