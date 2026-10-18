import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const page = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
test('desktop removes review scaffolding rather than hiding it with CSS', () => {
 assert.doesNotMatch(page, /LAYOUT REVIEW|REPLACE BEFORE LAUNCH|REVIEW BUILD|CONTACT PLACEHOLDER|NON-REAL PLACEHOLDERS|INTERACTION EXPERIMENT|REVIEW ITEMS ONLY/);
 assert.match(page, /noindex,nofollow/);
});
test('portrait slot supports a supplied cutout without inventing one', () => {
 assert.match(page, /portraitSrc &&/);
 assert.match(page, /this is me/);
 assert.match(css, /\.portrait-rail[^}]*position: sticky/s);
 assert.match(css, /\.personal-cutout[^}]*rotate\(-6deg\)/s);
});
test('about has wide sans-serif copy with a decorative side badge', () => {
 assert.match(css, /\.now-copy[^}]*max-width: 25ch[^}]*var\(--font-display\)/s);
 assert.match(page, /class="about-badge" aria-hidden="true"/);
});
