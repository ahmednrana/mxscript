import * as vscode from 'vscode';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  TRACE = 'trace'
}

export class Logger {
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

    public setLogLevel(level: LogLevel): void {
        this.logLevel = level;
    }

    public getLogLevel(): LogLevel {
        return this.logLevel;
    }

    private isLevelEnabled(level: LogLevel): boolean {
        return this.logLevelOrder[level] <= this.logLevelOrder[this.logLevel];
    }

    public trace(message: string): void {
        if (this.isLevelEnabled(LogLevel.TRACE)) {
            this.log(message, 'TRACE');
        }
    }

    public debug(message: string): void {
        if (this.isLevelEnabled(LogLevel.DEBUG)) {
            this.log(message, 'DEBUG');
        }
    }

    public info(message: string): void {
        if (this.isLevelEnabled(LogLevel.INFO)) {
            this.log(message, 'INFO');
        }
    }

    public warn(message: string): void {
        if (this.isLevelEnabled(LogLevel.WARN)) {
            this.log(message, 'WARN');
        }
    }

    public error(message: string, error?: Error): void {
        if (this.isLevelEnabled(LogLevel.ERROR)) {
            this.log(message, 'ERROR');
            if (error) {
                this.log(error.stack || error.toString(), 'ERROR');
            }
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
}
