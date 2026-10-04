# Al Ashfaz Restaurant — website

A bilingual (English / Arabic) website for **Al Ashfaz Restaurant**, Al-Batha, Riyadh.

No bookings and no card payment — by design. The site's job is to show people what
you cook, what it costs, and how to walk through the door. Ordering happens through
WhatsApp: a customer taps prices on the menu, fills in a name and a phone number,
and the whole order arrives as one message. Collection or delivery, paid in person.

---

## What's in it

| Page | English | Arabic |
| --- | --- | --- |
| Home | `/` | `/ar/` |
| Menu | `/menu.html` | `/ar/menu.html` |
| Our Story | `/about.html` | `/ar/about.html` |
| Gallery | `/gallery.html` | `/ar/gallery.html` |
| Visit Us | `/visit.html` | `/ar/visit.html` |
| Not found | `/404.html` | `/ar/404.html` |

Both languages are built as real, separate pages — not switched with JavaScript —
so Google indexes the Arabic pages properly and they load instantly.

---

## Editing the menu

**Everything about the menu lives in one file: `src/data/menu.js`.**

Change a price, rename a dish, add or remove an item there, save, and push.
The site rebuilds itself and both languages update together.

```js
{ name: { en: 'Chicken Lahori Karahi', ar: 'كراهي لاهوري دجاج' },
  prices: { full: 55, half: 30, quarter: 16 } },
```

Other things you may want to change:

| What | File |
| --- | --- |
| Phone number, address, opening hours, map pin | `src/data/site.js` |
| Page text — the story, the FAQ, headings | `src/data/content.js` |
| Photo slots and the shot list | `src/data/images.js` |

---

## Photographs

Every dish on the site has a real photograph. One slot is still open —
`storefront` — and the Visit page falls back gracefully until it arrives.

The shopfront should be a real photo of the building, not a generated one:
its whole job is helping someone standing in Al-Batha recognise the place.

To see exactly what is needed and what is still a placeholder:

```bash
npm run photos
```

To replace one, either drop a file into `src/static/assets/img/food/` named
exactly as the list says — for example `karahi.jpg` — or let the helper do the
resizing, WebP conversion and EXIF stripping for you:

```bash
python3 tools/add-photo.py ~/Downloads/my-karahi.jpg karahi
```

Then push. Nothing else to do; the site picks it up on the next build.

- JPG is fine. Straight from a phone is fine.
- Shoot **landscape**, at least 1600px wide.
- Shoot the food as it actually leaves your kitchen. Steam, char and mess look
  better than tidy.
- The four `karahi-<style>.jpg` slots are optional. Until you shoot them, those
  cards on the Our Story page stay text-only rather than showing the wrong dish.

---

## Publishing it

The site is a folder of plain HTML — it will run on any free host. Two are live
right now, from the same commit, and neither interferes with the other.

| Where | Address | Built by |
| --- | --- | --- |
| **Cloudflare Worker** (the real one) | `agc-website.jaffar381996152.workers.dev` | Cloudflare, on every push to `main` |
| GitHub Pages (the spare) | `jefy381996.github.io/AGC-website` | `.github/workflows/deploy.yml` |

### How one repository serves two hosts

Two environment variables, both read in `src/data/site.js`:

```
SITE_URL    the full public address
SITE_BASE   the subfolder, if the host puts the site in one
```

`SITE_BASE` is **unset by default**, which means the root — what Cloudflare,
Netlify and every other host needs. GitHub project pages are the one exception,
so the GitHub workflow sets `SITE_BASE: /AGC-website` itself. Nothing to
configure on a new host; it works out of the box.

Get this wrong in the other direction and every stylesheet and image 404s, which
is exactly what a plain, unstyled deploy looks like.

### Adding a host

Connect the repository. Build command `node build.js`, publish directory `dist`.
`netlify.toml` already says so and is detected automatically; on Cloudflare,
`src/static/_headers` carries the same caching policy into the build output.

### Connecting a domain name

See **`DOMAIN.md`** — a step-by-step walkthrough for a Namecheap domain on the
Cloudflare Worker, written for someone who has not done it before.

The one code change it needs is `SITE_URL`, which sets the canonical link on
every page, the sitemap, and the image that appears when the link is shared.

---

## Working on it locally

You need [Node.js](https://nodejs.org) 18 or newer. Nothing else — there are no
dependencies to install.

```bash
npm run build     # build into dist/
npm start         # build and serve at http://localhost:4173
npm run photos    # print the photo shot list
npm run images    # regenerate the poster-crop placeholders for any slot that
                  # has no real photo yet (needs Python + Pillow)
```

`dist/` is generated. Never edit anything in it — your changes will be wiped on
the next build. Edit `src/`.

---

## How it is put together

```
src/
  data/        menu, site settings, page text, photo slots  ← edit these
  templates/   the HTML shell, icons, shared fragments
  pages/       one file per page
  static/
    assets/css/    8 stylesheets, bundled into one at build
    assets/js/     6 scripts, bundled into one at build
    assets/fonts/  self-hosted webfonts
    assets/img/    photographs and brand marks
build.js       reads src/, writes dist/
tools/         image generation and the photo shot list
```

No framework, no build dependencies, no tracking scripts. The whole site is
about 100 kB of code plus photographs, and it works with JavaScript switched off
(you lose the animations, not the content).

### Accessibility and performance notes

- Every animation is switched off for visitors who have "reduce motion" enabled.
- The menu prices are a real table on desktop and re-stack into a readable
  three-up strip on phones — never a horizontal scroll.
- Fonts are self-hosted, so there is no third-party request and nothing to load
  from outside Saudi Arabia.
- Photographs are served as WebP with a JPEG fallback, and lazy-loaded below the
  fold.

---

## Things to check and correct

These were not printed on the menu poster, so they are best guesses. Please
confirm and fix them in `src/data/site.js`:

1. **Opening hours** — currently *Sat–Thu 11:00–02:00, Fri 13:00–02:00*.
   These drive the live "Open now" indicator, so if they are wrong the site will
   tell people you are open when you are closed.
2. **Map location** — `lat` / `lng` are approximate for Al-Batha. Open Google
   Maps, right-click your shopfront, copy the two numbers, and paste them in.
3. **Payment methods** — the Visit page says cash and mada.
4. **Social links** — `social:` in `src/data/site.js` is empty. Add Instagram,
   TikTok or Snapchat and they appear in the footer.
