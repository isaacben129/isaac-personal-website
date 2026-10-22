import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const page=readFileSync('src/pages/index.astro','utf8');
const css=readFileSync('src/styles/content.css','utf8');
const global=readFileSync('src/styles/global.css','utf8');
const script=readFileSync('src/scripts/main.js','utf8');
const data=readFileSync('src/data/site.ts','utf8');

test('persistent social rail is visible without inventing destinations',()=>{
 assert.match(page,/class="social-rail"/); assert.match(page,/aria-label="Social links"/);
 for(const label of ['GitHub','LinkedIn','X']) assert.match(data,new RegExp(`label: '${label}'`));
 assert.match(data,/href: null/); assert.match(page,/social\.href/); assert.doesNotMatch(page,/href="#"/);
 assert.match(global,/\.social-rail\s*\{[^}]*position:\s*fixed/s);
});

test('detail view is a large opened artifact with visual and reading pages',()=>{
 assert.match(page,/class="open-artifact/); assert.match(page,/open-artifact-visual/); assert.match(page,/open-artifact-reading/); assert.match(page,/open-artifact-gutter/);
 assert.match(page,/data-preview-kind/); assert.match(page,/data-preview-visual/); assert.match(page,/data-preview-description/);
 assert.match(css,/\.work-preview\s*\{[^}]*width:\s*min\(90vw,\s*1500px\)/s);
 assert.match(css,/\.open-artifact\s*\{[^}]*height:\s*min\(82vh/s);
 assert.match(css,/\.preview-close\s*\{[^}]*top:/s);
});

test('detail view adapts object type and opens without disturbing physics',()=>{
 assert.match(script,/previewKind/); assert.match(script,/previewVisual/); assert.match(script,/dataset\.previewKind/); assert.match(script,/workPreview\.dataset\.kind/);
 assert.match(script,/gsap\.fromTo\(openArtifact/); assert.match(script,/scaleX/);
 const openFn=script.split('function openWorkPreview')[1].split('function closeWorkPreview')[0]; assert.doesNotMatch(openFn,/configureStage\(\)/);
});

test('mobile detail becomes a near-full-height bottom spread',()=>{
 assert.match(css,/@media \(max-width: 760px\)[\s\S]*\.work-preview[^}]*inset:\s*auto 0 0/s);
 assert.match(css,/@media \(max-width: 760px\)[\s\S]*\.open-artifact[^}]*grid-template-columns:\s*1fr/s);
});
