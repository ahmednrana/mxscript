import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { MaximoEnvironment } from '../webview/EnvironmentManager';
import { MaximoClient, MaximoClientConfig, AuthType, LogLevel } from 'maximo-api-client'; // Added
import { convertAuthType, getLogLevel } from '../utils/utils'; // Added

/**
 * WebView panel for adding/editing environments in the main editor area
 */
export class EnvironmentEditorPanel {
    public static currentPanel: EnvironmentEditorPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(
        extensionUri: vscode.Uri,
        context: vscode.ExtensionContext,
        environment?: MaximoEnvironment,
        onSave?: (environment: MaximoEnvironment) => void
    ): void {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        // If we already have a panel, show it
        if (EnvironmentEditorPanel.currentPanel) {
            EnvironmentEditorPanel.currentPanel._panel.reveal(column);
            EnvironmentEditorPanel.currentPanel.update(environment);
            EnvironmentEditorPanel.currentPanel._onSave = onSave;
            return;
        }

        // Otherwise, create a new panel
        const panel = vscode.window.createWebviewPanel(
            'maximoEnvironmentEditor',
            environment ? `Edit Environment: ${environment.name}` : 'Add New Maximo Environment',
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
                localResourceRoots: [extensionUri]
            }
        );

        EnvironmentEditorPanel.currentPanel = new EnvironmentEditorPanel(panel, extensionUri, context, environment, onSave);
    }

    private constructor(
        panel: vscode.WebviewPanel,
        private readonly _extensionUri: vscode.Uri,
        private readonly _context: vscode.ExtensionContext,
        private _environment?: MaximoEnvironment,
        private _onSave?: (environment: MaximoEnvironment) => void
    ) {
        this._panel = panel;

        // Set the webview's initial html content
        this._update();

        // Listen for when the panel is disposed
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(
            message => {
                switch (message.type) {
                    case 'save':
                        if (this._onSave) {
                            const incoming = message.environment || {};
                            // Preserve existing id if editing
                            if (this._environment?.id) {
                                incoming.id = this._environment.id;
                            }
                            // Normalize / ensure expected properties exist. We do a full replace style merge.
                            const normalized: MaximoEnvironment = {
                                id: incoming.id || (this._environment?.id) || '',
                                name: incoming.name || this._environment?.name || 'Unnamed Environment',
                                hostname: incoming.hostname || this._environment?.hostname || '',
                                port: Number(incoming.port ?? this._environment?.port ?? (incoming.httpProtocol === 'https' ? 443 : 9080)),
                                httpProtocol: incoming.httpProtocol || this._environment?.httpProtocol || 'https',
                                authenticationType: incoming.authenticationType || this._environment?.authenticationType || 'internal',
                                username: incoming.username ?? this._environment?.username ?? '',
                                password: incoming.password ?? this._environment?.password ?? '',
                                apikey: incoming.apikey ?? this._environment?.apikey ?? '',
                                objectStructure: incoming.objectStructure || this._environment?.objectStructure || 'MXSCRIPT',
                                appxml_objectStructure: incoming.appxml_objectStructure || this._environment?.appxml_objectStructure || 'MXL_APPS',
                                logLevel: incoming.logLevel || this._environment?.logLevel || 'INFO',
                                createPythonFileForJythonScripts: !!(incoming.createPythonFileForJythonScripts ?? this._environment?.createPythonFileForJythonScripts ?? true),
                                ignoreSslErrors: !!(incoming.ignoreSslErrors ?? this._environment?.ignoreSslErrors ?? true),
                                formatXmlOnDownloadAndCompare: !!(incoming.formatXmlOnDownloadAndCompare ?? this._environment?.formatXmlOnDownloadAndCompare ?? true),
                                scope: incoming.scope || this._environment?.scope || 'global',
                                sslcertificate: incoming.sslcertificate || this._environment?.sslcertificate || ''
                            };
                            this._onSave(normalized);
                        }
                        this._panel.dispose();
                        break;
                    case 'cancel':
                        this._panel.dispose();
                        break;
                    case 'showError':
                        vscode.window.showErrorMessage(message.message);
                        break;
                    case 'verifySettings':
                        // Show a temporary message in the webview
                        this._panel.webview.postMessage({
                            type: 'verificationResult',
                            success: null, // Indicates processing
                            message: 'Verifying settings...'
                        });
                        this._verifySettings(message.environment).then(result => {
                            this._panel.webview.postMessage({
                                type: 'verificationResult',
                                ...result
                            });
                        }).catch(error => { // Should not happen if _verifySettings handles its errors
                            vscode.window.showErrorMessage(`Unexpected error during verification: ${error.message}`);
                        });
                        break;
                    case 'executeCommand':
                        if (message.command) {
                            vscode.commands.executeCommand(message.command);
                        }
                        break;

                }
            },
            null,
            this._disposables
        );
    }

    public dispose() {
        EnvironmentEditorPanel.currentPanel = undefined;

        // Clean up resources
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    public update(environment?: MaximoEnvironment) {
        this._environment = environment;
        this._update();
    }

    private _update() {
        const webview = this._panel.webview;
        this._panel.title = this._environment
            ? `Edit Environment: ${this._environment.name}`
            : 'Add New Maximo Environment';
        webview.html = this._getHtmlForWebview();
    }

    private async _verifySettings(environmentData: MaximoEnvironment): Promise<{ success: boolean, message: string }> {
        try {
            const clientConfig: MaximoClientConfig = {
                baseUrl: environmentData.hostname,
                port: Number(environmentData.port),
                ssl: environmentData.httpProtocol === 'https',
                authType: convertAuthType(environmentData.authenticationType),
                userName: environmentData.username,
                password: environmentData.password,
                apiKey: environmentData.apikey,
                logLevel: getLogLevel(environmentData.logLevel),
                leanMode: true,
                autoAuthenticate: true,
                rejectUnauthorized: !environmentData.ignoreSslErrors,
                autoscriptObjectStructure: environmentData.objectStructure,
                ca: environmentData.sslcertificate ? environmentData.sslcertificate : undefined,
            };

            const client = new MaximoClient(clientConfig);
            // Attempt to get whoami info, which also implies successful authentication
            const whoamiResponse = await client.oslcInfoService.getWhoAmI();

            return {
                success: true,
                message: `Verification successful. Connected as: ${whoamiResponse.displayName || whoamiResponse.loginID}`
            };
        } catch (error: any) {
            let errorMessage = 'Verification failed.';
            if (error.message) {
                errorMessage = `Verification failed: ${error.message}`;
            }
            else if (error.code) {
                errorMessage = `Verification failed: ${error.code}`;
            }
            return { success: false, message: errorMessage };
        }
    }

    private _getHtmlForWebview(): string {
        const webview = this._panel.webview;
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'environmentEditor.js'));
    const codiconUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'codicons', 'codicon.css'));
        const nonce = this._nonce();
        const bootstrap = {
            mode: this._environment ? 'edit' : 'add',
            environment: this._environment || null
        };
        const bootstrapStr = JSON.stringify(bootstrap).replace(/</g, '\\u003c');
        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https: data:; style-src ${webview.cspSource} 'unsafe-inline'; font-src ${webview.cspSource}; script-src 'nonce-${nonce}';" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link id="vscode-codicon-stylesheet" href="${codiconUri}" rel="stylesheet" />
  <title>${this._environment ? 'Edit Environment' : 'Add Environment'}</title>
  <style>
    body { font-family: var(--vscode-font-family); color: var(--vscode-foreground); background: var(--vscode-editor-background); padding: 0 12px 24px; }
    #root { max-width: 960px; margin: 0 auto; }
    button { background: var(--vscode-button-background); color: var(--vscode-button-foreground); border:none; padding:6px 12px; border-radius:4px; cursor:pointer; }
    button:hover { background: var(--vscode-button-hoverBackground); }
  </style>
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}">window.__ENV_EDITOR_BOOTSTRAP__ = ${bootstrapStr};</script>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
    }
    
    private _nonce(): string {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}