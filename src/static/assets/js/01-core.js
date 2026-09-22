/* =========================================================================
   Core helpers
   ========================================================================= */

var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
var $$ = function (sel, ctx) {
  return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
};

var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

function prefersStill() { return reduceMotion.matches; }

/* A single rAF-driven scroll loop — cheaper than many scroll listeners. */
var scrollTasks = [];
var ticking = false;

function onScroll(fn) {
  scrollTasks.push(fn);
  fn(window.scrollY || window.pageYOffset || 0);
}

function runScrollTasks() {
  var y = window.scrollY || window.pageYOffset || 0;
  for (var i = 0; i < scrollTasks.length; i++) scrollTasks[i](y);
  ticking = false;
}

window.addEventListener('scroll', function () {
  if (!ticking) { ticking = true; requestAnimationFrame(runScrollTasks); }
}, { passive: true });

window.addEventListener('resize', function () {
  if (!ticking) { ticking = true; requestAnimationFrame(runScrollTasks); }
}, { passive: true });

function clamp(v, min, max) { return v < min ? min : v > max ? max : v; }

function debounce(fn, wait) {
  var t;
  return function () {
    var args = arguments, self = this;
    clearTimeout(t);
    t = setTimeout(function () { fn.apply(self, args); }, wait);
  };
}

/* Strips diacritics and Arabic vowel marks so search matches loosely. */
function normalise(str) {
  if (!str) return '';
  var s = String(str).toLowerCase();
  if (s.normalize) s = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  return s
    .replace(/[ً-ٰٟ]/g, '')   // Arabic harakat
    .replace(/[آأإٱ]/g, 'ا') // alef forms → alef
    .replace(/ة/g, 'ه')            // ta marbuta → ha
    .replace(/[ى]/g, 'ي')          // alef maqsura → ya
    .replace(/[^\w؀-ۿ\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
