import * as vscode from "vscode";
import { SimpleOSService } from './service/AutoScript/ISimpleOSService';
import { MaximoClientProvider } from './client/client';
import { ConfigService } from './service/Config/ConfigService';
import { EnvironmentManagerWebviewProvider, MaximoEnvironment } from './webview/EnvironmentManager';
import { MaximoEnvironmentTreeProvider } from './treeview/MaximoEnvironmentTreeProvider';
import { EnvironmentEditorPanel } from './treeview/EnvironmentEditorPanel';
import { Logger, LogLevel } from './service/Logger/Logger';
import { AutoScriptNextGen } from "./service/AutoScript/AutoScriptNextGen";
import { getFileExtension, getFilename, showError } from "./utils/utils";
import { AppXmlService } from "./service/AutoScript/AppXmlService";

// Status bar item to show current environment
let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
  // Initialize logger
  const logger = Logger.getInstance('MxScript');

  // Configure logger based on settings
  const config = vscode.workspace.getConfiguration('mxscript');
  const logLevelSetting = config.get<string>('logging.level', 'info');
  const configService = new ConfigService();

  // Initialize the client wrapper (once, at startup)
  MaximoClientProvider.initialize(context, configService);

  // Set log level
  switch (logLevelSetting.toLowerCase()) {
    case 'debug':
      logger.setLogLevel(LogLevel.DEBUG);
      break;
    case 'info':
      logger.setLogLevel(LogLevel.INFO);
      break;
    case 'warn':
      logger.setLogLevel(LogLevel.WARN);
      break;
    case 'error':
      logger.setLogLevel(LogLevel.ERROR);
      break;
    case 'none':
      logger.setLogLevel(LogLevel.INFO);
      break;
  }

  logger.info('MxScript extension activated');


  const MxScriptScheme = 'mxscript';
  const MxScriptProvider = new class implements vscode.TextDocumentContentProvider {
    provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): string {
      return uri.path;
    }
  };

  // Create status bar item
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.command = "mxscript.manageEnvironments";
  statusBarItem.text = "$(globe) Maximo: No Environment";
  statusBarItem.tooltip = "Click to manage Maximo environments";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // Create the tree view provider
  const maximoEnvironmentTreeProvider = new MaximoEnvironmentTreeProvider(context);

  // Register the tree view
  const environmentTreeView = vscode.window.createTreeView('maximoEnvironments', {
    treeDataProvider: maximoEnvironmentTreeProvider,
    showCollapseAll: false
  });

  context.subscriptions.push(environmentTreeView);

  // Register tree view commands
  context.subscriptions.push(
    vscode.commands.registerCommand('maximoEnvironments.refreshEnvironments', () => {
      maximoEnvironmentTreeProvider.refresh();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('maximoEnvironments.addEnvironment', () => {
      // Open the editor webview for adding a new environment
      EnvironmentEditorPanel.createOrShow(
        context.extensionUri,
        context,
        undefined,
        (environment: MaximoEnvironment) => {
          // Generate an ID for the new environment
          environment.id = Date.now().toString(36) + Math.random().toString(36).substr(2);

          // Save environment to appropriate storage
          const targetStorage = environment.scope === 'workspace'
            ? context.workspaceState
            : context.globalState;

          const environments = targetStorage.get<MaximoEnvironment[]>('mxscript.environments', []);
          environments.push(environment);
          targetStorage.update('mxscript.environments', environments);

          // Set as active if it's the first environment
          const globalEnvs = context.globalState.get<MaximoEnvironment[]>('mxscript.environments', []);
          const workspaceEnvs = context.workspaceState.get<MaximoEnvironment[]>('mxscript.environments', []);
          const allEnvs = [...globalEnvs, ...workspaceEnvs];

          if (allEnvs.length === 1) {
            context.globalState.update('mxscript.activeEnvironment', environment.id);
          }

          // Refresh the tree view
          maximoEnvironmentTreeProvider.refresh();

          // Update status bar
          updateStatusBar(context);

          vscode.window.showInformationMessage(`Added Maximo environment: ${environment.name}`);
        }
      );
    })
  );

  // Command registration for maximoEnvironments.editEnvironment
  const editEnvironmentCommandHandler = (item?: any) => {
    if (item && item.environment) {
      // Called from the tree view with an item
      // Original implementation
      maximoEnvironmentTreeProvider.editEnvironment(item.environment.id);
    } else {
      // Called from command palette without an item
      // Show a quick pick of available environments
      const environments = maximoEnvironmentTreeProvider.getEnvironments();
      if (environments.length === 0) {
        vscode.window.showInformationMessage("No environments found. Add an environment first.");
        return;
      }

      const environmentItems = environments.map(env => ({
        label: env.name,
        description: `${env.hostname}:${env.port}`,
        id: env.id
      }));

      vscode.window.showQuickPick(environmentItems, {
        placeHolder: "Select an environment to edit"
      }).then(selectedItem => {
        if (selectedItem) {
          maximoEnvironmentTreeProvider.editEnvironment(selectedItem.id);
        }
      });
    }
  };

  context.subscriptions.push(
    vscode.commands.registerCommand('maximoEnvironments.editEnvironment', editEnvironmentCommandHandler)
  );

  // Command registration for environment commands
  context.subscriptions.push(
    vscode.commands.registerCommand('maximoEnvironments.deleteEnvironment', (item) => {
      if (item && item.environment) {
        vscode.window.showWarningMessage(
          `Are you sure you want to delete the environment "${item.environment.name}"?`,
          "Delete",
          "Cancel"
        ).then(selection => {
          if (selection === "Delete") {
            maximoEnvironmentTreeProvider.deleteEnvironment(item.environment.id);
            // Update status bar if needed
            updateStatusBar(context);
          }
        });
      } else {
        // Called from command palette without an item
        // Show a quick pick of available environments
        const environments = maximoEnvironmentTreeProvider.getEnvironments();
        if (environments.length === 0) {
          vscode.window.showInformationMessage("No environments found to delete.");
          return;
        }

        const environmentItems = environments.map(env => ({
          label: env.name,
          description: `${env.hostname}:${env.port}`,
          id: env.id
        }));

        vscode.window.showQuickPick(environmentItems, {
          placeHolder: "Select an environment to delete"
        }).then(selectedItem => {
          if (selectedItem) {
            vscode.window.showWarningMessage(
              `Are you sure you want to delete the environment "${selectedItem.label}"?`,
              "Delete",
              "Cancel"
            ).then(selection => {
              if (selection === "Delete") {
                maximoEnvironmentTreeProvider.deleteEnvironment(selectedItem.id);
                // Update status bar if needed
                updateStatusBar(context);
              }
            });
          }
        });
      }
    })
  );

  // Command registration for maximoEnvironments.setActiveEnvironment
  const setActiveEnvironmentCommandHandler = (item?: any) => {
    if (item && item.environment) {
      // Called from the tree view with an item
      // Original implementation
      maximoEnvironmentTreeProvider.setActiveEnvironment(item.environment.id);
      // Update status bar
      updateStatusBar(context);
    } else {
      // Called from command palette without an item
      // Show a quick pick of available environments
      const environments = maximoEnvironmentTreeProvider.getEnvironments();
      if (environments.length === 0) {
        vscode.window.showInformationMessage("No environments found to set as active.");
        return;
      }

      const environmentItems = environments.map(env => ({
        label: env.name,
        description: `${env.hostname}:${env.port}`,
        id: env.id
      }));

      vscode.window.showQuickPick(environmentItems, {
        placeHolder: "Select an environment to set as active"
      }).then(selectedItem => {
        if (selectedItem) {
          maximoEnvironmentTreeProvider.setActiveEnvironment(selectedItem.id);
          // Update status bar
          updateStatusBar(context);
        }
      });
    }
  };

  context.subscriptions.push(
    vscode.commands.registerCommand('maximoEnvironments.setActiveEnvironment', setActiveEnvironmentCommandHandler)
  );

  let upload = vscode.commands.registerCommand("mxscript.upload", async () => {
    await ensureWorkspaceConfigured(context, maximoEnvironmentTreeProvider);
    const fileName = getFilename();
    let config = new ConfigService();
    if (!fileName) {
      showError("No valid file is open");
      return;
    }
    const fileExtension = getFileExtension();
    if (!fileExtension) {
      showError("Could not determine file extension");
      return;
    }
    if (fileExtension === 'xml') {
      let appservice = new AppXmlService(context, config);
      appservice.upload();
    } else {
      let as: SimpleOSService = new AutoScriptNextGen(context, config);
      as.upload();
    }
  });

  let compare = vscode.commands.registerCommand("mxscript.compare", async () => {
    await ensureWorkspaceConfigured(context, maximoEnvironmentTreeProvider);
    const fileName = getFilename();
    let config = new ConfigService();
    if (!fileName) {
      showError("No valid file is open");
      return;
    }
    const fileExtension = getFileExtension();
    if (!fileExtension) {
      showError("Could not determine file extension");
      return;
    }
    if (fileExtension === 'xml') {
      let appservice = new AppXmlService(context, config);
      appservice.compareWithServer();
    } else {
      let as: SimpleOSService = new AutoScriptNextGen(context, config);
      as.compareWithServer();
    }

  });

  let update = vscode.commands.registerCommand("mxscript.update", async () => {
    await ensureWorkspaceConfigured(context, maximoEnvironmentTreeProvider);
    const fileName = getFilename();
    let config = new ConfigService();
    if (!fileName) {
      showError("No valid file is open");
      return;
    }
    const fileExtension = getFileExtension();
    if (!fileExtension) {
      showError("Could not determine file extension");
      return;
    }
    if (fileExtension === 'xml') {
      let appservice = new AppXmlService(context, config);
      appservice.update();
    } else {
      let as: SimpleOSService = new AutoScriptNextGen(context, config);
      as.update();
    }
  });

  let downloadall = vscode.commands.registerCommand("mxscript.downloadall", async () => {
    await ensureWorkspaceConfigured(context, maximoEnvironmentTreeProvider);
    let as: SimpleOSService = new AutoScriptNextGen(context, new ConfigService());
    as.downloadAll();
  });

  let deleteScript = vscode.commands.registerCommand("mxscript.delete", async () => {
    await ensureWorkspaceConfigured(context, maximoEnvironmentTreeProvider);
    let as: SimpleOSService = new AutoScriptNextGen(context, new ConfigService());
    as.delete();
  });

  let downloadallappxml = vscode.commands.registerCommand("mxscript.downloadallappxml", async () => {
    await ensureWorkspaceConfigured(context, maximoEnvironmentTreeProvider);
    let appservice: SimpleOSService = new AppXmlService(context, new ConfigService());
    appservice.downloadAll();
  });



  vscode.workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('mxscript.scriptSettings.ignoresslerrors')) {
      let ignoreSsl = vscode.workspace.getConfiguration().get("mxscript.scriptSettings.ignoresslerrors")
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = ignoreSsl ? '0' : '1';
    }
  });

  // Register the environment manager webview
  /* Commenting out the webview registration to remove it from the left sidebar
  const environmentManagerProvider = new EnvironmentManagerWebviewProvider(
    context.extensionUri,
    context,
    () => updateStatusBar(context) // Pass the status bar update function
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      EnvironmentManagerWebviewProvider.viewType,
      environmentManagerProvider
    )
  );
  */

  // Register command for webview-to-editor communication
  context.subscriptions.push(
    vscode.commands.registerCommand('mxscript.environments.add', () => {
      EnvironmentEditorPanel.createOrShow(
        context.extensionUri,
        context,
        undefined,
        (environment: MaximoEnvironment) => {
          // Generate an ID for the new environment
          environment.id = Date.now().toString(36) + Math.random().toString(36).substr(2);

          // Save environment to appropriate storage
          const targetStorage = environment.scope === 'workspace'
            ? context.workspaceState
            : context.globalState;

          const environments = targetStorage.get<MaximoEnvironment[]>('mxscript.environments', []);
          environments.push(environment);
          targetStorage.update('mxscript.environments', environments);

          // Set as active if it's the first environment
          const globalEnvs = context.globalState.get<MaximoEnvironment[]>('mxscript.environments', []);
          const workspaceEnvs = context.workspaceState.get<MaximoEnvironment[]>('mxscript.environments', []);
          const allEnvs = [...globalEnvs, ...workspaceEnvs];

          if (allEnvs.length === 1) {
            context.globalState.update('mxscript.activeEnvironment', environment.id);
          }

          // Refresh the tree view
          maximoEnvironmentTreeProvider.refresh();

          // Update status bar
          updateStatusBar(context);

          vscode.window.showInformationMessage(`Added Maximo environment: ${environment.name}`);
        }
      );
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('mxscript.environments.edit', (environment: MaximoEnvironment) => {
      EnvironmentEditorPanel.createOrShow(
        context.extensionUri,
        context,
        environment,
        (updatedEnvironment: MaximoEnvironment) => {
          // Find and update environment in appropriate storage
          const globalEnvs = context.globalState.get<MaximoEnvironment[]>('mxscript.environments', []);
          const workspaceEnvs = context.workspaceState.get<MaximoEnvironment[]>('mxscript.environments', []);

          const globalIndex = globalEnvs.findIndex(e => e.id === updatedEnvironment.id);
          const workspaceIndex = workspaceEnvs.findIndex(e => e.id === updatedEnvironment.id);

          // Remove from current location
          if (globalIndex !== -1) {
            globalEnvs.splice(globalIndex, 1);
            context.globalState.update('mxscript.environments', globalEnvs);
          } else if (workspaceIndex !== -1) {
            workspaceEnvs.splice(workspaceIndex, 1);
            context.workspaceState.update('mxscript.environments', workspaceEnvs);
          }

          // Add to appropriate location based on scope
          if (updatedEnvironment.scope === 'workspace') {
            workspaceEnvs.push(updatedEnvironment);
            context.workspaceState.update('mxscript.environments', workspaceEnvs);
          } else {
            globalEnvs.push(updatedEnvironment);
            context.globalState.update('mxscript.environments', globalEnvs);
          }

          // If this was the active environment, apply the updated settings
          const activeEnvId = context.globalState.get<string>('mxscript.activeEnvironment');
          if (activeEnvId === updatedEnvironment.id) {
            // Update VSCode settings
            maximoEnvironmentTreeProvider.setActiveEnvironment(updatedEnvironment.id);
          }

          // Refresh the tree view
          maximoEnvironmentTreeProvider.refresh();

          // Update status bar
          updateStatusBar(context);

          vscode.window.showInformationMessage(`Updated Maximo environment: ${updatedEnvironment.name}`);
        }
      );
    })
  );

  let manageEnvironments = vscode.commands.registerCommand("mxscript.manageEnvironments", async () => {
    try {
      // Try to focus on either the tree view or the webview
      await vscode.commands.executeCommand('maximoEnvironments.focus');
    } catch (e) {
      try {
        await vscode.commands.executeCommand('workbench.view.extension.mxscript-environments');
      } catch (e) {
        vscode.window.showInformationMessage("Click on the Maximo Environments icon in the activity bar");
      }
    }
  });

  context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(MxScriptScheme, MxScriptProvider));
  context.subscriptions.push(upload);
  context.subscriptions.push(downloadall);
  context.subscriptions.push(compare);
  context.subscriptions.push(update);
  context.subscriptions.push(manageEnvironments);
  context.subscriptions.push(deleteScript);
  context.subscriptions.push(downloadallappxml);

  // Initialize status bar with current environment
  updateStatusBar(context);
}

