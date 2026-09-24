/* ---------------------------------------------------------------------------
   Resolves a photo slot name to a file on disk.

   Slots and their fallback chains are declared in src/data/images.js. This
   lives apart from parts.js so the page shell can use it too without the two
   requiring each other.
--------------------------------------------------------------------------- */

const fs = require('fs');
const path = require('path');

const slots = require('../data/images');

const FOOD_DIR = path.join(__dirname, '..', 'static', 'assets', 'img', 'food');
const EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

/* The file backing this exact slot, if there is one. */
function fileFor(name) {
  for (let i = 0; i < EXTS.length; i++) {
    if (fs.existsSync(path.join(FOOD_DIR, name + EXTS[i]))) return name + EXTS[i];
  }
  return null;
}

/* Walks the fallback chain until it finds a slot with an actual file. */
function resolveSlot(name) {
  const seen = {};
  let key = name;
  while (key && !seen[key]) {
    seen[key] = true;
    if (fileFor(key)) return key;
    key = slots[key] ? slots[key].use : null;
  }
  return null;
}

/* True when a real photograph exists for this exact slot — no fallback.
   Used where showing a different dish would be worse than showing none. */
function hasPhoto(name) {
  return !!fileFor(name);
}

/* Whether a WebP sits beside the resolved file. A photo dropped in as a
   plain .jpg has none, and <picture> does not recover from a source that
   404s — it shows a broken image instead. */
function hasWebp(slot) {
  return fs.existsSync(path.join(FOOD_DIR, slot + '.webp'));
}

module.exports = {
  FOOD_DIR: FOOD_DIR,
  fileFor: fileFor,
  resolveSlot: resolveSlot,
  hasPhoto: hasPhoto,
  hasWebp: hasWebp
};
