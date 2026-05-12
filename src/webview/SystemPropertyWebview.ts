import * as vscode from 'vscode';
import * as path from 'path';

export class SystemPropertyWebview {
    private static _panel: vscode.WebviewPanel | undefined;

    public static show(
        context: vscode.ExtensionContext, 
        properties: Record<string, string>, 
        envName: string,
        onPush?: (changes: Record<string, string>) => Promise<void>,
        onLiveRefresh?: (key: string) => Promise<void>,
        onCompare?: () => Promise<void>,
        onExportProperties?: (properties: Record<string, string | null>) => Promise<void>
    ) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (SystemPropertyWebview._panel) {
            SystemPropertyWebview._panel.reveal(column);
            SystemPropertyWebview._sendProperties(properties, envName);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'mxscript.systemPropertyViewer',
            `System Properties: ${envName}`,
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
                localResourceRoots: [
                    vscode.Uri.file(path.join(context.extensionPath, 'media'))
                ]
            }
        );

        SystemPropertyWebview._panel = panel;
        panel.webview.html = SystemPropertyWebview._getHtml(panel.webview, context);

        panel.onDidDispose(() => {
            SystemPropertyWebview._panel = undefined;
        }, null, context.subscriptions);

        panel.webview.onDidReceiveMessage(
            async (message) => {
                switch (message.type) {
                    case 'ready':
                        SystemPropertyWebview._sendProperties(properties, envName);
                        break;
                    case 'copyToClipboard':
                        await vscode.env.clipboard.writeText(message.text);
                        // vscode.window.showInformationMessage('Copied to clipboard'); // Optional: can be annoying
                        break;
                    case 'pushChanges':
                        if (onPush) {
                            try {
                                await onPush(message.changes);
                                panel.webview.postMessage({ type: 'pushResult', success: true });
                            } catch (err) {
                                panel.webview.postMessage({ type: 'pushResult', success: false });
                            }
                        }
                        break;
                    case 'liveRefresh':
                        if (onLiveRefresh) {
                            await onLiveRefresh(message.key);
                        }
                        break;
                    case 'requestCompare':
                        if (onCompare) {
                            await onCompare();
                        }
                        break;
                    case 'exportProperties':
                        if (onExportProperties) {
                            await onExportProperties(message.properties);
                        }
                        break;
                }
            },
            undefined,
            context.subscriptions
        );
    }

    public static sendComparison(properties: Record<string, string>, envName: string) {
        if (SystemPropertyWebview._panel) {
            SystemPropertyWebview._panel.webview.postMessage({
                type: 'setComparison',
                properties,
                envName
            });
        }
    }

    private static _sendProperties(properties: Record<string, string>, envName: string) {
        SystemPropertyWebview._panel?.webview.postMessage({
            type: 'setProperties',
            properties,
            envName
        });
    }

    private static _getHtml(webview: vscode.Webview, context: vscode.ExtensionContext): string {
        const scriptUri = webview.asWebviewUri(
            vscode.Uri.file(path.join(context.extensionPath, 'media', 'environmentEditor.js'))
        );
        const codiconUri = webview.asWebviewUri(
            vscode.Uri.file(path.join(context.extensionPath, 'media', 'codicons', 'codicon.css'))
        );

        const nonce = SystemPropertyWebview._getNonce();

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https: data:; style-src ${webview.cspSource} 'unsafe-inline'; font-src ${webview.cspSource}; script-src 'nonce-${nonce}';" />
            <link id="vscode-codicon-stylesheet" href="${codiconUri}" rel="stylesheet" />
            <title>System Properties</title>
            <style>
                body { padding: 0; margin: 0; height: 100vh; overflow: hidden; background: var(--vscode-editor-background); color: var(--vscode-foreground); font-family: var(--vscode-font-family); }
                #root { height: 100%; }
            </style>
        </head>
        <body>
            <div id="root"></div>
            <script nonce="${nonce}">
                window.__BOOTSTRAP_DATA__ = {
                    page: 'system-properties'
                };
            </script>
            <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
        </html>`;
    }

    private static _getNonce(): string {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
