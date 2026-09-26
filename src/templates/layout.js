/* ---------------------------------------------------------------------------
   The HTML shell every page is poured into: head, header, drawer, footer.
--------------------------------------------------------------------------- */

const site = require('../data/site');
const { ui, order } = require('../data/content');
const orderData = require('../data/order');
const icons = require('./icons');
const photos = require('./photos');

/* The bundle filenames carry a content hash, which build.js fills in before
   it renders anything. Without one, a browser that has the old stylesheet
   cached keeps using it after a deploy — which is exactly what happened
   after the palette change went live. */
const bundles = { css: 'assets/css/styles.css', js: 'assets/js/app.js' };

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

/* site.url already ends in the base path ("…github.io/AGC-website") and
   asset() prepends that same base, so joining the two doubled it — every
   social preview image pointed at /AGC-website/AGC-website/… and 404'd.
   The canonical and hreflang links strip the base back off for this reason;
   this does the same job for anything under assets/. It matters more than it
   looks: WhatsApp builds its link preview from og:image, and WhatsApp is
   where every order now starts. */
function absUrl(rel) {
  return site.url.replace(/\/$/, '') + '/' + String(rel).replace(/^\//, '');
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
    image: absUrl('assets/img/brand/og-image.jpg'),
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
          <span class="logo__name"><span class="logo__name--full">${esc(t(site.name, lang))}</span><span class="logo__name--short">${esc(t(site.shortName, lang))}</span></span>
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

/* --- Ordering ------------------------------------------------------------
   The basket bar and the order panel live in the shell rather than on the
   menu page, because a basket survives navigation — you can add a karahi,
   wander to the gallery, and the bar is still there.

   Nothing here is interactive without JavaScript, so the whole block is
   hidden until 07-order.js marks the document ready. The menu itself, the
   prices and the WhatsApp number stay readable either way.            */

function orderUi(lang) {
  const rtl = lang === 'ar';
  const opt = `<span class="ofield__opt">${esc(t(order.optional, lang))}</span>`;

  return `
  <div class="obar" id="obar" hidden data-order-bar>
    <button class="obar__btn" type="button" data-order-open>
      <span class="obar__count" data-order-count aria-hidden="true">0</span>
      <span class="obar__label">${esc(t(order.review, lang))}</span>
      <span class="obar__total"><span data-order-total>0</span> ${esc(t(ui.sar, lang))}</span>
    </button>
  </div>

  <div class="opanel" id="order-panel" hidden aria-hidden="true" role="dialog" aria-modal="true"
       aria-labelledby="order-panel-title">
    <div class="opanel__sheet">
      <div class="opanel__head">
        <h2 class="opanel__title" id="order-panel-title">${esc(t(order.panelTitle, lang))}</h2>
        <button class="opanel__close" type="button" data-order-close
                aria-label="${esc(t(ui.close, lang))}">${icons.close}</button>
      </div>

      <div class="opanel__scroll">
        <p class="opanel__empty" data-order-empty hidden>
          ${esc(t(order.empty, lang))}
          <a class="olink" href="${pageUrl('menu', lang)}">${esc(t(order.browse, lang))}</a>
        </p>

        <ul class="olist" data-order-list></ul>

        <div class="ototal" data-order-summary hidden>
          <div class="ototal__row">
            <span>${esc(t(order.total, lang))}</span>
            <strong><span data-order-total>0</span> ${esc(t(ui.sar, lang))}</strong>
          </div>
          <p class="tiny muted ototal__note">${esc(t(order.totalNote, lang))}</p>
          <button class="olink olink--quiet" type="button" data-order-clear>${esc(t(order.clear, lang))}</button>
        </div>

        <form class="oform" data-order-form novalidate hidden>
          <fieldset class="ohow">
            <legend class="ofield__label">${esc(t(order.howLabel, lang))}</legend>
            <label class="ohow__opt">
              <input type="radio" name="fulfilment" value="pickup" checked>
              <span class="ohow__body">
                <span class="ohow__name">${esc(t(order.pickup, lang))}</span>
                <span class="ohow__hint">${esc(t(order.pickupHint, lang))}</span>
              </span>
            </label>
            <label class="ohow__opt">
              <input type="radio" name="fulfilment" value="delivery">
              <span class="ohow__body">
                <span class="ohow__name">${esc(t(order.delivery, lang))}</span>
                <span class="ohow__hint">${esc(t(order.deliveryHint, lang))}</span>
              </span>
            </label>
          </fieldset>

          <p class="ofield">
            <label class="ofield__label" for="o-name">${esc(t(order.nameLabel, lang))}</label>
            <input class="ofield__input" id="o-name" name="name" type="text" autocomplete="name"
                   placeholder="${esc(t(order.namePlaceholder, lang))}" required
                   aria-describedby="o-name-err">
            <span class="ofield__err" id="o-name-err" data-err hidden></span>
          </p>

          <p class="ofield">
            <label class="ofield__label" for="o-phone">${esc(t(order.phoneLabel, lang))}</label>
            <input class="ofield__input ltr" id="o-phone" name="phone" type="tel" autocomplete="tel"
                   inputmode="tel" placeholder="${esc(t(order.phonePlaceholder, lang))}" required
                   aria-describedby="o-phone-err">
            <span class="ofield__err" id="o-phone-err" data-err hidden></span>
          </p>

          <p class="ofield" data-order-address hidden>
            <label class="ofield__label" for="o-address">${esc(t(order.addressLabel, lang))}</label>
            <textarea class="ofield__input" id="o-address" name="address" rows="3"
                      placeholder="${esc(t(order.addressPlaceholder, lang))}"
                      aria-describedby="o-address-err"></textarea>
            <span class="ofield__err" id="o-address-err" data-err hidden></span>
          </p>

          <p class="ofield">
            <label class="ofield__label" for="o-notes">${esc(t(order.notesLabel, lang))} ${opt}</label>
            <textarea class="ofield__input" id="o-notes" name="notes" rows="2"
                      placeholder="${esc(t(order.notesPlaceholder, lang))}"></textarea>
          </p>

          <button class="btn btn--gold obtn" type="submit">
            ${icons.whatsapp}<span>${esc(t(order.send, lang))}</span>
          </button>
          <p class="tiny muted osend-hint">${esc(t(order.sendHint, lang))}</p>
        </form>

        <div class="osent" data-order-sent hidden>
          <h3 class="osent__title">${esc(t(order.sentTitle, lang))}</h3>
          <p class="osent__body">${esc(t(order.sentBody, lang))}</p>
          <div class="btn-row btn-row--tight">
            <button class="btn btn--ghost" type="button" data-order-restart>${esc(t(order.sentClear, lang))}</button>
            <button class="olink olink--quiet" type="button" data-order-keep>${esc(t(order.sentKeep, lang))}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="opanel__scrim" data-order-close></div>
  </div>

  <script type="application/json" id="order-catalogue">${
    JSON.stringify(orderData.catalogue).replace(/</g, '\\u003c')
  }</script>
  <script type="application/json" id="order-config">${
    JSON.stringify({
      wa: site.contact.whatsapp,
      lang: lang,
      rtl: rtl,
      sar: t(ui.sar, lang),
      s: {
        count: order.count[lang] || order.count.en,
        increase: t(order.increase, lang),
        decrease: t(order.decrease, lang),
        remove: t(order.remove, lang),
        clearConfirm: t(order.clearConfirm, lang),
        errName: t(order.errName, lang),
        errPhone: t(order.errPhone, lang),
        errPhoneShape: t(order.errPhoneShape, lang),
        errAddress: t(order.errAddress, lang),
        errEmpty: t(order.errEmpty, lang),
        inOrder: t(order.inOrder, lang),
        addTo: t(order.addTo, lang),
        wa: {
          heading: t(order.wa.heading, lang),
          items: t(order.wa.items, lang),
          total: t(order.wa.total, lang),
          how: t(order.wa.how, lang),
          pickup: t(order.wa.pickup, lang),
          delivery: t(order.wa.delivery, lang),
          name: t(order.wa.name, lang),
          phone: t(order.wa.phone, lang),
          address: t(order.wa.address, lang),
          notes: t(order.wa.notes, lang),
          footer: t(order.wa.footer, lang)
        }
      }
    }).replace(/</g, '\\u003c')
  }</script>`;
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
<meta name="theme-color" content="#EFE6D6">
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
<meta property="og:image" content="${absUrl('assets/img/brand/og-image.jpg')}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(opts.title)}">
<meta name="twitter:description" content="${esc(opts.description)}">
<meta name="twitter:image" content="${absUrl('assets/img/brand/og-image.jpg')}">

<link rel="icon" href="${asset('assets/img/brand/favicon-32.png')}" sizes="32x32">
<link rel="icon" href="${asset('assets/img/brand/icon-192.png')}" sizes="192x192">
<link rel="apple-touch-icon" href="${asset('assets/img/brand/apple-touch-icon.png')}">
<link rel="manifest" href="${asset('site.webmanifest')}">

<link rel="preload" as="font" type="font/woff2" crossorigin href="${asset('assets/fonts/' + (lang === 'ar' ? 'amiri-700-normal-arabic' : 'cormorant-garamond-300-normal-latin') + '.woff2')}">
<link rel="preload" as="font" type="font/woff2" crossorigin href="${asset('assets/fonts/' + (lang === 'ar' ? 'tajawal-500-normal-arabic' : 'manrope-300-normal-latin') + '.woff2')}">
<link rel="preload" as="image" href="${asset('assets/img/food/' + heroFile)}" fetchpriority="high">
<link rel="stylesheet" href="${asset(bundles.css)}">
<script>document.documentElement.classList.add('js');</script>
<script type="application/ld+json">${jsonLd(lang)}</script>
</head>
<body class="page-${opts.id}${opts.id === 'notfound' ? '' : ' has-dark-hero'}">
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
${orderUi(lang)}
${opts.extra || ''}

<script src="${asset(bundles.js)}" defer></script>
</body>
</html>`;
}

module.exports = {
  bundles: bundles,
  layout: layout, t: t, esc: esc, asset: asset, pageUrl: pageUrl,
  waLink: waLink, mapsLink: mapsLink, directionsLink: directionsLink, icons: icons
};
