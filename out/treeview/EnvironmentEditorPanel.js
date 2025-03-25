"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentEditorPanel = void 0;
const vscode = require("vscode");
/**
 * WebView panel for adding/editing environments in the main editor area
 */
class EnvironmentEditorPanel {
    static createOrShow(extensionUri, context, environment, onSave) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        // If we already have a panel, show it
        if (EnvironmentEditorPanel.currentPanel) {
            EnvironmentEditorPanel.currentPanel._panel.reveal(column);
            EnvironmentEditorPanel.currentPanel.update(environment);
            EnvironmentEditorPanel.currentPanel._onSave = onSave;
            return;
        }
        // Otherwise, create a new panel
        const panel = vscode.window.createWebviewPanel('maximoEnvironmentEditor', environment ? `Edit Environment: ${environment.name}` : 'Add New Maximo Environment', column || vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [extensionUri]
        });
        EnvironmentEditorPanel.currentPanel = new EnvironmentEditorPanel(panel, extensionUri, context, environment, onSave);
    }
    constructor(panel, _extensionUri, _context, _environment, _onSave) {
        this._extensionUri = _extensionUri;
        this._context = _context;
        this._environment = _environment;
        this._onSave = _onSave;
        this._disposables = [];
        this._panel = panel;
        // Set the webview's initial html content
        this._update();
        // Listen for when the panel is disposed
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(message => {
            switch (message.type) {
                case 'save':
                    if (this._onSave) {
                        // If editing, maintain the ID
                        if (this._environment && this._environment.id) {
                            message.environment.id = this._environment.id;
                        }
                        this._onSave(message.environment);
                    }
                    this._panel.dispose();
                    break;
                case 'cancel':
                    this._panel.dispose();
                    break;
                case 'showError':
                    vscode.window.showErrorMessage(message.message);
                    break;
            }
        }, null, this._disposables);
    }
    dispose() {
        EnvironmentEditorPanel.currentPanel = undefined;
        // Clean up resources
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
    update(environment) {
        this._environment = environment;
        this._update();
    }
    _update() {
        const webview = this._panel.webview;
        this._panel.title = this._environment
            ? `Edit Environment: ${this._environment.name}`
            : 'Add New Maximo Environment';
        webview.html = this._getHtmlForWebview();
    }
    _getHtmlForWebview() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Maximo Environment</title>
            <style>
                body {
                    font-family: var(--vscode-font-family);
                    color: var(--vscode-foreground);
                    background-color: var(--vscode-editor-background);
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .form-container {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .form-row {
                    display: flex;
                    gap: 16px;
                }
                .form-row .form-group {
                    flex: 1;
                }
                input, select {
                    background-color: var(--vscode-input-background);
                    color: var(--vscode-input-foreground);
                    border: 1px solid var(--vscode-input-border);
                    padding: 8px;
                    border-radius: 4px;
                }
                input.required {
                    border-left: 3px solid var(--vscode-editorError-foreground);
                }
                .checkbox-group {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .radio-group {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 8px;
                }
                .password-field {
                    position: relative;
                }
                .password-toggle {
                    position: absolute;
                    right: 8px;
                    top: 8px;
                    cursor: pointer;
                    user-select: none;
                }
                button {
                    background-color: var(--vscode-button-background);
                    color: var(--vscode-button-foreground);
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: var(--vscode-button-hoverBackground);
                }
                .button-container {
                    display: flex;
                    justify-content: flex-end;
                    gap: 8px;
                    margin-top: 16px;
                }
                h2 {
                    margin-top: 0;
                    border-bottom: 1px solid var(--vscode-panel-border);
                    padding-bottom: 8px;
                }
                .required-label::after {
                    content: " *";
                    color: var(--vscode-editorError-foreground);
                }
                /* Fix for radio button alignment */
                .radio-container {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .radio-group input[type="radio"] {
                    margin: 0;
                }
            </style>
        </head>
        <body>
            <div class="form-container">
                <h2>${this._environment ? 'Edit Maximo Environment' : 'Add New Maximo Environment'}</h2>
                
                <div class="form-group">
                    <label for="envName" class="required-label">Environment Name</label>
                    <input type="text" id="envName" class="required" placeholder="Production, Development, etc." value="${((_a = this._environment) === null || _a === void 0 ? void 0 : _a.name) || ''}">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="hostname" class="required-label">Hostname / IP</label>
                        <input type="text" id="hostname" class="required" placeholder="10.10.12.12 or www.example.com" value="${((_b = this._environment) === null || _b === void 0 ? void 0 : _b.hostname) || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label for="port">Port</label>
                        <input type="number" id="port" placeholder="9080" value="${((_c = this._environment) === null || _c === void 0 ? void 0 : _c.port) || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label for="httpProtocol">HTTP Protocol</label>
                        <select id="httpProtocol">
                            <option value="http" ${((_d = this._environment) === null || _d === void 0 ? void 0 : _d.httpProtocol) === 'http' ? 'selected' : ''}>HTTP</option>
                            <option value="https" ${((_e = this._environment) === null || _e === void 0 ? void 0 : _e.httpProtocol) === 'https' ? 'selected' : ''}>HTTPS</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="authType">Authentication Type</label>
                    <select id="authType">
                        <option value="internal" ${((_f = this._environment) === null || _f === void 0 ? void 0 : _f.authenticationType) === 'internal' ? 'selected' : ''}>Internal</option>
                        <option value="ldap" ${((_g = this._environment) === null || _g === void 0 ? void 0 : _g.authenticationType) === 'ldap' ? 'selected' : ''}>LDAP</option>
                        <option value="apikey" ${((_h = this._environment) === null || _h === void 0 ? void 0 : _h.authenticationType) === 'apikey' ? 'selected' : ''}>API Key</option>
                    </select>
                </div>
                
                <div id="credentialsContainer" style="${((_j = this._environment) === null || _j === void 0 ? void 0 : _j.authenticationType) === 'apikey' ? 'display: none;' : ''}">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="username" class="username-label">Username</label>
                            <input type="text" id="username" class="username-input" placeholder="maxadmin" value="${((_k = this._environment) === null || _k === void 0 ? void 0 : _k.username) || ''}">
                        </div>
                        
                        <div class="form-group">
                            <label for="password" class="password-label">Password</label>
                            <div class="password-field">
                                <input type="password" id="password" class="password-input" placeholder="maxadmin" value="${((_l = this._environment) === null || _l === void 0 ? void 0 : _l.password) || ''}">
                                <span class="password-toggle" id="passwordToggle">👁️</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="apikeyContainer" class="form-group" style="${((_m = this._environment) === null || _m === void 0 ? void 0 : _m.authenticationType) !== 'apikey' ? 'display: none;' : ''}">
                    <label for="apikey" class="apikey-label">API Key</label>
                    <input type="text" id="apikey" class="apikey-input" placeholder="Your API Key" value="${((_o = this._environment) === null || _o === void 0 ? void 0 : _o.apikey) || ''}" style="width: 100%;">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="objectStructure">Object Structure</label>
                        <input type="text" id="objectStructure" placeholder="MXSCRIPT" value="${((_p = this._environment) === null || _p === void 0 ? void 0 : _p.objectStructure) || 'MXSCRIPT'}">
                    </div>
                    
                    <div class="form-group">
                        <label for="logLevel">Log Level</label>
                        <select id="logLevel">
                            <option value="DEBUG" ${((_q = this._environment) === null || _q === void 0 ? void 0 : _q.logLevel) === 'DEBUG' ? 'selected' : ''}>DEBUG</option>
                            <option value="INFO" ${((_r = this._environment) === null || _r === void 0 ? void 0 : _r.logLevel) === 'INFO' ? 'selected' : ''}>INFO</option>
                            <option value="WARN" ${((_s = this._environment) === null || _s === void 0 ? void 0 : _s.logLevel) === 'WARN' ? 'selected' : ''}>WARN</option>
                            <option value="ERROR" ${((_t = this._environment) === null || _t === void 0 ? void 0 : _t.logLevel) === 'ERROR' ? 'selected' : ''}>ERROR</option>
                            <option value="FATAL" ${((_u = this._environment) === null || _u === void 0 ? void 0 : _u.logLevel) === 'FATAL' ? 'selected' : ''}>FATAL</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="checkbox-group">
                        <input type="checkbox" id="createPythonFile" ${((_v = this._environment) === null || _v === void 0 ? void 0 : _v.createPythonFileForJythonScripts) ? 'checked' : ''}>
                        <label for="createPythonFile">Create Python file for Jython scripts</label>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="ignoreSsl" ${((_w = this._environment) === null || _w === void 0 ? void 0 : _w.ignoreSslErrors) ? 'checked' : ''}>
                        <label for="ignoreSsl">Ignore SSL errors</label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Environment Scope</label>
                    <div class="radio-group">
                        <input type="radio" id="scopeGlobal" name="scope" value="global" ${!this._environment || this._environment.scope === 'global' ? 'checked' : ''}>
                        <label for="scopeGlobal">Global (Available in all workspaces)</label>
                    </div>
                    <div class="radio-group">
                        <input type="radio" id="scopeWorkspace" name="scope" value="workspace" ${((_x = this._environment) === null || _x === void 0 ? void 0 : _x.scope) === 'workspace' ? 'checked' : ''}>
                        <label for="scopeWorkspace">Workspace (Only in this workspace)</label>
                    </div>
                </div>
                
                <div class="button-container">
                    <button id="cancelBtn">Cancel</button>
                    <button id="saveBtn">Save</button>
                </div>
            </div>
            
            <script>
                (function() {
                    const vscode = acquireVsCodeApi();
                    
                    // DOM Elements
                    const authType = document.getElementById('authType');
                    const credentialsContainer = document.getElementById('credentialsContainer');
                    const apikeyContainer = document.getElementById('apikeyContainer');
                    const passwordToggle = document.getElementById('passwordToggle');
                    const passwordField = document.getElementById('password');
                    const saveBtn = document.getElementById('saveBtn');
                    const cancelBtn = document.getElementById('cancelBtn');
                    
                    // Event Listeners
                    authType.addEventListener('change', toggleAuthFields);
                    saveBtn.addEventListener('click', saveEnvironment);
                    cancelBtn.addEventListener('click', () => {
                        vscode.postMessage({ type: 'cancel' });
                    });
                    
                    if (passwordToggle) {
                        passwordToggle.addEventListener('click', () => {
                            if (passwordField.type === 'password') {
                                passwordField.type = 'text';
                                passwordToggle.textContent = '🔒';
                            } else {
                                passwordField.type = 'password';
                                passwordToggle.textContent = '👁️';
                            }
                        });
                    }
                    
                    function toggleAuthFields() {
                        const authTypeValue = document.getElementById('authType').value;
                        
                        if (authTypeValue === 'apikey') {
                            credentialsContainer.style.display = 'none';
                            apikeyContainer.style.display = 'block';
                            
                            // Make API key required and reset credentials
                            document.querySelector('.apikey-label').classList.add('required-label');
                            document.querySelector('.apikey-input').classList.add('required');
                            
                            document.querySelector('.username-label')?.classList.remove('required-label');
                            document.querySelector('.username-input')?.classList.remove('required');
                            document.querySelector('.password-label')?.classList.remove('required-label');
                            document.querySelector('.password-input')?.classList.remove('required');
                        } else {
                            credentialsContainer.style.display = 'block';
                            apikeyContainer.style.display = 'none';
                            
                            // Make username and password required, reset API key
                            document.querySelector('.username-label').classList.add('required-label');
                            document.querySelector('.username-input').classList.add('required');
                            document.querySelector('.password-label').classList.add('required-label');
                            document.querySelector('.password-input').classList.add('required');
                            
                            document.querySelector('.apikey-label')?.classList.remove('required-label');
                            document.querySelector('.apikey-input')?.classList.remove('required');
                        }
                    }
                    
                    function saveEnvironment() {
                        const environment = {
                            name: document.getElementById('envName').value,
                            hostname: document.getElementById('hostname').value,
                            port: parseInt(document.getElementById('port').value, 10),
                            httpProtocol: document.getElementById('httpProtocol').value,
                            authenticationType: document.getElementById('authType').value,
                            username: document.getElementById('username')?.value || '',
                            password: document.getElementById('password')?.value || '',
                            apikey: document.getElementById('apikey')?.value || '',
                            objectStructure: document.getElementById('objectStructure').value,
                            logLevel: document.getElementById('logLevel').value,
                            createPythonFileForJythonScripts: document.getElementById('createPythonFile').checked,
                            ignoreSslErrors: document.getElementById('ignoreSsl').checked,
                            scope: document.querySelector('input[name="scope"]:checked')?.value || 'global'
                        };
                        
                        // Validate required fields
                        if (!environment.name) {
                            vscode.postMessage({ 
                                type: 'showError', 
                                message: 'Environment name is required'
                            });
                            return;
                        }
                        
                        if (!environment.hostname) {
                            vscode.postMessage({ 
                                type: 'showError', 
                                message: 'Hostname is required'
                            });
                            return;
                        }
                        
                        // Validate auth-specific fields
                        if (environment.authenticationType === 'apikey') {
                            if (!environment.apikey) {
                                vscode.postMessage({ 
                                    type: 'showError', 
                                    message: 'API key is required when using API key authentication'
                                });
                                return;
                            }
                        } else {
                            if (!environment.username) {
                                vscode.postMessage({ 
                                    type: 'showError', 
                                    message: 'Username is required'
                                });
                                return;
                            }
                            
                            if (!environment.password) {
                                vscode.postMessage({ 
                                    type: 'showError', 
                                    message: 'Password is required'
                                });
                                return;
                            }
                        }
                        
                        vscode.postMessage({ 
                            type: 'save', 
                            environment: environment
                        });
                    }
                    
                    // Initialize form state
                    toggleAuthFields();
                })();
            </script>
        </body>
        </html>`;
    }
}
exports.EnvironmentEditorPanel = EnvironmentEditorPanel;
//# sourceMappingURL=EnvironmentEditorPanel.js.map