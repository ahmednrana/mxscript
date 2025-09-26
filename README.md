# MxScript

A script manager for IBM Maximo / Maximo Application Suite. This allows simple management (upload / download / comparison) of automation scripts and application XML from within VS Code.

## Features

This extension helps developers using VS Code to manage scripts and application XML for IBM Maximo / Manage.  
It provides unified actions for both Automation Scripts and Application XML.

### Supported Actions

For both Automation Scripts and Application XML, you can:

1. [Update from Server](#download-update-script--xml-from-server)
2. [Compare with Server](#compare-script--xml-with-server)
3. [Upload to Server](#upload-to-server) *(only for Automation Scripts)*
4. [Download All Scripts from Server](#download-all-scripts-from-server)
5. [Download All Application's xml from Server](#download-all-applicationxml-from-server)
6. [Delete Script from Server](#delete-script-from-server) *(only for Automation Scripts)*
7. [Fetch Logs from Server](#fetch-logs-from-server)

---

## Actions

### Download (Update) Script / XML from Server

#### Activate

Use the command palette and select this option.

#### Functionality

You must have a saved file open for this to work. This downloads the updated automation script or application XML from the server for the opened tab, depending on the file type.

![Update](./images/update.gif)

[Back to Top](#mxscript)

### Compare Script / XML with Server

#### Activate

Use the command palette and select this option.

#### Functionality

You must have a saved file open for this to work. This downloads the updated automation script or application XML for the opened tab and compares it.

![Compare](./images/compare.gif)

[Back to Top](#mxscript)

### Upload to Server

#### Activate

Use the command palette and select this option.

#### Functionality

You must have a saved file open for this to work. This uploads the automation script or application XML (application XML currently not working) from the opened tab to the server.

![Upload](./images/upload.gif)

[Back to Top](#mxscript)

### Download All Scripts from Server

#### Activate

Use the command palette and select this option.

#### Functionality

This downloads all automation scripts from the Maximo server to the folder you select.

![DownloadAll](./images/downloadall.gif)

[Back to Top](#mxscript)

### Download All Application's xml from Server

#### Activate

Use the command palette and select this option.

#### Functionality

This downloads all application XML files from the Maximo server to the folder you select.

![DownloadAll](./images/downloadall.gif)

[Back to Top](#mxscript)

### Delete Script from Server

#### Activate

Use the command palette and select this option.

#### Functionality

This deletes the automation script on the server.

[Back to Top](#mxscript)

### Fetch Logs from Server

#### Activate

Use the command palette or click the "Fetch Log" status bar button next to the active environment name.

#### Functionality

Displays live progress while the extension downloads the latest Manage logs via the Maximo logging service. When complete, a dedicated editor tab opens (and is reused per environment) titled with the environment name so you can inspect the log output immediately.

[Back to Top](#mxscript)

---

## Requirements

You should have access to an instance of IBM Maximo to manage scripts and application XML.

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

![Object Structure](./images/os.png)

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

![Object Structure](./images/osappxml.png)

#### Configuring Object Structure Security

If you get this error:

> Error 400: BMXAA9301E - The user of the transaction is not authorized for Object Structure {1}. Configure authorization in the object structure application and grant necessary access to the user

You can either turn off authentication for OS [Turn Off OS Authorization](https://www.ibm.com/support/pages/mif-object-structure-authorization)
or grant authorization for that specific OS [Grant OS Authorization](https://www.ibm.com/support/pages/using-object-structure-security-limit-access-security-groups)

## Extension Settings

Before using this extension you need to add a few settings.

### Managing Environments in UI

You can add multiple environments and switch between them.
Under the explorer webview there is a section for Maximo Environments:

![Add environment plus UI](./images/add_env_button.jpg)

You can easily add multiple environments:

![Add environment UI](./images/add_new_env.png)

Using the buttons displayed over these environments you can activate, edit and delete them as well:

![Add Edit Delete Button](./images/activate_edit_delete_env.png)

There are two types of environments, global or workspace. Global are always available in vscode while the workspace level are only available to the workspace it was created in. They have their own icons.

- Active Environment: Uses the $(radio-tower) icon.
- Global Environment: Uses the $(globe) icon.
- Workspace Environment: Uses the $(symbol-folder) icon.

### Adding settings in Settings UI of vscode

It's also possible to edit these settings in Setting UI. This only supports a single environment.

![Settings UI](./images/settingsui.png)

### Adding the settings in json

You can also edit them in `settings.json` of your project.

This extension contributes the following settings:

| Property Name                                              | Type    | Default  | Description                                                                                       |
| --- | --- | --- | --- |
| `mxscript.serverSettings.hostname`                         | string  |          | Hostname / IP of Maximo server (e.g. 10.10.12.12 or www.xyz.com)                                  |
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
| `mxscript.scriptSettings.sslcertificate `                  | string  |          | a custom certifcate                                                                               |
| `mxscript.appxml.formatOnDownloadAndCompare`               | boolean | true     | Whether to format XML on download and compare                                                     |

## Known Issues
In previous version the OS for apps was a simple one which had only one object in it i.e. MAXPRESENTATION. Now it requires an OS with at least objects in it. MAXAPPS and MAXPRESENTATION. You might need to re create that.


Double check the authentication type, user/pass or the api key provided.  
If you encounter any bug then please open an issue at github [repository](https://github.com/ahmednrana/mxscript)

## Release Notes

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

**Contact**  
Feel free to reach me at [linkedin](https://www.linkedin.com/in/ranaahmed/) or [Maximomize](https://maximomize.com) or [wordpress](https://maximomize.wordpress.com). I would love to meet fellow maximo consultants

> **Note:** This is work of third party and not an IBM official
