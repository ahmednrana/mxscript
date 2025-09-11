import React, { useState } from 'react';
import {
  VscodeButton,
  VscodeBadge,
  VscodeIcon,
  VscodeCheckbox,
  VscodeTextfield,
  VscodeTextarea,
  VscodeTabs,
  VscodeTabHeader,
  VscodeTabPanel,
  VscodeCollapsible,
  VscodeTable,
  VscodeTableHeader,
  VscodeTableHeaderCell,
  VscodeTableBody,
  VscodeTableRow,
  VscodeTableCell,
} from '@vscode-elements/react-elements';

export const PageThree: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState('');
  const [area, setArea] = useState('');
  const [activeTab, setActiveTab] = useState('tab-1');

  return (
    <div style={{ padding: 12, fontFamily: 'var(--vscode-font-family)' }}>
      <h2 style={{ marginTop: 0 }}>Playground — Page Three (vscode-elements demo)</h2>
      <p>This page demos a selection of components from <code>@vscode-elements/react-elements</code>.</p>

      <section style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <VscodeButton onClick={() => alert('Primary clicked')}>Primary Button</VscodeButton>
        <VscodeButton onClick={() => alert('Secondary clicked')} secondary>Secondary</VscodeButton>
        <VscodeBadge variant="counter">42</VscodeBadge>
        <VscodeIcon name="debug-start" size={18} />
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>Form controls</h3>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <VscodeCheckbox checked={checked} onChange={(e:any) => setChecked(e.target?.checked ?? !checked)}>
            Enable option
          </VscodeCheckbox>
          <VscodeTextfield value={text} placeholder="Type something" onInput={(e:any) => setText(e.target?.value ?? '')} />
        </div>
        <div style={{ marginTop: 8 }}>
          <VscodeTextarea value={area} placeholder="Multiline" onInput={(e:any) => setArea(e.target?.value ?? '')} rows={4} />
        </div>
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>Tabs</h3>
        <div>
          {/* Use the react wrappers for tabs + headers + panels */}
          <VscodeTabs {...({ 'selected-index': 0 } as any)} onVscTabsSelect={(e:any) => setActiveTab(String(e.detail?.selectedIndex ?? 0))}>
            <VscodeTabHeader>First</VscodeTabHeader>
            <VscodeTabHeader>Second</VscodeTabHeader>
            <VscodeTabPanel>
              <div style={{ padding: 8 }}>Content for first tab</div>
            </VscodeTabPanel>
            <VscodeTabPanel>
              <div style={{ padding: 8 }}>Content for second tab</div>
            </VscodeTabPanel>
          </VscodeTabs>
        </div>

        <h3 style={{ marginTop: 12 }}>Table</h3>
        <div style={{ height: 200, border: '1px solid var(--vscode-panel-border)', padding: 8 }}>
          <VscodeTable {...({ columns: ['1fr', '2fr', '1fr'], zebra: true } as any)}>
            <VscodeTableHeader>
              <VscodeTableHeaderCell>ID</VscodeTableHeaderCell>
              <VscodeTableHeaderCell>Name</VscodeTableHeaderCell>
              <VscodeTableHeaderCell>State</VscodeTableHeaderCell>
            </VscodeTableHeader>
            <VscodeTableBody>
              <VscodeTableRow>
                <VscodeTableCell>1</VscodeTableCell>
                <VscodeTableCell>Alpha</VscodeTableCell>
                <VscodeTableCell>Online</VscodeTableCell>
              </VscodeTableRow>
              <VscodeTableRow>
                <VscodeTableCell>2</VscodeTableCell>
                <VscodeTableCell>Bravo</VscodeTableCell>
                <VscodeTableCell>Offline</VscodeTableCell>
              </VscodeTableRow>
            </VscodeTableBody>
          </VscodeTable>
        </div>

        <div style={{ marginTop: 12 }}>
          {/* Collapsible demo kept */}
          <VscodeCollapsible {...({ open: true } as any)}>
            <div style={{ padding: 8 }}>
              This is an example of a collapsible section. Use it to hide optional details.
            </div>
          </VscodeCollapsible>
        </div>
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>Current values</h3>
        <pre style={{ background: 'var(--vscode-editorBackground)', padding: 8, color: 'var(--vscode-editor-foreground)' }}>
          {JSON.stringify({ checked, text, area, activeTab }, null, 2)}
        </pre>
      </section>
    </div>
  );
};

export default PageThree;
