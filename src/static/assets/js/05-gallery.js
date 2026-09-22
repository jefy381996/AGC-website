/* =========================================================================
   Gallery lightbox
   ========================================================================= */

(function () {
  var box = $('.lightbox');
  var items = $$('[data-lightbox]');
  if (!box || !items.length) return;

  var img = $('.lightbox__img', box);
  var title = $('.lightbox__title', box);
  var caption = $('.lightbox__caption', box);
  var closeBtn = $('.lightbox__close', box);
  var prevBtn = $('.lightbox__btn--prev', box);
  var nextBtn = $('.lightbox__btn--next', box);
  var index = 0;
  var lastFocus = null;

  function show(i) {
    index = (i + items.length) % items.length;
    var el = items[index];
    img.src = el.getAttribute('data-full') || el.getAttribute('data-src') || '';
    img.alt = el.getAttribute('data-alt') || '';
    if (title) title.textContent = el.getAttribute('data-title') || '';
    if (caption) caption.textContent = el.getAttribute('data-caption') || '';
  }

  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    box.classList.add('is-open');
    box.removeAttribute('aria-hidden');
    document.body.classList.add('lightbox-open');
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  items.forEach(function (el, i) {
    el.addEventListener('click', function (e) { e.preventDefault(); open(i); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (prevBtn) prevBtn.addEventListener('click', function () { show(index - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { show(index + 1); });

  box.addEventListener('click', function (e) {
    if (e.target === box) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(index + 1);
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'Tab') {
      var focusables = $$('button', box).filter(function (b) { return b.offsetParent !== null; });
      if (!focusables.length) return;
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Swipe between photos on touch.
  var startX = null;
  box.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 48) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  }, { passive: true });
})();
