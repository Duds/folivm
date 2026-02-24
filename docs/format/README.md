---
title: Folivm Format Specification
project: Folivm
status: draft
version: 0.1
created: 2026-02-20
---

# Folivm Format Specification

This directory documents the Folivm document format and project conventions. A third party can create valid Folivm documents and projects using only this documentation.

**Baseline:** [Pandoc Markdown](https://pandoc.org/MANUAL.html#pandocs-markdown). Folivm adds conventions for metadata, project structure, and semantic blocks.

---

## Contents

| Document | Description |
|----------|-------------|
| [Frontmatter Schema](frontmatter-schema.md) | YAML frontmatter fields (title, created, author, etc.) |
| [Project Conventions](project-conventions.md) | Project folder schema (inputs/, working/, context/, deliverables/) |
| [Semantic Blocks](semantic-blocks.md) | Fenced div conventions (callout, executive-summary) |
| [Nomenclature](nomenclature.md) | UI and feature terms (right panel, style picker, variable picker, etc.) |

---

## Quick Reference

### Minimal Document

```markdown
---
title: My Document
created: 2026-02-20
---

# Introduction

Content here.
```

### Minimal Project

```
my-project/
  inputs/
  working/
  context/
  deliverables/
  print.css
```

### Semantic Block

```markdown
::: callout
Key point or note.
:::
```

---

## Pandoc Options

Folivm uses Pandoc for PDF and DOCX export. Default options:

- `--standalone` for PDF
- `--metadata pagetitle=Document` for PDF
- `--css print.css` when present in project root
- `--reference-doc` for DOCX when specified

---

## Version

Format specification version 0.1. Aligned with Folivm Phase 0.
