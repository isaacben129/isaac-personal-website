import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const page = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const script = readFileSync(new URL('../src/scripts/main.js', import.meta.url), 'utf8');

test('bookshelf has two supported tiers and four upper, three lower placeholders', () => {
  assert.match(page, /data-shelf-row="1"/);
  assert.match(page, /data-shelf-row="2"/);
  assert.match(page, /data-row=\{book\.id <= '04' \? 'upper' : 'lower'\}/);
  const data = readFileSync(new URL('../src/data/site.ts', import.meta.url), 'utf8');
  assert.equal((data.match(/slug: '[^']+-project'/g) ?? []).length, 7);
});

test('shelf physics uses supported authored positions on desktop and two supported rows on mobile', () => {
  assert.match(script, /const hasTwoRows = mobileLayout && books\.length > 1/);
  assert.match(script, /shelf-middle/);
  assert.match(script, /Matter\.Bodies\.rectangle/);
  assert.match(css, /\.shelf-platform-lower \{ display: none; \}/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.shelf-platform-lower \{ top:/);
});

test('direct shelf interaction has no group shake/reset behavior', () => {
  assert.doesNotMatch(script, /function shakeShelf\(\)|function resetShelf\(\)|SHAKE|RESET/);
  assert.match(script, /pointerdown/);
  assert.match(script, /data-book/);
});

test('reduced motion clears entrance/reveal styles and shelf initializes to a stable static state', () => {
  assert.match(script, /reduceMotion\.addEventListener\('change'/);
  assert.match(script, /gsap\.set\(animNodes, \{ clearProps: 'all' \}\)/);
  assert.match(script, /Matter\.Bodies\.rectangle/);
  assert.match(script, /isStatic: true/);
});
