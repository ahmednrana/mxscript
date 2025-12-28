import * as vscode from 'vscode';
import { MaximoToolsClient, MaximoToolsClientConfig, ToolsLog } from 'maximo-api-client';
import { MaximoEnvironment } from '../../webview/EnvironmentManager';
import { Logger } from '../Logger/Logger';

/**
 * Unified service for all Maximo Tools API operations in VS Code
 * Provides UI integration for Tools API features
 */
export class ToolsService {
    private logger: Logger;

    constructor() {
        this.logger = Logger.getInstance();
    }

    /**
     * Creates a MaximoToolsClient from an environment configuration
     */
    private createToolsClient(environment: MaximoEnvironment): MaximoToolsClient {
        if (!environment.toolsHostname) {
            throw new Error('Tools API hostname is not configured for this environment');
        }

        const config: MaximoToolsClientConfig = {
            baseUrl: environment.toolsHostname,
            apiKey: environment.apikey,
            rejectUnauthorized: !environment.ignoreSslErrors,
            ssl: environment.httpProtocol === 'https',
            logger: this.logger,
            ca: environment.sslcertificate || undefined
        };

        return new MaximoToolsClient(config);
    }

    /**
     * Checks if the environment has Tools API configured
     */
    public hasToolsApi(environment: MaximoEnvironment): boolean {
        return !!environment.toolsHostname;
    }

    // ==================== MAIN MENU ====================

