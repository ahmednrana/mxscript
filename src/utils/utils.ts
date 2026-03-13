import { Constants } from "../Constants";
import IConfigService from "../service/Config/IConfigService";
import { AuthType, LogLevel } from "@maximomize/maximo-api-client";
import * as vscode from 'vscode';
import * as path from 'path';
import { ConfigService } from "../service/Config/ConfigService";
import { Logger } from "../service/Logger/Logger";
import { MaximoEnvironmentTreeItem } from "../treeview/MaximoEnvironmentTreeProvider";
import { MaximoEnvironment } from "../webview/EnvironmentManager";
/**
 * Gets the file extension of the currently open editor tab.
 */
export function getFileExtension(): string {
    const editor = vscode.window.activeTextEditor;
    if (!editor) { return ''; }
    const fileName = path.basename(editor.document.fileName);
    return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
}

/**
 * Gets the filename in Upper case without extension from the currently open editor tab.
 * @returns The filename without extension from the currently open editor tab.
 */
export function getFilename(): string {
    const editor = vscode.window.activeTextEditor;
    if (!editor) { return ''; }
    let filename = path.basename(editor.document.fileName);
    filename = filename.toUpperCase();
    filename = filename.substring(0, filename.lastIndexOf('.'));
    return filename;
}

export function getLanguageFromExtension(configService: IConfigService): string | undefined {
    let languageToExtension: Map<string, string> = new Map<string, string>();

    languageToExtension.set(Constants.LANG_GROOVY, Constants.EXT_GROOVY);
    languageToExtension.set(Constants.LANG_NASHORN, Constants.EXT_NASHORN);
    languageToExtension.set(Constants.LANG_JS, Constants.EXT_JS);
    languageToExtension.set(Constants.LANG_JAVASCRIPT, Constants.EXT_JAVASCRIPT);
    languageToExtension.set(Constants.LANG_ECMASCRIPT, Constants.EXT_ECMASCRIPT);
    languageToExtension.set(Constants.LANG_JYTHON, Constants.EXT_JYTHON);
    if (configService.getCreatePythonScriptInEditor()) {
        languageToExtension.set(Constants.LANG_JYTHON, Constants.EXT_PYTHON);
    }
    else {
        languageToExtension.set(Constants.LANG_PYTHON, Constants.EXT_PYTHON);
    }
    const entry = [...languageToExtension.entries()].find(([_, v]) => v === getFileExtension());
    return entry ? entry[0] : Constants.LANG_JYTHON;
}

/**
 * Converts a string-based authentication type to the corresponding AuthType enum.
 * @param authType - The string representation of the authentication type.
 * @returns The corresponding AuthType enum value.
 */
export function convertAuthType(authType: string) {
    switch (authType) {
        case 'internal':
            return AuthType.MAXIMO_NATIVE;
        case 'ldap':
            return AuthType.LDAP_BASIC;
        case 'apikey':
            return AuthType.APIKEY;
        default:
            return AuthType.APIKEY;
    }
}

export function getLogLevel(logLevel: string): LogLevel {
    switch (logLevel.toLowerCase()) {
        case 'error':
            return LogLevel.ERROR;
        case 'warn':
            return LogLevel.WARN;
        case 'info':
            return LogLevel.INFO;
        case 'debug':
            return LogLevel.DEBUG;
        default:
            return LogLevel.INFO;
    }
}

export function showWarning(message: string): void {
    let configService = new ConfigService();
    const logger = Logger.getInstance();
    vscode.window.showWarningMessage(message);
    logger.warn(`${message} [Environment: ${configService.getActiveEnvironmentName()} [${configService.getUrl()}]]`);

}

export function showInformation(message: string): void {
    let configService = new ConfigService();
    const logger = Logger.getInstance();
    vscode.window.showInformationMessage(message);
    logger.info(`${message} [Environment: ${configService.getActiveEnvironmentName()} [${configService.getUrl()}]]`);

}

export function showError(message: string): void {
    let configService = new ConfigService();
    const logger = Logger.getInstance();
    vscode.window.showErrorMessage(message);
    logger.error(`${message} [Environment: ${configService.getActiveEnvironmentName()} [${configService.getUrl()}]]`);
}

/**
 * Retrieves the fully populated active MaximoEnvironment object
 * from VS Code global/workspace state.
 */
export function getActiveMaximoEnvironment(context: vscode.ExtensionContext) {
    const activeEnvId = context.globalState.get<string>('mxscript.activeEnvironment');
    if (!activeEnvId) return undefined;

    const globalEnvs = context.globalState.get<any[]>('mxscript.environments', []);
    const workspaceEnvs = context.workspaceState.get<any[]>('mxscript.environments', []);
    const environments = [...globalEnvs, ...workspaceEnvs];

    return environments.find(e => e.id === activeEnvId);
}

export function extractEnvironmentFromItem(item?: MaximoEnvironmentTreeItem | MaximoEnvironment): MaximoEnvironment | undefined {
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
 * Scrolls the given editor to the end of the document.
 * @param editor The text editor to scroll.
 */
export function scrollToEndOfDocument(editor: vscode.TextEditor): void {
    const lastLine = editor.document.lineCount - 1;
    if (lastLine < 0) { return; }
    const lastChar = editor.document.lineAt(lastLine).text.length;
    const position = new vscode.Position(lastLine, lastChar);
    editor.selection = new vscode.Selection(position, position);
    editor.revealRange(new vscode.Range(position, position), vscode.TextEditorRevealType.InCenter);
}
