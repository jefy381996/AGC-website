#!/usr/bin/env python3
"""
Installs a photograph into one of the site's photo slots.

    python3 tools/add-photo.py <image-file> <slot-name>
    python3 tools/add-photo.py kitchen.jpg hero

It resizes, strips EXIF (phone photos carry GPS), and writes both the JPEG
and the WebP the site serves. Run `npm run photos` for the list of slots.
"""
import os
import sys
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FOOD = os.path.join(ROOT, 'src', 'static', 'assets', 'img', 'food')

sys.path.insert(0, os.path.join(ROOT, 'tools'))

# The hero spans the full width of a large screen; everything else is a card
# or a banner, so it never needs to be as wide.
WIDTHS = {'hero': 2000, 'storefront': 1800, 'interior': 1800}
DEFAULT_WIDTH = 1500


def slot_names():
    """Reads the slot list straight out of src/data/images.js."""
    import re
    src = open(os.path.join(ROOT, 'src', 'data', 'images.js'), encoding='utf-8').read()
    body = src[src.index('const slots'):]
    return re.findall(r"^\s{2}'?([a-z][a-z0-9-]*)'?:\s*\{", body, re.M)


def install(path, slot):
    valid = slot_names()
    if slot not in valid:
        print('Unknown slot: %s' % slot)
        print('Valid slots: %s' % ', '.join(valid))
        return False

    if not os.path.exists(path):
        print('No such file: %s' % path)
        return False

    im = Image.open(path)
    # honour the phone's rotation flag, then drop all metadata with it
    im = ImageOps.exif_transpose(im)
    if im.mode not in ('RGB', 'L'):
        im = im.convert('RGB')
    elif im.mode == 'L':
        im = im.convert('RGB')

    src_size = (im.width, im.height)
    if im.height > im.width:
        print('  ! portrait (%dx%d) — the site crops to landscape, so the top '
              'and bottom will be cut off' % src_size)

    target = WIDTHS.get(slot, DEFAULT_WIDTH)
    if im.width > target:
        im = im.resize((target, round(im.height * target / im.width)), Image.LANCZOS)
    elif im.width < 900:
        print('  ! only %dpx wide — it will look soft on a large screen' % im.width)

    # a fresh canvas carries no info dict, so EXIF (including GPS) is dropped
    clean = Image.new('RGB', im.size)
    clean.paste(im)

    jpg = os.path.join(FOOD, slot + '.jpg')
    webp = os.path.join(FOOD, slot + '.webp')
    clean.save(jpg, 'JPEG', quality=88, optimize=True, progressive=True)
    clean.save(webp, 'WEBP', quality=84, method=6)

    # a slot must not be left with a stale file in another format
    for ext in ('.png', '.jpeg'):
        stale = os.path.join(FOOD, slot + ext)
        if os.path.exists(stale):
            os.remove(stale)
            print('  removed stale %s%s' % (slot, ext))

    print('  %-16s %dx%d -> %dx%d   jpg %dkB  webp %dkB'
          % (slot, src_size[0], src_size[1], clean.width, clean.height,
             os.path.getsize(jpg) // 1024, os.path.getsize(webp) // 1024))
    return True


if __name__ == '__main__':
    args = sys.argv[1:]
    if len(args) == 2:
        sys.exit(0 if install(args[0], args[1]) else 1)
    if args and len(args) % 2 == 0:
        ok = all([install(args[i], args[i + 1]) for i in range(0, len(args), 2)])
        sys.exit(0 if ok else 1)
    print(__doc__)
    print('Slots: %s' % ', '.join(slot_names()))
    sys.exit(1)
