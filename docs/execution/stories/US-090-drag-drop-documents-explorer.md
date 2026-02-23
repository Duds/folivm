---
title: US-090 — Drag and drop documents in explorer
project: Folivm
status: done
version: 0.1
created: 2026-02-23
epic: EP-003
---

# US-090 — Drag and drop documents in explorer

**As an** author,  
**I want to** drag documents between folders in the project explorer  
**so that** I can organise my project without leaving the editor.

## Acceptance Criteria

- [x] I can drag a document from one folder and drop it into another folder in the tree
- [x] The document file moves on disk to the target folder
- [x] The explorer updates immediately after the move
- [ ] I can optionally drag files from the OS file manager into a folder in the explorer (copy or move into project)
- [ ] Invalid drops (e.g. non-Markdown into deliverables) show clear feedback

## Notes

- Phase 1 candidate. Complements US-021 (open project documents) and EP-003.
- Folder schema (inputs/, working/, context/, deliverables/) constrains valid drop targets.
- OS-to-explorer drag: copy into project vs move; UX decision TBD.

## Epic

[EP-003 Project Folder Schema and Context](../epics/EP-003-project-folder-context.md)

---

*Previous: [US-023](US-023-add-context-files.md) · Next: [US-091](US-091-search-project-documents.md)*
