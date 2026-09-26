/* =========================================================================
   Ordering

   A basket that lives in localStorage and leaves as a WhatsApp message.

   There is no server anywhere in this: the site is static, so a secret key
   could not be kept even if there were something to spend it on. What the
   page does is assemble the order into text and hand it to WhatsApp, where
   the customer presses send. That message arriving on the restaurant's
   phone IS the notification — instant, free, and it rings a device someone
   is already holding during service.

   The basket stores nothing but ids and quantities. Names and prices are
   read back out of the catalogue the build embedded, so a price edit in
   menu.js reaches a basket that was filled yesterday, and a dish that has
   been taken off the menu quietly drops out of it.
   ========================================================================= */

(function () {
  var barEl = $('[data-order-bar]');
  var panel = $('#order-panel');
  if (!barEl || !panel) return;

  var cfg = readJson('order-config');
  var catalogue = readJson('order-catalogue');
  if (!cfg || !catalogue) return;

  var index = {};
  for (var i = 0; i < catalogue.length; i++) index[catalogue[i].i] = catalogue[i];

  var S = cfg.s;
  var body = document.body;
  var KEY = 'alashfaz.order.v1';

  /* --- storage ---------------------------------------------------------- */
  /* Private windows, blocked site data and full quotas all throw here, and a
     basket is a convenience rather than a record — so every access is
     guarded and failure just means the order lasts one page. */
  var memory = null;

  function readJson(id) {
    var el = document.getElementById(id);
    if (!el) return null;
    try { return JSON.parse(el.textContent); } catch (e) { return null; }
  }

  function load() {
    if (memory) return memory;
    var raw = null;
    try { raw = window.localStorage.getItem(KEY); } catch (e) { /* no storage */ }
    var parsed = null;
    if (raw) { try { parsed = JSON.parse(raw); } catch (e) { parsed = null; } }
    memory = {};
    if (parsed && typeof parsed === 'object') {
      for (var id in parsed) {
        // Drop anything no longer on the menu, and anything that is not a
        // sane quantity — both are what a stale or hand-edited basket looks
        // like, and neither should reach the kitchen.
        var q = parseInt(parsed[id], 10);
        if (index[id] && q > 0) memory[id] = Math.min(q, 99);
      }
    }
    return memory;
  }

  function save() {
    try { window.localStorage.setItem(KEY, JSON.stringify(memory)); } catch (e) { /* no storage */ }
  }

  /* --- counts ----------------------------------------------------------- */
  function lines() {
    var out = [];
    for (var id in memory) if (memory[id] > 0) out.push({ item: index[id], qty: memory[id] });
    return out;
  }

  function totals() {
    var n = 0, sar = 0;
    var list = lines();
    for (var i = 0; i < list.length; i++) {
      n += list[i].qty;
      sar += list[i].item.p * list[i].qty;
    }
    return { count: n, sar: sar, lines: list };
  }

  /* Arabic counts in six buckets where English counts in two. Getting this
     wrong reads as broken Arabic, so the forms come from content.js rather
     than being assembled with a plus sign. */
  function countLabel(n) {
    var f = S.count;
    var key;
    if (f.zero !== undefined && n === 0) key = 'zero';
    else if (f.one !== undefined && n === 1) key = 'one';
    else if (f.two !== undefined && n === 2) key = 'two';
    else if (f.few !== undefined && n % 100 >= 3 && n % 100 <= 10) key = 'few';
    else if (f.many !== undefined && f.other === undefined) key = 'many';
    else key = 'other';
    var s = f[key] || f.other || f.many || '';
    return s.replace('{n}', n);
  }

  /* --- the price buttons ------------------------------------------------ */
  function paintButtons() {
    $$('[data-add]').forEach(function (btn) {
      var id = btn.getAttribute('data-add');
      var qty = memory[id] || 0;
      var pill = $('[data-qty="' + cssEscape(id) + '"]', btn);
      btn.classList.toggle('is-in', qty > 0);
      if (!pill) return;
      if (qty > 0) {
        pill.textContent = qty;
        pill.hidden = false;
      } else {
        pill.hidden = true;
      }
    });
  }

  // Ids are slugs — letters, digits and hyphens — but an attribute selector
  // should not be built from unescaped input on principle.
  function cssEscape(v) {
    if (window.CSS && CSS.escape) return CSS.escape(v);
    return String(v).replace(/["\\]/g, '\\$&');
  }

  function bump(id) {
    var pill = $('[data-qty="' + cssEscape(id) + '"]');
    if (!pill || prefersStill()) return;
    pill.classList.remove('is-bumped');
    void pill.offsetWidth;
    pill.classList.add('is-bumped');
  }

  function add(id, delta) {
    if (!index[id]) return;
    var next = (memory[id] || 0) + delta;
    if (next <= 0) delete memory[id]; else memory[id] = Math.min(next, 99);
    save();
    render();
    if (delta > 0) bump(id);
  }

  /* --- rendering -------------------------------------------------------- */
  var listEl = $('[data-order-list]', panel);
  var emptyEl = $('[data-order-empty]', panel);
  var summaryEl = $('[data-order-summary]', panel);
  var formEl = $('[data-order-form]', panel);
  var sentEl = $('[data-order-sent]', panel);
  var countEls = $$('[data-order-count]');
  var totalEls = $$('[data-order-total]');
  var addressField = $('[data-order-address]', panel);
  var live = null;

  function name(item) { return cfg.lang === 'ar' ? item.a : item.e; }
  function variant(item) { return cfg.lang === 'ar' ? item.va : item.ve; }

  function renderLines(t) {
    listEl.textContent = '';
    t.lines.forEach(function (line) {
      var li = document.createElement('li');
      li.className = 'oline';

      var nameEl = document.createElement('div');
      nameEl.className = 'oline__name';
      nameEl.appendChild(document.createTextNode(name(line.item)));
      if (variant(line.item)) {
        var v = document.createElement('span');
        v.className = 'oline__var';
        v.textContent = variant(line.item);
        nameEl.appendChild(v);
      }

      var price = document.createElement('div');
      price.className = 'oline__price';
      price.textContent = (line.item.p * line.qty) + ' ' + cfg.sar;

      var step = document.createElement('div');
      step.className = 'ostep';
      step.appendChild(stepBtn('-', line, S.decrease));
      var n = document.createElement('span');
      n.className = 'ostep__n';
      n.textContent = line.qty;
      step.appendChild(n);
      step.appendChild(stepBtn('+', line, S.increase));

      li.appendChild(nameEl);
      li.appendChild(price);
      li.appendChild(step);
      listEl.appendChild(li);
    });
  }

  function stepBtn(sign, line, label) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'ostep__btn';
    b.setAttribute('data-step', sign);
    b.setAttribute('data-id', line.item.i);
    b.setAttribute('aria-label', label + ': ' + name(line.item));
    b.innerHTML = sign === '+'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5.5v13M5.5 12h13"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5.5 12h13"/></svg>';
    return b;
  }

  function render() {
    var t = totals();
    var has = t.count > 0;

    body.classList.toggle('order-active', has);
    barEl.hidden = !has;

    countEls.forEach(function (el) { el.textContent = t.count; });
    totalEls.forEach(function (el) { el.textContent = t.sar; });

    var openBtn = $('[data-order-open]');
    if (openBtn) openBtn.setAttribute('aria-label', countLabel(t.count) + ' — ' + t.sar + ' ' + cfg.sar);

    renderLines(t);
    // Any change to the basket takes you back out of the "sent" state — the
    // order on the kitchen's phone no longer matches what is in here.
    sentEl.hidden = true;
    emptyEl.hidden = has;
    summaryEl.hidden = !has;
    formEl.hidden = !has;

    paintButtons();
    if (live) live.textContent = countLabel(t.count);
  }

  /* --- the panel -------------------------------------------------------- */
  var lastFocus = null;

  function openPanel() {
    lastFocus = document.activeElement;
    panel.hidden = false;
    // A frame between unhiding and the class, or the sheet has nothing to
    // transition from and simply appears.
    requestAnimationFrame(function () {
      body.classList.add('opanel-open');
      panel.removeAttribute('aria-hidden');
      var first = $('.opanel__close', panel);
      if (first) first.focus();
    });
  }

  function closePanel() {
    body.classList.remove('opanel-open');
    panel.setAttribute('aria-hidden', 'true');
    var done = function () { if (!body.classList.contains('opanel-open')) panel.hidden = true; };
    if (prefersStill()) done(); else setTimeout(done, 420);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function isOpen() { return body.classList.contains('opanel-open'); }

  /* --- the message ------------------------------------------------------ */
  function buildMessage(form) {
    var t = totals();
    var w = S.wa;
    var nl = '\n';
    var out = ['*' + w.heading + '*', ''];

    out.push('*' + w.items + '*');
    t.lines.forEach(function (line, n) {
      var label = name(line.item);
      if (variant(line.item)) label += ' (' + variant(line.item) + ')';
      out.push((n + 1) + '. ' + label + ' x' + line.qty + ' — ' + (line.item.p * line.qty) + ' ' + cfg.sar);
    });

    out.push('');
    out.push('*' + w.total + ':* ' + t.sar + ' ' + cfg.sar);
    out.push('');

    var delivery = form.fulfilment === 'delivery';
    out.push('*' + w.how + ':* ' + (delivery ? w.delivery : w.pickup));
    out.push('*' + w.name + ':* ' + form.name);
    out.push('*' + w.phone + ':* ' + form.phone);
    if (delivery) out.push('*' + w.address + ':* ' + form.address);
    if (form.notes) out.push('*' + w.notes + ':* ' + form.notes);

    out.push('');
    out.push(w.footer);
    return out.join(nl);
  }

  /* --- validation ------------------------------------------------------- */
  function setError(field, message) {
    var input = $('.ofield__input', field) || $('input, textarea', field);
    var err = $('[data-err]', field);
    if (!input || !err) return;
    if (message) {
      err.textContent = message;
      err.hidden = false;
      input.setAttribute('aria-invalid', 'true');
    } else {
      err.textContent = '';
      err.hidden = true;
      input.removeAttribute('aria-invalid');
    }
  }

  function fieldOf(input) { return input.closest('.ofield'); }

  function validate(values, wantsDelivery) {
    var bad = [];
    var nameInput = $('#o-name', panel);
    var phoneInput = $('#o-phone', panel);
    var addrInput = $('#o-address', panel);

    setError(fieldOf(nameInput), '');
    setError(fieldOf(phoneInput), '');
    if (addrInput) setError(fieldOf(addrInput), '');

    if (!values.name) { setError(fieldOf(nameInput), S.errName); bad.push(nameInput); }

    if (!values.phone) {
      setError(fieldOf(phoneInput), S.errPhone);
      bad.push(phoneInput);
    } else if (!/^[+\d][\d\s()+-]{6,}$/.test(values.phone)) {
      setError(fieldOf(phoneInput), S.errPhoneShape);
      bad.push(phoneInput);
    }

    if (wantsDelivery && !values.address) {
      setError(fieldOf(addrInput), S.errAddress);
      bad.push(addrInput);
    }
    return bad;
  }

  /* --- wiring ----------------------------------------------------------- */
  // A screen reader needs to hear that a tap on a price did something.
  live = document.createElement('span');
  live.className = 'sr-only';
  live.setAttribute('aria-live', 'polite');
  live.setAttribute('aria-atomic', 'true');
  barEl.parentNode.insertBefore(live, barEl);

  document.addEventListener('click', function (e) {
    var addBtn = e.target.closest ? e.target.closest('[data-add]') : null;
    if (addBtn) { add(addBtn.getAttribute('data-add'), 1); return; }

    var step = e.target.closest ? e.target.closest('[data-step]') : null;
    if (step) { add(step.getAttribute('data-id'), step.getAttribute('data-step') === '+' ? 1 : -1); return; }

    if (e.target.closest && e.target.closest('[data-order-open]')) { openPanel(); return; }
    if (e.target.closest && e.target.closest('[data-order-close]')) { closePanel(); return; }

    if (e.target.closest && e.target.closest('[data-order-clear]')) {
      if (window.confirm(S.clearConfirm)) { memory = {}; save(); render(); }
      return;
    }

    if (e.target.closest && e.target.closest('[data-order-restart]')) {
      memory = {}; save();
      sentEl.hidden = true;
      render();
      closePanel();
      return;
    }

    if (e.target.closest && e.target.closest('[data-order-keep]')) {
      sentEl.hidden = true;
      render();
      closePanel();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) closePanel();
  });

  // Tab stays inside the sheet while it is open.
  panel.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || !isOpen()) return;
    var items = $$('a, button, input, textarea, select', panel).filter(function (el) {
      return !el.disabled && el.offsetParent !== null;
    });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // The address field only exists when it is needed.
  $$('input[name="fulfilment"]', panel).forEach(function (radio) {
    radio.addEventListener('change', function () {
      var delivery = radio.value === 'delivery' && radio.checked;
      addressField.hidden = !delivery;
      var addr = $('#o-address', panel);
      if (addr) {
        addr.required = delivery;
        if (!delivery) setError(addressField, '');
      }
    });
  });

  formEl.addEventListener('submit', function (e) {
    e.preventDefault();

    var t = totals();
    if (!t.count) return;

    var checked = $('input[name="fulfilment"]:checked', panel);
    var wantsDelivery = !!checked && checked.value === 'delivery';
    var values = {
      name: ($('#o-name', panel).value || '').trim(),
      phone: ($('#o-phone', panel).value || '').trim(),
      address: (($('#o-address', panel) || {}).value || '').trim(),
      notes: (($('#o-notes', panel) || {}).value || '').trim(),
      fulfilment: wantsDelivery ? 'delivery' : 'pickup'
    };

    var bad = validate(values, wantsDelivery);
    if (bad.length) { bad[0].focus(); return; }

    var url = 'https://wa.me/' + cfg.wa + '?text=' + encodeURIComponent(buildMessage(values));
    window.open(url, '_blank', 'noopener');

    // The basket is kept until they say the order went through — WhatsApp
    // may not have opened, or they may have backed out of it.
    sentEl.hidden = false;
    formEl.hidden = true;
    summaryEl.hidden = true;
    sentEl.scrollIntoView({ block: 'nearest' });
  });

  // Another tab may have changed the basket.
  window.addEventListener('storage', function (e) {
    if (e.key !== KEY) return;
    memory = null;
    load();
    render();
  });

  // The markup ships these disabled so that a page without this script has
  // prices rather than dead buttons. We are the script, so they work now.
  $$('[data-add]').forEach(function (btn) { btn.disabled = false; });

  load();
  render();
})();
