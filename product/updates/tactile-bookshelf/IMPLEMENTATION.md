# Tactile bookshelf rendering

Scope authorized by Isaac's rendering request: realistic book spines and opened pages, plus a consistent physical treatment for the frame and keychain. Reference images inform material character; their artwork, branding and copy are not site content.

## Changes

- Generate actual raster material surfaces and ship four locally served WebP tiles: bookcloth, paper, pressed board and walnut. Shared across closed/open states; about 426 kB total. Text, labels, accessible names and interaction remain HTML.
- Use fine-scale cloth, bound spine edges, correctly oriented vertical spine titles, paper labels, a recessed walnut frame/glass and a leather-style fob with a split metal ring.
- Rest the keychain on the notebook stack. Derive initial vertical positions from rotated object bounds to meet the support plane. Fit the complete arrangement before constructing Matter bodies at intermediate viewport widths.
- Give open books portrait pages, casing, a shaded gutter, curved edges and page blocks. Keep the art book landscape and retain the existing folder/binder/photo/certificate/notes presentations and mobile reading sheet.
- Preserve the current placeholder project inventory and all routes. No personal claims, certificate content or project screenshots were invented. No production deployment is part of this change.

## Asset provenance

Generated with the built-in image generation tool. The single generated atlas was separated into its four quadrants and encoded as WebP for texture reuse at the correct physical scale. Source generation prompt:

> Use case: product-mockup. Asset type: production material texture atlas for an interactive bookshelf website. Generate one square 2048 by 2048 image divided into exactly four equal square quadrants with absolutely no borders, gutters, labels, text, or objects. Each quadrant is a straight-on macro photograph of a flat real material, evenly lit diffuse light, no perspective, no large shadows or vignette. Top left: neutral warm grey fine woven linen bookbinding cloth, tactile tightly woven threads, slight irregularities and realistic subtle age. Top right: warm ivory uncoated book paper, visible delicate paper fibers, gentle organic mottling, barely aged. Bottom left: warm grey dense pressed bookboard, subtly worn fibrous dyed paper surface, no cloth weave. Bottom right: muted brown walnut wood grain, fine tight realistic grain flowing horizontally left to right, no knots. Natural tactile material realism of the user's printed-paper references, restrained fine grain, no dramatic distress. This is a 2x2 texture atlas used by CSS background-position; every square must fill its entire quadrant edge to edge. All surfaces have low contrast enough to overlay readable type. No book mockup, no lettering, no branding, no collage.

## Verification

- `npm run check`: 0 errors, warnings or hints.
- `npm run build`: all 12 routes built successfully.
- `npm test`: 52/55 passing. The same three failures reproduce on untouched base commit `7de84cd`: old expectations for the about badge, collage aspect ratio and portrait width. These are outside the rendering changes; tests were not weakened to hide them.
- Real browser review: desktop bookshelf and opened hardcover/frame, mobile two-tier shelf and reading sheet. All eight previews open with keyboard activation, show one selected presentation and close successfully. No browser errors or warnings observed.
- Geometry checks at 320, 390, 760, 768 and 1440 CSS px: no page overflow; every object contained in shelf; keychain supported by the notebook stack; exactly two rows through 760 px and one row above it.
- Desktop reading page content fits without an internal scrollbar at 1440×1000.
- `git diff --check`: clean.

The Astro dev server was unreachable from the browser in this environment; visual verification used a local HTTP server serving the successful static build. The site has not been deployed.
