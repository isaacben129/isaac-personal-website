import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
const url=process.env.URL||'http://127.0.0.1:4331/';
const out='.artifacts/evidence/open-artifact-social'; mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});
try{
 for(const [name,viewport] of Object.entries({desktop:{width:1440,height:1000},mobile:{width:390,height:844}})){
  const page=await browser.newPage({viewport}); const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url); await page.evaluate(()=>document.fonts.ready); await page.locator('[data-shelf]').scrollIntoViewIfNeeded(); await page.waitForTimeout(800);
  const before=await page.locator('[data-shelf-object]').nth(0).boundingBox(); await page.locator('[data-shelf-object]').nth(0).evaluate(el=>el.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}))); await page.waitForTimeout(800);
  assert.equal(await page.locator('[data-work-preview]').getAttribute('open'),'');
  const metrics=await page.evaluate(()=>{const d=document.querySelector('[data-work-preview]').getBoundingClientRect(),r=document.querySelector('.social-rail').getBoundingClientRect();return {dialog:{x:d.x,y:d.y,w:d.width,h:d.height},social:{x:r.x,y:r.y,w:r.width,h:r.height},kind:document.querySelector('[data-work-preview]').dataset.kind,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth};});
  assert.equal(metrics.overflow,0); assert.equal(metrics.kind,'book'); assert.deepEqual(errors,[]);
  if(name==='desktop'){assert.ok(metrics.dialog.w>1100);assert.ok(metrics.dialog.h>700);} else {assert.ok(metrics.dialog.h>700);assert.ok(metrics.dialog.y>0);}
  await page.screenshot({path:`${out}/${name}-open.png`,fullPage:false});
  await page.locator('[data-preview-close]').click(); await page.waitForTimeout(500); assert.equal(await page.locator('[data-work-preview]').getAttribute('open'),null);
  const after=await page.locator('[data-shelf-object]').nth(0).boundingBox(); assert.ok(Math.abs(after.x-before.x)<8&&Math.abs(after.y-before.y)<8,'shelf object must retain its arrangement');
  console.log(name,metrics);
 }
}finally{await browser.close();}
