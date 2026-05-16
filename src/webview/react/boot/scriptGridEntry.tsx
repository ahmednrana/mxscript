import React from 'react';
import { createRoot } from 'react-dom/client';
import '../scriptgrid/theme.css';
import { MaximoScriptGrid } from '../pages/MaximoScriptGrid';

const rootEl = document.getElementById('root');
if (rootEl) {
    createRoot(rootEl).render(<MaximoScriptGrid />);
}
