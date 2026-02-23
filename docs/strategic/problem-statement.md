---
title: Problem Statement
project: Folivm
status: draft
version: 0.3
created: 2026-02-19
updated: 2026-02-20
author: Dale Rogers
depends_on:
  - NOTES.md
---

# Problem Statement

## The Core Insight — A Forced Choice with No Good Option

The primary user is a technical consultant whose workflow is Markdown-native and LLM-native. They produce client deliverables — reports, advisory notes, proposals, statements of work. The pain is not that Word lacks semantic structure. The pain is that **they face an unpleasant choice**: write in Markdown (LLM-friendly, version-control friendly, but output looks unprofessional) or write in Word (client-ready output, but LLM-opaque and structurally fragile). There is no tool that serves both.

This is a personal, immediate problem. The consultant is the author; their own workflow breaks.

## Two Formats, Each Fails in a Different Direction

**Standard Markdown → flat output.** Markdown produces structurally flat documents. Headings exist, but callouts, executive summaries, captions, and semantic distinctions (e.g. "this is a recommendation" vs "this is background") are absent or implicit. Export via basic tooling yields raw academic notes, not polished client deliverables. No semantic vocabulary exists for professional document types.

**DOCX/PPTX → LLM-opaque.** Word and PowerPoint carry appearance, not meaning. LLMs cannot reliably infer structure. Round-tripping between Markdown (where the LLM works) and DOCX (where the client receives) requires manual post-styling every time. The consultant loses Markdown's benefits the moment they need client-grade output.

**So what:** The consultant cannot author once and deliver in both formats. Every export is a manual step; every handoff breaks the flow.

## The Current Workaround

The consultant writes in Markdown (often in VS Code), runs Pandoc manually, then post-styles in Word before delivery. This works technically — Pandoc produces reasonable output — but it is brittle, repetitive, and breaks flow. The print stylesheet is not under the author's control. The process does not scale.

## Why No Pandoc GUI Editor Exists

Pandoc supports extended Markdown: fenced divs for semantic blocks, YAML frontmatter, footnotes, citations, cross-references. It is the right conversion engine. No good GUI editor exists because of a historical user gap:

- **Technical users** who could build one didn't need it — they use VS Code + terminal pandoc and accept the friction.
- **Non-technical users** who needed professional Markdown output couldn't build it — they lacked the skills.

LLM-assisted consulting workflows have created a new user class: technically capable enough to want Markdown and LLM integration, but needing client-grade PDF output and a proper editing experience. This user class did not exist in meaningful numbers until recently. **The market gap is real and new.**

## Documents Live in Projects

Documents are not authored in isolation. They are produced within a project: interviews, meeting transcripts, research notes, ideation. The project is the unit of work; the document is the output. The LLM that assists with drafting needs access to that context — the brief, the transcripts, the constraints — not just the document being edited. A tool that treats documents as standalone files misses this. A tool that is project-aware, even in a simple form, aligns with how the work actually happens.

## Enterprise and Government (Secondary)

The same structural problems exist at organisational scale: Word's conflation of appearance with meaning, fragile brand compliance when formatting is applied at the character level. The market gap for a semantic, AI-native document platform is real. But for Folivm, **the primary problem is the consultant's personal workflow**. The enterprise platform vision is Phase 2. Solving the author's own problem first is the right sequencing.

## Problem Boundaries

**In scope:** Producing professional client deliverables (reports, proposals, advisory notes, SOWs) from Markdown-native authoring, with high-quality PDF and DOCX export, within a project context.

**Out of scope (initially):** Clause libraries, brand governance at organisational scale, multi-user collaboration, PPTX export, server-hosted deployment.

## Key Questions

1. Can a Pandoc Markdown GUI editor achieve professional PDF output without post-export touch?
2. What is the minimum Pandoc extended syntax (fenced divs, frontmatter, filters) required for client-grade documents?
3. How should the project folder schema (inputs, working, context, deliverables) shape the Phase 0 design?
4. Does solving the consultant's own problem validate a shareable tool (Phase 1) or product (Phase 2)?

## Open Questions

- See [Key Questions](#key-questions) above for validation items before this document is complete.
- Cross-reference: [NOTES.md](../../NOTES.md) open questions (branding, GUI framework, monetisation) remain upstream of problem validation.

---

*Previous: [README](../../README.md) · Next: [Solution Concept](solution-concept.md)*
