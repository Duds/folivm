---
title: ADR-0003 — Tauri for Desktop Framework
project: Folivm
status: accepted
version: 0.1
created: 2026-02-20
author: Dale Rogers
depends_on:
  - docs/strategic/solution-concept.md
---

# ADR-0003 — Tauri for Desktop Framework

## Status
Accepted

## Context

Folivm Phase 0 requires a desktop application wrapper for the Markdown GUI editor. The editor is a web-based UI (TipTap/ProseMirror); it needs a native shell for local-first desktop deployment. The solution concept specified "Electron or Tauri for desktop." A decision was needed before implementation.

Key requirements:
- Cross-platform desktop (macOS, Windows, Linux)
- Ability to run a local web-based editor and invoke the Pandoc CLI
- Reasonable install size and memory footprint for a personal tool
- Security-conscious (local file access, no server; documents may be sensitive)

## Decision

**Use Tauri** as the desktop framework for the Phase 0 application.

## Rationale

### Alternatives Considered

| Option | Pros | Cons |
|--------|------|------|
| **Tauri** | Uses OS native WebView (WebKit/WebView2); 2–10 MB installer; 30–50 MB idle memory; secure-by-default capability model; Rust backend for system integration; v2 adds iOS/Android | Requires Rust; smaller ecosystem than Electron |
| **Electron** | Mature; large ecosystem; web developers feel at home; powers VS Code, Slack, Discord | Bundles Chromium + Node.js; 80–150 MB installer; 150–300 MB idle memory; heavier security hardening needed |
| **Local-first web app (browser)** | No desktop shell; minimal packaging | No native file system integration; Pandoc invocation awkward; not a true desktop experience; browser security model limits local access |

### Why Tauri

1. **Lightweight.** Folivm Phase 0 is a personal tool. A 2–10 MB installer and 30–50 MB memory footprint are appropriate. Electron's 80–150 MB installer and 150–300 MB idle use are overkill for an editor that primarily edits Markdown files and calls Pandoc.

2. **Native WebView.** Tauri uses the OS WebView (WebKit on macOS, WebView2 on Windows, WebKitGTK on Linux). No bundled Chromium. The app starts faster and feels lighter. Folivm does not need Chromium-specific APIs.

3. **Security model.** Tauri's capability-based permissions are secure-by-default — everything disabled until explicitly enabled. Phase 0 needs local file read/write and subprocess execution (Pandoc). Tauri's permission model aligns with these needs without the hardening burden of context isolation, preload scripts, and CSP that Electron requires.

4. **Rust backend.** The Pandoc export pipeline, file system operations, and any future native integrations benefit from a robust backend. Rust is suitable for these tasks. The learning curve is acceptable for a small Phase 0 team.

5. **Fit for Phase 0 scope.** Phase 0 is weeks of scope. Tauri is sufficient for: hosting the editor UI, accessing the project folder, invoking Pandoc, and managing the print stylesheet. No complex plugin system or legacy Node dependencies are required.

### Why Not Electron

Electron would work, but it is heavier than necessary for Phase 0. The maturity argument (VS Code, Slack) applies to large, complex applications. Folivm Phase 0 is a focused editor. Tauri's smaller footprint and security posture are better aligned.

## Consequences

**Positive:**
- Smaller download, lower memory use, faster startup
- Cleaner security model for a local-first tool
- Rust backend provides a solid foundation for export and file operations
- Potential future: Tauri v2 supports iOS/Android from the same codebase

**Negative:**
- Team must learn or maintain Rust for the Tauri backend (likely minimal — project folder access, Pandoc invocation)
- Smaller ecosystem than Electron; fewer third-party integrations
- WebView differences across platforms may require testing (WebKit vs WebView2 vs WebKitGTK)

**Neutral:**
- Editor UI remains web-based (TipTap, HTML/CSS/JS); no change to the editor stack
- If Tauri proves insufficient, migration to Electron would require a new shell; editor code would remain unchanged

## Related

- [Solution Concept](../../strategic/solution-concept.md) — Phase 0 architecture; GUI layer specification
- [NOTES.md](../../../NOTES.md) — GUI framework was an open question; this ADR resolves it for desktop
- [ADR-0004](ADR-0004-tiptap-editor-framework.md) — TipTap for editor framework

---

*Previous: [ADR-0002](ADR-0002-docx-export-library-selection.md) · Next: [ADR-0004](ADR-0004-tiptap-editor-framework.md)*
