---
title: US-091 — Search in document and project
project: Folivm
status: done
version: 0.2
created: 2026-02-23
updated: 2026-02-23
epic: EP-102
---

# US-091 — Search in document and project

**As an** author,  
**I want to** search within the current document and across my project documents, with find and replace and file scoping  
**so that** I can find and update content efficiently.

## Acceptance Criteria

### Search scope

- [x] I can search within the **current document only**
- [x] I can search **across the project** (all documents in the project folder)
- [x] I can toggle or choose between document scope and project scope

### Find and replace

- [x] I have a Search (find) input and an optional Replace input (expandable/collapsible)
- [x] I can replace single matches or replace all within scope
- [x] Search options: case-sensitive (Phase 1); whole word, regex deferred

### File scoping (project search)

- [ ] **Files to include:** I can specify glob patterns (deferred)
- [x] **Files to exclude:** default excludes `.git`
- [ ] Presets or browse (deferred)

### UX

- [x] I can open the search panel from the left sidebar (Search icon) or ⌘⇧F
- [x] Results show document name, snippet, line number
- [x] I can click a result to open the document
- [x] Phase 1: keyword search; Phase 2: semantic/RAG search (EP-102)

## Notes

- IDE-style search panel: Search, Replace (expandable), files to include, files to exclude.
- Phase 1: simple text search (grep-style) over Markdown content.
- Phase 1+ (EP-102): RAG over project folder adds vector search; search panel can surface both.
- Search icon in left sidebar icon bar activates this view/panel.

## Epic

[EP-102 RAG over project folder](../epics/EP-102-rag-project-folder.md)

---

*Previous: [US-090](US-090-drag-drop-documents-explorer.md) · Next: [US-092](US-092-compare-versions.md)*
