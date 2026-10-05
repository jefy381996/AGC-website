# Setting up the extras

The website works right now with none of this done. Orders reach WhatsApp,
the menu works, nothing is broken. Everything below is optional and can be
done in any order, at any time, and undone just as easily.

Each step says roughly how long it takes and whether it costs anything.
None of them cost anything.

There are four steps. Do them in this order if you can — step 1 is the one
that changes your evenings most, and step 3 depends on nothing.

Connecting your own domain name is a separate job and lives in its own file:
**`DOMAIN.md`**. It does not depend on anything here, and nothing here depends
on it.

---

## Step 1 — WhatsApp Business app

**20 minutes · free · no code · biggest single improvement**

This is a different free app from the WhatsApp you have now. Same phone
number, same chats — they come across with you. It adds the things a
business needs and normal WhatsApp does not have.

### Switching over

1. Back up your current chats first (Settings → Chats → Chat backup).
2. Install **WhatsApp Business** from the App Store or Play Store.
3. Open it. It will find your number and offer to move your account and
   chat history over. Accept.
4. Fill in the business profile: name, address, hours (7am–2am, every day),
   and the website link.

> Do not delete the old WhatsApp until step 3 above has finished and you can
> see your chats in the new app.

### Set the away message

This is the one that pays for itself. Someone ordering at 2:30am gets an
instant reply instead of silence.

**Settings → Business tools → Away message** → turn on, choose
*Outside of business hours*, and set your hours to 7:00–2:00 every day.

Text to paste (use whichever language your customers mostly write in — you
can only have one):

> Thank you for your order. We are closed right now and will reply as soon
> as we open at 7am. Al Ashfaz, opposite Lulu Hyper, Al-Batha.

> شكراً لطلبك. نحن مغلقون الآن وسنرد فور فتحنا الساعة ٧ صباحاً. مطعم آل
> أشفاز، مقابل لولو هايبر، البطحاء.

### Set up quick replies

**Settings → Business tools → Quick replies.** These turn a 30-second reply
into two seconds — you type `/` and the shortcut, and the whole message
appears. Make these four:

**Shortcut `/confirm`** — the one you will use most:

> Your order is confirmed. Total is ___ SAR. It will be ready in about ___
> minutes. We will message you when it is ready.

> تم تأكيد طلبك. المجموع ___ ريال. سيكون جاهزاً خلال ___ دقيقة تقريباً.
> سنراسلك عند جهوزه.

**Shortcut `/delivery`** — for delivery orders:

> Your order is confirmed. Items ___ SAR plus ___ SAR delivery, total ___
> SAR. The driver will be with you in about ___ minutes.

> تم تأكيد طلبك. الأصناف ___ ريال بالإضافة إلى ___ ريال توصيل، المجموع ___
> ريال. سيصلك السائق خلال ___ دقيقة تقريباً.

**Shortcut `/ready`**:

> Your order is ready. See you shortly.

> طلبك جاهز. نراك قريباً.

**Shortcut `/pay`** — only needed if you start taking payment up front
(see step 5):

> Here is the payment link for your order: ___
> Once it is paid we will start cooking.

> هذا رابط الدفع لطلبك: ___
> بمجرد الدفع سنبدأ الطهي.

### Set up labels

**Long-press any chat → Label.** Make these five, in this order:

`New order` · `Cooking` · `Ready` · `Delivered` · `Paid`

During service, move each chat along as it progresses. This is what stops an
order getting lost in the scroll on a Thursday night.

---

## Step 2 — Order log in a Google Sheet

**15 minutes · free · one line to paste into the site**

Gives you a spreadsheet row for every order: date, items, total, customer,
phone. Searchable, sortable, and you can total a month in one click.

This is a **copy**. Orders still arrive on WhatsApp exactly as now. If this
breaks or you skip it entirely, ordering is unaffected.

1. Go to <https://sheets.new> and make a new sheet. Name it something like
   *Al Ashfaz orders*.
2. **Extensions → Apps Script.** An editor opens with a few lines of sample
   code in it. Select all of that and delete it.
3. Open `tools/order-log.gs` from this project, copy the **whole file**, and
   paste it into the editor. Click the save icon.
4. Click **Deploy → New deployment**. Click the gear next to *Select type*
   and choose **Web app**. Then:
   - *Description*: anything, e.g. "order log"
   - *Execute as*: **Me**
   - *Who has access*: **Anyone**
5. Click **Deploy**. Google will ask you to authorise it and will show a
   warning screen saying the app is not verified. This is normal and
   expected: you are giving your own script permission to write to your own
   sheet. Click **Advanced**, then **Go to (project name) (unsafe)**, then
   **Allow**.
6. Copy the **Web app URL**. It is long and ends in `/exec`.
7. Open `src/data/site.js`, find `ordering.logUrl`, and paste the URL between
   the quotes:

   ```js
   logUrl: 'https://script.google.com/macros/s/AKfy..../exec',
   ```

8. Save, commit and push. Place a test order on the site and watch the row
   appear in the sheet.

**Two things to know.** The URL has to be open for the website to post to
it, so anyone who got hold of the URL could add junk rows — they cannot read
anything, that needs the sheet itself. Do not publish the URL. If junk ever
appears, delete the rows and redeploy for a fresh URL.

The sheet will hold customer names, phone numbers and addresses. That is
real personal data in your Google account. Keep the sheet private, share it
only with staff who need it, and clear out old rows when you no longer need
them.

