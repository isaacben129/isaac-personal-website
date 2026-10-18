---
version: alpha
name: Isaac Ndahura — Personal Website
description: A warm, editorial personal archive with confident type, generous space, real objects, and an intimate human voice.
# Visual mood and information architecture are approved direction; detailed tokens remain unresolved.
# Do not treat the illustrative HTML wireframe or its fonts/colors as token approval.
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---

## Overview

### Direction status

- **Typography status:** approved direction is bold condensed/sans display plus restrained serif body. Candidate comparison only: Oswald + Source Serif 4 versus Barlow Condensed + Source Serif 4. Final faces/weights unresolved.
- **Palette status:** warm paper/ink neutrals; real imagery/objects supply most color. Exact colors unresolved; present and review rendered swatches, then check contrast before token approval.
- **Currently:** annotated review placeholder paragraph allowed for mockup; final first-person copy remains pending Isaac.
- **Portfolio/content:** shelf and writing may use clearly labeled per-item placeholders for visual demonstration. No fake destination links. All placeholders must be replaced before launch.
- **Portrait/contact:** no approved portrait or contact details yet. Prototype should use a neutral abstract/non-identifying visual or omit portrait; use a nonfunctional contact placeholder without invented address.
- **Preview:** Vercel is the approved preview platform. Preview deployments for review are allowed; production release, DNS/domain changes and public launch require separate explicit approval.
- **Workspace:** `/opt/data/workspace/isaac-personal-website` is the canonical site repo. Keep the framework decision open until a small static-first architecture plan is ready; production code is not yet authorized.
- **Design-only prototype:** allowed in this repo with marked placeholders. It is a prototype, not production implementation.

**Confirmed direction:** a personal, curious, thoughtful, warm, occasionally playful corner of the internet. It should feel like an editorial magazine meeting a carefully curated personal archive, with restrained scrapbook touches and real physical-world details. Strong typography, generous whitespace, purposeful composition, and a consistent visual grammar carry personality; novelty never outweighs clarity.

**Not approved:** the exact font faces/weights, color values, spacing, radii, and component tokens. Approved font *direction*: a bold condensed/sans display face paired with a restrained serif for body text. Approved palette *direction*: warm paper/ink neutrals, with real photos and objects supplying most color. The HTML wireframe remains an exploratory layout artifact, not a source of final fonts or palette. Its DM Sans / Playfair Display / DM Mono combination is rejected as final. Candidate type pairings to compare in rendered compositions: Oswald + Source Serif 4; Barlow Condensed + Source Serif 4. These are proposed candidates, not selected fonts. Replace unresolved token values only after rendered review and Isaac's approval. Until then, implementation may use temporary styling for prototypes but must not describe it as approved brand design.

**Avoid:** conventional startup/founder portfolio patterns, SaaS visual language, repetitive oversized section titles aligned to the right, overdecorated scrapbook treatment, gratuitous 3D or animation, disconnected section styles, and illegibility in service of novelty.

The site should leave a visitor thinking, “This person is genuinely interesting.” Taste should emerge from the execution rather than be stated as a selling point.

## Colors

- **Primary:** token is provisional. Intended role is core text and strong typographic elements; final hue/value needs review.
- **Secondary:** token is provisional. Intended role is metadata and quieter supporting copy; ensure readable contrast in the chosen palette.
- **Tertiary:** token is provisional. Use restraint. The approved high-level direction is mostly neutral surfaces with meaningful color supplied primarily by actual photography, artifacts, and project objects—not a saturated SaaS accent system.
- **Neutral:** token is provisional. A warm paper-like foundation is a candidate, not a locked color.
- Do not derive palette authority from the wireframe. Validate contrast for all final text, links, focus indicators, and controls before implementation approval.

## Typography

Typography must be expressive, confident, and editorial, but readable and well matched to Isaac’s personality. Final font family, pairings, weights, scale, line lengths, tracking, and responsive sizes remain unresolved.

- The name “Isaac Ndahura” is the dominant hero element, centered and on one line at desktop widths.
- The Currently section uses a substantial centered paragraph, approximately heading scale or slightly smaller, with a comfortable measure and intentional wrapping. It must not become small metadata/tags.
- Supporting prose should be easy to read, not compressed into decorative labels.
- Do not ship the provisional prototype fonts as if approved. Present font options and a rendered comparison for Isaac before fixing typography tokens.
- Ensure the final scale adapts to narrow screens without clipping, forced unreadable size reduction, or awkward orphans.

## Layout

### Global composition

- A single-page editorial narrative: Hero → Currently → Bits & Pieces → The Bookshelf → From My Head → Leave a Note.
- Preserve a coherent overall rhythm; sections may vary in composition but should share a visual grammar.
- Use generous whitespace, strong hierarchy, purposeful asymmetry, and restrained personality details.
- Avoid repeating large right-aligned section titles. Currently is centered; the closing invitation is centered.
- Widths, gutters, section spacing, and grid values are provisional; choose after visual system approval.

### Hero

Center the full name on one line at desktop widths. Keep it dominant with breathing room. Place a cutout portrait low in a corner rather than across the hero; a small arrow and handwritten annotation may point toward it. Do not shift the name left to accommodate the portrait. Define a mobile composition deliberately; preserve legibility and intentional portrait/name relationships.

### Currently

