import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { EnvironmentEditor } from '../pages/EnvironmentEditor';
import { SystemPropertyViewer } from '../pages/SystemPropertyViewer';

declare global { 
    interface Window { 
        __BOOTSTRAP_DATA__?: any; 
        __ENV_EDITOR_BOOTSTRAP__?: any;
        initialValues?: any; 
        mode?: string; 
    } 
}

// Support both the old and new bootstrap formats for backward compatibility
const bootstrap = window.__BOOTSTRAP_DATA__ || window.__ENV_EDITOR_BOOTSTRAP__ || null;

const mapInitialValues = (env: any) => env ? {
    envName: env.name,
    hostname: env.hostname,
    port: env.port,
    httpProtocol: env.httpProtocol,
    authType: env.authenticationType,
    username: env.username,
    password: env.password,
    apikey: env.apikey,
    objectStructure: env.objectStructure,
    appxmlObjectStructure: env.appxml_objectStructure,
    conditionExpressionObjectStructure: env.condition_objectStructure,
    logLevel: env.logLevel,
    createPythonFile: env.createPythonFileForJythonScripts,
    ignoreSsl: env.ignoreSslErrors,
    formatXmlOnDownload: env.formatXmlOnDownloadAndCompare,
    scope: env.scope,
    sslcertificate: env.sslcertificate
} : undefined;

const App: React.FC = () => {
    // If extension injected bootstrap, decide what to render
    if (bootstrap) {
        // Default to environment-editor if page is not specified (for legacy calls)
        const page = bootstrap.page || 'environment-editor';
        
        if (page === 'environment-editor') {
            const initialValues = bootstrap.initialValues || window.initialValues || mapInitialValues(bootstrap.environment);
            const mode = bootstrap.mode || window.mode || 'add';
            return <EnvironmentEditor mode={mode} initialValues={initialValues} />;
        }
        
        if (page === 'system-properties') {
            return <SystemPropertyViewer />;
        }
    }

    // Fallback for direct browser access or routing
    return (
        <HashRouter>
            <Routes>
                <Route path="/environment-editor" element={<EnvironmentEditor />} />
                <Route path="/system-properties" element={<SystemPropertyViewer />} />
            </Routes>
        </HashRouter>
    );
};

const rootEl = document.getElementById('root');
if (rootEl) {
    createRoot(rootEl).render(<App />);
}
