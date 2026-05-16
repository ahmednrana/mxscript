import React, { useMemo, useRef, useState } from 'react';
import { VscodeButton, VscodeIcon } from '@vscode-elements/react-elements';
import { Popover } from './Popover';

/* ------------------------------------------------------------------ *
 * Reusable column filter dropdown.
 *
 * Drop it into any table/grid header — it is not tied to LyteNyte or to
 * any data model. The host only supplies four props:
 *
 *   <FilterDropdown
 *      label="Status"
 *      distinctValues={['Active','Inactive','Draft']}
 *      value={model['status'] ?? null}
 *      onChange={(next) => updateModel('status', next)}
 *   />
 *
 * Pair it with the exported `matchesFilter` helper to build row predicates,
 * and `getDistinctValues` to derive the checklist options from a dataset.
 * ------------------------------------------------------------------ */

export type FilterOperator = 'contains' | 'not_contains' | 'equals' | 'begins_with' | 'ends_with';

/** Serializable filter state for a single column. */
export interface ColumnFilterValue {
    operator: FilterOperator;
    query: string;
    /** Selected set values; `null` means "all values" (no set constraint). */
    selected: string[] | null;
}

const OPERATORS: { id: FilterOperator; label: string }[] = [
    { id: 'contains', label: 'Contains' },
    { id: 'not_contains', label: 'Does not contain' },
    { id: 'equals', label: 'Equals' },
    { id: 'begins_with', label: 'Begins with' },
    { id: 'ends_with', label: 'Ends with' }
];

export const EMPTY_FILTER: ColumnFilterValue = { operator: 'contains', query: '', selected: null };

/** True when the filter would actually exclude rows. */
export function isFilterActive(v: ColumnFilterValue | null | undefined): boolean {
    return !!v && (v.query.trim() !== '' || v.selected !== null);
}

/** Evaluates a single cell value against a column filter. */
export function matchesFilter(raw: unknown, f: ColumnFilterValue): boolean {
    const display = String(raw ?? '');
    if (f.selected !== null && !f.selected.includes(display)) return false;

    const q = f.query.trim().toLowerCase();
    if (q) {
        const cell = display.toLowerCase();
        switch (f.operator) {
            case 'contains': return cell.includes(q);
            case 'not_contains': return !cell.includes(q);
            case 'equals': return cell === q;
            case 'begins_with': return cell.startsWith(q);
            case 'ends_with': return cell.endsWith(q);
        }
    }
    return true;
}

/** Convenience: distinct, sorted string values of a dataset key. */
export function getDistinctValues<T>(rows: T[], key: keyof T): string[] {
    const set = new Set<string>();
    for (const row of rows) set.add(String(row[key]));
    return [...set].sort((a, b) => a.localeCompare(b));
}

interface FilterDropdownProps {
    label: string;
    distinctValues: string[];
    value: ColumnFilterValue | null;
    onChange: (next: ColumnFilterValue | null) => void;
}

/** Cap on rendered checkboxes — the search box narrows large value lists. */
const MAX_VISIBLE = 200;

const fieldStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    background: 'var(--vscode-input-background)',
    color: 'var(--vscode-input-foreground)',
    border: '1px solid var(--vscode-input-border, var(--vscode-panel-border))',
    borderRadius: 3,
    font: 'inherit',
    fontSize: 12,
    padding: '3px 6px',
    outline: 'none'
};

const labelStyle: React.CSSProperties = {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: 'var(--vscode-descriptionForeground)',
    marginBottom: 2
};

