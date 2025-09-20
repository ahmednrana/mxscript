// Enhanced build script for React playground webview with optional watch mode
const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const isWatch = args.includes('--watch');

// point the env editor entry to a stable location (boot folder)
const envEditorEntry = path.join(__dirname, '..', 'src', 'webview', 'react', 'boot', 'environmentEditorEntry.tsx');
const envEditorOutFile = path.join(__dirname, '..', 'media', 'environmentEditor.js');

const baseOpts = {
  bundle: true,
  platform: 'browser',
  format: 'iife',
  target: ['es2019'],
  sourcemap: true,
  logLevel: 'info',
  define: { 'process.env.NODE_ENV': isWatch ? '"development"' : '"production"' }
};

async function run() {
  try {
    const codiconSrcDir = path.join(__dirname, '..', 'node_modules', '@vscode', 'codicons', 'dist');
    const codiconDestDir = path.join(__dirname, '..', 'media', 'codicons');
    try {
      if (fs.existsSync(codiconSrcDir)) {
        if (!fs.existsSync(codiconDestDir)) fs.mkdirSync(codiconDestDir, { recursive: true });
        const assets = fs.readdirSync(codiconSrcDir).filter(f => /codicon\.(css|ttf|woff2?)$/i.test(f));
        for (const file of assets) {
          fs.copyFileSync(path.join(codiconSrcDir, file), path.join(codiconDestDir, file));
        }
      }
    } catch(copyErr) {
      console.warn('[mxscript] Warning copying codicon assets:', copyErr.message);
    }

    if (isWatch) {
      const ctx = await esbuild.context({ ...baseOpts, entryPoints: [envEditorEntry], outfile: envEditorOutFile });
      await ctx.watch();
      console.log('[mxscript] Webview environment editor watch started');
      process.stdin.resume();
    } else {
      await esbuild.build({ ...baseOpts, entryPoints: [envEditorEntry], outfile: envEditorOutFile });
      console.log('[mxscript] Webview environment editor build complete');
    }
  } catch (err) {
    console.error('[mxscript] Webview build failed', err);
    process.exit(1);
  }
}

run();
