import React from 'react';
import { VscodeIcon } from '@vscode-elements/react-elements';
import type { Grid } from '@1771technologies/lytenyte-core';
import type { GridSpec } from './types';

/**
 * Marker-column cell: a chevron that toggles the master-detail panel
 * (Maximo-style row expansion).
 */
export function ExpandCell({ row, api, detailExpanded }: Grid.T.CellRendererParams<GridSpec>) {
    if (!api.rowIsLeaf(row)) {
        return null;
    }
    return (
        <button
            title={detailExpanded ? 'Collapse details' : 'Expand details'}
            onClick={(e) => {
                e.stopPropagation();
                api.rowDetailToggle(row.id);
            }}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--vscode-foreground)'
            }}
        >
            <VscodeIcon {...{ name: detailExpanded ? 'chevron-down' : 'chevron-right' } as any} />
        </button>
    );
}
