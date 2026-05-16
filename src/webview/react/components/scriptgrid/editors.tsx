import React from 'react';
import type { Grid } from '@1771technologies/lytenyte-core';
import type { GridSpec } from './types';

const editorStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    border: '1px solid var(--vscode-focusBorder)',
    background: 'var(--vscode-input-background)',
    color: 'var(--vscode-input-foreground)',
    font: 'inherit',
    padding: '0 8px',
    outline: 'none'
};

/** Plain text editor for the Name column. */
export function NameEditor({ editValue, changeValue }: Grid.T.EditParams<GridSpec>) {
    return (
        <input
            autoFocus
            style={editorStyle}
            value={typeof editValue === 'string' ? editValue : ''}
            onChange={(e) => changeValue(e.target.value)}
        />
    );
}

/** Dropdown editor for the Status column (Active / Inactive / Draft). */
export function StatusEditor({ editValue, changeValue }: Grid.T.EditParams<GridSpec>) {
    return (
        <select
            autoFocus
            style={editorStyle}
            value={typeof editValue === 'string' ? editValue : 'Draft'}
            onChange={(e) => changeValue(e.target.value)}
        >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Draft">Draft</option>
        </select>
    );
}

/**
 * Date picker editor for the Due Date column. Uncontrolled (defaultValue) so the
 * native input does not jump while the user types an intermediate date.
 */
export function DateEditor({ editValue, changeValue }: Grid.T.EditParams<GridSpec>) {
    return (
        <input
            autoFocus
            type="date"
            style={editorStyle}
            defaultValue={typeof editValue === 'string' ? editValue : ''}
            onChange={(e) => {
                if (e.target.value) {
                    changeValue(e.target.value);
                }
            }}
        />
    );
}
