import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
const url=process.env.URL||'http://127.0.0.1:4331/';
const out='.artifacts/evidence/bookshelf-art-direction/after'; mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});
try {
  for (const width of [1440,1920]) {
    const page=await browser.newPage({viewport:{width,height:1080}}); const errors=[]; page.on('pageerror',e=>errors.push(e.message));
    await page.goto(url); await page.evaluate(()=>document.fonts.ready); await page.locator('[data-shelf]').scrollIntoViewIfNeeded(); await page.waitForTimeout(900);
    assert.equal(await page.locator('[data-shelf-object]').count(),8); assert.deepEqual(errors,[]);
    await page.screenshot({path:`${out}/shelf-${width}.png`}); await page.close();
  }
  const desktop=await browser.newPage({viewport:{width:1440,height:1000}}); await desktop.goto(url); await desktop.evaluate(()=>document.fonts.ready); await desktop.locator('[data-shelf]').scrollIntoViewIfNeeded(); await desktop.waitForTimeout(700);
  for (const [,name,presentation] of [[0,'book','tall_hardcover'],[3,'folder','archival_folder'],[4,'binder','binder_dossier'],[5,'photo','photo_object'],[6,'certificate','certificate_document'],[7,'notes','notes_stack']]) {
    await desktop.evaluate((presentation)=>{const dialog=document.querySelector('[data-work-preview]');if(dialog.open)dialog.close();const el=document.querySelector(`[data-open-presentation="${presentation}"]`);el.focus();el.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));},presentation);
    await desktop.waitForTimeout(500); assert.equal(await desktop.locator('[data-work-preview]').getAttribute('data-presentation'),presentation);
    await desktop.screenshot({path:`${out}/desktop-${name}.png`}); await desktop.evaluate(()=>document.querySelector('[data-work-preview]').close()); await desktop.waitForTimeout(100);
  }
  await desktop.close();
  for (const [width,height] of [[390,844],[320,700]]) {
    const page=await browser.newPage({viewport:{width,height}}); await page.goto(url); await page.evaluate(()=>document.fonts.ready); await page.locator('[data-shelf]').scrollIntoViewIfNeeded(); await page.waitForTimeout(500);
    await page.locator('[data-shelf-object]').nth(0).click(); await page.waitForTimeout(500);
    const m=await page.evaluate(()=>{const d=document.querySelector('[data-work-preview]').getBoundingClientRect(),a=document.querySelector('.artifact-action-area').getBoundingClientRect(),v=document.querySelector('.artifact-variant:not([hidden]) .artifact-visual').getBoundingClientRect();return{d,a,v,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth}});
    assert.equal(m.overflow,0); assert.ok(m.a.bottom<=height+1&&m.a.height>=48); assert.ok(m.v.height>=height*.3);
    await page.screenshot({path:`${out}/mobile-${width}x${height}.png`}); await page.close();
  }
  console.log('PASS shelf 1440/1920; six desktop variants; mobile 390x844 and 320x700');
} finally { await browser.close(); }
