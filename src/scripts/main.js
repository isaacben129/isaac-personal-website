import { gsap } from 'gsap';
import Matter from 'matter-js';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const safeToAnimate = !reduceMotion.matches;
const prefersFinePointer = window.matchMedia('(pointer: fine)').matches;

if (safeToAnimate) {
  const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
  entrance.from('[data-animate="enter"]', { y: 18, opacity: 0, duration: 0.75, stagger: 0.1 });
  entrance.from('[data-animate="hero-title"] span', { yPercent: 110, rotate: 2, duration: 1.05, stagger: 0.12 }, '-=0.55');

  const observer = new IntersectionObserver((entries, currentObserver) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      gsap.fromTo(entry.target, { y: 22, opacity: 0.25 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' });
      currentObserver.unobserve(entry.target);
    }
  }, { threshold: 0.12 });
  document.querySelectorAll('.section-kicker, .section-title-row, .fragment, .writing-card, .closing-title, .closing-copy').forEach((element) => observer.observe(element));
}

const shelf = document.querySelector('[data-shelf]');
const stage = shelf;
const books = [...document.querySelectorAll('[data-book]')];
const shakeButton = document.querySelector('.shelf-shake');
const resetButton = document.querySelector('.shelf-reset');
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
  }
}

function configureStage() {
  const { width, height } = shelfMetrics();
  if (width < 1 || height < 1) return;
  removeSimulation();
  stage.classList.add('is-physical');
  engine = Matter.Engine.create({ enableSleeping: true });
  engine.gravity.y = 1.1;
  engine.positionIterations = 8;
  engine.velocityIterations = 6;
  engine.constraintIterations = 3;

  const wall = 40;
  const floorY = height - 24;
  const world = engine.world;
  const floor = Matter.Bodies.rectangle(width / 2, floorY + 22, width + wall * 2, 44, { isStatic: true, friction: 0.95, restitution: 0.02, label: 'shelf-floor' });
  const leftWall = Matter.Bodies.rectangle(-wall / 2, height / 2, wall, height * 2, { isStatic: true, label: 'shelf-left' });
  const rightWall = Matter.Bodies.rectangle(width + wall / 2, height / 2, wall, height * 2, { isStatic: true, label: 'shelf-right' });
  Matter.Composite.add(world, [floor, leftWall, rightWall]);
  bodies = books.map((el, index) => {
    const bookWidth = el.offsetWidth;
    const bookHeight = el.offsetHeight;
    const x = width * (0.17 + 0.11 * index);
    const y = floorY - bookHeight / 2 - (index % 2 ? 18 : 0);
    el.style.touchAction = finePointer ? 'none' : 'pan-y';
    const body = Matter.Bodies.rectangle(x, y, bookWidth, bookHeight, {
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
    el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    return body;
  });

  constraints = [];
  const joints = books.slice(0, -1).map((_, index) => {
    const a = bodies[index];
    const b = bodies[index + 1];
    const joint = Matter.Constraint.create({
      bodyA: a,
      bodyB: b,
      pointA: { x: a.bounds.max.x - a.position.x - 4, y: 0 },
      pointB: { x: b.bounds.min.x - b.position.x + 4, y: 0 },
      length: 0,
      stiffness: 0.002,
      damping: 0.12,
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
  Matter.Runner.run(runner, engine);
  stage.classList.remove('physics-paused');
}

function shakeShelf() {
  if (!engine) return;
  wakeShelf();
  bodies.forEach((body, index) => {
    const direction = index % 2 ? 1 : -1;
    Matter.Body.setStatic(body, false);
    nudgeBody(body, direction * (0.65 + Math.random() * 0.55), -0.4 - Math.random() * 0.25, 0.075);
  });
  setStatus('A LITTLE WOBBLE');
}

function resetShelf() {
  if (!engine) return;
  configureStage();
  setStatus(finePointer ? 'RESTING' : 'PAUSED · ACTIVATE A SPINE TO WAKE');
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
  if (event.key === 'Escape') {
    event.preventDefault();
    resetShelf();
    return;
  }
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
      el.addEventListener('pointerenter', () => { if (!runner) return; });
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
  shakeButton?.addEventListener('click', shakeShelf);
  resetButton?.addEventListener('click', resetShelf);

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
