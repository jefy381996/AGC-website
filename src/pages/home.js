const site = require('../data/site');
const menu = require('../data/menu');
const { ui, home } = require('../data/content');
const L = require('../templates/layout');
const P = require('../templates/parts');
const { t, esc, pageUrl, directionsLink, waLink, icons } = L;

/* Splits a headline on \n and wraps each line so it can rise out of a mask. */
function splitTitle(str) {
  return String(str).split('\n').map(function (line, i) {
    return `<span class="ln"><span style="--i:${i}">${esc(line)}</span></span>`;
  }).join('');
}

/* The four plates recommended to a first-time visitor. */
const picks = [
  { image: 'karahi-shinwari', section: 'karahi', name: { en: 'Chicken Shinwari Karahi', ar: 'كراهي شنواري دجاج' }, price: 55,
    unit: { en: 'full', ar: 'كاملة' },
    note: { en: 'Meat, tomato and salt. Nothing else, and nowhere to hide.', ar: 'لحم وطماطم وملح. لا شيء غير ذلك، ولا مكان للاختباء.' } },
  { image: 'bbq-platter', section: 'bbq', name: { en: 'BBQ Mix Platter', ar: 'طبق مشاوي مشكّل' }, price: 35,
    unit: { en: 'per plate', ar: 'للطبق' },
    note: { en: 'Everything off the coals on one tray. Order it for the table.', ar: 'كل ما على الفحم في صينية واحدة. اطلبه للطاولة.' } },
  { image: 'biryani', section: 'rice', name: { en: 'Single Chicken Biryani', ar: 'برياني دجاج مفرد' }, price: 10,
    unit: { en: 'per plate', ar: 'للطبق' },
    note: { en: 'Saffron rice, fried onion, a whole piece of chicken beneath.', ar: 'أرز الزعفران وبصل مقلي وقطعة دجاج كاملة تحته.' } },
  { image: 'naan', section: 'bread', name: { en: 'Kabul Naan', ar: 'نان كابلي' }, price: 2,
    unit: { en: 'each', ar: 'للحبة' },
    note: { en: 'The long ridged loaf, scored down its length and built for tearing.', ar: 'الرغيف الطويل، محزَّز على طوله ومصنوع ليُقطَّع باليد.' } }
];

