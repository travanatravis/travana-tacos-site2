# Travana Tacos — consistency pass

This pass is intentionally stronger than the earlier light cleanup.

## What changed
- Added a consistent **page masthead treatment** to the main hero/top sections on the inner pages.
- Standardized repeated spacing patterns with reusable classes instead of lots of one-off inline margins.
- Tightened heading rhythm and supporting copy widths so sections feel more deliberate.
- Improved repeated CTA/button rows so they align more intentionally across pages.
- Cleaned up Contact page action layout, including the mixed CTA row and inline copy button.
- Added a shared CSS cleanup block at the end of `styles.css` for spacing, mastheads, card rhythm, copy width, CTA alignment, and footer consistency.

## Before / after signal
Remaining inline `style=` usage after cleanup:
- `about.html`: 1
- `contact.html`: 1
- `find-us.html`: 1
- `index.html`: 2
- `menu.html`: 1

These are down from a much heavier set of page-specific inline styles, so most of the spacing logic now lives in the shared stylesheet.

## Files updated
- `styles.css`
- `about.html`
- `contact.html`
- `find-us.html`
- `index.html`
- `menu.html`

## Important note
The repomix export is a **merged read-only representation** of the repo, and binary assets are not included in its file contents. This package contains the edited text files extracted from that export, ready to merge back into the real repository.
