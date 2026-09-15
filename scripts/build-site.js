#!/usr/bin/env node
// Copies the public site into dist/, which is the only folder Netlify publishes.
// This is an allowlist: a file reaches the live site only if it is named here,
// so new docs, config and tooling at the repo root stay private by default.
// Run last in `npm run build`, after site.css, assets/js and the ?v= hashes exist.
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'dist');

// Root-level files that are served as-is.
const ROOT_FILES = [
  'index.html',
  '404.html',
  'accessibility.html',
  'privacy.html',
  't&c.html',
  'financial-responsibility-agreement.html',
  'style-guide.html',
  'favicon.ico',
  'apple-touch-icon.png',
  'site.webmanifest',
  'robots.txt',
  'sitemap.xml',
];

// assets/ is copied whole, minus dotfiles. Everything under it is public
// (style-guide.html links assets/logomarks/README.txt on purpose).
const ASSET_DIR = 'assets';

let copied = 0;

function copyFile(rel) {
  const dest = path.join(outDir, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(path.join(root, rel), dest);
  copied += 1;
}

function copyDir(rel) {
  for (const entry of fs.readdirSync(path.join(root, rel), { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const child = `${rel}/${entry.name}`;
    if (entry.isDirectory()) copyDir(child);
    else if (entry.isFile()) copyFile(child);
  }
}

fs.rmSync(outDir, { recursive: true, force: true });
for (const rel of ROOT_FILES) {
  if (!fs.existsSync(path.join(root, rel))) {
    console.error(`build-site: missing ${rel}`);
    process.exit(1);
  }
  copyFile(rel);
}
copyDir(ASSET_DIR);

console.log(`build-site: copied ${copied} file(s) into dist/.`);
