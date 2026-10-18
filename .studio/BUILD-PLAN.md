# Forge Build Plan — Isaac Ndahura Personal Website

**Status:** User-directed visual refresh approved; implementation is in isolated `agent/design-refresh`. The earlier working build was visually rejected, so its styles are superseded. This remains a review deployment; production release is not authorized.
**Normative inputs:** `product/PRD.md`, `product/DESIGN.md`.
**Canonical repo:** `/opt/data/workspace/isaac-personal-website`.

## Decisions already made

- Preserve the six-section narrative, with the statement section containing only its large statement.
- User specifically rejected the first implementation as generic/AI-looking. Build the refresh from `product/DESIGN.md`, `product/PRD.md`, and `product/updates/editorial-visual-refresh/UPDATE-BRIEF.md`—do not keep old section styling as authority.
- Follow the user-supplied collage and Colophon bookshelf references for composition/material, not as exact art or colors. Preserved copies are in `product/references/`.
- Hero mobile: retain large name; support/portrait in two stacked rows. Desktop support text much broader.
- Remove “Currently” heading and eyebrow; statement keeps its present face and rendered size.
- Bits: overlapping varied angles and legible hover/focus/touch reveal; avoid generic card grid and fabricated personal details.
- Bookshelf: no shake/reset controls; direct interaction with varied shapes/heights/widths; objects rest on shelf and lean naturally. Keep accessible static/reduced-motion path.
- All section headings including closing share one display family. Use canonical system tokens everywhere, no repeated decorative eyebrow treatment.
- Real assets are urgent; request and add only authentic owner-supplied assets. No invented content or fake images.
- Keep Astro static, GSAP for authored motion; challenge Matter.js if it prevents plausible physical behavior. No Three.js/WebGL, CMS, DB.
- Isolated `agent/design-refresh`, base `663712fdb6abb8528bec331c8a6f30233f4c9f23`. Keep canonical `main` read-only.
- Review previews allowed on Vercel `isaac-personal-website`; production alias/domain/DNS/public launch gated.

## Phase 1 — Product baseline

- [x] User visual feedback and reference images preserved.
- [x] Current Vercel preview captured at 390/760/1440 as comparable baseline.
- [x] Update brief, canonical requirements, and design direction added.
- [ ] Create and review a cohesive shared token system from the references and explicit user requirements.

## Phase 2 — Section-by-section implementation

- [ ] Hero desktop broad measure; mobile oversized name plus stacked support.
- [ ] Statement-only section with requested typography preserved.
- [ ] Layered overlapping Bits collage and accessible reveal.
- [ ] Directly interactive physical-looking shelf; eliminate buttons.
- [ ] Closing headline typography unified with section display.
- [ ] Ensure no generic repeated eyebrows/metadata and no fabricated assets/content.
- [ ] Run acceptance tests, responsive browser review at 390/760/1440, accessibility/reduced motion, visual lint and build.
- [ ] Deploy review-only Vercel revision, verify HTTP/styles/fonts/render, share exact usable link.

## Phase 3 — Authentic content/assets (owner input required)

- [ ] Isaac portrait (optional); actual personal artifacts/photos; real project/spine inventory; writing cover art/items; currently statement; approved closing/contact.
- [ ] Present provisional font/palette options for visual owner review; no unapproved copy/art/content in public release.

## Phase 4 — Release (separate explicit approval)

- [ ] Remove/rewrite review placeholders, audit content and destinations, re-run quality/accessibility.
- [ ] Obtain explicit production authorization before alias, domain, DNS, or public launch.

## Current baseline evidence

- Existing visual baseline rejected; screenshots are in `.artifacts/evidence/editorial-visual-refresh/before/` (390,760,1440), with the defect ledger in `assertions.md`.
- Vercel baseline URL: `https://isaac-personal-website-jhflnge5v-isaacs-projects-5e1cb4e6.vercel.app/` (old visual build, superseded).
- Isolated branch `agent/design-refresh`, initial base `663712fdb6abb8528bec331c8a6f30233f4c9f23`.
- Initial implementation-only red acceptance suite added in `tests/design-refresh.test.mjs`; expected failures recorded before changing production code.
