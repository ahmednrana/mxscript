import * as vscode from "vscode";
import { MaximoClientProvider } from './client/client';
import { AppXmlService } from "./service/AutoScript/AppXmlService";
import { AutoScriptNextGen } from "./service/AutoScript/AutoScriptNextGen";
import { ConditionService } from "./service/AutoScript/ConditionService";
import { SimpleOSService } from './service/AutoScript/ISimpleOSService';
import { MaximoLoggingService } from "./service/AutoScript/LogService";
import { ConfigService } from './service/Config/ConfigService';
import { Logger } from './service/Logger/Logger';
import { EnvironmentLogHighlighter } from "./service/Logger/LogHighlighter";
import { MaximoEnvironmentTreeItem, MaximoEnvironmentTreeProvider } from './treeview/MaximoEnvironmentTreeProvider';
import { ReactEnvironmentEditorPanel } from './treeview/ReactEnvironmentEditorPanel';
import { getFileExtension, getFilename, showError, showWarning } from "./utils/utils";
import { EnvironmentLogContentProvider } from "./webview/EnvironmentLogContentProvider";
import { MaximoEnvironment } from './webview/EnvironmentManager';

// Status bar item to show current environment
let statusBarItem: vscode.StatusBarItem;
let fetchLogsStatusBarItem: vscode.StatusBarItem;
let uploadStatusBarItem: vscode.StatusBarItem;
let downloadStatusBarItem: vscode.StatusBarItem;
let compareStatusBarItem: vscode.StatusBarItem;



