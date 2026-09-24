/* ---------------------------------------------------------------------------
   The HTML shell every page is poured into: head, header, drawer, footer.
--------------------------------------------------------------------------- */

const site = require('../data/site');
const { ui } = require('../data/content');
const icons = require('./icons');
const photos = require('./photos');

/* Picks the right language out of a { en, ar } pair. */
function t(value, lang) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  return value[lang] !== undefined ? value[lang] : (value.en || '');
}

function esc(str) {
  return String(str === undefined || str === null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* Site-root-relative URL for an asset. */
function asset(path) {
  return site.base + '/' + String(path).replace(/^\//, '');
}

/* URL of a page in a given language. */
function pageUrl(pageId, lang) {
  const page = site.pages.concat([{ id: 'notfound', file: '404.html' }])
    .find(function (p) { return p.id === pageId; });
  const file = page ? page.file : 'index.html';
  const prefix = lang === 'en' ? site.base + '/' : site.base + '/ar/';
  return file === 'index.html' ? prefix : prefix + file;
}

function waLink(lang) {
  const msg = lang === 'ar'
    ? 'السلام عليكم، لدي استفسار عن مطعم آل أشفاز'
    : 'Hello Al Ashfaz, I have a question about your restaurant';
  return 'https://wa.me/' + site.contact.whatsapp + '?text=' + encodeURIComponent(msg);
}

function mapsLink() {
  return 'https://www.google.com/maps/search/?api=1&query=' + site.contact.mapsQuery;
}

function directionsLink() {
  return 'https://www.google.com/maps/dir/?api=1&destination=' + site.contact.mapsQuery;
}

/* --- Structured data: helps Google show the right card ------------------ */
function jsonLd(lang) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const spec = Object.keys(site.hours.schedule).map(function (key) {
    const range = site.hours.schedule[key];
    const closeHour = parseInt(range[1].split(':')[0], 10);
    const close = closeHour >= 24
      ? String(closeHour - 24).padStart(2, '0') + ':' + range[1].split(':')[1]
      : range[1];
    return {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'https://schema.org/' + dayNames[Number(key)],
      opens: range[0],
      closes: close
    };
  });

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': site.url + '/#restaurant',
    name: t(site.name, lang),
    alternateName: lang === 'en' ? t(site.name, 'ar') : t(site.name, 'en'),
    description: lang === 'ar'
      ? 'مطعم آل أشفاز في البطحاء بالرياض — كراهي ومشويات وبرياني ونان طازج من التنور، تُطهى عند الطلب.'
      : 'Al Ashfaz Restaurant in Al-Batha, Riyadh — karahi, charcoal BBQ, biryani and tandoor-fresh naan, all cooked to order.',
    url: site.url,
    telephone: site.contact.phoneHref,
    image: site.url + asset('assets/img/brand/og-image.jpg'),
    servesCuisine: ['Pakistani', 'Afghan', 'Desi', 'Shinwari', 'Barbecue'],
    priceRange: 'SAR 1–90',
    currenciesAccepted: 'SAR',
    paymentAccepted: 'Cash, mada, credit card, Apple Pay',
    acceptsReservations: 'False',
    address: {
      '@type': 'PostalAddress',
      streetAddress: lang === 'ar' ? 'مقابل لولو هايبر، البطحاء' : 'Opposite Lulu Hyper, Al-Batha',
      addressLocality: lang === 'ar' ? 'الرياض' : 'Riyadh',
      addressCountry: 'SA'
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.contact.lat, longitude: site.contact.lng },
    openingHoursSpecification: spec,
    hasMenu: site.url + pageUrl('menu', lang).replace(site.base, ''),
    inLanguage: lang === 'ar' ? 'ar-SA' : 'en'
  });
}

