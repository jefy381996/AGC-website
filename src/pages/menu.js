const site = require('../data/site');
const menu = require('../data/menu');
const { ui, menuPage } = require('../data/content');
const L = require('../templates/layout');
const P = require('../templates/parts');
const { t, esc, asset, pageUrl, icons } = L;

/* Every searchable word for one row, in both languages, so switching
   language never breaks search and Arabic users can type Latin names. */
function haystack(item, section, group) {
  return [
    t(item.name, 'en'), t(item.name, 'ar'),
    item.desc ? t(item.desc, 'en') : '', item.desc ? t(item.desc, 'ar') : '',
    t(section.title, 'en'), t(section.title, 'ar'),
    group ? t(group.name, 'en') : '', group ? t(group.name, 'ar') : ''
  ].join(' ');
}

function row(item, section, group, lang) {
  const cols = section.columns;
  const cls = cols ? 'mrow mrow--3' : 'mrow mrow--1';
  const badge = item.badge
    ? ` <span class="badge${/spicy|حار/i.test(t(item.badge, 'en')) ? ' badge--hot' : ''}${/mild|غير حار/i.test(t(item.badge, 'en')) ? ' badge--mild' : ''}">${esc(t(item.badge, lang))}</span>`
    : '';

  let prices;
  if (cols) {
    prices = cols.map(function (c) {
      return `<div class="mrow__price" data-label="${esc(t(c.label, lang))}">${item.prices[c.key]}</div>`;
    }).join('');
  } else {
    const unit = section.unit ? `<em>${esc(t(section.unit, lang))}</em>` : '';
    prices = `<div class="mrow__price">${item.price}${unit}</div>`;
  }

  return `
          <div class="${cls}" data-cat="${section.id}" data-search="${esc(haystack(item, section, group))}">
            <div class="mrow__name">
              <span class="mrow__label">${esc(t(item.name, lang))}</span>${badge}
              ${item.desc ? `<span class="mrow__desc">${esc(t(item.desc, lang))}</span>` : ''}
            </div>
            ${prices}
          </div>`;
}

function tableHead(section, lang) {
  if (!section.columns) return '';
  return `
          <div class="mtable__head mrow--3">
            <span>${esc(lang === 'ar' ? 'الصنف' : 'Item')}</span>
            ${section.columns.map(function (c) { return `<span>${esc(t(c.label, lang))}</span>`; }).join('')}
          </div>`;
}

function sectionBlock(section, lang, index) {
  const groups = section.groups
    ? section.groups.map(function (g) {
        return `
        <div class="msub">
          <div class="msub__head">
            <h3 class="msub__name">${esc(t(g.name, lang))}</h3>
            ${g.badge ? `<span class="badge">${esc(t(g.badge, lang))}</span>` : ''}
          </div>
          ${g.desc ? `<p class="msub__desc">${esc(t(g.desc, lang))}</p>` : ''}
          ${tableHead(section, lang)}
          ${g.items.map(function (i) { return row(i, section, g, lang); }).join('')}
        </div>`;
      }).join('')
    : `${tableHead(section, lang)}${section.items.map(function (i) { return row(i, section, null, lang); }).join('')}`;

  return `
      <section class="mgroup" id="${section.id}">
        <div class="mgroup__media">
          ${P.framed(section.image, t(section.title, lang), { ratio: false, reveal: 'wipe' })}
        </div>
        <div class="mgroup__head">
          <div>
            <p class="mgroup__sub" data-reveal="up">${esc(t(section.subtitle, lang))}</p>
            <h2 class="mgroup__title" data-reveal="up" style="--rv-delay:70ms">${esc(t(section.title, lang))}</h2>
          </div>
          ${section.note ? `<p class="mgroup__note" data-reveal="up" style="--rv-delay:140ms">${esc(t(section.note, lang))}</p>` : ''}
        </div>
        <div class="mtable" data-reveal="up" style="--rv-delay:180ms">${groups}</div>
      </section>`;
}

