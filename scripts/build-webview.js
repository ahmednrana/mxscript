// Minimal build script for React playground webview
const esbuild = require('esbuild');
const path = require('path');

async function build() {
  try {
    await esbuild.build({
      entryPoints: [path.join(__dirname, '..', 'src', 'webview', 'react', 'playground', 'index.tsx')],
      bundle: true,
      outfile: path.join(__dirname, '..', 'media', 'playground.js'),
      platform: 'browser',
      format: 'iife',
      target: ['es2019'],
      sourcemap: true,
      logLevel: 'info',
      define: { 'process.env.NODE_ENV': '"production"' }
    });
    console.log('[mxscript] Webview playground build complete');
  } catch (err) {
    console.error('[mxscript] Webview playground build failed', err);
    process.exit(1);
  }
}

build();
