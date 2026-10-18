# Forge Planning Queue — Isaac Ndahura Personal Website

**Planning status:** approved to proceed with the working implementation and iterate via review previews; production release remains gated.
**Normative inputs:** `product/PRD.md`, `product/DESIGN.md`.

## Phase 0 — Inspect and accept the product package

- [x] Create an isolated product workspace.
- [x] Add PRD with scope, functional requirements, open decisions, and acceptance criteria.
- [x] Add canonical DESIGN.md with the accepted direction and explicitly unresolved tokens.
- [x] Preserve the exploratory HTML wireframe as supporting reference only.
- [x] User reviews the package and authorizes continuing the Forge build process.

## Phase 1 — Resolve visual and content gates

- [ ] Implement in Astro; compare Oswald + Source Serif 4 and Barlow Condensed + Source Serif 4 in the real page while keeping type tokens easy to change during live review.
- [x] Palette direction: warm paper/ink neutrals; real photos and objects provide most color. Exact values remain unresolved until rendered, contrast-checked, and approved.
- [x] Demo placeholders: bookshelf/writing items may be used, clearly marked individually; no fake destination links; replace before launch.
- [x] Currently may use a visibly annotated, review-only paragraph placeholder; Isaac-approved copy is still required before launch.
- [x] Portrait/contact specifics are pending. Use an abstract/neutral non-identifying visual or omit the portrait; contact action is a nonfunctional placeholder with no fabricated URL.
- [x] Vercel approved for preview deployments for review. Production deployment, domain/DNS and publication remain separately gated.
- [x] Stack: Astro static output with GSAP-authored motion and Matter.js physics restricted to the library section; Vercel review previews. Verify current versions, license, output weight, and runtime requirements before installation.
- [x] Isaac authorized the working implementation to proceed now and to correct issues through live review. Production release, domain/DNS, and public launch remain separately gated.
- [ ] Confirm whether compact section navigation is wanted.
- [ ] Render/inspect desktop supported one-row shelf and mobile two-row shelf; revise to convincingly physical support.
- [ ] Update `product/DESIGN.md` with approved decisions and re-run its linter/contrast review.

## Phase 2 — Build slices (approved to proceed)

- Use Astro static output with semantic HTML/CSS, GSAP-authored motion, and Matter.js only for constrained bookshelf physics. Preserve reduced-motion, keyboard, and touch fallbacks.
- Convert PRD acceptance criteria into ordered, independently testable implementation slices.
- Define test commands, accessible interaction checks, responsive screenshot checks, content/link validation, and preview evidence requirements.
- Keep personal content and exact visual tokens editable for corrections during review; stop only for a material scope, privacy, or security decision.

## Phase 3 — Implementation (authorized; release separately gated)

Proceed on the isolated implementation branch with TDD, real browser/runtime verification, desktop/tablet/mobile visual QA, and accessibility/reduced-motion checks. Vercel review deployment is permitted only after confirming the target project and that no production alias will be changed; public release remains separately gated.