/* --- Header ------------------------------------------------------------- */
function header(lang, current) {
  const other = lang === 'en' ? 'ar' : 'en';

  const navLinks = site.pages.map(function (p) {
    return `<a class="nav__link${p.id === current ? ' is-current' : ''}" href="${pageUrl(p.id, lang)}"${
      p.id === current ? ' aria-current="page"' : ''}>${esc(t(p.nav, lang))}</a>`;
  }).join('\n          ');

  const langLinks = site.languages.map(function (l) {
    return `<a href="${pageUrl(current === 'notfound' ? 'home' : current, l.code)}" hreflang="${l.code}" lang="${l.code}"${
      l.code === lang ? ' class="is-active" aria-current="true"' : ''} title="${esc(l.label)}">${esc(l.short)}</a>`;
  }).join('');

  return `
  <header class="header">
    <div class="header__inner">
      <a class="logo" href="${pageUrl('home', lang)}" aria-label="${esc(t(site.name, lang))}">
        <span class="logo__mark">${icons.logo}</span>
        <span class="logo__text">
          <span class="logo__name">${esc(t(site.name, lang))}</span>
          <span class="logo__sub">${esc(t(site.district, lang))} · ${esc(lang === 'ar' ? 'الرياض' : 'Riyadh')}</span>
        </span>
      </a>

      <nav class="nav" aria-label="${esc(lang === 'ar' ? 'التنقل الرئيسي' : 'Main navigation')}">
        ${navLinks}
      </nav>

      <div class="header__actions">
        <div class="lang-switch" role="group" aria-label="${esc(t(ui.langLabel, lang))}">${langLinks}</div>
        <button class="burger" type="button" aria-expanded="false" aria-controls="drawer" aria-label="${esc(t(ui.menuOpen, lang))}">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <div class="drawer" id="drawer" aria-hidden="true">
    <nav class="drawer__nav" aria-label="${esc(lang === 'ar' ? 'قائمة الجوال' : 'Mobile navigation')}">
      ${site.pages.map(function (p, i) {
        return `<a class="drawer__link${p.id === current ? ' is-current' : ''}" style="--i:${i}" href="${pageUrl(p.id, lang)}">
        <span class="idx">0${i + 1}</span><span>${esc(t(p.nav, lang))}</span>
      </a>`;
      }).join('\n      ')}
    </nav>
    <div class="drawer__foot">
      <p class="drawer__meta"><strong>${esc(lang === 'ar' ? 'العنوان' : 'Where we are')}</strong>${esc(t(site.contact.addressOneLine, lang))}</p>
      <a class="btn btn--wa" href="${waLink(lang)}" target="_blank" rel="noopener">
        ${icons.whatsapp}<span class="ltr">${esc(site.contact.phoneDisplay)}</span>
      </a>
    </div>
  </div>`;
}

/* --- Footer ------------------------------------------------------------- */
const SOCIAL = {
  tiktok: { label: { en: 'TikTok', ar: 'تيك توك' }, icon: 'tiktok' },
  instagram: { label: { en: 'Instagram', ar: 'إنستغرام' }, icon: 'instagram' },
  snapchat: { label: { en: 'Snapchat', ar: 'سناب شات' }, icon: 'snapchat' },
  google: { label: { en: 'Google reviews', ar: 'تقييمات جوجل' }, icon: 'star' }
};

/* Share-sheet links carry tracking parameters tied to the sender's own
   session — TikTok adds _t and _r, Instagram adds igsh. Those get stripped
   so they never reach a public page, whatever is pasted into site.js. */
const TRACKING = /^(_t|_r|igsh|igshid|si|fbclid|mibextid|utm_[a-z_]+)$/i;

function cleanUrl(url) {
  const raw = String(url).trim();
  const hash = raw.indexOf('#');
  const base = hash === -1 ? raw : raw.slice(0, hash);
  const cut = base.indexOf('?');
  if (cut === -1) return base;

  const kept = base.slice(cut + 1).split('&').filter(function (pair) {
    return pair && !TRACKING.test(pair.split('=')[0]);
  });
  return base.slice(0, cut) + (kept.length ? '?' + kept.join('&') : '');
}

/* Pulls "@name" out of a profile URL so the footer shows the handle people
   can actually search for, rather than just an icon. */
function handleFrom(url) {
  const clean = cleanUrl(url).replace(/\/+$/, '');
  const match = clean.match(/@([A-Za-z0-9._-]+)/);
  if (match) return '@' + match[1];
  const tail = clean.split('/').pop();
  return tail ? '@' + tail : '';
}

