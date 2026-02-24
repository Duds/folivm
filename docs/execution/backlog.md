---
title: Backlog
project: Folivm
status: draft
version: 0.4
created: 2026-02-19
updated: 2026-02-25
depends_on:
  - docs/conceptual/prd-lean.md
  - docs/planning/roadmap.md
  - docs/architectural/frs.md
  - docs/execution/ui-scaffold-prompt.md
---

# Backlog

Execution artefacts for Folivm, derived from the [PRD](../conceptual/prd-lean.md), [Roadmap](../planning/roadmap.md), and [FRS](../architectural/frs.md). Phase 0 is the current focus.

---

## Phase 0 — Personal Tool (Current)

### Priority Order and Rationale

| Order | ID | Title | Rationale |
|-------|----|------|-----------|
| 1 | EP-006 | Tauri desktop shell | Foundation — app must run before any feature works. FR-5.1, FR-5.2 |
| 2 | EP-003 | Project folder context | Project and document lifecycle; required for editor and export. FR-1.1–1.3 |
| 3 | EP-001 | Rich Markdown editor | Core authoring; no value without editing. FR-2.1, FR-2.2 |
| 4 | EP-002 | Element-based styling and preview | Preview and stylesheet; prerequisite for export quality. FR-2.3 |
| 5 | EP-004 | Export to PDF and DOCX | Primary deliverable; validates Phase 0 success. FR-3.1–3.3 |
| 6 | EP-005 | LLM assistance with project context | Differentiating capability; can follow core workflow. FR-4.1–4.3 |
| 7 | EP-007 | Format documentation | Phase 0 readiness deliverable; can run in parallel. Roadmap |
| 8 | EP-008 | UI scaffold (interface shell) | Figma-first design tokens, three-panel layout, theme modes. [UI Scaffold Prompt](ui-scaffold-prompt.md) |
| 9 | EP-109 | Native application menu | Menu bar (Folivm, File, Edit, View, Window, Help) with proper items and shortcuts |
| 10 | EP-110 | Empty editor canvas | Watermark, shortcuts list, no page chrome when no doc open |
| 11 | EP-111 | Document tabs | Open multiple documents in tabs (including same-doc multi-view) |
| 12 | EP-113 | Right panel: structure tree and Figma-style properties | Document structure tree, context-sensitive properties; YAML hidden |
| 13 | EP-122 | Right panel style picker (paragraph and character) | Paragraph/character styles; primary over context menu; FR-2.4 |
| 14 | EP-114 | Document layout: ruler, margins, tabs | Ruler above canvas; units configurable (mm, cm, inch) |
| 15 | EP-115 | Adopt Radix Themes for application chrome | Consistent typography, spacing, colour; Dialog, Select, Switch, etc. |
| 16 | EP-112 | AI assistant as extension | Move LLM panel to optional extension; thin cloud vs API tokens |

### Epic Index

| ID | Title | Status | Stories |
|----|-------|--------|---------|
| [EP-001](epics/EP-001-rich-markdown-editor.md) | Author can create and edit rich Markdown documents with Pandoc extended syntax | In progress | US-001–004 (footnotes done) |
| [EP-002](epics/EP-002-element-based-styling-preview.md) | Author can apply element-based styling and preview print output | Done | US-010–012 |
| [EP-003](epics/EP-003-project-folder-context.md) | Author can work within a project with standard folder schema | Done | US-020–023 |
| [EP-004](epics/EP-004-export-pdf-docx.md) | Author can export documents to professional PDF and DOCX without post-processing | Done | US-030–033 |
| [EP-005](epics/EP-005-llm-assistance.md) | Author can request LLM assistance with document and project context | Done | US-040–043 |
| [EP-006](epics/EP-006-tauri-desktop-shell.md) | Author can run Folivm as a local Tauri desktop application | Done | US-050–052 |
| [EP-007](epics/EP-007-format-documentation.md) | Author has documented Folivm format and project conventions | Done | US-070–072 |
| [EP-008](epics/EP-008-ui-scaffold.md) | Author works in a professional interface shell with design tokens, three-panel layout, and theme modes | Done | — (spec: [ui-scaffold-prompt](ui-scaffold-prompt.md)) |
| [EP-109](epics/EP-109-native-application-menu.md) | Author uses native application menu for common actions | Done | US-093–096 |
| [EP-110](epics/EP-110-empty-editor-canvas.md) | Empty editor canvas shows Folivm watermark and shortcuts | Done | US-097–098 |
| [EP-111](epics/EP-111-document-tabs.md) | Author can open multiple documents in tabs | Done | US-099–101 |
| [EP-113](epics/EP-113-right-panel-structure-properties.md) | Right panel: document structure tree and Figma-style properties | Done | US-113, US-118–121 |
| [EP-122](epics/EP-122-right-panel-style-picker.md) | Right panel style picker (paragraph and character) | Backlog | US-122–126 |
| [EP-114](epics/EP-114-document-layout-ruler.md) | Document layout: ruler, margins, tabs | Done | US-116, US-117 |
| [EP-115](epics/EP-115-radix-themes-adoption.md) | Adopt Radix Themes for application chrome | Done | — |
| [EP-112](epics/EP-112-ai-assistant-extension.md) | AI assistant as optional extension | Backlog | US-102–104 |

