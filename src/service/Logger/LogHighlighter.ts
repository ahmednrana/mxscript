import * as vscode from 'vscode';
import { EnvironmentLogContentProvider } from '../../webview/EnvironmentLogContentProvider';

interface SeverityDecoration {
    test: (line: string) => boolean;
    decoration: vscode.TextEditorDecorationType;
}

export class EnvironmentLogHighlighter implements vscode.Disposable {
    private readonly disposables: vscode.Disposable[] = [];
    private readonly severityDecorations: SeverityDecoration[];

    constructor(private readonly provider: EnvironmentLogContentProvider) {
        this.severityDecorations = [
            {
                test: (line: string) => /\b(ERROR|FATAL)\b/.test(line),
                decoration: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    backgroundColor: 'rgba(255, 99, 71, 0.18)',
                    borderColor: new vscode.ThemeColor('charts.red'),
                    borderStyle: 'solid',
                    borderWidth: '0 0 0 3px'
                })
            },
            {
                test: (line: string) => /\b(SystemErr)\b/.test(line),
                decoration: vscode.window.createTextEditorDecorationType({
                    // isWholeLine: true,
                    // backgroundColor: 'rgba(255, 99, 71, 0.18)',
                    // borderColor: new vscode.ThemeColor('charts.red'),
                    borderStyle: 'solid',
                    borderWidth: '0 0 0 3px'
                })
            },
            {
                test: (line: string) => /\bWARN(ING)?\b/.test(line),
                decoration: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    backgroundColor: 'rgba(255, 196, 87, 0.18)',
                    borderColor: new vscode.ThemeColor('charts.orange'),
                    borderStyle: 'solid',
                    borderWidth: '0 0 0 3px'
                })
            },
            {
                test: (line: string) => /\bINFO\b/.test(line),
                decoration: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    backgroundColor: 'rgba(76, 175, 80, 0.12)',
                    borderColor: new vscode.ThemeColor('charts.green'),
                    borderStyle: 'solid',
                    borderWidth: '0 0 0 2px'
                })
            },
            {
                test: (line: string) => /\b(DEBUG|TRACE)\b/.test(line),
                decoration: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    backgroundColor: 'rgba(96, 125, 139, 0.12)',
                    borderColor: new vscode.ThemeColor('charts.blue'),
                    borderStyle: 'solid',
                    borderWidth: '0 0 0 2px'
                })
            }
        ];

        this.disposables.push(
            vscode.window.onDidChangeActiveTextEditor(editor => this.updateEditor(editor)),
            vscode.workspace.onDidOpenTextDocument(document => this.updateDocument(document)),
            vscode.workspace.onDidChangeTextDocument(event => this.updateDocument(event.document)),
            this.provider.onDidChange(uri => this.updateEditorsForUri(uri))
        );

        this.applyToVisibleEditors();
    }

    dispose(): void {
        this.disposables.forEach(disposable => disposable.dispose());
        this.severityDecorations.forEach(({ decoration }) => decoration.dispose());
    }

    private updateDocument(document: vscode.TextDocument): void {
        if (document.uri.scheme !== 'mxscript-log') {
            return;
        }

        this.updateEditorsForDocument(document);
    }

    private updateEditorsForUri(uri: vscode.Uri): void {
        vscode.window.visibleTextEditors
            .filter(editor => editor.document.uri.toString() === uri.toString())
            .forEach(editor => this.applyDecorations(editor));
    }

    private updateEditorsForDocument(document: vscode.TextDocument): void {
        vscode.window.visibleTextEditors
            .filter(editor => editor.document === document)
            .forEach(editor => this.applyDecorations(editor));
    }

    private updateEditor(editor: vscode.TextEditor | undefined): void {
        if (!editor || editor.document.uri.scheme !== 'mxscript-log') {
            return;
        }

        this.applyDecorations(editor);
    }

    private applyToVisibleEditors(): void {
        vscode.window.visibleTextEditors.forEach(editor => this.updateEditor(editor));
    }

    private applyDecorations(editor: vscode.TextEditor): void {
        const text = editor.document.getText();
        const lines = text.split(/\r?\n/);

        this.severityDecorations.forEach(({ test, decoration }) => {
            const ranges: vscode.DecorationOptions[] = [];

            lines.forEach((line, index) => {
                if (!test(line)) {
                    return;
                }

                const range = new vscode.Range(index, 0, index, line.length);
                ranges.push({ range });
            });

            editor.setDecorations(decoration, ranges);
        });
    }
}
