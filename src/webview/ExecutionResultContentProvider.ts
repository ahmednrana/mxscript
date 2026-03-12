import * as vscode from 'vscode';

export class ExecutionResultContentProvider implements vscode.TextDocumentContentProvider, vscode.Disposable {
    private readonly emitter = new vscode.EventEmitter<vscode.Uri>();
    private readonly contentMap = new Map<string, string>();
    private readonly uriMap = new Map<string, vscode.Uri>();

    readonly onDidChange = this.emitter.event;

    provideTextDocumentContent(uri: vscode.Uri): string {
        const id = this.getId(uri);
        return this.contentMap.get(id) ?? '';
    }

    updateContent(id: string, title: string, content: string): vscode.Uri {
        const uri = this.getOrCreateUri(id, title);
        this.contentMap.set(id, content);
        this.emitter.fire(uri);
        return uri;
    }

    dispose(): void {
        this.emitter.dispose();
        this.contentMap.clear();
        this.uriMap.clear();
    }

    private getId(uri: vscode.Uri): string {
        const params = new URLSearchParams(uri.query);
        return params.get('id') ?? '';
    }

    private getOrCreateUri(id: string, title: string): vscode.Uri {
        if (this.uriMap.has(id)) {
            return this.uriMap.get(id)!;
        }

        const safeTitle = title.replace(/[\\/]/g, '-');
        const uri = vscode.Uri.from({
            scheme: 'mxscript-execute',
            path: `/${safeTitle}`,
            query: `id=${encodeURIComponent(id)}`
        });

        this.uriMap.set(id, uri);
        return uri;
    }
}
