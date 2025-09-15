import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { VscodeButton } from '@vscode-elements/react-elements';
import { EnvironmentEditor } from './EnvironmentEditor';
import PageThree from './PageThree';
// import '@vscode-elements/elements/dist/elements.css'; // This import breaks the webview due to font bundling issues.

// The stylesheet is now injected by the extension's HTML, so this is no longer needed.

// Acquire VS Code API
declare global { function acquireVsCodeApi(): any; }
const vscode = acquireVsCodeApi?.();

const Home: React.FC = () => {
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [auth, setAuth] = useState<string>('');
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<string>('');
  const requestResolvers = React.useRef(new Map<string, {resolve: (v:any)=>void, reject:(e:any)=>void}>());
  const reqCounter = React.useRef(0);

  // Helper to send a request and await a response from the extension.
  const sendRequest = (type: string, payload?: any, timeout = 10000): Promise<any> => {
    const id = `${Date.now()}-${++reqCounter.current}`;
    return new Promise((resolve, reject) => {
      requestResolvers.current.set(id, { resolve, reject });
      try {
        vscode?.postMessage({ type, id, payload });
      } catch (err) {
        requestResolvers.current.delete(id);
        return reject(err);
      }
      // timeout
      const timer = setTimeout(() => {
        if (requestResolvers.current.has(id)) {
          requestResolvers.current.delete(id);
          reject(new Error('Request timed out'));
        }
      }, timeout);
      // wrap resolve to clear timer
      const originalResolve = resolve;
      requestResolvers.current.set(id, {
        resolve: (v:any) => { clearTimeout(timer); originalResolve(v); },
        reject: (e:any) => { clearTimeout(timer); reject(e); }
      });
    });
  };

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const msg = event.data;
      setMessages(m => [...m, JSON.stringify(msg)]);
      // Resolve request promises if matching id
      try {
        if (msg?.id && requestResolvers.current.has(msg.id)) {
          const { resolve, reject } = requestResolvers.current.get(msg.id)!;
          requestResolvers.current.delete(msg.id);
          if (msg.error) {
            reject(msg.error);
          } else {
            resolve(msg.payload ?? msg);
          }
        }
      } catch (err) {
        // ignore resolver errors
      }
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);

  // Async handler invoked by Send Auth button
  const handleSendAuth = async () => {
    setAuth('requesting...');
    setLoadingAuth(true);
    try {
      const resp = await sendRequest('requestAuth', { reason: 'playground' }, 15000);
      // Expect response payload with token or status
      if (resp && typeof resp === 'object' && resp.token) {
        setAuth(resp.token);
      } else {
        setAuth(JSON.stringify(resp));
      }
    } catch (err:any) {
      setAuth('error: ' + (err?.message ?? String(err)));
    }
    setLoadingAuth(false);
  };

  const handleVerifySettings = async () => {
    setVerifying(true);
    setVerificationMessage('Verifying...');
    // Build a sample payload — in a fuller UI you would have a form to gather these
    const payload = {
      hostname: 'maximo.development.scannmax.trinmax.com',
      port: 443,
      httpProtocol: 'https',
      authenticationType: 'internal',
      username: 'maxadmin',
      password: 'Maximo76Scannmax2019',
      apikey: '',
      logLevel: 'DEBUG',
      objectStructure: 'mxscript',
      ignoreSslErrors: false,
      sslcertificate: ''
    };
    try {
      const resp = await sendRequest('verifySettings', payload, 20000);
      if (resp && resp.payload) {
        setVerificationMessage(resp.payload.message || JSON.stringify(resp.payload));
      } else if (resp && resp.message) {
        setVerificationMessage(resp.message);
      } else {
        setVerificationMessage(JSON.stringify(resp));
      }
    } catch (err:any) {
      setVerificationMessage('Error: ' + (err?.message ?? String(err)));
    }
    setVerifying(false);
  };

  return (
    <div style={{ padding: 12, fontFamily: 'var(--vscode-font-family)' }}>
      <h2 style={{ marginTop: 0 }}>VSCode Elements Playground</h2>
      <h1 style={{ color: 'var(--vscode-editor-foreground)' }}>Hello World</h1>
      <p>Minimal React test view using <code>vscode-elements</code>. Increment the counter and post a message back to the extension.</p>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <VscodeButton onClick={() => setCount(c => c + 1)}>Count: {count}</VscodeButton>
        <VscodeButton onClick={() => vscode?.postMessage({ type: 'ping', count })} disabled={loadingAuth || verifying}>Send Ping</VscodeButton>
        <VscodeButton onClick={() => handleSendAuth()} disabled={loadingAuth || verifying}>{loadingAuth ? 'Authing...' : `Send Authet: ${auth || 'start'}`}</VscodeButton>
        <VscodeButton onClick={() => handleVerifySettings()} disabled={loadingAuth || verifying}>{verifying ? 'Verifying...' : 'Verify Settings'}</VscodeButton>
        <VscodeButton onClick={() => (window.location.hash = '#/page-two')}>Open Page Two</VscodeButton>
      </div>
      <section style={{ marginTop: 16 }}>
        <h3>Incoming Messages</h3>
        <div style={{ marginBottom: 8 }}><strong>Verification:</strong> {verificationMessage}</div>
        {messages.length === 0 && <p><i>No messages yet.</i></p>}
        <ul style={{ fontSize: 12, maxHeight: 120, overflow: 'auto', border: '1px solid var(--vscode-panel-border)', padding: 8 }}>
          {messages.map((m, i) => <li key={i} style={{ marginBottom: 4 }}>{m}</li>)}
        </ul>
      </section>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <nav style={{ padding: 8, borderBottom: '1px solid var(--vscode-panel-border)' }}>
        <Link to="/">Home</Link> {' | '}
        <Link to="/environment-editor">Environment Editor</Link> {' | '}
        <Link to="/page-three">Page Three</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/environment-editor" element={<EnvironmentEditor />} />
        <Route path="/page-three" element={<PageThree />} />
      </Routes>
    </HashRouter>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<App />);
}
