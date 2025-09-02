import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { VscodeButton } from '@vscode-elements/react-elements';

// Acquire VS Code API
declare global { function acquireVsCodeApi(): any; }
const vscode = acquireVsCodeApi?.();

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const msg = event.data;
      setMessages(m => [...m, JSON.stringify(msg)]);
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);

  return (
    <div style={{ padding: 12, fontFamily: 'var(--vscode-font-family)' }}>
      <h2 style={{ marginTop: 0 }}>VSCode Elements Playground</h2>
      <h1 style={{ color: 'var(--vscode-editor-foreground)' }}>Hello World</h1>
      <p>Minimal React test view using <code>vscode-elements</code>. Increment the counter and post a message back to the extension.</p>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <VscodeButton onClick={() => setCount(c => c + 1)}>Count: {count}</VscodeButton>
  <VscodeButton onClick={() => vscode?.postMessage({ type: 'ping', count })}>Send Ping</VscodeButton>
      </div>
      <section style={{ marginTop: 16 }}>
        <h3>Incoming Messages</h3>
        {messages.length === 0 && <p><i>No messages yet.</i></p>}
        <ul style={{ fontSize: 12, maxHeight: 120, overflow: 'auto', border: '1px solid var(--vscode-panel-border)', padding: 8 }}>
          {messages.map((m, i) => <li key={i} style={{ marginBottom: 4 }}>{m}</li>)}
        </ul>
      </section>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<App />);
}
