// Enhanced build script for React playground webview with optional watch mode
const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const isWatch = args.includes('--watch');

const playgroundEntry = path.join(__dirname, '..', 'src', 'webview', 'react', 'playground', 'index.tsx');
const envEditorEntry = path.join(__dirname, '..', 'src', 'webview', 'react', 'playground', 'environmentEditorEntry.tsx');
const playgroundOutFile = path.join(__dirname, '..', 'media', 'playground.js');
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
    // Ensure codicon assets copied to media/codicons (webview can't access node_modules directly in some contexts)
    const codiconSrcDir = path.join(__dirname, '..', 'node_modules', '@vscode', 'codicons', 'dist');
    const codiconDestDir = path.join(__dirname, '..', 'media', 'codicons');
    try {
      if (fs.existsSync(codiconSrcDir)) {
        if (!fs.existsSync(codiconDestDir)) fs.mkdirSync(codiconDestDir, { recursive: true });
        // Copy codicon.css and font files
        const assets = fs.readdirSync(codiconSrcDir).filter(f => /codicon\.(css|ttf|woff2?)$/i.test(f));
        for (const file of assets) {
          fs.copyFileSync(path.join(codiconSrcDir, file), path.join(codiconDestDir, file));
        }
      }
    } catch(copyErr) {
      console.warn('[mxscript] Warning copying codicon assets:', copyErr.message);
    }
    if (isWatch) {
      const ctx1 = await esbuild.context({ ...baseOpts, entryPoints: [playgroundEntry], outfile: playgroundOutFile });
      const ctx2 = await esbuild.context({ ...baseOpts, entryPoints: [envEditorEntry], outfile: envEditorOutFile });
      await ctx1.watch();
      await ctx2.watch();
      console.log('[mxscript] Webview playground & environment editor watch started');
      process.stdin.resume();
    } else {
      await esbuild.build({ ...baseOpts, entryPoints: [playgroundEntry], outfile: playgroundOutFile });
      await esbuild.build({ ...baseOpts, entryPoints: [envEditorEntry], outfile: envEditorOutFile });
      console.log('[mxscript] Webview playground & environment editor build complete');
    }
  } catch (err) {
    console.error('[mxscript] Webview playground build failed', err);
    process.exit(1);
  }
}

run();
