import * as vscode from 'vscode';
import { format } from 'util';
import { ILogger } from 'maximo-api-client';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  TRACE = 'trace'
}

export class Logger implements ILogger {
    private static instance: Logger;
    private outputChannel: vscode.OutputChannel;
    private logLevel: LogLevel;
    private readonly logLevelOrder: Record<LogLevel, number> = {
        [LogLevel.ERROR]: 0,
        [LogLevel.WARN]: 1,
        [LogLevel.INFO]: 2,
        [LogLevel.DEBUG]: 3,
        [LogLevel.TRACE]: 4
    };

    private constructor(channelName: string) {
        this.outputChannel = vscode.window.createOutputChannel(channelName);
        this.logLevel = LogLevel.INFO; // Default log level
    }

    public static getInstance(channelName: string = 'MxScript'): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger(channelName);
        }
        return Logger.instance;
    }

    /**
     * Sets the log level for the logger.
     * @param level The log level as a string (e.g., 'info', 'debug').
     */
    public setLogLevel(level: string): void {
        const newLevel = level.toLowerCase() as LogLevel;
        if (Object.values(LogLevel).includes(newLevel)) {
            this.logLevel = newLevel;
        } else {
            this.warn(`Attempted to set invalid log level: ${level}. Keeping ${this.logLevel}.`);
        }
    }

    /**
     * Gets the current log level as a string.
     * @returns The current log level.
     */
    public getLogLevel(): string {
        return this.logLevel;
    }

    private isLevelEnabled(level: LogLevel): boolean {
        return this.logLevelOrder[level] <= this.logLevelOrder[this.logLevel];
    }

    public trace(...args: any[]): void {
        if (this.isLevelEnabled(LogLevel.TRACE)) {
            this.log(format(...args), 'TRACE');
        }
    }

    public debug(...args: any[]): void {
        if (this.isLevelEnabled(LogLevel.DEBUG)) {
            this.log(format(...args), 'DEBUG');
        }
    }

    public info(...args: any[]): void {
        if (this.isLevelEnabled(LogLevel.INFO)) {
            this.log(format(...args), 'INFO');
        }
    }

    public warn(...args: any[]): void {
        if (this.isLevelEnabled(LogLevel.WARN)) {
            this.log(format(...args), 'WARN');
        }
    }

    public error(...args: any[]): void {
        if (this.isLevelEnabled(LogLevel.ERROR)) {
            this.log(format(...args), 'ERROR');
        }
    }

    public show(): void {
        this.outputChannel.show();
    }

    public hide(): void {
        this.outputChannel.hide();
    }

    public clear(): void {
        this.outputChannel.clear();
    }

    private log(message: string, level: string): void {
        const timestamp = new Date().toISOString();
        this.outputChannel.appendLine(`[${timestamp}] [${level}] ${message}`);
    }

    /**
     * Disposes the output channel.
     * Should be called when the extension is deactivated.
     */
    public dispose(): void {
        this.outputChannel.dispose();
    }

    
}
