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
  assert.equal((data.match(/title: 'Placeholder/g) ?? []).length, 7);
});

test('shelf physics switches to two supported rows on mobile and groups intra-tier supports', () => {
  assert.match(script, /const hasTwoRows = mobileLayout && books\.length > 1/);
  assert.match(script, /\[\[0, 1\], \[1, 2\], \[2, 3\], \[4, 5\], \[5, 6\]\]/);
  assert.match(css, /\.shelf-platform-lower \{ display: none; \}/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.shelf-platform-lower \{ display: block;/);
});

test('bookshelf shake applies a deliberate physics nudge and reset reconstructs the stable state', () => {
  assert.match(script, /function shakeShelf\(\)/);
  assert.match(script, /Matter\.Body\.setVelocity\(body, \{ x: direction \*/);
  assert.match(script, /function resetShelf\(\)[\s\S]*?configureStage\(\)/);
});

test('reduced motion is wired to clear GSAP entrance/reveal styles and disable physics', () => {
  assert.match(script, /reduceMotion\.addEventListener\('change'/);
  assert.match(script, /gsap\.set\(animNodes, \{ clearProps: 'all' \}\)/);
  assert.match(script, /removeSimulation\(\)[\s\S]*?physics-disabled/);
});
