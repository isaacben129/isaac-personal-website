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

Direction and behavioral requirements are explicit from Isaac. Values below are coherent review proposals, not final identity approval. Isaac requires the statement paragraph to retain its existing family and computed size and the mobile hero name to stay large. Compare font/palette/layout in a live review before representing the system as finalized.

### Identity and composition

Printed matter, real books, personal artifacts, dimensional typography and negative space. Avoid generic AI-generated portfolio patterns: no repetitive micro-eyebrow/title formula, equal floating-card grid, dummy objects, ornamental details without narrative purpose, or false biography. Shared roles provide consistency; sections differ to serve their content.

The two JPEGs under `product/references/` guide material and composition only; do not copy exact artwork/text/branding or treat their palette as the approved site palette. Authentic portrait, fragments, actual work inventory, writing/media and destinations, approved statement and contact remain outstanding. Leave designed space quiet or mark review scaffolding until supplied.

## Colors

Proposed warm-paper/near-black foundation with graphite secondary text and a restrained burnt-rust action/focus accent. Real artifact colors provide any additional range. Values are proposals pending live review. The proposed foreground/background pairs must pass WCAG AA; validate in the actual rendered contexts before approval.

## Typography

Proposed display: Oswald 600; reading: Source Serif 4; rare functional utility: DM Mono. This consolidates a coherent role system; eliminate redundant Barlow/Oswald competition in the live implementation. Verify Google Fonts load and metrics, keep readable local fallbacks.

Hero name, all section headings, and closing heading share the display family/token. Statement has no visible “Currently” label/eyebrow, and retains the current live Source Serif 4 family and computed declaration exactly: `clamp(29px, 5vw, 66px)`. At phone widths the name remains large, deliberately wrapping rather than shrinking into a small label.

## Layout

### Shared grid and rhythm

Propose 90rem max frame and named responsive 8px rhythm/gutter. Components use named role tokens, not local arbitrary duplicates; content-specific dimensions are explicit data-driven exceptions. Maintain wide negative space and avoid repeated content+eyebrow wrappers.

### Hero

Desktop: centered dominant one-line “Isaac Ndahura”, broad support-copy measure (initial proposal `min(72vw, 64rem)`), no narrow sidebar. Portrait only when Isaac supplies an authentic image. Mobile: visibly large two-line name followed by two vertical rows (copy then optional portrait/artifact), no columns or clipping.

### Statement

Only the large paragraph appears. No title, “Currently”, eyebrow, review note, metadata, or ornamental caption. Preserve existing family/size. Maintain a comfortable reading measure.

### Bits & Pieces

A meaningfully layered composition of supplied artifacts with intentional overlap and modest, varying angles. Useful detail reveals on hover and focus plus equivalent mobile disclosure. Never hide the only essential content behind hover. Sensible z-order, readable labels and reduced-motion stable state. Do not assign invented detail to decorative placeholders.

### The Bookshelf

Distinct individual volumes with visibly varied width/height/silhouette, printed spine type and subtle page/casing detail, tightly arranged on visible continuous support board(s). Objects rest on the surface; selected ones lean into neighbors/supports plausibly. Still composition comes first, then restrained direct pointer/touch/keyboard movement. No shake/reset controls. Explicit dragging must preserve normal phone scrolling when no drag is active. Keep two supported mobile rows; never accidental wrap. If Matter cannot yield stable rest and neighbor contact, prefer deterministic direct manipulation. Never represent placeholder spines as actual Isaac work.

### From My Head

Retain single horizontal row of tall/narrow writing pieces with copy below; mobile horizontal browse remains. Harmonize shared type/spacing but avoid expanding the pass.

### Leave a Note

Centered personal invitation. Heading uses same exact display role. Approved copy and destination pending; no generic funnel treatment.

## Elevation & Depth

Depth has physical evidence: paper edges, object overlap, casing side, page block and contact shadows against shelf boards. No glass, gradients as decoration, heavy generic card shadows or excessive 3D.

## Shapes

Print-like square corners. Distinct book shapes come from dimensions and casing edges; no generic app-card radius language. Optional 2px print edge is a proposal, not a global UI radius.

## Components

Use the canonical token groups in this document for shared roles: `page-frame`, `section-heading`, `fragment`, `shelf-object`, `focus-ring`. Roles map to CSS rather than duplicating component-specific type/color values. Book geometry is item data. Fragment composition is editorial and content-specific, not four equal cards. All interactive objects need visible focus and a static, no-JS content fallback.

## Do's and Don'ts

- **Do** implement shared roles before composing each section and keep proposed values traceable.
- **Do** compare rendered type/palette with authentic references/material, not in an isolated swatch sheet only.
- **Do** ask for real assets and state exactly which area each asset resolves.
- **Do** test desktop and mobile, keyboard, touch, reduced motion and text zoom.
- **Don't** repeat tiny uppercase eyebrows and generic card treatments.
- **Don't** introduce fake projects, generic stock/generated personal objects or invented biography.
- **Don't** copy reference imagery or type.
- **Don't** add shelf-level shake/reset controls.

## Accessibility and responsive behavior

Use semantic landmarks, one h1, ordered section headings. Interactive fragment disclosures expose accurate names/states and keyboard/touch affordance. Focus ring is 2px rust with 4px offset on paper; verify contrast. Pointer movement is supplementary. Mobile book interaction must not hijack normal page scrolling; reduced motion disables transitions without hiding information. 200% zoom must not clip. Verify 390, 760 and 1440 viewports, no page-level horizontal overflow, and the horizontal writing strip as the only intentional scroller.

## Motion and interaction

GSAP only for meaningful, short, interruptible editorial transitions; no content hidden until scroll. Fragment details are immediately available without motion. For shelf, Matter.js is optional and justified only if bodies settle in the target stable poses; direct object movement is preferable to uncontrolled tumbling. No control toolbar.

## Implementation mapping

`product/PRD.md` and `product/updates/editorial-visual-refresh/UPDATE-BRIEF.md` define requirements and evidence. This document is the sole visual/token authority. `src/styles/global.css` consumes its shared roles; remove old duplicate variables. Reference JPEGs remain documentation, never runtime site assets.
