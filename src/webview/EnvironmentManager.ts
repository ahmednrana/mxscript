import * as vscode from 'vscode';

export interface MaximoEnvironment {
    id: string;
    name: string;
    hostname: string;
    port: number;
    httpProtocol: string;
    username: string;
    password: string;
    apikey: string;
    authenticationType: string;
    objectStructure: string;
    createPythonFileForJythonScripts: boolean;
    logLevel: string;
    ignoreSslErrors: boolean;
}

export class EnvironmentManagerWebviewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'mxscript.environmentManager';
    private _view?: vscode.WebviewView;
    private _environments: MaximoEnvironment[] = [];
    private _activeEnvironmentId: string | undefined;

    constructor(
        private readonly _extensionUri: vscode.Uri,
        private readonly _context: vscode.ExtensionContext
    ) {
        // Load saved environments
        this._environments = this._context.globalState.get<MaximoEnvironment[]>('mxscript.environments', []);
        this._activeEnvironmentId = this._context.globalState.get<string>('mxscript.activeEnvironment');
    }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                this._extensionUri
            ]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(data => {
            console.log('Received message from webview:', data.type, data);
            switch (data.type) {
                case 'addEnvironment':
                    this._addEnvironment(data.environment);
                    break;
                case 'updateEnvironment':
                    this._updateEnvironment(data.environment);
                    break;
                case 'deleteEnvironment':
                    console.log('Handling delete request for ID:', data.id);
                    this._deleteEnvironment(data.id);
                    break;
                case 'setActiveEnvironment':
                    this._setActiveEnvironment(data.id);
                    break;
                case 'getEnvironments':
                    this._sendEnvironmentsToWebview();
                    break;
            }
        });

        // Initial state
        this._sendEnvironmentsToWebview();
    }

    private _sendEnvironmentsToWebview() {
        if (this._view) {
            this._view.webview.postMessage({
                type: 'setEnvironments',
                environments: this._environments,
                activeEnvironmentId: this._activeEnvironmentId
            });
        }
    }

    private _addEnvironment(environment: MaximoEnvironment) {
        environment.id = this._generateId();
        this._environments.push(environment);
        this._saveEnvironments();
        this._sendEnvironmentsToWebview();
        
        // If this is the first environment, make it active
        if (this._environments.length === 1) {
            this._setActiveEnvironment(environment.id);
        }
    }

    private _updateEnvironment(environment: MaximoEnvironment) {
        const index = this._environments.findIndex(e => e.id === environment.id);
        if (index !== -1) {
            this._environments[index] = environment;
            this._saveEnvironments();
            this._sendEnvironmentsToWebview();
        }
    }

    private _deleteEnvironment(id: string) {
        console.log(`Deleting environment: ${id}`);
        console.log(`Before deletion: ${this._environments.length} environments`);
        this._environments = this._environments.filter(e => e.id !== id);
        this._saveEnvironments();
        
        // If active environment was deleted, select a new one
        if (this._activeEnvironmentId === id) {
            this._activeEnvironmentId = this._environments.length > 0 ? this._environments[0].id : undefined;
            this._saveActiveEnvironment();
        }
        
        this._sendEnvironmentsToWebview();
        console.log(`After deletion: ${this._environments.length} environments`);
    }

    private _setActiveEnvironment(id: string) {
        this._activeEnvironmentId = id;
        this._saveActiveEnvironment();
        this._applyActiveEnvironmentSettings();
        this._sendEnvironmentsToWebview();
    }

    private _applyActiveEnvironmentSettings() {
        const activeEnv = this._environments.find(e => e.id === this._activeEnvironmentId);
        if (!activeEnv) return;
        
        // Apply settings to VSCode configuration
        const config = vscode.workspace.getConfiguration('mxscript');
        
        // Apply each setting from the active environment
        config.update('serverSettings.hostname', activeEnv.hostname, vscode.ConfigurationTarget.Workspace);
        config.update('serverSettings.port', activeEnv.port, vscode.ConfigurationTarget.Workspace);
        config.update('authentication.username', activeEnv.username, vscode.ConfigurationTarget.Workspace);
        config.update('authentication.password', activeEnv.password, vscode.ConfigurationTarget.Workspace);
        config.update('authentication.apikey', activeEnv.apikey, vscode.ConfigurationTarget.Workspace);
        config.update('authentication.authenticationType', activeEnv.authenticationType, vscode.ConfigurationTarget.Workspace);
        config.update('serverSettings.objectStructure', activeEnv.objectStructure, vscode.ConfigurationTarget.Workspace);
        config.update('serverSettings.httpProtocol', activeEnv.httpProtocol, vscode.ConfigurationTarget.Workspace);
        config.update('scriptSettings.createPythonFileForJythonScripts', activeEnv.createPythonFileForJythonScripts, vscode.ConfigurationTarget.Workspace);
        config.update('scriptSettings.logLevel', activeEnv.logLevel, vscode.ConfigurationTarget.Workspace);
        config.update('scriptSettings.ignoresslerrors', activeEnv.ignoreSslErrors, vscode.ConfigurationTarget.Workspace);
        
        vscode.window.showInformationMessage(`Switched to Maximo environment: ${activeEnv.name}`);
    }

    private _saveEnvironments() {
        this._context.globalState.update('mxscript.environments', this._environments);
    }

    private _saveActiveEnvironment() {
        this._context.globalState.update('mxscript.activeEnvironment', this._activeEnvironmentId);
    }

    private _generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Maximo Environment Manager</title>
            <style>
                body {
                    font-family: var(--vscode-font-family);
                    color: var(--vscode-foreground);
                    background-color: var(--vscode-editor-background);
                    padding: 10px;
                }
                .container {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .environment-list {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .environment-card {
                    border: 1px solid var(--vscode-panel-border);
                    border-radius: 4px;
                    padding: 10px;
                    position: relative;
                }
                .environment-card.active {
                    border-color: var(--vscode-focusBorder);
                    background-color: var(--vscode-editor-selectionBackground);
                }
                .environment-card h3 {
                    margin-top: 0;
                    margin-bottom: 5px;
                }
                .button-container {
                    display: flex;
                    gap: 5px;
                    margin-top: 8px;
                }
                button {
                    background-color: var(--vscode-button-background);
                    color: var(--vscode-button-foreground);
                    border: none;
                    padding: 5px 10px;
                    border-radius: 2px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: var(--vscode-button-hoverBackground);
                }
                .form-container {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: 15px;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                input, select {
                    background-color: var(--vscode-input-background);
                    color: var(--vscode-input-foreground);
                    border: 1px solid var(--vscode-input-border);
                    padding: 5px;
                    border-radius: 2px;
                }
                .checkbox-group {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                .active-badge {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background-color: var(--vscode-badge-background);
                    color: var(--vscode-badge-foreground);
                    padding: 2px 8px;
                    border-radius: 10px;
                    font-size: 0.8em;
                }
                .password-field {
                    position: relative;
                }
                .password-toggle {
                    position: absolute;
                    right: 5px;
                    top: 5px;
                    cursor: pointer;
                    user-select: none;
                }
                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .confirm-dialog {
                    background-color: var(--vscode-editor-background);
                    border: 1px solid var(--vscode-panel-border);
                    padding: 20px;
                    border-radius: 4px;
                    width: 300px;
                }
                .confirm-actions {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 20px;
                    gap: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Maximo Environments</h2>
                
                <div id="environmentList" class="environment-list">
                    <!-- Environments will be rendered here -->
                </div>
                
                <button id="addNewBtn">Add New Environment</button>
                
                <div id="formContainer" class="form-container" style="display: none;">
                    <h3 id="formTitle">Add New Environment</h3>
                    
                    <div class="form-group">
                        <label for="envName">Environment Name</label>
                        <input type="text" id="envName" placeholder="Production, Development, etc.">
                    </div>
                    
                    <div class="form-group">
                        <label for="hostname">Hostname / IP</label>
                        <input type="text" id="hostname" placeholder="10.10.12.12 or www.example.com">
                    </div>
                    
                    <div class="form-group">
                        <label for="port">Port</label>
                        <input type="number" id="port" placeholder="9080">
                    </div>
                    
                    <div class="form-group">
                        <label for="httpProtocol">HTTP Protocol</label>
                        <select id="httpProtocol">
                            <option value="http">HTTP</option>
                            <option value="https">HTTPS</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="authType">Authentication Type</label>
                        <select id="authType">
                            <option value="internal">Internal</option>
                            <option value="ldap">LDAP</option>
                            <option value="apikey">API Key</option>
                        </select>
                    </div>
                    
                    <div id="credentialsContainer">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" id="username" placeholder="maxadmin">
                        </div>
                        
                        <div class="form-group">
                            <label for="password">Password</label>
                            <div class="password-field">
                                <input type="password" id="password" placeholder="maxadmin">
                                <span class="password-toggle" id="passwordToggle">👁️</span>
                            </div>
                        </div>
                    </div>
                    
                    <div id="apikeyContainer" class="form-group" style="display: none;">
                        <label for="apikey">API Key</label>
                        <input type="text" id="apikey" placeholder="Your API Key">
                    </div>
                    
                    <div class="form-group">
                        <label for="objectStructure">Object Structure</label>
                        <input type="text" id="objectStructure" placeholder="MXSCRIPT">
                    </div>
                    
                    <div class="form-group">
                        <label for="logLevel">Log Level</label>
                        <select id="logLevel">
                            <option value="DEBUG">DEBUG</option>
                            <option value="INFO">INFO</option>
                            <option value="WARN">WARN</option>
                            <option value="ERROR">ERROR</option>
                            <option value="FATAL">FATAL</option>
                        </select>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="createPythonFile">
                        <label for="createPythonFile">Create Python file for Jython scripts</label>
                    </div>
                    
                    <div class="checkbox-group">
                        <input type="checkbox" id="ignoreSsl">
                        <label for="ignoreSsl">Ignore SSL errors</label>
                    </div>
                    
                    <div class="button-container">
                        <button id="saveBtn">Save</button>
                        <button id="cancelBtn">Cancel</button>
                    </div>
                </div>
            </div>
            
            <script>
                (function() {
                    const vscode = acquireVsCodeApi();
                    let environments = [];
                    let activeEnvironmentId = null;
                    let editingEnvironmentId = null;
                    
                    // DOM Elements
                    const environmentList = document.getElementById('environmentList');
                    const formContainer = document.getElementById('formContainer');
                    const formTitle = document.getElementById('formTitle');
                    const addNewBtn = document.getElementById('addNewBtn');
                    const saveBtn = document.getElementById('saveBtn');
                    const cancelBtn = document.getElementById('cancelBtn');
                    const authType = document.getElementById('authType');
                    const credentialsContainer = document.getElementById('credentialsContainer');
                    const apikeyContainer = document.getElementById('apikeyContainer');
                    const passwordToggle = document.getElementById('passwordToggle');
                    const passwordField = document.getElementById('password');
                    
                    // Initial data load
                    vscode.postMessage({ type: 'getEnvironments' });
                    
                    // Event Listeners
                    addNewBtn.addEventListener('click', () => {
                        showForm('Add New Environment');
                        clearForm();
                        editingEnvironmentId = null;
                    });
                    
                    saveBtn.addEventListener('click', saveEnvironment);
                    cancelBtn.addEventListener('click', hideForm);
                    
                    authType.addEventListener('change', toggleAuthFields);
                    
                    passwordToggle.addEventListener('click', () => {
                        if (passwordField.type === 'password') {
                            passwordField.type = 'text';
                            passwordToggle.textContent = '🔒';
                        } else {
                            passwordField.type = 'password';
                            passwordToggle.textContent = '👁️';
                        }
                    });
                    
                    // Handle messages from the extension
                    window.addEventListener('message', event => {
                        const message = event.data;
                        switch (message.type) {
                            case 'setEnvironments':
                                environments = message.environments;
                                activeEnvironmentId = message.activeEnvironmentId;
                                renderEnvironmentList();
                                break;
                        }
                    });
                    
                    // Functions
                    function renderEnvironmentList() {
                        environmentList.innerHTML = '';
                        
                        if (environments.length === 0) {
                            environmentList.innerHTML = '<p>No environments configured. Add one to get started.</p>';
                            return;
                        }
                        
                        environments.forEach(env => {
                            const isActive = env.id === activeEnvironmentId;
                            
                            const card = document.createElement('div');
                            card.className = 'environment-card' + (isActive ? ' active' : '');
                            
                            if (isActive) {
                                const badge = document.createElement('div');
                                badge.className = 'active-badge';
                                badge.textContent = 'Active';
                                card.appendChild(badge);
                            }
                            
                            const title = document.createElement('h3');
                            title.textContent = env.name;
                            card.appendChild(title);
                            
                            const details = document.createElement('div');
                            details.innerHTML = \`
                                <p>\${env.httpProtocol}://\${env.hostname}:\${env.port}</p>
                                <p>Auth: \${env.authenticationType}</p>
                            \`;
                            card.appendChild(details);
                            
                            const buttons = document.createElement('div');
                            buttons.className = 'button-container';
                            
                            if (!isActive) {
                                const activateBtn = document.createElement('button');
                                activateBtn.textContent = 'Activate';
                                activateBtn.addEventListener('click', () => activateEnvironment(env.id));
                                buttons.appendChild(activateBtn);
                            }
                            
                            const editBtn = document.createElement('button');
                            editBtn.textContent = 'Edit';
                            editBtn.addEventListener('click', () => editEnvironment(env.id));
                            buttons.appendChild(editBtn);
                            
                            const deleteBtn = document.createElement('button');
                            deleteBtn.textContent = 'Delete';
                            deleteBtn.addEventListener('click', () => deleteEnvironment(env.id));
                            buttons.appendChild(deleteBtn);
                            
                            card.appendChild(buttons);
                            environmentList.appendChild(card);
                        });
                    }
                    
                    function showForm(title) {
                        formTitle.textContent = title;
                        formContainer.style.display = 'flex';
                        addNewBtn.style.display = 'none';
                    }
                    
                    function hideForm() {
                        formContainer.style.display = 'none';
                        addNewBtn.style.display = 'block';
                    }
                    
                    function clearForm() {
                        document.getElementById('envName').value = '';
                        document.getElementById('hostname').value = '';
                        document.getElementById('port').value = '';
                        document.getElementById('httpProtocol').value = 'http';
                        document.getElementById('authType').value = 'internal';
                        document.getElementById('username').value = '';
                        document.getElementById('password').value = '';
                        document.getElementById('apikey').value = '';
                        document.getElementById('objectStructure').value = 'MXSCRIPT';
                        document.getElementById('logLevel').value = 'ERROR';
                        document.getElementById('createPythonFile').checked = true;
                        document.getElementById('ignoreSsl').checked = false;
                        
                        toggleAuthFields();
                    }
                    
                    function toggleAuthFields() {
                        const authTypeValue = document.getElementById('authType').value;
                        
                        if (authTypeValue === 'apikey') {
                            credentialsContainer.style.display = 'none';
                            apikeyContainer.style.display = 'block';
                        } else {
                            credentialsContainer.style.display = 'block';
                            apikeyContainer.style.display = 'none';
                        }
                    }
                    
                    function saveEnvironment() {
                        const newEnvironment = {
                            name: document.getElementById('envName').value,
                            hostname: document.getElementById('hostname').value,
                            port: parseInt(document.getElementById('port').value, 10),
                            httpProtocol: document.getElementById('httpProtocol').value,
                            authenticationType: document.getElementById('authType').value,
                            username: document.getElementById('username').value,
                            password: document.getElementById('password').value,
                            apikey: document.getElementById('apikey').value,
                            objectStructure: document.getElementById('objectStructure').value,
                            logLevel: document.getElementById('logLevel').value,
                            createPythonFileForJythonScripts: document.getElementById('createPythonFile').checked,
                            ignoreSslErrors: document.getElementById('ignoreSsl').checked
                        };
                        
                        if (!newEnvironment.name) {
                            vscode.postMessage({ 
                                type: 'showError', 
                                message: 'Environment name is required'
                            });
                            return;
                        }
                        
                        if (!newEnvironment.hostname) {
                            vscode.postMessage({ 
                                type: 'showError', 
                                message: 'Hostname is required'
                            });
                            return;
                        }
                        
                        if (editingEnvironmentId) {
                            newEnvironment.id = editingEnvironmentId;
                            vscode.postMessage({ 
                                type: 'updateEnvironment', 
                                environment: newEnvironment
                            });
                        } else {
                            vscode.postMessage({ 
                                type: 'addEnvironment', 
                                environment: newEnvironment
                            });
                        }
                        
                        hideForm();
                    }
                    
                    function editEnvironment(id) {
                        const env = environments.find(e => e.id === id);
                        if (!env) return;
                        
                        editingEnvironmentId = id;
                        showForm('Edit Environment: ' + env.name);
                        
                        document.getElementById('envName').value = env.name;
                        document.getElementById('hostname').value = env.hostname;
                        document.getElementById('port').value = env.port;
                        document.getElementById('httpProtocol').value = env.httpProtocol;
                        document.getElementById('authType').value = env.authenticationType;
                        document.getElementById('username').value = env.username || '';
                        document.getElementById('password').value = env.password || '';
                        document.getElementById('apikey').value = env.apikey || '';
                        document.getElementById('objectStructure').value = env.objectStructure;
                        document.getElementById('logLevel').value = env.logLevel;
                        document.getElementById('createPythonFile').checked = env.createPythonFileForJythonScripts;
                        document.getElementById('ignoreSsl').checked = env.ignoreSslErrors;
                        
                        toggleAuthFields();
                    }
                    
                    function deleteEnvironment(id) {
                        // Get environment name for the confirmation message
                        const env = environments.find(e => e.id === id);
                        if (!env) return;
                        
                        // Create confirmation dialog
                        const overlay = document.createElement('div');
                        overlay.className = 'overlay';
                        
                        const dialog = document.createElement('div');
                        dialog.className = 'confirm-dialog';
                        
                        // Create heading
                        const heading = document.createElement('h3');
                        heading.textContent = 'Confirm Deletion';
                        dialog.appendChild(heading);
                        
                        // Create message paragraph
                        const message = document.createElement('p');
                        message.textContent = 'Are you sure you want to delete the environment "' + env.name + '"?';
                        dialog.appendChild(message);
                        
                        // Create buttons container
                        const actions = document.createElement('div');
                        actions.className = 'confirm-actions';
                        
                        // Create cancel button
                        const cancelBtn = document.createElement('button');
                        cancelBtn.id = 'cancel-delete';
                        cancelBtn.textContent = 'Cancel';
                        actions.appendChild(cancelBtn);
                        
                        // Create confirm button
                        const confirmBtn = document.createElement('button');
                        confirmBtn.id = 'confirm-delete';
                        confirmBtn.textContent = 'Delete';
                        actions.appendChild(confirmBtn);
                        
                        dialog.appendChild(actions);
                        overlay.appendChild(dialog);
                        document.body.appendChild(overlay);
                        
                        // Handle button clicks
                        document.getElementById('cancel-delete').addEventListener('click', () => {
                            document.body.removeChild(overlay);
                        });
                        
                        document.getElementById('confirm-delete').addEventListener('click', () => {
                            document.body.removeChild(overlay);
                            console.log('Confirmed delete for environment:', id);
                            vscode.postMessage({ type: 'deleteEnvironment', id });
                        });
                    }
                    
                    function activateEnvironment(id) {
                        vscode.postMessage({ type: 'setActiveEnvironment', id });
                    }
                })();
            </script>
        </body>
        </html>`;
    }
}