---
title: US-084 — Promote or demote heading levels
project: Folivm
status: backlog
version: 0.1
created: 2026-02-23
epic: EP-108
---

# US-084 — Promote or demote heading levels

**As an** author,  
**I want to** promote or demote heading levels in structural mode  
**so that** I can adjust the hierarchy without editing prose.

## Acceptance Criteria

- [ ] I can promote a heading (e.g. H2 → H1) via toolbar, context menu, or keyboard shortcut
- [ ] I can demote a heading (e.g. H2 → H3) via toolbar, context menu, or keyboard shortcut
- [ ] Promote/demote updates the underlying Markdown (# vs ## vs ### vs ####)
- [ ] Promote/demote of a heading with children: children are adjusted to maintain valid hierarchy (e.g. demote H2→H3, children H3→H4) or implementation defines the rule
- [ ] H1 cannot be promoted further; H4 (or max level) cannot be demoted further
- [ ] Undo restores the previous heading levels

## Epic

[EP-108 Structural (Outline) Mode](../epics/EP-108-structural-outline-mode.md)

---

*Previous: [US-083](US-083-reorder-sections-drag.md) · Next: [US-085](US-085-switch-back-preserves-changes.md)*
