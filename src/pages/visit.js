const site = require('../data/site');
const { ui, visit } = require('../data/content');
const L = require('../templates/layout');
const P = require('../templates/parts');
const { t, esc, pageUrl, waLink, mapsLink, directionsLink, icons } = L;

module.exports = function (lang) {
  const steps = visit.finding.steps[lang].map(function (s) {
    return `<li class="step" data-reveal="up"><p>${esc(s)}</p></li>`;
  }).join('');

  const faqs = visit.faq.items.map(function (item, i) {
    return `
          <div class="acc${i === 0 ? ' is-open' : ''}">
            <button class="acc__btn" type="button" aria-expanded="${i === 0}" aria-controls="faq-${i}">
              <span>${esc(t(item.q, lang))}</span>
              <span class="acc__icon" aria-hidden="true"></span>
            </button>
            <div class="acc__panel" id="faq-${i}" aria-hidden="${i !== 0}">
              <div><p>${esc(t(item.a, lang))}</p></div>
            </div>
          </div>`;
  }).join('');

  const hours = site.hours.rows.map(function (r) {
    return `<div class="hours-row"><dt>${esc(t(r.days, lang))}</dt><dd>${esc(t(r.time, lang))}</dd></div>`;
  }).join('');

  /* Structured FAQ data so these questions can surface directly in Google. */
  const faqLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: visit.faq.items.map(function (item) {
      return {
        '@type': 'Question',
        name: t(item.q, lang),
        acceptedAnswer: { '@type': 'Answer', text: t(item.a, lang) }
      };
    })
  });

  const mapSrc = 'https://www.google.com/maps?q=' + encodeURIComponent(site.contact.mapsQuery.replace(/\+/g, ' ')) +
    '&hl=' + (lang === 'ar' ? 'ar' : 'en') + '&z=16&output=embed';

  const body = `
  ${P.pageHero(lang, {
    image: 'storefront',
    eyebrow: visit.hero.eyebrow,
    title: visit.hero.title,
    lede: visit.hero.lede
  })}

  <section class="section section--flush-top">
    <div class="shell">
      <div class="visit-grid">
        <div class="stack-lg">
          <div class="info-card" data-reveal="up">
            <div class="info-card__icon">${icons.pin}</div>
            <p class="info-card__label">${esc(lang === 'ar' ? 'العنوان' : 'Address')}</p>
            <p class="info-card__value">${site.contact.address[lang].map(esc).join('<br>')}</p>
            <p style="margin-top:1rem">
              <a class="btn btn--link" href="${mapsLink()}" target="_blank" rel="noopener"><span>${esc(lang === 'ar' ? 'افتح في خرائط جوجل' : 'Open in Google Maps')}</span>${icons.arrowRight}</a>
            </p>
          </div>

          <div class="info-card" data-reveal="up">
            <div class="info-card__icon">${icons.clock}</div>
            <p class="info-card__label">${esc(lang === 'ar' ? 'أوقات العمل' : 'Opening Hours')}</p>
            <dl style="margin-top:.4rem">${hours}</dl>
            <p style="margin-top:1rem">
              <span class="open-pill" data-open-now data-schedule='${JSON.stringify(site.hours.schedule)}'
                    data-label-open="${esc(t(ui.openNow, lang))}" data-label-closed="${esc(t(ui.closedNow, lang))}">
                <span class="open-pill__dot"></span><span data-open-label>${esc(t(ui.openNow, lang))}</span>
              </span>
            </p>
          </div>

          <div class="info-card" data-reveal="up">
            <div class="info-card__icon">${icons.whatsapp}</div>
            <p class="info-card__label">${esc(lang === 'ar' ? 'تواصل معنا' : 'Talk to us')}</p>
            <p class="info-card__value">
              <a href="${waLink(lang)}" target="_blank" rel="noopener" class="ltr">${esc(site.contact.phoneDisplay)}</a><br>
              <a href="tel:${site.contact.phoneHref}" class="small muted ltr">${esc(site.contact.phoneIntl)}</a>
            </p>
            <p class="tiny muted" style="margin-top:.8rem">${esc(lang === 'ar'
              ? 'للاستفسارات فقط — لا نستقبل الطلبات أو الحجوزات عبر الواتساب.'
              : 'Questions only — we do not take orders or bookings over WhatsApp.')}</p>
          </div>

          <div class="info-card" data-reveal="up">
            <div class="info-card__icon">${icons.wallet}</div>
            <p class="info-card__label">${esc(lang === 'ar' ? 'الدفع' : 'Payment')}</p>
            <p class="info-card__value small">${esc(lang === 'ar' ? 'نقداً وبطاقة مدى' : 'Cash and mada')}</p>
          </div>
        </div>

        <div class="stack-lg">
          <div class="map-frame" data-reveal="zoom">
            <iframe
              src="${mapSrc}"
              title="${esc(lang === 'ar' ? 'موقع مطعم آل أشفاز على الخريطة' : 'Map showing Al Ashfaz Restaurant')}"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen></iframe>
            <div class="map-frame__tag">
              <strong>${esc(t(site.name, lang))}</strong>
              ${esc(t(site.contact.addressOneLine, lang))}
            </div>
          </div>

          <div class="btn-row" data-reveal="up">
            <a class="btn btn--gold magnetic" href="${directionsLink()}" target="_blank" rel="noopener">${icons.pin}<span>${esc(t(ui.directions, lang))}</span></a>
            <a class="btn btn--wa magnetic" href="${waLink(lang)}" target="_blank" rel="noopener">${icons.whatsapp}<span>${esc(t(ui.whatsapp, lang))}</span></a>
          </div>

          <div data-reveal="up">
            <h2 class="t-xl" style="font-weight:300;margin-bottom:1.6rem">${esc(t(visit.finding.title, lang))}</h2>
            <ol class="steps">${steps}</ol>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="shell shell--narrow">
      <div class="section__head section__head--center">
        <p class="eyebrow eyebrow--center" data-reveal="up" style="justify-content:center">${esc(lang === 'ar' ? 'أسئلة شائعة' : 'Good to know')}</p>
        <h2 data-reveal="up" style="--rv-delay:70ms;font-weight:300">${esc(t(visit.faq.title, lang))}</h2>
      </div>
      <div class="accordion" data-accordion="single" data-reveal="up">${faqs}</div>
    </div>
  </section>

  ${P.ctaBand(lang, {
    title: { en: 'We are open — come over', ar: 'نحن مفتوحون — تفضّل بالزيارة' },
    body: {
      en: 'Opposite Lulu Hypermarket in Al-Batha. Find a table, and tell us what you want cooked.',
      ar: 'مقابل لولو هايبر ماركت في البطحاء. اختر طاولة، وأخبرنا بما تريد أن نطهوه.'
    }
  })}

  <script type="application/ld+json">${faqLd}</script>`;

  return {
    id: 'visit',
    heroImage: 'naan',
    title: lang === 'ar'
      ? 'زورونا — مطعم آل أشفاز، مقابل لولو، البطحاء، الرياض'
      : 'Visit Us — Al Ashfaz Restaurant, Opposite Lulu, Al-Batha, Riyadh',
    description: lang === 'ar'
      ? 'الموقع وأوقات العمل وطريقة الوصول إلى مطعم آل أشفاز في البطحاء، مقابل لولو هايبر ماركت. بدون حجوزات وبدون توصيل.'
      : 'Location, opening hours and directions to Al Ashfaz Restaurant in Al-Batha, opposite Lulu Hypermarket. No bookings, no delivery.',
    body: body
  };
};
