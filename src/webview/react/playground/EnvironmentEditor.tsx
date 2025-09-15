import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useSyncSelectValue } from '../hooks/useSyncSelectValue';
import {
  VscodeButton,
  VscodeBadge,
  VscodeIcon,
  VscodeCheckbox,
  VscodeTextfield,
  VscodeTextarea,
  VscodeDivider,
  VscodeTree
} from '@vscode-elements/react-elements';
import SettingItem from '../components/SettingItem';

type SettingType = 'string' | 'number' | 'password' | 'boolean' | 'multiline' | 'select';

interface SettingMetaBase {
  id: string;
  label: string;
  description?: string;
  badges?: Array<{ text: string; variant?: 'default' | 'counter' | 'info' | 'warning' | 'error' | 'success'; title?: string }>;
  required?: boolean;
  placeholder?: string;
  group: string; // group id
  order?: number;
  type: SettingType;
  defaultValue?: any;
  validate?: (value: any) => string | undefined;
  // select-specific optional metadata
  options?: string[]; // fixed list
  allowCustom?: boolean; // allow user typed custom value (for single-select component)
}

interface BooleanSettingMeta extends SettingMetaBase { type: 'boolean'; }
interface PasswordSettingMeta extends SettingMetaBase { type: 'password'; }
interface StringSettingMeta extends SettingMetaBase { type: 'string' | 'multiline'; }
interface NumberSettingMeta extends SettingMetaBase { type: 'number'; }
interface SelectSettingMeta extends SettingMetaBase { type: 'select'; options: string[]; allowCustom?: boolean; }

type SettingMeta = BooleanSettingMeta | PasswordSettingMeta | StringSettingMeta | NumberSettingMeta | SelectSettingMeta;

interface GroupMeta {
  id: string;
  title: string;
  icon?: string;
  description?: string;
  order?: number;
}

// Architectural model: metadata drives layout & validation
const GROUPS: GroupMeta[] = [
  { id: 'connection', title: 'Connection', icon: 'plug', description: 'Base connection details', order: 1 },
  { id: 'auth', title: 'Authentication', icon: 'lock', description: 'Credentials & authentication mode', order: 2 },
  { id: 'behavior', title: 'Behavior', icon: 'gear', description: 'Operational preferences and client behavior', order: 3 },
  { id: 'advanced', title: 'Advanced', icon: 'settings-gear', description: 'Less frequently adjusted / advanced options', order: 4 }
];

const SETTINGS: SettingMeta[] = [
  // Connection
  {
    id: 'hostname', label: 'Hostname / Base URL', group: 'connection', required: true, type: 'string',
    placeholder: 'https://mymaximo.example.com',
    description: 'The base URL or host where Maximo is reachable. Include protocol if using a full URL.',
    validate: v => !v ? 'Hostname is required' : undefined
  },
  { id: 'port', label: 'Port', group: 'connection', type: 'number', placeholder: '443', defaultValue: 443, description: 'Port to connect to the Maximo server (usually 443 for HTTPS).' },
  { id: 'httpProtocol', label: 'HTTP Protocol', group: 'connection', type: 'select', placeholder: 'https', defaultValue: 'https', options: ['http','https'], description: 'Choose HTTPS for secure connections when supported.' },
  // Auth
  { id: 'authenticationType', label: 'Authentication Type', group: 'auth', order: 1, type: 'select', defaultValue: 'internal', options: ['apikey','internal','ldap'], description: 'Select how to authenticate with Maximo (API key, internal, or LDAP). Username/Password fields appear for internal/LDAP; API Key appears for apikey.' },
  { id: 'apiKey', label: 'API Key', group: 'auth', order: 2, type: 'password', placeholder: 'your-api-key', description: 'Required if using API key authentication.' },
  { id: 'username', label: 'Username', group: 'auth', order: 3, type: 'string', placeholder: 'maxadmin', description: 'Username for internal/LDAP authentication.' },
  { id: 'password', label: 'Password', group: 'auth', order: 4, type: 'password', placeholder: '••••••', description: 'Password for internal/LDAP authentication.' },
  // Behavior
  { id: 'ignoreSslErrors', label: 'Ignore SSL Errors', group: 'behavior', type: 'boolean', defaultValue: true, description: 'When enabled, SSL certificate errors will be ignored. Not recommended for production.' },
  { id: 'objectStructure', label: 'Script Object Structure', group: 'behavior', type: 'select', placeholder: 'MXSCRIPT', defaultValue: 'MXSCRIPT', allowCustom: true, options: ['MXSCRIPT','MXSCRIPT2','MXCUSTSCR'], description: 'Object Structure used for uploading/downloading scripts.', badges: [{ text: 'Experimental', variant: 'warning', title: 'Experimental setting' }] },
  { id: 'appxmlObjectStructure', label: 'App XML Object Structure', group: 'behavior', type: 'select', placeholder: 'MXL_APPS', defaultValue: 'MXL_APPS', allowCustom: true, options: ['MXL_APPS','MXL_APPS2'], description: 'Object Structure used for App XML operations.' },
  { id: 'logLevel', label: 'Log Level', group: 'behavior', type: 'select', defaultValue: 'INFO', options: ['DEBUG','INFO','WARN','ERROR','FATAL'], description: 'Controls the verbosity of logs produced by operations.' },
  // Advanced
  { id: 'sslcertificate', label: 'SSL Certificate (PEM)', group: 'advanced', type: 'multiline', placeholder: 'Paste PEM certificate here', description: 'Optional custom CA certificate in PEM format.' },
];

