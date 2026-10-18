import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import Matter from 'matter-js';

test('bookshelf physics settles seven supported placeholder bodies without escaping shelf walls', () => {
  const engine = Matter.Engine.create({ enableSleeping: false });
  engine.gravity.y = 1.1;
  const width = 960;
  const floorY = 400;
  const wall = 40;
  Matter.Composite.add(engine.world, [
    Matter.Bodies.rectangle(width / 2, floorY + 22, width + wall * 2, 44, { isStatic: true }),
    Matter.Bodies.rectangle(-wall / 2, 200, wall, 800, { isStatic: true }),
    Matter.Bodies.rectangle(width + wall / 2, 200, wall, 800, { isStatic: true }),
  ]);
  const books = Array.from({ length: 7 }, (_, i) => Matter.Bodies.rectangle(130 + i * 110, floorY - 120, 90, 240, { friction: .72, restitution: .035 }));
  const joints = books.slice(0, -1).map((a, i) => Matter.Constraint.create({ bodyA: a, bodyB: books[i + 1], pointA: { x: 41, y: 0 }, pointB: { x: -41, y: 0 }, length: 0, stiffness: .002, damping: .12 }));
  Matter.Composite.add(engine.world, [...books, ...joints]);
  for (let frame = 0; frame < 900; frame++) Matter.Engine.update(engine, 1000 / 60);
  assert.equal(books.length, 7);
  assert.ok(books.every((book) => book.position.x > -5 && book.position.x < width + 5));
  assert.ok(books.every((book) => Number.isFinite(book.position.y) && book.position.y < floorY + 200));
  assert.ok(books.every((book) => Number.isFinite(book.angle)));
});

test('mobile simulation has two shelf tiers with four upper and three lower labelled bodies', () => {
  const html = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
  const data = readFileSync(new URL('../src/data/site.ts', import.meta.url), 'utf8');
  assert.match(html, /data-shelf-row="1"/);
  assert.match(html, /data-shelf-row="2"/);
  assert.match(html, /data-row=\{book\.id <= '04' \? 'upper' : 'lower'\}/);
  assert.equal((data.match(/title: 'Placeholder/g) ?? []).length, 7);
});