**Phase 0 success:** The author uses Folivm for their next real client deliverable instead of VS Code + manual pandoc.

---

## Phase 1+ — Backlog (Deferred)

| ID | Title | Status | Priority note |
|----|-------|--------|---------------|
| EP-101 | Users can share documents and collaborate (small team) | Backlog | — |
| [EP-102](epics/EP-102-rag-project-folder.md) | Users can use RAG over project folder for LLM context | Backlog | — |
| [EP-103](epics/EP-103-deck-mode-pptx-export.md) | Author can switch to deck mode and export PPTX | Backlog | Pair with EP-108. Stories: US-105–110 |
| EP-104 | Users can deploy server-hosted or sync | Backlog | — |
| EP-105 | Folivm AI managed LLM proxy service | Backlog | — |
| EP-106 | Folivm Sync thin cloud sync for multi-device | Backlog | — |
| [EP-107](epics/EP-107-templated-project-conventions.md) | Author can use templated project conventions | Backlog | — |
| [EP-108](epics/EP-108-structural-outline-mode.md) | Author can work in structural (outline) mode | Backlog | Core workflow experience — prioritise early in Phase 1 |

### EP-108 — Structural (Outline) Mode

**Title.** Author can view and reorganise document hierarchy in structural mode without body text.

**Rationale.** Word's Outline mode is one of its most valuable and underappreciated features. It surfaces the heading hierarchy of a document, collapses body text, and lets the author work at the structural level — reordering sections, promoting and demoting headings, validating the argument architecture before writing prose. For a consultant drafting a complex report, this is how you think before you write. It is a distinct authoring mode, not a cosmetic view option.

Folivm's heading hierarchy is already the structural spine of every document — outline mode is a different rendering contract on existing data. Nothing new needs to be stored. The mode reads headings H1–H4 from the document and presents them as a collapsible, reorderable tree. Body text (prose cells, data cells, visual cells) is hidden or summarised. Reordering in outline mode reorders the underlying Folivm source.

**Why it belongs in Phase 1, not Phase 0.** Phase 0 establishes the editor and the heading hierarchy. Outline mode depends on a stable heading model in TipTap. Phase 1 is the right moment — the foundation is solid, and outline mode validates the document structure model before deck mode is built on top of it.

**Why it is a core workflow experience, not a minor feature.** The authoring sequence for a professional document is: structure first, prose second. Outline mode is the structure-first surface. Without it, authors default to linear top-to-bottom drafting, which is less efficient for complex deliverables. With it, Folivm supports the way professional writers actually work. It also creates a natural LLM integration point — "given my brief, suggest an outline" lands in outline mode, not in the prose editor.

**Deck mode connection.** An outline in document mode and a slide list in deck mode are the same structure viewed differently. A Phase 1 outline-to-deck workflow — build the argument structure in outline mode, switch to deck mode, headings become slides — is a high-value authoring path for consultants who start with key messages before building the full presentation. EP-108 and EP-103 should be sequenced and designed together.

**Acceptance criteria (indicative).**
- Author can switch to structural mode from the editor toolbar or keyboard shortcut
- Structural mode displays H1–H4 headings as a collapsible, indented hierarchy; body text is hidden
- Author can collapse and expand heading branches
- Author can reorder sections by dragging headings; underlying Folivm source updates accordingly
- Author can promote or demote a heading level (H2 → H1, H2 → H3) from structural mode
- Switching back to document mode preserves all changes made in structural mode
- LLM assistance is available in structural mode (suggest outline, restructure, add missing sections)

**Stories.** To be defined when EP-108 is prioritised. Estimated US-080–086.

### Left Sidebar Explorer (Phase 0/1 enhancements)

| ID | Title | Status |
|----|-------|--------|
| [US-090](stories/US-090-drag-drop-documents-explorer.md) | Drag and drop documents in explorer | Done |
| [US-091](stories/US-091-search-project-documents.md) | Search project documents | Done |
| [US-092](stories/US-092-compare-versions.md) | Compare versions | Backlog |

### Native Menu, Empty State, Tabs, Extensions