// UI helper: filter & order
const sortByOrder = <T extends { order?: number; id: string }>(arr: T[]) =>
  [...arr].sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER) || a.id.localeCompare(b.id));

interface FieldState {
  value: any;
  error?: string;
  touched?: boolean;
}

type FormState = Record<string, FieldState>;

const buildInitialState = (): FormState => {
  const state: FormState = {};
  for (const s of SETTINGS) {
    state[s.id] = { value: s.defaultValue ?? (s.type === 'boolean' ? false : ''), touched: false };
  }
  return state;
};

export const EnvironmentEditor: React.FC = () => {
  const [form, setForm] = useState<FormState>(() => buildInitialState());
  const [search, setSearch] = useState('');
  const [showOnlyInvalid, setShowOnlyInvalid] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // single layout (sections) only – tree view removed
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastError, setLastError] = useState<string | undefined>();

  // Derive validation on-demand
  const validateField = useCallback((meta: SettingMeta, value: any): string | undefined => {
    if (meta.validate) return meta.validate(value);
    if (meta.required && (value === undefined || value === null || value === '')) return `${meta.label} is required`;
    return undefined;
  }, []);

  const invalidCount = useMemo(() => SETTINGS.reduce((acc, s) => {
    const err = validateField(s, form[s.id]?.value);
    return acc + (err ? 1 : 0);
  }, 0), [form, validateField]);

  const filteredSettings = useMemo(() => {
    const term = search.trim().toLowerCase();
    const authType = form['authenticationType']?.value || 'internal';

    return SETTINGS.filter(s => {
      // Conditional visibility based on authentication type
      if (s.id === 'authenticationType') return true; // always show selector
      if (s.id === 'apiKey' && authType !== 'apikey') return false;
      if ((s.id === 'username' || s.id === 'password') && authType === 'apikey') return false;

      if (showOnlyInvalid && !validateField(s, form[s.id].value)) return false;
      if (!term) return true;
      return s.label.toLowerCase().includes(term) || s.id.toLowerCase().includes(term) || (s.description?.toLowerCase().includes(term));
    });
  }, [search, showOnlyInvalid, form, validateField]);

  const grouped = useMemo(() => {
    const map: Record<string, SettingMeta[]> = {};
    for (const s of filteredSettings) {
      if (!map[s.group]) map[s.group] = [];
      map[s.group].push(s);
    }
    for (const g of Object.keys(map)) map[g] = sortByOrder(map[g]);
    return map;
  }, [filteredSettings]);

  const groupsOrdered = useMemo(() => sortByOrder(GROUPS), []);

  const updateValue = (id: string, value: any) => {
    setForm(f => ({
      ...f,
      [id]: { value, touched: true, error: validateField(SETTINGS.find(s => s.id === id)!, value) }
    }));
  };

  // single settings-like layout only

  // Initialize or repair selection when filters/groups change
  useEffect(() => {
    if (selectedId && filteredSettings.some(s => s.id === selectedId)) return;
    const firstGroup = groupsOrdered.find(g => (grouped[g.id] || []).length);
    const firstId = firstGroup ? (grouped[firstGroup.id][0]?.id) : undefined;
    setSelectedId(firstId ?? null);
  }, [filteredSettings, grouped, groupsOrdered, selectedId]);

  const focusControl = (id: string) => {
    const container = document.querySelector(`[data-control-id="${id}"]`) as HTMLElement | null;
    if (!container) return;
    const focusable = container.querySelector<HTMLElement>('input, textarea, select, button, vscode-textfield, vscode-text-area, vscode-single-select, [tabindex]:not([tabindex="-1"])');
    (focusable || container).focus?.();
  };

  const onSave = async () => {
    setSaveStatus('saving');
    setLastError(undefined);
    // final validation
    const next: FormState = { ...form };
    let hasError = false;
    for (const s of SETTINGS) {
      const v = form[s.id].value;
      const err = validateField(s, v);
      next[s.id] = { ...next[s.id], error: err, touched: true };
      if (err) hasError = true;
    }
    setForm(next);
    if (hasError) {
      setSaveStatus('error');
      setLastError('Please resolve validation errors before saving.');
      return;
    }

    // Simulate async save (in real extension: postMessage / API call)
    try {
      await new Promise(r => setTimeout(r, 400));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 1200);
    } catch (e:any) {
      setSaveStatus('error');
      setLastError(e.message || 'Save failed');
    }
  };

  const reset = () => {
    setForm(buildInitialState());
    setSaveStatus('idle');
    setLastError(undefined);
  };

  const renderField = (meta: SettingMeta) => {
    const state = form[meta.id];
    const err = state.error;
    const common = { placeholder: meta.placeholder || '', value: state.value, onInput: (e: any) => updateValue(meta.id, e.target.value) };
    const labelSuffix = meta.required ? ' *' : '';
    const invalid = !!err && state.touched;
    const description = meta.description;

  const helper = description ? <div className="form-helper">{description}</div> : null;
  const badges = (meta as any).badges as Array<{ text: string; variant?: 'default' | 'counter' | 'info' | 'warning' | 'error' | 'success'; title?: string }> | undefined;

    switch (meta.type) {
      case 'boolean':
        return (
          <SettingItem
            key={meta.id}
            id={meta.id}
            label={`${meta.label}${labelSuffix}`}
            helperText={!invalid ? description : undefined}
            badges={badges}
            selected={selectedId === meta.id}
            hoverColor={'var(--vscode-list-hoverBackground)'}
            selectedColor={'var(--vscode-list-inactiveSelectionBackground)'}
            error={invalid ? err : undefined}
            onSelect={() => { setSelectedId(meta.id); focusControl(meta.id); }}
          >
            <VscodeCheckbox checked={!!state.value} onInput={(e: any) => updateValue(meta.id, e.target.checked)}></VscodeCheckbox>
          </SettingItem>
        );
      case 'multiline':
        return (
          <SettingItem
            key={meta.id}
            id={meta.id}
            label={`${meta.label}${labelSuffix}`}
            helperText={!invalid ? description : undefined}
            badges={badges}
            selected={selectedId === meta.id}
            hoverColor={'var(--vscode-list-hoverBackground)'}
            selectedColor={'var(--vscode-list-inactiveSelectionBackground)'}
            error={invalid ? err : undefined}
            onSelect={() => { setSelectedId(meta.id); focusControl(meta.id); }}
          >
            <VscodeTextarea rows={4} {...common as any}></VscodeTextarea>
          </SettingItem>
        );
      case 'password':
        return (
          <SettingItem
            key={meta.id}
            id={meta.id}
            label={`${meta.label}${labelSuffix}`}
            helperText={!invalid ? description : undefined}
            badges={badges}
            selected={selectedId === meta.id}
            hoverColor={'var(--vscode-list-hoverBackground)'}
            selectedColor={'var(--vscode-list-inactiveSelectionBackground)'}
            error={invalid ? err : undefined}
            onSelect={() => { setSelectedId(meta.id); focusControl(meta.id); }}
          >
            <VscodeTextfield type="password" {...common as any}></VscodeTextfield>
          </SettingItem>
        );
      case 'number':
        return (
          <SettingItem
            key={meta.id}
            id={meta.id}
            label={`${meta.label}${labelSuffix}`}
            helperText={!invalid ? description : undefined}
            badges={badges}
            selected={selectedId === meta.id}
            hoverColor={'var(--vscode-list-hoverBackground)'}
            selectedColor={'var(--vscode-list-inactiveSelectionBackground)'}
            error={invalid ? err : undefined}
            onSelect={() => { setSelectedId(meta.id); focusControl(meta.id); }}
          >
            <VscodeTextfield type="number" {...common as any}></VscodeTextfield>
          </SettingItem>
        );
      case 'select':
        return (
          <SettingItem
            key={meta.id}
            id={meta.id}
            label={`${meta.label}${labelSuffix}`}
            helperText={!invalid ? description : undefined}
            badges={badges}
            selected={selectedId === meta.id}
            hoverColor={'var(--vscode-list-hoverBackground)'}
            selectedColor={'var(--vscode-list-inactiveSelectionBackground)'}
            error={invalid ? err : undefined}
            onSelect={() => { setSelectedId(meta.id); focusControl(meta.id); }}
          >
            {meta.id === 'authenticationType' ? (
              <vscode-single-select
                value={state.value}
                onInput={(e: any) => updateValue(meta.id, e.target.value)}
                onChange={(e: any) => updateValue(meta.id, e.target.value)}
              >
                {meta.options?.map(opt => (
                  <vscode-option key={opt} value={opt}>{opt}</vscode-option>
                ))}
              </vscode-single-select>
            ) : (
              <vscode-single-select
                value={state.value}
                data-allow-custom={meta.allowCustom || undefined}
                onInput={(e: any) => updateValue(meta.id, e.target.value)}
                onChange={(e: any) => updateValue(meta.id, e.target.value)}>
                {meta.options?.map(opt => (
                  <vscode-option key={opt} value={opt}>{opt}</vscode-option>
                ))}
              </vscode-single-select>
            )}
          </SettingItem>
        );
      default:
        return (
          <SettingItem
            key={meta.id}
            id={meta.id}
            label={`${meta.label}${labelSuffix}`}
            helperText={!invalid ? description : undefined}
            badges={badges}
            selected={selectedId === meta.id}
            hoverColor={'var(--vscode-list-hoverBackground)'}
            selectedColor={'var(--vscode-list-inactiveSelectionBackground)'}
            error={invalid ? err : undefined}
            onSelect={() => { setSelectedId(meta.id); focusControl(meta.id); }}
          >
            <VscodeTextfield {...common as any}></VscodeTextfield>
          </SettingItem>
        );
    }
  };

  // Sync custom select (authenticationType) with state reliably
  useSyncSelectValue('authenticationType', form['authenticationType']?.value, (val) => updateValue('authenticationType', val));

  return (
    <div className="env-editor-root">
      <h1 className="page-heading">Add New Environment</h1>
      <div className="toolbar-row">
        <div className="left">
          <VscodeTextfield placeholder="Search settings" value={search} onInput={(e: any) => setSearch(e.target.value)}>
            <VscodeIcon slot="content-before" name="search"></VscodeIcon>
            {!!search && <VscodeIcon slot="content-after" name="close" action-icon onClick={() => setSearch('')}></VscodeIcon>}
            {search && <VscodeBadge slot="content-after" variant="counter">{filteredSettings.length}</VscodeBadge>}
          </VscodeTextfield>
          <VscodeCheckbox checked={showOnlyInvalid} onInput={(e: any) => setShowOnlyInvalid(e.target.checked)}>Only invalid</VscodeCheckbox>
        </div>
        <div className="right actions">
          <VscodeButton onClick={reset}>
            <VscodeIcon name="discard" slot="content-before"></VscodeIcon>Reset
          </VscodeButton>
          <VscodeButton onClick={onSave} disabled={saveStatus === 'saving'}>
            <VscodeIcon name={saveStatus === 'saving' ? 'loading~spin' : saveStatus === 'saved' ? 'pass-filled' : 'save'} slot="content-before"></VscodeIcon>
            {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Save'}
          </VscodeButton>
        </div>
      </div>
      <div className="summary-row">
        <VscodeBadge variant={invalidCount ? 'counter' : 'default'}>{invalidCount} Invalid</VscodeBadge>
        {lastError && <span className="status-error"><VscodeIcon name="error" /> {lastError}</span>}
      </div>
      <div className="settings-like-layout">
        {groupsOrdered.filter(g => (grouped[g.id]||[]).length).map((group, idx) => (
          <section key={group.id} className="settings-section">
            <h2 className="settings-subheading">
              {group.icon && (
                <VscodeIcon name={group.icon} />
              )}
              <span>{group.title}</span>
            </h2>
            {group.description && <div className="section-description">{group.description}</div>}
            <div
              className="settings-list"
              role="list"
              tabIndex={0}
              onKeyDown={(e) => {
                const ids = (grouped[group.id] || []).map(s => s.id);
                if (!ids.length) return;
                let idxSel = selectedId ? ids.indexOf(selectedId) : -1;
                if (idxSel === -1) idxSel = 0;
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  const next = Math.min(idxSel + 1, ids.length - 1);
                  setSelectedId(ids[next]);
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  const prev = Math.max(idxSel - 1, 0);
                  setSelectedId(ids[prev]);
                } else if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (selectedId && ids.includes(selectedId)) focusControl(selectedId);
                }
              }}
            >
              {(grouped[group.id]||[]).map(m => (
                renderField(m)
              ))}
            </div>
            {idx < groupsOrdered.length - 1 && <VscodeDivider />}
          </section>
        ))}
      </div>
      <style>{`
        .env-editor-root { display:flex; flex-direction:column; gap:12px; font-size:13px; }
        .page-heading { font-size:18px; font-weight:600; margin:6px 0 2px; }
        .toolbar-row { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; }
        .toolbar-row .left { display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
        .toolbar-row .right { display:flex; gap:8px; }
  /* view toggle removed */
        .summary-row { display:flex; align-items:center; gap:12px; padding:4px 2px; }
        .status-error { color: var(--vscode-errorForeground); display:flex; align-items:center; gap:4px; }
  /* grid layout removed */
  .setting-item { display:flex; flex-direction:column; gap:4px; position:relative; }
        .setting-item.invalid .field-label { color: var(--vscode-errorForeground); }
        .field-label { font-weight:500; }
        .error-row { display:flex; align-items:center; gap:4px; color: var(--vscode-errorForeground); font-size:11px; }
        .boolean.setting-item { flex-direction:row; align-items:center; }
        .boolean.setting-item .error-row { margin-left:8px; }
        .multiline textarea { min-height:90px; }
        .toolbar-row vscode-textfield::part(root), .toolbar-row vscode-text-field::part(root) { min-width:260px; }
  /* Sections layout removed */
        .section-description { font-size:12px; opacity:0.7; }
  /* tree layout removed */
        /* Helpers */
        .form-helper { font-size:11px; opacity:0.65; }
        /* Control sizing: make inputs and dropdowns match */
        vscode-single-select { width:100%; }
        .settings-control vscode-textfield::part(control),
        .settings-control vscode-text-field::part(control),
        .settings-control vscode-single-select::part(control) {
          min-height:26px;
          height:26px;
        }
        .select.setting-item { min-width:200px; }
        /* (Removed native select override) */
    /* Settings-like */
    .settings-like-layout { display:flex; flex-direction:column; gap:24px; }
    .settings-section { display:flex; flex-direction:column; gap:8px; }
    .settings-subheading { font-size:14px; font-weight:600; margin:0; display:flex; align-items:center; gap: 6px; }
  .settings-list { display:flex; flex-direction:column; gap:8px; outline: none; }
  .settings-row { display:grid; grid-template-columns: minmax(220px, 30%) 1fr; gap:16px; align-items:flex-start; padding:8px 6px; border-radius:4px; }
  .settings-row:hover { background: var(--vscode-list-hoverBackground); }
  /* Inactive selection (list not focused) */
  .settings-row.is-selected { background: var(--vscode-list-inactiveSelectionBackground); box-shadow: inset 0 0 0 1px var(--vscode-editorWidget.border); }
  .settings-row.is-selected .label-text { color: var(--vscode-list-inactiveSelectionForeground, inherit); }
  /* Active selection when the list itself is focused */
  .settings-list:focus .settings-row.is-selected { background: var(--vscode-list-activeSelectionBackground); box-shadow: inset 0 0 0 1px var(--vscode-focusBorder); }
  .settings-list:focus .settings-row.is-selected .label-text { color: var(--vscode-list-activeSelectionForeground, inherit); }
    .settings-label { display:flex; flex-direction:column; gap:4px; }
    .settings-label .label-text { font-weight:500; }
    .settings-label .label-help { font-size:12px; opacity:0.7; }
    .settings-control { display:flex; align-items:center; }
        @media (max-width: 640px){ .settings-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};
