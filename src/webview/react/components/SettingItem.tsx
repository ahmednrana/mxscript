import React from 'react';
import { VscodeBadge, VscodeButton, VscodeIcon } from '@vscode-elements/react-elements';

export interface SettingAction {
  id: string;
  label?: string;
  icon?: string;
  title?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'icon';
  onClick: (id: string) => void;
}

export interface SettingItemProps {
  id: string;
  label: string;
  selected?: boolean;
  hoverColor?: string; // CSS color or var
  selectedColor?: string; // CSS color or var
  helperText?: string;
  badges?: Array<{ text: string; variant?: 'default' | 'counter' | 'info' | 'warning' | 'error' | 'success'; title?: string }>;
  error?: string;
  actions?: SettingAction[];
  onSelect?: (id: string) => void;
  // The control to render (input, select, etc.)
  children?: React.ReactNode;
}

/**
 * SettingItem: a reusable settings row with VS Code-like styling
 * - Customizable hover and selected colors
 * - Supports helper text, badge, and error state
 * - Renders arbitrary control via children
 * - Optional action buttons with callbacks
 */
export const SettingItem: React.FC<SettingItemProps> = ({
  id,
  label,
  selected,
  hoverColor,
  selectedColor,
  helperText,
  badges,
  error,
  actions,
  onSelect,
  children,
}) => {
  const style: React.CSSProperties = {
    // Allow overrides via props while falling back to theme variables
    ['--setting-hover' as any]: hoverColor || 'var(--vscode-list-hoverBackground)',
    ['--setting-selected' as any]: selectedColor || 'var(--vscode-list-inactiveSelectionBackground)',
    ['--setting-selected-active' as any]: 'var(--vscode-list-activeSelectionBackground)',
  };

  return (
    <div
      role="listitem"
      aria-selected={selected ? true : undefined}
      className={`setting-item-row ${selected ? 'is-selected' : ''}`}
      onClick={() => onSelect?.(id)}
      style={style}
    >
      <div className="setting-item-label">
        <div className="label-text">
            {label}
            {badges && badges.length > 0 && (
              <span className="badges">
                {badges.map((b: { text: string; variant?: 'default' | 'counter' | 'info' | 'warning' | 'error' | 'success'; title?: string }, idx: number) => (
                  <VscodeBadge key={idx} variant={b.variant === 'counter' ? 'counter' : undefined} title={b.title}
                    className={b.variant && b.variant !== 'counter' && b.variant !== 'default' ? `badge-${b.variant}` : undefined}
                  >
                    {b.text}
                  </VscodeBadge>
                ))}
              </span>
            )}
          </div>
      </div>
      <div className="setting-item-control" data-control-id={id}>
        {children}
        {actions && actions.length > 0 && (
          <div className="setting-item-actions">
            {actions.map(a => (
              <VscodeButton
                key={a.id}
                title={a.title || a.label}
                onClick={(e: any) => {
                  e.stopPropagation();
                  a.onClick(a.id);
                }}
                disabled={a.disabled}
              >
                {a.icon && <VscodeIcon slot="content-before" name={a.icon}></VscodeIcon>}
                {a.variant !== 'icon' && (a.label || a.title)}
              </VscodeButton>
            ))}
          </div>
        )}
        {error && <div className="error-row"><VscodeIcon name="error" /><span>{error}</span></div>}
      </div>

      <style>{`
        .setting-item-row {
          display: grid;
          grid-template-columns: minmax(220px, 30%) 1fr;
          gap: 16px;
          align-items: flex-start;
          padding: 8px 6px;
          border-radius: 4px;
          cursor: default;
        }
        .setting-item-row:hover { background: var(--setting-hover); }
        .setting-item-row.is-selected { background: var(--setting-selected); box-shadow: inset 0 0 0 1px var(--vscode-editorWidget-border, var(--vscode-editorWidget.border)); }
        .setting-item-label { display:flex; flex-direction:column; gap:4px; }
        .setting-item-label .label-text { font-weight:500; display:flex; gap:6px; align-items:center; flex-wrap:wrap; }
        .setting-item-label .label-help { font-size:12px; opacity:0.7; }
        .setting-item-label .badges { display:inline-flex; gap:4px; }
        .setting-item-control { display:flex; align-items:center; gap:8px; }
        .setting-item-actions { display:flex; gap:6px; margin-left:8px; }
        .error-row { display:flex; align-items:center; gap:4px; color: var(--vscode-errorForeground); font-size:11px; }

        /* Badge variants using subtle filled styles (no border box) */
        .badge-info { color: var(--vscode-editorInfo-foreground, var(--vscode-editorInfo.foreground)); }
        .badge-warning { color: var(--vscode-editorWarning-foreground, var(--vscode-editorWarning.foreground)); }
        .badge-error { color: var(--vscode-editorError-foreground, var(--vscode-editorError.foreground)); }
        .badge-success { color: var(--vscode-charts-green, var(--vscode-charts.green)); }
        .badge-info::part(control) { background: color-mix(in srgb, currentColor 15%, transparent); border: none; }
        .badge-warning::part(control) { background: color-mix(in srgb, currentColor 15%, transparent); border: none; }
        .badge-error::part(control) { background: color-mix(in srgb, currentColor 15%, transparent); border: none; }
        .badge-success::part(control) { background: color-mix(in srgb, currentColor 15%, transparent); border: none; }
      `}</style>
    </div>
  );
};

export default SettingItem;