---

## Step 3 — Google Business Profile

**30 minutes · free · nothing to paste into the site**

Worth more than website analytics for a walk-in restaurant. It is what makes
you appear in Google Maps and in "restaurants near me", and it tells you how
many people searched for you, tapped call, and asked for directions.

1. Go to <https://business.google.com> and search for Al Ashfaz. If someone
   already created a listing, claim it. If not, create one.
2. Category: *Restaurant*. Add *Pakistani restaurant* and *Barbecue
   restaurant* as extra categories.
3. Put the pin **exactly** on your door, not on the street. Drag it until it
   is right.
4. Hours: 7:00am – 2:00am, every day.
5. Add the website link and the WhatsApp number.
6. Upload photos — the shopfront, the karahi, the grill. The same ones from
   the site are fine.
7. Google will verify you, usually by postcard or phone.

Once it is live, send me the Google Maps link for the listing and I will
point the site's *Get Directions* button at your exact location instead of
searching for the name.

---

## Step 4 — Visitor analytics

**10 minutes · free · one line to paste into the site**

Tells you how many people visit, which pages they look at, and whether they
are on a phone. No cookies, so no consent banner.

1. Go to <https://dash.cloudflare.com> and make a free account.
2. In the sidebar, find **Web Analytics** and click **Add a site**.
3. Enter the site address. Right now that is
   `agc-website.jaffar381996152.workers.dev`. Once your own domain is
   connected (see `DOMAIN.md`), add that as a second site too — they
   count separately.
4. It will show you a snippet of code containing a **token** — a long string
   of letters and numbers inside `"token": "..."`. Copy just that token, not
   the whole snippet.
5. Open `src/data/site.js`, find `analytics.cloudflareToken`, and paste it
   between the quotes.
6. Save, commit and push. Numbers start appearing within a few minutes.

If you skip this, no tracking script is added to the site at all — not a
disabled one, none.

---

## Step 5 — Taking payment up front (only if you want it)

**Nothing to build · no site changes**

If you ever want money before you cook, you do not need the website changed.
**Moyasar** (<https://moyasar.com>) and **Tap** (<https://tap.company>) both
let you create a payment link from a dashboard and paste it into your
WhatsApp reply. Customer pays, you cook. Use the `/pay` quick reply from
step 1.

Building card payment into the website itself is a different and much larger
job: it needs a merchant account in the restaurant's name, a payment gateway
contract, and a server to hold the secret key — a static site like this one
cannot keep a secret. Worth doing only once the order volume justifies it.

---

## How freshness works

You do not need to do anything here — this is a note on what is set up, and
on the one limit your current host imposes.

**Every visit starts on the home page.** Reopening a browser restores the tab
it was on, so someone whose last visit ended on the menu used to come back to
the menu. Now they are handed to the home page instead. This acts only on a
reload — which is how a browser restores a tab — so anyone arriving from a
Google result or a shared WhatsApp link still lands exactly where they meant
to, and the back button is untouched. Someone with an order already in their
basket keeps their place too. To turn it off, set `openFresh: false` in
`src/data/site.js`.

**Opening the site always starts at the top of the page.** Browsers normally
restore the exact scroll position when a tab is reopened, which is why the
site kept coming back halfway down the menu. That is switched off, and a page
restored from the back button is put back at the top too. A link with a `#`
in it still jumps to its target, since that is someone asking for a specific
place.

**Your CSS and JavaScript carry a content hash in the filename.** Change a
style and the file becomes `styles.a1b2c3d4.css` instead of
`styles.9f8e7d6c.css` — a different address, so no browser anywhere can serve
the old one. This is what stops the "I merged it but still see the old site"
problem.

**On Cloudflare, HTML freshness is set deliberately.** The `_headers` file
built into the site tells Cloudflare to re-check every page on every visit,
while letting it keep stylesheets, scripts and fonts for a year — safe,
because those carry a content hash in the filename. So a deploy reaches
people on their next page load, not whenever a cache happens to expire.

**On GitHub Pages it is not something we control.** That copy of the site is
still live at `jefy381996.github.io/AGC-website` and GitHub sets its own
caching rules with no way to change them, so after a deploy a recent visitor
there may see the previous page for a short while. Nothing is broken when
that happens and it clears on its own. It is also the reason the Cloudflare
copy is the one to give people.

**No service worker, deliberately.** A service worker can cache the whole
site for offline use, but it is also the single most common reason a website
gets stuck showing an old version — the thing you asked me to prevent. For a
menu that people read once and order from, the cost outweighs the benefit.
Say the word if you ever want offline support and I will add one properly,
with an update path that cannot strand anyone.

## Still outstanding

Things only you can supply. None of them block anything.

- **Shopfront photo.** Stand across the street, square to the building, sign
  and door in frame, late afternoon light. Send it and I will put it in.
  Do not use a generated image for this one — people use it to recognise
  your door.
- **Check the 44 menu prices.** They were read off the photo of your poster.
  Print the menu page and have someone who knows the menu tick every line.
- **Confirm "all prices include VAT"** is actually true for your business —
  it is printed on the menu page.
- **Instagram handle** — the slot is there and empty.
- **Delivery area and charge.** Tell me a flat fee and a radius and I will
  show it in the order panel, so customers see it before they send.
- **An email address**, if you want one on the site.
