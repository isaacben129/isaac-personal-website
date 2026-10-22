import { gsap } from 'gsap';
import Matter from 'matter-js';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const prefersFinePointer = window.matchMedia('(pointer: fine)').matches;

// Bits & Pieces: one explicit state machine owns selection and choreography.
const FragmentState = Object.freeze({ RESTING: 'resting', SELECTED: 'selected', TRANSITIONING: 'transitioning' });
const fragmentExperience = document.querySelector('[data-fragment-experience]');
const fragmentStage = document.querySelector('[data-fragment-stage]');
const fragmentCards = [...document.querySelectorAll('[data-fragment-card]')];
const fragmentPanel = document.querySelector('[data-fragment-panel]');
const fragmentClose = document.querySelector('[data-fragment-close]');
let fragmentState = FragmentState.RESTING;
let selectedFragment = null;
let fragmentTimeline = null;

function setFragmentPanel(card) {
  if (!fragmentPanel || !card) return;
  fragmentPanel.querySelector('[data-fragment-title]').textContent = card.dataset.fragmentTitle;
  fragmentPanel.querySelector('[data-fragment-description]').textContent = card.dataset.fragmentDescription;
  fragmentPanel.querySelector('[data-fragment-story]').textContent = card.dataset.fragmentStory;
  fragmentPanel.querySelector('[data-fragment-meta]').textContent = card.dataset.fragmentMeta;
}

function finishFragmentState(state) {
  fragmentState = state;
  if (fragmentExperience) fragmentExperience.dataset.state = state;
}

function selectFragment(card) {
  if (!fragmentExperience || !fragmentPanel || fragmentState === FragmentState.TRANSITIONING) return;
  if (selectedFragment === card) { closeFragment(); return; }
  setFragmentPanel(card);
  selectedFragment = card;
  fragmentCards.forEach((item) => {
    item.setAttribute('aria-expanded', String(item === card));
    item.classList.toggle('is-selected', item === card);
  });
  fragmentStage?.classList.add('is-selected');
  fragmentPanel.setAttribute('aria-hidden', 'false');
  finishFragmentState(FragmentState.TRANSITIONING);
  fragmentTimeline?.kill();
  if (reduceMotion.matches) {
    gsap.set(fragmentCards, { clearProps: 'transform,opacity' });
    gsap.set(fragmentPanel, { clearProps: 'all' });
    finishFragmentState(FragmentState.SELECTED);
    return;
  }
  const others = fragmentCards.filter((item) => item !== card);
  fragmentTimeline = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: () => finishFragmentState(FragmentState.SELECTED) });
  fragmentTimeline
    .to(others, { scale: 0.88, opacity: 0.35, duration: 0.55, stagger: 0.025 }, 0)
    .to(card, { scale: 1.12, rotate: 0, duration: 0.62 }, 0)
    .fromTo(fragmentPanel, { x: 36, opacity: 0 }, { x: 0, opacity: 1, duration: 0.48 }, 0.18);
}

function closeFragment({ restoreFocus = false } = {}) {
  if (!fragmentExperience || !fragmentPanel || !selectedFragment || fragmentState === FragmentState.TRANSITIONING) return;
  const prior = selectedFragment;
  finishFragmentState(FragmentState.TRANSITIONING);
  fragmentTimeline?.kill();
  const complete = () => {
    fragmentCards.forEach((item) => { item.setAttribute('aria-expanded', 'false'); item.classList.remove('is-selected'); });
    fragmentStage?.classList.remove('is-selected');
    fragmentPanel.setAttribute('aria-hidden', 'true');
    selectedFragment = null;
    gsap.set(fragmentCards, { clearProps: 'transform,opacity' });
    gsap.set(fragmentPanel, { clearProps: 'transform,opacity' });
    finishFragmentState(FragmentState.RESTING);
    if (restoreFocus) prior.focus();
  };
  if (reduceMotion.matches) { complete(); return; }
  fragmentTimeline = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: complete });
  fragmentTimeline
    .to(fragmentPanel, { x: 24, opacity: 0, duration: 0.3 }, 0)
    .to(fragmentCards, { scale: 1, opacity: 1, rotate: (index) => Number(fragmentCards[index].style.getPropertyValue('--fragment-rotate').replace('deg', '')) || 0, duration: 0.52, stagger: 0.02 }, 0.05);
}

fragmentCards.forEach((card) => {
  card.addEventListener('click', () => selectFragment(card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectFragment(card); }
  });
});
fragmentClose?.addEventListener('click', () => closeFragment({ restoreFocus: true }));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && selectedFragment) closeFragment({ restoreFocus: true }); });

