import * as vscode from 'vscode';
export class EnvironmentLogContentProvider implements vscode.TextDocumentContentProvider, vscode.Disposable {
    private readonly emitter = new vscode.EventEmitter<vscode.Uri>();
    private readonly contentByEnvironment = new Map<string, string>();
    private readonly uriByEnvironment = new Map<string, vscode.Uri>();

    readonly onDidChange = this.emitter.event;

    provideTextDocumentContent(uri: vscode.Uri): string {
        const envId = this.getEnvironmentId(uri);
        return this.contentByEnvironment.get(envId) ?? '';
    }

    updateContent(environmentId: string, environmentName: string, content: string): vscode.Uri {
        const uri = this.getOrCreateUri(environmentId, environmentName);
        this.contentByEnvironment.set(environmentId, content);
        this.emitter.fire(uri);
        return uri;
    }

    dispose(): void {
        this.emitter.dispose();
        this.contentByEnvironment.clear();
        this.uriByEnvironment.clear();
    }

    private getEnvironmentId(uri: vscode.Uri): string {
        const params = new URLSearchParams(uri.query);
        return params.get('id') ?? '';
    }

    private getOrCreateUri(environmentId: string, environmentName: string): vscode.Uri {
        if (this.uriByEnvironment.has(environmentId)) {
            return this.uriByEnvironment.get(environmentId)!;
        }

        const safeTitle = `${environmentName} log`.replace(/[\\/]/g, '-');
        const uri = vscode.Uri.from({
            scheme: 'mxscript-log',
            path: `/${safeTitle}`,
            query: `id=${encodeURIComponent(environmentId)}`
        });

        this.uriByEnvironment.set(environmentId, uri);
        return uri;
    }
}
