---
title: US-092 — Compare versions
project: Folivm
status: draft
version: 0.1
created: 2026-02-23
epic: TBD
---

# US-092 — Compare versions

**As an** author,  
**I want to** compare versions of a document and see who changed what, when  
**so that** I can understand changes without needing to understand version control.

## Acceptance Criteria

- [ ] I can open a "Versions" or "Compare Versions" view from the left sidebar (Track changes icon)
- [ ] I see a version timeline: saved states with timestamps (and optionally author when collaborative)
- [ ] I can compare any two versions side-by-side with a visual diff
- [ ] AI-generated change summaries explain what changed in plain language (Phase 2)
- [ ] I can restore or merge from a previous version
- [ ] Branch/merge semantics stay hidden; product language is "Compare Versions", "Incorporate Comments", "Send for Review"

## Notes

- Per NOTES: "The branch/merge model is the right internal architecture; it does not surface to users as such. The product language is 'Send for Review' / 'Incorporate Comments' / 'Compare Versions.' Power users get access to a version timeline view (who changed what, when) but not to branch semantics directly."
- Per NOTES Tier 3: "version diff UI with AI-generated change summaries"
- Track changes icon in left sidebar activates this view.
- Implementation may use git under the hood; user never sees git concepts.
- Epic TBD — may be Phase 2 collaboration/versioning epic.

## Related

- [NOTES](../../NOTES.md) — Collaboration model UX, branch/merge stays hidden
- [Roadmap Phase 2](../../planning/roadmap.md) — Advanced collaboration

---

*Previous: [US-091](US-091-search-project-documents.md) · Next: TBD*
