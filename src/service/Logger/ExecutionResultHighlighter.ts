import * as vscode from 'vscode';
import { ExecutionResultContentProvider } from '../../webview/ExecutionResultContentProvider';

interface SeverityDecoration {
    test: (line: string) => boolean;
    decoration: vscode.TextEditorDecorationType;
}

/**
 * Applies color decorations to execution result documents (scheme: `mxscript-execute`).
 *
 * Decoration rules:
 * - ERROR / FATAL / Exception / Traceback / Error: → red left border
 * - WARN / WARNING                                 → orange left border
 * - INFO / print output (plain lines)              → subtle green left border
 * - JSON key-value lines  (`"key":`)               → subtle blue left border
 * - Section headers (lines starting with `---`)    → grey background
 */
export class ExecutionResultHighlighter implements vscode.Disposable {
    private readonly disposables: vscode.Disposable[] = [];
    private readonly severityDecorations: SeverityDecoration[];

    constructor(private readonly provider: ExecutionResultContentProvider) {
        this.severityDecorations = [
            // Errors
            {
                test: (line: string) =>
                    /\b(ERROR|FATAL|Exception|Traceback|Error:)\b/.test(line),
                decoration: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    backgroundColor: 'rgba(255, 99, 71, 0.18)',
                    borderColor: new vscode.ThemeColor('charts.red'),
                    borderStyle: 'solid',
                    borderWidth: '0 0 0 3px'
                })
            },
            // Warnings
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
            // Info
            {
                test: (line: string) => /\bINFO\b/.test(line),
                decoration: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    backgroundColor: 'rgba(76, 175, 80, 0.10)',
                    borderColor: new vscode.ThemeColor('charts.green'),
                    borderStyle: 'solid',
                    borderWidth: '0 0 0 2px'
                })
            },
            // Debug
            {
                test: (line: string) => /\bDEBUG\b/.test(line),
                decoration: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    backgroundColor: 'rgba(96, 125, 139, 0.10)',
                    borderColor: new vscode.ThemeColor('charts.blue'),
                    borderStyle: 'solid',
                    borderWidth: '0 0 0 2px'
                })
            },
            // Trace
            {
                test: (line: string) => /\bTRACE\b/.test(line),
                decoration: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    backgroundColor: 'rgba(128, 128, 128, 0.10)',
                    borderColor: new vscode.ThemeColor('charts.purple'),
                    borderStyle: 'solid',
                    borderWidth: '0 0 0 2px'
                })
            },
            // JSON key-value lines: lines like   "someKey": value
            {
                test: (line: string) => /^\s*"[^"]+"\s*:/.test(line),
                decoration: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    borderColor: new vscode.ThemeColor('charts.blue'),
                    borderStyle: 'solid',
                    borderWidth: '0 0 0 2px'
                })
            },
            // Section headers: lines starting with ---
            {
                test: (line: string) => /^---/.test(line.trim()),
                decoration: vscode.window.createTextEditorDecorationType({
                    isWholeLine: true,
                    backgroundColor: 'rgba(128, 128, 128, 0.12)',
                    fontStyle: 'italic'
                })
            }
        ];

        this.disposables.push(
            vscode.window.onDidChangeActiveTextEditor(editor => this.updateEditor(editor)),
            // Also fires when a tab opens beside the current editor (preserveFocus: true),
            // which does NOT trigger onDidChangeActiveTextEditor.
            vscode.window.onDidChangeVisibleTextEditors(editors =>
                editors.forEach(editor => this.updateEditor(editor))
            ),
            vscode.workspace.onDidOpenTextDocument(document => this.updateDocument(document)),
            vscode.workspace.onDidChangeTextDocument(event => this.updateDocument(event.document)),
            this.provider.onDidChange(uri => this.updateEditorsForUri(uri))
        );

        this.applyToVisibleEditors();
    }

    dispose(): void {
        this.disposables.forEach(d => d.dispose());
        this.severityDecorations.forEach(({ decoration }) => decoration.dispose());
    }

    private updateDocument(document: vscode.TextDocument): void {
        if (document.uri.scheme !== 'mxscript-execute') {
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
        if (!editor || editor.document.uri.scheme !== 'mxscript-execute') {
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
