import React, { useMemo, useState } from 'react';
import { VscodeIcon } from '@vscode-elements/react-elements';

/* ------------------------------------------------------------------ *
 * Reusable column manager side panel.
 *
 * Grid-agnostic: the host supplies a flat list of columns and three
 * callbacks. Works with any table that exposes column id / name /
 * visibility and can accept a new column order.
 *
 *   <ColumnManagerPanel
 *      columns={items}
 *      onToggle={(id, hidden) => ...}
 *      onReorder={(orderedIds) => ...}
 *      onClose={() => ...}
 *   />
 * ------------------------------------------------------------------ */

export interface ColumnItem {
    id: string;
    name: string;
    hidden: boolean;
}

interface ColumnManagerPanelProps {
    columns: ColumnItem[];
    onToggle: (id: string, hidden: boolean) => void;
    /** Receives the full column id list in the new display order. */
    onReorder: (orderedIds: string[]) => void;
    onClose?: () => void;
}

export function ColumnManagerPanel({ columns, onToggle, onReorder, onClose }: ColumnManagerPanelProps) {
    const [search, setSearch] = useState('');
    const [dragId, setDragId] = useState<string | null>(null);
    const [overId, setOverId] = useState<string | null>(null);

    const filtered = useMemo(() => {
        const s = search.trim().toLowerCase();
        return s ? columns.filter((c) => c.name.toLowerCase().includes(s)) : columns;
    }, [columns, search]);

    const moveColumn = (fromId: string, toId: string) => {
        if (fromId === toId) return;
        const ids = columns.map((c) => c.id);
        const from = ids.indexOf(fromId);
        const to = ids.indexOf(toId);
        if (from < 0 || to < 0) return;
        ids.splice(from, 1);
        ids.splice(to, 0, fromId);
        onReorder(ids);
    };

    const visibleCount = columns.filter((c) => !c.hidden).length;

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 10px',
                    borderBottom: '1px solid var(--vscode-panel-border)'
                }}
            >
                <strong style={{ flex: 1 }}>Columns</strong>
                <span style={{ color: 'var(--vscode-descriptionForeground)', fontSize: '0.85em' }}>
                    {visibleCount}/{columns.length}
                </span>
                {onClose && (
                    <button onClick={onClose} title="Close" style={iconButton}>
                        <VscodeIcon {...{ name: 'close' } as any} />
                    </button>
                )}
            </div>

            <div style={{ padding: 8 }}>
                <input
                    style={searchField}
                    placeholder="Search columns..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0 6px 8px' }}>
                {filtered.map((col) => (
                    <div
                        key={col.id}
                        draggable
                        onDragStart={() => setDragId(col.id)}
                        onDragEnd={() => {
                            setDragId(null);
                            setOverId(null);
                        }}
                        onDragOver={(e) => {
                            e.preventDefault();
                            if (overId !== col.id) setOverId(col.id);
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            if (dragId) moveColumn(dragId, col.id);
                            setDragId(null);
                            setOverId(null);
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '5px 6px',
                            borderRadius: 4,
                            cursor: 'grab',
                            opacity: dragId === col.id ? 0.4 : 1,
                            borderTop:
                                overId === col.id && dragId && dragId !== col.id
                                    ? '2px solid var(--vscode-focusBorder)'
                                    : '2px solid transparent',
                            background:
                                dragId === col.id ? 'var(--vscode-list-activeSelectionBackground)' : 'transparent'
                        }}
                    >
                        <VscodeIcon
                            {...{ name: 'gripper', style: { color: 'var(--vscode-descriptionForeground)' } } as any}
                        />
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={!col.hidden}
                                onChange={(e) => onToggle(col.id, !e.target.checked)}
                            />
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {col.name}
                            </span>
                        </label>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div style={{ padding: 8, color: 'var(--vscode-descriptionForeground)', fontSize: 12 }}>
                        No columns match.
                    </div>
                )}
            </div>
        </div>
    );
}

const iconButton: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 22,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--vscode-foreground)'
};

const searchField: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    background: 'var(--vscode-input-background)',
    color: 'var(--vscode-input-foreground)',
    border: '1px solid var(--vscode-input-border, var(--vscode-panel-border))',
    borderRadius: 3,
    font: 'inherit',
    fontSize: 12,
    padding: '4px 6px',
    outline: 'none'
};
