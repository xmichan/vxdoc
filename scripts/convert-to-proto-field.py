#!/usr/bin/env python3
"""Convert proto field bullet lists to <ProtoField> MDX components."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "content" / "docs"

TYPED = re.compile(r"^- `([^`]+)` \(`([^`]+)`\): (.+)$")
TYPED_CN = re.compile(r"^- `([^`]+)` \(`([^`]+)`\)：(.+)$")
UNTYPED_CN = re.compile(r"^- `([^`]+)`：(.+)$")
UNTYPED_EN = re.compile(r"^- `([^`]+)`: (.+)$")
ENUM = re.compile(r"^- `([^`]+)`: `([^`]+)`$")
MULTI_UNTYPED_CN = re.compile(r"^- `[^`]+`(?:、`[^`]+`)+[：:]\s*(.+)$")
MULTI_UNTYPED_EN = re.compile(r"^- `[^`]+`(?:, `[^`]+`)+:\s*(.+)$")
CLI_FLAG = re.compile(r"^- (`--[^`]+`) \(default `([^`]+)`\): (.+)$")


def normalize_multi_name(line: str) -> str:
    return ", ".join(re.findall(r"`([^`]+)`", line))

SKIP_PREFIXES = (
    "- **",  # protocol index, set types, etc.
    "- [",  # link lists
)


def to_proto_field(name: str, type_: str | None, desc: str | None) -> str:
    lines: list[str] = []
    if type_:
        lines.append(f'<ProtoField name="{name}" type="{type_}">')
    else:
        lines.append(f'<ProtoField name="{name}">')

    if desc:
        lines.append("")
        lines.append(desc)
        lines.append("")

    lines.append("</ProtoField>")
    return "\n".join(lines)


def convert_line(line: str) -> str | None:
    if any(line.startswith(prefix) for prefix in SKIP_PREFIXES):
        return None

    match = TYPED.match(line) or TYPED_CN.match(line)
    if match:
        return to_proto_field(match.group(1), match.group(2), match.group(3))

    match = ENUM.match(line)
    if match:
        return to_proto_field(match.group(1), match.group(2), None)

    match = CLI_FLAG.match(line)
    if match:
        return to_proto_field(match.group(1), f"default {match.group(2)}", match.group(3))

    match = MULTI_UNTYPED_CN.match(line) or MULTI_UNTYPED_EN.match(line)
    if match:
        return to_proto_field(normalize_multi_name(line), None, match.group(1).strip())

    match = UNTYPED_CN.match(line)
    if match:
        return to_proto_field(match.group(1), None, match.group(2))

    match = UNTYPED_EN.match(line)
    if match:
        desc = match.group(2)
        if desc.startswith("`") and desc.endswith("`") and desc.count("`") == 2:
            return None
        return to_proto_field(match.group(1), None, desc)

    return None


def process_content(content: str) -> str:
    lines = content.splitlines()
    result: list[str] = []
    i = 0

    while i < len(lines):
        line = lines[i]
        converted = convert_line(line)

        if converted is not None:
            if result and result[-1] != "":
                result.append("")
            result.append(converted)
            if i + 1 < len(lines) and lines[i + 1].strip() != "":
                result.append("")
            i += 1
            continue

        result.append(line)
        i += 1

    return "\n".join(result) + ("\n" if content.endswith("\n") else "")


def add_inbound_anchors(content: str) -> str:
    content = content.replace(
        "### Security（`securityConfigs` 中的每一项）",
        '<h3 id="inbound-security">Security</h3>\n\n`securityConfigs` 中的每一项',
    )
    content = content.replace(
        "### Security (per entry in `securityConfigs`)",
        '<h3 id="inbound-security">Security</h3>\n\nPer entry in `securityConfigs`',
    )
    content = content.replace(
        "### 传输协议（`transportProtocols` 中的每一项）",
        '<h3 id="inbound-transport-protocol">传输协议</h3>\n\n`transportProtocols` 中的每一项',
    )
    content = content.replace(
        "### Transport protocol (per entry in `transportProtocols`)",
        '<h3 id="inbound-transport-protocol">Transport protocol</h3>\n\nPer entry in `transportProtocols`',
    )
    return content


def main() -> None:
    targets = list(ROOT.glob("*/vx-core/configuration/**/*.mdx"))
    changed = 0

    for path in sorted(targets):
        original = path.read_text(encoding="utf-8")
        updated = process_content(original)

        if path.name == "inbounds.mdx":
            updated = add_inbound_anchors(updated)

        if updated != original:
            path.write_text(updated, encoding="utf-8", newline="\n")
            changed += 1
            print(path.relative_to(ROOT.parent.parent))

    print(f"\nUpdated {changed} files")


if __name__ == "__main__":
    main()
