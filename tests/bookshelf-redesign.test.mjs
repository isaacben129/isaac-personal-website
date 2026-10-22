import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const page=readFileSync('src/pages/index.astro','utf8');
const css=readFileSync('src/styles/global.css','utf8');
const data=readFileSync('src/data/site.ts','utf8');
const script=readFileSync('src/scripts/main.js','utf8');

test('fragment hover preserves authored layer order',()=>{
 assert.doesNotMatch(css,/\.fragment-card:hover\s*\{[^}]*z-index/s);
 assert.match(css,/\.fragment-card:hover\s*\{[^}]*transform:/s);
 assert.match(css,/\.fragment-card:hover\s+\.fragment-art|\.fragment-card:hover\s*\{/);
});

test('shelf data supports a mixed system rather than books only',()=>{
 for(const kind of ['book','binder','folder','photo','certificate','notebook_stack']) assert.match(data,new RegExp(`kind: '${kind}'`));
 assert.match(data,/shelfObjects:/); assert.match(data,/dimensions:/); assert.match(data,/labelStyle:/); assert.match(data,/detail:/);
});

test('shelf renders polymorphic object markup from data',()=>{
 assert.match(page,/const shelfMarkup = site\.shelfObjects/); assert.match(page,/data-shelf-object/); assert.match(page,/data-object-kind=\{item\.kind\}/); assert.match(page,/shelf-object-/);
 assert.match(page,/framed_image_artifact/); assert.match(page,/certificate_keyring/); assert.match(page,/rust_archival_box_file/);
});

test('shelf objects use a full-width grounded editorial composition',()=>{
 assert.match(css,/\.shelf-object\s*\{[^}]*position:\s*absolute/s); assert.match(css,/\.shelf-object\s*\{[^}]*bottom:/s);
 assert.match(css,/data-render-archetype='olive_ring_binder'/); assert.match(css,/data-render-archetype='rust_archival_box_file'/); assert.match(css,/data-render-archetype='framed_image_artifact'/); assert.match(css,/data-render-archetype='certificate_keyring'/);
 assert.match(css,/@media \(max-width: 760px\)[\s\S]*\.shelf-collection[^}]*overflow-x:\s*auto/);
});

test('drag physics remains while mixed object geometry drives Matter bodies',()=>{
 assert.match(page,/data-preview-slug/); assert.match(script,/data-shelf-object/); assert.match(script,/Matter\.Bodies\.rectangle/); assert.match(script,/pointerdown/); assert.match(script,/el\.offsetWidth/); assert.match(script,/el\.offsetHeight/);
});