module.exports = function (lang) {
  const chips = [{ id: 'all', label: ui.all }].concat(
    menu.sections.map(function (s) { return { id: s.id, label: s.title }; })
  ).map(function (c, i) {
    return `<button class="chip${i === 0 ? ' is-active' : ''}" type="button" data-filter="${c.id}" aria-pressed="${i === 0}">${esc(t(c.label, lang))}</button>`;
  }).join('');

  const specials = menu.specials.items.map(function (item, i) {
    return `
        <article class="special${i % 2 ? ' special--flip' : ''}" data-reveal="${i % 2 ? 'right' : 'left'}">
          <div class="special__media">${P.picture(item.image, t(item.name, lang))}</div>
          <div class="special__body">
            <span class="badge">${esc(lang === 'ar' ? 'يومياً' : 'Daily')}</span>
            <h3 class="special__name">${esc(t(item.name, lang))}</h3>
            <p class="special__price">${item.price}<small>${esc(t(ui.sar, lang))}</small></p>
            <p class="special__desc">${esc(t(item.desc, lang))}</p>
          </div>
        </article>`;
  }).join('');

  const body = `
  ${P.pageHero(lang, {
    image: 'karahi',
    eyebrow: menuPage.hero.eyebrow,
    title: menuPage.hero.title,
    lede: menuPage.hero.lede
  })}

  <section class="section section--tight section--flush-top">
    <div class="shell">
      <div class="section__head section__head--center" style="margin-bottom:2.5rem">
        <p class="eyebrow eyebrow--center" data-reveal="up" style="justify-content:center">${esc(lang === 'ar' ? 'مميز' : 'Chef’s specials')}</p>
        <h2 class="t-xl" data-reveal="up" style="--rv-delay:70ms;font-weight:300">${esc(t(menu.specials.heading, lang))}</h2>
      </div>
      <div class="stack-lg">${specials}</div>
    </div>
  </section>

  <div data-menu>
    <div class="menu-tools">
      <div class="shell menu-tools__inner">
        <div class="menu-search">
          <span class="menu-search__icon">${icons.search}</span>
          <label class="sr-only" for="menu-q">${esc(t(ui.search, lang))}</label>
          <input id="menu-q" type="search" autocomplete="off" placeholder="${esc(t(ui.searchPlaceholder, lang))}">
          <button class="menu-search__clear" type="button" aria-label="${esc(t(ui.clear, lang))}">${icons.close}</button>
        </div>
        <div class="chips" role="group" aria-label="${esc(lang === 'ar' ? 'تصفية حسب القسم' : 'Filter by section')}">${chips}</div>
      </div>
    </div>

    <div class="shell">
      ${menu.sections.map(function (s, i) { return sectionBlock(s, lang, i); }).join('')}

      <p class="mempty" hidden>${esc(t(ui.noResults, lang))}</p>
      <p class="mnote">${esc(t(ui.priceNote, lang))}</p>

      <div class="poster-cta" style="margin-top:3rem" data-reveal="up">
        <a class="poster-cta__thumb" href="${asset('assets/img/brand/menu-poster.jpg')}" target="_blank" rel="noopener"
           aria-hidden="true" tabindex="-1">
          <img src="${asset('assets/img/brand/menu-poster.jpg')}" alt="" loading="lazy" decoding="async">
        </a>
        <div>
          <h3 class="card__title" style="font-size:var(--t-md);margin-bottom:.25rem">${esc(t(menuPage.posterCta.title, lang))}</h3>
          <p class="card__text">${esc(t(menuPage.posterCta.body, lang))}</p>
        </div>
        <a class="btn btn--ghost magnetic" href="${asset('assets/img/brand/menu-poster.jpg')}" target="_blank" rel="noopener">
          <span>${esc(t(menuPage.posterCta.action, lang))}</span>${icons.expand}
        </a>
      </div>
    </div>
  </div>

  ${P.ctaBand(lang)}`;

  return {
    id: 'menu',
    heroImage: 'karahi',
    title: lang === 'ar'
      ? 'المنيو والأسعار — مطعم آل أشفاز، البطحاء'
      : 'Menu & Prices — Al Ashfaz Restaurant, Al-Batha',
    description: lang === 'ar'
      ? 'المنيو الكامل بالأسعار: كراهي لاهوري وشنواري وبيضاء وتشاتخارا، مشاوي على الفحم، دال وخضار، برياني وبلاو، ونان وروتي — من ريال واحد.'
      : 'The full menu with prices: Lahori, Shinwari, White and Chatkhara karahi, charcoal BBQ, daal and vegetable dishes, biryani and pulao, naan and roti — from 1 SAR.',
    body: body
  };
};
