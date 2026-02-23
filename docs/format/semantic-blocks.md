---
title: Folivm Semantic Block Conventions
project: Folivm
status: draft
version: 0.1
created: 2026-02-20
---

# Folivm Semantic Block Conventions

Folivm extends [Pandoc Markdown](https://pandoc.org/MANUAL.html#extension-fenced_divs) with semantic block conventions. These use Pandoc's fenced div syntax (`:::`) and map to styled output.

**Baseline:** Pandoc fenced divs. Folivm defines semantic classes for professional documents.

---

## Supported Semantic Blocks

### Callout

Highlighted block for key points, warnings, or emphasis.

**Syntax:**
```
::: callout
Content here. Can include **bold**, *italic*, lists, and other inline formatting.
:::
```

**Use for:** Key findings, important notes, warnings, call-to-action.

---

### Executive Summary

Block for executive summary content. Typically styled with distinct typography (e.g. italic, bordered).

**Syntax:**
```
::: executive-summary
This section summarises the document for executive readers.
:::
```

**Use for:** Document-level executive summaries, briefings.

---

## Block Content

Blocks can contain:
- Paragraphs
- Lists (bullet, ordered)
- Tables
- Nested formatting (bold, italic, etc.)
- Other semantic blocks (e.g. callout within executive-summary)

---

## Styling

Folivm applies element-based styling via the print stylesheet (`print.css`). Semantic blocks are styled by class:

- `.callout` — left border, background tint
- `.executive-summary` — distinct typography, optional border

Users can customise appearance by editing `print.css` in the project root.

---

## Pandoc Compatibility

The syntax is valid Pandoc Markdown. Documents can be processed with Pandoc directly:

```bash
pandoc document.md -o document.pdf --standalone --css print.css
```

---

## Versioning

Phase 0 supports `callout` and `executive-summary`. Additional semantic blocks may be added in future phases.

---

*Part of [Folivm Format Specification](README.md)*
