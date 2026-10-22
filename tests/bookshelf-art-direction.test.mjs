import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const data = readFileSync(new URL('../src/data/site.ts', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/styles/content.css', import.meta.url), 'utf8');
const shelfCss = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('../src/scripts/main.js', import.meta.url), 'utf8');

const archetypes = [
  'clothbound_tall_volume','slim_swiss_paperback','wide_art_book','rust_archival_box_file',
  'olive_ring_binder','framed_image_artifact','certificate_keyring','horizontal_notebook_stack',
];
const presentations = [
  'tall_hardcover','tall_paperback','landscape_art_book','archival_folder',
  'binder_dossier','photo_object','certificate_document','notes_stack',
];

test('every shelf record declares a distinct archetype and opened presentation', () => {
  for (const value of archetypes) assert.match(data, new RegExp(`renderArchetype: '${value}'`));
  for (const value of presentations) assert.match(data, new RegExp(`presentation: '${value}'`));
  assert.match(page, /data-render-archetype=/);
  assert.match(page, /data-open-presentation=/);
});

test('shelf renderer has explicit physical layers and at least five distinguishable recipes', () => {
  for (const layer of ['object-surface','object-construction','object-type','object-identity','object-highlight','object-contact']) assert.match(page, new RegExp(layer));
  for (const value of archetypes) assert.match(shelfCss, new RegExp(`data-render-archetype=['"]${value}['"]`));
});

test('opened artifact uses type-specific structures rather than a universal two-page visual', () => {
  for (const variant of presentations) assert.match(page, new RegExp(`data-presentation=['"]${variant}['"]`));
  assert.match(css, /\.artifact-folder-pocket/);
  assert.match(css, /\.artifact-binder-rings/);
  assert.match(css, /\.artifact-photo-mount/);
  assert.match(css, /\.artifact-certificate-document/);
  assert.match(css, /\.artifact-notes-stack/);
  assert.match(css, /data-presentation='tall_hardcover'/);
  assert.match(css, /data-presentation='photo_object'/);
});

test('preview behavior uses explicit presentation metadata and honest missing-media fallback', () => {
  assert.match(js, /presentation: book\.dataset\.openPresentation/);
  assert.match(js, /workPreview\.dataset\.presentation = item\.presentation/);
  assert.match(page, /Image coming soon/);
  assert.doesNotMatch(page, /visual-sheet-main[^\n]*<i/);
  assert.doesNotMatch(js, /This provisional spread is ready/);
});

test('mobile sheet has handle, scroll region and anchored action area', () => {
  assert.match(page, /mobile-sheet-handle/);
  assert.match(page, /artifact-scroll-region/);
  assert.match(page, /artifact-action-area/);
  assert.match(css, /@media \(max-width: 767px\)/);
  assert.match(css, /grid-template-rows:[^;]*auto[^;]*minmax\(0,1fr\)[^;]*auto/);
  assert.match(css, /min-height:\s*48px/);
});
