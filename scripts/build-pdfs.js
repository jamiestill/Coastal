#!/usr/bin/env node
// Renders the downloadable PDFs in assets/docs/ from their HTML sources in src/pdf/
// as tagged, PDF/UA-1 documents (headings, tables, lists, alt text, language, title).
//
// Not part of `npm run build` — Netlify serves the committed PDFs. Run it locally
// after editing a source, then commit the regenerated PDF:
//
//   brew install weasyprint        # WeasyPrint >= 66 (needs Pango)
//   npm run build:pdfs
//
// Set WEASYPRINT=/path/to/weasyprint to use a binary that isn't on PATH.
// Needs network access: pdf.css pulls Cormorant Garamond italic from Google Fonts.
// Validate with veraPDF (`verapdf -f ua1 assets/docs/*.pdf`) before committing.

const { execFileSync } = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const bin = process.env.WEASYPRINT || 'weasyprint';

const docs = [
  ['src/pdf/pricing-sheet.html', 'assets/docs/CHA_Pricing_Sheet.pdf'],
  ['src/pdf/lindsey-profile.html', 'assets/docs/Lindsey Profile.pdf'],
  ['src/pdf/financial-responsibility-agreement.html', 'assets/docs/Coastal-Financial-Responsibility-Agreement-DRAFT.pdf'],
];

const only = process.argv.slice(2);

for (const [src, out] of docs) {
  if (only.length && !only.some((name) => src.includes(name))) continue;
  execFileSync(bin, ['--pdf-variant', 'pdf/ua-1', '--custom-metadata', path.join(root, src), path.join(root, out)], {
    stdio: 'inherit',
  });
  console.log(`${src} -> ${out}`);
}
