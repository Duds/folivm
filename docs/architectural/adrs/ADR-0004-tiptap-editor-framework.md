---
title: ADR-0004 — TipTap for Editor Framework
project: Folivm
status: accepted
version: 0.1
created: 2026-02-20
author: Dale Rogers
depends_on:
  - docs/strategic/solution-concept.md
---

# ADR-0004 — TipTap for Editor Framework

## Status
Accepted

## Context

Folivm Phase 0 requires a rich text editor that:
- Edits Pandoc Markdown with extended syntax (fenced divs, YAML frontmatter, footnotes, citations)
- Supports custom semantic blocks (e.g. `:::callout`, `:::executive-summary`)
- Preserves structure through round-trip editing
- Produces output that Pandoc can convert to PDF and DOCX
- Integrates with a web-based UI (Tauri hosts a WebView — see [ADR-0003](ADR-0003-tauri-desktop-framework.md))

The editor runs inside Tauri's WebView. The choice is which editor framework to use for the web UI layer.

## Decision

**Use TipTap** (ProseMirror-based) as the editor framework for the Phase 0 document editor.

## Rationale

### Alternatives Considered

| Option | Pros | Cons |
|--------|------|------|
| **TipTap** | Built on ProseMirror; modular extensions; custom node types for semantic blocks; headless/flexible UI; Vue/React support; schema enforcement; fits Pandoc Markdown model | ~100KB+ bundle; ProseMirror learning curve for deep customisation |
| **Raw ProseMirror** | Maximum control; no wrapper overhead | Steeper learning curve; more custom code; TipTap provides the API we need without reinventing |
| **Lexical** | Meta-backed; 22KB core; lightweight; modular | Younger ecosystem; output is custom Node format; less proven for document/semantic modelling |
| **Slate** | React-native; flexible; plugin-first | No enforced schema; mutable tree; would require more custom work for Pandoc structure |
| **Native contenteditable** | No framework dependency | Lacks schema, state management, undo/redo, cross-browser consistency; building equivalent would take months |

### Why TipTap

1. **ProseMirror foundation.** TipTap wraps ProseMirror, the battle-tested rich text engine used by Notion and others. ProseMirror provides schema enforcement, transaction model, and collaborative editing support. Native contenteditable lacks all of this; building equivalent capability from scratch is a multi-month undertaking.

2. **Custom node types for Pandoc semantic blocks.** Folivm needs fenced divs (`:::callout`, `:::executive-summary`, etc.). TipTap's extension model supports custom node types that map directly to Pandoc's block structure. The editor can produce valid Pandoc Markdown; round-trip editing preserves structure.

3. **Schema enforcement.** Documents have a defined structure. TipTap enforces what blocks are valid where. This aligns with "the document is the data" — structure is explicit, not implicit.

4. **Headless and extensible.** TipTap does not impose a fixed UI. Folivm can apply its own styling (print CSS, brand themes). Extensions are modular; we load only what we need.

5. **Mature ecosystem.** ProseMirror has been developed for years. TipTap provides a developer-friendly API on top. Lexical and Slate are viable but less proven for document-type editing with custom semantics.

### Why Not Native (Rust, C#, Swift)

Native frameworks (egui, iced, WPF, Avalonia) do not have mature rich text editor stacks comparable to ProseMirror/TipTap. WPF RichTextBox is limited; AvalonEdit targets plain text/code. Building a ProseMirror-equivalent in native code would derail Phase 0 scope. See NOTES.md "TipTap vs alternatives" for full research.

### Why Not Raw ProseMirror

ProseMirror is the engine; TipTap is the API layer. TipTap provides extensions, Vue/React bindings, and a simpler developer experience without sacrificing ProseMirror's power. Raw ProseMirror would require more custom code for the same outcome.

## Consequences

**Positive:**
- Leverage mature, battle-tested editor stack
- Custom semantic blocks map cleanly to Pandoc fenced divs
- Single codebase for editor; runs in Tauri WebView on all desktop platforms
- Future collaboration (Phase 1+) is tractable — ProseMirror supports it

**Negative:**
- Bundle size ~100KB+; acceptable for a desktop app
- ProseMirror concepts (schema, transactions) require understanding for deep customisation
- WebView rendering (WebKit/WebView2) — not native OS text controls

**Neutral:**
- Editor is web-based; aligns with ADR-0003 (Tauri) and web-native rationale
- If TipTap proves insufficient, migration would be within the web stack (e.g. Lexical); editor logic would need adaptation but not a full rewrite

## Related

- [Solution Concept](../../strategic/solution-concept.md) — Phase 0 architecture; GUI layer
- [ADR-0003](ADR-0003-tauri-desktop-framework.md) — Tauri for desktop; TipTap runs in Tauri's WebView
- [NOTES.md](../../../NOTES.md) — Session notes 2026-02-20: TipTap research summary

---

*Previous: [ADR-0003](ADR-0003-tauri-desktop-framework.md) · Next: [NFRs](../nfrs.md)*
