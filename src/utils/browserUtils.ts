import * as vscode from 'vscode';
import * as os from 'os';
import { exec } from 'child_process';
import { MaximoEnvironment } from '../webview/EnvironmentManager';
import * as detectBrowsers from 'detect-browsers';

export async function getBrowserList(): Promise<{ label: string, description?: string }[]> {
    const browserChoices: vscode.QuickPickItem[] = [
        { label: 'System Default', description: 'Use your OS default browser' }
    ];

    try {
        const installedBrowsers = await detectBrowsers.getAvailableBrowsers();

        for (const b of installedBrowsers) {
            const name = typeof b === 'string' ? b : (b.browser || '');
            if (name) {
                // Filter out Internet Explorer
                const lowerName = name.toLowerCase();
                if (lowerName.includes('internet explorer') || lowerName === 'ie') {
                    continue;
                }

                const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
                browserChoices.push({ label: formattedName, description: `Open in ${formattedName}` });
            }
        }
    } catch (err) {
        console.warn("Failed to detect browsers, falling back to static list", err);
        browserChoices.push(
            { label: 'Google Chrome', description: 'Open in Chrome' },
            { label: 'Microsoft Edge', description: 'Open in Edge' },
            { label: 'Mozilla Firefox', description: 'Open in Firefox' }
        );
    }
    return browserChoices;
}

export async function openBrowserWithChoice(url: string, env: MaximoEnvironment, context: vscode.ExtensionContext): Promise<void> {
    if (!env) {
        throw new Error('No active Maximo environment found.');
    }

    let browserToLaunch = env.preferredBrowser;

    if (!browserToLaunch || browserToLaunch === 'prompt' || browserToLaunch === '') {
        const browserChoices = await getBrowserList();

        const selected = await vscode.window.showQuickPick(browserChoices, {
            placeHolder: 'Select a browser to open Maximo Web UI',
            ignoreFocusOut: true
        });

        if (!selected) {
            return; // User cancelled
        }

        browserToLaunch = selected.label;

        // Ask to remember the choice for this environment
        const rememberChoices = ['Yes', 'No, ask me every time'];
        const remember = await vscode.window.showQuickPick(rememberChoices, {
            placeHolder: `Remember "${browserToLaunch}" for environment "${env.name}"?`,
            ignoreFocusOut: true
        });

        if (remember === 'Yes') {
            await saveBrowserPreference(env, browserToLaunch, context);
        }
    }

    launchBrowser(url, browserToLaunch);
}

async function saveBrowserPreference(env: MaximoEnvironment, browser: string, context: vscode.ExtensionContext) {
    env.preferredBrowser = browser;
    try {
        const globalEnvs = context.globalState.get<MaximoEnvironment[]>('mxscript.environments', []);
        const workspaceEnvs = context.workspaceState.get<MaximoEnvironment[]>('mxscript.environments', []);

        const gIdx = globalEnvs.findIndex(e => e.id === env.id);
        if (gIdx !== -1) {
            globalEnvs[gIdx] = env;
            await context.globalState.update('mxscript.environments', globalEnvs);
        } else {
            const wIdx = workspaceEnvs.findIndex(e => e.id === env.id);
            if (wIdx !== -1) {
                workspaceEnvs[wIdx] = env;
                await context.workspaceState.update('mxscript.environments', workspaceEnvs);
            }
        }
    } catch (err) {
        vscode.window.showWarningMessage(`Could not save browser preference: ${(err as Error).message}`);
    }
}

function launchBrowser(url: string, browserChoice: string) {
    if (browserChoice === 'System Default') {
        vscode.env.openExternal(vscode.Uri.parse(url));
        return;
    }

    let command = '';
    const platform = os.platform();

    if (platform === 'win32') {
        if (browserChoice.includes('Chrome')) {
            command = `start chrome "${url}"`;
        } else if (browserChoice.includes('Edge')) {
            command = `start msedge "${url}"`;
        } else if (browserChoice.includes('Firefox')) {
            command = `start firefox "${url}"`;
        } else {
            vscode.env.openExternal(vscode.Uri.parse(url));
            return;
        }
    } else if (platform === 'darwin') {
        if (browserChoice.includes('Chrome')) {
            command = `open -a "Google Chrome" "${url}"`;
        } else if (browserChoice.includes('Edge')) {
            command = `open -a "Microsoft Edge" "${url}"`;
        } else if (browserChoice.includes('Firefox')) {
            command = `open -a "Firefox" "${url}"`;
        } else {
            vscode.env.openExternal(vscode.Uri.parse(url));
            return;
        }
    } else if (platform === 'linux') {
        if (browserChoice.includes('Chrome')) {
            command = `google-chrome "${url}"`;
        } else if (browserChoice.includes('Edge')) {
            command = `microsoft-edge "${url}"`;
        } else if (browserChoice.includes('Firefox')) {
            command = `firefox "${url}"`;
        } else {
            vscode.env.openExternal(vscode.Uri.parse(url));
            return;
        }
    } else {
        vscode.env.openExternal(vscode.Uri.parse(url));
        return;
    }

    // Execute the command
    exec(command, (error) => {
        if (error) {
            vscode.window.showErrorMessage(`Failed to open ${browserChoice}. Ensure it is installed and in your PATH.`);
            vscode.env.openExternal(vscode.Uri.parse(url)); // fallback
        }
    });
}