module.exports = function (lang) {
  const marquee = home.marquee[lang].map(function (item) {
    return `<span class="marquee__item">${esc(item)}</span>`;
  }).join('');

  const specials = menu.specials.items.map(function (item, i) {
    return `
        <article class="special${i % 2 ? ' special--flip' : ''}" data-reveal="${i % 2 ? 'right' : 'left'}">
          <div class="special__media">${P.picture(item.image, t(item.name, lang))}</div>
          <div class="special__body">
            <span class="badge">${esc(lang === 'ar' ? 'يومياً' : 'Every day')}</span>
            <h3 class="special__name">${esc(t(item.name, lang))}</h3>
            <p class="special__price">${item.price}<small>${esc(t(ui.sar, lang))}</small></p>
            <p class="special__desc">${esc(t(item.desc, lang))}</p>
          </div>
        </article>`;
  }).join('');

  const pillars = home.pillars.items.map(function (item, i) {
    return `
          <article class="card pillar tilt" data-reveal="up" style="--i:${i}">
            <span class="pillar__num">0${i + 1}</span>
            <h3 class="card__title">${esc(t(item.title, lang))}</h3>
            <p class="card__text">${esc(t(item.body, lang))}</p>
          </article>`;
  }).join('');

  const stats = home.stats.map(function (s, i) {
    return `
          <div class="stat" data-reveal="up" style="--i:${i}">
            <span class="stat__value foil" data-count="${s.value}">${s.value}</span>
            <span class="stat__label">${esc(t(s.label, lang))}</span>
          </div>`;
  }).join('');

  const dishes = picks.map(function (d, i) {
    return `
          <a class="card dish" href="${pageUrl('menu', lang)}#${d.section}" data-reveal="up" style="--i:${i}">
            ${P.framed(d.image, t(d.name, lang), { ratio: 'ratio-4-3', reveal: false })}
            <div class="card__body">
              <h3 class="dish__name">${esc(t(d.name, lang))}</h3>
              <p class="card__text" style="margin-top:.55rem">${esc(t(d.note, lang))}</p>
              <div class="dish__foot">
                <span class="dish__unit">${esc(t(d.unit, lang))}</span>
                <span class="dish__price">${d.price}<sup>${esc(t(ui.sar, lang))}</sup></span>
              </div>
            </div>
          </a>`;
  }).join('');

  const body = `
  <section class="hero">
    <div class="hero__bg" data-parallax="0.16">${P.picture('hero', '', { eager: true })}</div>
    <div class="hero__veil"></div>
    <canvas class="hero__embers" aria-hidden="true"></canvas>

    <div class="shell hero__inner">
      <div class="hero__copy">
        <p class="eyebrow hero__fade" style="--i:0">${esc(t(home.hero.eyebrow, lang))}</p>
        <span class="script hero__script hero__fade" style="--i:1">${esc(t(site.cuisine, lang))}</span>
        <h1 class="hero__title foil">${splitTitle(t(home.hero.title, lang))}</h1>
        <p class="lede hero__lede hero__fade" style="--i:2">${esc(t(home.hero.lede, lang))}</p>

        <div class="btn-row hero__fade" style="--i:3">
          <a class="btn btn--gold magnetic" href="${pageUrl('menu', lang)}"><span>${esc(t(ui.viewMenu, lang))}</span>${icons.arrowRight}</a>
          <a class="btn btn--ghost magnetic" href="${pageUrl('visit', lang)}">${icons.pin}<span>${esc(t(ui.findUs, lang))}</span></a>
        </div>

        <div class="hero__meta hero__fade" style="--i:4">
          <span class="hero__meta-item">${icons.pin}${esc(t(site.contact.addressOneLine, lang))}</span>
          <span class="hero__meta-item">${icons.clock}${esc(t(site.hours.note, lang))}</span>
          <span class="open-pill" data-open-now data-schedule='${JSON.stringify(site.hours.schedule)}'
                data-label-open="${esc(t(ui.openNow, lang))}" data-label-closed="${esc(t(ui.closedNow, lang))}">
            <span class="open-pill__dot"></span><span data-open-label>${esc(t(ui.openNow, lang))}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="hero__scroll" aria-hidden="true">
      <span>${esc(t(ui.scroll, lang))}</span>
      <span class="hero__scroll-line"></span>
    </div>
  </section>

  <div class="marquee" aria-hidden="true">
    <div class="marquee__track"><div class="marquee__group">${marquee}</div></div>
  </div>

  <section class="section">
    <div class="shell">
      <div class="split">
        <div class="split__media">
          ${P.framed('daal', t({ en: 'Daal karahi finished with a garlic tarka', ar: 'دال كراهي بتقلية الثوم' }, lang), { ratio: 'ratio-4-3' })}
          <div class="split__badge" data-reveal="zoom">
            <div>
              <strong>44</strong>
              <span>${esc(lang === 'ar' ? 'طبقاً' : 'Dishes')}</span>
            </div>
          </div>
        </div>
        <div>
          <p class="eyebrow" data-reveal="up">${esc(t(home.intro.eyebrow, lang))}</p>
          <h2 data-reveal="up" style="--rv-delay:80ms;font-weight:300;margin-bottom:1.5rem">${esc(t(home.intro.title, lang))}</h2>
          <div class="prose prose--drop" data-reveal="up" style="--rv-delay:160ms">
            ${home.intro.body[lang].map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('')}
          </div>
          <p style="margin-top:2rem;--rv-delay:240ms" data-reveal="up">
            <a class="btn btn--link" href="${pageUrl('about', lang)}"><span>${esc(lang === 'ar' ? 'اقرأ قصتنا' : 'Read our story')}</span>${icons.arrowRight}</a>
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--tight specials">
    <div class="shell">
      <div class="section__head section__head--center">
        <p class="eyebrow eyebrow--center" data-reveal="up" style="justify-content:center">${esc(lang === 'ar' ? 'مميز' : 'Chef’s specials')}</p>
        <h2 data-reveal="up" style="--rv-delay:80ms;font-weight:300;margin-bottom:1rem">${esc(t(menu.specials.heading, lang))}</h2>
        <p class="lede" data-reveal="up" style="--rv-delay:160ms;margin-inline:auto">${esc(t(menu.specials.blurb, lang))}</p>
      </div>
      <div class="stack-lg">${specials}</div>
    </div>
  </section>

  <section class="section section--pillars">
    <div class="shell">
      <div class="section__head section__head--center">
        <p class="eyebrow eyebrow--center" data-reveal="up" style="justify-content:center">${esc(t(home.pillars.eyebrow, lang))}</p>
        <h2 data-reveal="up" style="--rv-delay:80ms;font-weight:300">${esc(t(home.pillars.title, lang))}</h2>
      </div>
      <div class="grid grid--4" data-stagger>${pillars}</div>
    </div>
  </section>

  <section class="section section--tight section--stats">
    <div class="shell">
      <div class="stats" data-stagger>${stats}</div>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="section__head section__head--center">
        <p class="eyebrow eyebrow--center" data-reveal="up" style="justify-content:center">${esc(t(home.signature.eyebrow, lang))}</p>
        <h2 data-reveal="up" style="--rv-delay:80ms;font-weight:300;margin-bottom:1rem">${esc(t(home.signature.title, lang))}</h2>
        <p class="lede" data-reveal="up" style="--rv-delay:160ms;margin-inline:auto">${esc(t(home.signature.body, lang))}</p>
      </div>
      <div class="grid grid--4" data-stagger>${dishes}</div>
      <p class="text-center" style="margin-top:3rem" data-reveal="up">
        <a class="btn btn--ghost magnetic" href="${pageUrl('menu', lang)}"><span>${esc(t(ui.fullMenu, lang))}</span>${icons.arrowRight}</a>
      </p>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="split split--reverse">
        <div class="split__media">
          ${P.framed('sides', t({ en: 'Raita, salad and a cold drink', ar: 'رايتة وسلطة ومشروب بارد' }, lang), { ratio: 'ratio-4-3' })}
        </div>
        <div>
          <p class="eyebrow" data-reveal="up">${esc(t(home.visit.eyebrow, lang))}</p>
          <h2 data-reveal="up" style="--rv-delay:80ms;font-weight:300;margin-bottom:1.4rem">${esc(t(home.visit.title, lang))}</h2>
          <p class="lede" data-reveal="up" style="--rv-delay:160ms">${esc(t(home.visit.body, lang))}</p>

          <div class="grid grid--2" style="margin-top:2.4rem" data-stagger>
            <div class="info-card" data-reveal="up">
              <div class="info-card__icon">${icons.clock}</div>
              <p class="info-card__label">${esc(lang === 'ar' ? 'أوقات العمل' : 'Hours')}</p>
              <p class="info-card__value small">${site.hours.rows.map(function (r) {
                return esc(t(r.days, lang)) + '<br><span class="muted">' + esc(t(r.time, lang)) + '</span>';
              }).join('<br>')}</p>
            </div>
            <div class="info-card" data-reveal="up">
              <div class="info-card__icon">${icons.whatsapp}</div>
              <p class="info-card__label">${esc(lang === 'ar' ? 'اسألنا' : 'Ask us')}</p>
              <p class="info-card__value"><a href="${waLink(lang)}" target="_blank" rel="noopener" class="ltr">${esc(site.contact.phoneDisplay)}</a></p>
            </div>
          </div>

          <div class="btn-row" style="margin-top:2rem" data-reveal="up">
            <a class="btn btn--gold magnetic" href="${directionsLink()}" target="_blank" rel="noopener">${icons.pin}<span>${esc(t(ui.directions, lang))}</span></a>
            <a class="btn btn--link" href="${pageUrl('visit', lang)}"><span>${esc(lang === 'ar' ? 'كل التفاصيل' : 'All the details')}</span>${icons.arrowRight}</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  ${P.ctaBand(lang)}`;

  return {
    id: 'home',
    heroImage: 'hero',
    title: lang === 'ar'
      ? 'مطعم آل أشفاز — كراهي ومشويات في البطحاء، الرياض'
      : 'Al Ashfaz Restaurant — Karahi, Shinwari & BBQ in Al-Batha, Riyadh',
    description: lang === 'ar'
      ? 'مطعم آل أشفاز في البطحاء بالرياض، مقابل لولو هايبر. كراهي لاهوري وشنواري، مشاوي على الفحم، برياني، ونان طازج من التنور — كل شيء يُطهى عند الطلب.'
      : 'Al Ashfaz Restaurant in Al-Batha, Riyadh, opposite Lulu Hyper. Lahori and Shinwari karahi, charcoal BBQ, biryani and tandoor-fresh naan — everything cooked to order.',
    body: body
  };
};
