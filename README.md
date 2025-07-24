# MxScript

A script manager for IBM Maximo / Maximo Application Suite. This allows simple management (upload / download / comparison) of scripts from with in vs code.

## Features

This was created to help developers using vs code to write scripts extensions for IBM Maximo / ICD. VS code already has excellent support for Java. see here
This adds the following four actions to vs code.

1. [Update Script from Server](#update-script-from-server)
2. [Compare Script with Server](#compare-script-with-server)
3. [Upload Script to Server](#upload-script-to-server)
4. [Download All Scripts from Server](#download-all-scripts-from-server)
5. [Delete Script on Server](#delete-script-on-server)

### Update Script from Server

#### Activate

On command palette search and select this option

#### Functionality

You must have a saved file opened for this to work. This downloads the updated script from server for the opened tab.

![Update](./images/update.gif)

[Back to Top](#mxscript)

### Compare Script with Server

#### Activate

On command palette search and select this option

#### Functionality

You must have a saved file open for this to work. This downloaded the updated script for the opened tab.

![Compare](./images/compare.gif)

[Back to Top](#mxscript)

### Upload Script to Server

#### Activate

On command palette search and select this option

#### Functionality

You must have a saved file opened for this to work. This uploads the script from the opened tab to the server.

![Upload](./images/upload.gif)

[Back to Top](#mxscript)

### Download All Scripts from Server

#### Activate

On command palette search and select this option

#### Functionality

This downloads all the scripts from Maximo server to the folder you selected.

![DownloadAll](./images/downloadall.gif)

[Back to Top](#mxscript)

### Delete Script on Server

#### Activate

On command palette search and select this option

#### Functionality

This deletes that script on the server

[Back to Top](#mxscript)

## Requirements

You should have access to an instance of IBM Maximo to manage scripts.

#### Configuring Object Structure

You must have rights to use an object structure having `AUTOSCRIPT` as its base object.

> There is an object structure `MXAPIAUTOSCRIPT` created by default. Do NOT use it. This will cause issues when uploading scripts to server

If somehow your installation does not have this OS then follow the following steps to create an object structure.

1. Goto Object Strcutures
2. Click on `New Object Structure`
3. Give it any name e.g. `MXSCRIPT`. In Consumed by field enter `INTEGRATION`
4. In the source object table click on New Row. Then in that new row select `AUTOSCRIPT` in object field.
5. Save

It should be something like below

![Object Structure](./images/os.png)

#### Configuring Object Structure Security

See below if your are getting this error

> Error 400: BMXAA9301E - The user of the transaction is not authorized for Object Structure {1}. Configure authorization in the object structure application and grant necessary access to the user

You can either turn off authentication for OS [Turn Off OS Authorization](https://www.ibm.com/support/pages/mif-object-structure-authorization)
or grant authorization for that specific OS [Grant OS Authorization](https://www.ibm.com/support/pages/using-object-structure-security-limit-access-security-groups)

## Extension Settings

Before using this extension you need to add a few settings.

### Managing Environments in UI

Now the extensions allow you add multiple environments and switch between them.
Under the explorer webview there is a section for Maximo Environments
![Add environment plus UI](./images/add_env_button.jpg)

You can easily add multiple environments
![Add environment UI](./images/add_new_env.png)

Using the buttons displayed over these environments you can activate, edit and delete them as well

![Add Edit Delete Button](./images/activate_edit_delete_env.png)

There are two types of environments, global or workspace. Global are always available in vscode while the workspace level are only available to the workspace it was created in. They have their own icons.

- Active Environment: Uses the $(radio-tower) icon.
- Global Environment: Uses the $(globe) icon.
- Workspace Environment: Uses the $(symbol-folder) icon.

### Adding settings in Settings UI of vscode

It's also possible to edit these settings in Setting UI. This only support a single environment
![Settings UI](./images/settingsui.png)

### Adding the settings in json

Other than that you can also edit them in `settings.json` of your project.

This extension contributes the following settings:

| Property Name                                                | Type    | Default  | Description                                                                                       |
| --- | --- | --- | --- |
| `mxscript.serverSettings.hostname`                         | string  |          | Hostname / IP of Maximo server (e.g. 10.10.12.12 or www.xyz.com)                                  |
| `mxscript.serverSettings.port`                             | number  |          | Maximo port                                                                                       |
| `mxscript.authentication.username`                         | string  | maxadmin | Username for Maximo Authentication                                                                |
| `mxscript.authentication.password`                         | string  | maxadmin | Password for Maximo Authentication                                                                |
| `mxscript.authentication.apikey`                           | string  |          | API key Maximo Authentication                                                                     |
| `mxscript.authentication.authenticationType`               | string  | internal | Type of Authentication (internal, ldap, apikey)                                                   |
| `mxscript.serverSettings.objectStructure`                  | string  | MXSCRIPT | Object Structure to be used for scripts uploading / downloading                                   |
| `mxscript.serverSettings.httpProtocol`                     | string  | http     | Http protocol (http or https)                                                                     |
| `mxscript.scriptSettings.createPythonFileForJythonScripts` | boolean | true     | Create Jython script in Maximo even if the file in editor is .py                                  |
| `mxscript.scriptSettings.logLevel`                         | string  |          | The log level to set with scripts when creating / updating them (DEBUG, INFO, WARN, ERROR, FATAL) |
| `mxscript.scriptSettings.ignoresslerrors`                  | boolean | false    | Ignore SSL errors                                                                                 |

## Known Issues

Using the built in Object Structure `MXAPIAUTOSCRIPT` will delete the launch points when uploading the script to server. Instead create a new OS with only `AUTOSCRIPT` as source object. No child objects in it.

Double check the authentication type, user/pass or the api key provided
If you encounter any bug then please open an issue at github [repository](https://github.com/ahmednrana/mxscript)

## Release Notes

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

**Contact** Feel free to reach me at [linkedin](https://www.linkedin.com/in/ranaahmed/) or [Maximomize](https://maximomize.com) or [wordpress](https://maximomize.wordpress.com). I would love to meet fellow maximo consultants

> **Note:** This is work of third party and not an IBM official extension
