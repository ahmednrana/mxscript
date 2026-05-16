const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const isWatch = args.includes('--watch');

const srcRoot = path.join(__dirname, '..', 'src', 'webview', 'react', 'boot');
const mediaRoot = path.join(__dirname, '..', 'media');

// LyteNyte Grid 2.x renders context objects directly as providers, which is a
// React 19 API. The scriptGrid bundle is aliased onto a React 19 copy installed
// as react19/react-dom19; other webviews stay on the project's React 18.
const react19Alias = {
  react: 'react19',
  'react-dom': 'react-dom19'
};

// Each webview gets its own self-contained bundle.
const bundles = [
  {
    entry: path.join(srcRoot, 'environmentEditorEntry.tsx'),
    outfile: path.join(mediaRoot, 'environmentEditor.js')
  },
  {
    entry: path.join(srcRoot, 'scriptGridEntry.tsx'),
    outfile: path.join(mediaRoot, 'scriptGrid.js'),
    alias: react19Alias
  }
];

const baseOpts = {
  bundle: true,
  platform: 'browser',
  format: 'iife',
  target: ['es2019'],
  sourcemap: true,
  logLevel: 'info',
  loader: { '.css': 'css', '.ttf': 'file', '.woff': 'file', '.woff2': 'file' },
  define: { 'process.env.NODE_ENV': isWatch ? '"development"' : '"production"' }
};

async function run() {
  try {
    const codiconSrcDir = path.join(__dirname, '..', 'node_modules', '@vscode', 'codicons', 'dist');
    const codiconDestDir = path.join(mediaRoot, 'codicons');
    try {
      if (fs.existsSync(codiconSrcDir)) {
        if (!fs.existsSync(codiconDestDir)) fs.mkdirSync(codiconDestDir, { recursive: true });
        const assets = fs.readdirSync(codiconSrcDir).filter(f => /codicon\.(css|ttf|woff2?)$/i.test(f));
        for (const file of assets) {
          fs.copyFileSync(path.join(codiconSrcDir, file), path.join(codiconDestDir, file));
        }
      }
    } catch (copyErr) {
      console.warn('[mxscript] Warning copying codicon assets:', copyErr.message);
    }

    if (isWatch) {
      for (const b of bundles) {
        const ctx = await esbuild.context({
          ...baseOpts,
          entryPoints: [b.entry],
          outfile: b.outfile,
          ...(b.alias ? { alias: b.alias } : {})
        });
        await ctx.watch();
      }
      console.log('[mxscript] Webview watch started');
      process.stdin.resume();
    } else {
      for (const b of bundles) {
        await esbuild.build({
          ...baseOpts,
          entryPoints: [b.entry],
          outfile: b.outfile,
          ...(b.alias ? { alias: b.alias } : {})
        });
      }
      console.log('[mxscript] Webview build complete');
    }
  } catch (err) {
    console.error('[mxscript] Webview build failed', err);
    process.exit(1);
  }
}

run();
