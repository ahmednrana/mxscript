import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Grid, useClientDataSource, usePiece } from '@1771technologies/lytenyte-core';
import { VscodeButton, VscodeIcon } from '@vscode-elements/react-elements';
import { getVsCodeApi } from '../boot/vscode';
import { generateDummyScripts, loadScripts, type MaximoScript } from '../scriptgrid/data';
import type { FilterModel, GridSpec, ScriptGridApi, SortEntry } from '../components/scriptgrid/types';
import { getDistinctValues, isFilterActive, matchesFilter } from '../components/common/FilterDropdown';
import { ColumnManagerPanel, type ColumnItem } from '../components/common/ColumnManagerPanel';
import { SidePanel, type SidePanelTab } from '../components/common/SidePanel';
import { DateEditor, NameEditor, StatusEditor } from '../components/scriptgrid/editors';
import { ExpandCell } from '../components/scriptgrid/ExpandCell';
import { ActionsCell } from '../components/scriptgrid/ActionsCell';
import { HeaderCell } from '../components/scriptgrid/HeaderCell';
import { ScriptDetailPanel } from '../components/scriptgrid/ScriptDetailPanel';
import { LookupModal } from '../components/scriptgrid/LookupModal';

const vscode = getVsCodeApi();

const DATA_COLUMN_IDS = new Set(['name', 'status', 'dueDate', 'language']);

/** A row is editable only when it is a leaf row and not flagged read-only. */
function isRowEditable(p: Grid.T.CellParamsWithIndex<GridSpec>): boolean {
    return p.api.rowIsLeaf(p.row) && !p.row.data.isReadOnly;
}

function buildColumns(): Grid.Column<GridSpec>[] {
    return [
        {
            id: '__expand__',
            name: '',
            width: 44,
            resizable: false,
            movable: false,
            cellRenderer: ExpandCell,
            headerRenderer: () => null
        },
        {
            id: 'name',
            name: 'Name',
            field: 'name',
            widthFlex: 2,
            widthMin: 160,
            headerRenderer: HeaderCell,
            editable: isRowEditable,
            editRenderer: NameEditor
        },
        {
            id: 'status',
            name: 'Status',
            field: 'status',
            width: 140,
            headerRenderer: HeaderCell,
            editable: isRowEditable,
            editRenderer: StatusEditor,
            editOnPrintable: false
        },
        {
            id: 'dueDate',
            name: 'Due Date',
            field: 'dueDate',
            type: 'date',
            width: 150,
            headerRenderer: HeaderCell,
            editable: isRowEditable,
            editRenderer: DateEditor
        },
        {
            id: 'language',
            name: 'Language',
            field: 'language',
            width: 150,
            headerRenderer: HeaderCell
        },
        {
            id: 'actions',
            name: 'Actions',
            width: 110,
            resizable: false,
            movable: false,
            cellRenderer: ActionsCell,
            headerRenderer: () => <span style={{ padding: '0 8px', fontWeight: 600 }}>Actions</span>
        }
    ];
}

