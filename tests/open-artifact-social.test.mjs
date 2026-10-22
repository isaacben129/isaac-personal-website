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

test('detail view is a type-specific opened artifact with visual and reading regions',()=>{
 assert.match(page,/class="open-artifact/); assert.match(page,/artifact-visual/); assert.match(page,/artifact-copy/); assert.match(page,/artifact-cloth-hinge/);
 assert.match(page,/data-preview-kind/); assert.match(page,/media-placeholder/); assert.match(page,/data-preview-description/);
 assert.match(css,/data-presentation='tall_hardcover'/);
 assert.match(css,/data-presentation='landscape_art_book'/);
 assert.match(css,/\.preview-close\s*\{[^}]*top:/s);
});

test('detail view adapts object type and opens without disturbing physics',()=>{
 assert.match(script,/dataset\.openPresentation/); assert.match(script,/activeVariant/); assert.match(script,/dataset\.previewKind/); assert.match(script,/workPreview\.dataset\.presentation/);
 assert.match(script,/gsap\.fromTo\(openArtifact/); assert.match(script,/transformOrigin/);
 const openFn=script.split('function openWorkPreview')[1].split('function closeWorkPreview')[0]; assert.doesNotMatch(openFn,/configureStage\(\)/);
});

test('mobile detail becomes a near-full-height bottom spread',()=>{
 assert.match(css,/@media \(max-width: 767px\)[\s\S]*\.work-preview[^}]*inset:\s*auto 0 0/s);
 assert.match(css,/@media \(max-width: 767px\)[\s\S]*\.open-artifact[^}]*grid-template-rows:\s*auto minmax\(0,1fr\) auto/s);
});
