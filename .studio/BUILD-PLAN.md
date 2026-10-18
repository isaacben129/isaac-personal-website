# Forge Build Plan — Isaac Ndahura Personal Website

**Status:** Iterative working build is authorized and active; the first complete review slice is in isolated branch `agent/production-build`. This is not the production release. The user asked to build the real site and correct problems live, rather than make disposable prototypes.
**Normative inputs:** `product/PRD.md`, `product/DESIGN.md`.
**Canonical repo:** `/opt/data/workspace/isaac-personal-website`.

## Decisions already made

- One page with Hero → Currently → Bits & Pieces → The Bookshelf → From My Head → Leave a Note.
- Astro static output; GSAP for authored motion; Matter.js for bookshelf-only 2D physics. No site-wide simulation, WebGL, Three.js, CMS, or database.
- Use isolated worktrees and branches for code; keep `main` read-only until an approved integration/review step.
- Review content must be clearly labelled; no invented bio, portfolio, articles, links, portrait, or contact destination.
- Vercel project `isaac-personal-website` is authorized for review previews. Production aliases, domain/DNS changes, and launch require separate explicit approval.

## Phase 1 — Product baseline

- [x] PRD scope, six sections, functional requirements, unresolved decisions, acceptance criteria.
- [x] DESIGN.md direction and provisional visual tokens.
- [x] User-approved iterative implementation; no more throwaway prototype loop.
- [x] Stack and accessible reduced-motion/static fallback documented.

## Phase 2 — Working implementation

- [x] Astro static project at repository root in `.worktrees/production-build`.
- [x] Six-section editorial page with carefully labelled review placeholders.
- [x] Responsive composition; desktop single-line full name; mobile two-line name.
- [x] Matter.js shelf with seven visibly-placeholder spines, a stable resting arrangement, keyboard/pointer/touch interaction, shake/reset, and reduced-motion fallback.
- [x] GSAP entrance and section reveals; content is rendered without animation dependency.
- [x] Automated contract, responsive CSS, and simulated physics tests.
- [x] Browser screenshots and desktop/mobile smoke checks; no viewport overflow, console/page errors, working controls.
- [x] `npm run check`, `npm run build`, `npm test`, production dependency audit; `DESIGN.md` linter.
- [ ] Complete visual and interaction review with Isaac’s live corrections.
- [ ] Verify safe Vercel configuration and create a shareable review-only preview; capture the exact URL and verify page content.

## Phase 3 — Content and final design decisions

- [ ] Select final display font pair and exact paper/ink/earth palette tokens from rendered comparisons.
- [ ] Replace review about/currently copy with Isaac-approved words; provide approved portrait and fragment imagery or omit.
- [ ] Select real works and writing items; verify each title, image, and destination.
- [ ] Choose an actual contact destination and final closing copy.
- [ ] Remove all placeholder labels and `noindex` only after explicit content/release readiness review.

## Phase 4 — Production release (separate approval gate)


- [ ] Re-run all quality and accessibility gates against the final content.
- [ ] Obtain Isaac’s explicit production authorization before promoting, setting aliases/domains, touching DNS, or announcing/publicizing.

## Current implementation evidence

- Implementation commit: `e465495`; spec/progress commit: `18b5c0e`.
- Browser smoke: desktop 1440px and mobile 390px; six sections, seven books, accessible title, no viewport overflow, working shake/reset interaction, no page errors. Reduced-motion mode retains a stable shelf.
- Last quality run: Astro check 0 errors/warnings/hints; 9/9 tests pass; static build succeeds; 0 production dependency vulnerabilities; DESIGN.md linter 0 findings; `git diff --check` clean.
- Evidence screenshots live under `.artifacts/evidence/website-build/` in the active worktree; inspect them as needed.
