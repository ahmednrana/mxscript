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
import MXSettingItem from './MXSettingItem';
import { SettingMeta, GroupMeta, FormState } from './settingTypes';

// Architectural model: metadata drives layout & validation
const GROUPS: GroupMeta[] = [
  { id: 'connection', title: 'Connection', icon: 'plug', description: 'Base connection details', order: 1 },
  { id: 'auth', title: 'Authentication', icon: 'lock', description: 'Credentials & authentication mode', order: 2 },
  { id: 'behavior', title: 'Behavior', icon: 'gear', description: 'Operational preferences and client behavior', order: 3 },
  { id: 'advanced', title: 'Advanced', icon: 'server-process', description: 'Less frequently adjusted / advanced options', order: 4 }
];

const SETTINGS: SettingMeta[] = [
  // Connection
  { id: 'envName', label: 'Environment Name', group: 'connection', required: true, type: 'string', placeholder: 'Production, Dev...', description: 'Friendly display name for this environment.' },
  {
    id: 'hostname', label: 'Hostname / Base URL', group: 'connection', required: true, type: 'string',
    placeholder: 'https://mymaximo.example.com',
    description: 'The base URL or host where Maximo is reachable. Include protocol if using a full URL.',
    validate: v => !v ? 'Hostname is required' : undefined
  },
  { id: 'port', label: 'Port', group: 'connection', type: 'number', placeholder: '443', defaultValue: 443, description: 'Port to connect to the Maximo server (usually 443 for HTTPS).' },
  { id: 'httpProtocol', label: 'HTTP Protocol', group: 'connection', type: 'select', placeholder: 'https', defaultValue: 'https', options: ['http','https'], description: 'Choose HTTPS for secure connections when supported.' },
  { id: 'scope', label: 'Scope', group: 'connection', type: 'radio', defaultValue: 'global', options: ['global','workspace'], description: 'Whether this environment is stored globally or only for this workspace.' },
  // Auth
  { id: 'authType', label: 'Authentication Type', group: 'auth', order: 1, type: 'select', defaultValue: 'internal', options: ['apikey','internal','ldap'], description: 'Select how to authenticate with Maximo (API key, internal, or LDAP). Username/Password fields appear for internal/LDAP; API Key appears for apikey.' },
  { id: 'apikey', label: 'API Key', group: 'auth', order: 2, type: 'password', placeholder: 'your-api-key', description: 'Required if using API key authentication.' },
  { id: 'username', label: 'Username', group: 'auth', order: 3, type: 'string', placeholder: 'maxadmin', description: 'Username for internal/LDAP authentication.' },
  { id: 'password', label: 'Password', group: 'auth', order: 4, type: 'password', placeholder: '••••••', description: 'Password for internal/LDAP authentication.' },
  // Behavior
  { id: 'objectStructure', label: 'Script Object Structure', group: 'behavior', type: 'select', placeholder: 'MXSCRIPT', defaultValue: 'MXSCRIPT', allowCustom: true, options: ['MXSCRIPT','MXAPIAUTOSCRIPT','MXCUSTSCR'], description: 'Object Structure used for uploading/downloading scripts.', badges: [{ text: 'Experimental', variant: 'warning', title: 'Experimental setting' }] },
  { id: 'appxmlObjectStructure', label: 'App XML Object Structure', group: 'behavior', type: 'select', placeholder: 'MXL_APPS', defaultValue: 'MXL_APPS', allowCustom: true, options: ['MXL_APPS','MXL_APPS2'], description: 'Object Structure used for App XML operations.' },
  { id: 'logLevel', label: 'Log Level', group: 'behavior', type: 'select', defaultValue: 'INFO', options: ['DEBUG','INFO','WARN','ERROR','FATAL'], description: 'Controls the verbosity of logs produced by operations.' },
  { id: 'createPythonFile', label: 'Create Python File for Jython Scripts', group: 'behavior', type: 'boolean', defaultValue: true, description: 'When enabled, a Python file will be created for Jython scripts if necessary.' },
  { id: 'formatXmlOnDownload', label: 'Format XML on Download/Compare', group: 'behavior', type: 'boolean', defaultValue: true, description: 'Automatically format XML when downloading or comparing.' },
  // Advanced
  { id: 'ignoreSsl', label: 'Ignore SSL Errors', group: 'advanced', type: 'boolean', defaultValue: true, description: 'When enabled, SSL certificate errors will be ignored. Not recommended for production.' },
  { id: 'sslcertificate', label: 'SSL Certificate (PEM)', group: 'advanced', type: 'multiline', placeholder: 'Paste PEM certificate here', description: 'Optional custom CA certificate in PEM format.' },
];

// UI helper: filter & order
// Only used for GROUP ordering. Individual settings keep declaration order.
const sortByOrder = <T extends { order?: number; id: string }>(arr: T[]) =>
  [...arr].sort((a, b) =>
    (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER) ||
    a.id.localeCompare(b.id)
  );

