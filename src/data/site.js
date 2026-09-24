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
      en: ['Opposite Lulu Hyper', 'Al-Batha, Riyadh'],
      ar: ['مقابل لولو هايبر', 'البطحاء، الرياض']
    },
    addressOneLine: {
      en: 'Opposite Lulu Hyper, Al-Batha, Riyadh',
      ar: 'مقابل لولو هايبر، البطحاء، الرياض'
    },
    mapsQuery: 'Al+Ashfaz+Restaurant+Al+Batha+Riyadh',
    // Pin used by the embedded map. Replace with your exact coordinates from
    // Google Maps (right-click your shop → copy the two numbers).
    lat: 24.6290,
    lng: 46.7100
  },

  hours: {
    note: { en: 'Open every day', ar: 'مفتوح كل يوم' },
    rows: [
      { days: { en: 'Every day', ar: 'كل يوم' }, time: { en: '7:00 AM — 2:00 AM', ar: '٧:٠٠ ص — ٢:٠٠ ص' } }
    ],
    // 24-hour values for the "open now" indicator, per weekday (0 = Sunday).
    // A closing time past midnight would be written as e.g. '26:00' for 2 AM.
    schedule: {
      0: ['07:00', '26:00'], 1: ['07:00', '26:00'], 2: ['07:00', '26:00'],
      3: ['07:00', '26:00'], 4: ['07:00', '26:00'], 5: ['07:00', '26:00'],
      6: ['07:00', '26:00']
    }
  },

  currency: { en: 'SAR', ar: 'ريال' },

  // Set to '' to hide a link from the footer. Paste the clean profile URL —
  // a link copied from the app's share sheet carries tracking parameters
  // (?_t=, ?_r=, ?igsh=) that tie back to your own session, and those have
  // no business on a public page.
  social: {
    tiktok: 'https://www.tiktok.com/@ashfaz4',
    instagram: '',
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
