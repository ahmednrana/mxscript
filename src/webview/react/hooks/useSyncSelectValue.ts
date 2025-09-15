import { useEffect } from 'react';

/**
 * useSyncSelectValue
 * Ensures a custom VS Code <vscode-single-select> (or similar) element living inside a container
 * identified by data-control-id keeps React state in sync when the element fails to emit
 * reliable React-compatible events. It listens to both 'input' and 'change'.
 *
 * @param controlId The data-control-id wrapping the select (same id used for SettingItem id)
 * @param currentValue Current React state value
 * @param onChange Callback to push updated value into React state
 */
export function useSyncSelectValue(controlId: string, currentValue: any, onChange: (val: any) => void) {
  useEffect(() => {
    const selector = `[data-control-id="${controlId}"] vscode-single-select`;
    const el = document.querySelector(selector) as any;
    if (!el) return;

    const sync = () => {
      const val = el.value;
      if (val !== currentValue) {
        onChange(val);
      }
    };

    // Initial sync (handles cases where DOM updated before React handlers fired)
    sync();

    el.addEventListener('change', sync);
    el.addEventListener('input', sync);
    return () => {
      el.removeEventListener('change', sync);
      el.removeEventListener('input', sync);
    };
  }, [controlId, currentValue, onChange]);
}

export default useSyncSelectValue;
