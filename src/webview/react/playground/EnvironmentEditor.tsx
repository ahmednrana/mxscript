import React from 'react';
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
  VscodeFormContainer,
  VscodeContextMenu,
  VscodeToolbarButton,
  VscodeTreeItem,
  VscodeTree
} from '@vscode-elements/react-elements';

export const EnvironmentEditor: React.FC = () => {
  return (
    <div>
      <VscodeFormContainer>
        <VscodeTextfield label="Hostname" placeholder="https://mymaximo.example.com" required />
        <VscodeTextfield label="Port" placeholder="443" type="number" />
        <VscodeTextfield label="HTTP Protocol" placeholder="https" />
        <VscodeTextfield label="Authentication Type" placeholder="apikey" />
        <VscodeTextfield label="API Key" placeholder="your-api-key" type="password" />
        <VscodeTextfield label="Username" placeholder="your-username" />
        <VscodeTextfield label="Password" placeholder="your-password" type="password" />
        <VscodeCheckbox>Ignore SSL Errors</VscodeCheckbox>
        <VscodeButton >Save Environment</VscodeButton>
        <p>
          <VscodeTextfield placeholder="Type something">
            <VscodeBadge slot="content-after">308 Settings Found</VscodeBadge>
            <VscodeIcon
              slot="content-after"
              name="clear-all"
              title="clear-all"
              action-icon
            ></VscodeIcon>
            <VscodeIcon
              slot="content-after"
              name="filter"
              action-icon
            ></VscodeIcon>
          </VscodeTextfield>
        </p>
        <p>
          <VscodeTextfield placeholder="Type something">
            <VscodeIcon
              slot="content-before"
              name="search"
              title="search"
            ></VscodeIcon>
          </VscodeTextfield>
        </p>

      </VscodeFormContainer>
      {/* <VscodeTree>
        <VscodeTreeItem open>
          <div class="file">
            <VscodeIcon name="file"></VscodeIcon>
            <div class="filename">tsconfig.json</div>
            <VscodeBadge variant="counter">2</VscodeBadge>
          </div>
          <VscodeTreeItem>
            <div class="message">
              <div class="actions">
                <VscodeIcon name="error"></VscodeIcon>
              </div>
              <div class="message-details">
                <div class="message-line">
                  <span class="message-raw"
                  >Cannot find type definition file for 'mocha'.</span
                  >
                  <div class="message-error-code">ts</div>
                  <div class="message-location">[Ln 1, Col 1]</div>
                  <div class="action-bar">
                    <VscodeToolbarButton
                      icon="chevron-down"
                      class="toggle-button open"></VscodeToolbarButton>
                  </div>
                </div>
                <div class="toggleable open">
                  <div class="message-line">
                    <span class="message-raw"
                    >&nbsp;&nbsp;The file is in the program because:</span
                    >
                  </div>
                  <div class="message-line">
                    <span class="message-raw"
                    >&nbsp;&nbsp;&nbsp;&nbsp;Entry point of type library 'mocha'
                      specified in compilerOptions</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </VscodeTreeItem>
          <VscodeTreeItem>
            <div class="message">
              <div class="actions">
                <VscodeIcon name="error"></VscodeIcon>
              </div>
              <div class="message-details">
                <div class="message-line">
                  <span class="message-raw"
                  >Cannot find type definition file for 'user-agent-data-types'.</span
                  >
                  <div class="message-error-code">ts</div>
                  <div class="message-location">[Ln 1, Col 1]</div>
                  <div class="action-bar">
                    <VscodeToolbarButton
                      icon="chevron-down"
                      class="toggle-button open"></VscodeToolbarButton>
                  </div>
                </div>
                <div class="toggleable open">
                  <div class="message-line">
                    <span class="message-raw"
                    >&nbsp;&nbsp;The file is in the program because:</span
                    >
                  </div>
                  <div class="message-line">
                    <span class="message-raw"
                    >&nbsp;&nbsp;&nbsp;&nbsp;Entry point of type library
                      'user-agent-data-types' specified in compilerOptions</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </VscodeTreeItem>
        </VscodeTreeItem>
      </VscodeTree> */}
      <VscodeTabs selectedIndex={1}>
        <VscodeTabHeader>Lorem</VscodeTabHeader>
        <VscodeTabPanel>
          <p>
            Lorem ipsum dolor...
          </p>
        </VscodeTabPanel>
        <VscodeTabHeader>
          Ipsum
          <VscodeBadge variant="counter" slot="content-after">2</VscodeBadge>
        </VscodeTabHeader>
        <VscodeTabPanel>
          <p>
            Aliquam malesuada rhoncus nulla...
          </p>
        </VscodeTabPanel>
        <VscodeTabHeader>Dolor</VscodeTabHeader>
        <VscodeTabPanel>
          <p>
            Nulla facilisi. Vivamus...
          </p>
        </VscodeTabPanel>
      </VscodeTabs>
      textfareas
      <VscodeTextarea monospace></VscodeTextarea>
      <VscodeTextarea></VscodeTextarea>
      textfields
      <VscodeTextfield></VscodeTextfield>
      <p>
        <VscodeTextfield placeholder="Type something">
          <VscodeBadge slot="content-after">308 Settings Found</VscodeBadge>
          <VscodeIcon
            slot="content-after"
            name="clear-all"
            title="clear-all"
            action-icon
          ></VscodeIcon>
          <VscodeIcon
            slot="content-after"
            name="filter"
            action-icon
          ></VscodeIcon>
        </VscodeTextfield>
      </p>
      <p>
        <VscodeTextfield placeholder="Type something">
          <VscodeIcon
            slot="content-before"
            name="search"
            title="search"
          ></VscodeIcon>
        </VscodeTextfield>
      </p>


    </div>
  );
};
