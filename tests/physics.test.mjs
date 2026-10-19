import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import Matter from 'matter-js';

const page = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const script = readFileSync(new URL('../src/scripts/main.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const data = readFileSync(new URL('../src/data/site.ts', import.meta.url), 'utf8');

test('bookshelf physics settles seven adjacent supported books on one continuous desktop shelf', () => {
  const engine = Matter.Engine.create({ enableSleeping: true });
  engine.gravity.y = 0.9;
  engine.positionIterations = 8;
  engine.velocityIterations = 6;
  engine.constraintIterations = 3;
  const width = 1120;
  const floorY = 400;
  const wall = 40;
  Matter.Composite.add(engine.world, [
    Matter.Bodies.rectangle(width / 2, floorY + 12, width + wall * 2, 24, { isStatic: true, label: 'shelf-floor' }),
    Matter.Bodies.rectangle(-wall / 2, 200, wall, 800, { isStatic: true }),
    Matter.Bodies.rectangle(width + wall / 2, 200, wall, 800, { isStatic: true }),
  ]);
  const widths = [74, 62, 88, 66, 82, 58, 76];
  const gap = 6;
  const totalWidth = widths.reduce((sum, bookWidth) => sum + bookWidth, 0) + gap * (widths.length - 1);
  let cursor = (width - totalWidth) / 2;
  const books = widths.map((bookWidth, index) => {
    const x = cursor + bookWidth / 2;
    cursor += bookWidth + gap;
    return Matter.Bodies.rectangle(x, floorY - 130, bookWidth, 240 + index % 4 * 12, { friction: .72, frictionStatic: .92, restitution: .035, label: `placeholder-book-${index + 1}` });
  });
  const joints = books.slice(0, -1).map((a, index) => Matter.Constraint.create({ bodyA: a, bodyB: books[index + 1], pointA: { x: a.bounds.max.x - a.position.x - 3, y: 0 }, pointB: { x: books[index + 1].bounds.min.x - books[index + 1].position.x + 3, y: 0 }, length: 0, stiffness: .018, damping: .22 }));
  Matter.Composite.add(engine.world, [...books, ...joints]);
  for (let frame = 0; frame < 900; frame++) Matter.Engine.update(engine, 1000 / 60);
  assert.equal(books.length, 7);
  assert.ok(books.every((book) => Number.isFinite(book.position.y) && book.position.y < floorY + 80));
  assert.ok(books.every((book) => book.position.x > 0 && book.position.x < width));
  assert.ok(books.slice(0, -1).every((book, index) => Math.abs((books[index + 1].position.x - book.position.x) - (widths[index] + widths[index + 1]) / 2 - gap) < 32), 'spines remain a close cluster, not a scattered row');
});

test('mobile shelf semantics, data and CSS define four upper books and three lower books', () => {
  assert.match(page, /data-shelf-row="1"/);
  assert.match(page, /data-shelf-row="2"/);
  assert.match(page, /data-row=\{book\.id <= '04' \? 'upper' : 'lower'\}/);
  assert.equal((data.match(/title: 'Placeholder/g) ?? []).length, 7);
  assert.match(script, /const floorY = stage\.querySelector\('\.shelf-platform'\)\.offsetTop/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.shelf-platform-lower \{ top:/);
});

test('all spines are pointer and keyboard reachable and physics remains within the shelf stage', () => {
  assert.match(page, /tabindex="0" aria-label=\{`\$\{book\.title\}, review placeholder, activate or use arrow keys to adjust`\}/);
  assert.match(page, /aria-describedby="shelf-instructions"/);
  assert.match(script, /pointerdown/);
  assert.match(script, /ArrowLeft/);
  assert.match(script, /Matter\.Query\.point/);
  assert.match(css, /background-color:\s*var\(--book-cover,\s*#315244\)/);
  assert.match(css, /touch-action:\s*none/);
});
