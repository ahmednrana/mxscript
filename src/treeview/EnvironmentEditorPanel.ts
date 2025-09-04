import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { MaximoEnvironment } from '../webview/EnvironmentManager';
import { MaximoClient, MaximoClientConfig, AuthType, LogLevel } from 'maximo-api-client'; // Added
import { convertAuthType, getLogLevel } from '../utils/utils'; // Added

/**
 * WebView panel for adding/editing environments in the main editor area
 */
export class EnvironmentEditorPanel {
    public static currentPanel: EnvironmentEditorPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(
        extensionUri: vscode.Uri,
        context: vscode.ExtensionContext,
        environment?: MaximoEnvironment,
        onSave?: (environment: MaximoEnvironment) => void
    ): void {
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
        const panel = vscode.window.createWebviewPanel(
            'maximoEnvironmentEditor',
            environment ? `Edit Environment: ${environment.name}` : 'Add New Maximo Environment',
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
                localResourceRoots: [extensionUri]
            }
        );

        EnvironmentEditorPanel.currentPanel = new EnvironmentEditorPanel(panel, extensionUri, context, environment, onSave);
    }

    private constructor(
        panel: vscode.WebviewPanel,
        private readonly _extensionUri: vscode.Uri,
        private readonly _context: vscode.ExtensionContext,
        private _environment?: MaximoEnvironment,
        private _onSave?: (environment: MaximoEnvironment) => void
    ) {
        this._panel = panel;

        // Set the webview's initial html content
        this._update();

        // Listen for when the panel is disposed
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(
            message => {
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
                    case 'verifySettings':
                        // Show a temporary message in the webview
                        this._panel.webview.postMessage({
                            type: 'verificationResult',
                            success: null, // Indicates processing
                            message: 'Verifying settings...'
                        });
                        this._verifySettings(message.environment).then(result => {
                            this._panel.webview.postMessage({
                                type: 'verificationResult',
                                ...result
                            });
                        }).catch(error => { // Should not happen if _verifySettings handles its errors
                            vscode.window.showErrorMessage(`Unexpected error during verification: ${error.message}`);
                        });
                        break;

                }
            },
            null,
            this._disposables
        );
    }

    public dispose() {
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

    public update(environment?: MaximoEnvironment) {
        this._environment = environment;
        this._update();
    }

    private _update() {
        const webview = this._panel.webview;
        this._panel.title = this._environment
            ? `Edit Environment: ${this._environment.name}`
            : 'Add New Maximo Environment';
        webview.html = this._getHtmlForWebview();
    }

    private async _verifySettings(environmentData: MaximoEnvironment): Promise<{ success: boolean, message: string }> {
        try {
            const clientConfig: MaximoClientConfig = {
                baseUrl: environmentData.hostname,
                port: Number(environmentData.port),
                ssl: environmentData.httpProtocol === 'https',
                authType: convertAuthType(environmentData.authenticationType),
                userName: environmentData.username,
                password: environmentData.password,
                apiKey: environmentData.apikey,
                logLevel: getLogLevel(environmentData.logLevel),
                leanMode: true,
                autoAuthenticate: true,
                rejectUnauthorized: !environmentData.ignoreSslErrors,
                autoscriptObjectStructure: environmentData.objectStructure,
                ca: environmentData.sslcertificate ? environmentData.sslcertificate : undefined,
            };

            const client = new MaximoClient(clientConfig);
            // Attempt to get whoami info, which also implies successful authentication
            const whoamiResponse = await client.oslcInfoService.getWhoAmI();

            return {
                success: true,
                message: `Verification successful. Connected as: ${whoamiResponse.displayName || whoamiResponse.loginID}`
            };
        } catch (error: any) {
            let errorMessage = 'Verification failed.';
            if (error.message) {
                errorMessage = `Verification failed: ${error.message}`;
            }
            else if (error.code) {
                errorMessage = `Verification failed: ${error.code}`;
            }
            return { success: false, message: errorMessage };
        }
    }

    private _getHtmlForWebview(): string {
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
                input.required-valid {
                    border-left: 3px solid var(--vscode-editor-background);
                    border: 1px solid var(--vscode-input-border);
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
                    <input type="text" id="envName" class="required" placeholder="Production, Development, etc." value="${this._environment?.name || ''}">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="hostname" class="required-label">Hostname / IP</label>
                        <input type="text" id="hostname" class="required" placeholder="10.10.12.12 or www.example.com" value="${this._environment?.hostname || ''}">
                    </div>
                    
                    <div class="form-group">
                        <label for="port">Port</label>
                        <input type="number" id="port" placeholder="443" value="${this._environment ? this._environment.port : '443'}">
                    </div>
                    
                    <div class="form-group">
                        <label for="httpProtocol">HTTP Protocol</label>
                        <select id="httpProtocol">
                            <option value="http" ${this._environment?.httpProtocol === 'http' ? 'selected' : ''}>HTTP</option>
                            <option value="https" ${!this._environment || this._environment?.httpProtocol === 'https' ? 'selected' : ''}>HTTPS</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="authType">Authentication Type</label>
                    <select id="authType">
                        <option value="apikey" ${this._environment?.authenticationType === 'apikey' || !this._environment ? 'selected' : ''}>API Key</option>
                        <option value="internal" ${this._environment?.authenticationType === 'internal' ? 'selected' : ''}>Internal</option>
                        <option value="ldap" ${this._environment?.authenticationType === 'ldap' ? 'selected' : ''}>LDAP</option>
                    </select>
                </div>
                
                <div id="credentialsContainer" style="${this._environment?.authenticationType === 'apikey' ? 'display: none;' : ''}">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="username" class="username-label">Username</label>
                            <input type="text" id="username" class="username-input" placeholder="maxadmin" value="${this._environment?.username || ''}">
                        </div>
                        
                        <div class="form-group">
                            <label for="password" class="password-label">Password</label>
                            <div class="password-field">
                                <input type="password" id="password" class="password-input" placeholder="maxadmin" value="${this._environment?.password || ''}">
                                <span class="password-toggle" id="passwordToggle">👁️</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="apikeyContainer" class="form-group" style="${this._environment?.authenticationType !== 'apikey' ? 'display: none;' : ''}">
                    <label for="apikey" class="apikey-label">API Key</label>
                    <input type="text" id="apikey" class="apikey-input" placeholder="Your API Key" value="${this._environment?.apikey || ''}">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="objectStructure">Script Object Structure</label>
                        <input type="text" id="objectStructure" placeholder="MXSCRIPT" value="${this._environment ? this._environment.objectStructure : 'MXSCRIPT'}">
                    </div>
                    
                    <div class="form-group">
                        <label for="appxmlObjectStructure">App XML Object Structure</label>
                        <input type="text" id="appxmlObjectStructure" placeholder="MXL_APPS" value="${this._environment ? this._environment.appxml_objectStructure : 'MXL_APPS'}">
                    </div>
                    
                    <div class="form-group">
                        <label for="logLevel">Log Level</label>
                        <select id="logLevel">
                            <option value="DEBUG" ${this._environment?.logLevel === 'DEBUG' ? 'selected' : ''}>DEBUG</option>
                            <option value="INFO" ${this._environment?.logLevel === 'INFO' ? 'selected' : ''}>INFO</option>
                            <option value="WARN" ${this._environment?.logLevel === 'WARN' ? 'selected' : ''}>WARN</option>
                            <option value="ERROR" ${this._environment?.logLevel === 'ERROR' ? 'selected' : ''}>ERROR</option>
                            <option value="FATAL" ${this._environment?.logLevel === 'FATAL' ? 'selected' : ''}>FATAL</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="checkbox-group">
                        <input type="checkbox" id="createPythonFile" ${this._environment ? this._environment.createPythonFileForJythonScripts ? 'checked' : '' : 'checked'}>
                        <label for="createPythonFile">Create Python file for Jython scripts</label>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="ignoreSsl" ${this._environment ? this._environment.ignoreSslErrors ? 'checked' : '' : 'checked'}>
                        <label for="ignoreSsl">Ignore SSL errors</label>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="formatXmlOnDownload" ${this._environment ? (this._environment.formatXmlOnDownloadAndCompare !== false ? 'checked' : '') : 'checked'}>
                        <label for="formatXmlOnDownload">Format XML on download and compare</label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="sslcertificate">SSL Certificate (PEM format)</label>
                    <textarea id="sslcertificate" rows="3" style="resize:vertical; overflow:auto;" placeholder="Paste PEM certificate here">${this._environment?.sslcertificate || ''}</textarea>
                </div>

                <div class="form-group">
                    <label>Environment Scope</label>
                    <div class="radio-group">
                        <input type="radio" id="scopeGlobal" name="scope" value="global" ${!this._environment || this._environment.scope === 'global' ? 'checked' : ''}>
                        <label for="scopeGlobal">Global (Available in all workspaces)</label>
                    </div>
                    <div class="radio-group">
                        <input type="radio" id="scopeWorkspace" name="scope" value="workspace" ${this._environment?.scope === 'workspace' ? 'checked' : ''}>
                        <label for="scopeWorkspace">Workspace (Only in this workspace)</label>
                    </div>
                </div>
                
                <div class="button-container">
                    <div id="verificationResultDisplay" style="margin-right: auto; padding-top: 8px;"></div>
                    <button id="cancelBtn">Cancel</button>
                    <button id="verifyBtn">Verify Settings</button>
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
                    const verifyBtn = document.getElementById('verifyBtn'); // New button
                    const verificationResultDisplay = document.getElementById('verificationResultDisplay'); // Display area
                    const cancelBtn = document.getElementById('cancelBtn');
                    const envName = document.getElementById('envName');
                    const hostname = document.getElementById('hostname');
                    const username = document.getElementById('username');
                    const apikey = document.getElementById('apikey');
                    
                    // Event Listeners
                    authType.addEventListener('change', toggleAuthFields);
                    saveBtn.addEventListener('click', saveEnvironment);
                    verifyBtn.addEventListener('click', verifyCurrentSettings); // Listener for new button
                    cancelBtn.addEventListener('click', () => {
                        vscode.postMessage({ type: 'cancel' });
                    });
                    
                    // Add input validation on keyup events
                    envName.addEventListener('input', validateField);
                    hostname.addEventListener('input', validateField);
                    username?.addEventListener('input', validateField);
                    passwordField?.addEventListener('input', validateField);
                    apikey?.addEventListener('input', validateField);
                    
                    // Run validation on load to set initial state
                    validateAllFields();
                    
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

                    // Listen for messages from the extension
                    window.addEventListener('message', event => {
                        const message = event.data;
                        if (message.type === 'verificationResult') {
                            verificationResultDisplay.textContent = message.message;
                            if (message.success === true) {
                                verificationResultDisplay.style.color = 'var(--vscode-terminal-ansiGreen)';
                            } else if (message.success === false) {
                                verificationResultDisplay.style.color = 'var(--vscode-terminal-ansiRed)';
                            } else { // Still processing
                                verificationResultDisplay.style.color = 'var(--vscode-foreground)';
                            }
                        }
                    });

                    
                    function toggleAuthFields() {
                        const authTypeValue = document.getElementById('authType').value;
                        
                        if (authTypeValue === 'apikey') {
                            credentialsContainer.style.display = 'none';
                            apikeyContainer.style.display = 'block';
                            
                            // Make API key required and reset credentials
                            document.querySelector('.apikey-label').classList.add('required-label');
                            document.querySelector('.apikey-input').classList.add(apikey.value ? 'required-valid' : 'required');
                            
                            document.querySelector('.username-label')?.classList.remove('required-label');
                            document.querySelector('.username-input')?.classList.remove('required');
                            document.querySelector('.username-input')?.classList.remove('required-valid');
                            document.querySelector('.password-label')?.classList.remove('required-label');
                            document.querySelector('.password-input')?.classList.remove('required');
                            document.querySelector('.password-input')?.classList.remove('required-valid');
                        } else {
                            credentialsContainer.style.display = 'block';
                            apikeyContainer.style.display = 'none';
                            
                            // Make username and password required, reset API key
                            document.querySelector('.username-label').classList.add('required-label');
                            document.querySelector('.username-input').classList.add(username.value ? 'required-valid' : 'required');
                            document.querySelector('.password-label').classList.add('required-label');
                            document.querySelector('.password-input').classList.add(passwordField.value ? 'required-valid' : 'required');
                            
                            document.querySelector('.apikey-label')?.classList.remove('required-label');
                            document.querySelector('.apikey-input')?.classList.remove('required');
                            document.querySelector('.apikey-input')?.classList.remove('required-valid');
                        }
                        
                        validateAllFields();
                    }
                    
                    function validateField(event) {
                        const input = event.target;
                        if (input.classList.contains('required') || input.classList.contains('required-valid')) {
                            if (input.value) {
                                input.classList.remove('required');
                                input.classList.add('required-valid');
                            } else {
                                input.classList.remove('required-valid');
                                input.classList.add('required');
                            }
                        }
                    }
                    
                    function validateAllFields() {
                        // Check environment name
                        if (envName.value) {
                            envName.classList.remove('required');
                            envName.classList.add('required-valid');
                        } else {
                            envName.classList.remove('required-valid');
                            envName.classList.add('required');
                        }
                        
                        // Check hostname
                        if (hostname.value) {
                            hostname.classList.remove('required');
                            hostname.classList.add('required-valid');
                        } else {
                            hostname.classList.remove('required-valid');
                            hostname.classList.add('required');
                        }
                        
                        // Check auth type specific fields
                        const authTypeValue = authType.value;
                        
                        if (authTypeValue === 'apikey') {
                            if (apikey.value) {
                                apikey.classList.remove('required');
                                apikey.classList.add('required-valid');
                            } else {
                                apikey.classList.remove('required-valid');
                                apikey.classList.add('required');
                            }
                        } else {
                            if (username.value) {
                                username.classList.remove('required');
                                username.classList.add('required-valid');
                            } else {
                                username.classList.remove('required-valid');
                                username.classList.add('required');
                            }
                            
                            if (passwordField.value) {
                                passwordField.classList.remove('required');
                                passwordField.classList.add('required-valid');
                            } else {
                                passwordField.classList.remove('required-valid');
                                passwordField.classList.add('required');
                            }
                        }
                    }

                    function getFormData() {
                        return {
                            name: document.getElementById('envName').value,
                            hostname: document.getElementById('hostname').value,
                            port: parseInt(document.getElementById('port').value, 10) || 0,
                            httpProtocol: document.getElementById('httpProtocol').value,
                            authenticationType: document.getElementById('authType').value,
                            username: document.getElementById('username')?.value || '',
                            password: document.getElementById('password')?.value || '',
                            apikey: document.getElementById('apikey')?.value || '',
                            objectStructure: document.getElementById('objectStructure').value,
                            appxml_objectStructure: document.getElementById('appxmlObjectStructure').value,
                            logLevel: document.getElementById('logLevel').value,
                            createPythonFileForJythonScripts: document.getElementById('createPythonFile').checked,
                            ignoreSslErrors: document.getElementById('ignoreSsl').checked,
                            formatXmlOnDownloadAndCompare: document.getElementById('formatXmlOnDownload').checked,
                            scope: document.querySelector('input[name="scope"]:checked')?.value || 'global',
                            sslcertificate: document.getElementById('sslcertificate')?.value || ''
                        };
                    }

                    function verifyCurrentSettings() {
                        vscode.postMessage({ type: 'verifySettings', environment: getFormData() });
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
                            appxml_objectStructure: document.getElementById('appxmlObjectStructure').value,
                            logLevel: document.getElementById('logLevel').value,
                            createPythonFileForJythonScripts: document.getElementById('createPythonFile').checked,
                            ignoreSslErrors: document.getElementById('ignoreSsl').checked,
                            formatXmlOnDownloadAndCompare: document.getElementById('formatXmlOnDownload').checked,
                            scope: document.querySelector('input[name="scope"]:checked')?.value || 'global',
                            sslcertificate: document.getElementById('sslcertificate')?.value || ''
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