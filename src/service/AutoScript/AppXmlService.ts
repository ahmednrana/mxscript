import * as vscode from 'vscode';
import { SimpleOSService } from './ISimpleOSService';
import { MaximoClientProvider } from '../../client/client';
import { ConfigService } from '../Config/ConfigService';
import { Logger } from '../Logger/Logger';
import { getFilename, showError, showInformation, showWarning } from '../../utils/utils';
import { MaximoEnvironment } from '../../webview/EnvironmentManager';
import { MaxPresentation } from 'maximo-api-client/dist/model/maxpresentation';
// import * as xmlFormatter from 'xml-formatter';
import xmlFormat from 'xml-formatter';
import { QueryBuilder } from 'maximo-api-client/dist/core/query-builder';

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

            let xmlFromServer = await this.getMaximoClient().getMaxAppService().getAppPresentation(fileName);
            if (!xmlFromServer) {
                showWarning(`No application xml found for the ${fileName} on ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]`);
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
                if (this.configService.getFormatXmlOnDownloadAndCompare()) {
                    xmlFromServer = await this.formatXmlContent(xmlFromServer);
                }
                edit.replace(document.uri, fullRange, xmlFromServer);
                const success = await vscode.workspace.applyEdit(edit);
                if (success) {
                    showInformation(`Xml ${fileName} updated successfully from ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]`);
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

            const rootFolder = vscode.workspace.workspaceFolders[0]; // Workspace root folder

            // Helper: sanitize filename and ensure uniqueness
            const sanitizeFilename = (name: string) => {
                return name.replace(/[<>:\"\\/\|\?\*]/g, '_').slice(0, 240);
            };

            // Helper: prompt for folder (ensure it's part of current workspace)
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


            // Background fetch of app list to speed up Multiple flow
            const fetchAppList = async () => {
                const appQuery = new QueryBuilder<any>(this.getMaximoClient().getMaxAppService().getObjectStructure())
                    .select(['app', 'description'])
                    .pageSize(3000);
                const list = await this.getMaximoClient().getMaxAppService().findAll(appQuery);
                return list || [];
            };

            // Helper: write list of applications to folder
            const writeAppsToFolder = async (apps: any[], folderUri: vscode.Uri, progress: vscode.Progress<{ message?: string; increment?: number }>, token?: vscode.CancellationToken) => {
                if (!apps || apps.length === 0) return 0;

                for (let i = 0; i < apps.length; i++) {
                    if (token?.isCancellationRequested) break;
                    const app = apps[i];
                    const baseName = sanitizeFilename((app.app).toString());
                    let fileName = `${baseName}.xml`;
                    const xmlRaw = app.maxpresentation?.[0]?.presentation ? app.maxpresentation[0].presentation : '';
                    const xmlContent = (this.configService.getFormatXmlOnDownloadAndCompare()) ? await this.formatXmlContent(xmlRaw)
                        : xmlRaw;

                    const filePath = vscode.Uri.joinPath(folderUri, fileName);
                    try {
                        await vscode.workspace.fs.writeFile(filePath, Buffer.from(xmlContent, 'utf8'));
                    } catch (writeErr) {
                        this.logger.error(`Failed to write file ${filePath.fsPath}: ${(writeErr as Error).message}`);
                        showError(`Failed to write file ${filePath.fsPath}: ${(writeErr as Error).message}`);
                    }

                    const increment = Math.max(1, Math.floor(80 / apps.length));
                    progress.report({ increment, message: `Writing ${fileName} (${i + 1}/${apps.length})` });
                }
                return apps.length;
            };
            const backgroundFetch = fetchAppList();

            // Ask user if they want All or Multiple first.
            const mode = await vscode.window.showQuickPick([
                { label: 'All', description: 'Download every application xml from the server' },
                { label: 'Multiple', description: 'Choose multiple application xmls to download' }
            ], { placeHolder: 'Download All or Multiple application xmls?' });

            if (!mode) return; // user cancelled

            let picked: vscode.QuickPickItem[] | undefined;
            let selectedFolderUri: vscode.Uri | undefined;

            if (mode.label === 'Multiple') {
                // Show busy QuickPick while background fetch runs
                const quickPick = vscode.window.createQuickPick<vscode.QuickPickItem>();
                quickPick.canSelectMany = true;
                quickPick.ignoreFocusOut = true;
                quickPick.busy = true;
                quickPick.placeholder = `Loading applications from ${this.configService.getActiveEnvironmentName()}...`;
                quickPick.show();

                let wasHidden = false;
                quickPick.onDidHide(() => { wasHidden = true; });

                let apps: any[] = [];
                try {
                    apps = await backgroundFetch;
                } catch (fetchErr) {
                    quickPick.hide();
                    quickPick.dispose();
                    showError(`Failed to fetch application list: ${(fetchErr as Error).message}`);
                    return;
                }

                if (wasHidden) { quickPick.dispose(); return; }

                if (!apps || apps.length === 0) {
                    quickPick.hide();
                    quickPick.dispose();
                    showWarning(`No application xmls found on ${this.configService.getActiveEnvironmentName()}`);
                    return;
                }

                quickPick.busy = false;
                quickPick.placeholder = `Search or select applications (found ${apps.length})`;
                quickPick.items = apps.map((s: any) => ({ label: s.app || '<no-name>', description: s.description ? (s.description.length > 120 ? s.description.substring(0, 117) + '...' : s.description) : '' }));

                const chosen: vscode.QuickPickItem[] | undefined = await new Promise(resolve => {
                    quickPick.onDidAccept(() => { resolve([...quickPick.selectedItems]); quickPick.hide(); quickPick.dispose(); });
                    quickPick.onDidHide(() => { resolve(undefined); quickPick.dispose(); });
                });

                if (!chosen || chosen.length === 0) return;
                picked = chosen;

                selectedFolderUri = await promptForFolder();
                if (!selectedFolderUri) return;
            } else {
                // All
                selectedFolderUri = await promptForFolder();
                if (!selectedFolderUri) return;
            }

            // Run actual download/write with progress
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: `Downloading application xmls from ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]`,
                cancellable: true,
            }, async (progress, token) => {
                progress.report({ increment: 5, message: 'Preparing download...' });
                try {
                    let appQuery = '';
                    if (mode.label != 'All') { // It is multiselection
                        const apps = await backgroundFetch; // should already be resolved but safe to await
                        const pickedLabels = picked!.map(p => p.label);
                        progress.report({ increment: 10, message: `Fetching ${picked!.length} selected apps...` });

                        const selectedApp = apps
                            .filter((c: any) => pickedLabels.includes(c.app))
                            .map(c => c.app).join('","');
                        appQuery = `app in ["${selectedApp}"]`;
                    }
                    else { // All selected
                        progress.report({ increment: 10, message: `Fetching all apps...` });
                    }
                    this.logger.debug(`Fetching apps with query: ${appQuery}`);
                    progress.report({ increment: 10, message: 'Fetching all apps from server...' });
                    const appQueryBuilder = new QueryBuilder<any>(this.getMaximoClient().getMaxAppService().getObjectStructure())
                        .select(['app', 'expression'])
                        .where(appQuery)
                        .pageSize(3000);
                    const fullList = await this.getMaximoClient().getMaxAppService().findAll(appQueryBuilder);
                    if (!fullList || fullList.length === 0) {
                        showWarning(`No apps found on ${this.configService.getActiveEnvironmentName()}`);
                        return;
                    }
                    progress.report({ increment: 20, message: `Found ${fullList.length} apps. Writing files...` });
                    await writeAppsToFolder(fullList, selectedFolderUri!, progress, token);
                    progress.report({ increment: 100, message: 'Download completed' });
                    showInformation(`Successfully downloaded ${fullList.length} apps to ${selectedFolderUri!.fsPath}`);
                } catch (err) {
                    showError(`Failed to download apps: ${(err as Error).message}`);
                }
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
                maxpresentation: [{ presentation: source }],
                properties: 'app'
            }
            const addUpdateBuilder = this.getMaximoClient().appXml.bulkOperation().addUpdate(appxml);
            const addUpdateResult = await this.getMaximoClient().appXml.executeBulkOperation(addUpdateBuilder);
            if (addUpdateResult.success) {
                // there could be errors in the responses
                if (addUpdateResult.responses.length > 0 &&
                    addUpdateResult.responses[0].status >= 200 && addUpdateResult.responses[0].status < 300) {
                    showInformation(`${appxml.app}.xml uploaded successfully to ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]`);
                }
                else if (addUpdateResult.responses.length > 0) {
                    showError(`Failed to upload application xml ${appxml.app} to ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]: ${addUpdateResult.responses[0].status}`);
                }
                else {
                    showError(`Failed to upload application xml ${appxml.app} to ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]: ${addUpdateResult.data}`);
                }
            }
            else {
                showError(`Failed to upload application xml ${appxml.app} to ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]: ${addUpdateResult.responses?.[0]?.error?.message || addUpdateResult.data}`);
            }
        } catch (error) {
            showError(`Failed to upload application xml: ${(error as Error).message}`);
        }
    }

    async compareWithServer(): Promise<void> {
        try {
            this.logger.debug('Comparing application xml with server...');
            const appName = getFilename();
            let sourceFromServer = await this.getMaximoClient().getMaxAppService().getAppPresentation(appName);
            if (!sourceFromServer) {
                vscode.window.showWarningMessage(`No application xml source found for the app ${appName}`);
                this.logger.warn(`No application xml found for the app ${appName} from ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]`);
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

                let title: string = `Local: ${appName} ↔ Server (${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}])`;

                // Execute diff command
                vscode.commands.executeCommand('vscode.diff', localXml, serverXml, title);

            } else {
                showError("No active text editor found to compare the application xml.");
            }
        } catch (error) {
            showError(`Failed to download application xml: ${(error as Error).message}`);
        }

    }

    async compareWithEnvironment(environment: MaximoEnvironment): Promise<void> {
        try {
            this.logger.debug('Comparing application xml with environment...');
            const appName = getFilename();

            // Create client for the target environment
            const { MaximoClientProvider } = await import('../../client/client');
            const targetClient = MaximoClientProvider.createClientFromEnvironment(environment, this.logger);

            let sourceFromServer = await targetClient.getMaxAppService().getAppPresentation(appName);
            if (!sourceFromServer) {
                vscode.window.showWarningMessage(`No application xml source found for the app ${appName}`);
                this.logger.warn(`No application xml found for the app ${appName} from ${environment.name} [${environment.hostname}:${environment.port}]`);
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

                let title: string = `Local: ${appName} ↔ ${environment.name} (${environment.hostname}:${environment.port})`;

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
        showError("Delete operation is not supported for application xmls.");
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
