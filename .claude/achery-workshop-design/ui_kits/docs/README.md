# Achery Workshop — Docs UI Kit

A documentation site / field-guide reader. Three-column layout: section sidebar, prose, on-this-page TOC.

## What's modeled

- **Header bar** — brand · search · primary nav · theme toggle.
- **Section sidebar** — grouped nav with active state (terracotta left-rule).
- **Article** — long-form prose with slab section headings (`§` prefix), italic deck, dropcap on the lead, hard-rule double dividers.
- **Callouts** — `note` (accent border-left) and `warn` (ochre).
- **Code blocks** — JetBrains Mono, sunken background, tiny `data-lang` ribbon, copper for inline.
- **Footnotes** — `<sup>` numerals in accent color, footnote section with hairline divider.
- **Pagenav** — prev/next at article foot.
- **TOC** — sticky right-rail with active-section indicator.
- **Marginalia** — botanical glyph in the top-right of the article, ~45% opacity.

## How to extend

Each page reuses the same shell. Swap the `<main>` contents. The CSS is all `dx-*` prefixed and lives in `index.html` itself — no React, no build. This is the simplest of the UI kits on purpose; docs sites should be stupidly easy to author against.

## Notes

- Inline `<code>` uses the new `--copper` material token, which gives code a warm, slightly metallic feel that distinguishes it from prose without resorting to gray.
- Section heading `§` is a glyph mark, not a chip; it sits in the gutter the way an editor's mark would.
