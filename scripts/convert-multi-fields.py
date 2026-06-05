#!/usr/bin/env python3
"""Convert remaining multi-name field bullets to ProtoField."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "content" / "docs"

PATTERNS = [
    re.compile(r"^- `[^`]+`(?:、`[^`]+`)+[：:]\s*(.+)$"),
    re.compile(r"^- `[^`]+`(?:, `[^`]+`)+:\s*(.+)$"),
]


def normalize_multi_name(line: str) -> str:
    return ", ".join(re.findall(r"`([^`]+)`", line))


def to_proto_field(name: str, desc: str, type_: str | None = None) -> str:
    if type_:
        return f'<ProtoField name="{name}" type="{type_}">\n\n{desc}\n\n</ProtoField>'
    return f'<ProtoField name="{name}">\n\n{desc}\n\n</ProtoField>'


def convert_line(line: str) -> str | None:
    for pattern in PATTERNS:
        match = pattern.match(line)
        if not match:
            continue
        name = normalize_multi_name(line)
        desc = match.group(1).strip()
        type_match = re.fullmatch(r"`([^`]+)`\s*(.*)", desc)
        if type_match and type_match.group(2) in {"限制", "limits"}:
            return to_proto_field(name, type_match.group(2), type_match.group(1))
        return to_proto_field(name, desc)
    return None


def process_file(path: Path) -> bool:
    content = path.read_text(encoding="utf-8")
    lines = content.splitlines()
    result: list[str] = []
    changed = False

    for line in lines:
        converted = convert_line(line)
        if converted is not None:
            if result and result[-1] != "":
                result.append("")
            result.append(converted)
            result.append("")
            changed = True
            continue
        result.append(line)

    if changed:
        path.write_text("\n".join(result) + "\n", encoding="utf-8")
    return changed


def main() -> None:
    count = 0
    for path in sorted(ROOT.glob("*/vx-core/configuration/**/*.mdx")):
        if process_file(path):
            count += 1
            print(path.relative_to(ROOT.parent.parent))
    print(f"Updated {count} files")


if __name__ == "__main__":
    main()
