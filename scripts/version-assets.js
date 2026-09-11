#!/usr/bin/env node
// Stamps a content hash onto every assets/css|js reference in the root HTML
// files, e.g. assets/css/site.css?v=3f7a9c2e1b, so a deploy that changes a
// file's contents busts browsers' long-lived caches immediately, while files
// that didn't change keep their old URL (and stay cached). Run after the
// Tailwind build so site.css is current; see package.json "build".
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const HASH_LEN = 10;

function hashFile(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex').slice(0, HASH_LEN);
}

// modal.js imports contact-form.js directly (not via a <script> tag), so
// there's no HTML reference for the loop below to stamp. Patch that import
// specifier first so modal.js's own hash (computed next) reflects it, and a
// content change in contact-form.js still busts the cached import URL.
const modalJsPath = path.join(root, 'assets/js/modal.js');
const contactFormHash = hashFile(path.join(root, 'assets/js/contact-form.js'));
const importRef = /(from\s+(['"])\.\/contact-form\.js)(\?v=[0-9a-f]+)?(\2)/;
const modalSrc = fs.readFileSync(modalJsPath, 'utf8');
const modalNext = modalSrc.replace(importRef, `$1?v=${contactFormHash}$4`);
if (modalNext !== modalSrc) fs.writeFileSync(modalJsPath, modalNext);

const assetDirs = ['assets/css', 'assets/js'];
const hashes = new Map();
for (const dir of assetDirs) {
  const full = path.join(root, dir);
  for (const name of fs.readdirSync(full)) {
    if (!/\.(css|js)$/.test(name)) continue;
    const rel = `${dir}/${name}`;
    hashes.set(rel, hashFile(path.join(root, rel)));
  }
}

const assetRef = /(assets\/(?:css|js)\/[\w.-]+\.(?:css|js))(\?v=[0-9a-f]+)?/g;

const htmlFiles = fs.readdirSync(root).filter((f) => f.endsWith('.html'));
let filesChanged = 0;
for (const file of htmlFiles) {
  const full = path.join(root, file);
  const src = fs.readFileSync(full, 'utf8');
  const next = src.replace(assetRef, (match, rel) => {
    const hash = hashes.get(rel);
    return hash ? `${rel}?v=${hash}` : match;
  });
  if (next !== src) {
    fs.writeFileSync(full, next);
    filesChanged += 1;
  }
}

console.log(
  `version-assets: hashed ${hashes.size} file(s) in assets/css|js, updated ${filesChanged}/${htmlFiles.length} HTML file(s), ` +
    `modal.js contact-form.js import ${modalNext !== modalSrc ? 'updated' : 'unchanged'}.`
);
