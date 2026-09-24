/* Kenmore prototype V2 · Made for Real Life — views and interactions */
(function () {
  var KC = window.KC, D = KC.D, $ = KC.$, $$ = KC.$$, esc = KC.esc, L = D.links;
  var app = $('#app'), lastCat = {};
  try { lastCat = JSON.parse(sessionStorage.getItem('km2-lastcat') || '{}'); } catch (e) {}
  function i(n) { return '<svg class="i" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; }
  function logo(img) { img.src = D.logo; img.onerror = function () { img.outerHTML = '<span class="wm">Kenmore</span>'; }; }
  function mLink(l, cls) { return l.route ? '<a class="' + (cls || '') + '" href="' + l.route + '">' + esc(l.name) + '</a>' : KC.ext(l.url, '<span>' + esc(l.name) + '</span><span class="xhost">' + esc(KC.host(l.url)) + ' ↗</span>', cls); }
  function setTitle(t) { document.title = t + ' | Kenmore Prototype V2'; }
  var HERO = [['refrigerators', 'Refrigeration', '46-75525'], ['ranges', 'Cooking', '22-96853'], ['dishwashers', 'Dishwashers', '22-14625'], ['laundry', 'Laundry', '26-41202'], ['floorcare', 'Floor Care', 'BC4030']];
  logo($('#logoImg'));

  /* ---------- Mega menu: every group visible, product image heads ---------- */
  var mega = $('#mega'), megaBtn = $('#megaBtn');
  $('#megaIn').innerHTML = D.menu.map(function (m) {
    var first = m.links[0], head = first.route ? '<a class="head" href="' + first.route + '">' + (m.img ? KC.img(m.img, '', '', m.group) : '<span class="media"><span class="ph"><span>Partner sites</span></span></span>') + '<b>' + esc(m.group) + '</b></a>' : '<div class="head" style="cursor:default">' + '<span class="media"><span class="ph"><span>Opens Kenmore partner sites</span></span></span><b>' + esc(m.group) + '</b></div>';
    return '<div class="mcol">' + head + m.links.map(function (l) { return mLink(l, 'l'); }).join('') + '</div>';
  }).join('');
  $('#mfoot').innerHTML = '<span>Links marked ↗ open a Kenmore site outside this prototype.</span>' + KC.ext(L.whereToBuy, 'Where to buy ' + i('out'), 'alink');
  function setMega(open) { megaBtn.setAttribute('aria-expanded', open); mega.classList.toggle('is-open', open); }
  megaBtn.addEventListener('click', function () { var o = megaBtn.getAttribute('aria-expanded') !== 'true'; setMega(o); if (o) { var f = $('#megaIn a'); f && f.focus(); } });
  var hT; megaBtn.addEventListener('mouseenter', function () { if (matchMedia('(hover:hover)').matches) { clearTimeout(hT); hT = setTimeout(function () { setMega(true); }, 120); } });
  $('#hdr').addEventListener('mouseleave', function () { clearTimeout(hT); if (matchMedia('(hover:hover)').matches && !mega.contains(document.activeElement)) setMega(false); });
  mega.addEventListener('click', function (e) { if (e.target.closest('a')) setMega(false); });
  mega.addEventListener('keydown', function (e) {
    var links = $$('#megaIn a'), k = links.indexOf(document.activeElement); if (k < 0) return;
    var col = document.activeElement.closest('.mcol'), cols = $$('#megaIn .mcol'), ci = cols.indexOf(col), inCol = $$('a', col), ri = inCol.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); (inCol[ri + 1] || inCol[0]).focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); (inCol[ri - 1] || inCol[inCol.length - 1]).focus(); }
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); var nc = cols[(ci + (e.key === 'ArrowRight' ? 1 : -1) + cols.length) % cols.length], t = $$('a', nc); (t[Math.min(ri, t.length - 1)] || t[0]).focus(); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mega.classList.contains('is-open')) { setMega(false); megaBtn.focus(); } });
  document.addEventListener('click', function (e) { if (mega.classList.contains('is-open') && !e.target.closest('#mega') && !e.target.closest('#megaBtn')) setMega(false); });

  /* ---------- Mobile menu ---------- */
  $('#menuBody').innerHTML = '<div class="menu-top"><a class="logo" href="#/" data-close aria-label="Kenmore home"><img id="logoM" alt="Kenmore" width="120" height="22"></a><button type="button" class="x" data-close aria-label="Close menu">' + i('x') + '</button></div>' +
    '<h2>Shop</h2><div class="mgrid">' + HERO.map(function (h) { var p = KC.byId(h[2]); return '<a href="' + KC.cLink(h[0]) + '" data-close>' + KC.img(p.img, '', '', h[1]) + esc(h[1]) + '</a>'; }).join('') + '</div>' +
    '<h2>Browse all</h2>' + D.menu.map(function (m) { return '<details><summary>' + esc(m.group) + i('down') + '</summary><ul>' + m.links.map(function (l) { return '<li>' + mLink(l).replace('<a ', '<a data-close ') + '</li>'; }).join('') + '</ul></details>'; }).join('') +
    '<h2>Help</h2><div class="mlinks"><a href="#/?to=buy" data-to="buy" data-close>Where to Buy ' + i('arrow') + '</a><a href="#/?to=support" data-to="support" data-close>Customer Care ' + i('arrow') + '</a>' + KC.ext(L.manuals, 'Manuals ' + i('out')) + '</div>';
  logo($('#logoM'));
  $('#menuBtn').addEventListener('click', function () { KC.openDialog($('#dlgMenu'), this); });

  /* ---------- Footer ---------- */
  var FOOT = [['Shop', [['Refrigerators', '#/c/refrigerators'], ['Ranges', '#/c/ranges'], ['Dishwashers', '#/c/dishwashers'], ['Washers & Dryers', '#/c/laundry'], ['Vacuums & Floor Care', '#/c/floorcare']]], ['Help', [['Where to buy', L.whereToBuy], ['Manuals', L.manuals], ['Contact us', L.contact], ['Product recalls', L.recalls], ['Schedule a repair', L.repair]]], ['Care', [['Customer care', L.care], ['Warranty', L.warranty], ['Parts & accessories', L.parts], ['Product registration', L.register]]], ['Kenmore', [['livemore™', 'https://www.kenmore.com/livemore'], ['About us', 'https://www.kenmore.com/about-us/'], ['Press kit', 'https://www.kenmore.com/press-kit/'], ['EnergyGuide', 'https://www.kenmore.com/energyguide/'], ['New Ventures', 'https://www.kenmore.com/new-ventures']]]];
  var SOC = [['LinkedIn', 'https://www.linkedin.com/company/kenmore-and-brands/'], ['Facebook', 'https://www.facebook.com/kenmore'], ['Instagram', 'https://www.instagram.com/kenmoreappliances'], ['X (Twitter)', 'https://twitter.com/kenmore'], ['YouTube', 'https://www.youtube.com/user/Kenmore'], ['Pinterest', 'https://www.pinterest.com/Kenmore/']];
  var LEGAL = [['Terms of use', 'https://www.kenmore.com/terms-of-use/'], ['Privacy policy', 'https://www.kenmore.com/privacy-policy/'], ['Interest-based ads', 'https://www.kenmore.com/interest-based-ads/'], ['Sitemap', 'https://www.kenmore.com/sitemap/']];
  function fl(l) { return KC.isExt(l[1]) ? KC.ext(l[1], esc(l[0])) : '<a href="' + l[1] + '">' + esc(l[0]) + '</a>'; }
  $('#foot').innerHTML = '<div class="wrap"><div class="foot-top"><div class="foot-brand"><a class="logo" href="#/" aria-label="Kenmore home"><img id="logoF" alt="Kenmore" width="120" height="22"></a><p>Your resource for all things cooking, cleaning, and more. Since 1913.</p><ul style="display:flex;flex-wrap:wrap;gap:0 16px;margin-top:14px">' + SOC.map(function (s) { return '<li>' + fl(s) + '</li>'; }).join('') + '</ul><span class="proto">Prototype V2 &middot; internal review</span></div>' + FOOT.map(function (g) { return '<nav aria-label="' + g[0] + '"><h2>' + g[0] + '</h2><ul>' + g[1].map(function (l) { return '<li>' + fl(l) + '</li>'; }).join('') + '</ul></nav>'; }).join('') + '</div><div class="foot-bot"><p>&copy; 2026 Kenmore. Prices and availability are set by retailers.</p><ul>' + LEGAL.map(function (l) { return '<li>' + fl(l) + '</li>'; }).join('') + '</ul></div></div>';
  logo($('#logoF'));

  /* ---------- Shared components ---------- */
  function cmpBtn(p) { var on = KC.cmp.has(p.id); return '<button type="button" class="cmpc" data-cmp="' + esc(p.id) + '" aria-pressed="' + on + '" aria-label="Compare model ' + esc(p.model) + '"><span class="box" aria-hidden="true">' + (on ? '&#10003;' : '') + '</span>Compare</button>'; }
  function card(p, k, opts) {
    opts = opts || {}; var c = D.categories[p.cat];
    return '<li class="card' + (opts.enter ? ' enter' : '') + '"' + (opts.rv ? ' data-rv style="--d:' + (k * .05) + 's"' : ' style="--k:' + k + '"') + '>' + KC.img(p.img, '', '', 'Product image') +
      '<div class="b"><span class="cl">' + esc(p.subName || c.name) + '</span><h3><a href="' + KC.pLink(p) + '">' + esc(p.name) + '</a></h3><span class="mn">Model ' + esc(p.model) + '</span>' +
      ((p.flags || []).length ? '<ul class="tags" aria-label="Highlights">' + p.flags.slice(0, 3).map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' : '') +
      '<div class="f"><span class="price">Check price at retailer</span>' + (opts.cmp !== false ? cmpBtn(p) : '') + '</div></div></li>';
  }
  function crumbs(list) { return '<nav aria-label="Breadcrumb"><ol class="crumbs">' + list.map(function (c, k) { return '<li>' + (c[1] && k < list.length - 1 ? '<a href="' + c[1] + '">' + esc(c[0]) + '</a>' : '<span' + (k === list.length - 1 ? ' aria-current="page"' : '') + '>' + esc(c[0]) + '</span>') + '</li>'; }).join('') + '</ol></nav>'; }
  function mask(text, k) { return '<span class="mask" style="--i:' + k + '"><span>' + text + '</span></span>'; }

  /* ================= HOME ================= */
  var hi = 0;
  function home() {
    setTitle('Home');
    var feat = ['46-75525', '22-96853', '22-14625', '26-41202', 'BC4030', '46-61335', '22-75293', '26-81202'].map(KC.byId);
    app.innerHTML =
      '<section class="hero" aria-labelledby="heroT"><div class="wrap hero-grid">' +
        '<div class="mod hero-main ld" style="--i:1"><div class="hero-copy"><div><p class="kicker">Kenmore &middot; 100+ years of trusted performance</p><h1 class="H1" id="heroT">' + mask('Made for', 1) + mask('real life.', 2) + '</h1><p class="lead">Refrigeration, cooking, dishwashers, laundry and floor care for busy homes. Pick a category to see a real Kenmore model, then shop the full range.</p></div>' +
          '<div><div class="swtabs" role="tablist" aria-label="Featured category">' + HERO.map(function (h, k) { return '<button type="button" role="tab" id="sw-' + k + '" aria-controls="swp" aria-selected="' + (k === hi) + '" tabindex="' + (k === hi ? 0 : -1) + '" data-sw="' + k + '">' + esc(h[1]) + '</button>'; }).join('') + '</div></div></div>' +
          '<div class="swstage" id="swp" role="tabpanel" aria-labelledby="sw-' + hi + '" aria-live="polite">' + swInner(hi) + '</div></div>' +
        '<div class="side"><div class="mod m-own ld" style="--i:3"><div><p class="kicker">Own a Kenmore?</p><h2 class="H3">Find your model</h2><p>Search the models in this prototype, or jump to Kenmore’s manual search.</p></div><form class="inl" data-sform><label class="sr-only" for="ownQ">Model number or product name</label><input id="ownQ" type="search" placeholder="e.g. 22-14625" autocomplete="off"><button class="btn" type="submit">Search</button></form></div>' +
          '<div class="mod m-buy ld" style="--i:4"><div><p class="kicker">Where to buy</p><h2 class="H3">See Kenmore near you</h2><p>Enter a ZIP code to find retailers that carry Kenmore.</p></div><form class="inl" id="heroZip" novalidate><label class="sr-only" for="heroZipIn">ZIP code</label><input id="heroZipIn" inputmode="numeric" maxlength="5" placeholder="ZIP code" autocomplete="postal-code"><button class="btn" type="submit">Find</button></form></div></div>' +
      '</div></section>' +
      '<nav class="secnav" aria-label="On this page"><div class="wrap"><ul>' + [['cats', 'Categories'], ['featured', 'Featured'], ['ideas', 'Ideas'], ['buy', 'Where to buy'], ['support', 'Support']].map(function (s) { return '<li><a href="#/?to=' + s[0] + '" data-to="' + s[0] + '" data-spy="' + s[0] + '">' + s[1] + '</a></li>'; }).join('') + '</ul></div></nav>' +
      '<section class="sec" id="cats" aria-labelledby="catsT"><div class="wrap"><div class="sec-head"><div><p class="kicker" data-rv>Shop by category</p><h2 class="H2" id="catsT" data-rv style="--d:.05s">What do you need?</h2></div></div><ul class="ctiles">' +
        HERO.map(function (h, k) { var c = D.categories[h[0]], p = KC.byId(h[2]); return '<li data-rv style="--d:' + (k * .05) + 's"><a class="ct" href="' + KC.cLink(h[0]) + '">' + KC.img(p.img, '', '', h[1]) + '<b><span>' + esc(h[1]) + '<small>' + esc(c.subs.map(function (s) { return s.name; }).slice(0, 3).join(' · ')) + '</small></span>' + i('arrow') + '</b></a></li>'; }).join('') +
        '<li data-rv style="--d:.25s"><div class="ct more"><b style="margin-bottom:8px">More from Kenmore</b><ul>' + D.menu[1].links.slice(3).concat(D.menu[5].links).map(function (l) { return '<li>' + mLink(l) + '</li>'; }).join('') + '</ul></div></li></ul></div></section>' +
      '<section class="sec" id="featured" aria-labelledby="fT" style="padding-top:0"><div class="wrap"><div class="sec-head"><div><p class="kicker" data-rv>Featured</p><h2 class="H2" id="fT" data-rv style="--d:.05s">Real models, every room.</h2></div><p class="lead" data-rv>Across refrigeration, cooking, dishwashers, laundry and floor care. Tap any model for photos, features, specs and manuals.</p></div><ul class="grid">' + feat.map(function (p, k) { return card(p, k, { rv: true, cmp: false }); }).join('') + '</ul></div></section>' +
      '<section class="sec" id="ideas" aria-labelledby="iT" style="padding-top:0"><div class="wrap"><div class="sec-head"><div><p class="kicker" data-rv>Ideas from livemore&trade;</p><h2 class="H2" id="iT" data-rv style="--d:.05s">Real tips for real homes.</h2></div>' + KC.ext(L.livemore, 'All ideas ' + i('out'), 'alink') + '</div><div class="bento">' + D.stories.map(function (s, k) { return '<a class="idea' + (k === 0 ? ' big' : '') + '" href="' + s.url + '" target="_blank" rel="noopener" data-ext data-rv style="--d:' + (k * .06) + 's">' + KC.img(s.img, s.alt, 'cover', 'Story image') + '<span class="cap"><small>' + esc(s.tag) + '</small><b>' + esc(s.title) + '</b>' + (s.stock ? '<span class="flagb">Stock image &middot; licence pending</span>' : '') + '</span><span class="sr-only"> (opens livemore in a new tab)</span></a>'; }).join('') + '</div></div></section>' +
      '<section class="sec" id="buy" aria-labelledby="bT" style="padding-top:0"><div class="wrap"><div class="buyband" data-rv><div><p class="kicker">Where to buy</p><h2 class="H2" id="bT" style="margin-top:12px">Find it nearby.</h2><p class="lead" style="margin-top:12px">Kenmore appliances are sold through retail partners in stores and online. Prices and availability are set by each retailer.</p><form class="inl" id="zipF" novalidate><label class="sr-only" for="zip">ZIP code</label><input id="zip" inputmode="numeric" maxlength="5" placeholder="5-digit ZIP code" autocomplete="postal-code" aria-describedby="zipH zipE"><button class="btn" type="submit">Find retailers</button></form><p class="hint" id="zipH">US only. Results come from the Kenmore store locator.</p><p class="err" id="zipE" role="alert" hidden></p><div class="zres" id="zres" hidden tabindex="-1" aria-live="polite"></div></div>' +
        '<div class="bpaths">' + KC.ext(L.whereToBuy, '<span><b>Kenmore store locator</b><small>Appliances at retailers &middot; kenmore.com</small></span>' + i('out')) + KC.ext(L.fcStore, '<span><b>Floor care, direct</b><small>Vacuums &amp; carpet cleaners &middot; kenmorefloorcare.com</small></span>' + i('out')) + '<a href="#/c/refrigerators"><span><b>Compare before you go</b><small>Shortlist up to 3 models side by side</small></span>' + i('arrow') + '</a></div></div></div></section>' +
      '<section class="sec" id="support" aria-labelledby="sT" style="padding-top:0"><div class="wrap"><div class="sec-head"><div><p class="kicker" data-rv>Customer care</p><h2 class="H2" id="sT" data-rv style="--d:.05s">Already own one? We’ve got you.</h2></div></div><ul class="tasks">' + [['book', 'Manuals', 'Use & care guides by model', L.manuals], ['check', 'Register', 'Keep warranty details on file', L.register], ['wrench', 'Repair', 'Sears Home Services', L.repair], ['gear', 'Parts', 'Sears PartsDirect', L.parts]].map(function (s, k) { return '<li data-rv style="--d:' + (k * .05) + 's">' + KC.ext(s[3], '<span class="ic">' + i(s[0]) + '</span><span><b>' + esc(s[1]) + '</b><small>' + esc(s[2]) + ' &middot; ' + esc(KC.host(s[3])) + '</small></span><span class="alink">Open ' + i('out') + '</span>', 'task') + '</li>'; }).join('') + '</ul><div class="suprow">' + [['Customer care', L.care], ['Warranty', L.warranty], ['Product recalls', L.recalls], ['Contact us', L.contact], ['Floor care support', L.fcCare]].map(function (s) { return KC.ext(s[1], esc(s[0])); }).join('') + '</div></div></section>';
    bindSwitcher(); bindZip();
    KC.spy('.secnav a[data-spy], .hlinks a[data-spy]');
  }
  function swInner(k) { var h = HERO[k], p = KC.byId(h[2]); return KC.img(p.img, p.name, '', 'Product image') + '<div class="info"><div><b>' + esc(p.name) + '</b><small>Model ' + esc(p.model) + '</small></div><a class="btn btn--sm" href="' + KC.cLink(h[0]) + '">Shop ' + esc(h[1]) + '</a></div>'; }
  function bindSwitcher() {
    var tabs = $$('[data-sw]'), stage = $('#swp'), T;
    function sel(k, focus) {
      if (k === hi) return; hi = k;
      tabs.forEach(function (t, n) { t.setAttribute('aria-selected', n === k); t.tabIndex = n === k ? 0 : -1; });
      stage.setAttribute('aria-labelledby', 'sw-' + k); if (focus) tabs[k].focus();
      clearTimeout(T);
      if (KC.reduced) { stage.innerHTML = swInner(k); return; }
      stage.classList.add('out');
      T = setTimeout(function () { stage.innerHTML = swInner(k); stage.classList.remove('out'); stage.classList.add('pre'); void stage.offsetWidth; stage.classList.remove('pre'); }, 150);
    }
    tabs.forEach(function (t, n) { t.addEventListener('click', function () { sel(n); }); t.addEventListener('keydown', function (e) { var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (d) { e.preventDefault(); sel((hi + d + tabs.length) % tabs.length, true); } }); });
  }
  function zipResult(v) { var out = $('#zres'); out.innerHTML = '<p class="kicker">Prototype response</p><h3 class="H3" style="margin:8px 0">Retailers near ' + esc(v) + '</h3><p class="lead" style="font-size:.9rem;margin-bottom:14px">In production, nearby stores would load here from the Kenmore store locator.</p>' + KC.ext(L.whereToBuy, 'Open store locator ' + i('out'), 'btn btn--sm'); out.hidden = false; }
  function bindZip() {
    $$('#zip,#heroZipIn').forEach(function (x) { x.addEventListener('input', function () { this.value = this.value.replace(/\D/g, '').slice(0, 5); }); });
    $('#zipF').addEventListener('submit', function (e) { e.preventDefault(); var v = $('#zip').value, er = $('#zipE'); if (!/^\d{5}$/.test(v)) { er.textContent = 'Enter a 5-digit US ZIP code.'; er.hidden = false; $('#zip').setAttribute('aria-invalid', 'true'); $('#zip').focus(); return; } er.hidden = true; $('#zip').removeAttribute('aria-invalid'); zipResult(v); $('#zres').focus(); });
    $('#heroZip').addEventListener('submit', function (e) { e.preventDefault(); var inp = $('#heroZipIn'), v = inp.value; if (!/^\d{5}$/.test(v)) { inp.setAttribute('aria-invalid', 'true'); KC.toast('Enter a 5-digit ZIP code'); inp.focus(); return; } inp.removeAttribute('aria-invalid'); $('#zip').value = v; zipResult(v); KC.scrollTo('buy'); setTimeout(function () { $('#zres').focus({ preventScroll: true }); }, KC.reduced ? 0 : 600); });
  }

  /* ================= CATEGORY (reusable template) ================= */
  var CUR = null, dense = false;
  function category(r) {
    var c = D.categories[r.id]; CUR = { id: r.id, st: KC.state(r.id, r.q) };
    setTitle(c.name);
    var cr = [['Home', '#/']].concat(c.crumbs.map(function (x) { return [x[0], null]; })).concat([[c.name, null]]);
    app.innerHTML = '<div class="wrap">' + crumbs(cr) +
      '<header class="chead"><div><p class="kicker ld" style="--i:1">' + esc(c.group) + (c.external ? ' &middot; ' + esc(c.external) : '') + '</p><h1 class="H1">' + mask(esc(c.name), 1) + '</h1></div><div><p class="lead ld" style="--i:3">' + esc(c.intro) + '</p><p class="ld" style="--i:4;margin-top:10px">' + KC.ext(c.live, 'See the full range on ' + esc(c.external || 'kenmore.com') + ' ' + i('out'), 'alink') + '</p></div></header>' +
      '<div class="subrail" role="group" aria-label="' + esc(c.name) + ' types" id="subrail"></div>' +
      (c.extraLinks ? '<div class="xrow">' + c.extraLinks.map(function (l) { return KC.ext(l.url, esc(l.name) + ' ↗'); }).join('') + '</div>' : '') +
      '<div class="fbar"><div class="fbar-in"><button type="button" class="btn btn--line btn--sm mfilter" id="mfBtn">' + i('filter') + ' Filter &amp; sort <span id="mfN"></span></button><div id="pops" style="display:contents"></div><span class="sp"></span><label class="sr-only" for="sort">Sort by</label><select id="sort">' + KC.sorts(c).map(function (s) { return '<option value="' + s[0] + '"' + (CUR.st.sort === s[0] ? ' selected' : '') + '>Sort: ' + s[1] + '</option>'; }).join('') + '</select><div class="dens" role="group" aria-label="Grid density"><button type="button" data-dens="0" aria-pressed="' + !dense + '" aria-label="Comfortable grid">4</button><button type="button" data-dens="1" aria-pressed="' + dense + '" aria-label="Dense grid">5</button></div></div></div>' +
      '<div class="statusrow" aria-live="polite"><p class="count" id="count"></p><div class="chips" id="chips"></div></div><ul class="grid' + (dense ? ' dense' : '') + '" id="grid"></ul></div>';
    $('#sort').addEventListener('change', function () { CUR.st.sort = this.value; update(true); });
    $('#mfBtn').addEventListener('click', function () { $('#fsBody').innerHTML = sheetHTML(); KC.openDialog($('#dlgFilters'), this); });
    update(false);
  }
  function optsFor(f) { var c = D.categories[CUR.id]; return f.type === 'sub' ? c.subs.map(function (s) { return s.id; }) : f.options; }
  function optList(f, prefix) { var key = KC.filterKey(f), counts = KC.optionCounts(CUR.id, CUR.st, f); return optsFor(f).map(function (o, k) { var id = prefix + '-' + key + '-' + k, on = (CUR.st.sel[key] || []).indexOf(o) > -1; return '<label class="fo' + (!counts[o] && !on ? ' zero' : '') + '" for="' + id + '"><input type="checkbox" id="' + id + '" data-f="' + key + '" value="' + esc(o) + '"' + (on ? ' checked' : '') + '>' + esc(KC.optLabel(CUR.id, f, o)) + '<span class="c">' + counts[o] + '</span></label>'; }).join(''); }
  function sheetHTML() { var c = D.categories[CUR.id]; return '<h3>Sort</h3><label class="sr-only" for="sortM">Sort by</label><select id="sortM" style="width:100%;height:48px;border-radius:999px;border:1px solid var(--line2);background:var(--bg);padding:0 14px">' + KC.sorts(c).map(function (s) { return '<option value="' + s[0] + '"' + (CUR.st.sort === s[0] ? ' selected' : '') + '>' + s[1] + '</option>'; }).join('') + '</select>' + c.filters.map(function (f) { return '<fieldset style="border:0;padding:0;margin:0"><legend class="sr-only">' + esc(f.label) + '</legend><h3 aria-hidden="true">' + esc(f.label) + '</h3>' + optList(f, 'm') + '</fieldset>'; }).join(''); }
  var openPop = null;
  function update(anim) {
    var c = D.categories[CUR.id], st = CUR.st, list = KC.sortList(KC.apply(CUR.id, st), st.sort), total = KC.inCat(CUR.id).length;
    KC.replace(KC.stateHash(CUR.id, st)); lastCat[CUR.id] = location.hash; try { sessionStorage.setItem('km2-lastcat', JSON.stringify(lastCat)); } catch (e) {}
    $('#count').innerHTML = '<span>' + list.length + '</span> of ' + total + ' ' + esc(c.name.toLowerCase());
    var subKey = c.subs[0] && c.subs[0].filterAs ? c.subs[0].filterAs[0] : 'sub', none = !(st.sel[subKey] || []).length;
    $('#subrail').innerHTML = '<button type="button" class="srb all" data-suball="' + subKey + '" aria-pressed="' + none + '"><span class="ic">All</span>All ' + esc(c.short || c.name) + '<small>' + total + '</small></button>' + c.subs.map(function (s) { var val = s.filterAs ? s.filterAs[1] : s.id, on = (st.sel[subKey] || []).indexOf(val) > -1, n = KC.inCat(CUR.id).filter(function (p) { return p[subKey] === val; }).length; return '<button type="button" class="srb" data-subkey="' + subKey + '" data-sub="' + esc(val) + '" aria-pressed="' + on + '">' + KC.img(s.img, '', '', '') + esc(s.name) + '<small>' + n + '</small></button>'; }).join('');
    $('#pops').innerHTML = c.filters.map(function (f, k) { var key = KC.filterKey(f), n = (st.sel[key] || []).length; return '<div class="fpop"><button type="button" data-pop="' + k + '" aria-expanded="' + (openPop === k) + '" aria-controls="fp-' + k + '"' + (n ? ' class="has"' : '') + '>' + esc(f.label) + (n ? ' <span class="n">' + n + '</span>' : '') + i('down') + '</button><div class="fpanel" id="fp-' + k + '" role="group" aria-label="' + esc(f.label) + '"' + (openPop === k ? '' : ' hidden') + '>' + optList(f, 'p') + '</div></div>'; }).join('');
    if ($('#dlgFilters').open) $('#fsBody').innerHTML = sheetHTML();
    $('#fsShow').textContent = 'Show ' + list.length + ' result' + (list.length === 1 ? '' : 's');
    var chips = []; Object.keys(st.sel).forEach(function (k) { st.sel[k].forEach(function (v) { var f = c.filters.filter(function (x) { return KC.filterKey(x) === k; })[0] || { type: k === 'sub' ? 'sub' : '' }; chips.push('<button type="button" class="chip" data-rm="' + k + '" data-v="' + esc(v) + '">' + esc(KC.optLabel(CUR.id, f, v)) + i('x') + '<span class="sr-only"> remove filter</span></button>'); }); });
    $('#chips').innerHTML = chips.length ? chips.join('') + '<button type="button" class="clear" data-clear>Clear filters</button>' : '';
    $('#mfN').textContent = chips.length ? '(' + chips.length + ')' : '';
    var grid = $('#grid');
    function put() {
      grid.classList.remove('out');
      grid.innerHTML = list.length ? list.map(function (p, k) { return card(p, Math.min(k, 10), { enter: true }); }).join('') : '<li class="empty"><h2 class="H3">Nothing matches those filters</h2><p>Remove a filter or clear them all to see every ' + esc((c.short || c.name).toLowerCase()) + ' model.</p><button type="button" class="btn" data-clear>Clear filters</button></li>';
    }
    if (anim && !KC.reduced) { grid.classList.add('out'); setTimeout(put, 120); } else put();
    renderCbar();
  }
  document.addEventListener('change', function (e) {
    if (e.target.id === 'sortM' && CUR) { CUR.st.sort = e.target.value; $('#sort').value = e.target.value; update(true); $('#sortM') && $('#sortM').focus(); return; }
    var inp = e.target.closest('input[data-f]'); if (!inp || !CUR) return;
    var k = inp.getAttribute('data-f'), a = CUR.st.sel[k] = CUR.st.sel[k] || [];
    if (inp.checked) { if (a.indexOf(inp.value) < 0) a.push(inp.value); } else a.splice(a.indexOf(inp.value), 1);
    var id = inp.id; update(true); var n = document.getElementById(id); if (n) n.focus();
  });
  $('#fsClear').addEventListener('click', function () { if (CUR) { CUR.st.sel = {}; update(true); } });

  /* ---------- Compare bar + compare page ---------- */
  function renderCbar() {
    var b = $('#cbar'), l = KC.cmp.list(), show = l.length > 0 && KC.parse().name !== 'compare';
    b.classList.toggle('on', show);
    if (!l.length) { b.innerHTML = ''; return; }
    var slots = l.map(function (p) { return '<span class="slot">' + KC.img(p.img, '', '', '') + esc(p.model) + '<button type="button" data-cmp="' + esc(p.id) + '" aria-label="Remove ' + esc(p.model) + '">' + i('x') + '</button></span>'; });
    for (var k = l.length; k < 3; k++) slots.push('<span class="slot empty-s">Add a model</span>');
    b.innerHTML = '<div class="wrap"><b class="H3" style="font-size:.84rem">Compare</b><div class="slots">' + slots.join('') + '</div>' + (l.length > 1 ? '<a class="btn btn--sm" href="#/compare">Compare ' + l.length + '</a>' : '<button type="button" class="btn btn--sm" disabled>Add 1 more</button>') + '<button type="button" class="clear" id="cmpClr">Clear</button></div>';
  }
  function compare() {
    setTitle('Compare');
    var l = KC.cmp.list();
    if (l.length < 2) { app.innerHTML = '<div class="wrap sec">' + crumbs([['Home', '#/'], ['Compare', null]]) + '<h1 class="H2" style="margin:18px 0">Pick 2 or 3 models to compare</h1><p class="lead" style="margin-bottom:20px">Use the Compare button on any product card in Refrigerators, Ranges, Dishwashers, Washers &amp; Dryers or Floor Care.</p><a class="btn" href="#/c/refrigerators">Browse refrigerators</a></div>'; return; }
    var c = D.categories[l[0].cat], back = lastCat[c.id] || KC.cLink(c.id);
    app.innerHTML = '<div class="wrap">' + crumbs([['Home', '#/'], [c.name, back], ['Compare', null]]) + '<a class="backl" href="' + back + '">' + i('left') + 'Back to ' + esc(c.name) + '</a><header class="chead"><div><p class="kicker">Compare</p><h1 class="H1" style="font-size:clamp(2rem,4vw,3.4rem)">' + mask(esc(c.name), 1) + '</h1></div></header>' +
      '<div class="ctools"><label><input type="checkbox" id="onlyDiff"> Show only differences</label></div><div class="ctable-wrap"><table class="ctable"><caption class="sr-only">Comparison of ' + l.length + ' ' + esc(c.name.toLowerCase()) + '</caption><thead><tr><th scope="col"><span class="sr-only">Attribute</span></th>' + l.map(function (p) { return '<th scope="col">' + KC.img(p.img, '', '', '') + '<a href="' + KC.pLink(p) + '">' + esc(p.name) + '</a><br><small style="color:var(--mut)">Model ' + esc(p.model) + '</small><br><button type="button" class="clear" data-cmp="' + esc(p.id) + '" data-rerender>Remove</button></th>'; }).join('') + '</tr></thead><tbody>' +
      c.compare.map(function (row) { var v = l.map(function (p) { return KC.cmpValue(p, row[1]); }), diff = v.some(function (x) { return x !== v[0]; }); return '<tr class="' + (diff ? 'diff' : 'same') + '"><th scope="row">' + esc(row[0]) + '</th>' + v.map(function (x) { return '<td' + (x === 'Not stated' ? ' class="no"' : '') + '>' + esc(x) + '</td>'; }).join('') + '</tr>'; }).join('') +
      '<tr class="same"><th scope="row">Price</th>' + l.map(function () { return '<td class="no">Check price at retailer</td>'; }).join('') + '</tr><tr class="same"><th scope="row">Where to buy</th>' + l.map(function (p) { return '<td>' + (p.cat === 'floorcare' ? KC.ext(p.url, 'kenmorefloorcare.com ↗', 'alink') : KC.ext(L.whereToBuy, 'Store locator ↗', 'alink')) + '</td>'; }).join('') + '</tr></tbody></table></div><p class="note">Values come from Kenmore product names and pages. “Not stated” means the source doesn’t mention it, not that the product lacks it. Highlighted rows differ.</p><div style="height:60px"></div></div>';
    $('#onlyDiff').addEventListener('change', function () { var on = this.checked; $$('.ctable tr.same').forEach(function (tr) { tr.hidden = on; }); });
  }

  /* ================= PRODUCT DETAIL ================= */
  var G = { list: [], k: 0 }, buyIO;
  function stats(p) {
    var s = [], d = p.pdp;
    if (p.cap) s.push([p.cap, ' cu. ft.', p.cat === 'ranges' ? 'Oven capacity' : 'Capacity']);
    if (p.width) s.push([p.width, '"', 'Width']);
    if (p.placeSettings) s.push([+p.placeSettings, '', 'Place settings']);
    if (p.dba) s.push([parseInt(p.dba, 10), ' dBA', 'Noise level']);
    if (p.id === '22-96853') s.push([3700, 'W', 'Turbo Boil® element']);
    if (p.id === '22-75293') s.push([18000, ' BTU', 'Turbo Boil® burner']);
    if (p.id === '22-95163') s.push([5, '', 'Cooktop elements']);
    if (p.id === '26-41202') s.push([1400, ' RPM', 'Max spin speed']);
    if (p.id === '26-81202') s.push([15, '', 'Dry cycles']);
    if (p.id === 'BC4030') { s.push([26, ' ft', 'Auto-rewind cord']); s.push([9.5, ' ft', 'Telescoping reach']); }
    if (p.power) s.push([null, p.power, 'Power']);
    if (p.bag) s.push([null, p.bag, 'Bag']);
    (p.flags || []).forEach(function (f) { s.push([null, f, 'Feature']); });
    return s.slice(0, 4);
  }
  function pdp(r) {
    var p = KC.byId(r.id), c = D.categories[p.cat], d = p.pdp, back = lastCat[p.cat] || KC.cLink(p.cat), sub = c.subs.filter(function (s) { return s.id === p.sub; })[0], store = p.cat === 'floorcare';
    setTitle(p.model + ' ' + c.name);
    var cr = [['Home', '#/']].concat(c.crumbs.map(function (x) { return [x[0], null]; })).concat([[c.name, KC.cLink(p.cat)]]).concat(sub ? [[sub.name, KC.cLink(p.cat, 'sub=' + sub.id)]] : []).concat([[p.model, null]]);
    G.list = d ? d.images : [p.img]; G.k = 0;
    var manual = d ? d.docs[0] : { label: store ? 'Floor care support' : 'Find the manual', url: store ? L.fcCare : L.manuals };
    var buyBtn = store ? KC.ext(p.url, 'Shop at kenmorefloorcare.com ' + i('out'), 'btn') : KC.ext(L.whereToBuy, 'Where to buy ' + i('out'), 'btn');
    var st = stats(p);
    app.innerHTML = '<div class="wrap">' + crumbs(cr) + '<a class="backl" href="' + back + '">' + i('left') + 'Back to ' + esc(c.name) + '</a>' +
      '<div class="pgal"><section aria-label="Product images"><div class="pstage ld" style="--i:1" id="stage" tabindex="0" aria-roledescription="carousel" aria-label="' + esc(p.name) + ' images. Use arrow keys to browse.">' + KC.img(G.list[0], p.name + ', image 1', '', 'Product image') + (G.list.length > 1 ? '<span class="num" id="gnum" aria-live="polite">1 / ' + G.list.length + '</span><span class="ctl"><button type="button" data-gs="-1" aria-label="Previous image">' + i('left') + '</button><button type="button" data-gs="1" aria-label="Next image">' + i('right') + '</button></span>' : '') + '</div>' +
        (G.list.length > 1 ? '<div class="strip" id="strip">' + G.list.map(function (s, k) { return '<button type="button" data-g="' + k + '" aria-label="Image ' + (k + 1) + ' of ' + G.list.length + '"' + (k === 0 ? ' aria-current="true"' : '') + '>' + KC.img(s, '', '', String(k + 1)) + '</button>'; }).join('') + '</div>' : '') + '</section>' +
      '<aside class="ppanel ld" style="--i:2" id="ppanel"><p class="kicker">' + esc(c.group) + ' &middot; ' + esc(p.subName || c.name) + '</p><h1>' + esc(p.name) + '</h1><p class="mrow">Model ' + esc(p.model) + (p.finish ? ' &middot; ' + esc(p.finish) : '') + ' <button type="button" class="copy" data-copy="' + esc(p.model) + '">Copy model #</button></p><p class="lead" style="font-size:.95rem">' + esc(p.desc) + '</p>' +
        ((p.flags || []).length ? '<ul class="tags">' + p.flags.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' : '') +
        '<div class="pricetag"><span>Check price at retailer<small>' + (store ? 'Sold on kenmorefloorcare.com and at retailers' : 'Sold through Kenmore retail partners') + '</small></span></div>' +
        '<div class="acts">' + buyBtn + KC.ext(manual.url, esc(manual.label) + ' ' + i('out'), 'btn btn--line') + '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;justify-content:space-between">' + cmpBtn(p) + (store ? KC.ext(L.whereToBuy, 'Find a retailer ↗', 'alink') : KC.ext(p.url, 'View on kenmore.com ↗', 'alink')) + '</div></div></aside></div>' +
      (st.length ? '<section class="sec" aria-labelledby="kfT" style="padding-bottom:0"><h2 class="sr-only" id="kfT">At a glance</h2><ul class="stats">' + st.map(function (s, k) { return '<li class="stat" data-rv style="--d:' + (k * .06) + 's"><b' + (s[0] != null ? ' data-count="' + s[0] + '" data-suffix="' + esc(s[1]) + '"' : ' class="txt"') + '>' + (s[0] != null ? fmt(s[0]) + esc(s[1]) : esc(s[1])) + '</b><small>' + esc(s[2]) + '</small></li>'; }).join('') + '</ul></section>' : '') +
      (d ? '<section class="sec" aria-labelledby="ovT"><div class="sec-head"><div><p class="kicker" data-rv>Overview</p><h2 class="H2" id="ovT" data-rv style="--d:.05s">Why it works.</h2></div><p class="lead" data-rv style="max-width:62ch;font-size:1.08rem;color:var(--tx)">' + esc(d.overview) + '</p></div><ul class="ftiles">' + d.features.map(function (f, k) { return '<li class="ft" data-rv style="--d:' + (k % 3) * .05 + 's"><span class="n">' + String(k + 1).padStart(2, '0') + '</span><b>' + esc(f[0]) + '</b><p>' + esc(f[1]) + '</p></li>'; }).join('') + '</ul></section>' +
        '<section class="sec" aria-labelledby="spT" style="padding-top:0"><div class="sec-head"><div><p class="kicker" data-rv>Specifications</p><h2 class="H2" id="spT" data-rv style="--d:.05s">Specs.</h2></div></div><div class="stable">' + Object.keys(d.specs).map(function (g) { return '<div class="sgroup" data-rv><h3>' + esc(g) + '</h3><dl>' + Object.keys(d.specs[g]).map(function (x) { return '<dt>' + esc(x) + '</dt><dd>' + esc(d.specs[g][x]) + '</dd>'; }).join('') + '</dl></div>'; }).join('') + '</div><p class="note">Specifications come from the text of Kenmore’s product page. Full dimensions and electrical data are in the documents below and on ' + KC.ext(p.url, esc(KC.host(p.url))) + '.</p></section>' +
        '<section class="sec" aria-labelledby="dT" style="padding-top:0"><div class="sec-head"><div><p class="kicker" data-rv>Manuals &amp; support</p><h2 class="H2" id="dT" data-rv style="--d:.05s">Documents.</h2></div></div><ul class="dgrid">' + d.docs.concat(store ? [] : [{ label: 'Register this product', url: L.register }, { label: 'Customer care', url: L.care }]).map(function (x) { return '<li data-rv>' + KC.ext(x.url, '<span class="ic">' + i('file') + '</span><span><b>' + esc(x.label) + '</b><span class="xhost">' + esc(KC.host(x.url)) + '</span></span>', 'doc') + '</li>'; }).join('') + '</ul></section>'
      : '<section class="sec" aria-labelledby="kdT"><div class="sec-head"><div><p class="kicker" data-rv>Key details</p><h2 class="H2" id="kdT" data-rv style="--d:.05s">From the Kenmore listing.</h2></div></div><div class="stable"><div class="sgroup"><h3>Listing details</h3><dl>' + c.compare.map(function (row) { var v = KC.cmpValue(p, row[1]); return v === 'Not stated' ? '' : '<dt>' + esc(row[0]) + '</dt><dd>' + esc(v) + '</dd>'; }).join('') + '<dt>Model</dt><dd>' + esc(p.model) + '</dd></dl></div><div class="sgroup"><h3>Full details &amp; manuals</h3><p style="padding:10px 0;color:var(--tx2);font-size:.9rem">This prototype carries listing-level data for this model. Features, specifications and documents are on its live page.</p><div class="acts" style="display:grid;gap:10px;padding-bottom:12px">' + KC.ext(p.url, 'Open on ' + esc(KC.host(p.url)) + ' ' + i('out'), 'btn btn--line') + KC.ext(store ? L.fcCare : L.manuals, (store ? 'Floor care support' : 'Search manuals by model') + ' ' + i('out'), 'btn btn--line') + '</div></div></div></section>') +
      '<section class="sec" aria-labelledby="rlT" style="padding-top:0"><div class="sec-head"><div><p class="kicker" data-rv>Similar models</p><h2 class="H2" id="rlT" data-rv style="--d:.05s">Compare with.</h2></div><a class="alink" href="' + back + '">All ' + esc(c.name.toLowerCase()) + ' ' + i('arrow') + '</a></div><ul class="grid">' + related(p).map(function (x, k) { return card(x, k, { rv: true }); }).join('') + '</ul></section></div>';
    $('#buybar').innerHTML = '<div class="wrap"><div class="t"><b>' + esc(p.name) + '</b><small>Model ' + esc(p.model) + ' &middot; Check price at retailer</small></div>' + buyBtn.replace('class="btn"', 'class="btn btn--sm"') + KC.ext(manual.url, 'Manual ' + i('out'), 'btn btn--line btn--sm') + '</div>';
    bindGallery(p); countUp(); watchBuy();
    renderCbar();
  }
  function fmt(n) { return n >= 1000 ? n.toLocaleString('en-US') : String(n); }
  function countUp() {
    var els = $$('[data-count]'); if (KC.reduced || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (!e.isIntersecting) return; io.unobserve(e.target); var el = e.target, to = parseFloat(el.getAttribute('data-count')), suf = el.getAttribute('data-suffix'), dec = String(to).indexOf('.') > -1 ? 1 : 0, t0 = performance.now(); function f(t) { var k = Math.min(1, (t - t0) / 700), v = to * (1 - Math.pow(1 - k, 3)); el.textContent = (dec ? v.toFixed(1) : fmt(Math.round(v))) + suf; if (k < 1) requestAnimationFrame(f); else el.textContent = fmt(to) + suf; } requestAnimationFrame(f); }); }, { threshold: .6 });
    els.forEach(function (e) { io.observe(e); });
  }
  function watchBuy() {
    var bb = $('#buybar'), pan = $('#ppanel'); if (buyIO) buyIO.disconnect();
    if (!pan || !('IntersectionObserver' in window)) return;
    buyIO = new IntersectionObserver(function (es) { var show = !es[0].isIntersecting && es[0].boundingClientRect.top < 0 && !KC.cmp.list().length; bb.classList.toggle('on', show); bb.setAttribute('aria-hidden', !show); $$('a', bb).forEach(function (a) { a.tabIndex = show ? 0 : -1; }); });
    buyIO.observe(pan);
  }
  function related(p) { var s = KC.inCat(p.cat).filter(function (x) { return x.id !== p.id; }); s.sort(function (a, b) { return (b.sub === p.sub) - (a.sub === p.sub) || (b.full - a.full) || a.order - b.order; }); return s.slice(0, 4); }
  function show(k, p) {
    G.k = (k + G.list.length) % G.list.length;
    var m = $('#stage .media'); if (!m) return;
    $$('#strip button').forEach(function (b, n) { if (n === G.k) { b.setAttribute('aria-current', 'true'); var sp = b.parentNode; if (b.offsetLeft < sp.scrollLeft || b.offsetLeft + b.offsetWidth > sp.scrollLeft + sp.clientWidth) sp.scrollLeft = b.offsetLeft - 8; } else b.removeAttribute('aria-current'); });
    var gn = $('#gnum'); if (gn) gn.textContent = (G.k + 1) + ' / ' + G.list.length;
    function swap() { m.outerHTML = KC.img(G.list[G.k], p.name + ', image ' + (G.k + 1), '', 'Product image'); }
    if (KC.reduced) swap(); else { m.classList.add('out'); setTimeout(swap, 130); }
  }
  function bindGallery(p) {
    var stage = $('#stage'), strip = $('#strip');
    if (strip) strip.addEventListener('click', function (e) { var b = e.target.closest('[data-g]'); if (b) show(+b.getAttribute('data-g'), p); });
    stage.addEventListener('click', function (e) { var b = e.target.closest('[data-gs]'); if (b) show(G.k + +b.getAttribute('data-gs'), p); });
    stage.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); show(G.k + 1, p); } if (e.key === 'ArrowLeft') { e.preventDefault(); show(G.k - 1, p); } });
    var x0 = null; stage.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(G.k + (dx < 0 ? 1 : -1), p); x0 = null; });
  }

  /* ================= SEARCH (inline combobox + results page) ================= */
  var hs = $('#hsIn'), drop = $('#drop');
  function hideDrop() { drop.hidden = true; hs.setAttribute('aria-expanded', 'false'); }
  function dropHTML(q) {
    if (!q.trim()) return '<h3>Popular</h3><div class="chips" style="padding:4px 10px 10px">' + ['French door', 'Induction', '22-14625', 'Front load', 'Canister', 'BC4030'].map(function (x) { return '<button type="button" class="chip" data-q="' + x + '">' + x + '</button>'; }).join('') + '</div>';
    var r = KC.search(q);
    if (!r.products.length && !r.cats.length) return '<p class="none"><b>No matches for “' + esc(q) + '”.</b> Try a category like “dryer”, check the model number, or ' + KC.ext(L.manuals, 'search Kenmore manuals') + '.</p>';
    return (r.products.length ? '<h3>Products</h3>' + r.products.slice(0, 5).map(function (p) { return '<a class="opt" href="' + KC.pLink(p) + '">' + KC.img(p.img, '', '', '') + '<span>' + esc(p.name) + '<small>Model ' + esc(p.model) + ' &middot; ' + esc(D.categories[p.cat].name) + '</small></span></a>'; }).join('') : '') +
      (r.cats.length ? '<h3>Categories</h3>' + r.cats.map(function (c) { return '<a class="opt" href="' + KC.cLink(c.id) + '"><span>' + esc(c.name) + '<small>' + KC.inCat(c.id).length + ' models</small></span></a>'; }).join('') : '') +
      '<a class="opt" href="#/search?q=' + encodeURIComponent(q) + '"><span><b>See all results for “' + esc(q) + '”</b></span></a>';
  }
  function showDrop() { drop.innerHTML = dropHTML(hs.value); drop.hidden = false; hs.setAttribute('aria-expanded', 'true'); }
  hs.addEventListener('focus', showDrop); hs.addEventListener('input', showDrop);
  hs.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown') { var f = drop.querySelector('a,button'); if (f) { e.preventDefault(); f.focus(); } } if (e.key === 'Escape') hideDrop(); });
  drop.addEventListener('keydown', function (e) { var it = $$('a,button', drop), k = it.indexOf(document.activeElement); if (e.key === 'ArrowDown') { e.preventDefault(); (it[k + 1] || it[k]).focus(); } if (e.key === 'ArrowUp') { e.preventDefault(); if (k <= 0) hs.focus(); else it[k - 1].focus(); } if (e.key === 'Escape') { hideDrop(); hs.focus(); } });
  drop.addEventListener('click', function (e) { var c = e.target.closest('[data-q]'); if (c) { hs.value = c.getAttribute('data-q'); showDrop(); hs.focus(); return; } if (e.target.closest('a[href^="#/"]')) { hideDrop(); hs.blur(); } });
  $('#hsForm').addEventListener('submit', function (e) { e.preventDefault(); var q = hs.value.trim(); if (!q) { hs.focus(); return; } hideDrop(); hs.blur(); location.hash = '#/search?q=' + encodeURIComponent(q); });
  document.addEventListener('click', function (e) { if (!e.target.closest('#hsForm')) hideDrop(); });
  document.addEventListener('keydown', function (e) { if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !document.querySelector('dialog[open]')) { e.preventDefault(); hs.focus(); } });
  function searchPage(r) {
    var q = (r.q.q || [''])[0], res = KC.search(q); setTitle('Search');
    app.innerHTML = '<div class="wrap">' + crumbs([['Home', '#/'], ['Search', null]]) + '<header class="chead"><div><p class="kicker">Search</p><h1 class="H1" style="font-size:clamp(1.9rem,4vw,3.4rem)">' + mask(q ? 'Results for “' + esc(q) + '”' : 'Search', 1) + '</h1></div><p class="count" style="font-weight:700">' + res.products.length + ' product' + (res.products.length === 1 ? '' : 's') + '</p></header>' +
      (res.cats.length ? '<div class="chips" style="margin-bottom:18px">' + res.cats.map(function (c) { return '<a class="chip" href="' + KC.cLink(c.id) + '">' + esc(c.name) + ' ' + i('arrow') + '</a>'; }).join('') + '</div>' : '') +
      (res.products.length ? '<ul class="grid">' + res.products.map(function (p, k) { return card(p, k, { rv: true }); }).join('') + '</ul>' : '<div class="empty"><h2 class="H3">No results' + (q ? ' for “' + esc(q) + '”' : '') + '</h2><p>This prototype includes ' + D.products.length + ' Kenmore models. Check the model number (usually on a label inside the door or on the back panel), try a category, or search Kenmore’s manuals.</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a class="btn" href="#/c/refrigerators">Refrigerators</a><a class="btn btn--line" href="#/c/laundry">Washers &amp; dryers</a>' + KC.ext(L.manuals, 'Search manuals ' + i('out'), 'btn btn--line') + '</div></div>') + '</div>';
  }
  function notFound() { setTitle('Not found'); app.innerHTML = '<div class="wrap sec"><h1 class="H2">That page isn’t in this prototype.</h1><p class="lead" style="margin:14px 0 22px">Go back home or search for a product.</p><a class="btn" href="#/">Homepage</a></div>'; }

  /* ---------- Global delegation ---------- */
  document.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-cmp]'))) { var id = t.getAttribute('data-cmp'), res = KC.cmp.toggle(id); if (!res.ok) { KC.toast(res.msg); return; } $$('.cmpc[data-cmp="' + id + '"]').forEach(function (b) { b.outerHTML = cmpBtn(KC.byId(id)); }); if (t.hasAttribute('data-rerender')) compare(); renderCbar(); if (!t.hasAttribute('data-rerender')) KC.toast(res.on ? 'Added to compare' : 'Removed from compare'); var bb = $('#buybar'); if (bb) bb.classList.remove('on'); return; }
    if (e.target.closest('#cmpClr')) { KC.cmp.clear(); renderCbar(); $$('.cmpc[aria-pressed="true"]').forEach(function (b) { b.outerHTML = cmpBtn(KC.byId(b.getAttribute('data-cmp'))); }); return; }
    if ((t = e.target.closest('[data-pop]'))) { var k = +t.getAttribute('data-pop'); openPop = openPop === k ? null : k; $$('.fpanel').forEach(function (p, n) { p.hidden = n !== openPop; }); $$('[data-pop]').forEach(function (b, n) { b.setAttribute('aria-expanded', n === openPop); }); if (openPop != null) { var f = $('#fp-' + k + ' input'); f && f.focus(); } return; }
    if (openPop != null && !e.target.closest('.fpop')) { openPop = null; $$('.fpanel').forEach(function (p) { p.hidden = true; }); $$('[data-pop]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); }); }
    if ((t = e.target.closest('[data-dens]'))) { dense = t.getAttribute('data-dens') === '1'; $('#grid').classList.toggle('dense', dense); $$('[data-dens]').forEach(function (b) { b.setAttribute('aria-pressed', (b.getAttribute('data-dens') === '1') === dense); }); return; }
    if ((t = e.target.closest('[data-suball]'))) { CUR.st.sel[t.getAttribute('data-suball')] = []; update(true); return; }
    if ((t = e.target.closest('[data-sub]'))) { var sk = t.getAttribute('data-subkey'), v = t.getAttribute('data-sub'), a = CUR.st.sel[sk] || []; CUR.st.sel[sk] = a.indexOf(v) > -1 ? [] : [v]; update(true); var nb = $('[data-sub="' + v + '"]'); if (nb) nb.focus(); return; }
    if ((t = e.target.closest('[data-rm]'))) { var rk = t.getAttribute('data-rm'); CUR.st.sel[rk] = (CUR.st.sel[rk] || []).filter(function (x) { return x !== t.getAttribute('data-v'); }); update(true); $('#sort').focus(); return; }
    if (e.target.closest('[data-clear]')) { CUR.st.sel = {}; update(true); return; }
    if ((t = e.target.closest('[data-copy]'))) { var m = t.getAttribute('data-copy'); if (navigator.clipboard) navigator.clipboard.writeText(m).then(function () { KC.toast('Model ' + m + ' copied'); }, function () { KC.toast('Model number: ' + m); }); else KC.toast('Model number: ' + m); return; }
    if ((t = e.target.closest('a[data-to]')) && KC.parse().name === 'home') { e.preventDefault(); var d = t.closest('dialog'); if (d) { d._opener = null; KC.closeDialog(d); } KC.scrollTo(t.getAttribute('data-to')); KC.replace('#/?to=' + t.getAttribute('data-to')); return; }
    if ((t = e.target.closest('dialog a[href^="#/"]'))) { var dd = t.closest('dialog'); dd._opener = null; KC.closeDialog(dd); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && openPop != null) { var b = $('[data-pop="' + openPop + '"]'); openPop = null; $$('.fpanel').forEach(function (p) { p.hidden = true; }); if (b) { b.setAttribute('aria-expanded', 'false'); b.focus(); } } });
  document.addEventListener('submit', function (e) {
    var f = e.target.closest('[data-sform]'); if (!f) return; e.preventDefault();
    var q = f.querySelector('input').value.trim(); if (!q) { f.querySelector('input').focus(); return; }
    var hit = KC.search(q).products; location.hash = hit.length === 1 || (hit[0] && KC.norm(hit[0].model) === KC.norm(q)) ? KC.pLink(hit[0]) : '#/search?q=' + encodeURIComponent(q);
  });

  KC.initDialogs();
  requestAnimationFrame(function () { $('#page').classList.add('is-loaded'); });
  KC.start(function (r) {
    setMega(false); hideDrop(); CUR = null; openPop = null; if (buyIO) buyIO.disconnect(); $('#buybar').classList.remove('on');
    $$('dialog[open]').forEach(function (d) { d._opener = null; KC.closeDialog(d); });
    app.classList.remove('view'); void app.offsetWidth; app.classList.add('view');
    if (r.name === 'home') home(); else if (r.name === 'cat') category(r); else if (r.name === 'pdp') pdp(r); else if (r.name === 'search') searchPage(r); else if (r.name === 'compare') compare(); else notFound();
    if (r.name !== 'home') { KC.spy('.none-spy'); $$('.hlinks a').forEach(function (a) { a.classList.remove('is-active'); a.removeAttribute('aria-current'); }); }
    renderCbar(); KC.reveal(app);
    requestAnimationFrame(function () { requestAnimationFrame(function () { $$('.mask', app).forEach(function (m) { m.classList.add('in'); }); }); });
  });
  window.KM_READY = true;
})();