if (fragmentCards.length && !reduceMotion.matches) {
  const collageObserver = new IntersectionObserver((entries, observer) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    gsap.from(fragmentCards, { y: 55, rotate: 0, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' });
    observer.disconnect();
  }, { threshold: 0.2 });
  collageObserver.observe(fragmentStage);
}

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
  entrance.from('#hero-title', { y: 16, opacity: 0, duration: 0.8 }, '-=0.45');

  animNodes = [...document.querySelectorAll('.writing-card, .closing-title, .closing-copy')];
  applyMotionPreference(false);
}


const workPreview = document.querySelector('[data-work-preview]');
const previewData = Object.fromEntries([...document.querySelectorAll('[data-book]')].map((book) => [book.dataset.previewSlug, {
  id: book.dataset.id,
  title: book.dataset.previewTitle,
  summary: book.dataset.previewSummary,
  href: `/projects/${book.dataset.previewSlug}/`,
}]));
function openWorkPreview(book) {
  if (!workPreview || !book?.dataset.previewSlug) return;
  const item = previewData[book.dataset.previewSlug];
  workPreview.querySelector('[data-preview-index]').textContent = item.id;
  workPreview.querySelector('[data-preview-title]').textContent = item.title;
  workPreview.querySelector('[data-preview-summary]').textContent = item.summary;
  workPreview.querySelector('[data-preview-link]').href = item.href;
  workPreview.querySelector('[data-preview-cover]').dataset.tone = book.dataset.tone;
  workPreview.showModal();
}
workPreview?.querySelector('[data-preview-close]')?.addEventListener('click', () => workPreview.close());
workPreview?.addEventListener('click', (event) => { if (event.target === workPreview) workPreview.close(); });

