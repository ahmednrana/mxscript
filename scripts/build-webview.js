// Enhanced build script for React playground webview with optional watch mode
const esbuild = require('esbuild');
const path = require('path');

const args = process.argv.slice(2);
const isWatch = args.includes('--watch');

const entryFile = path.join(__dirname, '..', 'src', 'webview', 'react', 'playground', 'index.tsx');
const outFile = path.join(__dirname, '..', 'media', 'playground.js');

const buildOpts = {
  entryPoints: [entryFile],
  bundle: true,
  outfile: outFile,
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
      const ctx = await esbuild.context(buildOpts);
      await ctx.watch();
      console.log('[mxscript] Webview playground watch started');
      // Keep process alive
      process.stdin.resume();
    } else {
      await esbuild.build(buildOpts);
      console.log('[mxscript] Webview playground build complete');
    }
  } catch (err) {
    console.error('[mxscript] Webview playground build failed', err);
    process.exit(1);
  }
}

run();
