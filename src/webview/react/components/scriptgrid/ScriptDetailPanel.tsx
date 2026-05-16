import React from 'react';
import type { Grid } from '@1771technologies/lytenyte-core';
import type { GridSpec } from './types';

const th: React.CSSProperties = {
    textAlign: 'left',
    padding: '4px 10px',
    borderBottom: '1px solid var(--vscode-panel-border)',
    color: 'var(--vscode-descriptionForeground)',
    fontWeight: 600
};
const td: React.CSSProperties = {
    padding: '4px 10px',
    borderBottom: '1px solid var(--vscode-panel-border)'
};

/** Master-detail panel: shows the sub-tasks belonging to a Maximo script row. */
export function ScriptDetailPanel({ row, api }: Grid.T.RowParams<GridSpec>) {
    if (!api.rowIsLeaf(row)) {
        return null;
    }
    const script = row.data;

    return (
        <div
            style={{
                height: '100%',
                boxSizing: 'border-box',
                padding: 12,
                overflow: 'auto',
                background: 'var(--vscode-editorWidget-background)',
                borderTop: '1px solid var(--vscode-panel-border)'
            }}
        >
            <div style={{ marginBottom: 8 }}>
                <strong>{script.name}</strong>
                <span style={{ marginLeft: 8, color: 'var(--vscode-descriptionForeground)' }}>
                    {script.description}
                </span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={th}>Sub-Task ID</th>
                        <th style={th}>Name</th>
                        <th style={th}>Status</th>
                        <th style={th}>Owner</th>
                    </tr>
                </thead>
                <tbody>
                    {script.subTasks.map((t) => (
                        <tr key={t.id}>
                            <td style={td}>{t.id}</td>
                            <td style={td}>{t.name}</td>
                            <td style={td}>{t.status}</td>
                            <td style={td}>{t.owner}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
