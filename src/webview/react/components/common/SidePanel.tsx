import React, { useState } from 'react';
import { VscodeIcon } from '@vscode-elements/react-elements';

/* ------------------------------------------------------------------ *
 * Reusable docked side panel with a vertical tab rail.
 *
 * Renders an always-visible rail on the right edge; clicking a tab
 * slides its panel open, clicking the active tab closes it. Drop it
 * next to any content (e.g. a grid) inside a flex row:
 *
 *   <div style={{ display:'flex', flex:1 }}>
 *     <div style={{ flex:1 }}>...grid...</div>
 *     <SidePanel tabs={[
 *       { id:'columns', label:'Columns', icon:'layout-sidebar-right', render:() => <Foo/> },
 *     ]} />
 *   </div>
 * ------------------------------------------------------------------ */

export interface SidePanelTab {
    id: string;
    label: string;
    /** codicon name */
    icon: string;
    render: () => React.ReactNode;
}

interface SidePanelProps {
    tabs: SidePanelTab[];
    /** Width of the opened panel content area. */
    width?: number;
    defaultOpenId?: string | null;
}

export function SidePanel({ tabs, width = 270, defaultOpenId = null }: SidePanelProps) {
    const [activeId, setActiveId] = useState<string | null>(defaultOpenId);
    const active = tabs.find((t) => t.id === activeId) ?? null;

    return (
        <div style={{ display: 'flex', height: '100%', minHeight: 0 }}>
            {active && (
                <div
                    style={{
                        width,
                        flexShrink: 0,
                        minHeight: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: '1px solid var(--vscode-panel-border)',
                        background: 'var(--vscode-sideBar-background, var(--vscode-editorWidget-background))'
                    }}
                >
                    {active.render()}
                </div>
            )}

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderLeft: '1px solid var(--vscode-panel-border)',
                    background: 'var(--vscode-activityBar-background, var(--vscode-sideBar-background))'
                }}
            >
                {tabs.map((tab) => {
                    const isActive = tab.id === activeId;
                    return (
                        <button
                            key={tab.id}
                            title={tab.label}
                            onClick={() => setActiveId((id) => (id === tab.id ? null : tab.id))}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 6,
                                width: 34,
                                padding: '12px 0',
                                border: 'none',
                                borderLeft: isActive
                                    ? '2px solid var(--vscode-focusBorder)'
                                    : '2px solid transparent',
                                cursor: 'pointer',
                                background: isActive
                                    ? 'var(--vscode-tab-activeBackground, var(--vscode-editorWidget-background))'
                                    : 'transparent',
                                color: isActive
                                    ? 'var(--vscode-foreground)'
                                    : 'var(--vscode-activityBar-inactiveForeground, var(--vscode-descriptionForeground))'
                            }}
                        >
                            <VscodeIcon {...{ name: tab.icon } as any} />
                            <span style={{ writingMode: 'vertical-rl', fontSize: 11, letterSpacing: 0.3 }}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
