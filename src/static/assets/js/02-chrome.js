/* =========================================================================
   Preloader, header, drawer, progress bar, floating actions, open-now
   ========================================================================= */

/* --- Preloader --------------------------------------------------------- */
(function () {
  var body = document.body;
  var done = false;

  function finish() {
    if (done) return;
    done = true;
    body.classList.remove('is-loading');
    body.classList.add('is-loaded');
  }

  body.classList.add('is-loading');

  // Whichever comes first: the load event, or a hard ceiling so a slow
  // image can never hold the page hostage.
  window.addEventListener('load', function () { setTimeout(finish, 260); });
  setTimeout(finish, 2600);
  if (document.readyState === 'complete') setTimeout(finish, 160);
})();

/* --- Header: hide going down, reveal coming up ------------------------- */
(function () {
  var header = $('.header');
  if (!header) return;
  var last = 0;

  onScroll(function (y) {
    header.classList.toggle('is-stuck', y > 24);
    var goingDown = y > last && y > 320;
    // never hide the header while the drawer is open
    var hide = goingDown && !document.body.classList.contains('drawer-open');
    header.classList.toggle('is-hidden', hide);
    // the menu page's sticky toolbar sits below the header, so it has to
    // slide up with it or it leaves a see-through band behind
    document.body.classList.toggle('header-hidden', hide);
    last = y;
  });
})();

/* --- Scroll progress --------------------------------------------------- */
(function () {
  var bar = $('.progress__bar');
  if (!bar) return;

  onScroll(function (y) {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? clamp(y / max, 0, 1) : 0;
    bar.style.transform = 'scaleX(' + p + ')';
  });
})();

/* --- Mobile drawer ----------------------------------------------------- */
(function () {
  var burger = $('.burger');
  var drawer = $('.drawer');
  if (!burger || !drawer) return;

  var body = document.body;
  var lastFocus = null;

  function open() {
    lastFocus = document.activeElement;
    body.classList.add('drawer-open');
    burger.setAttribute('aria-expanded', 'true');
    drawer.removeAttribute('aria-hidden');
    var first = $('.drawer__link', drawer);
    if (first) setTimeout(function () { first.focus(); }, 320);
  }

  function close() {
    body.classList.remove('drawer-open');
    burger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function toggle() {
    body.classList.contains('drawer-open') ? close() : open();
  }

  burger.addEventListener('click', toggle);

  $$('.drawer a').forEach(function (a) {
    a.addEventListener('click', close);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && body.classList.contains('drawer-open')) close();
  });

  // Keep tab focus inside the drawer while it is open.
  drawer.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || !body.classList.contains('drawer-open')) return;
    var items = $$('a, button', drawer).filter(function (el) { return el.offsetParent !== null; });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // A resize past the breakpoint should not leave the drawer stuck open.
  window.addEventListener('resize', debounce(function () {
    if (window.innerWidth > 860 && body.classList.contains('drawer-open')) close();
  }, 160));
})();

/* --- Floating buttons -------------------------------------------------- */
(function () {
  var toTop = $('.to-top');
  var wa = $('.wa-float');
  if (!toTop && !wa) return;

  onScroll(function (y) {
    var show = y > 620;
    if (toTop) toTop.classList.toggle('is-shown', show);
    if (wa) wa.classList.toggle('is-shown', show);
  });

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersStill() ? 'auto' : 'smooth' });
    });
  }
})();

/* --- Page transition curtain ------------------------------------------- */
(function () {
  if (prefersStill()) return;
  var origin = window.location.origin;

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;

    var href = a.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0 ||
        href.indexOf('tel:') === 0 || href.indexOf('javascript:') === 0) return;
    if (a.href.indexOf(origin) !== 0) return;
    // same page, different hash — let the browser scroll
    if (a.pathname === window.location.pathname && a.hash) return;

    e.preventDefault();
    document.body.classList.add('is-leaving');
    setTimeout(function () { window.location.href = a.href; }, 430);
  });

  // Coming back via the browser's back button must not show a black screen.
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) document.body.classList.remove('is-leaving');
  });
})();

/* --- "Open now" indicator ---------------------------------------------- */
(function () {
  var pills = $$('[data-open-now]');
  if (!pills.length) return;

  var schedule;
  try { schedule = JSON.parse(pills[0].getAttribute('data-schedule') || 'null'); }
  catch (err) { schedule = null; }
  if (!schedule) return;

  function riyadhNow() {
    // Always judge by the restaurant's clock, not the visitor's.
    try {
      var parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Riyadh', hour12: false,
        weekday: 'short', hour: '2-digit', minute: '2-digit'
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var hour = parseInt(map.hour, 10) % 24;
      return { day: days[map.weekday], minutes: hour * 60 + parseInt(map.minute, 10) };
    } catch (err) {
      var d = new Date();
      return { day: d.getDay(), minutes: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function toMinutes(hhmm) {
    var bits = String(hhmm).split(':');
    return parseInt(bits[0], 10) * 60 + parseInt(bits[1] || '0', 10);
  }

  function isOpen() {
    var now = riyadhNow();
    var today = schedule[now.day];
    if (today && now.minutes >= toMinutes(today[0]) && now.minutes < toMinutes(today[1])) return true;
    // A close time past midnight (e.g. "26:00") belongs to yesterday's shift.
    var yest = schedule[(now.day + 6) % 7];
    if (yest) {
      var close = toMinutes(yest[1]);
      if (close > 1440 && now.minutes + 1440 < close) return true;
    }
    return false;
  }

  function paint() {
    var open = isOpen();
    pills.forEach(function (pill) {
      pill.classList.toggle('is-open', open);
      var label = $('[data-open-label]', pill);
      if (label) label.textContent = open ? pill.getAttribute('data-label-open') : pill.getAttribute('data-label-closed');
    });
  }

  paint();
  setInterval(paint, 60000);
})();

/* --- Current year ------------------------------------------------------ */
(function () {
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