Center one substantial paragraph, inspired by the scale and placement of the supplied Robin reference but not copied. Use a readable line measure and a restrained treatment; the paragraph is the section's primary visual statement.

### Bits & Pieces

Curate small personal fragments using a considered composition that feels like part of the same archive. Exact layout and content remain open; do not assume a masonry/card grid by default.

### The Bookshelf

The objects represent things Isaac made/contributed to, not a reading list. On desktop, render one continuous, coherent shelf row with believable spine variation, close grouping, subtle dimensionality, and objects leaning against/supporting neighbors. Avoid isolated upright bars or a row of unrelated cover cards. On mobile only, rearrange into two structured visual rows with convincing shelf support; this must not be an accidental wrap. The seven objects in the rough prototype are illustrative only; use actual approved work inventory and do not pad the collection.

Use CSS depth, perspective, shadows, and object relationships first. Three-dimensional rendering is not selected and requires a concrete approved interaction to justify it.

### From My Head

Show one horizontal row of tall, narrow image cards, each with its title/description beneath the image. On mobile, keep a single horizontally browsable row instead of converting it into a conventional grid. The writing-card row is an intentional local overflow pattern; the page itself must not acquire unintended horizontal overflow.

### Leave a Note

Finish with a centered, personal invitation. Copy and contact destination require approval. Do not style it as a generic conversion CTA.

## Elevation & Depth

Use depth only where it supports material meaning. The bookshelf is the clearest opportunity: shelf planes, subtle shadow, differentiated spine thickness/heights, and contact/leaning relationships should make it read as one supported physical arrangement. Keep other surfaces calm. Exact shadow, perspective, blur, and elevation tokens are unresolved. Avoid floating cards, excessive drop shadows, heavy faux-3D, or WebGL without a user-approved need.

## Shapes

No global corner-radius language is approved. Avoid defaulting every element to a rounded card/pill. Let real objects, editorial text, and image crops determine appropriate silhouettes. Shape tokens remain unresolved until visual exploration.

## Components

The component names below describe roles, not approved styling tokens.

- **Navigation/link:** semantic anchor, descriptive name, visible focus. A compact section nav is optional and unresolved; it must not overpower the hero.
- **Writing card:** tall/narrow image area, title/description below, real destination when available; horizontally browsable on mobile.
- **Bookshelf object:** meaningful project/work represented as a spine or compatible physical object, connected to the shared shelf plane and neighboring objects; real title and destination.
- **Portrait annotation:** optional small annotation and arrow; decorative elements must not reduce accessible clarity.
- **Contact invitation:** centered, warm, accurate approved destination.

Detailed styles, hover behavior, active/visited states, focus appearance, and transitions are unresolved. Every interactive state must remain legible and accessible. Non-interactive artifacts must not masquerade as controls.

## Do's and Don'ts

- **Do** keep the centered, one-line desktop name and corner portrait relationship intact.
- **Do** make Currently a prominent centered paragraph rather than small labels.
- **Do** arrange the desktop bookshelf as one supported physical row, and make two shelf rows a mobile-only treatment.
- **Do** keep From My Head as one horizontal row of tall image cards with text below.
- **Do** use real, approved personal content, work, images, and links.
- **Do** mark fonts, palette, copy, and art direction details as unresolved until approved.
- **Do** use semantic structure, readable contrast, keyboard-accessible controls, visible focus, useful alt text, and reduced-motion support.
- **Don't** treat the current wireframe as final UI or inherit its font choices.
- **Don't** invent biography, currently activity, work, reading, or article links.
- **Don't** turn the Bookshelf into books read or isolated flat icons.
- **Don't** use a standard multi-column writing grid on mobile.
- **Don't** introduce generic startup/SaaS styling, gratuitous motion, or 3D libraries by default.
- **Don't** publish the site, contact channel, or personal content without Isaac's explicit approval.

## Accessibility and responsive behavior

- Follow semantic heading order, landmarks, descriptive link labels, visible keyboard focus, and sufficient contrast after final tokens are chosen.
- Support keyboard and touch; interactive targets should be comfortably usable (aim for at least 44 CSS px).
- Respect browser zoom and text resizing; content should expand without clipping.
- Provide meaningful alt text for informative imagery; use empty alt for purely decorative portrait/ornament.
- Honor `prefers-reduced-motion`; core navigation and content must not rely on motion.
- Verify hero, Currently, shelf, card row, and closing at mobile, tablet, and desktop widths. Shelf behavior must be checked on either side of the mobile breakpoint, not assumed from CSS source alone.
- Avoid unintended horizontal page overflow; the From My Head row may scroll horizontally by design and must remain keyboard-operable.

## Stack and Motion

Use Astro static output with semantic HTML/CSS, GSAP for authored editorial motion, and Matter.js only for the interactive bookshelf. Isaac requested animation, interaction, and bookshelf physics, and authorized proceeding directly with the working build and correcting issues through live review.

Keep physics constrained to the shelf; never make content access depend on it. Provide a stable static/reduced-motion state, keyboard controls, and touch-safe behavior. Respect `prefers-reduced-motion`; avoid scroll hijacking, forced motion, and physics outside the library section. Do not introduce WebGL/Three.js, a CMS, database, or server runtime without a concrete approved need. Verify current versions, licenses, runtime requirements, and bundle impact before installation. Vercel is for review previews; public production release remains a separate approval gate.