export function activate(context: vscode.ExtensionContext) {


  const configService = new ConfigService();
  // Configure the logger instance based on settings *before* anything else uses it.
  const logger = Logger.getInstance('MxScript', configService.getLogLevel());
  logger.info(`Logger level set to: ${configService.getLogLevel()}`);

  // Initialize the client wrapper (once, at startup)
  MaximoClientProvider.initialize(context, configService);
  logger.info('MxScript extension activated');

  // Backfill migration: ensure stored environments include condition_objectStructure
  (async () => {
    try {
      const backfillStore = async (store: vscode.Memento) => {
        const envs = store.get<MaximoEnvironment[]>('mxscript.environments', []);
        if (!envs || envs.length === 0) return;
        let changed = false;
        const next = envs.map(e => {
          if (!('condition_objectStructure' in e) || !e.condition_objectStructure) {
            changed = true;
            return { ...e, condition_objectStructure: 'MXL_CONDITION' } as MaximoEnvironment;
          }
          return e;
        });
        if (changed) {
          await store.update('mxscript.environments', next);
          logger.info('[migration] Backfilled condition_objectStructure for stored environments');
        }
      };
      await Promise.all([backfillStore(context.globalState), backfillStore(context.workspaceState)]);
    } catch (err) {
      logger.warn(`Migration/backfill skipped or failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  })();


  const MxScriptScheme = 'mxscript';
  const MxScriptProvider = new class implements vscode.TextDocumentContentProvider {
    provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): string {
      return uri.path;
    }
  };

  const logContentProvider = new EnvironmentLogContentProvider();
  context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider('mxscript-log', logContentProvider));
  context.subscriptions.push(logContentProvider);

  const logHighlighter = new EnvironmentLogHighlighter(logContentProvider);
  context.subscriptions.push(logHighlighter);


  // Status bar item for the active environment
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.command = "mxscript.manageEnvironments";
  statusBarItem.text = "$(globe) Maximo: No Environment";
  statusBarItem.tooltip = "Click to manage Maximo environments";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);
  // Status bar icon for fetching logs
  fetchLogsStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 99);
  fetchLogsStatusBarItem.text = "$(output) Fetch Log";
  fetchLogsStatusBarItem.command = "mxscript.fetchLogs";
  fetchLogsStatusBarItem.tooltip = "Fetch logs from the active Maximo environment";
  fetchLogsStatusBarItem.hide();
  context.subscriptions.push(fetchLogsStatusBarItem);

  uploadStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 98);
  // pass an argument so the command knows it was invoked from the status bar
  uploadStatusBarItem.command = {
    command: "mxscript.upload",
    title: "Upload",
    arguments: [{ source: 'statusbar' }]
  } as any;
  uploadStatusBarItem.text = "$(arrow-up)";
  uploadStatusBarItem.tooltip = "Upload to active Maximo environment";
  context.subscriptions.push(uploadStatusBarItem);

  downloadStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 97);
  // pass an argument so the command knows it was invoked from the status bar
  downloadStatusBarItem.command = {
    command: "mxscript.update",
    title: "Download",
    arguments: [{ source: 'statusbar' }]
  } as any;
  downloadStatusBarItem.text = "$(arrow-down)";
  downloadStatusBarItem.tooltip = "Download from active Maximo environment";
  context.subscriptions.push(downloadStatusBarItem);

  compareStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 96);
  // pass an argument so the command knows it was invoked from the status bar
  compareStatusBarItem.command = {
    command: "mxscript.compare",
    title: "Compare",
    arguments: [{ source: 'statusbar' }]
  } as any;
  compareStatusBarItem.text = "$(compare-changes)";
  compareStatusBarItem.tooltip = "Compare with active Maximo environment";
  context.subscriptions.push(compareStatusBarItem);

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
      ReactEnvironmentEditorPanel.createOrShow(
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

  // Command registration for maximoEnvironments.compareWithEnvironment
  const compareWithEnvironmentCommandHandler = (item?: any) => {
    if (item && item.environment) {
      // Called from the tree view with an item
      const fileName = getFilename();
      if (!fileName) {
        showError("No valid file is open");
        return;
      }

      const fileExtension = getFileExtension();
      if (!fileExtension) {
        showError("Could not determine file extension");
        return;
      }

      let config = new ConfigService();
      if (fileExtension === 'xml') {
        let appservice = new AppXmlService(context, config);
        appservice.compareWithEnvironment(item.environment);
      } else if (fileExtension === 'sql') {
        let ce = new ConditionService(context, config);
        ce.compareWithEnvironment(item.environment);
      } else {
        let as = new AutoScriptNextGen(context, config);
        as.compareWithEnvironment(item.environment);
      }
    } else {
      // Called from command palette without an item
      // Show a quick pick of available environments
      const environments = maximoEnvironmentTreeProvider.getEnvironments();
      if (environments.length === 0) {
        vscode.window.showInformationMessage("No environments found to compare with.");
        return;
      }

      const environmentItems = environments.map(env => ({
        label: env.name,
        description: `${env.hostname}:${env.port}`,
        environment: env
      }));

      vscode.window.showQuickPick(environmentItems, {
        placeHolder: "Select an environment to compare with"
      }).then(selectedItem => {
        if (selectedItem) {
          const fileName = getFilename();
          if (!fileName) {
            showError("No valid file is open");
            return;
          }

          const fileExtension = getFileExtension();
          if (!fileExtension) {
            showError("Could not determine file extension");
            return;
          }

          let config = new ConfigService();
          if (fileExtension === 'xml') {
            let appservice = new AppXmlService(context, config);
            appservice.compareWithEnvironment(selectedItem.environment);
          } else if (fileExtension === 'sql') {
            let ce = new ConditionService(context, config);
            ce.compareWithEnvironment(selectedItem.environment);
          } else {
            let as = new AutoScriptNextGen(context, config);
            as.compareWithEnvironment(selectedItem.environment);
          }
        }
      });
    }
  };

  context.subscriptions.push(
    vscode.commands.registerCommand('maximoEnvironments.compareWithEnvironment', compareWithEnvironmentCommandHandler)
  );

  // accept an optional argument to detect invocation source
  let upload = vscode.commands.registerCommand("mxscript.upload", async (arg?: { source?: string }) => {
    const invokedFromStatusBar = !!(arg && arg.source === 'statusbar');
    // You can handle invokedFromStatusBar differently if needed
    if (!(await ensureWorkspaceConfigured(context, maximoEnvironmentTreeProvider))) return;
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
    } else if (fileExtension === 'sql') {
      let ce: SimpleOSService = new ConditionService(context, config);
      ce.upload();
    } else {
      let as: SimpleOSService = new AutoScriptNextGen(context, config);
      as.upload();
    }
  });

  // accept an optional argument to detect invocation source
  let compare = vscode.commands.registerCommand("mxscript.compare", async (arg?: { source?: string }) => {
    const invokedFromStatusBar = !!(arg && arg.source === 'statusbar');
    // You can use invokedFromStatusBar to alter behavior or logging
    if (!(await ensureWorkspaceConfigured(context, maximoEnvironmentTreeProvider))) return;
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
    } else if (fileExtension === 'sql') {
      let ce: SimpleOSService = new ConditionService(context, config);
      ce.compareWithServer();
    } else {
      let as: SimpleOSService = new AutoScriptNextGen(context, config);
      as.compareWithServer();
    }
  });

  let compareWithEnvironment = vscode.commands.registerCommand("mxscript.compareWithEnvironment", async () => {
    const fileName = getFilename();
    if (!fileName) {
      showError("No valid file is open");
      return;
    }

    const fileExtension = getFileExtension();
    if (!fileExtension) {
      showError("Could not determine file extension");
      return;
    }

    // Show a quick pick of available environments
    const environments = maximoEnvironmentTreeProvider.getEnvironments();
    if (environments.length === 0) {
      vscode.window.showInformationMessage("No environments found to compare with.");
      return;
    }

    const environmentItems = environments.map(env => ({
      label: env.name,
      description: `${env.hostname}:${env.port}`,
      environment: env
    }));

    vscode.window.showQuickPick(environmentItems, {
      placeHolder: "Select an environment to compare with"
    }).then(selectedItem => {
      if (selectedItem) {
        let config = new ConfigService();
        if (fileExtension === 'xml') {
          let appservice = new AppXmlService(context, config);
          appservice.compareWithEnvironment(selectedItem.environment);
        } else {
          let as = new AutoScriptNextGen(context, config);
          as.compareWithEnvironment(selectedItem.environment);
        }
      }
    });
  });

  // accept an optional argument to detect invocation source
  let update = vscode.commands.registerCommand("mxscript.update", async (arg?: { source?: string }) => {
    const invokedFromStatusBar = !!(arg && arg.source === 'statusbar');
    // You can use invokedFromStatusBar here if special handling is required
    if (!(await ensureWorkspaceConfigured(context, maximoEnvironmentTreeProvider))) return;
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
    } else if (fileExtension == 'sql') {
      let ce: SimpleOSService = new ConditionService(context, config);
      ce.update();
    } else {
      let as: SimpleOSService = new AutoScriptNextGen(context, config);
      as.update();
    }
  });

  let downloadall = vscode.commands.registerCommand("mxscript.downloadall", async () => {
    if (!(await ensureWorkspaceConfigured(context, maximoEnvironmentTreeProvider))) return;
    let as: SimpleOSService = new AutoScriptNextGen(context, new ConfigService());
    as.downloadAll();
  });

  let deleteItem = vscode.commands.registerCommand("mxscript.delete", async () => {
    if (!(await ensureWorkspaceConfigured(context, maximoEnvironmentTreeProvider))) return;
    const fileName = getFilename();
    if (!fileName) {
      showError("No valid file is open");
      return;
    }
    const fileExtension = getFileExtension();
    if (!fileExtension) {
      showError("Could not determine file extension");
      return;
    }
    let config = new ConfigService();
    if (fileExtension === 'xml') {
      let appservice = new AppXmlService(context, config);
      appservice.delete();
    } else if (fileExtension == 'sql') {
      let cs: SimpleOSService = new ConditionService(context, config);
      cs.delete();
    } else {
      let as: SimpleOSService = new AutoScriptNextGen(context, config);
      as.delete();
    }
  });

  let downloadallappxml = vscode.commands.registerCommand("mxscript.downloadallappxml", async () => {
    if (!(await ensureWorkspaceConfigured(context, maximoEnvironmentTreeProvider))) return;
    let appservice: SimpleOSService = new AppXmlService(context, new ConfigService());
    appservice.downloadAll();
  });

  let downloadallcondition = vscode.commands.registerCommand("mxscript.downloadallcondition", async () => {
    if (!(await ensureWorkspaceConfigured(context, maximoEnvironmentTreeProvider))) return;
    let conditionService: SimpleOSService = new ConditionService(context, new ConfigService());
    conditionService.downloadAll();
  });

  let fetchLogs = vscode.commands.registerCommand("mxscript.fetchLogs", async (item?: MaximoEnvironmentTreeItem | MaximoEnvironment) => {
    const environmentFromItem = extractEnvironmentFromItem(item);

    if (environmentFromItem) {
      const logService = new MaximoLoggingService(new ConfigService());
      await logService.fetchEnvironmentLogs(environmentFromItem, logContentProvider);
      return;
    }

    if (!(await ensureWorkspaceConfigured(context, maximoEnvironmentTreeProvider))) {
      return;
    }

    const activeEnvironment = getActiveEnvironment(context);
    if (!activeEnvironment) {
      showWarning("No active environment set. Please select an environment before fetching logs.");
      return;
    }

    const logService = new MaximoLoggingService(new ConfigService());
    await logService.fetchCurrentEnvironmentLogs(logContentProvider);
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
      ReactEnvironmentEditorPanel.createOrShow(
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
      ReactEnvironmentEditorPanel.createOrShow(
        context.extensionUri,
        context,
        environment,
        async (updatedEnvironment: MaximoEnvironment) => { // made async
          // Find and update environment in appropriate storage
          const globalEnvs = context.globalState.get<MaximoEnvironment[]>('mxscript.environments', []);
          const workspaceEnvs = context.workspaceState.get<MaximoEnvironment[]>('mxscript.environments', []);

          const globalIndex = globalEnvs.findIndex(e => e.id === updatedEnvironment.id);
          const workspaceIndex = workspaceEnvs.findIndex(e => e.id === updatedEnvironment.id);

          const updatePromises: Thenable<any>[] = [];

          // Remove from current location
          if (globalIndex !== -1) {
            globalEnvs.splice(globalIndex, 1);
            updatePromises.push(context.globalState.update('mxscript.environments', globalEnvs));
          } else if (workspaceIndex !== -1) {
            workspaceEnvs.splice(workspaceIndex, 1);
            updatePromises.push(context.workspaceState.update('mxscript.environments', workspaceEnvs));
          }

          // Add to appropriate location based on scope
          if (updatedEnvironment.scope === 'workspace') {
            workspaceEnvs.push(updatedEnvironment);
            updatePromises.push(context.workspaceState.update('mxscript.environments', workspaceEnvs));
          } else {
            globalEnvs.push(updatedEnvironment);
            updatePromises.push(context.globalState.update('mxscript.environments', globalEnvs));
          }

          // Wait for all state updates to persist to the Mementos
          await Promise.all(updatePromises);

          // If this was the active environment, apply the updated settings
          const activeEnvId = context.globalState.get<string>('mxscript.activeEnvironment');
          if (activeEnvId === updatedEnvironment.id) {
            // Re-apply the active environment after storage is up-to-date.
            // Use silent=true if you don't want UI noise
            maximoEnvironmentTreeProvider.setActiveEnvironment(updatedEnvironment.id, true);
          }

          // Refresh the tree view and update status bar
          maximoEnvironmentTreeProvider.refresh();
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
  context.subscriptions.push(deleteItem);
  context.subscriptions.push(downloadallappxml);
  context.subscriptions.push(downloadallcondition);
  context.subscriptions.push(fetchLogs);

  // Initialize status bar with current environment
  updateStatusBar(context);
}

// Function to update status bar with current environment
export function updateStatusBar(context: vscode.ExtensionContext) {
  const activeEnv = getActiveEnvironment(context);

  if (activeEnv) {
    statusBarItem.text = `$(globe) Maximo: ${activeEnv.name}`;
    statusBarItem.tooltip = `Connected to ${activeEnv.name} (${activeEnv.hostname}:${activeEnv.port})`;
    if (fetchLogsStatusBarItem) {
      fetchLogsStatusBarItem.text = "$(output) Fetch Log";
      fetchLogsStatusBarItem.tooltip = `Fetch logs for ${activeEnv.name}`;
      fetchLogsStatusBarItem.show();
    }
    uploadStatusBarItem.show();
    downloadStatusBarItem.show();
    compareStatusBarItem.show();
    return;
  }

  // No active environment found
  statusBarItem.text = "$(globe) Maximo: No Environment";
  statusBarItem.tooltip = "Click to manage Maximo environments";
  if (fetchLogsStatusBarItem) {
    fetchLogsStatusBarItem.hide();
  }
  uploadStatusBarItem.hide();
  downloadStatusBarItem.hide();
  compareStatusBarItem.hide();
}

function getAllEnvironments(context: vscode.ExtensionContext): MaximoEnvironment[] {
  const globalEnvs = context.globalState.get<MaximoEnvironment[]>('mxscript.environments', []);
  const workspaceEnvs = context.workspaceState.get<MaximoEnvironment[]>('mxscript.environments', []);
  return [...globalEnvs, ...workspaceEnvs];
}

function getActiveEnvironment(context: vscode.ExtensionContext): MaximoEnvironment | undefined {
  const environments = getAllEnvironments(context);
  const activeEnvId = context.globalState.get<string>('mxscript.activeEnvironment');
  if (!activeEnvId) {
    return undefined;
  }
  return environments.find(env => env.id === activeEnvId);
}

function extractEnvironmentFromItem(item?: MaximoEnvironmentTreeItem | MaximoEnvironment): MaximoEnvironment | undefined {
  if (!item) {
    return undefined;
  }

  const possibleTreeItem = item as MaximoEnvironmentTreeItem;
  if (possibleTreeItem && typeof possibleTreeItem === 'object' && 'environment' in possibleTreeItem) {
    return possibleTreeItem.environment;
  }

  const maybeEnvironment = item as MaximoEnvironment;
  if (maybeEnvironment && typeof maybeEnvironment === 'object' && 'id' in maybeEnvironment && 'hostname' in maybeEnvironment) {
    return maybeEnvironment;
  }

  return undefined;
}

/**
 * Ensures the workspace has the necessary Maximo configuration before running a command.
 * If the configuration is missing, it silently applies the settings from the
 * globally active environment.
 * @param context The extension context.
 * @param treeProvider The instance of the environment tree provider.
 * @returns True if the workspace is configured and the command can proceed; false otherwise.
 */
async function ensureWorkspaceConfigured(
  context: vscode.ExtensionContext,
  treeProvider: MaximoEnvironmentTreeProvider
): Promise<boolean> {
  const config = vscode.workspace.getConfiguration('mxscript');
  const hostname = config.get<string>('serverSettings.hostname');
  const activeEnvId = context.globalState.get<string>('mxscript.activeEnvironment');

  // Get all environments to find the active one
  const globalEnvs = context.globalState.get<MaximoEnvironment[]>('mxscript.environments', []);
  const workspaceEnvs = context.workspaceState.get<MaximoEnvironment[]>('mxscript.environments', []);
  const environments = [...globalEnvs, ...workspaceEnvs];
  const activeEnv = environments.find(env => env.id === activeEnvId);

  // If hostname is missing, we assume the workspace is not configured.
  if (!hostname) {
    if (activeEnvId) {
      // A globally active environment exists, so apply its settings to this workspace silently.
      console.log('MXScript: Workspace not configured. Applying active environment settings.');
      treeProvider.setActiveEnvironment(activeEnvId, true); // Use the silent flag
      return true; // Proceed after applying settings
    } else {
      // No active environment is set globally
      vscode.window.showWarningMessage('No active Maximo environment. Please set one from the Maximo Environments view.');
      vscode.commands.executeCommand('workbench.view.extension.mxscript-sidebar');
      return false; // Do not proceed
    }
  } else if (activeEnv && activeEnv.hostname !== hostname) {
    // Hostname mismatch: active environment hostname doesn't match config hostname
    vscode.window.showWarningMessage(
      `The active Maximo environment hostname (${activeEnv.hostname}) does not match the configured hostname in settings (${hostname}). Please update your settings or set the correct active environment.`,
      'Manage Environments'
    ).then(selection => {
      if (selection === 'Manage Environments') {
        vscode.commands.executeCommand('mxscript.manageEnvironments');
      }
    });
    return false; // Do not proceed due to mismatch
  }

  return true; // All checks passed, proceed
}

export function deactivate() { Logger.getInstance().dispose() }
