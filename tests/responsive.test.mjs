import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
test('desktop hero uses a fluid single-line name and viewport-bounded condensed type', () => {
  assert.match(css, /\.hero-title\s*\{[^}]*white-space:\s*nowrap/s);
  assert.match(css, /font:\s*700 clamp\(86px, 19\.3vw, 260px\)\/\.76 var\(--display\)/);
});
test('small screens explicitly adapt hero type and bookshelf spine layout', () => {
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.hero-title\s*\{[^}]*font-size:\s*clamp\(80px, 20vw, 148px\)/);
  assert.match(css, /\.book-body:nth-child\(7\)\s*\{\s*left:/);
  assert.match(css, /\.writing-row\s*\{[^}]*overflow-x:\s*auto/s);
});
