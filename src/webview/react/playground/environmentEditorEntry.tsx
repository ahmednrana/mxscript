import React from 'react';
import { createRoot } from 'react-dom/client';
import { EnvironmentEditor } from './EnvironmentEditor';

declare global {
  interface Window { __ENV_EDITOR_BOOTSTRAP__?: any; acquireVsCodeApi?: () => any; }
}

const vscode = window.acquireVsCodeApi ? window.acquireVsCodeApi() : undefined;

interface BootstrapData {
  mode: 'add' | 'edit';
  environment?: any; // MaximoEnvironment shape
}

const bootstrap: BootstrapData = window.__ENV_EDITOR_BOOTSTRAP__ || { mode: 'add' };

// Map incoming environment to initialValues expected by EnvironmentEditor
const toInitialValues = (env: any | undefined) => {
  if (!env) return undefined;
  return {
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
    logLevel: env.logLevel,
    createPythonFile: env.createPythonFileForJythonScripts,
    ignoreSsl: env.ignoreSslErrors,
    formatXmlOnDownload: env.formatXmlOnDownloadAndCompare,
    scope: env.scope,
    sslcertificate: env.sslcertificate,
  };
};

const existingId = bootstrap.environment?.id;

const onSave = async (values: Record<string, any>, mode: 'add' | 'edit') => {
  const incoming = values;
  const existing = bootstrap.environment;
  
  console.log('DEBUG: === SAVE DEBUG START ===');
  console.log('DEBUG: Mode:', mode);
  console.log('DEBUG: existingId:', existingId);
  
  // Log individual form values for critical fields
  console.log('DEBUG: Form value - envName:', incoming.envName);
  console.log('DEBUG: Form value - hostname:', incoming.hostname);
  console.log('DEBUG: Form value - port:', incoming.port);
  console.log('DEBUG: Form value - httpProtocol:', incoming.httpProtocol);
  console.log('DEBUG: Form value - authType:', incoming.authType);
  console.log('DEBUG: Form value - objectStructure:', incoming.objectStructure);
  console.log('DEBUG: Form value - appxmlObjectStructure:', incoming.appxmlObjectStructure);
  console.log('DEBUG: Form value - logLevel:', incoming.logLevel);
  console.log('DEBUG: Form value - createPythonFile:', incoming.createPythonFile);
  console.log('DEBUG: Form value - ignoreSsl:', incoming.ignoreSsl);
  console.log('DEBUG: Form value - formatXmlOnDownload:', incoming.formatXmlOnDownload);
  console.log('DEBUG: Form value - scope:', incoming.scope);
  
  // Log existing environment values for same fields
  console.log('DEBUG: Existing value - name:', existing?.name);
  console.log('DEBUG: Existing value - hostname:', existing?.hostname);
  console.log('DEBUG: Existing value - port:', existing?.port);
  console.log('DEBUG: Existing value - httpProtocol:', existing?.httpProtocol);
  console.log('DEBUG: Existing value - authenticationType:', existing?.authenticationType);
  console.log('DEBUG: Existing value - objectStructure:', existing?.objectStructure);
  console.log('DEBUG: Existing value - appxml_objectStructure:', existing?.appxml_objectStructure);
  console.log('DEBUG: Existing value - logLevel:', existing?.logLevel);
  console.log('DEBUG: Existing value - createPythonFileForJythonScripts:', existing?.createPythonFileForJythonScripts);
  console.log('DEBUG: Existing value - ignoreSslErrors:', existing?.ignoreSslErrors);
  console.log('DEBUG: Existing value - formatXmlOnDownloadAndCompare:', existing?.formatXmlOnDownloadAndCompare);
  console.log('DEBUG: Existing value - scope:', existing?.scope);
  
  // Normalize / ensure expected properties exist. Full replace style merge like legacy save.
  const normalized = {
    id: existingId || (existing?.id) || '',
    name: incoming.envName || existing?.name || 'Unnamed Environment',
    hostname: incoming.hostname || existing?.hostname || '',
    port: Number(incoming.port ?? existing?.port ?? (incoming.httpProtocol === 'https' ? 443 : 9080)),
    httpProtocol: incoming.httpProtocol || existing?.httpProtocol || 'https',
    authenticationType: incoming.authType || existing?.authenticationType || 'internal',
    username: incoming.username ?? existing?.username ?? '',
    password: incoming.password ?? existing?.password ?? '',
    apikey: incoming.apikey ?? existing?.apikey ?? '',
    objectStructure: incoming.objectStructure || existing?.objectStructure || 'MXSCRIPT',
    appxml_objectStructure: incoming.appxmlObjectStructure || existing?.appxml_objectStructure || 'MXL_APPS',
    logLevel: incoming.logLevel || existing?.logLevel || 'INFO',
    createPythonFileForJythonScripts: !!(incoming.createPythonFile ?? existing?.createPythonFileForJythonScripts ?? true),
    ignoreSslErrors: !!(incoming.ignoreSsl ?? existing?.ignoreSslErrors ?? true),
    formatXmlOnDownloadAndCompare: !!(incoming.formatXmlOnDownload ?? existing?.formatXmlOnDownloadAndCompare ?? true),
    scope: incoming.scope || existing?.scope || 'global',
    sslcertificate: incoming.sslcertificate || existing?.sslcertificate || ''
  };
  
  // Log normalized values for critical fields
  console.log('DEBUG: Normalized - name:', normalized.name);
  console.log('DEBUG: Normalized - hostname:', normalized.hostname);
  console.log('DEBUG: Normalized - port:', normalized.port);
  console.log('DEBUG: Normalized - httpProtocol:', normalized.httpProtocol);
  console.log('DEBUG: Normalized - authenticationType:', normalized.authenticationType);
  console.log('DEBUG: Normalized - objectStructure:', normalized.objectStructure);
  console.log('DEBUG: Normalized - appxml_objectStructure:', normalized.appxml_objectStructure);
  console.log('DEBUG: Normalized - logLevel:', normalized.logLevel);
  console.log('DEBUG: Normalized - createPythonFileForJythonScripts:', normalized.createPythonFileForJythonScripts);
  console.log('DEBUG: Normalized - ignoreSslErrors:', normalized.ignoreSslErrors);
  console.log('DEBUG: Normalized - formatXmlOnDownloadAndCompare:', normalized.formatXmlOnDownloadAndCompare);
  console.log('DEBUG: Normalized - scope:', normalized.scope);
  console.log('DEBUG: === SAVE DEBUG END ===');
  
  vscode?.postMessage({ type: 'save', environment: normalized });
};

const App = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <EnvironmentEditor
      mode={bootstrap.mode}
      initialValues={toInitialValues(bootstrap.environment)}
      onSave={onSave}
    />
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
      <button onClick={() => vscode?.postMessage({ type: 'cancel' })}>Cancel</button>
    </div>
  </div>
);

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
}
