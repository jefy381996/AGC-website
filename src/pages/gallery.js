const { ui, gallery } = require('../data/content');
const L = require('../templates/layout');
const P = require('../templates/parts');
const { t, esc, asset, pageUrl, icons } = L;

module.exports = function (lang) {
  const items = gallery.captions.map(function (cap, i) {
    const alt = t(cap.title, lang) + ' — ' + t(cap.body, lang);
    return `
        <div class="gal__item" tabindex="0" role="button"
             data-lightbox
             data-full="${asset('assets/img/food/' + cap.id + '.jpg')}"
             data-alt="${esc(alt)}"
             data-title="${esc(t(cap.title, lang))}"
             data-caption="${esc(t(cap.body, lang))}"
             data-reveal="zoom" style="--i:${i}">
          <div class="frame">
            ${P.picture(cap.id, alt)}
            <span class="frame__ring"></span>
          </div>
          <span class="gal__zoom">${icons.expand}</span>
          <div class="gal__cap">
            <strong>${esc(t(cap.title, lang))}</strong>
            <span>${esc(t(cap.body, lang))}</span>
          </div>
        </div>`;
  }).join('');

  const body = `
  ${P.pageHero(lang, {
    image: 'biryani',
    eyebrow: gallery.hero.eyebrow,
    title: gallery.hero.title,
    lede: gallery.hero.lede
  })}

  <section class="section section--flush-top">
    <div class="shell shell--wide">
      <div class="gal" data-stagger>${items}</div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="shell shell--narrow text-center">
      ${P.rule()}
      <p class="lede" style="margin:2rem auto 2rem">${esc(lang === 'ar'
        ? 'الصور جميلة، لكن الرائحة لا تُصوَّر. تعال وجرّب بنفسك.'
        : 'Photographs are one thing. The smell of it coming off the coals is another. Come and see.')}</p>
      <a class="btn btn--gold magnetic" href="${pageUrl('menu', lang)}"><span>${esc(t(ui.viewMenu, lang))}</span>${icons.arrowRight}</a>
    </div>
  </section>

  ${P.ctaBand(lang)}`;

  const lightbox = `
<div class="lightbox" role="dialog" aria-modal="true" aria-label="${esc(lang === 'ar' ? 'عارض الصور' : 'Photo viewer')}" aria-hidden="true">
  <button class="lightbox__close" type="button" aria-label="${esc(t(ui.close, lang))}">${icons.close}</button>
  <div class="lightbox__stage">
    <button class="lightbox__btn lightbox__btn--prev" type="button" aria-label="${esc(t(ui.prev, lang))}">${icons.chevronLeft}</button>
    <img class="lightbox__img" src="" alt="">
    <button class="lightbox__btn lightbox__btn--next" type="button" aria-label="${esc(t(ui.next, lang))}">${icons.chevronRight}</button>
    <div class="lightbox__cap">
      <strong class="lightbox__title"></strong>
      <span class="lightbox__caption"></span>
    </div>
  </div>
</div>`;

  return {
    id: 'gallery',
    heroImage: 'biryani',
    title: lang === 'ar'
      ? 'المعرض — مطعم آل أشفاز، البطحاء، الرياض'
      : 'Gallery — Al Ashfaz Restaurant, Al-Batha, Riyadh',
    description: lang === 'ar'
      ? 'صور من مطبخ مطعم آل أشفاز في البطحاء: الكراهي والمشاوي والبرياني والنان الطازج من التنور.'
      : 'Photographs from the Al Ashfaz kitchen in Al-Batha: karahi, charcoal BBQ, biryani and tandoor-fresh naan.',
    body: body,
    extra: lightbox
  };
};
