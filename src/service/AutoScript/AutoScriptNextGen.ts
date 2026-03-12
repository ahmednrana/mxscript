import * as vscode from 'vscode';
import { SimpleOSService } from './ISimpleOSService';
import { MaximoClientProvider } from '../../client/client';
import { ConfigService } from '../Config/ConfigService';
import { Logger } from '../Logger/Logger';
import { getFilename, getLanguageFromExtension, showError, showInformation, showWarning } from '../../utils/utils';
import { MaximoEnvironment } from '../../webview/EnvironmentManager';

import { AutoScript, QueryBuilder } from '@maximomize/maximo-api-client';

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
                showWarning(`No script source found for the script ${fileName} on ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]`);
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
                    showInformation(`Script ${fileName} updated successfully from ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]`);
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
            this.logger.debug('Downloading scripts (all/multiple) via picker...');

            // ensure workspace
            if (!vscode.workspace.workspaceFolders) {
                showError("Please open a workspace or folder first");
                return;
            }

            const rootFolder = vscode.workspace.workspaceFolders[0];

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

            // Start background fetch early to reduce wait time for the Multiple flow
            const fetchScriptList = async () => {
                // Fallback to downloadAllScripts which returns full meta; map to lightweight list
                const appQuery = new QueryBuilder<any>(this.getMaximoClient().getAutoscriptService().getObjectStructure())
                    .select(['autoscript', 'description'])
                    .pageSize(3000);
                const list = await this.getMaximoClient().getAutoscriptService().findAll(appQuery);
                return list || [];
            };

            // Helper: write list of scripts to folder
            const writeScriptsToFolder = async (scripts: any[], folderUri: vscode.Uri, progress: vscode.Progress<{ message?: string; increment?: number }>, token?: vscode.CancellationToken) => {
                if (!scripts || scripts.length === 0) return 0;
                for (let i = 0; i < scripts.length; i++) {
                    if (token?.isCancellationRequested) break;
                    const script = scripts[i];
                    const baseName = sanitizeFilename((script.autoscript).toString());
                    let fileExtension = 'py'; // default
                    if (script.scriptlanguage) fileExtension = this.getFileExtensionFromLanguage(script.scriptlanguage);
                    let fileName = `${baseName}.${fileExtension}`;

                    const filePath = vscode.Uri.joinPath(folderUri, fileName);
                    const content = script.source || script.script || '';
                    try {
                        await vscode.workspace.fs.writeFile(filePath, Buffer.from(content, 'utf8'));
                    } catch (writeErr) {
                        this.logger.error(`Failed to write file ${filePath.fsPath}: ${(writeErr as Error).message}`);
                        showError(`Failed to write file ${filePath.fsPath}: ${(writeErr as Error).message}`);
                    }

                    const increment = Math.max(1, Math.floor(80 / scripts.length));
                    progress.report({ increment, message: `Writing ${fileName} (${i + 1}/${scripts.length})` });
                }
                return scripts.length;
            };


            const backgroundFetch = fetchScriptList();

            // Ask user if they want All or Multiple first.
            const mode = await vscode.window.showQuickPick([
                { label: 'All', description: 'Download every script from the server' },
                { label: 'Multiple', description: 'Choose multiple scripts to download' }
            ], { placeHolder: 'Download All or Multiple scripts?' });

            if (!mode) return; // user cancelled

            let picked: vscode.QuickPickItem[] | undefined;
            let selectedFolderUri: vscode.Uri | undefined;

            if (mode.label === 'Multiple') {
                // Show busy QuickPick while background fetch runs
                const quickPick = vscode.window.createQuickPick<vscode.QuickPickItem>();
                quickPick.canSelectMany = true;
                quickPick.ignoreFocusOut = true;
                quickPick.busy = true;
                quickPick.placeholder = `Loading scripts from ${this.configService.getActiveEnvironmentName()}...`;
                quickPick.show();

                let wasHidden = false;
                quickPick.onDidHide(() => { wasHidden = true; });

                let scripts: any[] = [];
                try {
                    scripts = await backgroundFetch;
                } catch (fetchErr) {
                    quickPick.hide();
                    quickPick.dispose();
                    showError(`Failed to fetch scripts: ${(fetchErr as Error).message}`);
                    return;
                }

                if (wasHidden) { quickPick.dispose(); return; }

                if (!scripts || scripts.length === 0) {
                    quickPick.hide();
                    quickPick.dispose();
                    showWarning(`No scripts found on ${this.configService.getActiveEnvironmentName()}`);
                    return;
                }

                quickPick.busy = false;
                quickPick.placeholder = `Search or select scripts (found ${scripts.length})`;
                quickPick.items = scripts.map((s: any) => ({ label: s.autoscript || '<no-name>', description: s.description ? (s.description.length > 120 ? s.description.substring(0, 117) + '...' : s.description) : '' }));

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
                title: `Downloading Scripts from ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]`,
                cancellable: true
            }, async (progress, token) => {
                progress.report({ increment: 5, message: 'Preparing download...' });

                try {
                    let scriptQuery = '';
                    if (mode.label != 'All') { // It is multiselection
                        const scripts = await backgroundFetch; // should already be resolved but safe to await
                        const pickedLabels = picked!.map(p => p.label);
                        progress.report({ increment: 10, message: `Fetching ${picked!.length} selected scripts...` });

                        const selectedScripts = scripts
                            .filter((c: any) => pickedLabels.includes(c.autoscript))
                            .map(c => c.autoscript).join('","');
                        scriptQuery = `autoscript in ["${selectedScripts}"]`;
                    }
                    else { // All selected
                        progress.report({ increment: 10, message: `Fetching all scripts...` });
                    }
                    this.logger.debug(`Fetching scripts with query: ${scriptQuery}`);
                    progress.report({ increment: 10, message: 'Fetching all scripts from server...' });
                    const scriptQueryBuilder = new QueryBuilder<any>(this.getMaximoClient().autoScript.getObjectStructure())
                        .select(['autoscript', 'source', 'scriptlanguage'])
                        .where(scriptQuery)
                        .pageSize(3000);
                    const fullList = await this.getMaximoClient().getAutoscriptService().findAll(scriptQueryBuilder);
                    if (!fullList || fullList.length === 0) {
                        showWarning(`No conditions found on ${this.configService.getActiveEnvironmentName()}`);
                        return;
                    }
                    progress.report({ increment: 20, message: `Found ${fullList.length} scripts. Writing files...` });
                    await writeScriptsToFolder(fullList, selectedFolderUri!, progress, token);
                    progress.report({ increment: 100, message: 'Download completed' });
                    showInformation(`Successfully downloaded ${fullList.length} scripts to ${selectedFolderUri!.fsPath}`);
                } catch (err) {
                    showError(`Failed to download scripts: ${(err as Error).message}`);
                }
            });
        } catch (error) {
            showError(`Failed to download all scripts: ${(error as Error).message}`);
        }
    }

    async upload(silent: boolean = false): Promise<boolean> {
        try {
            let language = getLanguageFromExtension(this.configService);
            if (!silent) this.logger.debug('Uploading script...');
            const source = this.getSource();
            if (!source || source.length === 0) {
                showError("No file is open");
                return false;
            }
            const autoscript: Partial<AutoScript> = {
                autoscript: getFilename(),
                description: '',
                scriptlanguage: language,
                source: source,
                // status: 'Active',
                properties: 'autoscript,description,source,status,scriptlanguage'
            }
            const addUpdateBuilder = this.getMaximoClient().autoScript.bulkOperation().addUpdate(autoscript);
            const addUpdateResult = await this.getMaximoClient().autoScript.executeBulkOperation(addUpdateBuilder);
            if (addUpdateResult.success) {
                // there could be errors in the responses
                if (addUpdateResult.responses.length > 0 &&
                    addUpdateResult.responses[0].status >= 200 && addUpdateResult.responses[0].status < 300) {
                    if (!silent) showInformation(`Script ${autoscript.autoscript} uploaded successfully to ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]`);
                    return true;
                }
                else if (addUpdateResult.responses.length > 0) {
                    showError(`Failed to upload script ${autoscript.autoscript} to ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]: ${addUpdateResult.responses[0].status}`);
                    return false;
                }
                else {
                    showError(`Failed to upload script ${autoscript.autoscript} to ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]: ${addUpdateResult.data}`);
                    return false;
                }
            }
            else {
                showError(`Failed to upload script ${autoscript.autoscript} to ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]: ${addUpdateResult.responses?.[0]?.error?.message || addUpdateResult.data}`);
                return false;
            }
        } catch (error) {
            showError(`Failed to upload script: ${(error as Error).message}`);
            return false;
        }
    }

    async compareWithServer(): Promise<void> {
        try {
            this.logger.debug('Comparing script with server...');
            const scriptName = getFilename();
            const sourceFromServer = await this.getMaximoClient().autoScript.downloadScriptSource(scriptName);
            if (!sourceFromServer) {
                vscode.window.showWarningMessage(`No script source found for the script ${scriptName}`);
                this.logger.warn(`No script source found for the script ${scriptName} from ${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}]`);
                return;
            }
            // Create a virtual document URI for the server script content
            let serverScript = vscode.Uri.parse('mxscript:' + encodeURIComponent(sourceFromServer));
            const { activeTextEditor } = vscode.window;

            if (activeTextEditor) {
                const { document } = activeTextEditor;
                let original = document.uri;
                if (original !== null) {
                    let title: string = `Local: ${scriptName} ↔ Server (${this.configService.getActiveEnvironmentName()} [${this.configService.getUrl()}])`;
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

    async compareWithEnvironment(environment: MaximoEnvironment): Promise<void> {
        try {
            this.logger.debug('Comparing script with environment...');
            const scriptName = getFilename();

            // Create client for the target environment
            const { MaximoClientProvider } = await import('../../client/client');
            const targetClient = MaximoClientProvider.createClientFromEnvironment(environment, this.logger);

            const sourceFromServer = await targetClient.autoScript.downloadScriptSource(scriptName);
            if (!sourceFromServer) {
                vscode.window.showWarningMessage(`No script source found for the script ${scriptName}`);
                this.logger.warn(`No script source found for the script ${scriptName} from ${environment.name} [${environment.hostname}:${environment.port}]`);
                return;
            }

            // Create a virtual document URI for the server script content
            let serverScript = vscode.Uri.parse('mxscript:' + encodeURIComponent(sourceFromServer));
            const { activeTextEditor } = vscode.window;

            if (activeTextEditor) {
                const { document } = activeTextEditor;
                let original = document.uri;
                if (original !== null) {
                    let title: string = `Local: ${scriptName} ↔ ${environment.name} (${environment.hostname}:${environment.port})`;
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
    async delete(silent: boolean = false): Promise<void> {
        try {
            if (!silent) this.logger.debug('Deleting script...');
            const scriptName = getFilename();
            if (!scriptName) {
                showWarning("No valid file is open or filename could not be determined.");
                return;
            }

            // Use showWarningMessage with Delete/Cancel buttons
            const serverName = this.configService.getActiveEnvironmentName() || this.configService.getUrl();

            if (silent) {
                try {
                    const scriptFromServer = await this.getMaximoClient().autoScript.findAll(`autoscript="${scriptName}"`);
                    if (scriptFromServer.length === 0) return;
                    await this.getMaximoClient().autoScript.delete(scriptFromServer[0]);
                } catch (error) {
                    showError(`Failed to delete script: ${(error as Error).message}`);
                }
                return;
            }

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

    async execute(provider?: any): Promise<void> {
        try {
            const fileName = vscode.window.activeTextEditor?.document.fileName;
            if (!fileName || !/\.(jy|py|js)$/i.test(fileName)) {
                showWarning("Execution is only supported for .jy, .py, or .js files.");
                return;
            }

            const confirmation = await vscode.window.showWarningMessage(
                "This will upload the script to server, then invoke it through Automation Script Handler (GET method) and then remove the script from server. Are you sure you want to continue?",
                "Yes",
                "Read More",
                "Cancel"
            );

            if (confirmation === "Read More") {
                vscode.env.openExternal(vscode.Uri.parse("https://ibm-maximo-dev.github.io/maximo-restapi-documentation/autoscript/autoscript"));
                return;
            }

            if (confirmation !== "Yes") {
                return;
            }

            const uploaded = await this.upload(true);
            if (!uploaded) {
                this.logger.debug('Script upload failed, aborting execution.');
                return;
            }

            this.logger.debug('Executing script...');
            const scriptName = getFilename();
            if (!scriptName) {
                showWarning("No valid file is open or filename could not be determined.");
                return;
            }

            const serverName = this.configService.getActiveEnvironmentName() || this.configService.getUrl();
            vscode.window.showInformationMessage(`Executing script "${scriptName}" on server "${serverName}"...`);

            const response = await this.getMaximoClient().autoScript.executeScript(scriptName, 'GET');

            // Delete the script after execution
            await this.delete(true);

            // extract data
            const data = response?.data !== undefined ? response.data : response;

            if (!data || (typeof data === 'object' && Object.keys(data).length === 0) || (typeof data === 'string' && data.trim() === '')) {
                showInformation(`Script ${scriptName} executed successfully on ${serverName}. No response data.`);
                return;
            }

            await this.showExecutionResult(scriptName, data, provider);

        } catch (error) {
            showError(`Failed to execute script: ${(error as Error).message}`);
            // Attempt to clean up even if execution fails
            await this.delete(true);
        }
    }

    private async showExecutionResult(scriptName: string, data: any, providers?: { channel: vscode.OutputChannel, provider: any }): Promise<void> {
        let formattedOutput = '';

        if (typeof data === 'object') {
            formattedOutput += JSON.stringify(data, null, 2);
        } else {
            formattedOutput += data.toString();
        }

        const config = vscode.workspace.getConfiguration('mxscript.execution');
        const displayLocation = config.get<string>('displayLocation', 'bottomPanel');

        if (displayLocation === 'sideView' && providers?.provider && typeof providers.provider.updateContent === 'function') {
            const provider = providers.provider;
            const id = `exec-${Date.now()}`;
            const title = `${scriptName} Result`;
            const uri = provider.updateContent(id, title, formattedOutput);
            const doc = await vscode.workspace.openTextDocument(uri);
            await vscode.window.showTextDocument(doc, { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true });
        } else if (providers?.channel && typeof providers.channel.appendLine === 'function') {
            const channel = providers.channel;
            channel.clear();
            channel.appendLine(`--- Execution Result for ${scriptName} ---`);
            channel.appendLine(formattedOutput);
            channel.appendLine('-------------------------------------------');
            channel.show(true);
        } else {
            // Fallback for cases where output method is not provided or mismatched
            const doc = await vscode.workspace.openTextDocument({ content: formattedOutput, language: typeof data === 'object' ? 'json' : 'plaintext' });
            await vscode.window.showTextDocument(doc, { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true });
        }
    }

    async openInMaximo(): Promise<void> {
        try {
            const scriptName = getFilename();
            if (!scriptName) {
                showWarning("No valid file is open or filename could not be determined.");
                return;
            }

            const { getActiveMaximoEnvironment } = await import('../../utils/utils');
            const env = getActiveMaximoEnvironment(this.context);

            if (!env) {
                showWarning("Could not resolve active environment.");
                return;
            }

            const client = this.getMaximoClient();
            vscode.window.showInformationMessage(`Opening ${scriptName} in Maximo...`);

            const query = new QueryBuilder<AutoScript>(client.autoScript.getObjectStructure())
                .where(`autoscript="${scriptName}"`)
                .select(['autoscriptid']);

            const searchResult = await client.autoScript.executeQuery(query);

            if (!searchResult || searchResult.items.length === 0) {
                vscode.window.showWarningMessage(`Could not find Autoscript: ${scriptName} in ${env.name}`);
                return;
            }

            const scriptId = searchResult.items[0].autoscriptid;
            if (!scriptId) {
                vscode.window.showErrorMessage(`ID missing for autoscript ${scriptName}.`);
                return;
            }

            const url = client.getWebUrl({ value: "autoscript", uniqueid: Number(scriptId) });

            const { openBrowserWithChoice } = await import('../../utils/browserUtils');
            await openBrowserWithChoice(url, env, this.context);

        } catch (error) {
            showError(`Failed to open in Maximo: ${(error as Error).message}`);
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