// FieldState & FormState imported from shared types

const buildInitialState = (): FormState => {
  const state: FormState = {};
  for (const s of SETTINGS) {
    state[s.id] = { value: s.defaultValue ?? (s.type === 'boolean' ? false : ''), touched: false };
  }
  return state;
};

export interface EnvironmentEditorProps {
  mode?: 'add' | 'edit';
  /** Map of initial values keyed by setting id (e.g. hostname, port, authenticationType, etc.) */
  initialValues?: Partial<Record<string, any>>;
  /** Optional callback invoked when user presses Save and validation passes */
  onSave?: (values: Record<string, any>, mode: 'add' | 'edit') => void | Promise<void>;
  /** Optional override for heading (else derived from mode) */
  heading?: string;
}

export const EnvironmentEditor: React.FC<EnvironmentEditorProps> = ({
  mode = 'add',
  initialValues,
  onSave: onSaveExternal,
  heading
}) => {
  const [form, setForm] = useState<FormState>(() => buildInitialState());
  const [search, setSearch] = useState('');
  const [showOnlyInvalid, setShowOnlyInvalid] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // single layout (sections) only – tree view removed
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastError, setLastError] = useState<string | undefined>();
  // Track reveal state per secret field (apiKey, password, etc.)
  const [reveal, setReveal] = useState<Record<string, boolean>>({});

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
    const authType = form['authType']?.value || 'internal';

    return SETTINGS.filter(s => {
      // Conditional visibility based on authentication type
      if (s.id === 'authType') return true; // always show selector (was 'authenticationType')
      if (s.id === 'apikey' && authType !== 'apikey') return false;
      if ((s.id === 'username' || s.id === 'password') && authType === 'apikey') return false;

      if (showOnlyInvalid && !validateField(s, form[s.id].value)) return false;
      if (!term) return true;
      return s.label.toLowerCase().includes(term) || s.id.toLowerCase().includes(term) || (s.description?.toLowerCase().includes(term));
    });
  }, [search, showOnlyInvalid, form, validateField]);  const grouped = useMemo(() => {
    // Preserve original declaration order from SETTINGS (after filtering)
    const map: Record<string, SettingMeta[]> = {};
    for (const s of filteredSettings) {
      (map[s.group] ||= []).push(s);
    }
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

  // Rehydrate form when initialValues provided / changed (edit mode typically)
  useEffect(() => {
    if (!initialValues) return;
    setForm(prev => {
      const next: FormState = { ...prev };
      for (const s of SETTINGS) {
        if (initialValues[s.id] !== undefined) {
          next[s.id] = {
            ...next[s.id],
            value: initialValues[s.id],
            // don't mark as touched yet
            error: validateField(s, initialValues[s.id])
          };
        }
      }
      return next;
    });
  }, [initialValues, validateField]);

  const collectValues = () => {
    const result: Record<string, any> = {};
    for (const s of SETTINGS) {
      result[s.id] = form[s.id]?.value;
    }
    console.log('DEBUG: collectValues() returning:', result);
    return result;
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

    const values = collectValues();

    // If consumer provided callback, delegate
    if (onSaveExternal) {
      try {
        await onSaveExternal(values, mode);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 1200);
      } catch (e:any) {
        setSaveStatus('error');
        setLastError(e?.message || 'Save failed');
      }
      return;
    }

    // Fallback simulated save
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
    if (initialValues) {
      // Reapply initial values (edit mode reset)
      setForm(buildInitialState());
      setTimeout(() => {
        setForm(prev => {
          const next: FormState = { ...prev };
            for (const s of SETTINGS) {
              if (initialValues[s.id] !== undefined) {
                next[s.id] = {
                  ...next[s.id],
                  value: initialValues[s.id],
                  touched: false,
                  error: validateField(s, initialValues[s.id])
                };
              }
            }
          return next;
        });
      }, 0);
    } else {
      setForm(buildInitialState());
    }
    setSaveStatus('idle');
    setLastError(undefined);
  };

  const renderField = (meta: SettingMeta) => (
    <MXSettingItem
      key={meta.id}
      meta={meta}
      form={form}
      selectedId={selectedId}
      reveal={reveal}
      onSelect={(id) => setSelectedId(id)}
      updateValue={updateValue}
      focusControl={focusControl}
      setReveal={setReveal}
    />
  );

  // Sync custom select (authenticationType) with state reliably
  useSyncSelectValue('authType', form['authType']?.value, (val) => updateValue('authType', val));

  return (
    <div className="env-editor-root">
  <h1 className="page-heading">{heading || (mode === 'edit' ? 'Edit Environment' : 'Add New Environment')}</h1>
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
        /* Optional: ensure icon is clickable */
        vscode-textfield [action-icon] { cursor: pointer; }
      `}</style>
    </div>
  );
};
