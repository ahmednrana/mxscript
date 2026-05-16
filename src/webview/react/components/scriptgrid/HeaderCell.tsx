import React from 'react';
import { VscodeIcon } from '@vscode-elements/react-elements';
import type { Grid } from '@1771technologies/lytenyte-core';
import { FilterDropdown } from '../common/FilterDropdown';
import type { GridSpec } from './types';

/**
 * Header renderer: multi-column sorting (Shift+Click adds a column to the sort)
 * plus a reusable per-column filter dropdown.
 */
export function HeaderCell({ column, api }: Grid.T.HeaderParams<GridSpec>) {
    const sortModel = api.sortModel.useValue();
    const filterModel = api.filterModel.useValue();
    const label = column.name ?? column.id;

    const sortIndex = sortModel.findIndex((s) => s.id === column.id);
    const sortEntry = sortIndex >= 0 ? sortModel[sortIndex] : undefined;

    const toggleSort = (shiftKey: boolean) => {
        api.sortModel.set((prev) => {
            const cur = prev.find((s) => s.id === column.id);
            let nextEntry: { id: string; desc: boolean } | null;
            if (!cur) nextEntry = { id: column.id, desc: false };
            else if (!cur.desc) nextEntry = { id: column.id, desc: true };
            else nextEntry = null;

            if (shiftKey) {
                const without = prev.filter((s) => s.id !== column.id);
                return nextEntry ? [...without, nextEntry] : without;
            }
            return nextEntry ? [nextEntry] : [];
        });
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: '100%', padding: '0 8px' }}>
            <div
                onClick={(e) => toggleSort(e.shiftKey)}
                title="Click to sort, Shift+Click to add to multi-sort"
                style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontWeight: 600, flex: 1, overflow: 'hidden' }}
            >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
                {sortEntry && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 1, color: 'var(--vscode-focusBorder)' }}>
                        <VscodeIcon {...{ name: sortEntry.desc ? 'arrow-down' : 'arrow-up', style: { fontSize: 12 } } as any} />
                        {sortModel.length > 1 && <span style={{ fontSize: '0.8em' }}>{sortIndex + 1}</span>}
                    </span>
                )}
            </div>

            <FilterDropdown
                label={label}
                distinctValues={api.distinctValues[column.id] ?? []}
                value={filterModel[column.id] ?? null}
                onChange={(next) =>
                    api.filterModel.set((prev) => {
                        const model = { ...prev };
                        if (next) model[column.id] = next;
                        else delete model[column.id];
                        return model;
                    })
                }
            />
        </div>
    );
}
