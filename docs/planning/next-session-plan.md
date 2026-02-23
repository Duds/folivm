---
title: Next Dev Session Plan
project: Folivm
status: draft
version: 0.1
created: 2026-02-22
---

# Next Dev Session Plan

**Session context.** Phase 0 core workflow is implemented: Folivm runs as a Tauri desktop app, with project folder, WYSIWYG editor, and PDF/DOCX export. Backlog and roadmap have been updated to reflect completed work.

---

## Completed This Session

| Item | Status |
|------|--------|
| Print.css semantic blocks (.callout, .executive-summary) | Done |
| H1–H4 in bubble menu | Done |
| Pandoc path fallback (PATH + Homebrew) | Done |
| Single WYSIWYG paradigm (no Edit/Preview toggle) | Done |
| Folivm rebrand (header, window title, page title) | Done |
| Backlog and roadmap status updates | Done |
| TODO.md checkboxes updated | Done |

---

## Phase 0 Remaining (Priority Order)

### 1. Validate the workflow (do first)

- Run `npm run tauri dev`
- Create project → author a real client doc → export PDF/DOCX
- Note friction, bugs, or gaps; prioritise fixes

### 2. Reference DOCX template (US-032)

- Export accepts `reference_docx` but UI always passes `null`
- Add project-level config (e.g. `Folivm.yaml`) or settings UI for reference DOCX path
- Align with Principle 10 (brand = CSS + reference DOCX)

### 3. Frontmatter editing (US-004)

- Current: frontmatter is raw text in the editor
- Minimal: YAML validation on save, surface errors
- Full: Frontmatter panel (title, created, updated, author) that reads/writes YAML

### 4. LLM assistance (EP-005)

- On-demand LLM API integration
- BYOK configuration (provider, region, model)
- Context: current document + selected project files
- Suggestion UI with accept/reject

### 5. Footnotes (EP-001 gap)

- FR-2.2 lists footnotes; not yet implemented
- TipTap extension or custom node for Pandoc footnotes

---

## Technical Debt (Lower Priority)

| Item | Action |
|------|--------|
| `@tauri-apps/plugin-fs` in package.json | Remove (unused) |
| markdown.ts frontmatter round-trip | Verify; ensure fenced-div parsing preserves frontmatter |
| Architecture diagram | Update: remove PrintPreview, reflect WYSIWYG single-view |

---

## Suggested Next Session Steps

1. **Validate:** Run the Phase 0 workflow end-to-end; fix any issues found.
2. **Reference DOCX (US-032):** Add project config or settings UI for reference DOCX path.
3. **Frontmatter:** Add minimal YAML validation on save.
4. **Optional:** Start EP-005 (LLM) if validation is solid.

---

## Related Plans

- [Scaffold Adoption Plan](scaffold-adoption-plan.md) — Product Engineer recommendations: path aliases, cn(), lucide-react, Radix Dialog/DropdownMenu, component extraction, Vellum aesthetics (Vite + Tauri + tokens.css only).

---

## Key Files

| Purpose | Path |
|---------|------|
| Editor | `src/Editor.tsx` |
| App shell | `src/App.tsx` |
| Tauri commands | `src-tauri/src/lib.rs` |
| Print styles | `public/print.css`, `src/App.css` |
| Backlog | `docs/execution/backlog.md` |
| Roadmap | `docs/planning/roadmap.md` |
