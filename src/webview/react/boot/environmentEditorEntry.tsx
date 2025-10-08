import React from 'react';
import { createRoot } from 'react-dom/client';
import { EnvironmentEditor } from '../pages/EnvironmentEditor';

declare global { interface Window { __ENV_EDITOR_BOOTSTRAP__?: any; initialValues?: any; mode?: string; } }

const bootstrap = window.__ENV_EDITOR_BOOTSTRAP__ || { mode: 'add', initialValues: undefined as any, environment: null };

// Prefer initialValues provided by the extension bootstrap (or window.initialValues)
// Fallback to mapping from env if older bootstrap shape is present
const env = bootstrap.environment;
const mappedFromEnv = env ? {
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

const initialValues = bootstrap.initialValues || window.initialValues || mappedFromEnv;
const mode = bootstrap.mode || window.mode || 'add';

createRoot(document.getElementById('root')!).render(
	<EnvironmentEditor
		mode={mode}
		initialValues={initialValues}
	/>
);

