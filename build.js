#!/usr/bin/env node
/* ---------------------------------------------------------------------------
   Al Ashfaz Restaurant — static site builder.

     node build.js          build into dist/
     node build.js --serve  build, then serve dist/ at http://localhost:4173

   No dependencies. Reads src/, writes dist/. Nothing in dist/ is ever
   hand-edited; change src/data/*.js and rebuild.
--------------------------------------------------------------------------- */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'dist');

const site = require('./src/data/site');
const L = require('./src/templates/layout');
const layout = L.layout;

const pages = {
  home: require('./src/pages/home'),
  menu: require('./src/pages/menu'),
  about: require('./src/pages/about'),
  gallery: require('./src/pages/gallery'),
  visit: require('./src/pages/visit'),
  notfound: require('./src/pages/notfound')
};

/* --- fs helpers --------------------------------------------------------- */

function rimraf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function write(rel, contents) {
  const dest = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, contents);
  return Buffer.byteLength(contents);
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  let count = 0;
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, entry.name);
    const b = path.join(to, entry.name);
    if (entry.isDirectory()) count += copyDir(a, b);
    else { fs.copyFileSync(a, b); count++; }
  }
  return count;
}

function concat(dir, ext) {
  return fs.readdirSync(dir)
    .filter(function (f) { return f.endsWith(ext); })
    .sort()
    .map(function (f) {
      return '/* ---- ' + f + ' ---- */\n' + fs.readFileSync(path.join(dir, f), 'utf8');
    })
    .join('\n\n');
}

/* A short content hash, so a changed bundle gets a new filename and no
   browser can serve a stale one after a deploy. */
function fingerprint(contents) {
  return crypto.createHash('sha1').update(contents).digest('hex').slice(0, 8);
}

