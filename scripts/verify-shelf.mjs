// Run with PLAYWRIGHT_MODULE pointing to an installed Playwright index.mjs.
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
const evidence = process.env.EVIDENCE_DIR || '.artifacts/evidence/shelf-fix';
mkdirSync(evidence, {recursive:true});
const browser=await chromium.launch({headless:true});
try {
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(process.env.URL||'http://127.0.0.1:4324/');await page.evaluate(()=>document.fonts.ready);
await page.locator('[data-shelf]').scrollIntoViewIfNeeded();await page.waitForTimeout(1200);
const geometry=await page.evaluate(()=>{const s=document.querySelector('[data-shelf]').getBoundingClientRect();const floor=document.querySelector('.shelf-platform').getBoundingClientRect();return [...document.querySelectorAll('[data-book]')].map(b=>{const r=b.getBoundingClientRect();return {bottom:r.bottom-s.top,top:r.top-s.top,floor:floor.top-s.top,height:s.height};});});
console.log('geometry',geometry);
await page.locator('#work').screenshot({path:`${evidence}/current.png`});
assert.ok(geometry.every(b=>b.top>=0 && b.bottom<=b.height),'all books must fit the shelf stage');
assert.ok(geometry.every(b=>Math.abs(b.bottom-b.floor)<6),'book bases must contact visible board');
const book=page.locator('[data-book]').nth(2);const a=await book.boundingBox();
await page.mouse.move(a.x+a.width/2,a.y+35);await page.mouse.down();await page.mouse.move(a.x+a.width/2+60,a.y-75,{steps:25});await page.waitForTimeout(250);
const lifted=await book.boundingBox();console.log('lift',{before:a.y,after:lifted.y});assert.ok(lifted.y<a.y-40,'drag must lift the actual book');
await page.screenshot({path:`${evidence}/drag.png`});
await page.mouse.up();await page.waitForTimeout(2500);const settled=await book.boundingBox();console.log('settle',{lifted:lifted.y,settled:settled.y});assert.ok(settled.y>lifted.y+30,'released book must fall with gravity');
await book.focus();const before=await book.boundingBox();await page.keyboard.press('ArrowUp');await page.waitForTimeout(70);const after=await book.boundingBox();assert.ok(after.y<before.y-2,'keyboard must move book');
assert.deepEqual(errors,[]);await page.waitForTimeout(2500);await page.locator('#work').screenshot({path:`${evidence}/after.png`});
console.log('PASS drag, release, keyboard, support, containment, no browser errors');
await page.setViewportSize({width:1280,height:900});await page.waitForTimeout(400);
await page.locator('[data-shelf]').scrollIntoViewIfNeeded();
const resized=await page.locator('[data-book]').evaluateAll(bs=>bs.every(b=>{const r=b.getBoundingClientRect(),s=b.closest('[data-shelf]').getBoundingClientRect();return r.top>=s.top && r.bottom<=s.bottom;}));
assert.ok(resized,'resize keeps all books visible');
for(const opts of [{reducedMotion:'reduce'},{javaScriptEnabled:false}]){
 const p=await browser.newPage({viewport:{width:1440,height:1000},...opts});await p.goto(process.env.URL||'http://127.0.0.1:4324/');await p.locator('[data-shelf]').scrollIntoViewIfNeeded();await p.waitForTimeout(400);
 const boxes=await p.locator('[data-book]').evaluateAll(bs=>bs.map(b=>{const r=b.getBoundingClientRect(),s=b.closest('[data-shelf]').getBoundingClientRect(),f=b.closest('[data-shelf]').querySelector('.shelf-platform').getBoundingClientRect();return {inside:r.top>=s.top&&r.bottom<=s.bottom,contact:Math.abs(r.bottom-f.top)<6};}));
 assert.ok(boxes.every(b=>b.inside&&b.contact),'fallback/reduced motion is supported and contained');
 if(opts.reducedMotion){const book=p.locator('[data-book]').first();const start=await book.boundingBox();await book.click();await p.waitForTimeout(700);const end=await book.boundingBox();assert.ok(Math.abs(start.y-end.y)<1,'reduced motion must not start simulation');}
 await p.close();
}
console.log('PASS resize, reduced-motion, JavaScript-disabled fallback');
} finally {await browser.close();}
