import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { MaximoClient, MaximoClientConfig } from 'maximo-api-client';
import { convertAuthType, getLogLevel } from '../utils/utils';

export class PlaygroundPanel {
  public static currentPanel: PlaygroundPanel | undefined;
  public static readonly viewType = 'mxscript.playgroundPanel';
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];
  private _watcher: fs.FSWatcher | undefined;

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
      // Simple ping/pong
      if (msg?.type === 'ping') {
        vscode.window.showInformationMessage(`[Playground] Received ping with count = ${msg.count}`);
        this._panel.webview.postMessage({ type: 'pong', received: msg.count, ts: Date.now() });
        return;
      }

      // Handle request/response pattern: messages with id should be replied to with same id
      if (msg?.type === 'requestAuth' && msg.id) {
        // In a real implementation you'd perform secure auth; here we return a mock token
        const token = `mock-token-${Date.now()}`;
        this._panel.webview.postMessage({ type: 'response', id: msg.id, payload: { token } });
        return;
      }

      if (msg?.type === 'verifySettings' && msg.id && msg.payload) {
        // Payload expected to be environment data similar to EnvironmentEditorPanel
        (async () => {
          try {
            const env = msg.payload;
            const clientConfig: MaximoClientConfig = {
              baseUrl: env.hostname,
              port: Number(env.port) || 443,
              ssl: env.httpProtocol === 'https',
              authType: convertAuthType(env.authenticationType),
              userName: env.username,
              password: env.password,
              apiKey: env.apikey,
              logLevel: getLogLevel(env.logLevel),
              leanMode: true,
              autoAuthenticate: true,
              rejectUnauthorized: !env.ignoreSslErrors,
              autoscriptObjectStructure: env.objectStructure,
              ca: env.sslcertificate ? env.sslcertificate : undefined,
            };

            const client = new MaximoClient(clientConfig);
            const whoami = await client.oslcInfoService.getWhoAmI();
            const message = `Verification successful. Connected as: ${whoami.displayName || whoami.loginID}`;
            this._panel.webview.postMessage({ type: 'response', id: msg.id, payload: { success: true, message } });
          } catch (err:any) {
            const message = err?.message || err?.code || 'Verification failed.';
            this._panel.webview.postMessage({ type: 'response', id: msg.id, payload: { success: false, message } });
          }
        })();
        return;
      }
    }, null, this._disposables);

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Watch the built playground bundle and notify the webview to reload when it changes.
    try {
      const scriptPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'playground.js').fsPath;
      if (fs.existsSync(scriptPath)) {
        this._watcher = fs.watch(scriptPath, { persistent: false }, (eventType) => {
          if (eventType === 'change' || eventType === 'rename') {
            try {
              this._panel.webview.postMessage({ type: 'reload' });
            } catch (err) {
              // ignore
            }
          }
        });
      }
    } catch (err) {
      // ignore watcher errors in environments where fs.watch may not be available
    }
  }

  public dispose() {
    PlaygroundPanel.currentPanel = undefined;
    this._panel.dispose();
    if (this._watcher) {
      try { this._watcher.close(); } catch {}
      this._watcher = undefined;
    }
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
  <script nonce="${nonce}">
    // Listen for reload messages from the extension and reload the webview when the bundle changes
    window.addEventListener('message', event => {
      try {
        const msg = event.data;
        if (msg && msg.type === 'reload') {
          // Reload to pick up the rebuilt bundle
          location.reload();
        }
      } catch (e) {}
    });
  </script>
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
