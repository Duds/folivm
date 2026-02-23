---
title: US-052 — Pandoc invocation for export
project: Folivm
status: draft
version: 0.1
created: 2026-02-20
epic: EP-006
---

# US-052 — Pandoc invocation for export

**As an** author,  
**I want to** have the app invoke Pandoc for export  
**so that** PDF and DOCX are generated correctly.

## Acceptance Criteria

- [ ] Tauri backend can invoke Pandoc CLI as subprocess
- [ ] Export passes document path, stylesheet path, and output path
- [ ] Export completes and produces valid PDF/DOCX
- [ ] Pandoc is available (installed by user or bundled)

## Epic

[EP-006 Tauri Desktop Shell](../epics/EP-006-tauri-desktop-shell.md)

---

*Previous: [US-051](US-051-project-folder-access.md) · Next: [EP-007](../epics/EP-007-format-documentation.md)*