// Function to update status bar with current environment
export function updateStatusBar(context: vscode.ExtensionContext) {
  const globalEnvs = context.globalState.get<MaximoEnvironment[]>('mxscript.environments', []);
  const workspaceEnvs = context.workspaceState.get<MaximoEnvironment[]>('mxscript.environments', []);
  const environments = [...globalEnvs, ...workspaceEnvs];
  const activeEnvId = context.globalState.get<string>('mxscript.activeEnvironment');

  if (activeEnvId && environments.length > 0) {
    const activeEnv = environments.find(env => env.id === activeEnvId);
    if (activeEnv) {
      statusBarItem.text = `$(globe) Maximo: ${activeEnv.name}`;
      statusBarItem.tooltip = `Connected to ${activeEnv.name} (${activeEnv.hostname}:${activeEnv.port})`;
      return;
    }
  }

  // No active environment found
  statusBarItem.text = "$(globe) Maximo: No Environment";
  statusBarItem.tooltip = "Click to manage Maximo environments";
}

/**
 * Ensures the workspace has the necessary Maximo configuration before running a command.
 * If the configuration is missing, it silently applies the settings from the
 * globally active environment.
 * @param context The extension context.
 * @param treeProvider The instance of the environment tree provider.
 */
async function ensureWorkspaceConfigured(
  context: vscode.ExtensionContext,
  treeProvider: MaximoEnvironmentTreeProvider
): Promise<void> {
  const config = vscode.workspace.getConfiguration('mxscript');
  const hostname = config.get<string>('serverSettings.hostname');

  // If hostname is missing, we assume the workspace is not configured.
  if (!hostname) {
    const activeEnvId = context.globalState.get<string>('mxscript.activeEnvironment');
    if (activeEnvId) {
      // A globally active environment exists, so apply its settings to this workspace silently.
      console.log('MXScript: Workspace not configured. Applying active environment settings.');
      treeProvider.setActiveEnvironment(activeEnvId, true); // Use the silent flag
    } else {
      // No active environment is set globally
      vscode.window.showWarningMessage('No active Maximo environment. Please set one from the Maximo Environments view.');
      vscode.commands.executeCommand('workbench.view.extension.mxscript-sidebar');
    }
  }
}

export function deactivate() { }
