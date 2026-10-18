# Isaac Ndahura — Personal Website Product Specification

**Version:** 0.2.0 — Iterative build baseline; content and final visual tokens remain review items
**Status:** iterative working build is authorized and active; implementation is in isolated branch `agent/production-build`. The user explicitly asked for the real build and live corrections, not disposable prototypes. Preview-only deployment remains authorized; production is gated.
**Owner:** Isaac Ndahura
**Normative companion:** [`DESIGN.md`](./DESIGN.md)
**Supporting reference:** `/opt/data/cache/scratch/isaac-personal-site-wireframe-v3.html` (exploratory wireframe, not design authority)

---

## 1. Product definition

A single-page personal website that gives visitors a vivid, human sense of Isaac Ndahura as a curious, thoughtful, warm person with a life and interests beyond a conventional professional profile. It is an intentionally curated corner of the internet: part editorial portrait, part personal archive, with restrained physical-world details and occasional playfulness.

This is a passion project, not a résumé, agency/founder portfolio, product landing page, or SaaS funnel. It should not optimize for lead capture or turn every interest into a professional credential.

**Desired visitor takeaway:** “This person is genuinely interesting.” Good taste should be apparent in the craft, not announced as the subject.

## 2. Users and core job

**Primary audience:** people who encounter Isaac and want an engaging, low-friction way to understand who he is, what currently holds his attention, what he makes, what he thinks about, and how to leave a note.

**Visitor job:** “Give me an honest, enjoyable glimpse of this person, let me explore a few things that matter to him, and make it easy to respond.”

**Owner job:** maintain a small, personal, coherent public home that can grow without becoming a sprawling portfolio or requiring complex administration.

### Direction, constraints, and design acceptance

The approved section order remains Hero → statement → Bits & Pieces → The Bookshelf → From My Head → Leave a Note. Isaac rejected the existing implementation as generic/AI-looking. The complete approved section-level requirements and evidence are in [`updates/editorial-visual-refresh/UPDATE-BRIEF.md`](./updates/editorial-visual-refresh/UPDATE-BRIEF.md); user reference images are in `references/`. `DESIGN.md` is the sole visual-system authority. Previous styling is superseded wherever it conflicts with that brief.

- Hero: desktop supporting copy spans a substantially broad measure. Keep the name very large on mobile. Place supporting copy/portrait as two vertical rows on mobile (no side-by-side columns).
- Statement: remove the “Currently” label and eyebrow; preserve the current statement typeface and rendered font size. Actual statement copy remains pending owner approval.
- Bits & Pieces: replace flat grid with a tasteful, overlapping and variably angled composition. Hover and keyboard focus reveal more; touch gets an equivalent explicit interaction. Reveal must not invent personal facts.
- Shelf: remove SHAKE/RESET buttons. Directly interact with the individual book objects. Books are different widths, heights and shapes, rest on visible real shelf surfaces and lean against neighbors. Interaction should not prevent scrolling on touch; reduced-motion and non-simulated fallback still work.
- Closing: its headline shares the exact display family and size role used by section headings.
- Art direction: preserve layout/material logic from supplied guides, not their exact color, text or branding. Repeated tiny all-caps eyebrows, mock-geometric cards, false object imagery, excessive decoration and fabricated biography are rejected.
- Assets are urgent. Prioritize authentic Isaac-supplied photos/artifacts/project work. Until provided, leave intentional whitespace or visibly marked generic layout placeholders that are clearly not personal content.
- CSS component values must derive from a single canonical token source, not redefined per section. All exact unapproved values stay proposed and visibly marked as such in DESIGN.md until a rendered system is reviewed.

## Acceptance ledger — visual refresh

