# Mobile hero, navigation, and contact refinement

## Requested replacement behavior
- Mobile hero title sits lower in the viewport, remains large, and gains deliberate space between Isaac and Ndahura.
- The “this is me” annotation is much smaller and remains on the portrait’s right side.
- The mobile About composition centers the copy; the portrait occupies the upper-right visual position and the badge sits at the lower left without covering copy.
- Decorative horizontal divider lines are removed at all breakpoints.
- Redundant instructional copy is removed, including the small-screen row-scrolling hint and interaction-help prose.
- Mobile navigation becomes an accessible animated full-screen menu.
- Leave a Note becomes a real form that hands a composed note to the visitor’s email app via `mailto:`. The site stores nothing and has no backend.

## Invariants
- Desktop hero/portrait treatment otherwise remains unchanged.
- Homepage section order, collage, bookshelf physics, content routes, and preview dialogs remain operational.
- Review output remains noindex.
- Motion respects `prefers-reduced-motion`.

## Acceptance
- Menu toggle and close are keyboard accessible, preserve focus, close on Escape/link selection, and lock document scroll while open.
- Form requires a message, URL-encodes user input, and invokes an email-app handoff without storing or transmitting data itself.
- Mobile has no horizontal overflow at 390×844 and 430×932.
- Desktop has no horizontal overflow at 1440×1000.
- Named helper copy and divider borders are absent.
