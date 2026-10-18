import { gsap } from 'gsap';
import Matter from 'matter-js';

// Fragment disclosure toggle (keyboard + touch equivalent to hover reveal)
const fragments = [...document.querySelectorAll('.fragment')];
fragments.forEach((el) => {
  el.setAttribute('tabindex', '0');
  el.setAttribute('aria-expanded', 'false');
  el.addEventListener('click', () => {
    const expanded = el.getAttribute('aria-expanded') === 'true';
    el.setAttribute('aria-expanded', String(!expanded));
  });
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const expanded = el.getAttribute('aria-expanded') === 'true';
      el.setAttribute('aria-expanded', String(!expanded));
    }
  });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const prefersFinePointer = window.matchMedia('(pointer: fine)').matches;
let animObserver;
let animNodes = [];
function applyMotionPreference(reduced) {
  if (reduced) {
    animObserver?.disconnect();
    gsap.set(animNodes, { clearProps: 'all' });
  } else if (animNodes.length) {
    animObserver = new IntersectionObserver((entries, currentObserver) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        gsap.fromTo(entry.target, { y: 22, opacity: 0.25 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' });
        currentObserver.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    animNodes.forEach((element) => animObserver.observe(element));
  }
}
reduceMotion.addEventListener('change', (event) => applyMotionPreference(event.matches));

if (!reduceMotion.matches) {
  const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
  entrance.from('[data-animate="enter"]', { y: 18, opacity: 0, duration: 0.75, stagger: 0.1 });
  entrance.from('[data-animate="hero-title"] span', { yPercent: 110, rotate: 2, duration: 1.05, stagger: 0.12 }, '-=0.55');

  animNodes = [...document.querySelectorAll('.fragment, .writing-card, .closing-title, .closing-copy')];
  applyMotionPreference(false);
}

const shelf = document.querySelector('[data-shelf]');
const stage = shelf;
const books = [...document.querySelectorAll('[data-book]')];
const status = document.querySelector('.physics-status');
const finePointer = prefersFinePointer;
let engine;
let runner;
let renderLoop;
let bodies = [];
let constraints = [];
let dragState = null;
let lastStatus = 0;
let resizeObserver;

const setStatus = (value) => {
  if (status) status.textContent = value;
};

const shelfMetrics = () => {
  const rect = stage.getBoundingClientRect();
  return { width: rect.width, height: rect.height };
};

function updateBookViews() {
  for (const body of bodies) {
    const el = body.plugin.element;
    if (!el) continue;
    el.style.transform = `translate3d(${body.position.x}px, ${body.position.y}px, 0) translate(-50%, -50%) rotate(${body.angle}rad)`;
    if (window.matchMedia('(max-width: 760px)').matches) {
      el.style.left = '0px';
      el.style.top = '0px';
      el.style.bottom = 'auto';
    }
    el.style.zIndex = String(Math.round(body.position.y));
  }
}

function removeSimulation() {
  if (runner) Matter.Runner.stop(runner);
  if (renderLoop) Matter.Events.off(engine, 'afterUpdate', renderLoop);
  if (engine) {
    Matter.Composite.clear(engine.world, false, true);
    Matter.Engine.clear(engine);
  }
  if (resizeObserver) resizeObserver.disconnect();
  runner = undefined;
  renderLoop = undefined;
  engine = undefined;
  bodies = [];
  constraints = [];
  for (const el of books) {
    el.style.transform = '';
    el.style.zIndex = '';
    el.style.touchAction = '';
    el.style.left = '';
    el.style.top = '';
    el.style.bottom = '';
  }
}

function configureStage() {
  const { width, height } = shelfMetrics();
  if (width < 1 || height < 1) return;
  removeSimulation();
  stage.classList.add('is-physical');
  engine = Matter.Engine.create({ enableSleeping: true });
  engine.gravity.y = 0.9;
  engine.positionIterations = 8;
  engine.velocityIterations = 6;
  engine.constraintIterations = 3;

  const wall = 40;
  const mobileLayout = window.matchMedia('(max-width: 760px)').matches;
  const hasTwoRows = mobileLayout && books.length > 1;
  const floorY = hasTwoRows ? Math.round(height * 0.86) : height - 28;
  const lowerShelfY = hasTwoRows ? Math.round(height * 0.49 - 7) : Math.round(height * 0.5);
  const world = engine.world;
  const floor = Matter.Bodies.rectangle(width / 2, floorY + 22, width + wall * 2, 44, { isStatic: true, friction: 0.95, restitution: 0.02, label: 'shelf-floor' });
  const lowerShelf = Matter.Bodies.rectangle(width / 2, lowerShelfY + 12, width + wall * 2, 26, { isStatic: true, friction: 0.95, restitution: 0.02, label: 'shelf-lower' });
  const leftWall = Matter.Bodies.rectangle(-wall / 2, height / 2, wall, height * 2, { isStatic: true, label: 'shelf-left' });
  const rightWall = Matter.Bodies.rectangle(width + wall / 2, height / 2, wall, height * 2, { isStatic: true, label: 'shelf-right' });
  Matter.Composite.add(world, hasTwoRows ? [floor, lowerShelf, leftWall, rightWall] : [floor, leftWall, rightWall]);
  const rowOne = Math.ceil(books.length / 2);
  bodies = books.map((el, index) => {
    const bookWidth = el.offsetWidth;
    const bookHeight = el.offsetHeight;
    const stageWidth = stage.clientWidth;
    const inLowerRow = hasTwoRows && index >= rowOne;
    const rowIndex = inLowerRow ? index - rowOne : index;
    const rowCount = inLowerRow ? books.length - rowOne : rowOne;
    const gap = mobileLayout ? 8 : 14;
    const rowWidth = rowCount * bookWidth + (rowCount - 1) * gap;
    const startX = (stageWidth - rowWidth) / 2 + bookWidth / 2;
    const x = startX + rowIndex * (bookWidth + gap);
    const supportY = inLowerRow ? floorY : lowerShelfY;
    const y = supportY - bookHeight / 2;
    el.style.touchAction = finePointer ? 'none' : 'pan-y';
    const clampedX = Math.max(bookWidth / 2 + 4, Math.min(stageWidth - bookWidth / 2 - 4, x));
    const body = Matter.Bodies.rectangle(clampedX, y, bookWidth, bookHeight, {
      chamfer: { radius: [4, 5, 2, 2] },
      density: 0.001 + (index % 3) * 0.0003,
      friction: 0.72,
      frictionStatic: 0.92,
      frictionAir: 0.018,
      restitution: 0.035,
      sleepThreshold: 45,
      label: `placeholder-book-${index + 1}`,
    });
    body.plugin.element = el;
    el.style.transform = `translate3d(${clampedX}px, ${y}px, 0) translate(-50%, -50%)`;
    if (hasTwoRows) { el.style.left = '0px'; el.style.top = '0px'; el.style.bottom = 'auto'; }
    return body;
  });

  constraints = [];
  const jointPairs = hasTwoRows
    ? [[0, 1], [1, 2], [2, 3], [4, 5], [5, 6]]
    : books.slice(0, -1).map((_, index) => [index, index + 1]);
  const joints = jointPairs.map(([leftIndex, rightIndex], index) => {
    const a = bodies[leftIndex];
    const b = bodies[rightIndex];
    const joint = Matter.Constraint.create({
      bodyA: a,
      bodyB: b,
      pointA: { x: a.bounds.max.x - a.position.x - 4, y: 0 },
      pointB: { x: b.bounds.min.x - b.position.x + 4, y: 0 },
      length: 0,
      stiffness: 0.018,
      damping: 0.22,
      render: { visible: false },
      label: `soft-support-${index + 1}`,
    });
    constraints.push(joint);
    return joint;
  });
  Matter.Composite.add(world, [...bodies, ...joints]);
  runner = Matter.Runner.create({ delta: 1000 / 60, maxFrameTime: 1000 / 30, isFixed: true });
  renderLoop = () => {
    updateBookViews();
    const active = bodies.some((body) => body.speed > 0.09 || Math.abs(body.angularSpeed) > 0.018);
    const now = performance.now();
    if (active && now - lastStatus > 700) {
      setStatus('IN MOTION');
      lastStatus = now;
    } else if (!active && dragState === null) {
      setStatus('RESTING');
    }
  };
  Matter.Events.on(engine, 'afterUpdate', renderLoop);
  updateBookViews();
  stage.classList.add('physics-paused');
  bodies.forEach((body) => Matter.Body.setStatic(body, true));
  resizeObserver = new ResizeObserver(() => {
    if (finePointer) configureStage();
  });
  resizeObserver.observe(stage);
}

function setBooksPaused(paused) {
  if (!engine) return;
  if (!runner) runner = Matter.Runner.create({ delta: 1000 / 60, maxFrameTime: 1000 / 30, isFixed: true });
  if (paused) {
    Matter.Runner.stop(runner);
    bodies.forEach((body) => Matter.Body.setStatic(body, true));
  } else {
    bodies.forEach((body) => Matter.Body.setStatic(body, false));
    Matter.Runner.run(runner, engine);
  }
  stage.classList.toggle('physics-paused', paused);
  setStatus(paused ? 'PAUSED · ACTIVATE A SPINE TO WAKE' : 'IN MOTION');
}

function nudgeBody(body, dx, dy, impulse = 0.035) {
  Matter.Sleeping.set(body, false);
  Matter.Body.applyForce(body, body.position, { x: dx * impulse, y: dy * impulse });
}

function wakeShelf() {
  if (!engine) return;
  if (!runner) runner = Matter.Runner.create({ delta: 1000 / 60, maxFrameTime: 1000 / 30, isFixed: true });
  bodies.forEach((body) => Matter.Body.setStatic(body, false));
  Matter.Runner.run(runner, engine);
  stage.classList.remove('physics-paused');
}

function shakeShelf() {
  // Disabled per design refresh: direct interaction only, no shake control
  return;
}

function resetShelf() {
  // Disabled per design refresh: direct interaction only, no reset control
  return;
}

function eventPosition(event) {
  const rect = stage.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function beginDrag(event, el) {
  if (!finePointer || event.button !== 0 || !engine) return;
  const point = eventPosition(event);
  const body = Matter.Query.point(bodies, point).find((item) => item.plugin.element === el);
  if (!body) return;
  event.preventDefault();
  if (!runner) runner = Matter.Runner.create({ delta: 1000 / 60, maxFrameTime: 1000 / 30, isFixed: true });
  Matter.Runner.run(runner, engine);
  stage.classList.remove('physics-paused');
  dragState = { pointerId: event.pointerId, body, offset: { x: body.position.x - point.x, y: body.position.y - point.y } };
  el.setPointerCapture(event.pointerId);
  Matter.Sleeping.set(body, false);
  setStatus('DRAGGING · RELEASE TO SETTLE');
}

function moveDrag(event) {
  if (!dragState || dragState.pointerId !== event.pointerId) return;
  const p = eventPosition(event);
  Matter.Body.setPosition(dragState.body, { x: p.x + dragState.offset.x, y: p.y + dragState.offset.y }, true);
  Matter.Body.setVelocity(dragState.body, { x: 0, y: 0 });
  Matter.Body.setAngularVelocity(dragState.body, 0);
  updateBookViews();
}

function endDrag(event) {
  if (!dragState || dragState.pointerId !== event.pointerId) return;
  dragState = null;
  setStatus('RESTING');
}

function handleKey(event, el) {
  const index = books.indexOf(el);
  const body = bodies[index];
  if (!body) return;
  const step = event.shiftKey ? 28 : 12;
  const keyMap = {
    ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step],
  };
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    setBooksPaused(!runner || stage.classList.contains('physics-paused'));
    return;
  }
  // Escape no longer triggers reset (direct interaction only)
  const delta = keyMap[event.key];
  if (!delta) return;
  event.preventDefault();
  wakeShelf();
  Matter.Body.setPosition(body, { x: body.position.x + delta[0], y: body.position.y + delta[1] }, true);
  nudgeBody(body, delta[0] / step, delta[1] / step, 0.018);
  updateBookViews();
  setStatus('MOVED · SETTLING');
}

if (shelf && books.length) {
  configureStage();
  if (finePointer) {
    books.forEach((el) => {
      el.addEventListener('pointerdown', (event) => beginDrag(event, el));
      el.addEventListener('pointermove', moveDrag);
      el.addEventListener('pointerup', endDrag);
      el.addEventListener('pointercancel', endDrag);
      el.addEventListener('keydown', (event) => handleKey(event, el));
    });
  } else {
    books.forEach((el, index) => {
      el.addEventListener('click', () => {
        wakeShelf();
        const body = bodies[index];
        if (body) { Matter.Body.setStatic(body, false); nudgeBody(body, (index % 2 ? 1 : -1) * 0.6, -0.5, 0.055); }
      });
      el.addEventListener('keydown', (event) => handleKey(event, el));
    });
  }
  // Direct interaction only; no shake/reset controls per refresh brief
  reduceMotion.addEventListener('change', (event) => {
    if (event.matches) {
      removeSimulation();
      stage.classList.add('physics-disabled');
      setStatus('STATIC · REDUCED MOTION');
    } else {
      stage.classList.remove('physics-disabled');
      configureStage();
    }
  });
}
