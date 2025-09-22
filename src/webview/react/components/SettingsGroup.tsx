import React from 'react';
import { VscodeDivider, VscodeIcon } from '@vscode-elements/react-elements';
import { FormState, GroupMeta, SettingMeta } from '../types/settingTypes';
import SettingField from './SettingField';

export interface SettingsGroupProps {
  group: GroupMeta;
  settings: SettingMeta[];
  isLast: boolean;
  // State and handlers to pass down to SettingField
  form: FormState;
  selectedId: string | null;
  reveal: Record<string, boolean>;
  onSelect: (id: string) => void;
  updateValue: (id: string, value: any) => void;
  focusControl: (id: string) => void;
  setReveal: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

/**
 * SettingsGroup
 * Renders a section container for a logical group of settings.
 * It includes the group title, description, and a list of SettingField components.
 */
export const SettingsGroup: React.FC<SettingsGroupProps> = ({
  group,
  settings,
  isLast,
  form,
  selectedId,
  reveal,
  onSelect,
  updateValue,
  focusControl,
  setReveal,
}) => {
  // Don't render the group if there are no settings to show (e.g., due to filtering)
  if (settings.length === 0) {
    return null;
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const ids = settings.map(s => s.id);
    if (!ids.length) return;
    let idxSel = selectedId ? ids.indexOf(selectedId) : -1;
    if (idxSel === -1) idxSel = 0;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.min(idxSel + 1, ids.length - 1);
      onSelect(ids[next]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = Math.max(idxSel - 1, 0);
      onSelect(ids[prev]);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (selectedId && ids.includes(selectedId)) focusControl(selectedId);
    }
  };

  return (
    <section className="settings-section">
      <h2 className="settings-subheading">
        {group.icon && <VscodeIcon name={group.icon} />}
        <span>{group.title}</span>
      </h2>
      {group.description && <div className="section-description">{group.description}</div>}
      <div className="settings-list" role="list" tabIndex={0} onKeyDown={onKeyDown}>
        {settings.map((meta) => (
          <SettingField
            key={meta.id}
            meta={meta}
            form={form}
            selectedId={selectedId}
            reveal={reveal}
            onSelect={onSelect}
            updateValue={updateValue}
            focusControl={focusControl}
            setReveal={setReveal}
          />
        ))}
      </div>
      {!isLast && <VscodeDivider />}
    </section>
  );
};

export default SettingsGroup;