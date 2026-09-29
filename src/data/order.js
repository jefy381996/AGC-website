/* =========================================================================
   The orderable catalogue

   One flat list of everything a customer can actually put in a basket,
   derived from menu.js so the two can never drift apart. The menu stores
   dishes in three different shapes and this flattens all of them:

     · a section with `columns` (karahi: full / half / quarter) becomes one
       orderable line per size, because a half karahi is its own thing with
       its own price;
     · a plain section becomes one line per dish;
     · the two daily specials come along too.

   The id is a slug of the English name, plus the size where there is one.
   Slugs rather than indices so that reordering the menu does not silently
   turn someone's saved basket into different food. The build asserts they
   are unique — see checkOrder() in build.js.
   ========================================================================= */

const menu = require('./menu');

function slug(str) {
  return String(str)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function build() {
  const out = [];

  function add(name, price, column, cat) {
    if (price == null) return;
    out.push({
      i: column ? slug(name.en) + '--' + column.key : slug(name.en),
      e: name.en,
      a: name.ar,
      p: price,
      ve: column ? column.label.en : '',
      va: column ? column.label.ar : '',
      c: cat
    });
  }

  menu.specials.items.forEach(function (item) {
    add(item.name, item.price, null, 'specials');
  });

  menu.sections.forEach(function (section) {
    const lists = section.groups
      ? section.groups.map(function (g) { return g.items; })
      : [section.items || []];

    lists.forEach(function (items) {
      items.forEach(function (item) {
        if (section.columns) {
          section.columns.forEach(function (col) {
            add(item.name, item.prices && item.prices[col.key], col, section.id);
          });
        } else {
          add(item.name, item.price, null, section.id);
        }
      });
    });
  });

  return out;
}

const catalogue = build();

/* A lookup the page templates use to stamp the right id onto each price. */
const byName = {};
catalogue.forEach(function (line) {
  byName[line.e + '|' + line.ve] = line.i;
});

function idFor(name, columnKey) {
  const base = slug(name.en);
  return columnKey ? base + '--' + columnKey : base;
}

/* Duplicate ids would let one dish overwrite another in a basket. */
function duplicates() {
  const seen = Object.create(null);
  const dupes = [];
  catalogue.forEach(function (line) {
    if (seen[line.i]) dupes.push(line.i);
    seen[line.i] = true;
  });
  return dupes;
}

module.exports = { catalogue, idFor, slug, duplicates };