    /**
     * Shows the main Tools menu
     */
    public async showToolsMenu(environment: MaximoEnvironment): Promise<void> {
        if (!this.hasToolsApi(environment)) {
            vscode.window.showWarningMessage(
                'Tools API hostname is not configured for this environment. Edit the environment to add it.'
            );
            return;
        }

        const picks: vscode.QuickPickItem[] = [
            { label: '$(file-text) Tools Logs', description: 'View and manage tools logs' },
            { label: '$(lock) Certificates', description: 'Install SSL/TLS certificates' },
            { label: '$(package) Customizations', description: 'Manage customization archives' },
            { label: '$(database) Database', description: 'Database validation and configuration' },
            { label: '$(search) Diagnostics', description: 'ERD generator and integrity checker' },
            { label: '$(server) Pod Manager', description: 'Start or stop Maximo Manage pods' },
            { label: '$(pulse) Build Status', description: 'Check MAS build status' },
            { label: '$(terminal) Script Runner', description: 'Run DBC scripts' },
        ];

        const selected = await vscode.window.showQuickPick(picks, {
            title: `Maximo Tools - ${environment.name}`,
            placeHolder: 'Select a tool category'
        });

        if (!selected) return;

        try {
            if (selected.label.includes('Tools Logs')) {
                await this.showLogsMenu(environment);
            } else if (selected.label.includes('Certificates')) {
                await this.showCertificatesMenu(environment);
            } else if (selected.label.includes('Customizations')) {
                await this.showCustomizationsMenu(environment);
            } else if (selected.label.includes('Database')) {
                await this.showDatabaseMenu(environment);
            } else if (selected.label.includes('Diagnostics')) {
                await this.showDiagnosticsMenu(environment);
            } else if (selected.label.includes('Pod Manager')) {
                await this.showPodManagerMenu(environment);
            } else if (selected.label.includes('Build Status')) {
                await this.checkBuildStatus(environment);
            } else if (selected.label.includes('Script Runner')) {
                await this.runDbcScript(environment);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error(`Tools operation failed: ${errorMessage}`);
            vscode.window.showErrorMessage(`Tools operation failed: ${errorMessage}`);
        }
    }

    // ==================== LOGS ====================

    /**
     * Shows the Logs submenu
     */
    public async showLogsMenu(environment: MaximoEnvironment): Promise<void> {
        const picks: vscode.QuickPickItem[] = [
            { label: '$(file-text) View Tools Logs', description: 'List and view tools log files' },
            { label: '$(cloud-upload) Upload Logs to S3', description: 'Submit a request to upload logs to cloud storage' }
        ];

        const selected = await vscode.window.showQuickPick(picks, {
            title: `Tools Logs - ${environment.name}`,
            placeHolder: 'Select an action'
        });

        if (!selected) return;

        if (selected.label.includes('View Tools Logs')) {
            await this.viewToolsLogs(environment);
        } else if (selected.label.includes('Upload Logs')) {
            await this.uploadLogs(environment);
        }
    }

    public async viewToolsLogs(environment: MaximoEnvironment): Promise<void> {
        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: 'Fetching tools logs list...',
                cancellable: false
            },
            async () => {
                const client = this.createToolsClient(environment);
                const logs: ToolsLog[] = await client.logManager.getAllToolsLogs();

                if (!logs || logs.length === 0) {
                    vscode.window.showInformationMessage('No tools logs found.');
                    return;
                }

                logs.sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime());

                const logItems = logs.map(log => ({
                    label: log.name || 'Unknown',
                    description: log.size ? `${this.formatBytes(log.size)}` : '',
                    detail: log.timestamp ? `Timestamp: ${log.timestamp}` : undefined,
                    logFile: log
                }));

                const selected = await vscode.window.showQuickPick(logItems, {
                    title: `Tools Logs (${logs.length} files)`,
                    placeHolder: 'Select a log to view its content'
                });

                if (selected) {
                    await this.fetchAndShowLog(environment, selected.label);
                }
            }
        );
    }

    private async fetchAndShowLog(environment: MaximoEnvironment, logFileName: string): Promise<void> {
        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: `Fetching log: ${logFileName}...`,
                cancellable: false
            },
            async () => {
                const client = this.createToolsClient(environment);
                const logContent = await client.logManager.getToolsLog(logFileName);

                const document = await vscode.workspace.openTextDocument({
                    content: typeof logContent === 'string' ? logContent : JSON.stringify(logContent, null, 2),
                    language: 'log'
                });

                await vscode.window.showTextDocument(document, {
                    preview: false,
                    viewColumn: vscode.ViewColumn.Active
                });

                vscode.window.showInformationMessage(`Loaded: ${logFileName}`);
            }
        );
    }

    public async uploadLogs(environment: MaximoEnvironment): Promise<void> {
        const confirm = await vscode.window.showWarningMessage(
            'This will submit a request to upload Manage logs to S3 Cloud Storage. Continue?',
            'Yes', 'No'
        );

        if (confirm !== 'Yes') return;

        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: 'Submitting log upload request...',
                cancellable: false
            },
            async () => {
                const client = this.createToolsClient(environment);
                const result = await client.logManager.submitUploadLogRequest();

                if (result.success) {
                    vscode.window.showInformationMessage(result.message || 'Log upload request submitted successfully.');
                } else {
                    vscode.window.showWarningMessage(result.message || 'Log upload request completed with unknown status.');
                }
            }
        );
    }

    // ==================== CERTIFICATES ====================

    /**
     * Shows the Certificates submenu
     */
    public async showCertificatesMenu(environment: MaximoEnvironment): Promise<void> {
        const picks: vscode.QuickPickItem[] = [
            { label: '$(globe) Install Certificate from Host', description: 'Download and install cert from a hostname' },
            { label: '$(file-code) Install Certificate from File', description: 'Install cert from PEM content' }
        ];

        const selected = await vscode.window.showQuickPick(picks, {
            title: `Certificates - ${environment.name}`,
            placeHolder: 'Select an action'
        });

        if (!selected) return;

        if (selected.label.includes('from Host')) {
            await this.installCertificateFromHost(environment);
        } else if (selected.label.includes('from File')) {
            await this.installCertificateFromContent(environment);
        }
    }

    /**
     * Install certificate by connecting to a host
     */
    public async installCertificateFromHost(environment: MaximoEnvironment): Promise<void> {
        // Step 1: Get hostname
        const host = await vscode.window.showInputBox({
            title: 'Install Certificate - Step 1/3',
            prompt: 'Enter the hostname to fetch the certificate from',
            placeHolder: 'e.g., api.example.com',
            validateInput: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'Hostname is required';
                }
                return undefined;
            }
        });

        if (!host) return;

        // Step 2: Get port
        const portStr = await vscode.window.showInputBox({
            title: 'Install Certificate - Step 2/3',
            prompt: 'Enter the port number',
            placeHolder: '443',
            value: '443',
            validateInput: (value) => {
                const port = parseInt(value, 10);
                if (isNaN(port) || port < 1 || port > 65535) {
                    return 'Please enter a valid port number (1-65535)';
                }
                return undefined;
            }
        });

        if (!portStr) return;
        const port = parseInt(portStr, 10);

        // Step 3: Get alias
        const alias = await vscode.window.showInputBox({
            title: 'Install Certificate - Step 3/3',
            prompt: 'Enter an alias name for this certificate',
            placeHolder: 'e.g., my-api-cert',
            value: host.replace(/\./g, '-'),
            validateInput: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'Alias is required';
                }
                if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
                    return 'Alias can only contain letters, numbers, underscores, and hyphens';
                }
                return undefined;
            }
        });

        if (!alias) return;

        // Confirm and execute
        const confirm = await vscode.window.showWarningMessage(
            `Install certificate from ${host}:${port} with alias "${alias}"?`,
            'Install', 'Cancel'
        );

        if (confirm !== 'Install') return;

        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: `Installing certificate from ${host}:${port}...`,
                cancellable: false
            },
            async () => {
                const client = this.createToolsClient(environment);
                const result = await client.certificateManager.installExternalCertificateByHost(host, port, alias);

                vscode.window.showInformationMessage(
                    `Certificate installed successfully with alias "${alias}"`
                );
                this.logger.info(`Certificate installed: ${JSON.stringify(result)}`);
            }
        );
    }

    /**
     * Install certificate from PEM content
     */
    public async installCertificateFromContent(environment: MaximoEnvironment): Promise<void> {
        // Step 1: Get alias
        const alias = await vscode.window.showInputBox({
            title: 'Install Certificate - Step 1/2',
            prompt: 'Enter an alias name for this certificate',
            placeHolder: 'e.g., my-api-cert',
            validateInput: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'Alias is required';
                }
                if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
                    return 'Alias can only contain letters, numbers, underscores, and hyphens';
                }
                return undefined;
            }
        });

        if (!alias) return;

        // Step 2: Get certificate content - offer file picker or paste
        const method = await vscode.window.showQuickPick(
            [
                { label: '$(folder-opened) Select File', description: 'Choose a .pem or .crt file' },
                { label: '$(clippy) Paste Content', description: 'Paste PEM certificate content' }
            ],
            { title: 'Install Certificate - Step 2/2', placeHolder: 'How would you like to provide the certificate?' }
        );

        if (!method) return;

        let certContent: string | undefined;

        if (method.label.includes('Select File')) {
            const fileUris = await vscode.window.showOpenDialog({
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                filters: {
                    'Certificate Files': ['pem', 'crt', 'cer'],
                    'All Files': ['*']
                },
                title: 'Select Certificate File'
            });

            if (!fileUris || fileUris.length === 0) return;

            const fileContent = await vscode.workspace.fs.readFile(fileUris[0]);
            certContent = Buffer.from(fileContent).toString('utf-8');
        } else {
            certContent = await vscode.window.showInputBox({
                title: 'Paste Certificate Content',
                prompt: 'Paste the PEM certificate content (including BEGIN/END lines)',
                placeHolder: '-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----',
                validateInput: (value) => {
                    if (!value || !value.includes('-----BEGIN')) {
                        return 'Please paste valid PEM certificate content';
                    }
                    return undefined;
                }
            });
        }

        if (!certContent) return;

        // Confirm and execute
        const confirm = await vscode.window.showWarningMessage(
            `Install certificate with alias "${alias}"?`,
            'Install', 'Cancel'
        );

        if (confirm !== 'Install') return;

        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: `Installing certificate with alias "${alias}"...`,
                cancellable: false
            },
            async () => {
                const client = this.createToolsClient(environment);
                const result = await client.certificateManager.installExternalCertificateByContent(certContent!, alias);

                vscode.window.showInformationMessage(
                    `Certificate installed successfully with alias "${alias}"`
                );
                this.logger.info(`Certificate installed: ${JSON.stringify(result)}`);
            }
        );
    }

    // ==================== CUSTOMIZATIONS ====================

    /**
     * Shows the Customizations submenu
     */
    public async showCustomizationsMenu(environment: MaximoEnvironment): Promise<void> {
        const picks: vscode.QuickPickItem[] = [
            { label: '$(add) Add Customization Archive', description: 'Add a new customization archive from URL' },
            { label: '$(sync) Update Customization Archive', description: 'Update an existing customization archive' },
            { label: '$(trash) Delete Customization Archive', description: 'Remove a customization archive' },
            { label: '$(key) Create Archive Secret', description: 'Create S3 secret for archive access' }
        ];

        const selected = await vscode.window.showQuickPick(picks, {
            title: `Customizations - ${environment.name}`,
            placeHolder: 'Select an action'
        });

        if (!selected) return;

        if (selected.label.includes('Add Customization')) {
            await this.manageCustomizationArchive(environment, 'add');
        } else if (selected.label.includes('Update Customization')) {
            await this.manageCustomizationArchive(environment, 'update');
        } else if (selected.label.includes('Delete Customization')) {
            await this.manageCustomizationArchive(environment, 'delete');
        } else if (selected.label.includes('Create Archive Secret')) {
            await this.createArchiveSecret(environment);
        }
    }

    /**
     * Add, update, or delete a customization archive
     */
    public async manageCustomizationArchive(environment: MaximoEnvironment, mode: 'add' | 'update' | 'delete'): Promise<void> {
        const modeLabel = mode.charAt(0).toUpperCase() + mode.slice(1);

        // Step 1: Get archive name
        const name = await vscode.window.showInputBox({
            title: `${modeLabel} Customization Archive - Step 1/2`,
            prompt: 'Enter the archive name',
            placeHolder: 'e.g., my-customization',
            validateInput: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'Archive name is required';
                }
                return undefined;
            }
        });

        if (!name) return;

        // For delete, we don't need URL
        let url = '';
        if (mode !== 'delete') {
            // Step 2: Get URL
            const urlInput = await vscode.window.showInputBox({
                title: `${modeLabel} Customization Archive - Step 2/2`,
                prompt: 'Enter the archive URL',
                placeHolder: 'https://example.com/customization.zip',
                validateInput: (value) => {
                    if (!value || value.trim().length === 0) {
                        return 'URL is required';
                    }
                    try {
                        new URL(value);
                        return undefined;
                    } catch {
                        return 'Please enter a valid URL';
                    }
                }
            });

            if (!urlInput) return;
            url = urlInput;
        }

        // Confirm
        const confirmMsg = mode === 'delete'
            ? `Delete customization archive "${name}"?`
            : `${modeLabel} customization archive "${name}" from ${url}?`;

        const confirm = await vscode.window.showWarningMessage(confirmMsg, modeLabel, 'Cancel');

        if (confirm !== modeLabel) return;

        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: `${modeLabel}ing customization archive...`,
                cancellable: false
            },
            async () => {
                const client = this.createToolsClient(environment);
                const result = await client.customizationManager.updateCustomizationArchive({
                    mode,
                    name,
                    url
                });

                vscode.window.showInformationMessage(
                    `Customization archive "${name}" ${mode}${mode === 'delete' ? 'd' : 'ed'} successfully`
                );
                this.logger.info(`Customization archive ${mode}: ${JSON.stringify(result)}`);
            }
        );
    }

    /**
     * Create an archive secret for S3 access
     */
    public async createArchiveSecret(environment: MaximoEnvironment): Promise<void> {
        // Step 1: Get secret name
        const secretname = await vscode.window.showInputBox({
            title: 'Create Archive Secret - Step 1/2',
            prompt: 'Enter a name for this secret',
            placeHolder: 'e.g., my-s3-secret',
            validateInput: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'Secret name is required';
                }
                if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
                    return 'Secret name can only contain letters, numbers, underscores, and hyphens';
                }
                return undefined;
            }
        });

        if (!secretname) return;

        // Step 2: Get S3 secret key
        const s3secretkey = await vscode.window.showInputBox({
            title: 'Create Archive Secret - Step 2/2',
            prompt: 'Enter the S3 secret key',
            password: true,
            validateInput: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'S3 secret key is required';
                }
                return undefined;
            }
        });

        if (!s3secretkey) return;

        // Confirm
        const confirm = await vscode.window.showWarningMessage(
            `Create archive secret "${secretname}"?`,
            'Create', 'Cancel'
        );

        if (confirm !== 'Create') return;

        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: 'Creating archive secret...',
                cancellable: false
            },
            async () => {
                const client = this.createToolsClient(environment);
                const result = await client.customizationManager.createArchiveSecret({
                    secretname,
                    s3secretkey
                });

                vscode.window.showInformationMessage(
                    `Archive secret "${secretname}" created successfully`
                );
                this.logger.info(`Archive secret created: ${JSON.stringify(result)}`);
            }
        );
    }
    // ==================== DATABASE ====================

    /**
     * Shows the Database submenu
     */
    public async showDatabaseMenu(environment: MaximoEnvironment): Promise<void> {
        const picks: vscode.QuickPickItem[] = [
            { label: '$(check) Validate Database for Migration', description: 'Validate DB for MAS migration' },
            { label: '$(gear) Configure Database', description: 'Run configdb script' }
        ];

        const selected = await vscode.window.showQuickPick(picks, {
            title: `Database - ${environment.name}`,
            placeHolder: 'Select an action'
        });

        if (!selected) return;

        if (selected.label.includes('Validate Database')) {
            await this.validateDatabaseForMigration(environment);
        } else if (selected.label.includes('Configure Database')) {
            await this.configureDatabase(environment);
        }
    }

    /**
     * Validate database for MAS migration
     */
    public async validateDatabaseForMigration(environment: MaximoEnvironment): Promise<void> {
        const confirm = await vscode.window.showWarningMessage(
            'This will validate the database for Maximo Manage migration. This may take a while. Continue?',
            'Validate', 'Cancel'
        );

        if (confirm !== 'Validate') return;

        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: 'Validating database for migration...',
                cancellable: false
            },
            async () => {
                const client = this.createToolsClient(environment);
                const result = await client.databaseService.validateDatabaseForMigration();

                vscode.window.showInformationMessage('Database validation completed. Check logs for details.');
                this.logger.info(`Database validation result: ${JSON.stringify(result)}`);
            }
        );
    }

    /**
     * Configure database
     */
    public async configureDatabase(environment: MaximoEnvironment): Promise<void> {
        const confirm = await vscode.window.showWarningMessage(
            'This will run the configdb script. This may take a while and could affect database state. Continue?',
            'Configure', 'Cancel'
        );

        if (confirm !== 'Configure') return;

        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: 'Configuring database...',
                cancellable: false
            },
            async () => {
                const client = this.createToolsClient(environment);
                const result = await client.databaseService.configureDb();

                vscode.window.showInformationMessage('Database configuration completed. Check logs for details.');
                this.logger.info(`Database configuration result: ${JSON.stringify(result)}`);
            }
        );
    }

    // ==================== DIAGNOSTICS ====================

    /**
     * Shows the Diagnostics submenu
     */
    public async showDiagnosticsMenu(environment: MaximoEnvironment): Promise<void> {
        const picks: vscode.QuickPickItem[] = [
            { label: '$(type-hierarchy) Generate ERD', description: 'Generate Entity Relationship Diagram' },
            { label: '$(cloud-download) Download ERD', description: 'Download generated ERD' },
            { label: '$(checklist) Generate Integrity Report', description: 'Generate integrity checker report' },
            { label: '$(wrench) Run Integrity Repair', description: 'Run integrity checker repair utility' }
        ];

        const selected = await vscode.window.showQuickPick(picks, {
            title: `Diagnostics - ${environment.name}`,
            placeHolder: 'Select an action'
        });

        if (!selected) return;

        if (selected.label.includes('Generate ERD')) {
            await this.generateErd(environment);
        } else if (selected.label.includes('Download ERD')) {
            await this.downloadErd(environment);
        } else if (selected.label.includes('Generate Integrity Report')) {
            await this.generateIntegrityReport(environment);
        } else if (selected.label.includes('Run Integrity Repair')) {
            await this.runIntegrityRepair(environment);
        }
    }

    /**
     * Generate ERD - with option to download immediately after
     */
    public async generateErd(environment: MaximoEnvironment): Promise<void> {
        const confirm = await vscode.window.showWarningMessage(
            'This will generate an Entity Relationship Diagram. Continue?',
            'Generate', 'Generate & Download', 'Cancel'
        );

        if (!confirm || confirm === 'Cancel') return;

        const alsoDownload = confirm === 'Generate & Download';

        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: 'Generating ERD...',
                cancellable: false
            },
            async () => {
                const client = this.createToolsClient(environment);
                const result = await client.erdGenerator.generateErd();
                this.logger.info(`ERD generation result: ${JSON.stringify(result)}`);

                if (alsoDownload) {
                    // Since both are synchronous, proceed to download
                    await this.downloadAndSaveErd(environment, client);
                } else {
                    vscode.window.showInformationMessage('ERD generated successfully. Use "Download ERD" to save it.');
                }
            }
        );
    }

    /**
     * Download ERD - prompts user for save location
     */
    public async downloadErd(environment: MaximoEnvironment): Promise<void> {
        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: 'Downloading ERD...',
                cancellable: false
            },
            async () => {
                const client = this.createToolsClient(environment);
                await this.downloadAndSaveErd(environment, client);
            }
        );
    }

    /**
     * Helper to download ERD and save to user-selected location
     */
    private async downloadAndSaveErd(environment: MaximoEnvironment, client?: MaximoToolsClient): Promise<void> {
        const toolsClient = client || this.createToolsClient(environment);

        // Download the ERD data
        const erdData = await toolsClient.erdGenerator.downloadErd();

        if (!erdData) {
            vscode.window.showWarningMessage('No ERD data received. Make sure an ERD has been generated first.');
            return;
        }

        // Ask user where to save the file
        const saveUri = await vscode.window.showSaveDialog({
            defaultUri: vscode.Uri.file(`${environment.name}-erd.zip`),
            filters: {
                'ZIP Archive': ['zip'],
                'All Files': ['*']
            },
            title: 'Save ERD File'
        });

        if (!saveUri) {
            vscode.window.showInformationMessage('ERD download cancelled.');
            return;
        }

        // Write the file
        try {
            let fileData: Uint8Array;

            if (typeof erdData === 'string') {
                // If it's a string (maybe base64 or raw data), convert it
                fileData = Buffer.from(erdData);
            } else if (erdData instanceof Buffer) {
                fileData = erdData;
            } else if (erdData.data) {
                // Response object with data property
                fileData = Buffer.from(erdData.data);
            } else {
                // Try to serialize as JSON as fallback
                fileData = Buffer.from(JSON.stringify(erdData));
            }

            await vscode.workspace.fs.writeFile(saveUri, fileData);

            vscode.window.showInformationMessage(`ERD saved to: ${saveUri.fsPath}`);
            this.logger.info(`ERD saved to: ${saveUri.fsPath}`);
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`Failed to save ERD: ${errorMsg}`);
            this.logger.error(`Failed to save ERD: ${errorMsg}`);
        }
    }

    /**
     * Generate Integrity Checker Report
     */
    public async generateIntegrityReport(environment: MaximoEnvironment): Promise<void> {
        const confirm = await vscode.window.showWarningMessage(
            'This will generate an integrity checker report. Continue?',
            'Generate', 'Cancel'
        );

        if (confirm !== 'Generate') return;

        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: 'Generating integrity report...',
                cancellable: false
            },
            async () => {
                const client = this.createToolsClient(environment);
                const result = await client.integrityChecker.generateIntegrityCheckerLog();

                vscode.window.showInformationMessage('Integrity report generation completed. Check Tools Logs for the report.');
                this.logger.info(`Integrity report result: ${JSON.stringify(result)}`);
            }
        );
    }

    /**
     * Run Integrity Checker Repair
     */
    public async runIntegrityRepair(environment: MaximoEnvironment): Promise<void> {
        const confirm = await vscode.window.showWarningMessage(
            '⚠️ This will run the integrity checker REPAIR utility. This modifies data. Are you sure?',
            'Run Repair', 'Cancel'
        );

        if (confirm !== 'Run Repair') return;

        // Double confirm for destructive operation
        const doubleConfirm = await vscode.window.showWarningMessage(
            'Final confirmation: Run integrity checker repair?',
            'Yes, Run Repair', 'Cancel'
        );

        if (doubleConfirm !== 'Yes, Run Repair') return;

        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: 'Running integrity repair...',
                cancellable: false
            },
            async () => {
                const client = this.createToolsClient(environment);
                const result = await client.integrityChecker.runIntegrityCheckerRepair();

                vscode.window.showInformationMessage('Integrity repair completed. Check Tools Logs for details.');
                this.logger.info(`Integrity repair result: ${JSON.stringify(result)}`);
            }
        );
    }

    // ==================== POD MANAGER ====================

    /**
     * Shows the Pod Manager submenu
     */
    public async showPodManagerMenu(environment: MaximoEnvironment): Promise<void> {
        const picks: vscode.QuickPickItem[] = [
            { label: '$(play) Start All Pods', description: 'Start all Maximo Manage pods' },
            { label: '$(debug-stop) Stop All Pods', description: 'Stop all Maximo Manage pods' }
        ];

        const selected = await vscode.window.showQuickPick(picks, {
            title: `Pod Manager - ${environment.name}`,
            placeHolder: 'Select an action'
        });

        if (!selected) return;

        if (selected.label.includes('Start All Pods')) {
            await this.startPods(environment);
        } else if (selected.label.includes('Stop All Pods')) {
            await this.stopPods(environment);
        }
    }

    /**
     * Start all Maximo Manage pods
     */
    public async startPods(environment: MaximoEnvironment): Promise<void> {
        const confirm = await vscode.window.showWarningMessage(
            'This will start all Maximo Manage pods. Continue?',
            'Start Pods', 'Cancel'
        );

        if (confirm !== 'Start Pods') return;

        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: 'Starting Maximo Manage pods...',
                cancellable: false
            },
            async () => {
                const client = this.createToolsClient(environment);
                const result = await client.podManager.startPods();

                vscode.window.showInformationMessage('Pod start request submitted. This is an asynchronous operation.');
                this.logger.info(`Start pods result: ${JSON.stringify(result)}`);
            }
        );
    }

    /**
     * Stop all Maximo Manage pods
     */
    public async stopPods(environment: MaximoEnvironment): Promise<void> {
        const confirm = await vscode.window.showWarningMessage(
            '⚠️ This will stop ALL Maximo Manage pods. This will make the system unavailable. Continue?',
            'Stop Pods', 'Cancel'
        );

        if (confirm !== 'Stop Pods') return;

        // Double confirm for destructive operation
        const doubleConfirm = await vscode.window.showWarningMessage(
            'Final confirmation: Stop all Maximo Manage pods?',
            'Yes, Stop All Pods', 'Cancel'
        );

        if (doubleConfirm !== 'Yes, Stop All Pods') return;

        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: 'Stopping Maximo Manage pods...',
                cancellable: false
            },
            async () => {
                const client = this.createToolsClient(environment);
                const result = await client.podManager.stopPods();

                vscode.window.showInformationMessage('Pod stop request submitted. This is an asynchronous operation.');
                this.logger.info(`Stop pods result: ${JSON.stringify(result)}`);
            }
        );
    }

    // ==================== BUILD STATUS ====================

    /**
     * Check MAS build status
     */
    public async checkBuildStatus(environment: MaximoEnvironment): Promise<void> {
        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: 'Checking build status...',
                cancellable: false
            },
            async () => {
                const client = this.createToolsClient(environment);
                const result = await client.buildStatusChecker.getBuildStatus();

                // Display the build status in a readable format
                let statusMessage = 'Build Status:\n';
                if (typeof result === 'object') {
                    statusMessage = JSON.stringify(result, null, 2);
                } else {
                    statusMessage = String(result);
                }

                // Show in a new document for better viewing
                const document = await vscode.workspace.openTextDocument({
                    content: statusMessage,
                    language: 'json'
                });

                await vscode.window.showTextDocument(document, {
                    preview: false,
                    viewColumn: vscode.ViewColumn.Active
                });

                vscode.window.showInformationMessage('Build status retrieved successfully.');
                this.logger.info(`Build status: ${statusMessage}`);
            }
        );
    }

    // ==================== SCRIPT RUNNER ====================

    /**
     * Run a DBC script
     */
    public async runDbcScript(environment: MaximoEnvironment): Promise<void> {
        // Get script name from user
        const scriptName = await vscode.window.showInputBox({
            title: 'Run DBC Script',
            prompt: 'Enter the DBC script name (without .dbc extension)',
            placeHolder: 'e.g., V9000_05',
            validateInput: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'Script name is required';
                }
                if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
                    return 'Script name can only contain letters, numbers, underscores, and hyphens';
                }
                return undefined;
            }
        });

        if (!scriptName) return;

        const confirm = await vscode.window.showWarningMessage(
            `Run DBC script "${scriptName}"? This will execute the script on the database.`,
            'Run Script', 'Cancel'
        );

        if (confirm !== 'Run Script') return;

        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: `Running DBC script: ${scriptName}...`,
                cancellable: false
            },
            async () => {
                const client = this.createToolsClient(environment);
                const result = await client.scriptRunner.runDbcScript(scriptName);

                // Display the result
                let resultMessage = 'Script Execution Result:\n';
                if (typeof result === 'object') {
                    resultMessage = JSON.stringify(result, null, 2);
                } else {
                    resultMessage = String(result);
                }

                // Show in a new document for better viewing
                const document = await vscode.workspace.openTextDocument({
                    content: resultMessage,
                    language: 'json'
                });

                await vscode.window.showTextDocument(document, {
                    preview: false,
                    viewColumn: vscode.ViewColumn.Active
                });

                vscode.window.showInformationMessage(`Script "${scriptName}" executed. Check the output for details.`);
                this.logger.info(`Script ${scriptName} result: ${resultMessage}`);
            }
        );
    }

    // ==================== UTILITIES ====================

    private formatBytes(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}
