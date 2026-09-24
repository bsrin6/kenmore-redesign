const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
for (const v of ['v1','v2']) for (const rm of ['reduce','no-preference']) {
 const c=await b.newContext({viewport:{width:1440,height:900},reducedMotion:rm});const p=await c.newPage();await p.route(/^https?:/,r=>r.abort());
 for (const h of ['#/','#/c/laundry','#/p/22-96853']){await p.goto('file:///home/claude/kp/'+v+'/index.html'+h);await p.waitForTimeout(rm==='reduce'?200:1500);
  const hidden=await p.evaluate(()=>{const H=innerHeight;return [...document.querySelectorAll('[data-rv],.ld,.mask>span')].filter(e=>{const r=e.getBoundingClientRect();return r.top<H&&r.bottom>0&&(getComputedStyle(e).opacity<0.99||getComputedStyle(e).transform!=='none')}).length});
  console.log(v,rm,h,'in-view elements not settled:',hidden);}
 await c.close();}
// animation JS failure: block app.js -> fallback timer removes .anim
const c=await b.newContext();const p=await c.newPage();await p.route(/^https?:/,r=>r.abort());await p.route(/app\.js$/,r=>r.abort());
await p.goto('file:///home/claude/kp/v1/index.html');await p.waitForTimeout(2800);console.log('app.js blocked -> anim class removed:',!(await p.evaluate(()=>document.documentElement.classList.contains('anim'))), 'header visible:', await p.$eval('#hdr',e=>getComputedStyle(e).opacity));
await b.close()})();
