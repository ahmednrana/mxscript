// Enhanced build script for React playground webview with optional watch mode
const esbuild = require('esbuild');
const path = require('path');

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
