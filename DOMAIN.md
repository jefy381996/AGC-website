# Connecting your Namecheap domain

Your site is already live on Cloudflare at
<https://agc-website.jaffar381996152.workers.dev/>. This puts your own
domain in front of it.

It takes about **15 minutes of clicking**, then a wait while the internet
catches up — usually under an hour, occasionally up to a day. Nothing goes
offline while you wait. The `workers.dev` address keeps working the whole
time and forever after, so you always have a link that is guaranteed up.

Everywhere below, `yourdomain.com` means your actual domain.

---

## Before you start

Two things, and only two:

- Your **Namecheap** login.
- Your **Cloudflare** login — the same account the Worker is in.

Nothing to install, no code, no cost.

**One warning, read it before step 2.** If you currently use Namecheap's
free **email forwarding** on this domain — anything like
`info@yourdomain.com` arriving in your Gmail — it will stop working when
you switch nameservers, because it runs on Namecheap's own DNS. Cloudflare
has the same thing for free (**Email Routing**) and setting it back up takes
five minutes. Just know it in advance rather than discovering it. If you
have never set up email on this domain, ignore this entirely.

---

## Step 1 — Add the domain to Cloudflare

**5 minutes.**

1. Go to <https://dash.cloudflare.com> and log in.
2. Top of the page, click **Add a domain** (older dashboards say *Add a
   site*).
3. Type your domain **without** `www` and without `https://` — just
   `yourdomain.com`. Continue.
4. Choose the **Free** plan. Scroll past the paid ones; Free is at the
   bottom. Continue.
5. Cloudflare scans your existing DNS records and shows you what it found.
   For a fresh Namecheap domain this is usually one or two parking records.
   Just continue — step 4 replaces them anyway.
6. Cloudflare now shows you **two nameservers**. They look like:

   ```
   dina.ns.cloudflare.com
   max.ns.cloudflare.com
   ```

   Yours will have different first words. **Leave this page open** — you
   need to copy these in the next step.

---

## Step 2 — Point Namecheap at Cloudflare

**3 minutes.** This is the one step that actually moves anything.

1. In a new tab, log in to <https://namecheap.com>.
2. Left menu → **Domain List**. Find your domain, click **Manage**.
3. On the **Domain** tab, scroll to the **NAMESERVERS** section.
4. It currently says **Namecheap BasicDNS**. Click that dropdown and choose
   **Custom DNS**.
5. Two empty boxes appear. Paste one Cloudflare nameserver into each —
   one per box, no `http`, no trailing dot.
6. Click the small **green tick (✓)** to the right to save. This is easy to
   miss. If you leave the page without clicking it, nothing is saved.

Namecheap will show a note saying changes may take up to 48 hours. In
practice it is usually minutes.

> From now on, every DNS change for this domain is made in **Cloudflare**,
> not Namecheap. Namecheap's DNS editor is switched off. Namecheap still
> owns the registration and still takes the renewal payment — that does not
> change.

---

## Step 3 — Wait for Cloudflare to say "Active"

**Usually 5–60 minutes. Nothing for you to do.**

Back on the Cloudflare tab, click **Check nameservers now** if the button
is there. Then leave it. Cloudflare emails you when it is done, and the
domain's status on your dashboard changes from **Pending** to **Active**.

Do not start step 4 until it says Active. The Worker will refuse the
domain otherwise, and the error message is not very clear about why.

---

## Step 4 — Attach the domain to the Worker

**2 minutes.** This is the part that actually puts your site on the domain.

1. In Cloudflare, left sidebar → **Compute (Workers)**. On older dashboards
   this is **Workers & Pages**.
2. Click your Worker, **agc-website**.
3. Go to the **Settings** tab → **Domains & Routes**.
4. Click **Add** → **Custom Domain**.
5. Type `yourdomain.com`. Click **Add Domain**.

Cloudflare now creates the DNS record and issues the HTTPS certificate for
you. No records to type by hand. It shows *Initializing* for a minute or
two, then *Active*.

Open `https://yourdomain.com` — your site should be there, with a padlock.

### Add `www` as well

Most people type `www.` out of habit, and if nothing answers there they
assume the site is broken. So do the same thing once more:

**Add** → **Custom Domain** → `www.yourdomain.com` → **Add Domain**.

Both addresses now serve the site. Google is told which one is the real one
by the canonical tag on every page — that is the `SITE_URL` in step 5 — so
there is no duplicate-content problem.

> **If it refuses `www`** saying a CNAME already exists: Cloudflare's scan
> in step 1 imported a Namecheap parking record. Go to **DNS → Records**,
> delete the `www` row, and try again.

---

## Step 5 — Tell me the domain

**This is the only part that is mine, and it is one line of code.**

Every page currently tells Google *"my real address is
jefy381996.github.io/AGC-website"*, because that is what was true when it
was built. The sitemap says the same, and so does the preview image that
appears when someone shares the link on WhatsApp.

Send me the domain and I will set it, push it, and Cloudflare will rebuild.
Two minutes. Until then the site works perfectly — this only affects search
engines and link previews, not customers.

---

## Step 6 — Two switches worth flipping

**Optional, 1 minute each, both free.**

**Force HTTPS.** Cloudflare → **SSL/TLS** → **Edge Certificates** → turn on
**Always Use HTTPS**. Anyone who types `yourdomain.com` without the `https`
gets sent to the secure version instead of a warning.

**Email on your domain.** If you want `info@yourdomain.com` forwarding to
your Gmail — or you are restoring what Namecheap used to do — Cloudflare →
**Email** → **Email Routing** → follow the wizard. It adds the records
itself.

---

## What good looks like when you are finished

- `https://yourdomain.com` → the site, padlock in the address bar
- `https://www.yourdomain.com` → the same site
- `http://yourdomain.com` → silently becomes `https://`
- `https://agc-website.jaffar381996152.workers.dev/` → still works, always will

---

## If something goes wrong

| What you see | What it means | Fix |
|---|---|---|
| Cloudflare stuck on **Pending** after a few hours | The nameservers did not save at Namecheap | Go back to step 2 and check the **green tick** was clicked. Both boxes filled, spelled exactly. |
| **"This zone is not active"** when adding the custom domain | You are on step 4 before step 3 finished | Wait for Active, then retry. |
| **"A CNAME record already exists"** | Cloudflare imported a Namecheap parking record | **DNS → Records**, delete that row, retry. |
| Domain loads but shows a Cloudflare error page (522, 1016) | The custom domain was not attached to the Worker | Redo step 4. Make sure it is the **Worker's** Settings, not the domain's. |
| Site loads but looks plain and unstyled | A stale build is being served | Cloudflare → the Worker → **Deployments**, check the newest one succeeded. |
| `www` works, bare domain does not (or the reverse) | Only one of the two was added | Add the missing one in step 4. |

Nothing here is destructive. Every step is reversible: switch Namecheap
back to **Namecheap BasicDNS** and you are exactly where you started.
