import React, { useState } from 'react';
import { VscodeButton, VscodeIcon } from '@vscode-elements/react-elements';

const LANGUAGE_OPTIONS = ['python', 'jython', 'nashorn', 'groovy', 'javascript'];

interface LookupModalProps {
    scriptName: string;
    currentValue: string;
    onApply: (value: string) => void;
    onClose: () => void;
}

/**
 * React modal launched from the in-row Lookup action. Lets the user pick a
 * scripting language value and commit it back to the grid cell.
 */
export function LookupModal({ scriptName, currentValue, onApply, onClose }: LookupModalProps) {
    const [selected, setSelected] = useState(currentValue);

    return (
        <div
            onClick={onClose}
            style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: 360,
                    background: 'var(--vscode-editorWidget-background)',
                    border: '1px solid var(--vscode-widget-border, var(--vscode-panel-border))',
                    borderRadius: 6,
                    padding: 16,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <VscodeIcon {...{ name: 'search' } as any} />
                    <strong>Language Lookup</strong>
                </div>
                <div style={{ color: 'var(--vscode-descriptionForeground)', marginBottom: 12, fontSize: '0.9em' }}>
                    Select a language for <strong>{scriptName}</strong>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
                    {LANGUAGE_OPTIONS.map((opt) => (
                        <label
                            key={opt}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '4px 8px',
                                borderRadius: 4,
                                cursor: 'pointer',
                                background: selected === opt ? 'var(--vscode-list-activeSelectionBackground)' : 'transparent',
                                color: selected === opt ? 'var(--vscode-list-activeSelectionForeground)' : 'inherit'
                            }}
                        >
                            <input
                                type="radio"
                                name="lookup-language"
                                checked={selected === opt}
                                onChange={() => setSelected(opt)}
                            />
                            {opt}
                        </label>
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <VscodeButton {...{ secondary: true, onClick: onClose } as any}>Cancel</VscodeButton>
                    <VscodeButton onClick={() => onApply(selected)}>Apply</VscodeButton>
                </div>
            </div>
        </div>
    );
}