| ID | Acceptance criterion | Verification |
|---|---|---|
| VR-01 | Canonical shared tokens cover type, color, measure, spacing, motion, shapes and components; addressed CSS uses them | DESIGN.md lint, source test, CSS search, rendered comparison |
| VR-02 | Wide desktop supporting text and large, deliberately stacked mobile hero support beneath an oversized readable name | paired screenshots at 390/760/1440; bounding-box/layout test |
| VR-03 | Statement only; no redundant Currently/eyebrow heading; same family/size as current live statement | DOM assertion + computed rendered CSS |
| VR-04 | Angled, overlapping fragment layout with concise reveal under hover/focus and equivalent touch behavior | browser pointer/keyboard/touch trace + screenshots |
| VR-05 | No shelf shake/reset controls; direct object interaction, varied physical book sizes, real support plane and believable neighbor leaning/contact | DOM/control assertion + live drag/settle/release interaction at desktop/mobile + screenshots |
| VR-06 | Closing and section headings use one display typography token | CSS token assertion + computed style comparison |
| VR-07 | User-supplied references preserved as documentation provenance and not displayed as fabricated content | file audit and content audit |
| VR-08 | Six-section structure/content integrity, reduced motion, keyboard, touch-scroll, page overflow, test/check/build/design contrast all pass | end-to-end browser and quality run |

---

## 3. Success criteria

The first release is successful when:

1. A first-time visitor can identify Isaac and the character of the site from the hero without mistaking it for a corporate profile.
2. The six sections tell one coherent story from introduction through interests and ideas to a human closing invitation.
3. Visitors can discover and open the things displayed on the bookshelf and writing cards; each link has a clear, truthful destination.
4. The page works at desktop and mobile sizes, with intentional responsive compositions and no horizontal overflow except the deliberate writing-card scroller.
5. Text remains readable, interaction works with keyboard and assistive technology, and reduced-motion preferences are respected.
6. Isaac can update text, links, and media without rewriting layout code or inventing a new content model for each section.
7. No unapproved font, fabricated personal claim, inactive link, or unfinished placeholder is presented as final content.

No analytics/KPI framework is required for this personal site. If measurement is added later, privacy and purpose must be reviewed explicitly.

## 4. Scope

### In scope

- Responsive single-page site with six anchored sections in a fixed narrative order.
- Editorial visual language defined in DESIGN.md, with typography and detailed tokens marked provisional until selected and approved.
- Content structures for currently true facts, selected projects/works, writing/ideas, contact invitation, metadata, and imagery.
- Accessible navigation, semantic markup, responsive images, descriptive links, visible focus, and reduced-motion handling.
- Deliberate empty/fallback behavior when optional media or content is absent.
- A clear route and content model that can support dedicated pages later without requiring them now.

### Out of scope for initial release

- Dedicated project, article, or bookshelf detail pages unless separately approved; links may point to existing external pages.
- CMS, account system, database, comments, newsletter signup, analytics, personalization, search, or content-management dashboard.
- User-generated content beyond a contact destination that Isaac explicitly selects and approves.
- Complex page transitions, scroll hijacking, parallax as a required behavior, generative animation, WebGL, or Three.js.
- Reproducing any reference site exactly.
- Publishing/deployment, domain changes, or external messages without explicit approval.

## 5. Information architecture and content model

One page, in this exact order:

1. Hero
2. Currently
3. Bits & Pieces
4. The Bookshelf
5. From My Head
6. Leave a Note

A compact top-level anchor navigation may be used if it improves orientation, but it must not compete with the hero or become a conventional corporate navbar. Its exact presence and behavior remain an implementation/design decision.

## 7. Implementation baseline

- **Rendering:** Astro `7.4.0`, static output. The published site is a static directory; no server runtime or CMS is required.
- **Motion:** GSAP `3.15.0` for authored editorial entrances and restrained on-scroll reveals. Respect `prefers-reduced-motion`; semantic content remains visible if scripts fail.
- **Shelf physics:** Matter.js `0.20.0`, confined to the bookshelf section. The shelf must also remain usable as a stable, labelled non-simulated composition, with pointer, keyboard, and touch-accessible affordances; the simulation is progressive enhancement, never the only way to understand or access content.
- **Preview target:** Vercel review project `isaac-personal-website`. Preview-only deployment is allowed; production alias, domains, DNS, and public release require separate authorization.
- **Dependencies:** pin versions; no Three.js, WebGL, CMS, database, or server-side application in this scope.

## 8. Content approval and release gates

