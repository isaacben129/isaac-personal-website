import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
test('production material tiles are real compressed images shipped with the site', () => {
  for (const material of ['printed-jacket', 'paper', 'bookboard', 'walnut']) {
    const image = readFileSync(new URL(`public/images/materials/${material}.webp`, root));
    assert.equal(image.toString('ascii', 0, 4), 'RIFF');
    assert.equal(image.toString('ascii', 8, 12), 'WEBP');
    assert.ok(image.length < 200_000, 'each texture should stay below 200 kB');
  }
});

test('books use complete generated image assets with accessible project names', () => {
  const css = readFileSync(new URL('src/styles/materials.css', root), 'utf8');
  for (const [, path] of css.matchAll(/url\(['"]?(\/images\/[^)'" ]+)/g)) {
    assert.ok(existsSync(new URL(`public${path}`, root)), `missing material: ${path}`);
  }
  const page = readFileSync(new URL('src/pages/index.astro', root), 'utf8');
  assert.match(page, /class="generated-spine-image"/);
  assert.match(page, /aria-label=\{`\$\{item.title\}/);
  for (const asset of ['cherry-spine','held-spine','fapcount-spine','careledger-spine','open-book']) {
    const image = readFileSync(new URL(`public/images/books/${asset}.webp`, root));
    assert.equal(image.toString('ascii', 8, 12), 'WEBP');
    assert.ok(image.includes(Buffer.from('ALPH')), `${asset} must preserve its cutout alpha`);
  }
});
