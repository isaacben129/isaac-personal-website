# Isaac Ndahura — Personal Website Product Specification

**Version:** 0.1.0 — Design-approved direction; visual tokens provisional
**Status:** Specification for Forge planning; no implementation authorized by this document alone
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

Content is authored as structured data or well-separated page content, not scattered through repeated presentation logic. Each repeatable item should carry only fields needed by its section (for example, title, short description, image/cover, destination URL, alt text, and optional date/category). Empty values should omit the item or use a considered empty state; never display dummy links or placeholder copy in production.

## 6. Functional requirements

### FR-01 — Hero

- Display the full name **“Isaac Ndahura”** as the dominant element, centered and on one line at desktop widths.
- Preserve a legible, intentional responsive treatment on narrow viewports; desktop’s one-line requirement does not justify clipping or tiny type on mobile.
- Include minimal approved supporting copy, generous whitespace, and a cutout portrait tucked into a corner rather than stretched across the composition.
- A small arrow and playful handwritten annotation (example: “this is me”) may point to the portrait if the final visual treatment remains clear and accessible. The annotation is not finalized copy.
- Portrait is decorative unless it conveys unique information; use appropriate alt text (empty alt for purely decorative cutout).
- Do not let portrait placement displace the centered name or turn it into a left-aligned headline.

### FR-02 — Currently

- Present a concise but substantial first-person paragraph about what is currently occupying Isaac’s attention.
- Center the paragraph as a primary editorial moment. Typography should be at roughly section-heading scale or slightly smaller, with a readable measure and deliberate line breaks at responsive widths.
- The composition is inspired by the supplied Robin reference’s centered, confident text scale, not copied verbatim.
- Do not reduce this section to a cluster of small tags, labels, or a tiny “currently/lately” metadata panel.
- The paragraph content, final font, exact size, and line lengths are content/design decisions still open; placeholder wireframe copy is not approved.

### FR-03 — Bits & Pieces

- Provide a curated, lightweight collection of personal fragments (for example: objects, observations, small interests, places, sounds, or images) that adds character without becoming a generic card grid.
- Each item must have a deliberate relationship between its visual, optional caption, and destination if interactive.
- Exact item count, content, and whether the treatment is collage, list, or another restrained composition remain open. Do not invent biographical specifics.

### FR-04 — The Bookshelf

- Treat the shelf as a collection of things Isaac has made or contributed to—not a list of books read.
- Each object represents a real, approved work/project and links to a meaningful destination where one exists. The item name and link target must be accurate.
- On desktop, arrange all visible objects as one coherent supported shelf: a continuous shelf plane/base with close grouping, believable varied spine widths/heights, subtle depth, and some objects leaning against or supporting neighboring objects. Avoid isolated upright icons, equal gaps, or floating covers.
- On mobile only, reflow the collection into exactly two visual rows; desktop remains a single shelf row. The two-row mode must read as objects supported by coherent shelf surfaces/structure, not accidental CSS wrapping.
- The desktop/mobile transition must be selected and tested at actual viewport sizes. The present HTML wireframe does not conclusively validate this behavior.
- More than the original five objects is desired; the current prototype contains seven. Final count depends on real approved work inventory and should not be padded with invented projects.
- A physical/3D impression should be achieved first with restrained CSS depth, perspective, shadows, and arrangement. Do not introduce a 3D rendering library absent an approved interaction that needs it.

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

- Isaac supplies/approves all first-person copy, personal facts, project inventory, writing links, portrait, and contact destination.
- Every external link is checked for correct destination and appropriate accessible name; external-opening behavior is consistent and disclosed where relevant.
- Use responsive image sizing, declared dimensions/aspect ratio, and optimized formats where available. Provide meaningful alt text for informative images and empty alt for decoration.
- No sensitive/private material, private coaching details, or unpublished personal notes may be inferred or published.

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

- Final typeface(s), weights, and type scale. Current prototype typography is explicitly provisional and has been criticized; do not carry it forward as approval.
- Final color palette and exact token values. Direction: mostly neutral, with color chiefly from real images/objects; no specific swatches approved.
- Exact hero supporting copy, portrait asset/crop, handwritten annotation, and final small metadata.
- Exact Currently paragraph.
- Bits & Pieces item inventory and visual treatment.
- Approved project/work inventory, actual count, order, cover/spine art, and verified destinations for The Bookshelf.
- From My Head item inventory, cover/image assets, card dimensions, and article destinations.
- Final contact invitation wording/channel.
- Whether a small section navigation exists and how it behaves.
- Whether any motion is useful. GSAP is only a candidate; Three.js is not selected. Prefer no library until interaction proves a need.
- Framework, hosting/deployment target, domain, repository remote, and actual launch scope; none are authorized by this specification.

**Decision rule:** Forge may propose options for unresolved visual choices but must not silently promote wireframe styling, placeholder copy, or invented facts to final. Ask Isaac before any material change to section architecture, personal content, publishing/contact destinations, public release, or external services.

## 11. Forge implementation handoff

- Read this file and `DESIGN.md` before planning or coding.
- `DESIGN.md` is the sole canonical visual/token handoff. Its status fields distinguish confirmed direction from unresolved/provisional tokens; do not create a second design authority.
- This document defines product behavior and acceptance; the HTML wireframe is supporting reference only and must not override either spec.
- Build the six-section page as a cohesive responsive narrative, not six disconnected template panels.
- Keep content data, presentational components, and page composition separated according to the chosen framework and actual complexity; avoid premature service abstractions or a CMS.
- Write acceptance tests for responsive shelf layout, writing-card behavior, anchor navigation, accessibility, and real link/content validation before declaring completion.
- Run visual QA with paired desktop/mobile captures, inspect reduced motion and keyboard operation, and record the actual tested viewport dimensions.
- This spec is not permission to deploy, publish, purchase services, send messages, or change DNS. Obtain explicit user approval for those actions.
