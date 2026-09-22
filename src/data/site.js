/* ---------------------------------------------------------------------------
   Al Ashfaz Restaurant — site-wide settings.
   Everything here appears across every page in both languages.
   Edit this file, push, and the site rebuilds itself.
--------------------------------------------------------------------------- */

const site = {
  // The URL the site lives on. Update this after you pick a host/domain so
  // that Google and WhatsApp previews point at the right place.
  url: 'https://jefy381996.github.io/AGC-website',

  // If you deploy to a project page (…github.io/AGC-website) this must stay
  // '/AGC-website'. On a custom domain or Netlify, set it to '' (empty).
  base: '/AGC-website',

  name: { en: 'Al Ashfaz Restaurant', ar: 'مطعم آل أشفاز' },
  shortName: { en: 'Al Ashfaz', ar: 'آل أشفاز' },
  district: { en: 'Batha', ar: 'البطحاء' },

  cuisine: { en: 'Desi · Shinwari · BBQ & More', ar: 'ديسي · شنواري · مشويات والمزيد' },

  taglines: {
    authentic: { en: 'Authentic Taste, Real Flavors', ar: 'مذاق أصيل، نكهات حقيقية' },
    mood: { en: 'Good Food, Good Mood, Always', ar: 'طعام طيب، مزاج طيب، دائماً' },
    people: { en: 'Good Food · Good People · Always', ar: 'طعام طيب · أناس طيبون · دائماً' },
    together: { en: 'Delicious Food Brings People Together', ar: 'الطعام اللذيذ يجمع الناس' }
  },

  contact: {
    // Digits only, international format — used for the WhatsApp link.
    whatsapp: '966564478360',
    phoneDisplay: '0564478360',
    phoneIntl: '+966 56 447 8360',
    phoneHref: '+966564478360',
    email: '',
    address: {
      en: ['Opposite Lulu Hypermarket', 'Al-Batha, Riyadh', 'Kingdom of Saudi Arabia'],
      ar: ['مقابل لولو هايبر ماركت', 'البطحاء، الرياض', 'المملكة العربية السعودية']
    },
    addressOneLine: {
      en: 'Opposite Lulu Hypermarket, Al-Batha, Riyadh, Saudi Arabia',
      ar: 'مقابل لولو هايبر ماركت، البطحاء، الرياض، المملكة العربية السعودية'
    },
    mapsQuery: 'Al+Ashfaz+Restaurant+Al+Batha+Riyadh',
    // Pin used by the embedded map. Replace with your exact coordinates from
    // Google Maps (right-click your shop → copy the two numbers).
    lat: 24.6290,
    lng: 46.7100
  },

  /* ⚠ PLACEHOLDER OPENING HOURS — please confirm and correct these.
     They were not printed on the menu poster. */
  hours: {
    note: { en: 'Open every day', ar: 'مفتوح كل يوم' },
    rows: [
      { days: { en: 'Saturday — Thursday', ar: 'السبت — الخميس' }, time: { en: '11:00 AM — 2:00 AM', ar: '١١:٠٠ ص — ٢:٠٠ ص' } },
      { days: { en: 'Friday', ar: 'الجمعة' }, time: { en: '1:00 PM — 2:00 AM', ar: '١:٠٠ م — ٢:٠٠ ص' } }
    ],
    // 24-hour values for the "open now" indicator, per weekday (0 = Sunday).
    schedule: {
      0: ['11:00', '26:00'], 1: ['11:00', '26:00'], 2: ['11:00', '26:00'],
      3: ['11:00', '26:00'], 4: ['11:00', '26:00'], 5: ['13:00', '26:00'],
      6: ['11:00', '26:00']
    }
  },

  currency: { en: 'SAR', ar: 'ريال' },

  // Set to '' to hide a link from the footer.
  social: {
    instagram: '',
    tiktok: '',
    snapchat: '',
    google: ''
  },

  languages: [
    { code: 'en', label: 'English', short: 'EN', dir: 'ltr', locale: 'en_US' },
    { code: 'ar', label: 'العربية', short: 'ع', dir: 'rtl', locale: 'ar_SA' }
  ],

  pages: [
    { id: 'home',    file: 'index.html',   nav: { en: 'Home',    ar: 'الرئيسية' } },
    { id: 'menu',    file: 'menu.html',    nav: { en: 'Menu',    ar: 'المنيو' } },
    { id: 'about',   file: 'about.html',   nav: { en: 'Our Story', ar: 'قصتنا' } },
    { id: 'gallery', file: 'gallery.html', nav: { en: 'Gallery', ar: 'المعرض' } },
    { id: 'visit',   file: 'visit.html',   nav: { en: 'Visit Us', ar: 'زورونا' } }
  ]
};

module.exports = site;
