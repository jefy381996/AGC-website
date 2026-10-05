/* ---------------------------------------------------------------------------
   Al Ashfaz Restaurant — site-wide settings.
   Everything here appears across every page in both languages.
   Edit this file, push, and the site rebuilds itself.
--------------------------------------------------------------------------- */

/* --- Build-time host overrides ---------------------------------------------
   Forgiving on purpose: these get typed into a hosting dashboard by hand, so
   a trailing slash or a stray space should not produce a broken site. */

function cleanUrl(value) {
  if (!value) return '';
  return String(value).trim().replace(/\/+$/, '');
}

function cleanBase(value) {
  /* Unset means the root, because that is what every host does except
     GitHub project pages — and GitHub is the one host whose build we
     control, so .github/workflows/deploy.yml sets SITE_BASE itself.

     This way round on purpose: a new host that knows nothing about this
     setting gets a working site, rather than one whose stylesheets all
     404 because they were looking inside a subfolder that only exists on
     GitHub. */
  if (value === undefined || value === null) return '';
  var v = String(value).trim();
  // Every spelling of "the site is at the root".
  if (v === '' || v === '/' || v.toLowerCase() === 'root' || v.toLowerCase() === 'none') return '';
  if (v.charAt(0) !== '/') v = '/' + v;
  return v.replace(/\/+$/, '');
}

const site = {
  /* --- Where the site lives ------------------------------------------------
     Both of these can be overridden by environment variables at build time,
     so one repository can serve two hosts at once. That matters during a
     move: GitHub Pages keeps working from its /AGC-website/ subfolder while
     Cloudflare builds the same commit at the root of its own domain, and
     nothing is broken while you compare them.

       SITE_URL   the full address, e.g. https://al-ashfaz.pages.dev
       SITE_BASE  the subfolder. Leave it unset and the site is built for
                  the root of a domain, which is what every host except
                  GitHub project pages needs. The GitHub workflow sets it.

     Keep these two agreeing: SITE_URL must END IN whatever SITE_BASE says,
     because absUrl() in the layout joins them on that assumption. The build
     checks it and says so in the log if they drift apart.

     The default below is the real address, so a host that configures
     nothing produces a correct site. GitHub Pages is the exception and
     overrides both in .github/workflows/deploy.yml. */
  url: cleanUrl(process.env.SITE_URL) || 'https://alashfazrestaurant.com',
  base: cleanBase(process.env.SITE_BASE),

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

  /* --- Ordering ----------------------------------------------------------
     The three settings below are the only ones you need to touch to switch
     the extras on. All of them are safe to leave empty: the site works
     exactly as it does now, orders still reach WhatsApp, and nothing is sent
     anywhere else. SETUP.md walks through filling each one in. */
  ordering: {
    // Paste the Google Apps Script web-app URL here and every order is also
    // written as a row in your spreadsheet. Empty = no order log, WhatsApp
    // only. See SETUP.md step 2 and tools/order-log.gs.
    logUrl: '',

    // Orders at or above this total (in riyals) show a line telling the
    // customer you will ring to confirm before cooking. Set to 0 to never
    // show it. Delivery orders always show it, whatever the total.
    confirmCallOver: 150,

    // How long after the page settles the "Ordering is easy" card appears,
    // in milliseconds. Long enough that it does not ambush someone who has
    // only just arrived, short enough that they are still on the page to
    // read it. 4 seconds. Set to 0 to switch the card off entirely.
    welcomeDelay: 4000
  },

  /* --- How the site opens -------------------------------------------------
     Reopening a browser restores the tab it was on, so someone whose last
     visit ended on the menu comes back to the menu. With this on, a page
     reopened that way hands them to the home page instead, so every visit
     starts in the same place.

     It acts only on a reload, which is how a browser restores a tab. Someone
     arriving from a Google result or a shared WhatsApp link still lands
     exactly where they meant to, and the back button is untouched. Set it to
     false to leave people wherever they were. */
  openFresh: true,

  /* --- Analytics ----------------------------------------------------------
     Empty means no tracking script is put on the page at all — not a
     disabled one, none. Fill it in and one cookieless script is added. */
  analytics: {
    // Cloudflare Web Analytics token. SETUP.md step 4.
    cloudflareToken: ''
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
