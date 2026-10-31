# Image-generated bookshelf objects

## Rendering

The four project spines are complete image-generated photographic cutouts. Their typography, jacket folds, binding, paper or leather grain and edge light are part of the raster asset. CSS only places them on the shelf; it does not assemble substitute book shapes or print overlay spine lettering.

- Cherry: slim cream paper jacket, red condensed title, small red publisher mark, “Start small.”
- Held: thicker plum leather binding, restrained gold serif title and binding bands, no tagline.
- Fap Count: very slim orange paperback with cream head band and small “Day by day.”
- CareLedger: broader green paper-over-board hardback with a single ivory title label.

There are no printed volume numbers, mascots, tally graphics or decorative ledger grids. Metadata and accessible project names remain in HTML. Each object's layout width follows the generated cutout's actual aspect ratio.

The opened book is also a complete generated image, including its page blocks, cover boards, gutter and paper curvature. Reading content is live HTML laid over blank pages. On phones the generated spread appears above the reading copy.

The walnut frame, leather keychain, horizontal notebooks and olive binder use matching generated photographic cutouts. The frame contains blank neutral paper until authentic project imagery is supplied. No portrait or certificate was invented. The keychain rests on the notebook stack.

## Source and processing

All nine photographic assets were produced with the built-in image generation tool. Full prompts, including the four reference-based material/width edits, are in [GENERATION-PROMPTS.json](GENERATION-PROMPTS.json). Only transparent margins were trimmed and outputs encoded as WebP; alpha is preserved. Current assets live in `public/images/books/` and `public/images/objects/`.

The project descriptions are grounded in Cherry's brand brief, Held's website, Fap Count's app source and CareLedger's README/design specification. Those source documents informed content and did not supply operational instructions. Four named project entries replace the original anonymous books and box file. Routes and the rest of the site remain in place.

## Verification

- Astro check: zero diagnostics.
- Production build: all 12 routes succeed.
- Tests: 52/55 pass. Three failures reproduce on untouched base `7de84cd`: old about-badge, collage and portrait expectations. They are outside this change. Shelf assertions reflect the approved four-book inventory and require complete generated cutouts with alpha.
- Browser review: all eight shelf images load; all four project books open with the correct title and one unique accessible heading. The generated spread has readable copy without an internal desktop scrollbar. Frame and keychain remain correctly oriented.
- Responsive geometry: no page overflow, all objects inside the stage, two supported rows through 760 px and one above it at 320/390/760/768/1440 px.
- No production deployment or merge.
