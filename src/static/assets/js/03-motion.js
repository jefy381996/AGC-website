/* =========================================================================
   Scroll reveals, parallax, counters, cursor, magnetics, tilt, embers
   ========================================================================= */

/* --- Reveal on scroll --------------------------------------------------- */
(function () {
  var targets = $$('[data-reveal]');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window) || prefersStill()) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

  targets.forEach(function (el) {
    // Anything already on screen at load should not wait for a scroll.
    var box = el.getBoundingClientRect();
    if (box.top < window.innerHeight * 0.92 && box.bottom > 0) {
      el.classList.add('is-in');
    } else {
      io.observe(el);
    }
  });
})();

/* --- Parallax ----------------------------------------------------------- */
(function () {
  var layers = $$('[data-parallax]');
  if (!layers.length || prefersStill()) return;

  // A gentler factor on small screens keeps it from feeling seasick.
  var scale = window.innerWidth < 860 ? 0.55 : 1;

  onScroll(function () {
    var vh = window.innerHeight;
    for (var i = 0; i < layers.length; i++) {
      var el = layers[i];
      var box = el.getBoundingClientRect();
      if (box.bottom < -220 || box.top > vh + 220) continue;
      var speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
      var progress = (box.top + box.height / 2 - vh / 2) / vh;
      el.style.transform = 'translate3d(0,' + (progress * speed * 100 * scale).toFixed(2) + 'px,0)';
    }
  });
})();

/* --- Counters ----------------------------------------------------------- */
(function () {
  var nodes = $$('[data-count]');
  if (!nodes.length) return;

  function run(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    if (prefersStill()) { el.textContent = String(target); return; }
    var dur = 1500;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var p = clamp((ts - start) / dur, 0, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) {
    nodes.forEach(run);
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      run(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.5 });

  nodes.forEach(function (el) { el.textContent = '0'; io.observe(el); });
})();

/* --- Custom cursor ------------------------------------------------------ */
(function () {
  if (!finePointer.matches || prefersStill()) return;

  var ring = document.createElement('div');
  var dot = document.createElement('div');
  ring.className = 'cursor';
  dot.className = 'cursor-dot';
  ring.setAttribute('aria-hidden', 'true');
  dot.setAttribute('aria-hidden', 'true');
  document.body.appendChild(ring);
  document.body.appendChild(dot);

  var mx = window.innerWidth / 2, my = window.innerHeight / 2;
  var rx = mx, ry = my;
  var ready = false;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
    if (!ready) { ready = true; document.body.classList.add('cursor-ready'); }
  }, { passive: true });

  (function loop() {
    // the ring lags the dot slightly — that lag is the whole effect
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = 'translate3d(' + rx.toFixed(2) + 'px,' + ry.toFixed(2) + 'px,0)';
    requestAnimationFrame(loop);
  })();

  var HOT = 'a, button, .gal__item, .acc__btn, input, .chip, [data-cursor="hot"]';

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest && e.target.closest(HOT)) document.body.classList.add('cursor-hot');
  }, { passive: true });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest && e.target.closest(HOT)) document.body.classList.remove('cursor-hot');
  }, { passive: true });

  document.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-ready'); });
  document.addEventListener('mouseenter', function () { document.body.classList.add('cursor-ready'); });
})();

/* --- Magnetic buttons --------------------------------------------------- */
(function () {
  if (!finePointer.matches || prefersStill()) return;

  $$('.magnetic').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var b = el.getBoundingClientRect();
      var x = (e.clientX - b.left - b.width / 2) * 0.26;
      var y = (e.clientY - b.top - b.height / 2) * 0.34;
      el.classList.add('is-pulled');
      el.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0)';
    });

    el.addEventListener('mouseleave', function () {
      el.classList.remove('is-pulled');
      el.style.transform = '';
    });
  });
})();

/* --- Card tilt ---------------------------------------------------------- */
(function () {
  if (!finePointer.matches || prefersStill()) return;

  $$('.tilt').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var b = el.getBoundingClientRect();
      var px = (e.clientX - b.left) / b.width - 0.5;
      var py = (e.clientY - b.top) / b.height - 0.5;
      el.classList.add('is-tilting');
      el.style.transform =
        'perspective(900px) rotateX(' + (-py * 5).toFixed(2) + 'deg) rotateY(' +
        (px * 6).toFixed(2) + 'deg) translateZ(6px)';
    });

    el.addEventListener('mouseleave', function () {
      el.classList.remove('is-tilting');
      el.style.transform = '';
    });
  });
})();

/* --- Hero embers -------------------------------------------------------- */
(function () {
  var canvas = $('.hero__embers');
  if (!canvas || prefersStill()) return;

  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = 0, h = 0, sparks = [], raf = null, visible = true;

  function density() {
    // fewer particles on phones — same look, a fraction of the work
    var area = window.innerWidth * window.innerHeight;
    return clamp(Math.round(area / 26000), 14, 46);
  }

  function seed(spark, first) {
    spark.x = Math.random() * w;
    spark.y = first ? Math.random() * h : h + Math.random() * 60;
    spark.r = 0.6 + Math.random() * 1.7;
    spark.vy = -(0.16 + Math.random() * 0.46);
    spark.vx = (Math.random() - 0.5) * 0.26;
    spark.life = 0;
    spark.max = 220 + Math.random() * 320;
    spark.hue = 38 + Math.random() * 14;
    return spark;
  }

  function resize() {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var want = density();
    while (sparks.length < want) sparks.push(seed({}, true));
    sparks.length = want;
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < sparks.length; i++) {
      var s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.life++;
      // drift sideways on a slow sine so they never fall in straight lines
      s.x += Math.sin(s.life / 46) * 0.20;
      if (s.life > s.max || s.y < -20) seed(s, false);

      var t = s.life / s.max;
      var alpha = t < 0.16 ? t / 0.16 : (1 - t) * 0.92;
      ctx.beginPath();
      ctx.fillStyle = 'hsla(' + s.hue + ',78%,64%,' + (alpha * 0.55).toFixed(3) + ')';
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  }

  function start() { if (!raf && visible) frame(); }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

  resize();
  start();

  window.addEventListener('resize', debounce(resize, 200));

  // Stop burning CPU when the hero is scrolled away or the tab is hidden.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      visible ? start() : stop();
    }, { threshold: 0 }).observe(canvas);
  }

  document.addEventListener('visibilitychange', function () {
    document.hidden ? stop() : start();
  });
})();

/* --- Marquee duplication ------------------------------------------------ */
(function () {
  // The CSS scrolls the track by -50%, which only looks seamless when the
  // content is present exactly twice.
  $$('.marquee__track').forEach(function (track) {
    var group = $('.marquee__group', track);
    if (!group || track.children.length > 1) return;
    var clone = group.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
})();
