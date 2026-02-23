# Folivm — TODO

Immediate and upcoming tasks. For the full backlog, see [docs/execution/backlog.md](docs/execution/backlog.md).

---

## Immediate (Phase 0 — Personal Tool)

### Setup and scaffold
- [x] Initialise Tauri project (see [ADR-0003](docs/architectural/adrs/ADR-0003-tauri-desktop-framework.md))
- [x] Add TipTap to frontend (see [ADR-0004](docs/architectural/adrs/ADR-0004-tiptap-editor-framework.md))
- [x] Define project folder schema (inputs/, working/, context/, deliverables/)

### Editor (EP-001)
- [x] Implement basic TipTap editor with headings, lists, paragraphs
- [x] Add custom TipTap nodes for Pandoc fenced divs (callout, executive-summary)
- [x] Persist as Pandoc Markdown with YAML frontmatter
- [x] Add footnote support (Pandoc inline `^[content]`; insert/edit via bubble menu)

### Styling (EP-002)
- [x] Create base print stylesheet (element-based: h1–h6, p, ul, ol, blockquote, table, etc.)
- [x] Add CSS counters for multi-level heading numbering
- [x] Implement WYSIWYG editor (single view = what you print; no separate preview toggle)

### Project (EP-003)
- [x] Project creation with folder schema
- [x] Open project; list documents
- [x] Load and save documents to project folder
- [ ] Autosave: implement debounced save when autosave toggle is enabled (toggle UI in window chrome; wire to save flow)

### Export (EP-004)
- [x] Integrate Pandoc CLI for PDF export (with path fallback for Homebrew)
- [x] Integrate Pandoc CLI for DOCX export
- [x] Reference DOCX template UI (US-032)

### UI scaffold (EP-008)
- [x] Design token system (tokens.css) — primitives, semantic aliases, component tokens
- [x] Three-panel layout (sidebar, editor canvas, assistant panel)
- [x] ThemeProvider and mode switching (Focus, Client Brand A)
- [x] See [UI Scaffold Prompt](docs/execution/ui-scaffold-prompt.md)

### LLM (EP-005)
- [x] LLM API integration (pluggable provider: OpenAI, Anthropic)
- [x] Context loading (document + selected project files)
- [x] Suggestion UI with accept/reject/edit

---

### Scaffold adoption (Vellum aesthetics)
- [x] Phase 1: Path aliases, cn(), lucide-react
- [x] Phase 2: Radix Dialog and DropdownMenu (replace custom modals/popovers)
- [x] Phase 3: Extract shell components (TopBar, LeftSidebar, EditorCanvas, RightPanel)
- [x] Phase 4: Vellum aesthetics (token polish, component refinements)
- [ ] See [Scaffold Adoption Plan](docs/planning/scaffold-adoption-plan.md)

---

### Documentation (EP-007)
- [x] Format documentation (frontmatter schema, project conventions, semantic blocks)

---

## Deferred

- ADR-0001: LLM provider pluggability and government deployment
- ADR-0002: DOCX/PPTX export library selection
- Phase 1 epics (RAG, sharing, PPTX)
- Phase 2 epics (brand manifest, clause library, DMS)

---

## Reference

- [Backlog](docs/execution/backlog.md)
- [PRD Lean](docs/conceptual/prd-lean.md)
- [Roadmap](docs/planning/roadmap.md)