/* Only the accounts actually filled in appear. */
function socialRow(lang) {
  const keys = Object.keys(SOCIAL).filter(function (key) { return site.social[key]; });
  if (!keys.length) return '';

  const links = keys.map(function (key) {
    const spec = SOCIAL[key];
    const name = t(spec.label, lang);
    const handle = key === 'google' ? name : handleFrom(site.social[key]);
    return `<a class="social-link" href="${esc(cleanUrl(site.social[key]))}" target="_blank" rel="noopener"
             aria-label="${esc(name)}">
          <span class="social-link__icon">${icons[spec.icon]}</span>
          <span class="social-link__name ltr">${esc(handle)}</span>
        </a>`;
  }).join('\n        ');

  return `
      <div class="social">
        <p class="footer__title">${esc(lang === 'ar' ? 'تابعنا' : 'Follow us')}</p>
        <div class="social__row">
        ${links}
        </div>
      </div>`;
}

function footer(lang) {
  const hoursRows = site.hours.rows.map(function (r) {
    return `<div class="hours-row"><dt>${esc(t(r.days, lang))}</dt><dd>${esc(t(r.time, lang))}</dd></div>`;
  }).join('');

  const navList = site.pages.map(function (p) {
    return `<li><a href="${pageUrl(p.id, lang)}">${esc(t(p.nav, lang))}</a></li>`;
  }).join('');

  return `
  <footer class="footer">
    <div class="footer__seal">${icons.seal}</div>
    <div class="shell">
      <div class="footer__grid">
        <div data-reveal="up">
          <p class="footer__brandline">${esc(t(site.name, lang))}</p>
          <p class="small muted" style="max-width:34ch">${esc(t(site.taglines.authentic, lang))}. ${esc(t(site.cuisine, lang))}.</p>
          <p style="margin-top:1.1rem">
            <span class="open-pill" data-open-now data-schedule='${JSON.stringify(site.hours.schedule)}'
                  data-label-open="${esc(t(ui.openNow, lang))}" data-label-closed="${esc(t(ui.closedNow, lang))}">
              <span class="open-pill__dot"></span><span data-open-label>${esc(t(ui.openNow, lang))}</span>
            </span>
          </p>
          ${socialRow(lang)}
        </div>

        <div data-reveal="up">
          <p class="footer__title">${esc(lang === 'ar' ? 'تصفح' : 'Explore')}</p>
          <ul class="footer__list">${navList}</ul>
        </div>

        <div data-reveal="up">
          <p class="footer__title">${esc(lang === 'ar' ? 'تواصل' : 'Contact')}</p>
          <ul class="footer__list">
            <li><a href="${waLink(lang)}" target="_blank" rel="noopener">${esc(lang === 'ar' ? 'واتساب' : 'WhatsApp')} <span class="ltr">${esc(site.contact.phoneDisplay)}</span></a></li>
            <li><a href="tel:${site.contact.phoneHref}" class="ltr">${esc(site.contact.phoneIntl)}</a></li>
            <li><a href="${mapsLink()}" target="_blank" rel="noopener">${esc(lang === 'ar' ? 'الموقع على الخريطة' : 'Open in Google Maps')}</a></li>
          </ul>
        </div>

        <div data-reveal="up">
          <p class="footer__title">${esc(lang === 'ar' ? 'أوقات العمل' : 'Opening Hours')}</p>
          <dl style="margin-bottom:1rem">${hoursRows}</dl>
          <p class="tiny muted">${esc(t(site.contact.addressOneLine, lang))}</p>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© <span data-year>${new Date().getFullYear()}</span> ${esc(t(site.name, lang))}. ${esc(lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.')}</p>
        <p>${esc(t(site.taglines.people, lang))}</p>
      </div>
    </div>
  </footer>`;
}

