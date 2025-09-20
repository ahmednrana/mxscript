import React from 'react';
import { createRoot } from 'react-dom/client';
import { EnvironmentEditor } from '../pages/EnvironmentEditor';

declare global { interface Window { __ENV_EDITOR_BOOTSTRAP__?: any; } }

const bootstrap = window.__ENV_EDITOR_BOOTSTRAP__ || { mode: 'add', environment: null };

// Map environment from extension to editor initialValues
const env = bootstrap.environment;
const initialValues = env ? {
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
	sslcertificate: env.sslcertificate
} : undefined;

createRoot(document.getElementById('root')!).render(
	<EnvironmentEditor
		mode={bootstrap.mode}
		initialValues={initialValues}
	/>
);

