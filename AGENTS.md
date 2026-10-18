# Repository Operating Rules

## Authority and scope

1. Read `product/PRD.md` and `product/DESIGN.md` before planning or changing the product.
2. The PRD is normative for product scope, behavior, and acceptance. `product/DESIGN.md` is the canonical visual direction and token handoff. The HTML wireframe is supporting evidence only and cannot override either document.
3. Treat unresolved type, palette, layout details, content, project inventory, links, and contact destination as open decisions. Do not fabricate biography or publish unapproved personal material.
4. This repository's initial Forge activity is planning and visual decision work. Do not begin production implementation until the user approves the build plan and required visual decisions. Do not publish, deploy, contact anyone, buy services, or alter DNS without explicit user approval.

## Delivery discipline

- Never edit `main` for feature work. Use a dedicated worktree and branch per task; keep `main` as integration/review space.
- Preserve existing changes; never reset, clean, stash, or overwrite user work without approval.
- For code work, load `studio-build`, `isolated-feature-worktrees`, `code-structure`, and `software-delivery-evidence`; follow TDD and verify real runtime behavior.
- For docs/design-only passes, keep diffs scoped to approved artifacts, retain unresolved decisions explicitly, and validate Markdown/token specs.
- Do not claim a visual requirement is satisfied from source inspection alone; render and inspect the relevant desktop and mobile states.

## Acceptance focus

When production build is authorized, maintain the key contracts from PRD: six-section narrative; centered desktop one-line hero; substantial centered Currently paragraph; one coherent, physically supported desktop bookshelf with exactly two rows on mobile only; one horizontal row of tall writing cards with text below, including mobile browsing; centered close; keyboard/accessibility/reduced-motion support; real approved content and destinations.
