import React from 'react';
import { VscodeIcon } from '@vscode-elements/react-elements';
import type { Grid } from '@1771technologies/lytenyte-core';
import { getVsCodeApi } from '../../boot/vscode';
import type { GridSpec } from './types';

const vscode = getVsCodeApi();

const iconButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: 4,
    cursor: 'pointer',
    color: 'var(--vscode-foreground)'
};

/** In-row action buttons: Run a script, or open the Lookup picker. */
export function ActionsCell({ row, api }: Grid.T.CellRendererParams<GridSpec>) {
    if (!api.rowIsLeaf(row)) {
        return null;
    }
    const script = row.data;
    const readOnly = script.isReadOnly;

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: '100%' }}>
            <button
                title={`Run ${script.name}`}
                style={iconButtonStyle}
                onClick={(e) => {
                    e.stopPropagation();
                    vscode?.postMessage({ type: 'runScript', script });
                }}
            >
                <VscodeIcon {...{ name: 'play' } as any} />
            </button>
            <button
                title={readOnly ? 'Lookup disabled for read-only rows' : 'Lookup language value'}
                disabled={readOnly}
                style={{ ...iconButtonStyle, opacity: readOnly ? 0.4 : 1, cursor: readOnly ? 'default' : 'pointer' }}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!readOnly) {
                        api.openLookup(row.id);
                    }
                }}
            >
                <VscodeIcon {...{ name: 'search' } as any} />
            </button>
        </div>
    );
}