Review placeholders may appear in private/review builds only and must be visibly marked. Before public release, replace or remove unapproved bio copy, portrait, fragments, shelf items, writing items, and contact destination; verify every remaining factual claim and destination with Isaac. A review deployment is not production approval.

## 9. Success criteria

The first release is successful when:

1. A first-time visitor can identify Isaac and the character of the site from the hero without mistaking it for a corporate profile.
2. The six sections tell one coherent story from introduction through interests and ideas to a human closing invitation.
3. Visitors can discover and open the things displayed on the bookshelf and writing cards; each link has a clear, truthful destination.
4. The page works at desktop and mobile sizes, with intentional responsive compositions and no horizontal overflow except the deliberate writing-card scroller.
5. Text remains readable, interaction works with keyboard and assistive technology, and reduced-motion preferences are respected.
6. Isaac can update text, links, and media without rewriting layout code or inventing a new content model for each section.
7. No unapproved font, fabricated personal claim, inactive link, or unfinished placeholder is presented as final content.

No analytics/KPI framework is required for this personal site. If measurement is added later, privacy and purpose must be reviewed explicitly.

Content is authored as structured data or well-separated page content, not scattered through repeated presentation logic. Each repeatable item should carry only fields needed by its section (for example, title, short description, image/cover, destination URL, alt text, and optional date/category). Empty values should omit the item or use a considered empty state; never display dummy links or placeholder copy in production.

## 6. Functional requirements

| FR-01 — Hero | Desktop title stays dominant and one line; support copy has a broad measure. Mobile name stays large and support content stacks into two rows. Portrait optional and owner-supplied. | Visual review + bounding boxes at 390, 760 and 1440 |
| FR-02 — Statement | Render only the large statement, without “Currently” title/eyebrow; preserve current face and computed size. Wording remains unapproved. | DOM assertion + computed type + visual review |
| FR-03 — Bits & Pieces | Curated overlapping, variably angled artefacts. Reveal real content on hover/focus plus equivalent touch action; don't invent facts. | Pointer, keyboard, touch and reduced-motion browser paths |
| FR-04 — Bookshelf | Direct book interaction only, no shake/reset buttons. Distinct volumes rest on real supported shelves and lean on neighbors; keep two supported mobile rows. No fake works. | Desktop/mobile screenshots and direct manipulation/settle/scroll traces |
| FR-06 — Leave a Note | Closing headline uses the exact shared display title face/role. Contact remains owner-provided. | DOM and computed CSS equality check |
| FR-11 — Design system | Coherent shared role tokens precede section redesign; addressed CSS derives from single canonical `product/DESIGN.md`, and exact unapproved choices remain provisional. | DESIGN lint/contrast, CSS token search, rendered inspection |

### FR-05 — From My Head

- Display writing/ideas as one horizontal row of tall, narrow cards, with the text/caption below each image, following the supplied reference’s composition.
- On narrow screens, preserve the single horizontal row with deliberate horizontal scrolling rather than collapsing into a standard multi-column grid; make the scroll affordance discoverable and keyboard-operable.
- Each card links to the real writing destination if one exists. If none exists, render as a non-interactive feature only when its purpose is clear; never fake a link.
- Use real artwork/photography or approved placeholders during build; image treatment, aspect ratio, card count, copy, and final content require approval.

### FR-06 — Leave a Note

- Close with a centered, warm, clear invitation to contact or respond.
- The invitation should feel personal rather than a generic CTA. Wording and contact channel are unresolved until Isaac approves them.
- Only render destinations that are verified and explicitly approved. Do not send an external message or subscribe visitors on the user’s behalf.

### FR-07 — Navigation and interaction

- Support direct navigation to the page and in-page section anchors if navigation controls are present.
- Native links must work with keyboard and preserve expected browser behavior. Use meaningful link labels and visible focus states.
- Avoid interaction that traps, delays, or hijacks scrolling. Decorative details must not obstruct text, links, or screen readers.
- Motion is optional and subordinate to content. Respect `prefers-reduced-motion`; the core experience must remain complete with motion disabled.

### FR-08 — Responsive behavior

