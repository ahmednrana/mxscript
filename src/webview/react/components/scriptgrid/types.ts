import type { useClientDataSource, PieceWritable } from '@1771technologies/lytenyte-core';
import type { MaximoScript } from '../../scriptgrid/data';
import type { ColumnFilterValue } from '../common/FilterDropdown';

export type ScriptRowSource = ReturnType<typeof useClientDataSource<MaximoScript>>;

/** Per-column filter state, keyed by column id. */
export type FilterModel = Record<string, ColumnFilterValue>;

/** One entry in the multi-column sort model. */
export interface SortEntry {
    id: string;
    desc: boolean;
}

/** Custom grid API extension shared with cell/header renderers. */
export interface ScriptGridApi {
    openLookup: (rowId: string) => void;
    filterModel: PieceWritable<FilterModel>;
    sortModel: PieceWritable<SortEntry[]>;
    /** Distinct values per filterable column, for the filter dropdown checklist. */
    distinctValues: Record<string, string[]>;
}

/** GridSpec drives all LyteNyte generic typing for this grid. */
export interface GridSpec {
    data: MaximoScript;
    source: ScriptRowSource;
    api: ScriptGridApi;
}
