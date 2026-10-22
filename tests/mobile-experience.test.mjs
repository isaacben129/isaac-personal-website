import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const page=readFileSync('src/pages/index.astro','utf8');
const css=readFileSync('src/styles/global.css','utf8');
const script=readFileSync('src/scripts/main.js','utf8');

test('mobile has an accessible full-screen menu shell',()=>{
 assert.match(page,/data-menu-toggle/); assert.match(page,/aria-expanded="false"/); assert.match(page,/data-mobile-menu/); assert.match(page,/data-menu-close/);
 assert.match(css,/@media \(max-width: 760px\)[\s\S]*\.mobile-menu[^}]*position:\s*fixed[\s\S]*inset:\s*0/);
 assert.match(script,/mobileMenuTimeline/); assert.match(script,/menuToggle\?\.addEventListener/); assert.match(script,/Escape/);
});

test('mobile hero and about composition match requested placement',()=>{
 assert.match(css,/@media \(max-width: 760px\)[\s\S]*\.hero[^}]*min-height:\s*calc\(100svh - 62px\)[^}]*padding-top:\s*clamp/);
 assert.match(css,/@media \(max-width: 760px\)[\s\S]*\.hero-title span \+ span[^}]*margin-top/);
 assert.match(css,/@media \(max-width: 760px\)[\s\S]*\.portrait-note[^}]*font-size:\s*clamp\(11px/);
 assert.match(css,/@media \(max-width: 760px\)[\s\S]*\.currently[^}]*grid-template-areas:[^;]*"copy copy"[^;]*"badge portrait"/);
 assert.match(css,/@media \(max-width: 760px\)[\s\S]*\.now-copy[^}]*grid-area:\s*copy[^}]*text-align:\s*center/);
});

test('divider lines and instructional helper copy are removed',()=>{
 assert.doesNotMatch(css,/\.section\s*\{[^}]*border-top/); assert.doesNotMatch(css,/\.topbar\s*\{[^}]*border-bottom/); assert.doesNotMatch(css,/\.footer\s*\{[^}]*border-top/);
 assert.doesNotMatch(page,/ON A SMALL SCREEN, SCROLL THE ROW/i); assert.doesNotMatch(page,/ACTIVATE A BOOK TO INTERACT/i); assert.doesNotMatch(page,/Tap or press Enter to focus/i); assert.doesNotMatch(page,/Drag a spine to move it/i);
});

test('leave a note form creates a mailto handoff without backend storage',()=>{
 assert.match(page,/data-note-form/); assert.match(page,/name="name"/); assert.match(page,/name="email"/); assert.match(page,/name="message"/); assert.match(page,/data-note-status/);
 assert.match(script,/function buildNoteMailto/); assert.match(script,/window\.location\.href\s*=\s*mailto/); assert.match(script,/encodeURIComponent/);
});
