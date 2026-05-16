import * as vscode from 'vscode';
import * as path from 'path';

/**
 * Webview panel hosting the reusable LyteNyte Grid for Maximo tabular data.
 * Currently used for the automation script grid; future Maximo views can reuse
 * the same bundle by passing a different `page` in the bootstrap payload.
 */
export class ScriptGridWebview {
    private static _panel: vscode.WebviewPanel | undefined;

    public static show(context: vscode.ExtensionContext) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (ScriptGridWebview._panel) {
            ScriptGridWebview._panel.reveal(column);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'mxscript.scriptGrid',
            'Maximo Script Grid',
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
                localResourceRoots: [
                    vscode.Uri.file(path.join(context.extensionPath, 'media'))
                ]
            }
        );

        ScriptGridWebview._panel = panel;
        panel.webview.html = ScriptGridWebview._getHtml(panel.webview, context);

        panel.onDidDispose(() => {
            ScriptGridWebview._panel = undefined;
        }, null, context.subscriptions);

        panel.webview.onDidReceiveMessage(
            async (message) => {
                switch (message.type) {
                    case 'ready':
                        break;
                    case 'runScript':
                        vscode.window.showInformationMessage(
                            `Running Maximo script: ${message.script?.name ?? message.script?.id ?? 'unknown'}`
                        );
                        break;
                    case 'exportData':
                        await ScriptGridWebview._handleExport(message);
                        break;
                }
            },
            undefined,
            context.subscriptions
        );
    }

    private static async _handleExport(message: { content?: string; format?: string; filename?: string }) {
        const content = message.content ?? '';
        const ext = message.format === 'json' ? 'json' : 'csv';
        const defaultName = message.filename || `maximo-scripts.${ext}`;

        const uri = await vscode.window.showSaveDialog({
            defaultUri: vscode.Uri.file(defaultName),
            filters: ext === 'json' ? { JSON: ['json'] } : { CSV: ['csv'] }
        });
        if (!uri) {
            return;
        }
        await vscode.workspace.fs.writeFile(uri, Buffer.from(content, 'utf8'));
        vscode.window.showInformationMessage(`Exported grid to ${uri.fsPath}`);
    }

    private static _getHtml(webview: vscode.Webview, context: vscode.ExtensionContext): string {
        const scriptUri = webview.asWebviewUri(
            vscode.Uri.file(path.join(context.extensionPath, 'media', 'scriptGrid.js'))
        );
        const styleUri = webview.asWebviewUri(
            vscode.Uri.file(path.join(context.extensionPath, 'media', 'scriptGrid.css'))
        );
        const codiconUri = webview.asWebviewUri(
            vscode.Uri.file(path.join(context.extensionPath, 'media', 'codicons', 'codicon.css'))
        );

        const nonce = ScriptGridWebview._getNonce();

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https: data:; style-src ${webview.cspSource} 'unsafe-inline'; font-src ${webview.cspSource}; script-src 'nonce-${nonce}';" />
            <link id="vscode-codicon-stylesheet" href="${codiconUri}" rel="stylesheet" />
            <link href="${styleUri}" rel="stylesheet" />
            <title>Maximo Script Grid</title>
            <style>
                body { padding: 0; margin: 0; height: 100vh; overflow: hidden; background: var(--vscode-editor-background); color: var(--vscode-foreground); font-family: var(--vscode-font-family); }
                #root { height: 100%; }
            </style>
        </head>
        <body>
            <div id="root"></div>
            <script nonce="${nonce}">
                window.__BOOTSTRAP_DATA__ = { page: 'maximo-script-grid' };
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
