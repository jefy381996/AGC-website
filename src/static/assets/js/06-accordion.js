/* =========================================================================
   Accordion (FAQ)
   ========================================================================= */

(function () {
  var groups = $$('[data-accordion]');
  if (!groups.length) return;

  groups.forEach(function (group) {
    var single = group.getAttribute('data-accordion') === 'single';
    var accs = $$('.acc', group);

    accs.forEach(function (acc) {
      var btn = $('.acc__btn', acc);
      var panel = $('.acc__panel', acc);
      if (!btn || !panel) return;

      btn.addEventListener('click', function () {
        var willOpen = !acc.classList.contains('is-open');

        if (single && willOpen) {
          accs.forEach(function (other) {
            if (other === acc) return;
            other.classList.remove('is-open');
            var ob = $('.acc__btn', other);
            var op = $('.acc__panel', other);
            if (ob) ob.setAttribute('aria-expanded', 'false');
            if (op) op.setAttribute('aria-hidden', 'true');
          });
        }

        acc.classList.toggle('is-open', willOpen);
        btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        panel.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
      });
    });
  });
})();
