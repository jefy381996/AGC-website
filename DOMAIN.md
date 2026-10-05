# Connecting your Namecheap domain

Your site is already live on Cloudflare at
<https://agc-website.jaffar381996152.workers.dev/>. This puts your own
domain in front of it.

It takes about **15 minutes of clicking**, then a wait while the internet
catches up — usually under an hour, occasionally up to a day. Nothing goes
offline while you wait. The `workers.dev` address keeps working the whole
time and forever after, so you always have a link that is guaranteed up.

Your domain is **alashfazrestaurant.com**. Steps 1 to 3 are done — Cloudflare
says the zone is Active. **Step 4 is the one still outstanding**, and the
section below on "the site times out" explains why that produces a timeout
rather than an error page.

---

## Before you start

Two things, and only two:

- Your **Namecheap** login.
- Your **Cloudflare** login — the same account the Worker is in.

Nothing to install, no code, no cost.

**One warning about email.** This domain has Namecheap **email forwarding**
set up — that is what the five `MX` records pointing at
`eforward1–5.registrar-servers.com` are. They were copied into Cloudflare by
the scan in step 1, so mail still routes to Namecheap's servers and there is
nothing to do now.

Namecheap documents email forwarding as a feature of *their* nameservers,
which this domain no longer uses, so it may or may not keep working. Keeping
the records costs nothing and is the only way it can. **Send yourself a test
message** once the site is up. If it does not arrive, Cloudflare **Email
Routing** does the same job free — see the end of this guide.

---

## Step 1 — Add the domain to Cloudflare

**5 minutes.**

1. Go to <https://dash.cloudflare.com> and log in.
2. Top of the page, click **Add a domain** (older dashboards say *Add a
   site*).
3. Type your domain **without** `www` and without `https://` — just
   `alashfazrestaurant.com`. Continue.
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
5. Type `alashfazrestaurant.com`. Click **Add Domain**.

Cloudflare now creates the DNS record and issues the HTTPS certificate for
you. No records to type by hand. It shows *Initializing* for a minute or
two, then *Active*.

Open `https://alashfazrestaurant.com` — your site should be there, with a padlock.

### Add `www` as well

Most people type `www.` out of habit, and if nothing answers there they
assume the site is broken. So do the same thing once more:

**Add** → **Custom Domain** → `www.alashfazrestaurant.com` → **Add Domain**.

Both addresses now serve the site. Google is told which one is the real one
by the canonical tag on every page — that is the `SITE_URL` in step 5 — so
there is no duplicate-content problem.

### If it refuses: "already has externally managed DNS records"

Expected, on a domain that was parked at Namecheap. The scan in step 1 copied
Namecheap's parking records across, and a Custom Domain will not write over a
record it did not create. Clear them and it goes through.

1. **Cancel** the dialog.
2. Top left → **Back to Domains** → **alashfazrestaurant.com** → **DNS** →
   **Records**.
3. There are eight records. Delete **two**:

   | Delete? | Name | Type | Content | Why |
   |---|---|---|---|---|
   | **DELETE** | `alashfazrestaurant.com` | `A` | `192.64.119.153` | Namecheap's parking server. The record causing the error. |
   | **DELETE** | `www.alashfazrestaurant.com` | `CNAME` | `parkingpage.namecheap.com` | Same, for `www`. |
   | keep | `alashfazrestaurant.com` | `MX` ×5 | `eforward1–5.registrar-servers.com` | Email forwarding. Deleting these kills mail to the domain. |
   | keep | `alashfazrestaurant.com` | `TXT` | `v=spf1 include:spf.ef…` | SPF for that email. Without it your mail gets marked as spam. |

   The two to delete are the only ones marked **Proxied** (orange cloud).
   Everything to keep says **DNS only**. That is a reliable tell here.

4. Go back to the Worker and do step 4 again.

> **The five MX rows and the TXT row are not in the way.** Cloudflare's error
> names "A, CNAME, etc" and it is tempting to clear the lot. Only the two
> address records conflict — a Custom Domain answers web traffic and never
> touches mail routing. Attaching it writes correct address records back.

