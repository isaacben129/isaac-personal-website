import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const home=readFileSync(new URL('../src/pages/index.astro',import.meta.url),'utf8');
const site=readFileSync(new URL('../src/data/site.ts',import.meta.url),'utf8');
const layout=readFileSync(new URL('../src/layouts/EditorialPage.astro',import.meta.url),'utf8');
const work=readFileSync(new URL('../src/pages/projects/[slug].astro',import.meta.url),'utf8');
const article=readFileSync(new URL('../src/pages/articles/[slug].astro',import.meta.url),'utf8');
const script=readFileSync(new URL('../src/scripts/main.js',import.meta.url),'utf8');
test('supplied portrait is used in the hero and no fake cutout is shipped',()=>{
 assert.match(home,/const portraitSrc = '\/images\/isaac-portrait\.jpg'/);
 assert.ok(existsSync(new URL('../public/images/isaac-portrait.jpg',import.meta.url)));
 assert.match(home,/this is me/);
});
test('project and article route templates exist with honest empty-content states',()=>{
 assert.match(work,/getStaticPaths/);assert.match(article,/getStaticPaths/);assert.match(layout,/Back to home/);
 assert.match(site,/slug: 'first-project'/);assert.match(site,/slug: 'first-note'/);
 assert.doesNotMatch(site,/https?:\/\//);
});
test('book activation opens a semantic preview with a details page action',()=>{
 assert.match(home,/<dialog class="work-preview"/);assert.match(home,/Read more/);
 assert.match(script,/openWorkPreview/);assert.match(script,/showModal/);
 assert.match(home,/data-preview-slug=\{item\.slug\}/);
});
test('homepage articles link to local article pages',()=>{
 assert.match(home,/href=\{`\/articles\/\$\{note\.slug\}\/`\}/);
});
