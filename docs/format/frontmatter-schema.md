---
title: Folivm Frontmatter Schema
project: Folivm
status: draft
version: 0.1
created: 2026-02-20
---

# Folivm Frontmatter Schema

Folivm documents use [Pandoc Markdown](https://pandoc.org/MANUAL.html#pandocs-markdown) with YAML frontmatter for metadata. This schema defines the fields supported by Folivm.

**Baseline:** Pandoc Markdown. Folivm adds conventions for document metadata and project structure.

---

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Document title. Used in export metadata and print output. |

---

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `created` | string | Creation date. ISO format (YYYY-MM-DD) recommended. |
| `updated` | string | Last update date. ISO format (YYYY-MM-DD) recommended. |
| `author` | string | Author name. |
| `subtitle` | string | Document subtitle. |
| `abstract` | string | Abstract or summary. |
| `keywords` | list | List of keywords. |
| `lang` | string | Document language (e.g. `en-AU`). |

---

## Example

```yaml
---
title: Strategic Review — Acme Corp
created: 2026-02-20
updated: 2026-02-20
author: Jane Smith
abstract: Executive summary of the strategic review findings.
keywords:
  - strategy
  - review
  - Acme
lang: en-AU
---

# Introduction

Document body in Pandoc Markdown...
```

---

## Versioning

This schema is version 0.1. Folivm Phase 0 supports the fields listed above. Additional fields may be added in future phases; unrecognised fields are preserved and passed through to Pandoc.

---

*Part of [Folivm Format Specification](README.md)*
