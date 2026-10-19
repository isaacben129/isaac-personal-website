# Desktop bookshelf mechanics correction

Scope: repair existing desktop bookshelf; leave hero/about untouched and defer mobile art direction.

Reproduced in real Chromium before editing:
- Book DOM bottoms at 527–554px inside a 440px stage, with visible shelf at 404px.
- After correcting coordinate mapping, a dragged/released book stayed suspended (identical Y before and after release).

Root causes and changes:
- Map body-centre coordinates to DOM top-left coordinates; rotate about the centre.
- Derive collision planes from actual shelf-board offsetTop, not unrelated constants.
- Only rebuild on actual ResizeObserver dimension changes; previously every new observer rebuilt the simulation.
- Wake dynamic bodies on drag. Use a pointer constraint rather than teleporting bodies.
- Remove inter-book spring constraints. Independent books now collide and settle under gravity and friction.
- Avoid starting multiple runners; release constraint on pointerup, cancel, and lost capture.
- Keep reduced-motion static and no-JavaScript desktop layout compact and supported.
- Restore mobile board visibility as a correctness fix, not a mobile redesign.

Verification: scripts/verify-shelf.mjs exercises actual rendered geometry, mouse lift, gravity after release, keyboard movement, resize, reduced motion, and JS-disabled fallback. Regression reproduced red before fix; browser test now passes. Full 25-test suite, Astro check, build and diff check pass. Placeholder book inventory unchanged; authentic titles/assets remain separate content work.
