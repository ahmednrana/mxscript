import { Constants } from "../Constants";
import IConfigService from "../service/Config/IConfigService";
import { AuthType, LogLevel } from "maximo-api-client";



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
    const entry = [...languageToExtension.entries()].find(([_, v]) => v === configService.getFileExtension());
    return entry ? entry[0] : Constants.LANG_JYTHON;
}

/**
 * Converts a string-based authentication type to the corresponding AuthType enum.
 * @param authType - The string representation of the authentication type.
 * @returns The corresponding AuthType enum value.
 */
export function convertAuthType(authType: string): AuthType {
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
    switch (logLevel) {
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