| ID | Title | Status |
|----|-------|--------|
| [US-093](stories/US-093-native-menu-structure.md) | Define and wire native menu structure | Done |
| [US-094](stories/US-094-file-menu-items.md) | File menu items | Done (Close tab blocked on EP-111) |
| [US-095](stories/US-095-edit-view-menu-items.md) | Edit and View menu items | Done |
| [US-096](stories/US-096-help-menu-shortcuts.md) | Help menu and keyboard shortcut reference | Done |
| [US-097](stories/US-097-empty-canvas-watermark.md) | Empty canvas layout and Folivm watermark | Done |
| [US-098](stories/US-098-empty-canvas-shortcuts.md) | Keyboard shortcut list on empty canvas | Done |
| [US-099](stories/US-099-document-tabs-ui.md) | Document tab bar UI (including same-doc multi-view) | Done |
| [US-100](stories/US-100-tab-state-unsaved.md) | Tab state and unsaved-change handling | Done |
| [US-101](stories/US-101-explorer-opens-tab.md) | Explorer click opens or activates tab | Done |
| [US-113](stories/US-113-document-metadata-properties.md) | Document metadata in properties; YAML hidden | Done |
| [US-118](stories/US-118-document-structure-tree.md) | Document structure tree (collapsible, selectable) | Partial |
| [US-119](stories/US-119-context-sensitive-properties.md) | Context-sensitive properties for headings, paragraphs, lists, blocks | Partial |
| [US-120](stories/US-120-list-properties.md) | List properties (bullet style, number format) | Backlog |
| [US-121](stories/US-121-variable-picker-in-properties.md) | Folivm variable picker in properties panel | Partial |
| [US-122](stories/US-122-two-way-selection-sync.md) | Two-way selection sync (editor ↔ structure tree ↔ properties) | Backlog |
| [US-123](stories/US-123-paragraph-level-style-picker.md) | Paragraph-level style picker (heading, body, block type) | Backlog |
| [US-124](stories/US-124-character-level-style-picker.md) | Character-level style picker (emphasis, strong, code, link) | Backlog |
| [US-125](stories/US-125-variable-picker-persistence.md) | VariablePicker persistence for paragraph styles | Backlog |
| [US-126](stories/US-126-nomenclature-doc-alignment.md) | Nomenclature doc and cross-doc alignment | Done |
| [US-114](stories/US-114-non-visible-characters-toggle.md) | Toggle non-visible / non-printing characters | Done |
| [US-115](stories/US-115-test-documents-word-processing.md) | Test documents for word processing features | Done |
| [US-116](stories/US-116-ruler-above-canvas.md) | Ruler above document canvas | Done |
| [US-102](stories/US-102-extension-panel-contract.md) | Extension contract for sidebar/panel registration | Backlog |
| [US-103](stories/US-103-extract-assistant-extension.md) | Extract assistant panel into AI extension | Backlog |
| [US-104](stories/US-104-core-no-builtin-ai.md) | Core app: extension slot, no built-in AI when absent | Backlog |

See [Extensions Concept](../planning/extensions-concept.md) for extension ideas.

---

## Phase 2+ — Backlog (Deferred)

| ID | Title | Status |
|----|-------|--------|
| EP-201 | Organisation can apply brand manifest and theme governance | Backlog |
| EP-202 | Users can assemble documents from clause library | Backlog |
| EP-203 | Organisation can deploy with DMS integration | Backlog |
| EP-204 | Organisation can meet government accessibility and security requirements | Backlog |

Epics are in [epics/](epics/). Stories (PBIs) are in [stories/](stories/).

---

## FR Traceability

| FR | Epic(s) |
|----|---------|
| FR-1.1–1.3 | EP-003, EP-006 |
| FR-2.1–2.2 | EP-001 |
| FR-2.3 | EP-002 |
| FR-2.4 | EP-122 |
| FR-3.1–3.3 | EP-004, EP-006 |
| FR-4.1–4.3 | EP-005 |
| FR-5.1–5.2 | EP-006 |
| FR-6.1–6.4 | EP-108 |
| FR-7.1–7.3 | EP-103 |
| FR-8.1–8.3 | EP-102 |
| FR-9.1–9.2 | EP-107 |

---

## Related

- [PRD Lean](../conceptual/prd-lean.md) — Phase 0 requirements
- [FRS](../architectural/frs.md) — Functional requirements specification; FR-ID traceability
- [SAD](../architecture/sad.md) — Software Architecture Document; component and module structure
- [Roadmap](../planning/roadmap.md) — Phase sequencing and success criteria
- [UI Scaffold Prompt](ui-scaffold-prompt.md) — Interface shell specification (EP-008)
- [Solution Concept](../strategic/solution-concept.md) — Phase 0 architecture

---

## Open Questions

1. **Story dependency order.** EP-006 and EP-003 have implementation overlap (Tauri shell + project folder access). Should US-051 and US-052 be sequenced differently?
2. **EP-007 timing.** Format documentation can be drafted in parallel with development. Should it block Phase 0 exit?
3. **EP-008 vs EP-005 sequencing.** UI scaffold refactor (EP-008) establishes the interface shell before LLM panel. Should EP-008 precede EP-005, or can they run in parallel?

---

*Previous: [Release Plan](../planning/release-plan.md) · Next: [RAIDD](../governance/raid.md)*
