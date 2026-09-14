#!/usr/bin/env node
// Minifies every src/js/*.js file into assets/js/ (git-ignored, like
// assets/css/site.css built from src/input.css). Source stays hand-authored
// and readable; scripts/version-assets.js content-hashes the minified output
// afterward. Run as part of `npm run build`.
'use strict';
const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'src/js');
const outDir = path.join(root, 'assets/js');

// theme.js and partials.js load as classic <script> tags (no import/export);
// every other file is an ES module.
const CLASSIC_SCRIPT_FILES = new Set(['theme.js', 'partials.js']);

async function build() {
  fs.mkdirSync(outDir, { recursive: true });
  const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.js'));

  for (const name of files) {
    const code = fs.readFileSync(path.join(srcDir, name), 'utf8');
    const result = await minify(code, {
      module: !CLASSIC_SCRIPT_FILES.has(name),
      compress: true,
      mangle: true,
      format: { comments: false },
    });
    if (result.error) throw result.error;
    fs.writeFileSync(path.join(outDir, name), result.code);
  }

  console.log(`build-js: minified ${files.length} file(s) from src/js into assets/js.`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
