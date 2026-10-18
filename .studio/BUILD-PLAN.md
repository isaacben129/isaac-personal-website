# Forge Planning Queue — Isaac Ndahura Personal Website

**Planning status:** active; implementation not yet authorized.
**Normative inputs:** `product/PRD.md`, `product/DESIGN.md`.

## Phase 0 — Inspect and accept the product package

- [x] Create an isolated product workspace.
- [x] Add PRD with scope, functional requirements, open decisions, and acceptance criteria.
- [x] Add canonical DESIGN.md with the accepted direction and explicitly unresolved tokens.
- [x] Preserve the exploratory HTML wireframe as supporting reference only.
- [ ] User reviews the package and authorizes the build-planning/design-resolution phase.

## Phase 1 — Resolve visual and content gates

- [ ] Create a rendered comparison of two condensed display + restrained serif body pairings: Oswald + Source Serif 4, and Barlow Condensed + Source Serif 4. Candidates only, not selected fonts.
- [x] Palette direction: warm paper/ink neutrals; real photos and objects provide most color. Exact values remain unresolved until rendered, contrast-checked, and approved.
- [x] Demo placeholders: bookshelf/writing items may be used, clearly marked individually; no fake destination links; replace before launch.
- [x] Currently may use a visibly annotated, review-only paragraph placeholder; Isaac-approved copy is still required before launch.
- [x] Portrait/contact specifics are pending. Use an abstract/neutral non-identifying visual or omit the portrait; contact action is a nonfunctional placeholder with no fabricated URL.
- [x] Vercel approved for preview deployments for review. Production deployment, domain/DNS and publication remain separately gated.
- [x] Canonical workspace is this specs repo; implementation architecture must be planned before framework selection. Prefer a minimal static approach unless evidence requires more.
- [x] Design-only rendered prototype is authorized in the canonical workspace. Production code is not authorized until design resolution and approval.
- [ ] Confirm whether compact section navigation is wanted.
- [ ] Render/inspect desktop supported one-row shelf and mobile two-row shelf; revise to convincingly physical support.
- [ ] Update `product/DESIGN.md` with approved decisions and re-run its linter/contrast review.

## Phase 2 — Build plan (requires separate approval)

- Inspect available framework/deployment context and create an implementation architecture appropriate to the site; do not assume a stack or deployment target from the prototype.
- Convert PRD acceptance criteria into ordered, independently testable implementation slices.
- Define test commands, accessible interaction checks, responsive screenshot checks, content/link validation, and preview evidence requirements.
- Present the plan, remaining risks, and preview strategy to Isaac before production implementation.

## Phase 3 — Implementation (not authorized yet)

Begin only after the user approves the plan and required design/content gates. Use isolated worktrees, TDD, real browser/runtime verification, mobile/desktop visual QA, and accessibility/reduced-motion checks. Publishing or deployment remains a separate explicit approval gate.
