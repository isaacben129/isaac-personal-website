import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const page=readFileSync(new URL('../src/pages/index.astro',import.meta.url),'utf8');
const data=readFileSync(new URL('../src/data/site.ts',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/styles/global.css',import.meta.url),'utf8');
const script=readFileSync(new URL('../src/scripts/main.js',import.meta.url),'utf8');
test('collage exposes six varied honest placeholder artifacts',()=>{
 const fragments=data.split('fragments: [')[1].split('],\n  works:')[0]; assert.equal((fragments.match(/kind: '(photo|note|sketch|journal|screenshot)'/g)??[]).length,6);
 for(const kind of ['photo','note','sketch','journal','screenshot']) assert.match(data,new RegExp(`kind: '${kind}'`));
 assert.match(page,/data-fragment-stage/); assert.match(page,/data-fragment-card/);
});
test('artifact selection has a real story panel and close affordance',()=>{
 assert.match(page,/data-fragment-panel/); assert.match(page,/data-fragment-close/);
 assert.match(page,/data-fragment-title/); assert.match(page,/data-fragment-story/);
 assert.match(script,/const FragmentState = Object\.freeze\(\{ RESTING:/);
 assert.match(script,/function selectFragment/); assert.match(script,/function closeFragment/);
 assert.match(script,/event\.key === 'Escape'/);
});
test('collage uses GSAP focal choreography with reduced-motion fallback',()=>{
 assert.match(script,/fragmentTimeline/); assert.match(script,/\.to\(fragmentCards,/);
 assert.match(script,/reduceMotion\.matches/); assert.match(css,/\.fragment-stage\.is-selected/);
 assert.match(css,/@media \(max-width: 760px\)[\s\S]*?\.fragment-stage/s);
 assert.match(css,/@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.fragment-card/s);
});