const shelf = document.querySelector('[data-shelf]');
const stage = shelf;
const books = [...document.querySelectorAll('[data-book]')];
const status = document.querySelector('.physics-status');
const finePointer = prefersFinePointer;
let engine;
let runner;
let renderLoop;
let bodies = [];
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
    el.style.transform = `translate3d(${body.position.x - el.offsetWidth / 2}px, ${body.position.y - el.offsetHeight / 2}px, 0) rotate(${body.angle}rad)`;
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
  resizeObserver?.disconnect();
  dragState = null;
  runner = undefined;
  renderLoop = undefined;
  engine = undefined;
  bodies = [];
  for (const el of books) {
    el.style.transform = '';
    el.style.zIndex = '';
    el.style.touchAction = '';
    el.style.left = '';
    el.style.top = '';
    el.style.bottom = '';
    delete el.dataset.supportedRow;
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
  const upperCount = hasTwoRows ? Math.ceil(books.length / 2) : books.length;
  const floorY = stage.querySelector('.shelf-platform').offsetTop;
  const midShelf = hasTwoRows ? stage.querySelector('.shelf-platform-lower').offsetTop : floorY;
  const floor = Matter.Bodies.rectangle(width / 2, floorY + 17, width + wall * 2, 34, { isStatic: true, friction: 0.95, restitution: 0.02, label: 'shelf-floor' });
  const middleSupport = Matter.Bodies.rectangle(width / 2, midShelf + 12, width + wall * 2, 24, { isStatic: true, friction: 0.95, restitution: 0.02, label: 'shelf-middle' });
  const leftWall = Matter.Bodies.rectangle(-wall / 2, height / 2, wall, height * 2, { isStatic: true, label: 'shelf-left' });
  const rightWall = Matter.Bodies.rectangle(width + wall / 2, height / 2, wall, height * 2, { isStatic: true, label: 'shelf-right' });
  Matter.Composite.add(engine.world, hasTwoRows ? [floor, middleSupport, leftWall, rightWall] : [floor, leftWall, rightWall]);

  const xPositions = new Array(books.length);
  const arrangeLane = (from, count) => {
    const laneBooks = books.slice(from, from + count);
    const laneWidth = laneBooks.reduce((sum, book) => sum + book.offsetWidth, 0) + Math.max(0, count - 1) * 6;
    let cursor = (width - Math.min(width * 0.84, laneWidth)) / 2;
    laneBooks.forEach((book, lane) => {
      xPositions[from + lane] = cursor + book.offsetWidth / 2;
      cursor += book.offsetWidth + 6;
    });
  };
  arrangeLane(0, upperCount);
  if (hasTwoRows) arrangeLane(upperCount, books.length - upperCount);

  bodies = books.map((el, index) => {
    const lower = hasTwoRows && index >= upperCount;
    const supportY = lower ? floorY : midShelf;
    const bookWidth = el.offsetWidth;
    const bookHeight = el.offsetHeight;
    const x = xPositions[index];
    const y = supportY - bookHeight / 2;
    el.style.touchAction = finePointer ? 'none' : 'pan-y';
    el.dataset.supportedRow = lower ? 'lower' : 'upper';
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
    el.style.left = '0px';
    el.style.top = '0px';
    el.style.bottom = 'auto';
    el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${index % 2 ? 0.025 : -0.025}rad)`;
    return body;
  });

  // Independent rigid volumes: contact and friction, not invisible elastic links.
  Matter.Composite.add(engine.world, bodies);
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
  setBooksPaused(true);
  setStatus('PAUSED · DRAG OR NUDGE A SPINE');
  resizeObserver = new ResizeObserver(() => {
    const next = shelfMetrics();
    if (Math.abs(next.width - width) > 1 || Math.abs(next.height - height) > 1) configureStage();
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
  setStatus(paused ? 'PAUSED · USE A SPINE TO WAKE' : 'IN MOTION');
}

function nudgeBody(body, dx, dy, impulse = 0.035) {
  Matter.Sleeping.set(body, false);
  Matter.Body.applyForce(body, body.position, { x: dx * impulse, y: dy * impulse });
}

function wakeShelf() {
  if (!engine || reduceMotion.matches) return;
  if (!runner) runner = Matter.Runner.create({ delta: 1000 / 60, maxFrameTime: 1000 / 30, isFixed: true });
  bodies.forEach((body) => Matter.Body.setStatic(body, false));
  Matter.Runner.stop(runner);
  Matter.Runner.run(runner, engine);
  stage.classList.remove('physics-paused');
}

function eventPosition(event) {
  const rect = stage.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function beginDrag(event, el) {
  if (!finePointer || reduceMotion.matches || event.button !== 0 || !engine) return;
  const point = eventPosition(event);
  const body = Matter.Query.point(bodies, point).find((item) => item.plugin.element === el);
  if (!body) return;
  event.preventDefault();
  wakeShelf();
  const joint = Matter.Constraint.create({
    pointA: point, bodyB: body,
    pointB: { x: point.x - body.position.x, y: point.y - body.position.y },
    length: 0, stiffness: 0.16, damping: 0.12,
  });
  Matter.Composite.add(engine.world, joint);
  dragState = { pointerId: event.pointerId, body, joint, start: point };
  el.setPointerCapture(event.pointerId);
  Matter.Sleeping.set(body, false);
  setStatus('DRAGGING · RELEASE TO SETTLE');
}

function moveDrag(event) {
  if (!dragState || dragState.pointerId !== event.pointerId) return;
  const p = eventPosition(event);
  dragState.joint.pointA = { x: Math.max(20, Math.min(stage.clientWidth - 20, p.x)), y: Math.max(20, Math.min(stage.clientHeight - 40, p.y)) };
}

function endDrag(event) {
  if (!dragState || dragState.pointerId !== event.pointerId) return;
  const { body, joint, start } = dragState;
  const current = eventPosition(event);
  const moved = Math.hypot(current.x - start.x, current.y - start.y);
  Matter.Composite.remove(engine.world, joint);
  dragState = null;
  setStatus('RESTING');
  if (moved < 16) openWorkPreview(body.plugin.element);
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
    openWorkPreview(el);
    return;
  }
  // Escape no longer triggers reset (direct interaction only)
  const delta = keyMap[event.key];
  if (!delta) return;
  event.preventDefault();
  wakeShelf();
  Matter.Body.setPosition(body, { x: body.position.x + delta[0], y: body.position.y + delta[1] }, true);
  if (!reduceMotion.matches) nudgeBody(body, delta[0] / step, delta[1] / step, 0.018);
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
      el.addEventListener('lostpointercapture', endDrag);
      el.addEventListener('keydown', (event) => handleKey(event, el));
    });
  } else {
    books.forEach((el) => {
      el.addEventListener('click', () => openWorkPreview(el));
      el.addEventListener('keydown', (event) => handleKey(event, el));
    });
  }
  // Direct interaction only; no shake/reset controls per refresh brief
  reduceMotion.addEventListener('change', (event) => {
    if (event.matches) {
      configureStage();
      setBooksPaused(true);
      stage.classList.add('physics-disabled');
      setStatus('STATIC · REDUCED MOTION');
    } else {
      stage.classList.remove('physics-disabled');
      configureStage();
    }
  });
}
