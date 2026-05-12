let vscodeApi: any = null;

/**
 * Safely acquires the VS Code API. 
 * Can be called multiple times but will only call acquireVsCodeApi() once.
 */
export function getVsCodeApi(): any {
    if (vscodeApi) {
        return vscodeApi;
    }

    try {
        if (typeof window !== 'undefined' && (window as any).acquireVsCodeApi) {
            vscodeApi = (window as any).acquireVsCodeApi();
        } else {
            // Provide a lightweight dev stub so local preview doesn't crash
            vscodeApi = {
                postMessage: (msg: any) => console.log('[DEV][vscode stub] postMessage ->', msg),
                setState: (_: any) => { /* noop */ },
                getState: () => undefined
            };
            console.warn('[vscode.ts] VS Code webview API not available – using dev stub.');
        }
    } catch (e) {
        console.warn('[vscode.ts] Failed to acquire VS Code API (it might have been already acquired):', e);
        // If it was already acquired elsewhere but we don't have the reference, 
        // we might be in trouble, but at least we don't crash.
    }

    return vscodeApi;
}
