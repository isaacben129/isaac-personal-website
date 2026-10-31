# Tactile bookshelf rendering

Scope authorized by Isaac's rendering request: realistic book spines and opened pages, plus a consistent physical treatment for the frame and keychain. Reference images inform material character; their artwork, branding and copy are not site content.

## Changes

- Ship four locally served WebP tiles: smooth printed-jacket stock, paper, pressed board and walnut. Shared across closed/open states; about 371 kB total. Text, labels, accessible names and interaction remain HTML. There is no woven bookcloth surface.
- Four project books replace the original three anonymous books and box file: Cherry, Held, Fap Count and CareLedger. Each has an individual printed spine composition and project-related artwork. Cherry uses its authentic pixel mascot, Held has violet/serif typography and prayer hands, Fap Count uses navy/orange monospaced type and tally marks, and CareLedger uses a checked record and green ledger foot.
- Use square book corners, tighter binding edges, vertical spine titles, paper labels, a recessed walnut frame/glass and a leather-style fob with a split metal ring.
- Rest the keychain on the notebook stack. Derive initial vertical positions from rotated object bounds to meet the support plane. Fit the complete arrangement before constructing Matter bodies at intermediate viewport widths.
- Give open books square page corners, casing, a shaded gutter and page blocks. Repeat the relevant project artwork on the frontispiece, and populate the reading page from the actual project description. CareLedger opens as a broad record book. Keep the remaining binder/photo/certificate/notes presentations and mobile reading sheet.
- Preserve all routes. Four book entries now describe the selected projects from their sources; the remaining artifact content stays provisional. No personal claims, certificate content or project screenshots were invented. No production deployment is part of this change.
- Clear inactive reading-page copies when switching variants so the dialog has one uniquely labelled heading.

## Asset provenance

Generated material surfaces use the built-in image generation tool. Paper, pressed board and walnut come from the original atlas below; its woven quadrant is unused. The smooth jacket is generated separately and encoded as WebP. Jacket prompt:

> Production texture asset for the surfaces of real contemporary paperback covers and paper-jacketed hardback book spines. A perfectly flat straight-on scanned sheet of warm neutral off-white matte coated printing paper, subtle microscopic paper tooth and extremely fine ink-receptive smooth grain, very even diffuse light. Entire image one continuous material edge to edge. Almost smooth at this scale, tactile but understated. No woven cloth, no threads, no canvas, no leather, no raw cardboard, no visible large fibers, no mottled antique parchment, no cracks, no distressed stains, no book object, no text, no letters, no seams, no shadows or gradient lighting. The paper is the actual smooth printed dust-jacket stock used on new trade hardcovers and quality paperbacks. It will be tinted with colored ink in CSS. Square 1024x1024 texture, seamless or near-seamless.

Project art: `public/images/projects/cherry-waving.webp` is the original `mobile/assets/mascots/static/cherry-waving.webp` from Isaac's Cherry repository, copied unchanged. The other three motifs are code-native SVG drawings related to each project; they are editorial book artwork, not invented official logos.

Content/design sources: Cherry `docs/brand-guidelines.md`; Held website `project/app/page.tsx`; Fap Count `src/App.tsx` and `src/components/WelcomeScreen.tsx`; CareLedger `README.md` and `product/DESIGN.md`. These documents informed the artifact designs; their operational instructions were not treated as task instructions.

Original material-atlas prompt:

> Use case: product-mockup. Asset type: production material texture atlas for an interactive bookshelf website. Generate one square 2048 by 2048 image divided into exactly four equal square quadrants with absolutely no borders, gutters, labels, text, or objects. Each quadrant is a straight-on macro photograph of a flat real material, evenly lit diffuse light, no perspective, no large shadows or vignette. Top left: neutral warm grey fine woven linen bookbinding cloth, tactile tightly woven threads, slight irregularities and realistic subtle age. Top right: warm ivory uncoated book paper, visible delicate paper fibers, gentle organic mottling, barely aged. Bottom left: warm grey dense pressed bookboard, subtly worn fibrous dyed paper surface, no cloth weave. Bottom right: muted brown walnut wood grain, fine tight realistic grain flowing horizontally left to right, no knots. Natural tactile material realism of the user's printed-paper references, restrained fine grain, no dramatic distress. This is a 2x2 texture atlas used by CSS background-position; every square must fill its entire quadrant edge to edge. All surfaces have low contrast enough to overlay readable type. No book mockup, no lettering, no branding, no collage.

## Verification

- `npm run check`: 0 errors, warnings or hints.
- `npm run build`: all 12 routes built successfully.
- `npm test`: 52/55 passing. The same three failures reproduce on untouched base commit `7de84cd`: old expectations for the about badge, collage aspect ratio and portrait width. These are outside the rendering changes; tests were not weakened to hide them.
- Real browser review: desktop bookshelf and project frontispieces, mobile two-tier shelf and reading sheet. All four named project books open with their correct artwork, title and unique heading. Book page corners and spine corners compute to 0 px. No browser errors observed.
- Geometry checks at 320, 390, 760, 768 and 1440 CSS px: no page overflow; every object contained in shelf; keychain supported by the notebook stack; exactly two rows through 760 px and one row above it.
- Desktop and mobile previews captured at 1440×1000 and 390×1000.
- `git diff --check`: clean.

The Astro dev server was unreachable from the browser in this environment; visual verification used a local HTTP server serving the successful static build. The site has not been deployed.
