/* =========================================================================
   Menu page — category chips + live search
   ========================================================================= */

(function () {
  var root = $('[data-menu]');
  if (!root) return;

  var chips = $$('.chip', root);
  var groups = $$('.mgroup', root);
  var subs = $$('.msub', root);
  var rows = $$('.mrow', root);
  var empty = $('.mempty', root);
  var field = $('.menu-search input', root);
  var wrap = $('.menu-search', root);
  var clearBtn = $('.menu-search__clear', root);

  var active = 'all';
  var query = '';

  // Pre-compute a search blob per row so typing stays instant.
  rows.forEach(function (row) {
    row._hay = normalise(row.getAttribute('data-search') || row.textContent);
  });

  function apply() {
    var q = normalise(query);
    var terms = q ? q.split(' ').filter(Boolean) : [];
    var shown = 0;

    rows.forEach(function (row) {
      var inCat = active === 'all' || row.getAttribute('data-cat') === active;
      var hit = !terms.length || terms.every(function (t) { return row._hay.indexOf(t) !== -1; });
      var show = inCat && hit;
      row.hidden = !show;
      if (show) shown++;
    });

    // A sub-group or section with nothing left in it should disappear too.
    subs.forEach(function (sub) {
      sub.hidden = !$$('.mrow', sub).some(function (r) { return !r.hidden; });
    });

    groups.forEach(function (group) {
      var any = $$('.mrow', group).some(function (r) { return !r.hidden; });
      group.hidden = !any;
    });

    if (empty) empty.hidden = shown > 0;
    if (wrap) wrap.classList.toggle('has-value', query.length > 0);
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      active = chip.getAttribute('data-filter') || 'all';
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      apply();

      // Bring the first surviving section under the sticky bar.
      var first = groups.filter(function (g) { return !g.hidden; })[0];
      if (first && active !== 'all') {
        var tools = $('.menu-tools');
        var offset = (tools ? tools.offsetHeight : 0) +
          parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) + 16;
        var top = first.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: prefersStill() ? 'auto' : 'smooth' });
      }
    });
  });

  if (field) {
    field.addEventListener('input', function () { query = field.value; apply(); });
    field.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { field.value = ''; query = ''; apply(); field.blur(); }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      if (field) { field.value = ''; field.focus(); }
      query = '';
      apply();
    });
  }

  // Shadow under the sticky toolbar once it is actually stuck.
  var tools = $('.menu-tools');
  if (tools) {
    onScroll(function () {
      var headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 84;
      tools.classList.toggle('is-pinned', tools.getBoundingClientRect().top <= headerH + 1);
    });
  }

  apply();
})();
