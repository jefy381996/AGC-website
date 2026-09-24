const site = require('../data/site');
const { ui, about } = require('../data/content');
const L = require('../templates/layout');
const P = require('../templates/parts');
const { t, esc, pageUrl, icons } = L;

function heat(level, lang) {
  let dots = '';
  for (let i = 1; i <= 5; i++) dots += `<i class="${i <= level ? 'on' : ''}"></i>`;
  return `<span class="heat" role="img" aria-label="${esc(lang === 'ar' ? 'درجة الحرارة ' + level + ' من ٥' : 'Heat level ' + level + ' of 5')}">${dots}</span>`;
}

module.exports = function (lang) {
  const styleSlots = ['karahi-lahori', 'karahi-shinwari', 'karahi-white', 'karahi-chatkhara'];

  // These four read as a set, so they are all-or-nothing: until every style
  // has been shot, they all stay text-only. Three photographs and one gap
  // looks like a bug, and a fallback photo would show the wrong karahi.
  const allShot = styleSlots.every(function (slot) { return P.hasPhoto(slot); });

  const styles = about.styles.items.map(function (s, i) {
    const photo = allShot
      ? P.framed(styleSlots[i], t(s.name, lang), { ratio: 'ratio-3-2', reveal: false })
      : '';
    return `
          <article class="card${photo ? '' : ' card--type'}" data-reveal="up" style="--i:${i}">
            ${photo}
            <div class="card__body">
              <div class="dish__head">
                <h3 class="card__title" style="margin:0">${esc(t(s.name, lang))}</h3>
                ${heat(s.heat, lang)}
              </div>
              <p class="card__text">${esc(t(s.body, lang))}</p>
            </div>
          </article>`;
  }).join('');

  const yesList = about.values.yes.items[lang].map(function (v) {
    return `<li style="display:flex;gap:.85rem;align-items:flex-start;padding-block:.62rem;border-block-end:1px solid var(--line-soft)">
              <span style="color:var(--leaf);width:17px;flex:none;margin-top:.28rem">${icons.check}</span>
              <span class="small">${esc(v)}</span>
            </li>`;
  }).join('');

  const noList = about.values.no.items[lang].map(function (v) {
    return `<li style="display:flex;gap:.85rem;align-items:flex-start;padding-block:.62rem;border-block-end:1px solid var(--line-soft)">
              <span style="color:var(--ember-soft);width:17px;flex:none;margin-top:.28rem">${icons.cross}</span>
              <span class="small muted">${esc(v)}</span>
            </li>`;
  }).join('');

  const body = `
  ${P.pageHero(lang, {
    image: 'bbq',
    eyebrow: about.hero.eyebrow,
    title: about.hero.title,
    lede: about.hero.lede
  })}

  <section class="section">
    <div class="shell">
      <div class="split">
        <div class="split__media">
          ${P.framed('interior', t({ en: 'The dining room at Al Ashfaz', ar: 'صالة الطعام في مطعم آل أشفاز' }, lang), { ratio: 'ratio-3-2' })}
        </div>
        <div>
          <p class="eyebrow" data-reveal="up">${esc(lang === 'ar' ? 'البداية' : 'The beginning')}</p>
          <h2 data-reveal="up" style="--rv-delay:70ms;font-weight:300;margin-bottom:1.6rem">${esc(t(about.story.title, lang))}</h2>
          <div class="prose prose--drop" data-reveal="up" style="--rv-delay:140ms">
            ${about.story.body[lang].map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="shell">${P.rule()}</div>
  </section>

  <section class="section section--flush-top">
    <div class="shell">
      <div class="section__head section__head--center">
        <p class="eyebrow eyebrow--center" data-reveal="up" style="justify-content:center">${esc(t(about.styles.eyebrow, lang))}</p>
        <h2 data-reveal="up" style="--rv-delay:70ms;font-weight:300;margin-bottom:1rem">${esc(t(about.styles.title, lang))}</h2>
        <p class="lede" data-reveal="up" style="--rv-delay:140ms;margin-inline:auto">${esc(t(about.styles.body, lang))}</p>
      </div>
      <div class="grid grid--4" data-stagger>${styles}</div>
      <p class="text-center" style="margin-top:3rem" data-reveal="up">
        <a class="btn btn--ghost magnetic" href="${pageUrl('menu', lang)}#karahi"><span>${esc(lang === 'ar' ? 'أسعار الكراهي' : 'See karahi prices')}</span>${icons.arrowRight}</a>
      </p>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="section__head section__head--center">
        <p class="eyebrow eyebrow--center" data-reveal="up" style="justify-content:center">${esc(t(about.values.eyebrow, lang))}</p>
        <h2 data-reveal="up" style="--rv-delay:70ms;font-weight:300">${esc(t(about.values.title, lang))}</h2>
      </div>
      <div class="grid grid--2">
        <div class="info-card" data-reveal="left">
          <div class="info-card__icon" style="color:var(--leaf);border-color:rgba(127,176,105,.4)">${icons.leaf}</div>
          <p class="info-card__label">${esc(t(about.values.yes.title, lang))}</p>
          <ul style="margin-top:.6rem">${yesList}</ul>
        </div>
        <div class="info-card" data-reveal="right">
          <div class="info-card__icon" style="color:var(--ember-soft);border-color:rgba(216,82,63,.4)">${icons.cross}</div>
          <p class="info-card__label" style="color:var(--ember-soft)">${esc(t(about.values.no.title, lang))}</p>
          <ul style="margin-top:.6rem">${noList}</ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="shell shell--narrow text-center">
      <p class="script" data-reveal="up">${esc(t(site.taglines.mood, lang))}</p>
      <p class="lede" style="margin:1rem auto 0" data-reveal="up">${esc(lang === 'ar'
        ? 'هذا كل ما في الأمر. لا أكثر ولا أقل.'
        : 'That is the whole of it. Nothing more, nothing less.')}</p>
    </div>
  </section>

  ${P.ctaBand(lang)}`;

  return {
    id: 'about',
    heroImage: 'bbq',
    title: lang === 'ar'
      ? 'قصتنا — مطعم آل أشفاز، البطحاء، الرياض'
      : 'Our Story — Al Ashfaz Restaurant, Al-Batha, Riyadh',
    description: lang === 'ar'
      ? 'من لاهور وبيشاور إلى البطحاء: كيف نطبخ في مطعم آل أشفاز، والفرق بين الكراهي اللاهوري والشنواري والبيضاء والتشاتخارا.'
      : 'Why Al Ashfaz opened in Al-Batha, how we cook, and what actually separates Lahori, Shinwari, White and Chatkhara karahi.',
    body: body
  };
};