Between deleting and re-adding, the domain will briefly say *site can't be
reached* instead of timing out. That is the right direction — it means the
dead parking record is gone.

### The `Enable for` dropdown

Leave it on **Production and Preview**, or set it to **Production** if you
would rather preview builds did not get subdomains of your real domain.
Either works; nothing downstream depends on it.

---

## Step 5 — The address inside the site · done

Every page used to tell Google *"my real address is
jefy381996.github.io/AGC-website"*, because that was true when it was built.
The sitemap said the same, and so did the preview image that appears when
someone shares the link on WhatsApp.

That is now set to `https://alashfazrestaurant.com`, so canonical links, the
sitemap and the WhatsApp preview all name your domain. The GitHub Pages copy
keeps its own address, set in `.github/workflows/deploy.yml`.

The two settings have to agree — `SITE_URL` must end in whatever `SITE_BASE`
says — and the build now prints a NOTE in its log if they ever drift apart.
Nothing for you to do here; it is written down so the next person knows.

---

## Step 6 — Two switches worth flipping

**Optional, 1 minute each, both free.**

**Force HTTPS.** Cloudflare → **SSL/TLS** → **Edge Certificates** → turn on
**Always Use HTTPS**. Anyone who types `alashfazrestaurant.com` without the `https`
gets sent to the secure version instead of a warning.

**Email on your domain.** If you want `info@alashfazrestaurant.com` forwarding to
your Gmail — or you are restoring what Namecheap used to do — Cloudflare →
**Email** → **Email Routing** → follow the wizard. It adds the records
itself.

---

## What good looks like when you are finished

- `https://alashfazrestaurant.com` → the site, padlock in the address bar
- `https://www.alashfazrestaurant.com` → the same site
- `http://alashfazrestaurant.com` → silently becomes `https://`
- `https://agc-website.jaffar381996152.workers.dev/` → still works, always will

---

## "The site times out" — what that means

This is the expected symptom between step 3 and step 4, and it is worth
understanding because the error is misleading.

After step 2, every request for your domain goes to Cloudflare. Cloudflare
then looks up what to do with it. Right now the answer is still the parking
record it copied from Namecheap in step 1 — a server that no longer answers.
So Cloudflare waits, gives up, and shows a timeout.

The dashboard says the same thing in plainer words: the DNS panel on your
domain's Overview page reads **"No Workers connected"**.

Nothing is broken and nothing needs undoing. Step 4 is what tells Cloudflare
to send those requests to your site instead of to the dead parking server,
and it replaces the parking record while it does it.

The giveaway is a **timeout** rather than *"this site can't be reached"*. A
timeout means something answered and then stalled — Cloudflare is there, it
just has nowhere to forward you yet.

---

## If something goes wrong

| What you see | What it means | Fix |
|---|---|---|
| Cloudflare stuck on **Pending** after a few hours | The nameservers did not save at Namecheap | Go back to step 2 and check the **green tick** was clicked. Both boxes filled, spelled exactly. |
| **"This zone is not active"** when adding the custom domain | You are on step 4 before step 3 finished | Wait for Active, then retry. |
| **"already has externally managed DNS records"** | Cloudflare imported Namecheap's parking records in step 1 | **DNS → Records**, delete the A/AAAA/CNAME rows for the root and `www` only, retry. See step 4. |
| Domain **times out**, or shows Cloudflare error 522 / 1016 | Step 4 was not done, or did not take. DNS reaches Cloudflare; Cloudflare has no Worker to hand it to | Do step 4. Check the Overview page no longer says *No Workers connected*. |
| Site loads but looks plain and unstyled | A stale build is being served | Cloudflare → the Worker → **Deployments**, check the newest one succeeded. |
| `www` works, bare domain does not (or the reverse) | Only one of the two was added | Add the missing one in step 4. |

Nothing here is destructive. Every step is reversible: switch Namecheap
back to **Namecheap BasicDNS** and you are exactly where you started.
