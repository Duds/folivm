#!/usr/bin/env python3
"""
Generate docs/governance/raid.md from docs/governance/raidd/*.yaml (RAIDD as code).
Usage (from repo root):
  python3 scripts/generate_raidd.py
  .venv/bin/python scripts/generate_raidd.py   # if using a venv
Requires: pip install -r scripts/requirements.txt (PyYAML).
"""
from pathlib import Path
import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent
RAIDD_DIR = REPO_ROOT / "docs" / "governance" / "raidd"
OUTPUT_FILE = REPO_ROOT / "docs" / "governance" / "raid.md"


def load_yaml(name: str) -> dict:
    path = RAIDD_DIR / f"{name}.yaml"
    with open(path, encoding="utf-8") as f:
        return yaml.safe_load(f)


def escape_cell(s) -> str:
    if s is None:
        return "—"
    return str(s).replace("|", "\\|").replace("\n", " ")


def table_row(cells: list) -> str:
    return "| " + " | ".join(escape_cell(c) for c in cells) + " |"


def main() -> None:
    meta = load_yaml("meta")
    risks = load_yaml("risks")["risks"]
    assumptions = load_yaml("assumptions")["assumptions"]
    issues = load_yaml("issues")["issues"]
    dependencies = load_yaml("dependencies")["dependencies"]
    decisions = load_yaml("decisions")["decisions"]

    lines = [
        "---",
        "title: " + meta["title"],
        "project: " + meta["project"],
        "status: " + meta["status"],
        "version: " + str(meta["version"]),
        "created: " + meta["created"],
        "updated: " + meta["updated"],
        "depends_on:",
    ]
    for d in meta["depends_on"]:
        lines.append("  - " + d)
    lines.extend(["---", "", "# " + meta["title"], ""])
    lines.append(
        "**Risks, Assumptions, Issues, Dependencies, and Decisions**"
    )
    lines.append("")
    lines.append(
        "This document is generated from `docs/governance/raidd/*.yaml` (RAIDD as code). "
        "Edit the YAML source and run `python scripts/generate_raidd.py` to regenerate. "
        "Be honest about likelihood and impact; avoid defaulting everything to \"medium\". "
        "Flag which assumptions are validated vs unvalidated."
    )
    lines.extend(["", "---", "", "## Risks", ""])
    lines.append(
        table_row(
            [
                "ID",
                "Risk",
                "Likelihood",
                "Impact",
                "Mitigation",
                "Owner",
                "Status",
                "Date Added",
            ]
        )
    )
    lines.append(
        table_row(
            [
                "----",
                "-----",
                "------------",
                "------",
                "-----------",
                "-----",
                "------",
                "-----------",
            ]
        )
    )
    for r in risks:
        lines.append(
            table_row(
                [
                    r["id"],
                    r["risk"],
                    r["likelihood"],
                    r["impact"],
                    r["mitigation"],
                    r["owner"],
                    r["status"],
                    r.get("date_added", ""),
                ]
            )
        )
    lines.extend(["", "---", "", "## Assumptions", ""])
    lines.append(
        table_row(
            [
                "ID",
                "Assumption",
                "Validated?",
                "Impact if False",
                "Owner",
                "Status",
                "Date Added",
            ]
        )
    )
    lines.append(
        table_row(
            [
                "----",
                "----------",
                "----------",
                "----------------",
                "-----",
                "------",
                "-----------",
            ]
        )
    )
    for a in assumptions:
        lines.append(
            table_row(
                [
                    a["id"],
                    a["assumption"],
                    a["validated"],
                    a["impact_if_false"],
                    a["owner"],
                    a["status"],
                    a.get("date_added", ""),
                ]
            )
        )
    lines.extend(["", "---", "", "## Issues", ""])
    lines.append(
        table_row(
            [
                "ID",
                "Issue",
                "Severity",
                "Impact",
                "Owner",
                "Status",
                "Date Added",
                "Resolution",
            ]
        )
    )
    lines.append(
        table_row(
            [
                "----",
                "-----",
                "--------",
                "------",
                "-----",
                "------",
                "-----------",
                "----------",
            ]
        )
    )
    for i in issues:
        lines.append(
            table_row(
                [
                    i["id"],
                    i["issue"],
                    i["severity"],
                    i["impact"],
                    i["owner"],
                    i["status"],
                    i.get("date_added", ""),
                    i.get("resolution") or "—",
                ]
            )
        )
    lines.extend(["", "---", "", "## Dependencies", ""])
    lines.append(
        table_row(
            [
                "ID",
                "Dependency",
                "Type",
                "Provider",
                "Impact if Delayed",
                "Owner",
                "Status",
                "Date Added",
            ]
        )
    )
    lines.append(
        table_row(
            [
                "----",
                "-----------",
                "----",
                "--------",
                "------------------",
                "-----",
                "------",
                "-----------",
            ]
        )
    )
    for d in dependencies:
        lines.append(
            table_row(
                [
                    d["id"],
                    d["dependency"],
                    d["type"],
                    d["provider"],
                    d["impact_if_delayed"],
                    d["owner"],
                    d["status"],
                    d.get("date_added", ""),
                ]
            )
        )
    lines.extend(["", "---", "", "## Decisions", ""])
    lines.append(
        table_row(
            [
                "ID",
                "Decision",
                "Rationale",
                "Alternatives Considered",
                "Impact",
                "Decision Maker",
                "Date Made",
                "Status",
            ]
        )
    )
    lines.append(
        table_row(
            [
                "--------",
                "--------",
                "---------",
                "------------------------",
                "------",
                "---------------",
                "----------",
                "------",
            ]
        )
    )
    for d in decisions:
        lines.append(
            table_row(
                [
                    d["id"],
                    d["decision"],
                    d["rationale"],
                    d["alternatives_considered"],
                    d["impact"],
                    d["decision_maker"],
                    d["date_made"],
                    d["status"],
                ]
            )
        )
    lines.extend(["", "---", "", "## Review Schedule", ""])
    lines.append("This RAIDD log should be reviewed:")
    lines.append("")
    for item in meta["review_schedule"]:
        lines.append("- " + item)
    lines.extend(["", "---", "", "## Change Log", ""])
    lines.append(table_row(["Date", "Change", "Changed By"]))
    lines.append(table_row(["------", "------", "-----------"]))
    for c in meta["changelog"]:
        lines.append(
            table_row([c["date"], c["change"], c["changed_by"]])
        )
    lines.extend(["", "---", ""])
    lines.append(
        "*" + meta["nav_previous"] + " · See also: " + meta["nav_next"] + "*"
    )
    lines.append("")

    OUTPUT_FILE.write_text("\n".join(lines), encoding="utf-8")
    print("Generated", OUTPUT_FILE)


if __name__ == "__main__":
    main()
