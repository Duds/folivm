# Ship and Document

## Overview

Use best practices to update documentation, execution artefacts, commit, push, and summarise recent changes. This command drives a complete "ship" workflow: keep docs aligned with implementation, then commit and push.

## Objective

1. Update roadmap, backlog, epics (EP), stories (US), and TODO from current session work.
2. Update docs (help, architecture, README, manuals, playbooks) if the changes warrant it.
3. Commit with a descriptive message.
4. Push to remote.
5. Explain the most recent changes to the user.

---

## Instructions

### 1. Identify Recent Changes

Infer from conversation context or `git status` what was done this session:

- New features or fixes
- UI/UX changes
- Bug fixes
- Documentation edits
- Config or tooling changes

### 2. Update Execution Artefacts (if work was implementation)

Apply [@backlog-management](.cursor/rules/backlog-management.mdc):

| Artefact | Path | Action |
|----------|------|--------|
| Roadmap | `docs/planning/roadmap.md` | Update Phase 0 progress if epics/stories completed; refresh dates in frontmatter |
| Backlog | `docs/execution/backlog.md` | Update epic/story status; add new EP/US if created |
| Epics | `docs/execution/epics/EP-NNN-*.md` | Set `status: done` when complete; update acceptance criteria if needed |
| Stories | `docs/execution/stories/US-NNN-*.md` | Set `status: done`; tick acceptance criteria |

Use Australian English and ISO dates (YYYY-MM-DD) in frontmatter per [@australian-standards](.cursor/rules/australian-standards.mdc) and [@frontmatter](.cursor/rules/frontmatter.mdc).

### 3. Update Supporting Docs (if relevant)

- **README** — Project status, quick nav, or feature list if changed
- **Architecture (HLA, FRS, ADRs)** — When architecture or requirements changed
- **Help / manuals / playbooks** — If such docs exist and content is affected

Do not create new help/manual/playbook docs unless the user requested them. Update only when changes touch existing content.

### 4. Update TODO.md

- Tick completed items
- Add or remove items so TODO reflects current reality
- Keep structure aligned with Phase 0 and backlog

### 5. Write Commit Description

Use semantic commit style:

```
<type>(<scope>): <short summary>

<optional body>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Example:**

```
fix(search): use camelCase for Tauri search_project invoke

- caseSensitive, includeGlob, excludeGlob for Tauri v2 API
- Constrain search input width in sidebar
- Refine search panel spacing and input styling
```

### 6. Commit

Stage changed files and commit with the description. Use `git add` for modified files; avoid adding unrelated or generated files.

### 7. Push to Remote

Run `git push` (or `git push origin <branch>` if needed). Request `network` permission if required.

### 8. Summarise for User

Provide a short summary of:

- What was committed
- Which docs were updated
- How the roadmap/backlog/TODO reflect the work
- Any follow-up considerations (e.g. new stories, open questions)

---

## Project Rules to Apply

- [@backlog-management](.cursor/rules/backlog-management.mdc) — Epic/story structure, backlog index, lifecycle
- [@frontmatter](.cursor/rules/frontmatter.mdc) — YAML frontmatter, status values
- [@markdown-links](.cursor/rules/markdown-links.mdc) — Internal link format
- [@australian-standards](.cursor/rules/australian-standards.mdc) — Spelling, dates, units

---

## Key Paths

| Area | Path |
|------|------|
| Roadmap | `docs/planning/roadmap.md` |
| Backlog | `docs/execution/backlog.md` |
| Epics | `docs/execution/epics/` |
| Stories | `docs/execution/stories/` |
| TODO | `TODO.md` |
| README | `README.md` |
| HLA | `docs/architectural/hla.md` |
| FRS | `docs/architectural/frs.md` |
| ADRs | `docs/architectural/adrs/` |
| Format | `docs/format/README.md` |

---

## Output

- Updated roadmap, backlog, EP/US, TODO (as applicable)
- Updated README/architecture/help (only when changes warrant)
- Git commit with descriptive message
- Git push to remote
- Clear summary for the user
