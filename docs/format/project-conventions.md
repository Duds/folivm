---
title: Folivm Project Folder Conventions
project: Folivm
status: draft
version: 0.1
created: 2026-02-20
---

# Folivm Project Folder Conventions

Folivm organises work within a **project folder** with a standard schema. Documents are authored in project context; the LLM receives access to project files when assisting.

**Baseline:** A project is a folder on the filesystem. Folivm uses a fixed schema by default.

---

## Standard Folder Schema

| Folder | Purpose |
|--------|---------|
| `inputs/` | Source material: transcripts, research, reference documents |
| `working/` | Drafts in progress, rough notes |
| `context/` | Brief, constraints, project parameters |
| `deliverables/` | Final documents ready for export and delivery |

---

## Document Location

- Documents in `working/` are drafts.
- Documents in `deliverables/` are final and exported from there.
- Folivm lists `.md` and `.markdown` files from both folders.

---

## Project Root Files

| File | Purpose |
|------|---------|
| `print.css` | Optional. Print stylesheet for PDF export. Created automatically on project creation. |
| `Folivm.yaml` | Optional. Project config: reference DOCX template, LLM provider settings. |

### Folivm.yaml — LLM configuration

Stored in the project root. Example:

```yaml
llm:
  provider: openai   # or anthropic
  api_key: sk-...
  model: gpt-4o-mini # or claude-sonnet-4-20250514
reference_docx: /path/to/template.docx
```

- **provider:** `openai` or `anthropic`
- **api_key:** Your API key (bring-your-own-key). Stored in project; consider adding Folivm.yaml to .gitignore for keys.
- **model:** Model name (e.g. `gpt-4o-mini`, `claude-sonnet-4-20250514`)

---

## Creating a Valid Project

1. Create a folder for the project.
2. Create subfolders: `inputs/`, `working/`, `context/`, `deliverables/`.
3. Add a brief or constraints to `context/`.
4. Add source material to `inputs/`.
5. Create or move documents to `working/` or `deliverables/`.

Folivm's "Create New Project" action creates this structure automatically.

---

## Versioning

This convention is version 0.1. Phase 1 will add user-defined and templated conventions.

---

*Part of [Folivm Format Specification](README.md)*
