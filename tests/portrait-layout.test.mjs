import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const css=readFileSync(new URL('../src/styles/global.css',import.meta.url),'utf8');
const content=readFileSync(new URL('../src/styles/content.css',import.meta.url),'utf8');
test('portrait is smaller and has no orange backing block',()=>{
 assert.match(css,/\.portrait-rail[^}]*width:\s*200px/s);
 assert.match(content,/\.personal-cutout\{[^}]*box-shadow:\s*none/s);
});
test('mobile name breaks into two maximized lines',()=>{
 assert.match(css,/@media \(max-width: 760px\)[\s\S]*?\.hero-title\s*\{[^}]*white-space:\s*normal[^}]*font-size:\s*clamp\(76px,\s*24vw,\s*108px\)/s);
 assert.match(css,/@media \(max-width: 760px\)[\s\S]*?\.hero-title span\s*\{[^}]*display:\s*block/s);
});
test('about copy remains centered and sticker sits on the left',()=>{
 assert.match(css,/@media \(min-width: 901px\)[\s\S]*?\.intro-sequence \.currently[^}]*grid-template-columns:\s*90px minmax\(0, 1fr\)/s);
 assert.match(css,/@media \(min-width: 901px\)[\s\S]*?\.intro-sequence \.now-copy[^}]*grid-column:\s*2[^}]*margin:\s*0 auto[^}]*text-align:\s*center/s);
 assert.match(css,/@media \(min-width: 901px\)[\s\S]*?\.intro-sequence \.about-badge[^}]*grid-column:\s*1/s);
 assert.match(css,/@media \(max-width: 900px\)[\s\S]*?\.currently[^}]*grid-template-columns:\s*60px minmax\(0, 1fr\)/s);
 assert.match(css,/@media \(max-width: 900px\)[\s\S]*?\.about-badge[^}]*grid-column:\s*1[^}]*margin:\s*0/s);
});
