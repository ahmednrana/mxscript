import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { EnvironmentEditor } from './pages/EnvironmentEditor';
import { SystemPropertyViewer } from './pages/SystemPropertyViewer';

// Acquire VS Code API
declare global { function acquireVsCodeApi(): any; }
const vscode = acquireVsCodeApi?.();

declare global { interface Window { __BOOTSTRAP_DATA__?: any; } }
const bootstrap = window.__BOOTSTRAP_DATA__ || null;

const mapInitialValues = (env:any) => env ? {
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
    if (bootstrap.page === 'environment-editor') {
        const initialValues = mapInitialValues(bootstrap.environment);
        return <EnvironmentEditor mode={bootstrap.mode} initialValues={initialValues} />;
    }
    if (bootstrap.page === 'system-properties') {
        return <SystemPropertyViewer />;
    }
  }

  // Normal SPA with hash routes
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