- Provide usable compositions at small mobile, tablet, and desktop widths; the implementation handoff must list concrete viewport checks.
- The hero name, paragraph, cards, and shelf each receive intentional responsive rules—not merely global scaling.
- No unintended page-level horizontal overflow. The intentional From My Head scroller is an explicitly bounded exception.
- Mobile bookshelf is exactly two rows; desktop bookshelf is one supported row. This is a key acceptance criterion.

### FR-09 — Content and media integrity

- Use clearly labelled demo placeholders for bookshelf and writing items only when demonstrating layout; they must not imply real works or use fake destination links. Remove/replace all placeholders before any public launch.
- Portrait asset/crop and contact destination are pending Isaac. Use a neutral abstract/non-identifying portrait placeholder or omit the portrait. The closing contact action is visibly nonfunctional and contains no fabricated URL/address.
- The paragraph copy is pending Isaac; an annotated review-only placeholder paragraph is permitted in prototype/preview and is not approved public copy.
- No private or unpublished personal/coaching details may be inferred or published.

## 7. Non-functional requirements

- Semantic landmarks and heading order; one main heading for the page, then meaningful section headings.
- Keyboard-operable interactive elements; visible focus; descriptive accessible names; sufficient contrast in final approved palette.
- Minimum comfortable touch target around 44 CSS px for interactive controls.
- Respect zoom/text resizing and avoid fixed-height content boxes that clip text.
- Prevent layout shift for key imagery with intrinsic dimensions/aspect ratios.
- Keep client JavaScript and third-party dependencies minimal; no runtime framework or animation library is mandated by this spec.
- Ensure metadata/title and social preview are accurate and approved; do not make unverified SEO claims.
- Support modern evergreen browsers; exact browser support matrix is to be set by Forge based on deployment target.
- Final production surface must not expose secrets or depend on secret-bearing client configuration.

## 8. Content and interaction states

| State | Expected behavior |
|---|---|
| Optional collection empty | Omit the section/item or show a designed, approved minimal state; no fake cards |
| Image unavailable | Preserve layout with a tasteful fallback; provide alt/content without broken-image icon |
| Link missing | Render as non-interactive content or omit; never use `#` as a fake destination |
| Narrow viewport | Reflow editorial text; preserve intentional writing-card horizontal row and two-row shelf |
| Reduced motion | Disable non-essential movement and transitions; preserve content and functionality |
| Long/edited content | Layout expands naturally; no truncation or overlap |
| Keyboard focus | Visible focus and logical order; no keyboard trap |

## 9. Acceptance criteria

Forge must demonstrate each criterion in browser/runtime evidence before calling the build complete:

| ID | Acceptance criterion | Verification |
|---|---|---|
| AC-01 | Six sections render in the specified order with accurate headings/content | DOM/route assertion and rendered page review |
| AC-02 | Desktop hero name is centered, dominant, and remains on one line at agreed desktop check widths | Screenshot and computed/layout inspection at desktop widths |
| AC-03 | Mobile hero is legible, unclipped, and has deliberate portrait treatment | Screenshot and interaction review at mobile widths |
| AC-04 | Currently is a centered, substantial paragraph at heading-scale or slightly smaller; not a tags panel | Screenshot and computed type/measure review |
| AC-05 | Bookshelf desktop is one coherent shelf; spines are grouped and visually supported/leaning rather than isolated | Desktop screenshot plus structural/layout inspection |
| AC-06 | Bookshelf mobile uses two rows only at mobile breakpoint; desktop does not use two rows | Paired screenshots and computed-style checks on both sides of breakpoint |
| AC-07 | From My Head is a single horizontal row of tall/narrow cards with text below; mobile retains horizontal browsing | Desktop/mobile screenshots; keyboard and touch scroll check |
| AC-08 | Leave a Note is centered and all destinations are real and approved | Rendered review; verify each link target |
| AC-09 | Keyboard navigation, focus visibility, semantic headings, alt text, and reduced-motion state work | Automated accessibility check plus manual keyboard/reduced-motion review |
| AC-10 | No placeholder copy, fabricated personal details, dead links, or private content appears | Content/link audit by owner |
| AC-11 | No unintended horizontal page overflow or overlapping/clipped content | Viewport screenshots and overflow assertions at mobile/tablet/desktop |
| AC-12 | Page renders with no broken media and key imagery does not cause material layout shift | Browser network/console and layout review |

