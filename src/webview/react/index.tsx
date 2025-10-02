import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { EnvironmentEditor } from './pages/EnvironmentEditor';

// Acquire VS Code API
declare global { function acquireVsCodeApi(): any; }
const vscode = acquireVsCodeApi?.();

declare global { interface Window { __ENV_EDITOR_BOOTSTRAP__?: any; } }
const bootstrap = window.__ENV_EDITOR_BOOTSTRAP__ || null;

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
	conditionObjectStructure: env.condition_objectStructure,
  logLevel: env.logLevel,
  createPythonFile: env.createPythonFileForJythonScripts,
  ignoreSsl: env.ignoreSslErrors,
  formatXmlOnDownload: env.formatXmlOnDownloadAndCompare,
  scope: env.scope,
  sslcertificate: env.sslcertificate
} : undefined;

const App: React.FC = () => {
  // If extension injected bootstrap, render editor directly (fast path)
  if (bootstrap) {
    const initialValues = mapInitialValues(bootstrap.environment);
    return <EnvironmentEditor mode={bootstrap.mode} initialValues={initialValues} />;
  }

  // Normal SPA with hash routes (new pages will work here)
  return (
    <HashRouter>
      <Routes>
        {/* <Route path="/" element={<OtherPage />} /> */}
        <Route path="/environment-editor" element={<EnvironmentEditor />} />
        {/* <Route path="/other" element={<OtherPage />} /> */}
      </Routes>
    </HashRouter>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
    createRoot(rootEl).render(<App />);
}
