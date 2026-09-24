const { chromium } = require('playwright');
const V = process.argv[2], W = +(process.argv[3] || 1440);
const BASE = 'file:///home/claude/kp/' + V + '/index.html';
let pass = 0, fail = 0;
const ok = (c, m) => { c ? pass++ : fail++; if (!c || process.env.VERBOSE) console.log((c ? 'PASS ' : 'FAIL ') + V + '@' + W + ' ' + m); };
const J = [['refrigerators', '46-75525'], ['ranges', '22-96853'], ['dishwashers', '22-14625'], ['laundry', '26-41202'], ['floorcare', 'BC4030']];
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: W, height: 900 } });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.route(/^https?:/, r => r.abort());
  const h1 = () => p.$eval('main h1', e => e.textContent.trim());
  const hash = () => p.evaluate(() => location.hash);
  const mobile = W < 1025;

  // ---- Required journeys: Home -> Category -> Product -> Where to buy / manual, plus Back/Forward
  for (const [cat, id] of J) {
    await p.goto(BASE + '#/'); await p.waitForTimeout(350);
    const sel = V === 'v1' ? `.catc[href="#/c/${cat}"]` : `.ct[href="#/c/${cat}"]`;
    await p.click(sel); await p.waitForTimeout(350);
    ok((await hash()).startsWith('#/c/' + cat), `home card -> ${cat}`);
    const cnt = await p.$$eval(V === 'v1' ? '#grid .pcard' : '#grid .card', l => l.length);
    ok(cnt > 0, `${cat} grid has products (${cnt})`);
    await p.click(`#grid a[href="#/p/${encodeURIComponent(id)}"]`); await p.waitForTimeout(350);
    ok((await hash()) === '#/p/' + encodeURIComponent(id), `${cat} card -> PDP ${id}`);
    const t = await h1(); ok(t.length > 10, `PDP h1: ${t.slice(0, 40)}`);
    const wtb = await p.$$eval('a[target="_blank"]', l => l.map(a => a.href));
    ok(wtb.some(h => /where-to-buy|kenmorefloorcare\.com\/products/.test(h)), `${id} has where-to-buy/shop link`);
    ok(wtb.some(h => /\.pdf|manual/i.test(h)), `${id} has manual link`);
    ok(await p.$$eval('nav[aria-label="Breadcrumb"] a', l => l.some(a => a.getAttribute('href').startsWith('#/c/'))), `${id} breadcrumb links to category`);
    // gallery
    const n0 = await p.$$eval(V === 'v1' ? '#thumbs button' : '#strip button', l => l.length);
    if (n0 > 1) {
      await p.click('[data-gs="1"]'); await p.waitForTimeout(250);
      const txt = await p.textContent(V === 'v1' ? '#gcount' : '#gnum'); ok(txt.trim().startsWith('2 /'), `${id} gallery next (${txt.trim()})`);
      await p.click((V === 'v1' ? '#thumbs' : '#strip') + ' [data-g="3"]'); await p.waitForTimeout(250);
      ok((await p.textContent(V === 'v1' ? '#gcount' : '#gnum')).trim().startsWith('4 /'), `${id} gallery thumbnail`);
      await p.focus('#stage'); await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(250);
      ok((await p.textContent(V === 'v1' ? '#gcount' : '#gnum')).trim().startsWith('3 /'), `${id} gallery keyboard`);
    }
    await p.goBack(); await p.waitForTimeout(350);
    ok((await hash()).startsWith('#/c/' + cat), `Back -> ${cat}`);
    await p.goForward(); await p.waitForTimeout(350);
    ok((await hash()).startsWith('#/p/'), `Forward -> PDP`);
    // return path link
    await p.click('a.backl'); await p.waitForTimeout(350);
    ok((await hash()).startsWith('#/c/' + cat), `Back-to-category link`);
  }

  // ---- Mega menu (desktop) incl keyboard
  if (!mobile) {
    await p.goto(BASE + '#/'); await p.waitForTimeout(300);
    await p.focus('#megaBtn'); await p.keyboard.press('Enter'); await p.waitForTimeout(200);
    ok(await p.$eval('#mega', e => e.classList.contains('is-open')), 'mega opens with keyboard');
    await p.keyboard.press('ArrowDown'); await p.waitForTimeout(100);
    ok(await p.evaluate(() => !!document.activeElement.closest('#mega')), 'arrow keys move within mega');
    await p.keyboard.press('Escape'); await p.waitForTimeout(150);
    ok(!(await p.$eval('#mega', e => e.classList.contains('is-open'))), 'Esc closes mega');
    await p.click('#megaBtn'); await p.waitForTimeout(200);
    if (V === 'v1') { await p.click('[data-g="1"]'); await p.waitForTimeout(100); }
    await p.click('#mega a[href="#/c/ranges?sub=gas"]'); await p.waitForTimeout(400);
    ok((await hash()).includes('sub=gas'), 'mega -> gas ranges');
    const subs = await p.$$eval(V === 'v1' ? '#grid .pcard .kicker' : '#grid .card .cl', l => l.map(x => x.textContent));
    ok(subs.length === 4 && subs.every(s => /Gas/.test(s)), 'gas filter applied (' + subs.length + ')');
    const ext = await p.$$eval('#mega a[target="_blank"]', l => l.length); ok(ext >= (V === 'v1' ? 1 : 5), 'mega external links marked (' + ext + ')');
  }

  // ---- Filters, count, sort, chips, empty state
  await p.goto(BASE + '#/c/refrigerators'); await p.waitForTimeout(350);
  const cnt = async () => +(await p.textContent('#count')).trim().split(' ')[0];
  ok(await cnt() === 14, 'refrigerator count 14');
  if (!mobile) {
    if (V === 'v1') await p.check('#fside input[value="Ice maker"]'); else { await p.click('[data-pop="3"]'); await p.check('#fp-3 input[value="Ice maker"]'); await p.keyboard.press('Escape'); }
    await p.waitForTimeout(300); ok(await cnt() === 3, 'filter Ice maker -> 3 (' + await cnt() + ')');
    ok((await hash()).includes('flags=Ice'), 'filter in URL');
  } else {
    await p.click(V === 'v1' ? '#fOpen' : '#mfBtn'); await p.waitForTimeout(250);
    ok(await p.$eval('#dlgFilters', d => d.open), 'mobile filter sheet opens');
    await p.check((V === 'v1' ? '#fdBody' : '#fsBody') + ' input[value="Ice maker"]'); await p.waitForTimeout(300);
    ok(await cnt() === 3, 'mobile filter -> 3');
    ok((await p.textContent(V === 'v1' ? '#fdShow' : '#fsShow')).includes('3'), 'sheet shows result count');
    await p.click(V === 'v1' ? '#fdShow' : '#fsShow'); await p.waitForTimeout(200);
    ok(!(await p.$eval('#dlgFilters', d => d.open)), 'sheet closes');
  }
  await p.selectOption('#sort', 'cap-desc'); await p.waitForTimeout(300);
  const firstName = await p.$eval('#grid h3 a', a => a.textContent); ok(/^20\.4|^18\.1|^17\.8|^17\.5/.test(firstName), 'sort by capacity desc: ' + firstName.slice(0, 20));
  await p.click('#chips [data-clear]'); await p.waitForTimeout(300); ok(await cnt() === 14, 'clear filters -> 14');
  await p.click('[data-sub="mini"]'); await p.waitForTimeout(300); ok(await cnt() === 2, 'subcategory tile -> 2 mini');
  await p.evaluate(() => { location.hash = '#/c/refrigerators?sub=mini&flags=Ice%20maker'; }); await p.waitForTimeout(400);
  ok(await p.$('#grid .empty') !== null, 'empty-results state');
  await p.click('#grid .empty [data-clear]'); await p.waitForTimeout(300); ok(await cnt() === 14, 'empty state clear');
  // category-specific filters are different
  await p.goto(BASE + '#/c/floorcare'); await p.waitForTimeout(300);
  const labels = await p.evaluate(() => [...document.querySelectorAll(window.innerWidth > 1024 ? '#fside legend, [data-pop]' : '#subrail, #subnav')].map(e => e.textContent.trim()).join('|'));
  ok(!/Capacity|Ice/.test(labels), 'floor care has no fridge filters');
  await p.goto(BASE + '#/c/dishwashers'); await p.waitForTimeout(300);
  await p.click('[data-sub="UltraWash® Plus"]'); await p.waitForTimeout(300); ok(await cnt() === 6, 'dishwasher UltraWash Plus -> 6 (' + await cnt() + ')');

  // ---- Compare
  await p.goto(BASE + '#/c/laundry'); await p.waitForTimeout(300);
  const cb = V === 'v1' ? '.cmpbtn' : '.cmpc';
  await p.click(`#grid ${cb}[data-cmp="26-42272"]`); await p.click(`#grid ${cb}[data-cmp="26-41202"]`); await p.waitForTimeout(200);
  ok(await p.$eval(V === 'v1' ? '#tray' : '#cbar', e => e.classList.contains('on')), 'compare bar shows');
  if (V === 'v1') { await p.click('#cmpGo'); await p.waitForTimeout(250); ok(await p.$$eval('#cmpBody thead th', l => l.length) === 3, 'compare dialog 2 products'); await p.keyboard.press('Escape'); }
  else { await p.click('#cbar a[href="#/compare"]'); await p.waitForTimeout(350); ok(await p.$$eval('.ctable thead th', l => l.length) === 3, 'compare page 2 products'); await p.check('#onlyDiff'); ok(await p.$$eval('.ctable tbody tr:not([hidden])', l => l.length) >= 1, 'only-differences toggle'); await p.goBack(); await p.waitForTimeout(300); }
  await p.goto(BASE + '#/c/ranges'); await p.waitForTimeout(300);
  await p.click(`#grid ${cb}`); await p.waitForTimeout(200);
  ok((await p.textContent('#toast')).includes('one category'), 'cross-category compare blocked');

  // ---- Search
  await p.goto(BASE + '#/'); await p.waitForTimeout(300);
  if (V === 'v1') { await p.click('[data-search]'); await p.fill('#sIn', '22-14625'); await p.waitForTimeout(150); ok(await p.$('#sRes a[href="#/p/22-14625"]') !== null, 'search model number -> result'); await p.click('#sRes a[href="#/p/22-14625"]'); }
  else { await p.fill('#hsIn', '22-14625'); await p.waitForTimeout(150); ok(await p.$('#drop a[href="#/p/22-14625"]') !== null, 'search model number -> result'); await p.press('#hsIn', 'ArrowDown'); await p.keyboard.press('Enter'); }
  await p.waitForTimeout(350); ok((await hash()) === '#/p/22-14625', 'search result opens PDP');
  await p.goto(BASE + '#/search?q=french%20door'); await p.waitForTimeout(300);
  ok(await p.$$eval('main a[href^="#/p/"]', l => l.length) >= 4, 'search by name returns products');
  await p.goto(BASE + '#/search?q=qqqzzz'); await p.waitForTimeout(300);
  ok(/No results/i.test(await p.textContent('main')), 'no-results state');

  // ---- Mobile nav
  if (mobile) {
    await p.goto(BASE + '#/'); await p.waitForTimeout(300);
    await p.click('#menuBtn'); await p.waitForTimeout(200); ok(await p.$eval('#dlgMenu', d => d.open), 'mobile menu opens');
    await p.click('#dlgMenu summary >> nth=2'); await p.waitForTimeout(100);
    await p.click('#dlgMenu a[href="#/c/dishwashers"]'); await p.waitForTimeout(400);
    ok((await hash()).startsWith('#/c/dishwashers') && !(await p.$eval('#dlgMenu', d => d.open)), 'mobile menu -> dishwashers');
  }
  // ---- Header links: where to buy scroll + spy
  await p.goto(BASE + '#/c/ranges'); await p.waitForTimeout(300);
  await p.click(mobile ? (V === 'v1' ? '#menuBtn' : '.m-right a[data-to="buy"]') : (V === 'v1' ? '.nav a[data-to="buy"]' : '.hlinks a[data-to="buy"]'));
  if (mobile && V === 'v1') { await p.waitForTimeout(200); await p.click('#dlgMenu a[href="#/?to=buy"]'); }
  await p.waitForTimeout(700);
  ok(await p.evaluate(() => Math.abs(document.getElementById('buy').getBoundingClientRect().top) < 260), 'Where to Buy -> home #buy');
  await p.fill('#zip', '123'); await p.click('#zipF button'); ok(!(await p.$eval('#zipE', e => e.hidden)), 'zip validation');
  await p.fill('#zip', '60601'); await p.click('#zipF button'); ok((await p.textContent('#zres')).includes('60601'), 'zip result');

  // ---- Link integrity across all routes
  const routes = ['#/', ...J.map(j => '#/c/' + j[0]), ...J.map(j => '#/p/' + encodeURIComponent(j[1])), '#/p/46-62312', '#/p/DU1099', '#/search?q=dryer'];
  for (const r of routes) {
    await p.goto(BASE + r); await p.waitForTimeout(300);
    const bad = await p.evaluate(() => { const out = []; document.querySelectorAll('a').forEach(a => { const h = a.getAttribute('href') || ''; if (!h || h === '#') out.push('empty:' + a.textContent.trim().slice(0, 20)); if (a.target === '_blank' && !/noopener/.test(a.rel)) out.push('rel:' + h); if (/^https?:/.test(h) && a.target !== '_blank') out.push('ext-same-tab:' + h); }); return out; });
    ok(!bad.length, 'links ok on ' + r + ' ' + bad.slice(0, 3).join(','));
    const hashes = await p.$$eval('a[href^="#/"]', l => [...new Set(l.map(a => a.getAttribute('href')))]);
    for (const h of hashes) { const nm = await p.evaluate(h => { const save = location.hash; history.replaceState(null, '', h); const r = KC.parse().name; history.replaceState(null, '', save); return r; }, h); if (nm === 'notfound') ok(false, 'dead route ' + h); }
    const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth); ok(ov <= 0, 'no horizontal overflow ' + r + ' (' + ov + ')');
  }
  ok(!errs.length, 'no JS errors ' + errs.join(' | '));
  console.log(`${V}@${W}: ${pass} passed, ${fail} failed`);
  await b.close();
})();