/* Conservative CSS minify: drop comments and squeeze whitespace. Nothing
   clever, so it cannot mangle a data: URI or a content string. */
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*\n\s*/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s*([{};,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

/* Selectors the site visibly depends on. A scripted edit to the stylesheets
   can delete a whole rule block without any build error — it has happened
   twice, once taking the language switch with it — and the result only shows
   up by eye. Cheap insurance. */
const REQUIRED_CSS = [
  '.lang-switch', '.lang-switch a.is-active', '.burger', '.drawer',
  '.header', '.hero', '.hero__bg', '.hero__veil', '.marquee',
  '.mrow', '.mtable__head', '.chip', '.menu-tools',
  '.gal__item', '.lightbox', '.acc__btn', '.social-link',
  '.footer', '.btn--gold', '.card', '.frame', '.open-pill',
  // Ordering. [hidden] in particular: without it the basket bar and the
  // quantity badges set their own display and ignore being hidden, which
  // puts an empty bar and a green dot on every price.
  '[hidden]', '.obar', '.obar__btn', '.opanel', '.opanel__sheet',
  '.opanel__scroll', '.oline', '.ostep', '.oform', '.ofield__input',
  '.mrow__price--add', '.mrow__qty'
];

function checkCss(css) {
  const missing = REQUIRED_CSS.filter(function (sel) {
    // match the selector followed by a combinator, comma or the rule's brace
    return !new RegExp(sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s,:>{\\[]').test(css);
  });
  if (missing.length) {
    console.error('\n  BUILD FAILED — these rules are missing from the stylesheet:');
    missing.forEach(function (m) { console.error('    ' + m); });
    console.error('  A stylesheet edit probably removed more than it meant to.\n');
    process.exit(1);
  }
}

/* Two dishes sharing a slug would share a basket line, so one would silently
   become the other. Cheap to check, impossible to spot by eye. */
function checkOrder() {
  const dupes = require('./src/data/order').duplicates();
  if (dupes.length) {
    console.error('\n  BUILD FAILED — these order ids are not unique:');
    dupes.forEach(function (d) { console.error('    ' + d); });
    console.error('  Two menu items slug to the same id; rename one.\n');
    process.exit(1);
  }
}

function fmt(bytes) {
  return bytes > 1024 ? (bytes / 1024).toFixed(1) + ' kB' : bytes + ' B';
}

/* --- build -------------------------------------------------------------- */

function build() {
  const started = Date.now();
  rimraf(OUT);
  fs.mkdirSync(OUT, { recursive: true });

  console.log('\n  Al Ashfaz — building\n');

  /* Styles and scripts, bundled into one file each. */
  const css = minifyCss(concat(path.join(SRC, 'static/assets/css'), '.css'));
  checkCss(css);
  checkOrder();
  const cssOut = '/*! Al Ashfaz Restaurant — Al-Batha, Riyadh */\n' + css;

  const js = concat(path.join(SRC, 'static/assets/js'), '.js');
  const jsOut = '/*! Al Ashfaz Restaurant */\n(function () {\n"use strict";\n' + js + '\n})();\n';

  // Name each bundle after its contents and tell the layout what to link to,
  // before any page is rendered.
  L.bundles.css = 'assets/css/styles.' + fingerprint(cssOut) + '.css';
  L.bundles.js = 'assets/js/app.' + fingerprint(jsOut) + '.js';

  const cssBytes = write(L.bundles.css, cssOut);
  const jsBytes = write(L.bundles.js, jsOut);

  console.log('    ' + L.bundles.css.padEnd(34) + fmt(cssBytes));
  console.log('    ' + L.bundles.js.padEnd(34) + fmt(jsBytes));

  /* Everything under src/static except the css/js we just bundled. */
  /* Report which photo slots are real and which are still placeholders. */
  const slots = require('./src/data/images');
  const parts = require('./src/templates/parts');
  const placeholders = Object.keys(slots).filter(function (k) { return !parts.hasPhoto(k); });

  const imgCount = copyDir(
    path.join(SRC, 'static/assets/img'),
    path.join(OUT, 'assets/img')
  );
  const fontCount = copyDir(
    path.join(SRC, 'static/assets/fonts'),
    path.join(OUT, 'assets/fonts')
  );

  /* Anything dropped straight into src/static/ is copied to the site root —
     that is where a CNAME file for a custom domain belongs, for instance. */
  const staticRoot = path.join(SRC, 'static');
  const loose = fs.readdirSync(staticRoot, { withFileTypes: true })
    .filter(function (e) { return e.isFile(); });
  loose.forEach(function (e) {
    fs.copyFileSync(path.join(staticRoot, e.name), path.join(OUT, e.name));
  });
  console.log('    assets/img/             ' + imgCount + ' files');
  console.log('    assets/fonts/           ' + fontCount + ' files');
  if (loose.length) {
    console.log('    (root)                  ' + loose.map(function (e) { return e.name; }).join(', '));
  }

  /* Pages, in both languages. */
  const built = [];

  for (const lang of ['en', 'ar']) {
    for (const def of site.pages) {
      const page = pages[def.id](lang);
      const html = layout(Object.assign({ lang: lang }, page));
      const rel = (lang === 'en' ? '' : 'ar/') + def.file;
      built.push([rel, write(rel, html)]);
    }

    const nf = pages.notfound(lang);
    const nfRel = (lang === 'en' ? '' : 'ar/') + '404.html';
    built.push([nfRel, write(nfRel, layout(Object.assign({ lang: lang }, nf)))]);
  }

  console.log('');
  built.forEach(function (b) {
    console.log('    ' + b[0].padEnd(24) + fmt(b[1]));
  });

  /* --- sitemap, robots, manifest --------------------------------------- */

  const today = new Date().toISOString().slice(0, 10);
  const loc = function (id, lang) {
    const page = site.pages.find(function (p) { return p.id === id; });
    const file = page.file === 'index.html' ? '' : page.file;
    return site.url + (lang === 'en' ? '/' : '/ar/') + file;
  };

  const urls = [];
  for (const lang of ['en', 'ar']) {
    for (const def of site.pages) {
      urls.push(
        '  <url>\n' +
        '    <loc>' + loc(def.id, lang) + '</loc>\n' +
        '    <lastmod>' + today + '</lastmod>\n' +
        '    <changefreq>monthly</changefreq>\n' +
        '    <priority>' + (def.id === 'home' ? '1.0' : def.id === 'menu' ? '0.9' : '0.7') + '</priority>\n' +
        '    <xhtml:link rel="alternate" hreflang="en" href="' + loc(def.id, 'en') + '"/>\n' +
        '    <xhtml:link rel="alternate" hreflang="ar" href="' + loc(def.id, 'ar') + '"/>\n' +
        '    <xhtml:link rel="alternate" hreflang="x-default" href="' + loc(def.id, 'en') + '"/>\n' +
        '  </url>'
      );
    }
  }

  write('sitemap.xml',
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    urls.join('\n') + '\n</urlset>\n');

  write('robots.txt',
    'User-agent: *\nAllow: /\n\nSitemap: ' + site.url + '/sitemap.xml\n');

  write('site.webmanifest', JSON.stringify({
    name: site.name.en,
    short_name: site.shortName.en,
    description: 'Karahi, Shinwari and charcoal BBQ in Al-Batha, Riyadh.',
    start_url: site.base + '/',
    scope: site.base + '/',
    display: 'standalone',
    background_color: '#EFE6D6',
    theme_color: '#EFE6D6',
    icons: [
      { src: site.base + '/assets/img/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: site.base + '/assets/img/brand/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
    ]
  }, null, 2));

  /* Tells GitHub Pages to serve the files as-is rather than run Jekyll. */
  write('.nojekyll', '');

  console.log('\n    sitemap.xml · robots.txt · site.webmanifest · .nojekyll');

  if (placeholders.length) {
    console.log('\n    ' + placeholders.length + ' photo slot(s) still on placeholders: ' +
      placeholders.slice(0, 6).join(', ') + (placeholders.length > 6 ? ', …' : ''));
    console.log('    Run `npm run photos` for the shot list.');
  }
  console.log('\n  Built ' + built.length + ' pages in ' + (Date.now() - started) + 'ms → dist/\n');
}

/* --- optional dev server ------------------------------------------------ */

function serve(port) {
  const http = require('http');
  const types = {
    '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
    '.webmanifest': 'application/manifest+json', '.xml': 'application/xml',
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
    '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=utf-8'
  };

  http.createServer(function (req, res) {
    let rel = decodeURIComponent(req.url.split('?')[0]);
    // strip the project-page base so local URLs match production
    if (site.base && rel.indexOf(site.base) === 0) rel = rel.slice(site.base.length) || '/';
    if (rel.endsWith('/')) rel += 'index.html';

    const file = path.join(OUT, path.normalize(rel).replace(/^(\.\.[/\\])+/, ''));

    fs.readFile(file, function (err, data) {
      if (err) {
        fs.readFile(path.join(OUT, '404.html'), function (e2, nf) {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(e2 ? 'Not found' : nf);
        });
        return;
      }
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
      res.end(data);
    });
  }).listen(port, function () {
    console.log('  Serving dist/ → http://localhost:' + port + (site.base || '') + '/\n');
  });
}

build();
if (process.argv.includes('--serve')) serve(Number(process.env.PORT) || 4173);
