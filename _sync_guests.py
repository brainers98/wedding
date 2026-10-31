"""Sync guests-test.txt → guests.js + invite-links-test.txt (+ Apps Script list)

Source format (any of these):
  1. Mr. Udara Kavinda | C
  Mr. New Guest
  53. Mr. New Guest | _

No table yet → leave blank or use _  (goes under Unassigned)
"""
import re
from pathlib import Path

root = Path(__file__).resolve().parent
site = "https://udara75.github.io/wedding/"


def fix_title(name: str) -> str:
    name = re.sub(r"\s+", " ", name).strip()
    name = re.sub(r"^(Mr)\.?\s*&\s*(Mrs)\.?\s+", r"Mr. & Mrs. ", name, flags=re.I)
    name = re.sub(r"^(Dr)\.?\s+", r"Dr. ", name, flags=re.I)
    name = re.sub(r"^(Mr)\.?\s+", r"Mr. ", name, flags=re.I)
    name = re.sub(r"^(Miss)\.?\s+", r"Miss. ", name, flags=re.I)
    name = re.sub(r"^(Mrs)\.?\s+", r"Mrs. ", name, flags=re.I)
    name = re.sub(r"^dr\.", "Dr.", name, flags=re.I)
    name = re.sub(r"^mr\. & mrs\.", "Mr. & Mrs.", name, flags=re.I)
    name = re.sub(r"^mr\.", "Mr.", name, flags=re.I)
    name = re.sub(r"^miss\.", "Miss.", name, flags=re.I)
    name = re.sub(r"^mrs\.", "Mrs.", name, flags=re.I)
    return name


def to_id(n: str) -> str:
    n = re.sub(
        r"^(dr|mr\.?\s*&\s*mrs\.?|mr|mrs|miss|ms)\.?\s+",
        "",
        n,
        flags=re.I,
    )
    n = n.lower()
    return re.sub(r"[^a-z0-9]+", "-", n).strip("-")


def parse_table(raw: str):
    raw = (raw or "").strip()
    raw = re.sub(r"(?i)^table\s*", "", raw).strip()
    if not raw or raw in {"_", "-", "?", "tbd", "none", "null"}:
        return None
    code = raw.upper()
    if code in {"C", "S", "COUPLE"}:
        return "C"
    if code in {"R", "R1", "R2"}:
        return "R"
    u = re.match(r"^U(\d+)$", code)
    if u:
        return u.group(1)
    return code


def is_separator(line: str) -> bool:
    return bool(re.match(r"^-{3,}", line.strip()))


def parse_line(line: str):
    line = line.strip()
    if not line or line.startswith("#") or is_separator(line):
        return None

    table = None
    if "|" in line:
        name_part, table_part = line.split("|", 1)
        table = parse_table(table_part)
        name_part = name_part.strip()
    else:
        name_part = line

    name_part = re.sub(r"^\d+\.\s*", "", name_part).strip()
    if not name_part:
        return None

    return fix_title(name_part), table


def section_label(table):
    if table is None:
        return "Unassigned"
    if table == "C":
        return "Couple"
    if table == "R":
        return "Reserved"
    return f"Table {table}"


def table_group_key(table):
    """Sort groups: Couple, Reserved, numbered tables, then Unassigned last."""
    if table == "C":
        return (0, 0)
    if table == "R":
        return (1, 0)
    if table is None:
        return (9, 0)
    try:
        return (2, int(table))
    except (TypeError, ValueError):
        return (3, str(table))


lines = (root / "guests-test.txt").read_text(encoding="utf-8").splitlines()
guests = []
seen_ids = {}
seen_names = set()
for i, line in enumerate(lines):
    parsed = parse_line(line)
    if not parsed:
        continue
    name, table = parsed
    name_key = re.sub(r"\s+", " ", name).strip().lower()
    # Skip accidental duplicate paste of the same person
    if name_key in seen_names:
        continue
    seen_names.add(name_key)

    gid = to_id(name)
    if not gid:
        continue
    if gid in seen_ids:
        gid = f"{gid}-{i + 1}"
    seen_ids[gid] = True
    guests.append({"id": gid, "name": name, "table": table})

# Keep relative order within each table group; order groups sensibly
indexed = list(enumerate(guests))
indexed.sort(key=lambda it: (*table_group_key(it[1]["table"]), it[0]))
guests = [g for _, g in indexed]

# Rewrite guests-test.txt: numbered + section banners (Unassigned = no table yet)
out_lines = [
    "# Format: 1. Guest Name | TableCode",
    "# Codes: C = Couple, R = Reserved, 1–18 = guest tables",
    "# No table yet: omit | or use | _   (listed under Unassigned)",
    "# Save this file while watch-guests.py is running to auto-update guests.js",
    "",
]
_SENTINEL = object()
current_table = _SENTINEL
for i, g in enumerate(guests, 1):
    if g["table"] != current_table:
        if current_table is not _SENTINEL:
            out_lines.append("")
        out_lines.append(f"------------------ {section_label(g['table'])} ------------------")
        current_table = g["table"]
    if g["table"] is None:
        out_lines.append(f"{i}. {g['name']}")
    else:
        out_lines.append(f"{i}. {g['name']} | {g['table']}")
(root / "guests-test.txt").write_text("\n".join(out_lines) + "\n", encoding="utf-8")

guest_js_rows = []
for g in guests:
    table_js = "null" if g["table"] is None else f'"{g["table"]}"'
    guest_js_rows.append(
        f'  {{ id: "{g["id"]}", name: "{g["name"]}", table: {table_js} }}'
    )

(root / "guests.js").write_text(
    f"""// Guest personalization — use ?guest=id in the URL
// Example: index.html?guest=udara-kavinda
//
// Auto-generated from guests-test.txt — edit that file, then sync/watch.

const GUESTS = [
{",\n".join(guest_js_rows)},
];

const TABLE_LABELS = ["C", "R", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];

const SITE_URL = "{site}";

const RSVP_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx19BZ3IEICQu4u9wmkgE_7YI8p6kagOYgi2TDLtvFqMKT5UhayzkXrwdwz64gjp42_/exec";
""",
    encoding="utf-8",
)

link_lines = [
    "Personalized invitation links",
    "",
    "Base site:",
    site,
    "",
]
current_table = _SENTINEL
for i, g in enumerate(guests, 1):
    if g["table"] != current_table:
        if current_table is not _SENTINEL:
            link_lines.append("")
        link_lines.append(f"------------------ {section_label(g['table'])} ------------------")
        current_table = g["table"]
    table_txt = f" (Table {g['table']})" if g["table"] else " (table TBD)"
    link_lines.append(f"{i}. {g['name']}{table_txt}")
    link_lines.append(f"{site}?guest={g['id']}")
    link_lines.append("")
(root / "invite-links-test.txt").write_text("\n".join(link_lines), encoding="utf-8")

gs_path = root / "google-sheet-rsvp.gs"
if gs_path.exists():
    gs = gs_path.read_text(encoding="utf-8")
    invitees = ",\n".join(
        f'  {{ id: "{g["id"]}", name: "{g["name"]}" }}' for g in guests
    )
    new_block = f"const INVITEES = [\n{invitees},\n];"
    gs2 = re.sub(r"const INVITEES = \[[\s\S]*?\];", new_block, gs, count=1)
    gs_path.write_text(gs2, encoding="utf-8")

assigned = sum(1 for g in guests if g["table"] is not None)
print(f"Synced {len(guests)} guests ({assigned} with table, {len(guests) - assigned} unassigned)")
