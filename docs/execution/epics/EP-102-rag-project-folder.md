---
title: EP-102 — RAG over Project Folder
project: Folivm
status: backlog
version: 0.1
created: 2026-02-23
depends_on:
  - docs/execution/epics/EP-005-llm-assistance.md
  - docs/execution/epics/EP-003-project-folder-context.md
---

# EP-102 — Users can use RAG over project folder for LLM context

## Outcome

The LLM receives retrieved context from the project folder, not just explicitly selected files. Retrieval-augmented generation (RAG) indexes project files (inputs/, working/, context/) and returns relevant chunks for each LLM request. The author benefits from automatic context selection for larger projects where manual file selection is impractical.

## Rationale

Phase 0 (EP-005) passes context explicitly: the author selects which files to include with each LLM request. That works for small projects. For larger projects — many research notes, transcripts, multiple briefs — explicit selection becomes tedious. RAG retrieves the most relevant chunks automatically and injects them into the LLM prompt. Same UX (request assistance) but richer, automatic context.

## Scope

- Index project folder contents (inputs/, working/, context/; exclude deliverables/ or configurable)
- Chunking strategy for Markdown and plain text; optional handling of other formats
- Embedding and retrieval (vector search or keyword hybrid)
- Retrieve top-k relevant chunks for each LLM request; inject into prompt
- Author can still explicitly include/exclude files (override or supplement retrieval)
- Index updates when project files change (incremental or on-demand)

## Non-scope (Phase 1)

- RAG over clause library (Phase 2)
- Multi-project or cross-project retrieval
- Server-side embedding (local-first; embedding model runs locally or via same API as LLM)

## Success Criteria

- LLM requests automatically include relevant chunks from the project folder
- Retrieval is fast enough for interactive use (sub-second for typical projects)
- Author can see or configure what context was retrieved (transparency)
- Large projects (100+ files) are handled without manual file selection
- Index stays in sync with project changes

## Stories

| ID | Title | Status |
|----|-------|--------|
| US-060 | As an author, I want the LLM to automatically retrieve relevant project context so that I don't have to select files manually | Backlog |
| US-061 | As an author, I want to see which context was retrieved for my request so that I understand what the LLM used | Backlog |
| US-062 | As an author, I want to exclude certain folders or files from RAG indexing so that sensitive content is not sent | Backlog |
| US-063 | As an author, I want the index to update when I add or edit project files so that retrieval stays current | Backlog |

*Story files to be created when EP-102 is prioritised.*

## Related

- [EP-005 LLM assistance](EP-005-llm-assistance.md) — Base LLM integration; EP-102 adds RAG
- [EP-003 Project folder context](EP-003-project-folder-context.md) — Folder schema RAG indexes
- [RAG architecture](../../architectural/rag-architecture.md) — Embedding strategy, chunking, retrieval

---

*Previous: [EP-103](EP-103-deck-mode-pptx-export.md) · Next: [EP-107](EP-107-templated-project-conventions.md)*
