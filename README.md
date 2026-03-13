# MxScript

Accelerate your Maximo workflow with integrated tools for automation scripts, application design, environment management, and MAS administrative utilities.

## Features

- Can upload / download / compare / delete scripts , application xmls and condition expressions with the currently selected environment
- Multiple Environment Support
  - Add / edit / delete environments using UI
  - Can switch between environment using UI
  - Provides a treeview for environments
- Ability to fetch logs from currently selected or any other Maximo Manage environment
- Can compare with currently selected or any other Maximo environment
- Adds buttons in status bar for quick switch, upload, download, compare and fetching logs
- MAS Supported
- Can refresh / reload Maximo caches
- MAS Tools API (maxinst) Supported
- Open in Maximo: Directly open scripts, applications, or conditions in the Maximo Web UI from VS Code (supports browser selection and persistence)

## Supported Actions

1. [Download from Maximo (picker)](#download-from-maximo)
2. [Download Script(s) from Server](#download-scripts-from-server)
3. [Download Application(s) xml from Server](#download-application-xmls-from-server)
4. [Download Conditions(s) from Server](#download-conditions-from-server)
5. [Download (Update) from Server](#download-update-from-server)
6. [Upload to Server](#upload-to-server) *(Not for application xml)*
7. [Compare with Server](#compare-with-environment-script--xml--condition)
8. [Execute Script using Script Handler](#execute-script-using-script-handler) *(Only scripts)*
9. [Delete from Server](#delete-this-file-from-server) *(Not for application xml)*
10. [Compare with Another Environment](#compare-with-other-environment)
11. [Fetch Logs from Server](#fetch-logs-from-server) *(only for Manage)*
12. [Manage Environments (Add / Edit / Delete / Set Active / Import / Export)](#managing-environments-in-ui)
13. [Cache Refresh / reload](#cache-refresh)
14. [MAS Tools](#mas-tools)
15. [Open in Maximo](#open-in-maximo)

---
[Requirements](#requirements)

[Configuration](#configuration)

[Status bar shortcuts](#status-bar-shortcuts)

[Tree view actions](#tree-view-actions)


## Actions

### Download from Maximo

#### Activate

Use the command pallete to select this option

#### Functionality

This will show a list of available options to download. This is a high level menu and will present with all the other bulk download options

![Update](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/download_from_server.gif)

[Back to Top](#mxscript)


### Download Script(s) from Server

#### Activate

Use the command pallete to select this option

#### Functionality

This will show a select value of the following

- All

- Multiple

In multiple it will show a multi select menu to download scripts

![Update](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/download_all_scripts.gif)

[Back to Top](#mxscript)



### Download Application xml(s) from Server

#### Activate

Use the command pallete to select this option

#### Functionality

This will show a select value of the following

- All

- Multiple

In multiple it will show a multi select menu to download app xmls

![Update](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/download_all_xml.gif)

[Back to Top](#mxscript)



### Download Condition(s) from Server

#### Activate

Use the command pallete to select this option

#### Functionality

This will show a select value of the following

- All

- Multiple

In multiple it will show a multi select menu to download **SQL based** conditions

![Update](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/download_all_conditions.gif)

[Back to Top](#mxscript)



### Download (Update) from Server

#### Activate

Use the command palette and select this option or use the status bar button for it

#### Functionality

You must have a saved file open for this to work. This downloads the updated automation script or application XML from the server for the opened tab, depending on the file type.

![Update](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/update_from_server.gif)

[Back to Top](#mxscript)



### Upload to Server

#### Activate

Use the command palette and select this option or use the status bar button for it

#### Functionality

You must have a saved file open for this to work. This uploads the automation script or condition expression from the opened tab to the server

![Update](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/upload_to_server.gif)



[Back to Top](#mxscript)



### Compare with Environment (Script / XML / Condition)

#### Activate

Use the command palette and select this option

- Compare with current Environment

- Compare with other Environment

#### Functionality

You must have a saved file open for this to work. 

##### Compare with current Environment

Compares the opened automation script, application XML or condition with the current environment

![Update](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/compare_with_current_env.gif)

#### Compare with other Environment

Compares the opened automation script, application XML or condition with the selected environment

![Update](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/compare_with_other_env.gif)



[Back to Top](#mxscript)

### Delete this file from Server

#### Activate

Use the command palette and select this option.

#### Functionality

This deletes the automation script or condition on the server

![Update](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/delete_from_server.gif)

[Back to Top](#mxscript)

### Execute script using Script Handler

#### Activate

Use the command palette, click the "execute" (play) status bar button next to the active environment, or use the command "Execute script using Script Handler".

#### Functionality
 
 Uploads the currently opened automation script (`.py`, `.js`, or `.jy`) to the active environment, immediately executes it, and deletes it from the server to keep your environment clean. 
 The body returned from the script execution is usually stored in `responseBody` implicit variable in Maximo automation scripts. The response body is then displayed in the selected display location.

 **Display Options:**
 By default, the result is displayed in a **new focused tab** (`newTab`). You can change this in settings (`mxscript.execution.displayLocation`) to:
 - **newTab** (Default): Opens a focused tab in the active editor group.
 - **sideView**: Opens a read-only tab beside the current editor (with syntax/severity highlighting).
 - **bottomPanel**: Shows formatted and colorized output in the "MxScript Result" Output Channel.
 

![Execute](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/execute_script.gif)

You can read more about it below

https://ibm-maximo-dev.github.io/maximo-restapi-documentation/autoscript/autoscript

https://ibm-maximo-dev.github.io/maximo-autoscript-documentation/rest/scripthandler/


**⚠️ Warning**: You must confirm a security prompt explicitly warning you before this execution happens. This functionality mimics the standard Automation Script Handler REST API (GET method).

[Back to Top](#mxscript)

### Fetch Logs from Server

#### Activate

Use the command palette or click the "Fetch Logs" status bar button next to the active environment name or click on "Fetch logs"" button in the maximo environments tree view

#### Functionality

Fetches Manage logs via the Maximo stream log end point. When complete, a dedicated editor tab opens (and is reused per environment) titled with the environment name so you can inspect the log output immediately

![Update](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/fetch_logs.gif)

[Back to Top](#mxscript)
 
### Open in Maximo
 
#### Activate
 
Use the command palette, click the "link-external" icon status bar button (you can enable it in settings), or click the "link-external" icon button in the Maximo Environments tree view.
 
#### Functionality
 
This feature allows you to quickly open the record you are currently working on directly in the Maximo Web UI. 
 
- **Context-Aware**: If you have an automation script, application XML, or condition expression file open, it will attempt to navigate directly to that specific record. If no file is open, it falls back to opening the base Maximo URL.
- **Browser Selection**: The first time you use this for an environment, you will be prompted to select a browser (Chrome, Edge, Firefox, or System Default). You can choose to remember this preference for each environment. You can also change the browser in the extension settings.
 
### Managing Environments in UI

You can add multiple environments and switch between them.
Under the explorer webview there is a section for Maximo Environments:

Using the buttons displayed over these environments you can activate, edit, delete, export and import them as well.

![Update](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/add_env_button.jpg)

While adding / editing environment you can click on the **Verify Settings** button to check the authentication with the server.

There are two types of environments,

- global (Global are always available in vscode)

- workspace level are only available to the workspace it was created in) 
  
  They have their own icons.

- Active Environment: Uses the $(radio-tower) icon.

- Global Environment: Uses the $(globe) icon.

- Workspace Environment: Uses the $(symbol-folder) icon
  
  ![Update](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/activate_edit_delete_env.png)
  
  [Back to Top](#mxscript)


### Cache Refresh

It can also refresh / reload the cache present in IBM Maximo. Sometimes needed after adding certain items in maximo. Maximo wont refresh the changes unless those caches are refreshed. e.g. INTOBJECT, MAXPROP etc

Upon triggering this option, you will be presented with a list of caches (might differ for 7.6 or MAS) to be refreshed. You can select them all, multiple, or a single one.

![Update](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/cache-refresh.gif)
  
  [Back to Top](#mxscript)



## Status bar shortcuts

When an active environment is set the status bar shows quick-action icons:

![Object Structure](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/status_bar_icons.jpg)

- **Active Environment**— It shows the maximo active environment you have selected
- **Fetch Log** — runs `mxscript.fetchLogs` (fetches logs for active environment) — NOTE: Fetch Logs currently works only against Manage (Maximo Application Suite). It is not supported for classic Maximo 7.6 REST endpoints
- **Select and download items from server** — Shows the same download high level menu as [Download from Server](#download-from-server) (opens a quick-pick to choose: scripts, application XML, or conditions)
- **Upload** — Uploads the currently opened file to current environment
- **Download**— Updates the currently open file from current environment
- **Compare**— Compares the currently open file with version at current environment
- **Upload and Execute** — Uploads, executes and deletes the currently open file at the current environment
- **Open in Maximo** — Opens the currently open record (script/app/condition) in the Maximo Web UI via your preferred browser
- **Delete** — Deletes the currently open file at the current environment
- **MAS Tools Menu** — Opens the MAS Tools (MAS only) - Access Logs, Database tools, Pod Manager, Customizations etc. See [API for administrative utilities](https://www.ibm.com/docs/en/masv-and-l/maximo-manage/cd?topic=reference-apis-administrative-utilities)

[Back to Top](#mxscript)

## MAS Tools

New in version 1.5+, MxScript includes a comprehensive suite of management tools specifically for Maximo Application Suite (MAS) environments. This is the MAS tools API (which usually operates on the maxinst pod).

### Requirements

To use these features, you must configure the **Tools Hostname** in your environment settings. This is typically the `maxinst` pod route (e.g., `https://maxinst.manage.mas-instance.com`).
It will add a tools icon in the status bar 

![Tools Icon](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/tools_icon.jpg)
You can click this icon to show the Tools menu or use the command 

![Tools Menu](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/tools_menu.jpg)

### Features

#### Tools Logs
- **View Tools Logs**: Browse and view logs from the `maxinst` tools pod.
- **Upload Logs to S3**: Trigger a log upload to the configured S3 bucket.

#### Certificates
- **Add Trusted Certificate from Host**: Download and add a trusted SSL certificate from a remote host (useful for fixing connectivity issues).
- **Add Trusted Certificate from File**: Add a trusted certificate from a local `.pem` or `.crt` file.

#### Database
- **Validate Database**: Run the validation utility to check readiness for MAS upgrades.
- **Configure Database**: Run `configdb` (requires Manage to be stopped).
- **Reset Crypto**: Reset `CRYPTO` and `CRYPTOX` columns if they become corrupted or out of sync.

#### Diagnostics
- **Generate ERD**: Generate an Entity Relationship Diagram (ERD) for your Maximo database. You can download the result as a ZIP file.
- **Integrity Checker**:
  - **Generate Report**: Run the integrity checker in report-only mode.
  - **Run Repair**: Run the integrity checker in repair mode (Use with caution!).

#### Pod Manager
- **Start All Pods**: Start the Maximo Manage application server pods.
- **Stop All Pods**: Stop the Maximo Manage application server pods.

#### Build Status
- **Check Status**: View the current build and deployment status of the Maximo image.

#### Script Runner
- **Run DBC Script**: Execute a specific database configuration (DBC) script by name.

[Back to Top](#mxscript)

## Tree view actions

Each environment in the "Maximo Environments" tree has inline buttons

![Object Structure](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/tree_view.jpg)

The buttons call the following commands:

- **Activate (set as active)** → Selects the environment as active
- **Edit**→ Edits the environment
- **Delete**→ Deletes that environment
- **Compare**→ Compares the currently opened file with this environment
- **Open in Maximo**→ Opens the currently record or environment in Maximo Web UI
- **Fetch Logs**→ Fetches the log from this environment

You can add / refresh an environment or use the tree toolbar:

- Add → Adds a new environment
- Refresh → Refreshes an environment
- Export → Exports all configured environments to a JSON file
- Import → Imports environments from a previously exported JSON file

[Back to Top](#mxscript)

## Environment scope and storage

- Global environments are stored in the extension `globalState` and are available across workspaces.

- Workspace environments are stored in `workspaceState` and visible only in that workspace.

- The "active environment" ID is saved in `globalState` under `mxscript.activeEnvironment`.
  

  [Back to Top](#mxscript)

## Requirements

You should have access to an instance of IBM Maximo which supports the Nextgen rest api



## Configuration

#### Configuring Object Structures

##### Automation Scripts

You must have rights to use an object structure having `AUTOSCRIPT` as its base object.

> There is an object structure `MXAPIAUTOSCRIPT` created by default. You can use it

If your installation does not have this OS, follow these steps to create an object structure:

1. Go to Object Structures
2. Click on `New Object Structure`
3. Give it any name (e.g. `MXSCRIPT`). In Consumed by field enter `INTEGRATION`
4. In the source object table click on New Row. Then in that new row select `AUTOSCRIPT` in object field.
5. Save
6. Grant your user appropriate rights for this object structure

It should look like this:

![Object Structure](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/os.png)

##### Application XML

You must have rights to use an object structure having `MAXPRESENTATION` as its base object.

> There is no built in object structure for it. You need to create it

If your installation does not have this OS, follow these steps to create an object structure:

1. Go to Object Structures
2. Click on `New Object Structure`
3. Give it any name (e.g. `MXAPPXML`). In Consumed by field enter `INTEGRATION`
4. In the source object table click on New Row. Then in that new row select `MAXPRESENTATION` in object field.
5. Save
6. Grant your user appropriate rights for this object structure

It should look like this:

![Object Structure](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/osappxml.png)

#### Condition Expression OS

Object Strcuture for condition Expression should be like below

![](images/condtion_os.jpg)

#### Configuring Object Structure Security

If you get this error:

> Error 400: BMXAA9301E - The user of the transaction is not authorized for Object Structure {1}. Configure authorization in the object structure application and grant necessary access to the user

You can either turn off authentication for OS [Turn Off OS Authorization](https://www.ibm.com/support/pages/mif-object-structure-authorization)
or grant authorization for that specific OS [Grant OS Authorization](https://www.ibm.com/support/pages/using-object-structure-security-limit-access-security-groups)



[Back to Top](#mxscript)

## 

Before using this extension you need to add a few settings

### Adding settings in Settings UI

It's also possible to edit these settings in Setting UI. This only supports a single environment.

![Settings UI](https://raw.githubusercontent.com/ahmednrana/mxscript/refs/heads/master/images/settingsui.png)

### Adding the settings in json

You can also edit them in `settings.json` of your project.

This extension contributes the following settings:

| Property Name                                              | Type    | Default  | Description                                                                                       |
| ---------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------- |
| `mxscript.serverSettings.hostname`                         | string  |          | Hostname / IP of Maximo server (e.g. 10.10.12.12 or www.xyz.com)                                  |
| `mxscript.serverSettings.toolsHostname`                    | string  |          | Hostname for Tools API (maxinst). Only for MAS environments.                                      |
| `mxscript.serverSettings.port`                             | number  |          | Maximo port                                                                                       |
| `mxscript.authentication.username`                         | string  | maxadmin | Username for Maximo Authentication                                                                |
| `mxscript.authentication.password`                         | string  | maxadmin | Password for Maximo Authentication                                                                |
| `mxscript.authentication.apikey`                           | string  |          | API key Maximo Authentication                                                                     |
| `mxscript.authentication.authenticationType`               | string  | internal | Type of Authentication (internal, ldap, apikey)                                                   |
| `mxscript.serverSettings.objectStructure`                  | string  | MXSCRIPT | Object Structure to be used for scripts uploading / downloading / deletion                        |
| `mxscript.appxml.objectStructure`                          | string  | MXL_APPS | Object Structure to be used for App XML uploading / downloading                                   |
| `mxscript.serverSettings.httpProtocol`                     | string  | http     | Http protocol (http or https)                                                                     |
| `mxscript.scriptSettings.createPythonFileForJythonScripts` | boolean | true     | Create Jython script in Maximo even if the file in editor is .py                                  |
| `mxscript.scriptSettings.logLevel`                         | string  |          | The log level to set with scripts when creating / updating them (DEBUG, INFO, WARN, ERROR, FATAL) |
| `mxscript.scriptSettings.ignoresslerrors`                  | boolean | false    | Ignore SSL errors                                                                                 |
| `mxscript.scriptSettings.sslcertificate`                  | string  |          | A custom certificate                                                                              |
| `mxscript.appxml.formatOnDownloadAndCompare`               | boolean | true     | Whether to format XML on download and compare                                                     |
| `mxscript.statusBar.showFetchLogs`                         | boolean | true     | Show the Fetch Logs icon in the status bar                                                        |
| `mxscript.statusBar.showDownloadFromMaximo`                | boolean | true     | Show the Download from Maximo icon in the status bar                                              |
| `mxscript.statusBar.showUpload`                            | boolean | true     | Show the Upload icon in the status bar                                                            |
| `mxscript.statusBar.showDownload`                          | boolean | true     | Show the Download icon in the status bar                                                          |
| `mxscript.statusBar.showCompare`                           | boolean | true     | Show the Compare icon in the status bar                                                           |
| `mxscript.statusBar.showUploadAndExecute`                  | boolean | true     | Show the Upload and Execute icon in the status bar                                                |
| `mxscript.statusBar.showDelete`                            | boolean | false    | Show the Delete icon in the status bar                                                            |
| `mxscript.statusBar.showToolsMenu`                         | boolean | false    | Show the Tools Menu icon in the status bar                                                        |
| `mxscript.statusBar.showOpenInMaximo`                      | boolean | false    | Show the Open in Maximo icon in the status bar                                                    |
| `mxscript.statusBar.showManageEnvironments`                | boolean | true     | Show the Manage Environments icon in the status bar                                               |
| `mxscript.execution.displayLocation`                       | string  | newTab   | Where to display execution results (newTab, sideView, bottomPanel)                                |

## 

## Troubleshooting and Known Issues

- If your workspace lacks explicit `mxscript.serverSettings.hostname`, but a global active environment exists, the extension will silently apply the active environment settings to the workspace (this is the "silent apply" behavior). If hostname mismatches are detected the user is warned and asked to manage environments.

- "No active Maximo environment" — Set an active environment in the Maximo Environments view or add one via the command palette.

- Hostname mismatch warning — Either update your workspace `mxscript.serverSettings.hostname` or set the correct active environment.

- SSL errors — Toggle `mxscript.scriptSettings.ignoresslerrors` to ignore SSL validation (not recommended for production). It is better to add the SSL certificate in environment settings.

- Fetch Logs not working — Fetch Logs uses Manage APIs and is not available for classic Maximo 7.6 endpoints. Make sure you're pointing to a Manage instance if you need log fetching

- In previous version the OS for apps was a simple one which had only one object in it i.e. MAXPRESENTATION. Now it requires an OS with at least objects in it. MAXAPPS and MAXPRESENTATION. You might need to re create that

- Double check the authentication type, user/pass or the api key provided

- If you encounter any bug then please open an issue at github [repository](https://github.com/ahmednrana/mxscript)

[Back to Top](#mxscript)
 
 ## Release Notes
### 1.6.6

- Added **syntax and severity colorization** for execution results in both side view and bottom panel.
- Added new **Display Location** setting for execution results with three options: `newTab` (default), `sideView`, and `bottomPanel`.
- Upgraded Output Channel to `LogOutputChannel` for rich color support in the bottom panel.
 
### 1.6.4
 
- Added **Open in Maximo** functionality with status bar and tree view shortcuts
- Added dynamic browser detection and per-environment browser preference
- Improved script execution result handling and display
- Updated dependencies and minor fixes
 
### 1.6.0

- Added execute script functionality
- Added option to show / hide buttons in status bar using extension settings
- Added option to import and export Maximo environments

### 1.5.0

- Added MAXINST pod Tools API support

### 1.4.4

- Added option to refresh Maximo cache

### 1.4.0

- Added option to download / upload / compare the condition expressions (sql based only)

### 1.3.5

- Added compare with environment feature - click the compare button next to any environment in the tree view to compare your local script/XML with that environment

### 1.3.4

- Added a Fetch Logs command with a status bar shortcut that opens an environment-specific log viewer tab.

### 1.2.5

Added option to add a custom ssl certificate

### 1.1.8

Fixed a bug where updating an XML wont be reflected in Maximo UI

### 1.1.5

Added logging output channel

### 1.1.0

Fixed script creation error for non english languages

### 1.0.5

Fixed ssl ignore settings

### 1.0.1

Fixed app xml OS not being saved

### 1.0.0

Added support for managing application xml

### 0.9.2

Fixed OS not being read correctly

### 0.7.0

Added option to add multiple environments using UI

### 0.6.5

Added option to ignore SSL based errors

### 0.6.0

Added support for API key

### 0.5.0

Initial release added upload, download, download all and compare with server functions.

Feel free to reach me at [linkedin](https://www.linkedin.com/in/ranaahmed/) or [Maximomize](https://maximomize.com) or [wordpress](https://maximomize.wordpress.com). I would love to meet fellow maximo consultants.

## Contributing / Support

If you encounter any bugs, have feature requests, or want to contribute, please open an issue at our GitHub [repository](https://github.com/ahmednrana/mxscript).

> **Note:** This is work of a third party and not an IBM official project.
