/* Kenmore prototype V1 · The Considered Home — views and interactions */
(function () {
  var KC = window.KC, D = KC.D, $ = KC.$, $$ = KC.$$, esc = KC.esc, L = D.links;
  var app = $('#app'), lastCat = {};
  try { lastCat = JSON.parse(sessionStorage.getItem('km1-lastcat') || '{}'); } catch (e) {}
  function i(name) { return '<svg class="i" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }
  function extLink(url, text, cls) { return KC.ext(url, text + ' ' + i('out'), cls); }
  function menuLink(l, cls) { return l.route ? '<a class="' + (cls || '') + '" href="' + l.route + '">' + esc(l.name) + '</a>' : KC.ext(l.url, esc(l.name) + ' <span class="ext-note">' + esc(KC.host(l.url)) + ' ' + i('out') + '</span>', cls); }

  /* ---------- Logo (real Kenmore wordmark, inverted for dark) ---------- */
  function logo(img) { img.src = D.logo; img.onerror = function () { img.outerHTML = '<span class="wm">Kenmore</span>'; }; }
  logo($('#logoImg'));

  /* ---------- Mega menu: two panes (groups | links) + feature image ---------- */
  var mega = $('#mega'), megaBtn = $('#megaBtn'), megaIn = $('#megaIn'), gi = 0;
  function renderMega() {
    megaIn.innerHTML = '<div class="mega-groups" role="tablist" aria-label="Product groups" aria-orientation="vertical">' + D.menu.map(function (m, k) { return '<button type="button" role="tab" id="mg-' + k + '" aria-controls="mp" data-g="' + k + '">' + esc(m.group) + i('right') + '</button>'; }).join('') + '</div><div class="mega-pane" role="tabpanel" id="mp"></div><div class="mega-feat" id="mfeat"></div>';
    pane();
  }
  function pane() {
    var g = D.menu[gi];
    $$('[data-g]', megaIn).forEach(function (b, k) { b.setAttribute('aria-selected', k === gi); b.tabIndex = k === gi ? 0 : -1; });
    $('#mp').setAttribute('aria-labelledby', 'mg-' + gi);
    $('#mp').innerHTML = '<h3>' + esc(g.group) + '</h3><ul>' + g.links.map(function (l) { return '<li>' + menuLink(l) + '</li>'; }).join('') + '</ul>';
    $('#mfeat').innerHTML = (g.img ? KC.img(g.img, '', '', 'Product image') : '<span class="media dark"><span class="ph"><span>Air &amp; water products live on Kenmore partner sites</span></span></span>') + '<span class="cap">' + esc(g.group) + '</span>';
  }
  renderMega();
  function setMega(open, focusFirst) { megaBtn.setAttribute('aria-expanded', open); mega.classList.toggle('is-open', open); if (open && focusFirst) $('#mg-' + gi).focus(); }
  megaBtn.addEventListener('click', function () { setMega(megaBtn.getAttribute('aria-expanded') !== 'true', true); });
  var hoverT;
  megaBtn.addEventListener('mouseenter', function () { if (matchMedia('(hover:hover)').matches) { clearTimeout(hoverT); hoverT = setTimeout(function () { setMega(true); }, 120); } });
  $('#hdr').addEventListener('mouseleave', function () { clearTimeout(hoverT); if (matchMedia('(hover:hover)').matches && mega.classList.contains('is-open') && !mega.contains(document.activeElement)) setMega(false); });
  megaIn.addEventListener('mouseover', function (e) { var b = e.target.closest('[data-g]'); if (b && +b.getAttribute('data-g') !== gi) { gi = +b.getAttribute('data-g'); pane(); } });
  megaIn.addEventListener('click', function (e) { var b = e.target.closest('[data-g]'); if (b) { gi = +b.getAttribute('data-g'); pane(); b.focus(); } if (e.target.closest('a')) setMega(false); });
  megaIn.addEventListener('keydown', function (e) {
    var b = e.target.closest('[data-g]'); if (!b) return;
    var n = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
    if (n) { e.preventDefault(); gi = (gi + n + D.menu.length) % D.menu.length; pane(); $('#mg-' + gi).focus(); }
    if (e.key === 'ArrowRight' || e.key === 'Enter') { var a = $('#mp a'); if (a && e.key === 'ArrowRight') { e.preventDefault(); a.focus(); } }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mega.classList.contains('is-open')) { setMega(false); megaBtn.focus(); } });
  document.addEventListener('click', function (e) { if (mega.classList.contains('is-open') && document.contains(e.target) && !e.target.closest('#mega') && !e.target.closest('#megaBtn')) setMega(false); });

  /* ---------- Mobile menu ---------- */
  $('#menuBody').innerHTML = '<div class="menu-top"><a class="logo" href="#/" data-close aria-label="Kenmore home"><img id="logoM" alt="Kenmore" width="116" height="21"></a><button type="button" class="x" data-close aria-label="Close menu">' + i('x') + '</button></div>' +
    '<form class="field" role="search" data-sform style="margin:18px 0 8px"><label class="sr-only" for="mQ">Search products or model numbers</label><input id="mQ" type="search" placeholder="Product or model #"><button type="submit" aria-label="Search">' + i('search') + '</button></form>' +
    D.menu.map(function (m) { return '<details><summary>' + esc(m.group) + ' ' + i('down') + '</summary><ul>' + m.links.map(function (l) { return '<li>' + menuLink(l).replace('<a ', '<a data-close ') + '</li>'; }).join('') + '</ul></details>'; }).join('') +
    '<a class="ml" href="#/?to=buy" data-close>Where to Buy ' + i('arrow') + '</a><a class="ml" href="#/?to=support" data-close>Customer Care ' + i('arrow') + '</a>' + KC.ext(L.manuals, 'Manuals ' + i('out'), 'ml');
  logo($('#logoM'));
  $('#menuBtn').addEventListener('click', function () { KC.openDialog($('#dlgMenu'), this); });

  /* ---------- Footer ---------- */
  var FOOT = [
    ['Shop', [['Refrigerators', '#/c/refrigerators'], ['Ranges', '#/c/ranges'], ['Dishwashers', '#/c/dishwashers'], ['Washers & Dryers', '#/c/laundry'], ['Vacuums & Floor Care', '#/c/floorcare']]],
    ['Help', [['Where to buy', L.whereToBuy], ['Manuals', L.manuals], ['Contact us', L.contact], ['Product recalls', L.recalls], ['Schedule a repair', L.repair]]],
    ['Care', [['Customer care', L.care], ['Warranty', L.warranty], ['Parts & accessories', L.parts], ['Product registration', L.register]]],
    ['Kenmore', [['livemore™', 'https://www.kenmore.com/livemore'], ['About us', 'https://www.kenmore.com/about-us/'], ['Press kit', 'https://www.kenmore.com/press-kit/'], ['EnergyGuide', 'https://www.kenmore.com/energyguide/'], ['New Ventures', 'https://www.kenmore.com/new-ventures']]]
  ];
  var SOC = [['LinkedIn', 'https://www.linkedin.com/company/kenmore-and-brands/'], ['Facebook', 'https://www.facebook.com/kenmore'], ['Instagram', 'https://www.instagram.com/kenmoreappliances'], ['X (Twitter)', 'https://twitter.com/kenmore'], ['YouTube', 'https://www.youtube.com/user/Kenmore'], ['Pinterest', 'https://www.pinterest.com/Kenmore/']];
  var LEGAL = [['Terms of use', 'https://www.kenmore.com/terms-of-use/'], ['Privacy policy', 'https://www.kenmore.com/privacy-policy/'], ['Interest-based ads', 'https://www.kenmore.com/interest-based-ads/'], ['Sitemap', 'https://www.kenmore.com/sitemap/']];
  function fl(l) { return KC.isExt(l[1]) ? KC.ext(l[1], esc(l[0])) : '<a href="' + l[1] + '">' + esc(l[0]) + '</a>'; }
  $('#foot').innerHTML = '<div class="wrap"><div class="foot-top"><div class="foot-brand"><a class="logo" href="#/" aria-label="Kenmore home"><img id="logoF" alt="Kenmore" width="116" height="21"></a><p>Your resource for all things cooking, cleaning, and more. Trusted in American homes since 1913.</p><ul style="display:flex;flex-wrap:wrap;gap:0 16px;margin-top:16px">' + SOC.map(function (s) { return '<li>' + fl(s) + '</li>'; }).join('') + '</ul><span class="proto">Prototype V1 &middot; internal review</span></div>' +
    FOOT.map(function (g) { return '<nav aria-label="' + g[0] + '"><h2>' + g[0] + '</h2><ul>' + g[1].map(function (l) { return '<li>' + fl(l) + '</li>'; }).join('') + '</ul></nav>'; }).join('') +
    '</div><div class="foot-bot"><p>&copy; 2026 Kenmore. Prices and availability are set by retailers.</p><ul>' + LEGAL.map(function (l) { return '<li>' + fl(l) + '</li>'; }).join('') + '</ul></div></div>';
  logo($('#logoF'));

  /* ---------- Shared bits ---------- */
  function card(p, opts) {
    opts = opts || {}; var c = D.categories[p.cat];
    return '<li class="pcard"' + (opts.rv !== false ? ' data-rv style="--d:' + (opts.d || 0) + 's"' : '') + '>' +
      KC.img(p.img, '', '', 'Product image') +
      '<div class="meta"><span class="kicker">' + esc(p.subName || c.name) + '</span><h3><a href="' + KC.pLink(p) + '">' + esc(p.name) + '</a></h3><span class="model">Model ' + esc(p.model) + '</span>' +
      (opts.desc !== false ? '<p class="desc">' + esc(p.desc) + '</p>' : '') +
      '<div class="row"><span class="price">Check price at retailer</span>' + (opts.cmp ? cmpBtn(p) : '') + '</div></div></li>';
  }
  function cmpBtn(p) { var on = KC.cmp.has(p.id); return '<button type="button" class="cmpbtn" data-cmp="' + esc(p.id) + '" aria-pressed="' + on + '" aria-label="Compare ' + esc(p.model) + '"><span class="box" aria-hidden="true">' + (on ? '&#10003;' : '') + '</span>Compare</button>'; }
  function crumbs(list) { return '<nav aria-label="Breadcrumb"><ol class="crumbs">' + list.map(function (c, k) { return '<li>' + (c[1] && k < list.length - 1 ? '<a href="' + c[1] + '">' + esc(c[0]) + '</a>' : '<span' + (k === list.length - 1 ? ' aria-current="page"' : '') + '>' + esc(c[0]) + '</span>') + '</li>'; }).join('') + '</ol></nav>'; }
  function setTitle(t) { document.title = t + ' | Kenmore Prototype V1'; }

  /* ================= HOME ================= */
  function home() {
    setTitle('Home');
    var featured = ['46-75525', '22-96853', '22-14625', '26-41202', 'BC4030'].map(KC.byId);
    var catCards = [
      { id: 'refrigerators', t: 'Refrigeration', s: 'French door, side-by-side, top & bottom freezer', img: '../assets/img/lifestyle-kitchen.jpg', cover: true },
      { id: 'laundry', t: 'Laundry', s: 'Washers & dryers', img: '../assets/img/lifestyle-laundry.jpg', cover: true },
      { id: 'ranges', t: 'Cooking', s: 'Electric, induction & gas ranges', img: 'https://kenmore-brand-prod.s3.us-east-2.amazonaws.com/AanqqaRT7yrQSs5SSk23bTN5' },
      { id: 'dishwashers', t: 'Dishwashers', s: '24" built-in', img: 'https://kenmore-brand-prod.s3.us-east-2.amazonaws.com/esLxb7mroAGnGd15SjURj64W' },
      { id: 'floorcare', t: 'Floor Care', s: 'Upright, canister & cordless', img: 'https://cdn11.bigcommerce.com/s-d5fqfj6uoe/images/stencil/1280x1280/products/5334/5849/BC4030_ATF_Hero_R1__56014.1718914459.jpg?c=1' }
    ];
    var more = D.menu[1].links.slice(3).concat(D.menu[5].links);
    app.innerHTML =
      '<nav class="rail on" aria-label="On this page">' + [['shop', 'Shop'], ['featured', 'Featured'], ['living', 'Living'], ['buy', 'Where to buy'], ['support', 'Support']].map(function (s) { return '<a href="#/?to=' + s[0] + '" data-to="' + s[0] + '" data-spy="' + s[0] + '">' + s[1] + '</a>'; }).join('') + '</nav>' +
      '<section class="hero" aria-labelledby="heroT"><div class="wrap hero-grid">' +
        '<div><p class="eyebrow ld" style="--i:1">Kenmore &middot; Since 1913</p>' +
        '<h1 class="display" id="heroT"><span class="ld" style="--i:2;display:block">A calmer way</span><span class="ld" style="--i:3;display:block">to shop for <em>home.</em></span></h1>' +
        '<p class="lead ld" style="--i:4">Refrigeration, cooking, dishwashers, laundry and floor care, backed by more than 100 years of trusted performance. Start with a room, a category or a model number.</p>' +
        '<div class="hero-actions ld" style="--i:5"><a class="btn" href="#/?to=shop" data-to="shop">Shop by category</a><a class="tlink" href="#/?to=buy" data-to="buy">Find where to buy ' + i('arrow') + '</a></div>' +
        '<form class="hero-find ld" style="--i:6" role="search" data-sform><label for="hq">Know your model? Find it fast</label><div class="field"><input id="hq" type="search" placeholder="e.g. 46-75525 or French door" autocomplete="off"><button type="submit" aria-label="Search">' + i('search') + '</button></div></form></div>' +
        '<div class="collage ld-img" aria-label="Kenmore in the home">' +
          '<figure class="c1"><img data-px="0.05" src="../assets/img/lifestyle-kitchen.jpg" alt="A Kenmore top-freezer refrigerator and Kenmore range in a warm wood kitchen."></figure>' +
          '<figure class="c2"><img data-px="-0.04" src="../assets/img/lifestyle-laundry.jpg" alt="A stacked Kenmore washer and dryer in wood cabinetry."><figcaption>Kenmore laundry</figcaption></figure>' +
        '</div></div></section>' +
      '<div class="wrap"><hr class="rule" data-rv="line"></div>' +
      '<section class="sec" id="shop" aria-labelledby="shopT"><div class="wrap"><div class="sec-head"><div><p class="eyebrow" data-rv>Shop by category</p><h2 class="h2" id="shopT" data-rv style="--d:.06s">Every room, considered.</h2></div><p class="lead" data-rv style="--d:.12s">Five core categories open in this prototype. Other Kenmore categories open their live pages.</p></div>' +
        '<ul class="cats">' + catCards.map(function (c, k) { var cat = D.categories[c.id]; return '<li data-rv style="--d:' + (k * .06) + 's"><a class="catc" href="' + KC.cLink(c.id) + '">' + KC.img(c.img, '', c.cover ? 'cover' : '', c.t) + '<span class="t"><span><b>' + esc(c.t) + '</b><small>' + esc(c.s) + ' &middot; ' + KC.inCat(c.id).length + ' models</small></span>' + i('arrow') + '</span></a></li>'; }).join('') + '</ul>' +
        '<ul class="cat-more">' + more.map(function (l, k) { return '<li data-rv style="--d:' + (k * .03) + 's">' + menuLink(l) + '</li>'; }).join('') + '</ul></div></section>' +
      '<section class="sec" id="featured" aria-labelledby="featT" style="padding-top:0"><div class="wrap"><div class="sec-head"><div><p class="eyebrow" data-rv>Featured</p><h2 class="h2" id="featT" data-rv style="--d:.06s">One considered pick from each category.</h2></div></div>' +
        '<ul class="feat-row">' + featured.map(function (p, k) { return card(p, { d: k * .07, desc: false }); }).join('') + '</ul></div></section>' +
      '<section class="sec" id="living" aria-labelledby="livT" style="padding-top:0"><div class="wrap"><div class="wrap" style="padding:0"><hr class="rule" data-rv="line" style="margin-bottom:clamp(56px,7vw,96px)"></div><div class="sec-head"><div><p class="eyebrow" data-rv>From livemore&trade; with Kenmore</p><h2 class="h2" id="livT" data-rv style="--d:.06s">Practical ideas for everyday living.</h2></div>' + KC.ext(L.livemore, 'More on livemore ' + i('out'), 'tlink') + '</div>' +
        '<div class="living"><div data-rv>' + story(D.stories[0], true) + '</div><div class="story-list">' + D.stories.slice(1).map(function (s, k) { return '<div data-rv style="--d:' + (k * .08) + 's">' + story(s) + '</div>'; }).join('') + '</div></div></div></section>' +
      '<section class="sec buy" id="buy" aria-labelledby="buyT"><div class="wrap buy-grid"><div><p class="eyebrow" data-rv>Where to buy</p><h2 class="h2" id="buyT" data-rv style="--d:.06s;margin-top:16px">See it in person, or have it delivered.</h2><p class="lead" data-rv style="--d:.12s;margin-top:16px">Kenmore appliances are sold through retail partners. Prices and availability are set by each retailer.</p>' +
        '<form class="zipf" id="zipF" novalidate data-rv style="--d:.18s"><label for="zip">ZIP code</label><div class="zrow"><div class="field"><input id="zip" inputmode="numeric" maxlength="5" autocomplete="postal-code" placeholder="5-digit ZIP" aria-describedby="zipH zipE"></div><button class="btn" type="submit">Find retailers</button></div><p class="hint" id="zipH">US only. Results come from the Kenmore store locator.</p><p class="err" id="zipE" role="alert" hidden></p></form><div class="zres" id="zres" hidden tabindex="-1" aria-live="polite"></div></div>' +
        '<ul class="paths" data-rv style="--d:.1s"><li>' + KC.ext(L.whereToBuy, '<span class="n">01</span><span><b>Open the Kenmore store locator</b><small>Appliances at retailers near you &middot; kenmore.com</small></span>' + i('out')) + '</li><li>' + KC.ext(L.fcStore, '<span class="n">02</span><span><b>Buy floor care direct</b><small>Vacuums and carpet cleaners &middot; kenmorefloorcare.com</small></span>' + i('out')) + '</li><li><a href="#/c/refrigerators"><span class="n">03</span><span><b>Shortlist a model first</b><small>Bring the model number so a retailer can check stock</small></span>' + i('arrow') + '</a></li></ul></div></section>' +
      '<section class="sec" id="support" aria-labelledby="supT"><div class="wrap"><div class="sec-head"><div><p class="eyebrow" data-rv>Customer care</p><h2 class="h2" id="supT" data-rv style="--d:.06s">Help for the Kenmore you already own.</h2></div></div>' +
        '<ul class="sup">' + [['book', 'Manuals & guides', 'Search by model number', L.manuals], ['check', 'Register a product', 'Keep warranty details on file', L.register], ['chat', 'Customer care', 'Talk to the Kenmore team', L.care], ['wrench', 'Schedule a repair', 'Sears Home Services', L.repair], ['gear', 'Parts & accessories', 'Sears PartsDirect', L.parts], ['shield', 'Warranty', 'Coverage details', L.warranty], ['alert', 'Product recalls', 'Safety notices', L.recalls], ['chat', 'Floor care support', 'kenmorefloorcare.com', L.fcCare]].map(function (s, k) { return '<li data-rv style="--d:' + (k * .04) + 's">' + KC.ext(s[3], i(s[0]) + '<span><b>' + esc(s[1]) + '</b><small>' + esc(s[2]) + ' &middot; ' + esc(KC.host(s[3])) + '</small></span>') + '</li>'; }).join('') + '</ul></div></section>';
    bindZip();
    parallax();
    KC.spy('.rail a[data-spy], .nav a[data-spy]');
  }
  function story(s, big) { return '<a class="story" href="' + s.url + '" target="_blank" rel="noopener" data-ext>' + KC.img(s.img, s.alt, 'cover', 'Story image') + '<span><small>' + esc(s.tag) + '</small><br><b>' + esc(s.title) + '</b>' + (s.stock ? '<br><span class="flag">Stock image &middot; licence pending</span>' : '') + '</span><span class="sr-only"> (opens livemore in a new tab)</span></a>'; }
  function bindZip() {
    var f = $('#zipF'); if (!f) return;
    $('#zip').addEventListener('input', function () { this.value = this.value.replace(/\D/g, '').slice(0, 5); });
    f.addEventListener('submit', function (e) {
      e.preventDefault(); var v = $('#zip').value, er = $('#zipE'), out = $('#zres');
      if (!/^\d{5}$/.test(v)) { er.textContent = 'Enter a 5-digit US ZIP code.'; er.hidden = false; $('#zip').setAttribute('aria-invalid', 'true'); $('#zip').focus(); return; }
      er.hidden = true; $('#zip').removeAttribute('aria-invalid');
      out.innerHTML = '<p class="eyebrow">Prototype response</p><h3 class="h3" style="margin:8px 0">Retailers near ' + esc(v) + '</h3><p class="lead" style="font-size:.92rem;margin-bottom:16px">In production, nearby stores would load here from the Kenmore store locator. For now, open the live locator.</p>' + KC.ext(L.whereToBuy, 'Open store locator ' + i('out'), 'btn btn--sm');
      out.hidden = false; out.focus();
    });
  }
  var pxOff;
  function parallax() {
    if (pxOff) pxOff();
    var imgs = $$('[data-px]'); if (KC.reduced || !imgs.length) return;
    var tick = false;
    function on() { if (tick) return; tick = true; requestAnimationFrame(function () { var y = Math.min(scrollY, 900); imgs.forEach(function (im) { im.style.transform = 'translate3d(0,' + (y * parseFloat(im.getAttribute('data-px'))).toFixed(1) + 'px,0) scale(1.08)'; }); tick = false; }); }
    addEventListener('scroll', on, { passive: true }); on();
    pxOff = function () { removeEventListener('scroll', on); pxOff = null; };
  }

  /* ================= CATEGORY LISTING (reusable template) ================= */
  var CUR = null;
  function category(r) {
    var c = D.categories[r.id], st = KC.state(r.id, r.q);
    CUR = { id: r.id, st: st };
    lastCat[r.id] = location.hash; try { sessionStorage.setItem('km1-lastcat', JSON.stringify(lastCat)); } catch (e) {}
    setTitle(c.name);
    var cr = [['Home', '#/']].concat(c.crumbs.map(function (x) { return [x[0], null]; })).concat([[c.name, null]]);
    app.innerHTML = '<div class="wrap">' + crumbs(cr) +
      '<header class="cat-hero"><div><p class="eyebrow ld" style="--i:1">' + esc(c.group) + (c.external ? ' &middot; from ' + esc(c.external) : '') + '</p><h1 class="display ld" style="--i:2;font-size:clamp(2.2rem,4.4vw,3.8rem)">' + esc(c.name) + '</h1><p class="lead ld" style="--i:3">' + esc(c.intro) + '</p><p class="ld" style="--i:4;margin-top:14px">' + extLink(c.live, 'View on ' + (c.external || 'kenmore.com'), 'tlink') + '</p></div>' +
        (c.hero ? '<div class="ld-img">' + KC.img(c.hero, '', 'cover', c.name) + '</div>' : '<div></div>') + '</header>' +
      '<div class="subnav" role="group" aria-label="' + esc(c.name) + ' types" id="subnav"></div>' +
      (c.extraLinks ? '<div class="sub-links">' + c.extraLinks.map(function (l) { return KC.ext(l.url, esc(l.name) + ' ' + i('out')); }).join('') + '</div>' : '') +
      '<div class="plp"><aside class="side" aria-label="Filters"><form id="fside"></form></aside><div>' +
        '<div class="toolbar"><p class="count" id="count" aria-live="polite"></p><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><button type="button" class="btn btn--ghost btn--sm ftrigger" id="fOpen">' + i('filter') + ' Filters <span id="fN"></span></button><label class="sortw">Sort by <select id="sort">' + KC.sorts(c).map(function (s) { return '<option value="' + s[0] + '"' + (st.sort === s[0] ? ' selected' : '') + '>' + s[1] + '</option>'; }).join('') + '</select></label></div></div>' +
        '<div class="chips" id="chips"></div><ul class="pgrid" id="grid"></ul></div></div></div>';
    $('#sort').addEventListener('change', function () { CUR.st.sort = this.value; update(true); });
    $('#fOpen').addEventListener('click', function () { $('#fdBody').innerHTML = filtersHTML('d'); KC.openDialog($('#dlgFilters'), this); });
    update(false);
  }
  function filtersHTML(prefix) {
    var c = D.categories[CUR.id], st = CUR.st;
    return c.filters.map(function (f) {
      var key = KC.filterKey(f), counts = KC.optionCounts(CUR.id, st, f), opts = f.type === 'sub' ? c.subs.map(function (s) { return s.id; }) : f.options;
      return '<div class="fgroup"><fieldset><legend>' + esc(f.label) + '</legend>' + opts.map(function (o, k) { var id = prefix + '-' + key + '-' + k, on = (st.sel[key] || []).indexOf(o) > -1; return '<label class="fopt' + (!counts[o] && !on ? ' is-zero' : '') + '" for="' + id + '"><input type="checkbox" id="' + id + '" data-f="' + key + '" value="' + esc(o) + '"' + (on ? ' checked' : '') + '>' + esc(KC.optLabel(CUR.id, f, o)) + '<span class="c">' + counts[o] + '</span></label>'; }).join('') + '</fieldset></div>';
    }).join('');
  }
  function update(anim) {
    var c = D.categories[CUR.id], st = CUR.st;
    var list = KC.sortList(KC.apply(CUR.id, st), st.sort), total = KC.inCat(CUR.id).length;
    KC.replace(KC.stateHash(CUR.id, st)); lastCat[CUR.id] = location.hash; try { sessionStorage.setItem('km1-lastcat', JSON.stringify(lastCat)); } catch (e) {}
    $('#count').innerHTML = '<b>' + list.length + '</b> of ' + total + ' ' + esc(c.name.toLowerCase());
    // subcategory tiles
    var subKey = c.subs[0] && c.subs[0].filterAs ? c.subs[0].filterAs[0] : 'sub';
    $('#subnav').innerHTML = c.subs.map(function (s) { var val = s.filterAs ? s.filterAs[1] : s.id, on = (st.sel[subKey] || []).indexOf(val) > -1, n = KC.inCat(CUR.id).filter(function (p) { return p[subKey] === val; }).length; return '<button type="button" class="sub" aria-pressed="' + on + '" data-subkey="' + subKey + '" data-sub="' + esc(val) + '">' + KC.img(s.img, '', '', s.name) + '<span class="t">' + esc(s.name) + '<small>' + n + '</small></span></button>'; }).join('');
    $('#fside').innerHTML = filtersHTML('s');
    if ($('#dlgFilters').open) { $('#fdBody').innerHTML = filtersHTML('d'); }
    $('#fdShow').textContent = 'Show ' + list.length + ' result' + (list.length === 1 ? '' : 's');
    var chips = []; Object.keys(st.sel).forEach(function (k) { st.sel[k].forEach(function (v) { var f = c.filters.filter(function (x) { return KC.filterKey(x) === k; })[0] || { type: k === 'sub' ? 'sub' : '' }; chips.push('<button type="button" class="chip" data-rm="' + k + '" data-v="' + esc(v) + '">' + esc(KC.optLabel(CUR.id, f, v)) + i('x') + '<span class="sr-only">Remove filter</span></button>'); }); });
    $('#chips').innerHTML = chips.length ? chips.join('') + '<button type="button" class="clear" data-clear>Clear filters</button>' : '';
    $('#fN').textContent = chips.length ? '(' + chips.length + ')' : '';
    var grid = $('#grid');
    function put() {
      grid.innerHTML = list.length ? list.map(function (p, k) { return card(p, { cmp: true, d: Math.min(k, 8) * .04, rv: !anim }); }).join('') :
        '<li class="empty"><h2>No ' + esc(c.name.toLowerCase()) + ' match these filters</h2><p>Try removing a filter, or clear them all to see every model.</p><button type="button" class="btn" data-clear>Clear filters</button></li>';
      grid.classList.remove('swap'); KC.reveal(grid);
    }
    if (anim && !KC.reduced) { grid.classList.add('swap'); setTimeout(put, 120); } else put();
    renderTray();
  }
  document.addEventListener('change', function (e) {
    var inp = e.target.closest('input[data-f]'); if (!inp || !CUR) return;
    var k = inp.getAttribute('data-f'), arr = CUR.st.sel[k] = CUR.st.sel[k] || [];
    if (inp.checked) { if (arr.indexOf(inp.value) < 0) arr.push(inp.value); } else arr.splice(arr.indexOf(inp.value), 1);
    var fid = inp.id; update(true); var again = document.getElementById(fid); if (again) again.focus();
  });
  $('#fdClear').addEventListener('click', function () { if (CUR) { CUR.st.sel = {}; update(true); } });

  /* ---------- Compare ---------- */
  function renderTray() {
    var t = $('#tray'), l = KC.cmp.list();
    t.classList.toggle('on', l.length > 0);
    t.innerHTML = l.length ? '<b>Compare (' + l.length + '/3)</b><div class="items">' + l.map(function (p) { return '<span class="it">' + KC.img(p.img, '', '', '') + esc(p.model) + '<button type="button" data-cmp="' + esc(p.id) + '" aria-label="Remove ' + esc(p.model) + ' from compare">' + i('x') + '</button></span>'; }).join('') + '</div><button type="button" class="btn btn--sm" id="cmpGo"' + (l.length < 2 ? ' disabled aria-disabled="true" title="Add at least 2 products"' : '') + '>Compare</button><button type="button" class="clear" id="cmpClr">Clear</button>' : '';
  }
  function openCompare(opener) {
    var l = KC.cmp.list(); if (l.length < 2) { KC.toast('Add at least 2 products to compare.'); return; }
    var c = D.categories[l[0].cat];
    $('#cmpBody').innerHTML = '<div class="cmp-top"><h2 class="eyebrow" id="cmpTitle">Compare ' + esc(c.name) + '</h2><button type="button" class="x" data-close aria-label="Close compare">' + i('x') + '</button></div><table><thead><tr><th scope="col"><span class="sr-only">Attribute</span></th>' + l.map(function (p) { return '<th scope="col">' + KC.img(p.img, '', '', '') + '<a href="' + KC.pLink(p) + '" data-close>' + esc(p.name) + '</a><br><small style="color:var(--mut)">Model ' + esc(p.model) + '</small></th>'; }).join('') + '</tr></thead><tbody>' +
      c.compare.map(function (row) { var vals = l.map(function (p) { return KC.cmpValue(p, row[1]); }); var diff = vals.some(function (v) { return v !== vals[0]; }); return '<tr' + (diff ? ' class="diff"' : '') + '><th scope="row">' + esc(row[0]) + '</th>' + vals.map(function (v) { return '<td' + (v === 'Not stated' ? ' class="no"' : '') + '>' + esc(v) + '</td>'; }).join('') + '</tr>'; }).join('') +
      '<tr><th scope="row">Price</th>' + l.map(function () { return '<td class="no">Check price at retailer</td>'; }).join('') + '</tr></tbody></table><p class="cmp-note">Values come from Kenmore product names and pages. “Not stated” means the source doesn’t mention it, not that the product lacks it. Highlighted rows differ.</p>';
    KC.openDialog($('#dlgCmp'), opener);
  }

  /* ================= PRODUCT DETAIL ================= */
  var G = { list: [], k: 0 };
  function pdp(r) {
    var p = KC.byId(r.id), c = D.categories[p.cat], d = p.pdp;
    setTitle(p.model + ' ' + c.name);
    var back = lastCat[p.cat] || KC.cLink(p.cat), subQ = c.subs.filter(function (s) { return s.id === p.sub; })[0];
    var cr = [['Home', '#/']].concat(c.crumbs.map(function (x) { return [x[0], null]; })).concat([[c.name, KC.cLink(p.cat)]]).concat(subQ ? [[subQ.name, KC.cLink(p.cat, 'sub=' + subQ.id)]] : []).concat([[p.model, null]]);
    G.list = d ? d.images : [p.img]; G.k = 0;
    var manual = d ? d.docs[0] : null;
    var store = c.id === 'floorcare';
    app.innerHTML = '<div class="wrap">' + crumbs(cr) + '<a class="backl" href="' + back + '">' + i('arrow') + 'Back to ' + esc(c.name) + '</a>' +
      '<div class="pdp"><section class="gal ld-img" aria-label="Product images"><div class="thumbs" id="thumbs">' + G.list.map(function (src, k) { return '<button type="button" data-g="' + k + '" aria-label="Show image ' + (k + 1) + ' of ' + G.list.length + '"' + (k === 0 ? ' aria-current="true"' : '') + '>' + KC.img(src, '', '', String(k + 1)) + '</button>'; }).join('') + '</div>' +
        '<div class="stage" id="stage" tabindex="0" aria-roledescription="carousel" aria-label="' + esc(p.name) + ' image gallery. Use arrow keys to change image.">' + KC.img(G.list[0], p.name + ', image 1', '', 'Product image') + (G.list.length > 1 ? '<span class="gcount" id="gcount" aria-live="polite">1 / ' + G.list.length + '</span><span class="gnav"><button type="button" data-gs="-1" aria-label="Previous image">' + i('left') + '</button><button type="button" data-gs="1" aria-label="Next image">' + i('right') + '</button></span>' : '') + '</div></section>' +
      '<aside class="summary"><p class="eyebrow ld" style="--i:1">' + esc(c.group) + ' &middot; ' + esc(p.subName || c.name) + '</p><h1 class="ld" style="--i:2">' + esc(p.name) + '</h1><p class="mrow ld" style="--i:3">Model ' + esc(p.model) + (p.finish ? ' &middot; ' + esc(p.finish) : '') + ' <button type="button" class="copy" data-copy="' + esc(p.model) + '">Copy model #</button></p>' +
        '<p class="lead ld" style="--i:4;margin-top:14px">' + esc(p.desc) + '</p>' +
        ((p.flags || []).length ? '<ul class="badges ld" style="--i:5" aria-label="Highlights">' + p.flags.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' : '') +
        '<div class="pricebox ld" style="--i:5"><span>Check price at retailer<small>' + (store ? 'Sold on kenmorefloorcare.com and at retailers' : 'Kenmore appliances are sold through retail partners') + '</small></span></div>' +
        '<div class="acts ld" style="--i:6">' + (store ? KC.ext(p.url, 'Shop at kenmorefloorcare.com ' + i('out'), 'btn') + KC.ext(L.whereToBuy, 'Find a retailer ' + i('out'), 'btn btn--ghost') : KC.ext(L.whereToBuy, 'Where to buy ' + i('out'), 'btn')) +
          (manual ? KC.ext(manual.url, esc(manual.label) + ' ' + i('out'), 'btn btn--ghost') : KC.ext(L.manuals, 'Find the manual ' + i('out'), 'btn btn--ghost')) +
          (store ? '' : KC.ext(p.url, 'View on kenmore.com ' + i('out'), 'tlink')) + '</div>' +
        (KC.cmp ? '<p style="margin-top:14px">' + cmpBtn(p) + '</p>' : '') + '</aside></div></div>' +
      (d ? '<section class="pdp-sec" aria-labelledby="ovT"><div class="wrap"><p class="eyebrow" id="ovT" data-rv>Overview</p><div class="overview" data-rv style="--d:.06s;margin-top:18px"><p>' + esc(d.overview) + '</p></div></div></section>' +
        '<section class="pdp-sec" aria-labelledby="ftT"><div class="wrap"><div class="sec-head"><div><p class="eyebrow" data-rv>Key features</p><h2 class="h2" id="ftT" data-rv style="--d:.06s">What it does well.</h2></div></div><ol class="flist">' + d.features.map(function (f, k) { return '<li data-rv style="--d:' + (k % 2) * .06 + 's"><b>' + esc(f[0]) + '</b><p>' + esc(f[1]) + '</p></li>'; }).join('') + '</ol></div></section>' +
        '<section class="pdp-sec" aria-labelledby="spT"><div class="wrap"><div class="sec-head"><div><p class="eyebrow" data-rv>Specifications</p><h2 class="h2" id="spT" data-rv style="--d:.06s">The details.</h2></div></div><div class="specs">' + Object.keys(d.specs).map(function (g, k) { return '<details class="acc" data-rv' + (k < 2 ? ' open' : '') + '><summary>' + esc(g) + i('plus') + '</summary><dl>' + Object.keys(d.specs[g]).map(function (l) { return '<dt>' + esc(l) + '</dt><dd>' + esc(d.specs[g][l]) + '</dd>'; }).join('') + '</dl></details>'; }).join('') + '</div><p class="note">Specifications are taken from the text of Kenmore’s product page. Full dimensions and electrical data are in the product’s documents and on ' + KC.ext(p.url, esc(KC.host(p.url))) + '.</p></div></section>' +
        '<section class="pdp-sec" aria-labelledby="dcT"><div class="wrap"><div class="sec-head"><div><p class="eyebrow" data-rv>Manuals &amp; support</p><h2 class="h2" id="dcT" data-rv style="--d:.06s">Documents for this model.</h2></div></div><ul class="docs">' + d.docs.concat(store ? [] : [{ label: 'Register this product', url: L.register }, { label: 'Customer care', url: L.care }]).map(function (x) { return '<li data-rv>' + KC.ext(x.url, i('file') + '<span>' + esc(x.label) + '<br><small class="ext-note">' + esc(KC.host(x.url)) + '</small></span>') + '</li>'; }).join('') + '</ul></div></section>'
      : '<section class="pdp-sec" aria-labelledby="kdT"><div class="wrap"><div class="sec-head"><div><p class="eyebrow" data-rv>Key details</p><h2 class="h2" id="kdT" data-rv style="--d:.06s">From the Kenmore listing.</h2></div></div><div class="specs"><details class="acc" open><summary>Listing details' + i('plus') + '</summary><dl>' + c.compare.map(function (row) { var v = KC.cmpValue(p, row[1]); return v === 'Not stated' ? '' : '<dt>' + esc(row[0]) + '</dt><dd>' + esc(v) + '</dd>'; }).join('') + '<dt>Model</dt><dd>' + esc(p.model) + '</dd></dl></details></div><p class="note">This prototype carries listing-level data for this model. Full features, specifications and documents are on ' + KC.ext(p.url, esc(KC.host(p.url)) + ' ' + i('out')) + '. Manuals: ' + KC.ext(store ? L.fcCare : L.manuals, store ? 'floor care support' : 'search by model number') + '.</p></div></section>') +
      '<section class="pdp-sec" aria-labelledby="rlT"><div class="wrap"><div class="sec-head"><div><p class="eyebrow" data-rv>More ' + esc(c.name.toLowerCase()) + '</p><h2 class="h2" id="rlT" data-rv style="--d:.06s">You might also consider.</h2></div><a class="tlink" href="' + back + '">All ' + esc(c.name.toLowerCase()) + ' ' + i('arrow') + '</a></div><ul class="related">' + related(p).map(function (x, k) { return card(x, { d: k * .06, desc: false }); }).join('') + '</ul></div></section>';
    bindGallery(p);
    renderTray();
  }
  function related(p) { var same = KC.inCat(p.cat).filter(function (x) { return x.id !== p.id; }); same.sort(function (a, b) { return (b.sub === p.sub) - (a.sub === p.sub) || (b.full - a.full) || a.order - b.order; }); return same.slice(0, 4); }
  function showImg(k, p) {
    G.k = (k + G.list.length) % G.list.length;
    var st = $('#stage .media'); if (!st) return;
    $$('#thumbs button').forEach(function (b, n) { if (n === G.k) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    var gc = $('#gcount'); if (gc) gc.textContent = (G.k + 1) + ' / ' + G.list.length;
    function swap() { st.outerHTML = KC.img(G.list[G.k], p.name + ', image ' + (G.k + 1), '', 'Product image'); }
    if (KC.reduced) swap(); else { st.classList.add('swapping'); setTimeout(swap, 140); }
  }
  function bindGallery(p) {
    var stage = $('#stage');
    $('#thumbs').addEventListener('click', function (e) { var b = e.target.closest('[data-g]'); if (b) showImg(+b.getAttribute('data-g'), p); });
    stage.addEventListener('click', function (e) { var b = e.target.closest('[data-gs]'); if (b) showImg(G.k + +b.getAttribute('data-gs'), p); });
    stage.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); showImg(G.k + 1, p); } if (e.key === 'ArrowLeft') { e.preventDefault(); showImg(G.k - 1, p); } });
    var x0 = null; stage.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) showImg(G.k + (dx < 0 ? 1 : -1), p); x0 = null; });
  }

  /* ================= SEARCH ================= */
  var dS = $('#dlgSearch'), sIn = $('#sIn');
  function resultsHTML(q, limit) {
    var r = KC.search(q);
    if (!q.trim()) return '<h3>Popular</h3><div class="pop">' + ['French door', 'Induction', '22-14625', 'Front load washer', 'Canister vacuum', '46-61335'].map(function (x) { return '<button type="button" class="chip" data-q="' + x + '">' + x + '</button>'; }).join('') + '</div>';
    if (!r.products.length && !r.cats.length) return '<div class="none"><p><b>No results for “' + esc(q) + '”</b> in this prototype’s ' + D.products.length + '-product catalog.</p><p style="margin-top:8px">Check the model number (it’s usually on a label inside the door or on the back panel), try a category like “dishwasher”, or ' + KC.ext(L.manuals, 'search Kenmore manuals by model number') + '.</p></div>';
    var list = r.products.slice(0, limit || 99);
    return '<div class="sgrid"><div><h3>Products (' + r.products.length + ')</h3>' + list.map(function (p) { return '<a class="sr" href="' + KC.pLink(p) + '" data-close>' + KC.img(p.img, '', '', '') + '<span><b>' + esc(p.name) + '</b><small>Model ' + esc(p.model) + ' &middot; ' + esc(D.categories[p.cat].name) + '</small></span></a>'; }).join('') + (limit && r.products.length > limit ? '<p style="margin-top:14px"><a class="tlink" href="#/search?q=' + encodeURIComponent(q) + '" data-close>See all ' + r.products.length + ' results ' + i('arrow') + '</a></p>' : '') + '</div>' +
      '<div><h3>Categories</h3>' + (r.cats.length ? r.cats.map(function (c) { return '<a class="sr" href="' + KC.cLink(c.id) + '" data-close><span><b>' + esc(c.name) + '</b><small>' + KC.inCat(c.id).length + ' models</small></span></a>'; }).join('') : '<p class="none">No matching categories</p>') + '</div></div>';
  }
  function openSearch(q, opener) { sIn.value = q || ''; $('#sRes').innerHTML = resultsHTML(sIn.value, 6); KC.openDialog(dS, opener); sIn.focus(); }
  sIn.addEventListener('input', function () { $('#sRes').innerHTML = resultsHTML(sIn.value, 6); });
  $('#sForm').addEventListener('submit', function (e) { e.preventDefault(); if (!sIn.value.trim()) return; KC.closeDialog(dS); location.hash = '#/search?q=' + encodeURIComponent(sIn.value.trim()); });
  $('#sRes').addEventListener('click', function (e) { var c = e.target.closest('[data-q]'); if (c) { sIn.value = c.getAttribute('data-q'); $('#sRes').innerHTML = resultsHTML(sIn.value, 6); sIn.focus(); } });
  function searchPage(r) {
    var q = (r.q.q || [''])[0]; setTitle('Search');
    app.innerHTML = '<div class="wrap">' + crumbs([['Home', '#/'], ['Search', null]]) + '<header class="cat-hero" style="grid-template-columns:1fr"><div><p class="eyebrow">Search</p><h1 class="display" style="font-size:clamp(2rem,4vw,3.4rem)">' + (q ? 'Results for “' + esc(q) + '”' : 'Search Kenmore') + '</h1><form class="field" role="search" data-sform style="max-width:560px;margin-top:20px"><label class="sr-only" for="spq">Search by product name or model number</label><input id="spq" type="search" value="' + esc(q) + '" placeholder="Product name or model number"><button type="submit" aria-label="Search">' + i('search') + '</button></form></div></header><div class="sres" style="padding-bottom:96px">' + resultsHTML(q) + '</div></div>';
  }
  function notFound() { setTitle('Not found'); app.innerHTML = '<div class="wrap sec"><h1 class="h2">That page isn’t part of this prototype.</h1><p class="lead" style="margin:16px 0 24px">Head back to the homepage, or search for a product.</p><a class="btn" href="#/">Go to homepage</a></div>'; }

  /* ---------- Global delegation ---------- */
  document.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-search]'))) { openSearch('', t); return; }
    if ((t = e.target.closest('[data-cmp]'))) { var res = KC.cmp.toggle(t.getAttribute('data-cmp')); if (!res.ok) { KC.toast(res.msg); return; } $$('[data-cmp="' + t.getAttribute('data-cmp') + '"].cmpbtn').forEach(function (b) { b.outerHTML = cmpBtn(KC.byId(b.getAttribute('data-cmp'))); }); renderTray(); KC.toast(res.on ? 'Added to compare' : 'Removed from compare'); return; }
    if (e.target.closest('#cmpGo')) { openCompare(e.target.closest('#cmpGo')); return; }
    if (e.target.closest('#cmpClr')) { KC.cmp.clear(); renderTray(); $$('.cmpbtn[aria-pressed="true"]').forEach(function (b) { b.outerHTML = cmpBtn(KC.byId(b.getAttribute('data-cmp'))); }); return; }
    if ((t = e.target.closest('[data-sub]'))) { var k = t.getAttribute('data-subkey'), v = t.getAttribute('data-sub'), a = CUR.st.sel[k] || []; CUR.st.sel[k] = a.indexOf(v) > -1 ? a.filter(function (x) { return x !== v; }) : [v]; update(true); var nb = $('[data-sub="' + v + '"]'); if (nb) nb.focus(); return; }
    if ((t = e.target.closest('[data-rm]'))) { var kk = t.getAttribute('data-rm'); CUR.st.sel[kk] = (CUR.st.sel[kk] || []).filter(function (x) { return x !== t.getAttribute('data-v'); }); update(true); var sortEl = $('#sort'); if (sortEl) sortEl.focus(); return; }
    if (e.target.closest('[data-clear]')) { CUR.st.sel = {}; update(true); return; }
    if ((t = e.target.closest('[data-copy]'))) { var v2 = t.getAttribute('data-copy'); if (navigator.clipboard) navigator.clipboard.writeText(v2).then(function () { KC.toast('Model ' + v2 + ' copied'); }, function () { KC.toast('Model number: ' + v2); }); else KC.toast('Model number: ' + v2); return; }
    if ((t = e.target.closest('a[data-to]')) && KC.parse().name === 'home') { e.preventDefault(); var d = t.closest('dialog'); if (d) KC.closeDialog(d); KC.scrollTo(t.getAttribute('data-to')); KC.replace('#/?to=' + t.getAttribute('data-to')); return; }
    if ((t = e.target.closest('dialog a[href^="#/"]'))) { var dd = t.closest('dialog'); dd._opener = null; KC.closeDialog(dd); }
  });
  document.addEventListener('submit', function (e) {
    var f = e.target.closest('[data-sform]'); if (!f) return; e.preventDefault();
    var q = f.querySelector('input').value.trim(); var d = f.closest('dialog'); if (d) { d._opener = null; KC.closeDialog(d); }
    if (!q) { openSearch('', f.querySelector('input')); return; }
    location.hash = '#/search?q=' + encodeURIComponent(q);
  });
  document.addEventListener('keydown', function (e) { if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !document.querySelector('dialog[open]')) { e.preventDefault(); openSearch('', document.activeElement); } });
  var hdr = $('#hdr');

  KC.initDialogs();
  requestAnimationFrame(function () { $('#page').classList.add('is-loaded'); });

  KC.start(function (r) {
    setMega(false); if (pxOff) pxOff(); CUR = null;
    $$('dialog[open]').forEach(function (d) { d._opener = null; KC.closeDialog(d); });
    app.classList.remove('view'); void app.offsetWidth; app.classList.add('view');
    if (r.name === 'home') home(); else if (r.name === 'cat') category(r); else if (r.name === 'pdp') pdp(r); else if (r.name === 'search') searchPage(r); else notFound();
    if (r.name !== 'home') KC.spy('.nav a[data-spy]');
    $$('.nav a[data-spy]').forEach(function (a) { if (r.name !== 'home') { a.classList.remove('is-active'); a.removeAttribute('aria-current'); } });
    renderTray(); KC.reveal(app);
  });
  window.KM_READY = true;
})();