export const MaximoScriptGrid: React.FC = () => {
    const [data, setData] = useState<MaximoScript[]>(() => generateDummyScripts(5000));
    const [columns, setColumns] = useState<Grid.Column<GridSpec>[]>(buildColumns);
    const [filter, setFilter] = useState<FilterModel>({});
    const [sort, setSort] = useState<SortEntry[]>([]);
    const [lookupRowId, setLookupRowId] = useState<string | null>(null);

    const apiRef = useRef<Grid.API<GridSpec> | null>(null);

    // Accept datasets pushed from the extension (JSON or YAML).
    useEffect(() => {
        const handler = (event: MessageEvent) => {
            const msg = event.data;
            if (msg?.type === 'setData' && typeof msg.raw === 'string') {
                try {
                    setData(loadScripts(msg.raw, msg.format === 'yaml' ? 'yaml' : 'json'));
                } catch (err) {
                    vscode?.postMessage({ type: 'error', message: `Failed to load data: ${String(err)}` });
                }
            }
        };
        window.addEventListener('message', handler);
        vscode?.postMessage({ type: 'ready' });
        return () => window.removeEventListener('message', handler);
    }, []);

    // Distinct values per filterable column, feeding the filter dropdown checklist.
    const distinctValues = useMemo<Record<string, string[]>>(
        () => ({
            name: getDistinctValues(data, 'name'),
            status: getDistinctValues(data, 'status'),
            dueDate: getDistinctValues(data, 'dueDate'),
            language: getDistinctValues(data, 'language')
        }),
        [data]
    );

    // Derive a filter predicate per active column filter.
    const filterFns = useMemo<Grid.T.FilterFn<MaximoScript>[] | null>(() => {
        const active = Object.entries(filter).filter(([, f]) => isFilterActive(f));
        if (active.length === 0) return null;
        return active.map(([colId, f]) => (row: Grid.T.RowLeaf<MaximoScript>) =>
            matchesFilter((row.data as unknown as Record<string, unknown>)[colId], f)
        );
    }, [filter]);

    // Derive the multi-column sort model.
    const sortDims = useMemo<Grid.T.DimensionSort<MaximoScript>[] | null>(() => {
        if (sort.length === 0) return null;
        return sort.map((s) => ({ dim: { id: s.id }, descending: s.desc })) as Grid.T.DimensionSort<MaximoScript>[];
    }, [sort]);

    const ds = useClientDataSource<MaximoScript>({
        data,
        filter: filterFns,
        sort: sortDims,
        leafIdFn: (d) => d.id,
        onRowDataChange: ({ center }) => {
            setData((prev) => prev.map((row, i) => (center.has(i) ? (center.get(i) as MaximoScript) : row)));
        }
    });

    const filterModel = usePiece(filter, setFilter);
    const sortModel = usePiece(sort, setSort);
    const openLookup = useCallback((rowId: string) => setLookupRowId(rowId), []);

    const apiExtension = useMemo<ScriptGridApi>(
        () => ({ openLookup, filterModel, sortModel, distinctValues }),
        [openLookup, filterModel, sortModel, distinctValues]
    );

    const exportGrid = useCallback(async (format: 'csv' | 'json') => {
        const api = apiRef.current;
        if (!api) return;
        const rect = await api.exportData();
        const cols = rect.columns
            .map((c, index) => ({ c, index }))
            .filter(({ c }) => DATA_COLUMN_IDS.has(c.id));

        let content: string;
        if (format === 'csv') {
            const escape = (cell: unknown) => {
                const s = cell == null ? '' : String(cell);
                return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
            };
            const lines = [cols.map(({ c }) => c.name ?? c.id).join(',')];
            for (const row of rect.data) {
                lines.push(cols.map(({ index }) => escape(row[index])).join(','));
            }
            content = lines.join('\n');
        } else {
            const objects = rect.data.map((row) => {
                const obj: Record<string, unknown> = {};
                for (const { c, index } of cols) {
                    obj[c.id] = row[index];
                }
                return obj;
            });
            content = JSON.stringify(objects, null, 2);
        }

        vscode?.postMessage({ type: 'exportData', format, content, filename: `maximo-scripts.${format}` });
    }, []);

    // Column manager: list everything except the fixed expand/marker column.
    const columnItems = useMemo<ColumnItem[]>(
        () =>
            columns
                .filter((c) => c.id !== '__expand__')
                .map((c) => ({ id: c.id, name: c.name ?? c.id, hidden: !!c.hide })),
        [columns]
    );

    const toggleColumn = useCallback((id: string, hidden: boolean) => {
        setColumns((prev) => prev.map((c) => (c.id === id ? { ...c, hide: hidden } : c)));
    }, []);

    const reorderColumns = useCallback((orderedIds: string[]) => {
        setColumns((prev) => {
            const byId = new Map(prev.map((c) => [c.id, c]));
            const expand = prev.find((c) => c.id === '__expand__');
            const ordered = orderedIds.map((id) => byId.get(id)).filter((c): c is Grid.Column<GridSpec> => !!c);
            return expand ? [expand, ...ordered] : ordered;
        });
    }, []);

    const sideTabs: SidePanelTab[] = [
        {
            id: 'columns',
            label: 'Columns',
            icon: 'list-selection',
            render: () => (
                <ColumnManagerPanel columns={columnItems} onToggle={toggleColumn} onReorder={reorderColumns} />
            )
        },
        {
            id: 'export',
            label: 'Export / Share',
            icon: 'export',
            render: () => (
                <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <strong>Export</strong>
                    <span style={{ color: 'var(--vscode-descriptionForeground)', fontSize: '0.9em' }}>
                        Exports the current filtered &amp; sorted view.
                    </span>
                    <VscodeButton {...{ onClick: () => exportGrid('csv') } as any}>
                        <VscodeIcon {...{ name: 'arrow-down', slot: 'content-before' } as any} />
                        Export to CSV
                    </VscodeButton>
                    <VscodeButton {...{ onClick: () => exportGrid('json') } as any}>
                        <VscodeIcon {...{ name: 'json', slot: 'content-before' } as any} />
                        Export to JSON
                    </VscodeButton>
                </div>
            )
        }
    ];

    const lookupScript = lookupRowId ? data.find((s) => s.id === lookupRowId) : undefined;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 12px',
                    borderBottom: '1px solid var(--vscode-panel-border)',
                    flexWrap: 'wrap'
                }}
            >
                <strong>Maximo Automation Scripts</strong>
                <span style={{ color: 'var(--vscode-descriptionForeground)', fontSize: '0.9em' }}>
                    {data.length.toLocaleString()} scripts
                </span>
                <div style={{ flex: 1 }} />
                {Object.keys(filter).length > 0 && (
                    <VscodeButton {...{ secondary: true, onClick: () => setFilter({}) } as any}>
                        Clear Filters
                    </VscodeButton>
                )}
            </div>

            <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
                <div style={{ flex: 1, position: 'relative', minHeight: 0, minWidth: 0 }}>
                    <div style={{ position: 'absolute', inset: 0 }}>
                        <div className="mx-vscode-theme ln-grid" style={{ height: '100%' }}>
                            <Grid<GridSpec>
                                ref={apiRef}
                                rowSource={ds}
                                columns={columns}
                                onColumnsChange={setColumns}
                                apiExtension={apiExtension}
                                rowHeight={36}
                                headerHeight={40}
                                editMode="cell"
                                rowDetailRenderer={ScriptDetailPanel}
                                rowDetailHeight={220}
                            />
                        </div>
                    </div>
                </div>
                <SidePanel tabs={sideTabs} />
            </div>

            {lookupScript && (
                <LookupModal
                    scriptName={lookupScript.name}
                    currentValue={lookupScript.language}
                    onApply={(value) => {
                        setData((prev) =>
                            prev.map((s) => (s.id === lookupScript.id ? { ...s, language: value } : s))
                        );
                        setLookupRowId(null);
                    }}
                    onClose={() => setLookupRowId(null)}
                />
            )}
        </div>
    );
};