## 10. Open decisions and approval boundaries

These are intentionally not settled by the wireframe or this document:

- Final typeface(s), weights, and type scale. The active review build currently uses Barlow Condensed + Source Serif 4 and loads the Oswald candidate for comparison. Compare both in rendered composition; neither is approved until Isaac selects.
- Final color palette and exact token values. Direction: mostly neutral, with color chiefly from real images/objects; no specific swatches approved.
- Exact hero supporting copy, portrait asset/crop, handwritten annotation, and final small metadata.
- Exact Currently paragraph.
- Bits & Pieces item inventory and visual treatment.
- Approved project/work inventory, actual count, order, cover/spine art, and verified destinations for The Bookshelf.
- From My Head item inventory, cover/image assets, card dimensions, and article destinations.
- Final contact invitation wording/channel.
- Whether a small section navigation exists and how it behaves.
- **Motion direction:** GSAP authored entrances and section reveals are implemented; their pacing and visibility are review items. Matter.js powers the shelf only, with no decorative animation when reduced motion is preferred.
- **Implementation stack:** Astro 7.4.0 (static output), GSAP 3.15.0 (editorial motion), Matter.js 0.20.0 (bookshelf-only physics). See Section 7.
- **Desktop/mobile shelf note:** the earlier two-row-on-mobile direction is superseded for this iterative interaction build: the Matter.js shelf uses one supported surface across viewport widths so all objects participate in one coherent physics simulation. If exact two-row shelving remains preferred, we can alter the physics/world composition live.

### 10.1 Implementation architecture decision

- **Stack:** Astro static output with semantic HTML/CSS, GSAP for authored editorial motion, and Matter.js for interactive bookshelf physics. Review deployments use Vercel project `isaac-personal-website` and repository `https://github.com/isaacben129/isaac-personal-website`.
- **Rationale:** retain the low-operations static publishing model while enabling purposeful motion and constrained 2D rigid-body bookshelf interaction. No server-side runtime, CMS, database, or site-wide simulation is required.
- **Library interaction constraints:** physics is an optional enhancement; the bookshelf remains legible and browseable without physics, supports a static/reduced-motion mode, keyboard activation, and touch-safe behavior, and does not trap scroll. Restrict body count and simulation scope to the visible shelf.
- **Dependency gate:** pin current compatible versions and verify licenses, Astro/Node requirements, bundle cost, browser support, and accessibility/performance fallbacks before installation. If Matter.js cannot meet the interaction within those constraints, return alternatives rather than changing engines silently.
- **Authorization:** Isaac authorized proceeding with the working implementation on this stack and correcting issues through live review. Production release, domain/DNS changes, and public launch remain separately gated.

**Decision rule:** Forge may propose options for unresolved visual choices but must not silently promote wireframe styling, placeholder copy, or invented facts to final. User-approved prototype placeholders are review-only and must be removed/replaced before public launch. Ask Isaac before any material change to section architecture, personal content, publishing/contact destinations, public release, or external services.

## 11. Forge implementation handoff

- Read this file and `DESIGN.md` before planning or coding.
- `DESIGN.md` is the sole canonical visual/token handoff. Its status fields distinguish confirmed direction from unresolved/provisional tokens; do not create a second design authority.
- This document defines product behavior and acceptance; the HTML wireframe is supporting reference only and must not override either spec.
- Build the six-section page as a cohesive responsive narrative, not six disconnected template panels.
- Keep content data, presentational components, and page composition separated according to the chosen framework and actual complexity; avoid premature service abstractions or a CMS.
- Write acceptance tests for responsive shelf layout, writing-card behavior, anchor navigation, accessibility, and real link/content validation before declaring completion.
- Run visual QA with paired desktop/mobile captures, inspect reduced motion and keyboard operation, and record the actual tested viewport dimensions.
- This spec is not permission to deploy, publish, purchase services, send messages, or change DNS. Obtain explicit user approval for those actions.
