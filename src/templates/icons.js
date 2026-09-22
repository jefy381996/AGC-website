/* Inline SVG icons. Kept as strings so pages stay a single request. */

const icons = {
  /* Chef's hat with crossed fork and spoon — the mark from the poster. */
  logo: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M14 22.5c-3.6-.6-6.2-3.5-6.2-7 0-3.9 3.2-7 7.1-7 .6 0 1.2.1 1.8.2C18 5.9 20.8 4 24 4s6 1.9 7.3 4.7c.6-.1 1.2-.2 1.8-.2 3.9 0 7.1 3.1 7.1 7 0 3.5-2.6 6.4-6.2 7"/>
    <path d="M14 22.5V37a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V22.5"/>
    <path d="M14 30.5h20"/>
    <path d="M21 13.5v5M27 13.5v5"/>
  </svg>`,

  monogram: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
    <circle cx="32" cy="32" r="30" opacity=".35"/>
    <circle cx="32" cy="32" r="24.5"/>
    <path d="M22 41.5 32 21l10 20.5M26.2 35.4h11.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.04 0 1.2.87 2.36.99 2.53.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z"/>
  </svg>`,

  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>
  </svg>`,

  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M20 10.5c0 6-8 12.5-8 12.5s-8-6.5-8-12.5a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10.2" r="2.9"/>
  </svg>`,

  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5"/><path d="M12 6.8V12l3.4 2"/>
  </svg>`,

  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4.5 12h15M13.5 6l6 6-6 6"/>
  </svg>`,

  arrowUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 19.5v-15M6 10.5l6-6 6 6"/>
  </svg>`,

  chevronLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M15 5l-7 7 7 7"/>
  </svg>`,

  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M9 5l7 7-7 7"/>
  </svg>`,

  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="10.8" cy="10.8" r="7"/><path d="M21 21l-5.2-5.2"/>
  </svg>`,

  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true">
    <path d="M5.5 5.5l13 13M18.5 5.5l-13 13"/>
  </svg>`,

  expand: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M9 3.5H3.5V9M15 3.5h5.5V9M9 20.5H3.5V15M15 20.5h5.5V15"/>
  </svg>`,

  flame: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 2.5s5.5 4.3 5.5 9.2a5.5 5.5 0 0 1-11 0c0-1.9.9-3.4 1.8-4.6.3 1.1 1 1.9 1.9 1.9 1.3 0 1.6-1.4 1.6-3 0-1.4-.4-2.6.2-3.5Z"/>
    <path d="M12 21.5a3 3 0 0 1-3-3c0-1.7 3-4.4 3-4.4s3 2.7 3 4.4a3 3 0 0 1-3 3Z"/>
  </svg>`,

  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4.5 12.8l5 5 10-11"/>
  </svg>`,

  cross: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18"/>
  </svg>`,

  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M20.5 3.5C9.5 3.5 4 8.5 4 16a6 6 0 0 0 .8 3C7 13 11.5 9.8 17 9c-4 1.8-7.8 5-9.6 10.6"/>
    <path d="M4.8 19C11 21.8 20.5 18.5 20.5 3.5"/>
  </svg>`,

  wallet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M20.5 8.5v-1a2 2 0 0 0-2-2H5a2 2 0 0 1 0-4h11.5"/>
    <rect x="2.5" y="5.5" width="19" height="14" rx="2.5"/>
    <circle cx="16.8" cy="12.5" r="1.4" fill="currentColor" stroke="none"/>
  </svg>`,

  seal: `<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">
    <circle cx="100" cy="100" r="96"/><circle cx="100" cy="100" r="82"/><circle cx="100" cy="100" r="62"/>
    <path d="M100 26 108 52 134 44 124 70 150 76 130 94 150 112 124 118 134 144 108 136 100 162 92 136 66 144 76 118 50 112 70 94 50 76 76 70 66 44 92 52Z"/>
  </svg>`
};

module.exports = icons;