export function FilterDropdown({ label, distinctValues, value, onChange }: FilterDropdownProps) {
    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState<ColumnFilterValue>(value ?? EMPTY_FILTER);
    const [search, setSearch] = useState('');
    const btnRef = useRef<HTMLButtonElement>(null);

    const active = isFilterActive(value);

    const openPopover = () => {
        setDraft(value ?? EMPTY_FILTER);
        setSearch('');
        setOpen(true);
    };

    const selectedSet = useMemo(
        () => (draft.selected === null ? new Set(distinctValues) : new Set(draft.selected)),
        [draft.selected, distinctValues]
    );

    const visibleValues = useMemo(() => {
        const s = search.trim().toLowerCase();
        const filtered = s ? distinctValues.filter((v) => v.toLowerCase().includes(s)) : distinctValues;
        return filtered;
    }, [distinctValues, search]);

    const shown = visibleValues.slice(0, MAX_VISIBLE);

    const commitSelection = (next: Set<string>) => {
        setDraft((d) => ({
            ...d,
            selected: next.size === distinctValues.length ? null : [...next]
        }));
    };

    const toggleValue = (val: string) => {
        const next = new Set(selectedSet);
        if (next.has(val)) next.delete(val);
        else next.add(val);
        commitSelection(next);
    };

    const allVisibleChecked = shown.length > 0 && shown.every((v) => selectedSet.has(v));
    const toggleSelectAll = () => {
        const next = new Set(selectedSet);
        if (allVisibleChecked) shown.forEach((v) => next.delete(v));
        else shown.forEach((v) => next.add(v));
        commitSelection(next);
    };

    const apply = () => {
        onChange(isFilterActive(draft) ? draft : null);
        setOpen(false);
    };
    const clear = () => {
        setDraft(EMPTY_FILTER);
        onChange(null);
        setOpen(false);
    };

    return (
        <>
            <button
                ref={btnRef}
                title={`Filter ${label}`}
                onClick={(e) => {
                    e.stopPropagation();
                    open ? setOpen(false) : openPopover();
                }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 22,
                    height: 22,
                    flexShrink: 0,
                    borderRadius: 3,
                    cursor: 'pointer',
                    background: active ? 'var(--vscode-inputOption-activeBackground, transparent)' : 'transparent',
                    border: '1px solid transparent',
                    color: active ? 'var(--vscode-focusBorder)' : 'var(--vscode-foreground)'
                }}
            >
                <VscodeIcon {...{ name: 'filter', style: { fontSize: 14 } } as any} />
            </button>

            <Popover anchor={btnRef.current} open={open} onClose={() => setOpen(false)} width={270}>
                <div style={{ padding: 10 }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>{label}</div>

                    <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                        <div style={{ flex: 1 }}>
                            <div style={labelStyle}>Operator</div>
                            <select
                                style={fieldStyle}
                                value={draft.operator}
                                onChange={(e) => setDraft((d) => ({ ...d, operator: e.target.value as FilterOperator }))}
                            >
                                {OPERATORS.map((op) => (
                                    <option key={op.id} value={op.id}>{op.label}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={labelStyle}>Value</div>
                            <input
                                style={fieldStyle}
                                placeholder="Filter value..."
                                value={draft.query}
                                onChange={(e) => setDraft((d) => ({ ...d, query: e.target.value }))}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') apply();
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--vscode-panel-border)', paddingTop: 8 }}>
                        <input
                            style={{ ...fieldStyle, marginBottom: 6 }}
                            placeholder="Search values..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div
                            style={{
                                maxHeight: 170,
                                overflowY: 'auto',
                                border: '1px solid var(--vscode-panel-border)',
                                borderRadius: 3
                            }}
                        >
                            <label style={checkRowStyle}>
                                <input type="checkbox" checked={allVisibleChecked} onChange={toggleSelectAll} />
                                <span style={{ fontWeight: 600 }}>(Select All)</span>
                            </label>
                            {shown.map((val) => (
                                <label key={val} style={checkRowStyle}>
                                    <input
                                        type="checkbox"
                                        checked={selectedSet.has(val)}
                                        onChange={() => toggleValue(val)}
                                    />
                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {val || '(blank)'}
                                    </span>
                                </label>
                            ))}
                            {visibleValues.length > shown.length && (
                                <div style={{ padding: '4px 8px', color: 'var(--vscode-descriptionForeground)', fontSize: 11 }}>
                                    {visibleValues.length - shown.length} more — refine search to narrow.
                                </div>
                            )}
                            {shown.length === 0 && (
                                <div style={{ padding: '4px 8px', color: 'var(--vscode-descriptionForeground)', fontSize: 11 }}>
                                    No matching values.
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, marginTop: 10 }}>
                        <VscodeButton {...{ secondary: true, onClick: clear } as any}>Clear</VscodeButton>
                        <VscodeButton onClick={apply}>Apply</VscodeButton>
                    </div>
                </div>
            </Popover>
        </>
    );
}

const checkRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '3px 8px',
    cursor: 'pointer',
    fontSize: 12
};
