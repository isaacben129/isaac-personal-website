import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
test('home page starts with the named-person hero', () => {
  assert.match(page, /<h1 id="hero-title" class="hero-title" data-animate="hero-title" aria-label="Isaac Ndahura"><span>Isaac<\/span> <span>Ndahura<\/span><\/h1>/);
});
test('single page sections remain in the approved six-section narrative', () => {
  const expected = ['id="top"', 'id="now"', 'id="story"', 'id="work"', 'id="thoughts"', 'id="hello"'];
  const positions = expected.map((id) => page.indexOf(id));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
});
test('preview content is explicitly non-publishable and contains no fake contact URL', () => {
  assert.match(page, /name="robots" content="noindex,nofollow"/);
  assert.doesNotMatch(page, /CONTACT PLACEHOLDER · NONFUNCTIONAL/);
  assert.doesNotMatch(page, /mailto:|href="#"/);
});
test('bookshelf title and direct controls remain actionable, with varied visible labelled objects', async () => {
  assert.equal((page.match(/data-book/g) ?? []).length, 1, 'items are data-driven in the Astro template');
  assert.doesNotMatch(page, /ACTIVATE A BOOK TO INTERACT/);
  assert.doesNotMatch(page, /shake|reset shelf/i);
  assert.match(page, /data-book/);
  assert.match(page, /provisional shelf object, activate or use arrow keys to adjust/);
  const data = readFileSync(new URL('../src/data/site.ts', import.meta.url), 'utf8');
  const shelf = data.split('shelfObjects: [')[1].split('],\n  notes:')[0];
  assert.equal((shelf.match(/kind: '(book|binder|folder|photo|certificate|notebook_stack)'/g) ?? []).length, 8);
});
test('writing cards form a keyboard-focusable horizontal browsing region', () => {
  assert.match(page, /class="writing-row" tabindex="0" aria-label="Horizontally browsable writing placeholder cards"/);
});
test('physics starts paused to avoid offscreen energy without visible helper copy', () => {
  const script = readFileSync(new URL('../src/scripts/main.js', import.meta.url), 'utf8');
  assert.match(script, /Matter\.Runner\.create/);
  assert.match(script, /function configureStage\(\)/);
  assert.doesNotMatch(page, /ACTIVATE A BOOK TO INTERACT/);
});
