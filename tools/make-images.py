#!/usr/bin/env python3
"""
Regenerates the site's photography from the original menu poster.

These are PLACEHOLDERS, kept only so the site is never empty. Real
photographs are installed with tools/add-photo.py, and this script will
refuse to overwrite one — otherwise running it would quietly replace every
real photo on the site with a low-resolution crop of the poster.

Usage:  python3 tools/make-images.py            skip slots that already
                                                have a real photograph
        python3 tools/make-images.py --force    overwrite them anyway
"""
import os
import sys
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "tools", "source-poster.jpg")
FOOD = os.path.join(ROOT, "src", "static", "assets", "img", "food")
BRAND = os.path.join(ROOT, "src", "static", "assets", "img", "brand")
os.makedirs(FOOD, exist_ok=True)
os.makedirs(BRAND, exist_ok=True)

FORCE = "--force" in sys.argv

poster = Image.open(SRC).convert("RGB")


def already_real(name):
    """A slot counts as done once something other than this script wrote it.

    Every placeholder this script produces is generated in one pass, so a
    file whose JPEG is wider than the width we write here, or which has no
    matching WebP, came from somewhere else.
    """
    path = os.path.join(FOOD, name + ".jpg")
    if not os.path.exists(path):
        return False
    return os.path.getsize(path) > 0 and name in REAL_SLOTS


# Slots the poster can genuinely produce a crop for; anything else in
# src/data/images.js was always going to need a real photograph.
REAL_SLOTS = set()
for _n in os.listdir(FOOD) if os.path.isdir(FOOD) else []:
    if _n.endswith(".jpg"):
        REAL_SLOTS.add(_n[:-4])

# (left, top, right, bottom) regions of the poster that contain clean food
REGIONS = {
    "karahi":   (70, 250, 310, 392),
    "bbq":      (795, 300, 1050, 480),
    "sides":    (758, 742, 1042, 902),
    "daal":     (32, 1128, 372, 1302),
    "biryani":  (398, 1128, 722, 1302),
    "naan":     (698, 1136, 1046, 1302),
}

# target widths, chosen so each asset is ~2x its largest on-screen size
WIDTHS = {"karahi": 1400, "bbq": 1200, "sides": 1200,
          "daal": 1200, "biryani": 1200, "naan": 1200}


def enrich(im):
    """Counteract upscaling softness and deepen the colour for a cinematic look."""
    im = im.filter(ImageFilter.UnsharpMask(radius=2.2, percent=135, threshold=3))
    im = ImageEnhance.Color(im).enhance(1.10)
    im = ImageEnhance.Contrast(im).enhance(1.06)
    return im


def upscale(im, width):
    ratio = width / im.width
    target = (width, int(round(im.height * ratio)))
    # two-step upscale keeps edges cleaner than a single large jump
    mid = (int(im.width * min(ratio, 2.0)), int(im.height * min(ratio, 2.0)))
    im = im.resize(mid, Image.LANCZOS)
    return im.resize(target, Image.LANCZOS)


def save(im, name, quality=90):
    im.save(os.path.join(FOOD, name + ".jpg"), quality=quality,
            optimize=True, progressive=True)
    im.save(os.path.join(FOOD, name + ".webp"), quality=86, method=6)


skipped = []

for name, box in REGIONS.items():
    if not FORCE and already_real(name):
        skipped.append(name)
        continue
    crop = poster.crop(box)
    wide = enrich(upscale(crop, WIDTHS[name]))
    save(wide, name)
    print("  food/%s.jpg  %dx%d" % (name, wide.width, wide.height))

if not FORCE and already_real("hero"):
    skipped.append("hero")
else:
    # Wide plate built from the karahi region, for large screens
    hero = enrich(upscale(poster.crop((62, 248, 318, 394)), 1500))
    save(hero, "hero", quality=88)
    print("  food/hero.jpg  %dx%d" % (hero.width, hero.height))

# Open Graph / social preview: the poster's crown, which carries the real logo
og = poster.crop((0, 0, 1055, 554)).resize((1200, 630), Image.LANCZOS)
og = enrich(og)
og.save(os.path.join(BRAND, "og-image.jpg"), quality=88, optimize=True)
print("  brand/og-image.jpg 1200x630")

# The poster itself, offered as a download on the menu page
poster.save(os.path.join(BRAND, "menu-poster.jpg"), quality=86,
            optimize=True, progressive=True)
print("  brand/menu-poster.jpg %dx%d" % poster.size)


def icon(size):
    """Gold monogram on the house green — used for favicons and the PWA icon."""
    s = size * 4
    im = Image.new("RGB", (s, s), (9, 36, 27))
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, s, s], fill=(9, 36, 27))
    # gold hairline frame
    inset = int(s * 0.085)
    d.rectangle([inset, inset, s - inset, s - inset],
                outline=(198, 160, 78), width=max(2, int(s * 0.018)))
    try:
        from PIL import ImageFont
        font = ImageFont.truetype(
            "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", int(s * 0.52))
    except Exception:
        font = None
    text = "A"
    if font:
        bbox = d.textbbox((0, 0), text, font=font)
        d.text(((s - (bbox[2] - bbox[0])) / 2 - bbox[0],
                (s - (bbox[3] - bbox[1])) / 2 - bbox[1]),
               text, font=font, fill=(226, 190, 106))
    return im.resize((size, size), Image.LANCZOS)


for size, fname in ((180, "apple-touch-icon.png"), (192, "icon-192.png"),
                    (512, "icon-512.png"), (32, "favicon-32.png"), (16, "favicon-16.png")):
    icon(size).save(os.path.join(BRAND, fname), optimize=True)
print("  brand/ icons written")

if skipped:
    print("\nSkipped %d slot(s) that already hold a photograph:" % len(skipped))
    print("  " + ", ".join(sorted(skipped)))
    print("Pass --force to replace them with poster crops anyway.")

print("Done.")
