// JSX intrinsic elements for VS Code custom elements we use in playground
// Relaxed any typing for quick experimentation.
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vscode-button': any;
      'vscode-text-field': any;
      'vscode-checkbox': any;
      'vscode-dropdown': any;
      'vscode-option': any;
    }
  }
}
export {};
