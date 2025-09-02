import * as vscode from 'vscode';

export class PlaygroundPanel {
  public static currentPanel: PlaygroundPanel | undefined;
  public static readonly viewType = 'mxscript.playgroundPanel';
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor?.viewColumn;

    // If we already have a panel, show it.
    if (PlaygroundPanel.currentPanel) {
      PlaygroundPanel.currentPanel._panel.reveal(column);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      PlaygroundPanel.viewType,
      'MxScript React Playground',
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [extensionUri]
      }
    );

    PlaygroundPanel.currentPanel = new PlaygroundPanel(panel, extensionUri);
  }

  private constructor(private _panelRef: vscode.WebviewPanel, private readonly _extensionUri: vscode.Uri) {
    this._panel = _panelRef;
    this._panel.webview.html = this._getHtml(this._panel.webview);

    this._panel.webview.onDidReceiveMessage(msg => {
      if (msg?.type === 'ping') {
        vscode.window.showInformationMessage(`[Playground] Received ping with count = ${msg.count}`);
        this._panel.webview.postMessage({ type: 'pong', received: msg.count, ts: Date.now() });
      }
    }, null, this._disposables);

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  public dispose() {
    PlaygroundPanel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const d = this._disposables.pop();
      try { d?.dispose(); } catch {}
    }
  }

  private _getHtml(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'playground.js'));
    const nonce = this._nonce();
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https: data:; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MxScript Playground</title>
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
  }

  private _nonce(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
    for (let i = 0; i < 32; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return text;
  }
}
