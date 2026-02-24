---
title: EP-114 — Document layout: ruler, margins, tabs
project: Folivm
status: done
version: 0.1
created: 2026-02-24
updated: 2026-02-24
depends_on:
  - docs/execution/epics/EP-008-ui-scaffold.md
---

# EP-114 — Document layout: ruler, margins, tabs

## Outcome

The author sees a horizontal ruler above the document canvas showing scale and margin indicators. Ruler units (mm, cm, inch) are configurable in Settings; default is millimetres per Australian conventions. Phase 1: ruler as visual aid (no drag interaction).

## Rationale

A ruler helps authors visualise document layout and margins. Configurable units support international workflows. Full drag-to-adjust and tab-stop editing can follow in a later phase.

## Acceptance Criteria

- Horizontal ruler above the document when a document is open
- Ruler displays scale in selected units (mm, cm, inch)
- Ruler shows margin indicators (left and right)
- Ruler units configurable in Settings dropdown; default mm
- Ruler hidden in Preview and Outline views

## Technical Notes

- Ruler uses ResizeObserver to match editor width
- Units stored in localStorage; 96 DPI for pixel conversions
- Margin values (e.g. 25mm) used for visual indicators; future: read from frontmatter

## Stories

- US-116: Ruler above document canvas
- US-117: Document margins and tab stops configuration (future phase)

## Related

- [EP-008](EP-008-ui-scaffold.md) — UI scaffold
