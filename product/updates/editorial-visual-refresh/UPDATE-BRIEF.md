## Editorial visual refresh — decision-ready asset pack

The current live preview is a coherent technical build but its visual system was explicitly rejected as generic/AI-looking. This pack changes that system, section layout and interactions; it does not claim that personal assets or copy have been supplied.

## What the old design implied—and what must be removed

The screenshot’s repeated tiny, quiet metadata labels, evenly distributed blocks, sterile content cards and uniform font treatments had no editorial evidence behind them. Even where spacing was tidy, a standard portfolio recipe emerged. The image should not be patched by adding more decoration. We are rebuilding from the source of meaning outward: type hierarchy, tangible artifacts, deliberate page space, varied objects and a coherent shelf.

## New direction: the printed archive

**Central idea:** Isaac’s personal archive as a set of things gathered, made and written—composed like an intentionally edited printed publication. The page should show confidence and human specificity without pretending that missing real assets exist.

**Material and composition:** Warm paper with near-black type, expressive shared sans display, readable editorial body type, sparse utility metadata, full typographic measure, tactile book edges, purposeful directional art, real paper/book depth. This avoids the common “cream background plus many rectangular cards” aesthetic: use broad fields of white space; only real items receive a material frame; hierarchy comes from scale, image, relation and typography rather than label decorations. Colors/type recorded in `product/DESIGN.md` are explicit review proposals, not user-finalized brand values.

**Layout rhythm:** A loud, exceptionally large hero name; a generous horizontal support field; large text alone for the current-thought passage; an overlapping, rotated fragment composition; an asymmetrical and tightly arranged physical shelf; horizontal editorial writing series; and the same decisive display face for the closing invitation. Shared token roles produce rhythm; sections do not repeat an eyebrow formula. No arbitrary organic blob, 3D page transition, floating stock-photo mock, center-everything pattern or meaningless twinkle.

## Decisions applied from Isaac’s direct feedback

1. **Hero** — desktop support copy gets a much larger maximum measure; mobile name stays unmistakably large; support content becomes two stacked rows, never two columns. A portrait is optional and must be Isaac’s authentic portrait.
2. **Statement** — remove the `Currently` word, heading and all eyebrow/metadata. Only the large statement stays; its current family and actual computed size are preserved.
3. **Bits & Pieces** — use a meaningful art pile with distinct angles, intentional overlap, sensible z-layering and useful expanded copy. Use hover on desktop, keyboard focus and tap disclosure on mobile. Invisible detail cannot be hover-only. Content is supplied later; don't assign fabricated facts to decorative fragments.
4. **Bookshelf** — remove shake/reset buttons. Direct individual-volume interaction only. Books differ materially in width, height and graphic face; visible support board(s) carry the weight, and the set should lean into neighboring volumes as real grouped books do. Preserve two actual shelf tiers on mobile where inventory calls for them. Test scroll vs drag so the phone still scrolls normally. Prefer CSS/direct manipulation if physics fails the grounded still composition.
5. **Closing** — same sans display family and heading token as all section titles.
6. **System** — one explicit shared token source, with shared page measure, typography, palette, rhythm, material/shadow, shapes and behavior/accessibility roles. No component-owned duplicate font/palette tokens.

## Content that is still required (source-of-truth gate)

We need an actual portrait/photo, real Bits & Pieces artifacts with their captions, approved personal statement wording, exact project/publication names for the seven shelf objects and valid destinations, actual writing excerpt/cover images and links, and an approved contact destination/copy. For each artifact, state the owner and intended use/release. Empty boxes or these supplied visual guides do *not* satisfy this input. Until supplied, show a clearly marked review state or leave the designed space quiet; no stock or generated filler passed as personal truth.

## Review and acceptance

Review desktop 1440, tablet 760 and phone 390. Compare the same sizes pre/post. In the rendered browser inspect hero measure and mobile hierarchy; verify no `Currently` visible label and compare computed statement font family/size before/after; use pointer/focus/touch on actual items; observe book resting angles/contact against boards, individual move and rest, page scroll on phone; confirm closing computed family matches section headings. Check focus/contrast, reduced motion, 200% zoom, JS-disabled fallback and no document overflow. Artifact placeholders remain conspicuously placeholders.

**Verification evidence:** The current corrective stylesheet, markup and mechanics are in the isolated `agent/design-refresh` worktree. `npm test` passes 22/22; `npx astro check` has zero errors/warnings/hints; static build, design lint and `git diff --check` pass. Built-page screenshots were reviewed at 1440, 760 and 390 widths. The desktop bookshelf shows seven opaque spines clustered on a continuous board; tablet/mobile screenshots show four upper and three lower books fully, with both support boards and unobstructed instructions. A mobile physics floor offset found in screenshot review was corrected and the 760/390 renders rechecked. This verifies rendered layout, not live mechanics. Full pointer, keyboard, touch and reduced-motion browser interaction verification remains outstanding.

The source dev server on port 4322 was already running for this worktree; a second attempt failed because Astro found the existing server. The built page was served on container loopback port 4324 and returned HTTP 200. Container loopback is not a user-accessible preview. There is no new Vercel deployment from this correction; the existing noindex review preview still serves the earlier build. Production aliases, domain/DNS changes and public launch are untouched.

**Delivery boundary:** A refreshed **review-only** Vercel preview from the earlier pass is available at `https://isaac-personal-website-5mle97cve-isaacs-projects-5e1cb4e6.vercel.app/`. It serves the refresh and is marked `noindex`; it is not production, and no production alias/domain/DNS/public-launch action was performed. The current corrected source has not been deployed.