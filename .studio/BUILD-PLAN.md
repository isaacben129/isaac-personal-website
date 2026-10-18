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

1. Create a small rendered font comparison and get Isaac's explicit type choice. No wireframe font carries forward by default.
2. Propose a restrained palette through rendered options; validate text, link, and focus contrast before approval.
3. Confirm the portrait asset/crop, supporting copy, and whether the annotation is wanted.
4. Approve the first-person Currently paragraph.
5. Inventory real Bits & Pieces items, works/projects for the shelf, and writing for From My Head; verify labels/assets/destinations.
6. Approve Leave a Note copy and contact destination.
7. Decide whether compact section navigation is needed.
8. Render and inspect the desktop supported one-row bookshelf and mobile two-row shelf; revise until arrangement reads as a physical, coherent shelf.
9. Update `product/DESIGN.md` with only approved decisions and re-run its linter/contrast review.

## Phase 2 — Build plan (requires separate approval)

- Inspect available framework/deployment context and create an implementation architecture appropriate to the site; do not assume a stack or deployment target from the prototype.
- Convert PRD acceptance criteria into ordered, independently testable implementation slices.
- Define test commands, accessible interaction checks, responsive screenshot checks, content/link validation, and preview evidence requirements.
- Present the plan, remaining risks, and preview strategy to Isaac before production implementation.

## Phase 3 — Implementation (not authorized yet)

Begin only after the user approves the plan and required design/content gates. Use isolated worktrees, TDD, real browser/runtime verification, mobile/desktop visual QA, and accessibility/reduced-motion checks. Publishing or deployment remains a separate explicit approval gate.
