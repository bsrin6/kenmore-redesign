/* Shared prototype engine: routing, filtering, sorting, search, compare, motion helpers.
   Both design versions use this file; each version supplies its own markup and styles. */
(function (G) {
  var D = G.KMDATA, KC = {};
  KC.D = D;
  KC.reduced = G.matchMedia && G.matchMedia('(prefers-reduced-motion: reduce)').matches;
  KC.$ = function (s, r) { return (r || document).querySelector(s); };
  KC.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  KC.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  KC.byId = function (id) { for (var i = 0; i < D.products.length; i++) if (D.products[i].id === id) return D.products[i]; return null; };
  KC.cat = function (id) { return D.categories[id]; };
  KC.inCat = function (id) { return D.products.filter(function (p) { return p.cat === id; }); };
  KC.isExt = function (u) { return /^https?:/.test(u); };
  KC.host = function (u) { try { var h = new URL(u).hostname.replace(/^www\./, ''); if (h.indexOf('kenmore-interim') === 0) return 'kenmore.com PDF'; if (h === 'i.sears.com') return 'PDF'; return h; } catch (e) { return ''; } };
  /* External link: opens in a new tab and says it leaves the prototype */
  KC.ext = function (url, inner, cls, attrs) { return '<a class="' + (cls || '') + '" href="' + KC.esc(url) + '" target="_blank" rel="noopener" data-ext ' + (attrs || '') + '>' + inner + '<span class="sr-only"> (opens ' + KC.esc(KC.host(url)) + ' in a new tab)</span></a>'; };
  KC.pLink = function (p) { return '#/p/' + encodeURIComponent(p.id); };
  KC.cLink = function (id, q) { return '#/c/' + id + (q ? '?' + q : ''); };

  /* Image with a labelled fallback if the remote Kenmore image cannot load */
  KC.img = function (src, alt, cls, label, extra) {
    return '<span class="media ' + (cls || '') + '"><span class="ph" aria-hidden="true"><span>' + KC.esc(label || 'Image unavailable offline') + '</span></span>' +
      (src ? '<img src="' + KC.esc(src) + '" alt="' + KC.esc(alt || '') + '" loading="lazy" decoding="async" ' + (extra || '') + ' onerror="var m=this.parentNode;if(m)m.classList.add(\'is-fallback\');this.remove()">' : '') + '</span>';
  };

  /* ---------- Routing (hash based so it works from file:// and Back/Forward work) ---------- */
  KC.parse = function () {
    var h = location.hash.replace(/^#/, '') || '/';
    var qi = h.indexOf('?'), path = qi > -1 ? h.slice(0, qi) : h, qs = qi > -1 ? h.slice(qi + 1) : '';
    var q = {}; qs.split('&').forEach(function (kv) { if (!kv) return; var i = kv.indexOf('='); var k = decodeURIComponent(i > -1 ? kv.slice(0, i) : kv), v = decodeURIComponent((i > -1 ? kv.slice(i + 1) : '').replace(/\+/g, ' ')); (q[k] = q[k] || []).push(v); });
    var seg = path.split('/').filter(Boolean);
    if (!seg.length) return { name: 'home', q: q, key: h };
    if (seg[0] === 'c' && D.categories[seg[1]]) return { name: 'cat', id: seg[1], q: q, key: h };
    if (seg[0] === 'p' && KC.byId(decodeURIComponent(seg[1] || ''))) return { name: 'pdp', id: decodeURIComponent(seg[1]), q: q, key: h };
    if (seg[0] === 'search') return { name: 'search', q: q, key: h };
    if (seg[0] === 'compare') return { name: 'compare', q: q, key: h };
    return { name: 'notfound', q: q, key: h };
  };
  KC.qs = function (obj) { var parts = []; Object.keys(obj).forEach(function (k) { [].concat(obj[k]).forEach(function (v) { if (v !== '' && v != null) parts.push(encodeURIComponent(k) + '=' + encodeURIComponent(v)); }); }); return parts.join('&'); };
  /* Update the URL without adding a history entry (used for filter / sort changes) */
  KC.replace = function (hash) { try { history.replaceState(history.state, '', hash); } catch (e) { location.replace(hash); } };

  var scrolls = {}, pushNav = false;
  KC.start = function (render) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#/"]');
      if (a && !e.metaKey && !e.ctrlKey && !e.shiftKey) { scrolls[location.hash || '#/'] = G.scrollY; pushNav = true; }
    }, true);
    function go() {
      var r = KC.parse();
      render(r);
      var restore = !pushNav && scrolls[location.hash || '#/'] != null;
      if (restore) G.scrollTo(0, scrolls[location.hash || '#/']); else if (r.q.to) { var t = document.getElementById(r.q.to[0]); if (t) G.scrollTo(0, t.getBoundingClientRect().top + G.scrollY - 80); } else G.scrollTo(0, 0);
      if (pushNav) { var h1 = KC.$('main h1'); if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); } }
      pushNav = false;
    }
    G.addEventListener('hashchange', go);
    go();
  };

  /* ---------- Filtering & sorting ---------- */
  KC.state = function (catId, q) {
    var c = D.categories[catId], st = { sort: (q.sort || ['featured'])[0], sel: {} };
    c.filters.forEach(function (f) { if (q[f.key]) st.sel[f.key] = q[f.key].slice(); });
    return st;
  };
  KC.stateHash = function (catId, st) { var o = {}; Object.keys(st.sel).forEach(function (k) { if (st.sel[k].length) o[k] = st.sel[k]; }); if (st.sort && st.sort !== 'featured') o.sort = st.sort; var s = KC.qs(o); return KC.cLink(catId, s); };
  function match(p, key, vals) {
    if (!vals || !vals.length) return true;
    if (key === 'flags') return vals.every(function (v) { return (p.flags || []).indexOf(v) > -1; });
    return vals.indexOf(p[key]) > -1;
  }
  KC.apply = function (catId, st, except) {
    return KC.inCat(catId).filter(function (p) { return Object.keys(st.sel).every(function (k) { return k === except || match(p, k, st.sel[k]); }); });
  };
  KC.sortList = function (list, sort) {
    var a = list.slice();
    var by = {
      featured: function (x, y) { return (x.featured || 99) - (y.featured || 99) || (y.full ? 1 : 0) - (x.full ? 1 : 0) || x.order - y.order; },
      'cap-desc': function (x, y) { return (y.cap || 0) - (x.cap || 0) || x.order - y.order; },
      'cap-asc': function (x, y) { return (x.cap || 999) - (y.cap || 999) || x.order - y.order; },
      name: function (x, y) { return x.name.localeCompare(y.name); },
      model: function (x, y) { return x.model.localeCompare(y.model, undefined, { numeric: true }); }
    };
    return a.sort(by[sort] || by.featured);
  };
  KC.sorts = function (c) { var s = [['featured', 'Featured']]; if (c.capacity) s.push(['cap-desc', 'Capacity: high to low'], ['cap-asc', 'Capacity: low to high']); s.push(['name', 'Name: A to Z'], ['model', 'Model number']); return s; };
  /* option counts reflect the other active filters, so users can see what each choice leaves */
  KC.optionCounts = function (catId, st, f) {
    var base = KC.apply(catId, st, f.key), out = {};
    var opts = f.type === 'sub' ? D.categories[catId].subs.map(function (s) { return s.id; }) : f.options;
    opts.forEach(function (o) { out[o] = base.filter(function (p) { return f.key === 'flags' ? (p.flags || []).indexOf(o) > -1 && match(p, 'flags', st.sel.flags) : p[f.key] === o; }).length; });
    return out;
  };
  KC.optLabel = function (catId, f, o) { if (f.type === 'sub') { var s = D.categories[catId].subs.filter(function (x) { return x.id === o; })[0]; return s ? s.name : o; } return o; };
  KC.filterKey = function (f) { return f.type === 'sub' ? 'sub' : f.key; };

  /* ---------- Search: product names, model numbers, categories ---------- */
  KC.norm = function (s) { return String(s).toLowerCase().replace(/[^a-z0-9]/g, ''); };
  KC.search = function (q) {
    q = (q || '').trim(); var n = KC.norm(q), words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!n) return { products: [], cats: [] };
    var syn = { fridge: 'refrigerator', fridges: 'refrigerator', vacuum: 'vacuum', washer: 'washer', dryer: 'dryer', stove: 'range', oven: 'range' };
    words = words.map(function (w) { return syn[w] || w; });
    var scored = D.products.map(function (p) {
      var m = KC.norm(p.model), s = 0;
      if (m === n) s = 100; else if (m.indexOf(n) > -1 && n.length >= 3) s = 60;
      var hay = (p.name + ' ' + D.categories[p.cat].name + ' ' + p.subName + ' ' + (p.flags || []).join(' ') + ' ' + (p.finish || '')).toLowerCase();
      if (!s && words.every(function (w) { return hay.indexOf(w.replace(/s$/, '')) > -1; })) s = 30;
      return { p: p, s: s };
    }).filter(function (x) { return x.s; }).sort(function (a, b) { return b.s - a.s || a.p.order - b.p.order; }).map(function (x) { return x.p; });
    var cats = Object.keys(D.categories).map(function (k) { return D.categories[k]; }).filter(function (c) { var hay = (c.name + ' ' + (c.short || '') + ' ' + c.group + ' ' + c.subs.map(function (s) { return s.name; }).join(' ')).toLowerCase(); return words.some(function (w) { return w.length > 2 && hay.indexOf(w.replace(/s$/, '')) > -1; }); });
    return { products: scored, cats: cats, modelLike: /\d{3,}/.test(q) };
  };

  /* ---------- Compare (up to 3 products from one category; kept for this browser tab) ---------- */
  var CMP = [];
  try { CMP = JSON.parse(sessionStorage.getItem('km-compare') || '[]'); } catch (e) { CMP = []; }
  function saveCmp() { try { sessionStorage.setItem('km-compare', JSON.stringify(CMP)); } catch (e) {} }
  KC.cmp = {
    list: function () { return CMP.map(KC.byId).filter(Boolean); },
    has: function (id) { return CMP.indexOf(id) > -1; },
    toggle: function (id) {
      var p = KC.byId(id); if (!p) return { ok: false };
      if (KC.cmp.has(id)) { CMP.splice(CMP.indexOf(id), 1); saveCmp(); return { ok: true, on: false }; }
      if (CMP.length && KC.byId(CMP[0]).cat !== p.cat) return { ok: false, msg: 'Compare works within one category. Clear your current list to compare ' + D.categories[p.cat].name.toLowerCase() + '.' };
      if (CMP.length >= 3) return { ok: false, msg: 'You can compare up to 3 products.' };
      CMP.push(id); saveCmp(); return { ok: true, on: true };
    },
    clear: function () { CMP = []; saveCmp(); }
  };
  KC.cmpValue = function (p, key) {
    if (key.indexOf('f:') === 0) return (p.flags || []).indexOf(key.slice(2)) > -1 ? 'Yes' : 'Not stated';
    return p[key] || 'Not stated';
  };

  /* ---------- Motion helpers ---------- */
  KC.reveal = function (root) {
    var els = KC.$$('[data-rv]:not(.in)', root || document);
    if (KC.reduced || !('IntersectionObserver' in G)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
  };
  var spyIO;
  KC.spy = function (linkSel) {
    if (spyIO) spyIO.disconnect();
    var links = KC.$$(linkSel); if (!links.length || !('IntersectionObserver' in G)) return;
    var secs = links.map(function (a) { return document.getElementById(a.getAttribute('data-spy')); }).filter(Boolean), vis = {};
    spyIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { vis[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });
      var best = null, br = 0; secs.forEach(function (s) { if ((vis[s.id] || 0) > br) { br = vis[s.id]; best = s.id; } });
      links.forEach(function (a) { var on = a.getAttribute('data-spy') === best; a.classList.toggle('is-active', on); if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.01, 0.3, 0.6, 1] });
    secs.forEach(function (s) { spyIO.observe(s); });
  };
  /* Smooth in-page scrolling that respects reduced motion and the sticky header */
  KC.scrollTo = function (id) { var t = document.getElementById(id); if (!t) return; var y = t.getBoundingClientRect().top + G.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hh')) || 72) - 12; G.scrollTo({ top: y, behavior: KC.reduced ? 'auto' : 'smooth' }); };

  var toastT;
  KC.toast = function (msg) { var t = KC.$('#toast'); if (!t) return; t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, 2600); };

  /* Dialog helper (native <dialog> gives focus containment and Esc) */
  KC.openDialog = function (d, opener) { d._opener = opener || document.activeElement; if (d.showModal) d.showModal(); else d.setAttribute('open', ''); document.documentElement.classList.add('has-modal'); };
  KC.closeDialog = function (d) { if (d.close) d.close(); else d.removeAttribute('open'); };
  KC.initDialogs = function () {
    KC.$$('dialog').forEach(function (d) {
      d.addEventListener('close', function () { document.documentElement.classList.remove('has-modal'); if (d._opener && d._opener.focus && document.contains(d._opener)) d._opener.focus(); });
      d.addEventListener('click', function (e) { if (e.target === d) KC.closeDialog(d); });
    });
    document.addEventListener('click', function (e) { var c = e.target.closest('[data-close]'); if (c) { var d = c.closest('dialog'); if (d) KC.closeDialog(d); } });
  };

  G.KC = KC;
})(window);
