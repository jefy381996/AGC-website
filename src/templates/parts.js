/* Reusable page fragments. */

const site = require('../data/site');
const photos = require('./photos');
const { ui } = require('../data/content');
const L = require('./layout');
const { t, esc, asset, pageUrl, waLink, directionsLink, icons } = L;

function picture(name, alt, opts) {
  opts = opts || {};
  const slot = photos.resolveSlot(name);

  if (!slot) {
    // Nothing on disk for this slot or its fallbacks — render no <img> at all
    // rather than a broken one.
    return '';
  }

  const file = photos.fileFor(slot);
  const cls = opts.class ? ' class="' + opts.class + '"' : '';
  const loading = opts.eager ? 'eager' : 'lazy';
  const priority = opts.eager ? ' fetchpriority="high"' : '';
  const sizes = opts.sizes ? ' sizes="' + opts.sizes + '"' : '';
  const dims = opts.width ? ` width="${opts.width}" height="${opts.height}"` : '';

  // Only offer the WebP source when one actually exists. A photo dropped in
  // as a plain .jpg has no .webp beside it, and <picture> does not recover
  // from a source that 404s — it would just show a broken image.
  const webp = photos.hasWebp(slot) && !/\.webp$/.test(file)
    ? `<source type="image/webp" srcset="${asset('assets/img/food/' + slot + '.webp')}"${sizes}>\n      `
    : '';

  return `<picture${cls}>
      ${webp}<img src="${asset('assets/img/food/' + file)}" alt="${esc(alt)}" loading="${loading}" decoding="async"${priority}${dims}>
    </picture>`;
}

/* A framed photo with the hairline inner ring. */
function framed(name, alt, opts) {
  opts = opts || {};
  const ratio = opts.ratio === false ? '' : (opts.ratio ? ' ' + opts.ratio : ' ratio-4-3');
  const reveal = opts.reveal === false ? '' : ` data-reveal="${opts.reveal || 'wipe'}"`;
  const extra = opts.class ? ' ' + opts.class : '';
  return `<div class="frame${ratio}${extra}"${reveal}>
      ${picture(name, alt, opts)}
      <span class="frame__ring"></span>
    </div>`;
}

function rule() {
  return `<div class="rule" aria-hidden="true"><span class="rule__mark"></span></div>`;
}

/* The closing "come and eat" band used at the foot of most pages. */
function ctaBand(lang, opts) {
  opts = opts || {};
  const title = opts.title || {
    en: 'Come and eat with us',
    ar: 'تعال وتناول الطعام معنا'
  };
  const body = opts.body || {
    en: 'No bookings, no delivery, no waiting on an app. Just walk in — we will cook it fresh.',
    ar: 'لا حجوزات، ولا توصيل، ولا انتظار لتطبيق. فقط ادخل — وسنطهو لك طازجاً.'
  };

  return `
  <section class="section">
    <div class="shell">
      <div class="cta-band" data-reveal="zoom">
        <p class="script">${esc(t(site.taglines.together, lang))}</p>
        <h2 class="t-2xl" style="margin:.5rem 0 1rem;font-weight:300">${esc(t(title, lang))}</h2>
        <p class="lede" style="margin:0 auto 2rem">${esc(t(body, lang))}</p>
        <div class="btn-row">
          <a class="btn btn--gold magnetic" href="${directionsLink()}" target="_blank" rel="noopener">${icons.pin}<span>${esc(t(ui.directions, lang))}</span></a>
          <a class="btn btn--ghost magnetic" href="${pageUrl('menu', lang)}"><span>${esc(t(ui.viewMenu, lang))}</span>${icons.arrowRight}</a>
        </div>
        <p class="tiny muted" style="margin-top:1.6rem">${esc(t(ui.noDelivery, lang))}</p>
      </div>
    </div>
  </section>`;
}

/* Interior page hero. */
function pageHero(lang, opts) {
  return `
  <section class="phero">
    <div class="phero__bg" data-parallax="0.12">${picture(opts.image || 'hero', '', { eager: true })}</div>
    <div class="phero__veil"></div>
    <div class="shell">
      <p class="eyebrow eyebrow--center" data-reveal="up" style="justify-content:center">${esc(t(opts.eyebrow, lang))}</p>
      <h1 class="phero__title" data-reveal="up" style="--rv-delay:90ms">${esc(t(opts.title, lang))}</h1>
      <p class="lede" data-reveal="up" style="--rv-delay:180ms">${esc(t(opts.lede, lang))}</p>
    </div>
  </section>`;
}

function price(value, lang) {
  return `${value}<sup>${esc(t(ui.sar, lang))}</sup>`;
}

module.exports = {
  picture: picture, framed: framed, rule: rule,
  ctaBand: ctaBand, pageHero: pageHero, price: price,
  hasPhoto: photos.hasPhoto, resolveSlot: photos.resolveSlot, fileFor: photos.fileFor
};
