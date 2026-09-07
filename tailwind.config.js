/** @type {import('tailwindcss').Config} */
// Coastal Healthcare Advocates — brand-locked config.
// Palette + type system: assets/logomarks/README.txt and creative/Coastal Style Guide.html.
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  // Dark mode is a deliberate toggle: :root[data-theme="dark"] (style guide §07).
  darkMode: ['selector', ':root[data-theme="dark"]'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', lg: '1.5rem' },
      screens: { lg: '1000px' },
    },
    screens: { sm: '480px', md: '768px', lg: '1024px', xl: '1200px' },
    extend: {
      colors: {
        // The only colours are the style guide's. Palette (identity, fixed):
        navy: '#0F1E4A',
        sky: '#4FACFE',
        cyan: '#00F2FE',
        coral: '#FE1E1A',
        midnight: '#0A0F24',
        paper: '#F5FBFF',
        // Semantic tokens — CSS vars, swapped for dark by :root[data-theme] (see src/input.css).
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        line: 'var(--line)',
        'line-soft': 'var(--line-soft)',
        'tag-bg': 'var(--tag-bg)',
        'warn-bg': 'var(--warn-bg)',
        'warn-line': 'var(--warn-line)',
        'warn-ink': 'var(--warn-ink)',
      },
      fontFamily: {
        logo: ['"Tenor Sans"', 'ui-sans-serif', '"Gill Sans"', '"Trebuchet MS"', 'system-ui', 'sans-serif'],
        head: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        label: ['Questrial', 'ui-sans-serif', '"Century Gothic"', '"Avenir Next"', 'system-ui', 'sans-serif'],
        body: ['Ysabeau', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      // Style guide §04 Heading Sizes (desktop / mobile, size · line-height):
      //   H1 Questrial 400   48/56 · 28/36
      //   H2 Cormorant 500   28/36 · 24/32
      //   H3 Cormorant 500   24/32 · 20/28
      //   H4 Cormorant 500   20/28 · 20/28
      fontSize: {
        eyebrow: ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.14em' }],
        lede: ['1.3125rem', { lineHeight: '1.45' }],
        h4: ['1.25rem', { lineHeight: '1.35' }],
        h3: ['clamp(1.25rem, 1.05rem + 0.9vw, 1.5rem)', { lineHeight: '1.3' }],
        h2: ['clamp(1.5rem, 1.3rem + 0.9vw, 1.75rem)', { lineHeight: '1.25' }],
        h1: ['clamp(1.75rem, 1.15rem + 2.7vw, 3rem)', { lineHeight: '1.12' }],
      },
      maxWidth: { canvas: '1000px', measure: '62ch', prose: '68ch' },
      gridTemplateColumns: { 9: 'repeat(9, minmax(0, 1fr))' },
      gap: { gutter: '24px' },
      spacing: { gutter: '24px', col: '90px' },
      borderRadius: { card: '12px', tile: '10px' },
      // Neutral near-black elevation only — no chromatic/navy glow.
      boxShadow: {
        card: '0 1px 2px rgba(10, 15, 36, 0.06), 0 4px 12px rgba(10, 15, 36, 0.06)',
        lift: '0 2px 8px rgba(10, 15, 36, 0.08), 0 12px 28px rgba(10, 15, 36, 0.10)',
      },
      transitionTimingFunction: { calm: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
};
