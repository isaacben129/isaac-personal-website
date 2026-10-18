import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
test('desktop hero uses a fluid single-line name and viewport-bounded condensed type', () => {
  assert.match(css, /\.hero-title\s*\{[^}]*white-space:\s*nowrap/s);
  assert.match(css, /font:\s*700 clamp\(86px, 19\.3vw, 260px\)\/\.84 var\(--font-display\)/);
});
test('small screens explicitly adapt hero type and bookshelf spine layout', () => {
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.hero-title\s*\{[^}]*font-size:\s*clamp\(60px, 13\.2vw, 98px\)/);
  assert.match(css, /\.book-body:nth-child\(7\)\s*\{\s*left:/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.shelf-platform-lower \{ top:/);
  assert.match(css, /\.writing-row\s*\{[^}]*overflow-x:\s*auto/s);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.writing-row\s*\{\s*grid-auto-columns:\s*minmax\(68vw, 1fr\);/);
});