/* --- Page shell --------------------------------------------------------- */
function layout(opts) {
  const lang = opts.lang;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const other = lang === 'en' ? 'ar' : 'en';
  const canonical = site.url + pageUrl(opts.id, lang).replace(new RegExp('^' + site.base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), '');
  const depth = lang === 'en' ? '' : '../';
  // Preload whatever the hero slot actually resolves to, so the link never
  // points at a file that is not there.
  const heroSlot = photos.resolveSlot(opts.heroImage || 'hero');
  const heroFile = heroSlot
    ? (photos.hasWebp(heroSlot) ? heroSlot + '.webp' : photos.fileFor(heroSlot))
    : '';

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(opts.title)}</title>
<meta name="description" content="${esc(opts.description)}">
<meta name="theme-color" content="#03110B">
${opts.noindex ? '<meta name="robots" content="noindex">' : ''}
<meta name="format-detection" content="telephone=no">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en" href="${site.url + pageUrl(opts.id, 'en').replace(site.base, '')}">
<link rel="alternate" hreflang="ar" href="${site.url + pageUrl(opts.id, 'ar').replace(site.base, '')}">
<link rel="alternate" hreflang="x-default" href="${site.url + pageUrl(opts.id, 'en').replace(site.base, '')}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(t(site.name, lang))}">
<meta property="og:locale" content="${lang === 'ar' ? 'ar_SA' : 'en_US'}">
<meta property="og:title" content="${esc(opts.title)}">
<meta property="og:description" content="${esc(opts.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url + asset('assets/img/brand/og-image.jpg')}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(opts.title)}">
<meta name="twitter:description" content="${esc(opts.description)}">
<meta name="twitter:image" content="${site.url + asset('assets/img/brand/og-image.jpg')}">

<link rel="icon" href="${asset('assets/img/brand/favicon-32.png')}" sizes="32x32">
<link rel="icon" href="${asset('assets/img/brand/icon-192.png')}" sizes="192x192">
<link rel="apple-touch-icon" href="${asset('assets/img/brand/apple-touch-icon.png')}">
<link rel="manifest" href="${asset('site.webmanifest')}">

<link rel="preload" as="font" type="font/woff2" crossorigin href="${asset('assets/fonts/' + (lang === 'ar' ? 'amiri-700-normal-arabic' : 'cormorant-garamond-300-normal-latin') + '.woff2')}">
<link rel="preload" as="font" type="font/woff2" crossorigin href="${asset('assets/fonts/' + (lang === 'ar' ? 'tajawal-500-normal-arabic' : 'manrope-300-normal-latin') + '.woff2')}">
<link rel="preload" as="image" href="${asset('assets/img/food/' + heroFile)}" fetchpriority="high">
<link rel="stylesheet" href="${asset('assets/css/styles.css')}">
<script>document.documentElement.classList.add('js');</script>
<script type="application/ld+json">${jsonLd(lang)}</script>
</head>
<body class="page-${opts.id}">
<a class="skip-link" href="#main">${esc(t(ui.skip, lang))}</a>

<div class="preloader" role="status" aria-live="polite">
  <div class="preloader__inner">
    <div class="preloader__mark">${icons.logo}</div>
    <p class="preloader__name">${esc(t(site.shortName, lang))}</p>
    <div class="preloader__bar"><span></span></div>
    <span class="sr-only">${esc(lang === 'ar' ? 'جارٍ التحميل' : 'Loading')}</span>
  </div>
</div>

<div class="progress" aria-hidden="true"><div class="progress__bar"></div></div>
<div class="curtain" aria-hidden="true"></div>
${header(lang, opts.id)}

<main id="main">
${opts.body}
</main>

${footer(lang)}

<button class="to-top" type="button" aria-label="${esc(t(ui.backTop, lang))}">${icons.arrowUp}</button>
<a class="wa-float" href="${waLink(lang)}" target="_blank" rel="noopener" aria-label="${esc(t(ui.whatsapp, lang))}">
  ${icons.whatsapp}<span>${esc(t(ui.whatsapp, lang))}</span>
</a>
${opts.extra || ''}

<script src="${asset('assets/js/app.js')}" defer></script>
</body>
</html>`;
}

module.exports = {
  layout: layout, t: t, esc: esc, asset: asset, pageUrl: pageUrl,
  waLink: waLink, mapsLink: mapsLink, directionsLink: directionsLink, icons: icons
};
