---
version: alpha
name: Isaac Ndahura — Personal Archive
description: Printed-matter editorial archive with authentic artifacts, a tactile shelf, and warm human presence.
colors:
  primary: "#171713"
  secondary: "#55534B"
  tertiary: "#8A462F"
  neutral: "#F4EFE6"
typography:
  display:
    fontFamily: "Oswald, sans-serif"
    fontSize: "96px"
    fontWeight: 600
    lineHeight: "0.92"
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: "1.55"
  utility:
    fontFamily: "DM Mono, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: "1.35"
rounded:
  none: "0px"
  print: "2px"
spacing:
  unit: "8px"
  section: "clamp(5rem, 10vw, 9rem)"
  page-gutter: "clamp(1.25rem, 5vw, 5rem)"
components:
  page-frame:
    width: "90rem"
    padding: "{spacing.page-gutter}"
  section-heading:
    typography: "{typography.display}"
    textColor: "{colors.primary}"
  fragment:
    backgroundColor: "{colors.neutral}"
    rounded: "{rounded.none}"
  shelf-object:
    rounded: "{rounded.print}"
  focus-ring:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.neutral}"
    size: "2px"
    padding: "4px"
---

## Overview

### Approval status

The printed-matter editorial direction, section requirements and shared visual roles respond to Isaac's explicit review. The exact type and color values below remain **proposed for review**, not final identity approval. Isaac requires that the current statement paragraph retain its existing family and computed size and the mobile hero name stay large. A live review is still required before treating the design system as complete.

### Identity and composition

Use the vocabulary of printed matter: confident typography, negative space, authentic objects, material edges, editorial asymmetry, and an individually composed bookshelf. Avoid generic AI-generated portfolio tropes: repetitive eyebrow/title pattern, equal card grid, dummy objects, meaningless ornament, stock filler and invented biography. Shared roles establish unity without making every section repeat the same layout.

User-provided JPEG references at `product/references/` inform composition/material only. Do not copy their exact artwork, text or branding; their colors are not the approved palette. Personal portrait, real artifacts, real work inventory/destinations, writing assets, statement wording and contact are still owner inputs. Leave that space open or use explicit review labels in the page header and on individual placeholders until authentic inputs arrive.

## Colors

Proposed warm paper `#F4EFE6`, ink `#171713`, quieter graphite `#55534B`, and restrained burnt rust `#8A462F` for focus/link accent. Real approved artifacts can bring color. These are coherent starting values for review, not brand sign-off. Confirm WCAG AA for actual text/background pairs and all focus/interactive states.

## Typography

Proposed display `Oswald, sans-serif` 600, reading `Source Serif 4, Georgia, serif`, and rarely used functional `DM Mono`. The display family/token is identical for the hero name, all section titles and closing title. Remove redundant competing display-font loads once the chosen type is verified.

Statement has no `Currently` title or eyebrow; preserve the existing live paragraph face and size exactly: Source Serif 4, `clamp(29px, 5vw, 66px)`. Hero name remains large on mobile, where deliberate two-line wrapping is acceptable. Final display family remains proposed until reviewed in the live preview.

## Layout

### Shared spatial grammar

Proposed 90rem max frame, responsive page gutters and 8px spacing base. Shared components consume role tokens; content-specific dimensions are declared by artifact/book data, not silently duplicated. Use negative space rather than filling every empty region with metadata.

### Hero

Desktop: centered, dominant one-line name with support copy in a broad measure (proposal `min(72vw, 64rem)`), not a narrow side column. Portrait is optional, only authentic owner-supplied material.

Mobile: keep name unmistakably large; support prose and optional portrait/artifact appear as two stacked rows. No two-column layout or clipped content. Review at phone/tablet/desktop widths.

### Statement

Only the large statement paragraph. No visible “Currently”, section heading, eyebrow, review note, metadata or ornament. Preserve current family and computed size with readable line measure.

### Bits & Pieces

Compose real image/artifact pieces as an intentionally layered arrangement with varied but restrained angles and useful z-order. Hover/focus detail and a keyboard/touch-equivalent disclosure are required. Never hide essential meaning behind hover; reduced-motion rendering remains complete and stable. Do not invent personal details for empty placeholders.

### The Bookshelf

A tightly gathered set of distinct individual volumes resting on visible continuous shelf support(s). Vary width, height, silhouette and spine composition; let selected books lean on adjacent volumes/supports in plausible stable poses. Create convincing resting composition before motion. Individual pointer/touch/keyboard interaction may move a book modestly; no shelf-wide shake/reset control. Direct manipulation should not steal ordinary mobile page scroll. Keep two actual supported tiers on mobile; no accidental wrap. If Matter cannot preserve stable plausible lean/contact, prefer deterministic interaction. Placeholder labels must not imply real works.

### From My Head

Keep a single horizontal series of tall narrow writing pieces with text below. Mobile may browse horizontally. This refresh should harmonize existing treatment, not broaden into an unrelated redesign.

### Leave a Note

Centered personal invitation. Closing title consumes the same display family and role as other headings. Do not use funnel/CTA styling. Approved copy and destination remain owner-provided.

## Elevation & Depth

Depth comes from physical evidence only: paper/object edges, restrained overlap shadows, book casing/page block and direct shelf contact. Avoid generic card shadows, glass effects, gradients as ornament or excessive 3D.

## Shapes

Prefer print-like square corners; use subtle 2px book casing edges at most. Book silhouette is defined by varying data dimensions, not a global rounded app-card system.

## Components

Shared role names are `page-frame`, `section-heading`, `fragment`, `shelf-object`, and `focus-ring`. CSS must map to this canonical token source. Books have item-level sizes and angles; fragment compositions can vary by content. All interactive items retain legible accessible names/state and a static no-JS fallback.

## Do's and Don'ts

- **Do** map shared visual roles to these tokens and keep provisional values traceable.
- **Do** visually compare the live font/palette/layout against genuine print references.
- **Do** request the actual portrait, meaningful artifacts/work inventory and writing/media, stating exactly where each will go.
- **Do** check contrast, 200% zoom, reduced motion, keyboard, touch, and 390/760/1440 widths.
- **Don't** repeat tiny all-caps eyebrows as decoration or create generic equal cards.
- **Don't** invent personal facts, fake project names, false destinations, or generated/stock artifacts represented as Isaac's.
- **Don't** copy the reference images or introduce shelf-level shake/reset controls.

## Accessibility and responsive behavior

Semantic landmarks; one h1 and ordered section titles. Fragment details have visible focus and accurate expanded state, operable by keyboard and touch. Book interaction works individually and preserves ordinary scroll. Focus treatment uses a visibly discernible 2px rust ring/4px offset; verify actual contrast. Reduced motion removes movement, not content. At 200% text zoom no clipping. Verify 390/760/1440, no page-level horizontal overflow, with the writing row as the intentional horizontal scroller.

## Motion and interaction

GSAP is reserved for brief meaningful editorial transitions; no content waits hidden for scroll. Fragment disclosure is complete without motion. Matter.js is shelf-only and optional: retain only if stable resting objects, support contact and natural leaning are demonstrably better than CSS/direct manipulation. No global shake/reset actions.

## Implementation mapping

Behavior requirements: `product/PRD.md` and `product/updates/editorial-visual-refresh/UPDATE-BRIEF.md`. This file is the sole visual-system authority. `src/styles/global.css` consumes the role/token map. Page markup uses `.fragment` as the interactive item and `.book-body` for volumes; books keep their authored geometry and stable resting fallback. Reference JPEGs remain documentation, not runtime site assets.
