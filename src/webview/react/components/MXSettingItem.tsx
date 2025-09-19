import React, { useEffect, useRef } from 'react';
import { VscodeCheckbox, VscodeIcon, VscodeTextfield, VscodeTextarea } from '@vscode-elements/react-elements';
import SettingItem from './SettingItem';
import { SettingMeta, FormState } from '../playground/settingTypes';

export interface MXSettingItemProps {
  meta: SettingMeta;
  form: FormState;
  selectedId: string | null;
  reveal: Record<string, boolean>;
  onSelect: (id: string) => void;
  updateValue: (id: string, value: any) => void;
  focusControl: (id: string) => void;
  setReveal: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

/**
 * MXSettingItem
 * Wraps a SettingMeta + state & interactions into a single declarative component.
 * Keeps EnvironmentEditor lean and focused on orchestration.
 */
export const MXSettingItem: React.FC<MXSettingItemProps> = ({
  meta,
  form,
  selectedId,
  reveal,
  onSelect,
  updateValue,
  focusControl,
  setReveal
}) => {
  const state = form[meta.id];
  const err = state?.error;
  const invalid = !!err && state?.touched;
  // Accessible required indicator (avoid just adding asterisk to raw text for styling flexibility)
  const requiredIndicator = meta.required ? <span className="req-indicator" aria-hidden="true">*</span> : null;
  const description = meta.description;
  const badges = (meta as any).badges as MXSettingItemProps['meta']['badges'];

  const common = {
    placeholder: meta.placeholder || '',
    value: state?.value,
    onInput: (e: any) => updateValue(meta.id, e.target.value)
  };

  const selectElRef = useRef<any>(null);
  useEffect(() => {
    const el = selectElRef.current;
    if (el) {
      const handleChange = (e: any) => updateValue(meta.id, e.target.value);
      el.addEventListener('change', handleChange);
      el.addEventListener('vsc-change', handleChange);
      return () => {
        el.removeEventListener('change', handleChange);
        el.removeEventListener('vsc-change', handleChange);
      };
    }
  }, [meta.id, updateValue]);

  const selectElement = (
    <vscode-single-select
      value={state?.value}
      data-allow-custom={meta.allowCustom || undefined}
      ref={selectElRef}
    >
      {meta.options?.map(opt => (
        <vscode-option key={opt} value={opt}>{opt}</vscode-option>
      ))}
    </vscode-single-select>
  );

  switch (meta.type) {
    case 'boolean':
      return (
        <SettingItem
          key={meta.id}
          id={meta.id}
          label={<span className="setting-label-text">{meta.label} {requiredIndicator}</span> as any}
          helperText={!invalid ? description : undefined}
          badges={badges}
          selected={selectedId === meta.id}
          hoverColor={'var(--vscode-list-hoverBackground)'}
          selectedColor={'var(--vscode-list-inactiveSelectionBackground)'}
          error={invalid ? err : undefined}
          onSelect={() => { onSelect(meta.id); focusControl(meta.id); }}
        >
          <VscodeCheckbox checked={!!state?.value} onInput={(e: any) => updateValue(meta.id, !!e.target.checked)} onChange={(e: any) => updateValue(meta.id, !!e.target.checked)}></VscodeCheckbox>
        </SettingItem>
      );
    case 'radio':
      return (
        <SettingItem
          key={meta.id}
          id={meta.id}
          label={<span className="setting-label-text">{meta.label} {requiredIndicator}</span> as any}
          helperText={!invalid ? description : undefined}
          badges={badges}
          selected={selectedId === meta.id}
          hoverColor={'var(--vscode-list-hoverBackground)'}
          selectedColor={'var(--vscode-list-inactiveSelectionBackground)'}
          error={invalid ? err : undefined}
          onSelect={() => { onSelect(meta.id); focusControl(meta.id); }}
        >
          <div style={{ display: 'flex', gap: '16px', paddingTop: 4 }}>
            {meta.options?.map(opt => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                <input
                  type="radio"
                  name={meta.id}
                  value={opt}
                  checked={state?.value === opt}
                  onChange={(e) => updateValue(meta.id, e.target.value)}
                />
                <span style={{ textTransform: 'capitalize' }}>{opt}</span>
              </label>
            ))}
          </div>
        </SettingItem>
      );
    case 'multiline':
      return (
        <SettingItem
          key={meta.id}
          id={meta.id}
          label={<span className="setting-label-text">{meta.label} {requiredIndicator}</span> as any}
          helperText={!invalid ? description : undefined}
          badges={badges}
          selected={selectedId === meta.id}
          hoverColor={'var(--vscode-list-hoverBackground)'}
          selectedColor={'var(--vscode-list-inactiveSelectionBackground)'}
          error={invalid ? err : undefined}
          onSelect={() => { onSelect(meta.id); focusControl(meta.id); }}
        >
          <VscodeTextarea rows={4} {...common as any}></VscodeTextarea>
        </SettingItem>
      );
    case 'password':
      return (
        <SettingItem
          key={meta.id}
          id={meta.id}
          label={<span className="setting-label-text">{meta.label} {requiredIndicator}</span> as any}
          helperText={!invalid ? description : undefined}
          badges={badges}
          selected={selectedId === meta.id}
          hoverColor={'var(--vscode-list-hoverBackground)'}
          selectedColor={'var(--vscode-list-inactiveSelectionBackground)'}
          error={invalid ? err : undefined}
          onSelect={() => { onSelect(meta.id); focusControl(meta.id); }}
        >
          <VscodeTextfield
            type={reveal[meta.id] ? 'text' : 'password'}
            {...common as any}
          >
            <VscodeIcon
              slot="content-after"
              name={reveal[meta.id] ? 'eye-closed' : 'eye'}
              action-icon
              title={reveal[meta.id] ? 'Hide value' : 'Show value'}
              onClick={(e: any) => {
                e.stopPropagation();
                setReveal(r => ({ ...r, [meta.id]: !r[meta.id] }));
              }}
            ></VscodeIcon>
          </VscodeTextfield>
        </SettingItem>
      );
    case 'number':
      return (
        <SettingItem
          key={meta.id}
          id={meta.id}
          label={<span className="setting-label-text">{meta.label} {requiredIndicator}</span> as any}
          helperText={!invalid ? description : undefined}
          badges={badges}
          selected={selectedId === meta.id}
          hoverColor={'var(--vscode-list-hoverBackground)'}
          selectedColor={'var(--vscode-list-inactiveSelectionBackground)'}
          error={invalid ? err : undefined}
          onSelect={() => { onSelect(meta.id); focusControl(meta.id); }}
        >
          <VscodeTextfield type="number" {...common as any}></VscodeTextfield>
        </SettingItem>
      );
    case 'select':
      return (
        <SettingItem
          key={meta.id}
          id={meta.id}
          label={<span className="setting-label-text">{meta.label} {requiredIndicator}</span> as any}
          helperText={!invalid ? description : undefined}
          badges={badges}
          selected={selectedId === meta.id}
          hoverColor={'var(--vscode-list-hoverBackground)'}
          selectedColor={'var(--vscode-list-inactiveSelectionBackground)'}
          error={invalid ? err : undefined}
          onSelect={() => { onSelect(meta.id); focusControl(meta.id); }}
        >
          {selectElement}
        </SettingItem>
      );
    default:
      return (
        <SettingItem
            key={meta.id}
            id={meta.id}
            label={<span className="setting-label-text">{meta.label} {requiredIndicator}</span> as any}
            helperText={!invalid ? description : undefined}
            badges={badges}
            selected={selectedId === meta.id}
            hoverColor={'var(--vscode-list-hoverBackground)'}
            selectedColor={'var(--vscode-list-inactiveSelectionBackground)'}
            error={invalid ? err : undefined}
            onSelect={() => { onSelect(meta.id); focusControl(meta.id); }}
          >
            <VscodeTextfield {...common as any}></VscodeTextfield>
          </SettingItem>
      );
  }
};

export default MXSettingItem;
