const { ui, notFound } = require('../data/content');
const L = require('../templates/layout');
const { t, esc, pageUrl, icons } = L;

module.exports = function (lang) {
  const body = `
  <section class="nf">
    <div class="shell shell--narrow">
      <p class="nf__code" data-reveal="zoom">404</p>
      <p class="eyebrow eyebrow--center" data-reveal="up" style="justify-content:center">${esc(t(notFound.eyebrow, lang))}</p>
      <h1 class="t-2xl" data-reveal="up" style="--rv-delay:70ms;font-weight:300;margin-bottom:1.2rem">${esc(t(notFound.title, lang))}</h1>
      <p class="lede" data-reveal="up" style="--rv-delay:140ms;margin-inline:auto">${esc(t(notFound.lede, lang))}</p>
      <div class="btn-row" style="justify-content:center;margin-top:2.5rem" data-reveal="up" >
        <a class="btn btn--gold magnetic" href="${pageUrl('menu', lang)}"><span>${esc(t(ui.viewMenu, lang))}</span>${icons.arrowRight}</a>
        <a class="btn btn--ghost magnetic" href="${pageUrl('home', lang)}"><span>${esc(lang === 'ar' ? 'الصفحة الرئيسية' : 'Back home')}</span></a>
      </div>
    </div>
  </section>`;

  return {
    id: 'notfound',
    heroImage: 'hero',
    title: lang === 'ar' ? 'الصفحة غير موجودة — مطعم آل أشفاز' : 'Page not found — Al Ashfaz Restaurant',
    description: lang === 'ar' ? 'الصفحة المطلوبة غير موجودة.' : 'The page you were looking for does not exist.',
    body: body,
    noindex: true
  };
};
