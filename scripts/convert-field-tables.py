#!/usr/bin/env python3
"""Convert markdown field tables in MDX files to bullet lists."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "content" / "docs"


def parse_row(line: str) -> list[str] | None:
    line = line.strip()
    if not line.startswith("|"):
        return None
    return [cell.strip() for cell in line.strip("|").split("|")]


def is_separator(cells: list[str]) -> bool:
    return all(re.fullmatch(r":?-{3,}:?", cell.replace(" ", "")) for cell in cells)


def format_field(value: str) -> str:
    value = value.strip()
    if not value:
        return value
    if value.startswith("`") or value.startswith("**") or value.startswith("@"):
        return f"`{value}`" if value.startswith("@") else value
    return f"`{value}`"


def format_type(value: str) -> str:
    value = value.strip()
    if value.startswith("`"):
        return value
    return f"`{value}`"


def convert_table(header: list[str], rows: list[list[str]]) -> list[str]:
    n = len(header)
    bullets: list[str] = []
    h0 = header[0].lower()
    h1 = header[1].lower() if n > 1 else ""
    h2 = header[2].lower() if n > 2 else ""

    for row in rows:
        if len(row) != n:
            continue

        if n == 2:
            c0, c1 = row
            bullets.append(f"- {format_field(c0)}: {c1}")
            continue

        if n == 3:
            c0, c1, c2 = row

            if h0 in {"值", "value"} and h1 in {"名称", "name"}:
                bullets.append(f"- {format_field(c0)}: {format_type(c1)}")
            elif h0 in {"标志", "flag"} and "默认" in h1 or "default" in h1:
                bullets.append(f"- {format_field(c0)} (default {format_type(c1)}): {c2}")
            elif h0 in {"类型", "type"} and h1 in {"消息", "message"}:
                bullets.append(f"- {format_field(c0)} ({format_type(c1)}): {c2}")
            elif h0 in {"协议", "protocol"} and h1 in {"服务端", "server"}:
                if c1.strip() in {"—", "-", "–"}:
                    bullets.append(f"- **{c0}** — Client: {format_type(c2)}")
                else:
                    bullets.append(
                        f"- **{c0}** — Server: {format_type(c1)}, Client: {format_type(c2)}"
                    )
            elif h0 in {"类型", "type"} and h1 in {"包含", "contains"}:
                bullets.append(f"- **{c0}** ({c1}): {c2}")
            elif h0 in {"@type"} or c0.startswith("vx."):
                bullets.append(f"- {format_field(c0)}: {c1}")
            else:
                bullets.append(f"- {format_field(c0)} ({format_type(c1)}): {c2}")
            continue

        bullets.append("- " + " — ".join(row))

    return bullets


def process_content(content: str) -> str:
    lines = content.splitlines()
    result: list[str] = []
    i = 0

    while i < len(lines):
        header = parse_row(lines[i])
        if header is not None and i + 1 < len(lines):
            separator = parse_row(lines[i + 1])
            if separator and is_separator(separator):
                rows: list[list[str]] = []
                j = i + 2
                while j < len(lines):
                    row = parse_row(lines[j])
                    if row is None:
                        break
                    rows.append(row)
                    j += 1

                bullets = convert_table(header, rows)
                if bullets:
                    if result and result[-1] != "":
                        result.append("")
                    result.extend(bullets)
                    if j < len(lines) and lines[j].strip() != "":
                        result.append("")
                    i = j
                    continue

        result.append(lines[i])
        i += 1

    return "\n".join(result) + ("\n" if content.endswith("\n") else "")


def main() -> None:
    changed = 0
    for path in sorted(ROOT.rglob("*.mdx")):
        original = path.read_text(encoding="utf-8")
        updated = process_content(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8", newline="\n")
            changed += 1
            print(path.relative_to(ROOT.parent.parent))

    print(f"\nUpdated {changed} files")


if __name__ == "__main__":
    main()
