"""Sync guests-test.txt → guests.js, invite-links-test.txt, google-sheet-rsvp.gs

Format:
  1. Mr. Udara Kavinda | C
  3. Mr. Isuru Jayashankha | 5

Codes: C = Couple, R = Reserved, 1–18 = guest tables
"""
import re
from pathlib import Path

root = Path(__file__).resolve().parent
site = "https://udara75.github.io/wedding/"


def fix_title(name: str) -> str:
    name = re.sub(r"\s+", " ", name).strip()
    name = re.sub(r"^(Mr)\.?\s*&\s*(Mrs)\.?\s+", r"Mr. & Mrs. ", name, flags=re.I)
    name = re.sub(r"^(Mr)\.?\s+", r"Mr. ", name, flags=re.I)
    name = re.sub(r"^(Miss)\.?\s+", r"Miss. ", name, flags=re.I)
    name = re.sub(r"^(Mrs)\.?\s+", r"Mrs. ", name, flags=re.I)
    name = re.sub(r"^mr\. & mrs\.", "Mr. & Mrs.", name, flags=re.I)
    name = re.sub(r"^mr\.", "Mr.", name, flags=re.I)
    name = re.sub(r"^miss\.", "Miss.", name, flags=re.I)
    name = re.sub(r"^mrs\.", "Mrs.", name, flags=re.I)
    return name


def to_id(n: str) -> str:
    n = re.sub(r"^(mr\.?\s*&\s*mrs\.?|mr|mrs|miss|ms)\.?\s+", "", n, flags=re.I)
    n = n.lower()
    return re.sub(r"[^a-z0-9]+", "-", n).strip("-")


def parse_table(raw: str):
    raw = raw.strip()
    raw = re.sub(r"(?i)^table\s*", "", raw).strip()
    if not raw or raw in {"_", "-", "?", "tbd"}:
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


def parse_line(line: str):
    line = line.strip()
    if not line or line.startswith("#"):
        return None
    line = re.sub(r"^\d+\.\s*", "", line)
    table = None
    if "|" in line:
        name_part, table_part = line.split("|", 1)
        name = fix_title(name_part)
        table = parse_table(table_part)
    else:
        name = fix_title(line)
    return name, table


lines = (root / "guests-test.txt").read_text(encoding="utf-8").splitlines()
guests = []
seen = {}
for i, line in enumerate(lines):
    parsed = parse_line(line)
    if not parsed:
        continue
    name, table = parsed
    gid = to_id(name)
    if gid in seen:
        gid = f"{gid}-{i + 1}"
    seen[gid] = True
    guests.append({"id": gid, "name": name, "table": table})

out_lines = [
    "# Format: 1. Guest Name | TableCode",
    "# Codes: C = Couple, R = Reserved, 1–18 = guest tables",
    "# After editing, ask Cursor to sync.",
    "",
]
for i, g in enumerate(guests, 1):
    table_txt = g["table"] if g["table"] is not None else "_"
    out_lines.append(f"{i}. {g['name']} | {table_txt}")
(root / "guests-test.txt").write_text("\n".join(out_lines) + "\n", encoding="utf-8")

guest_js_rows = []
for g in guests:
    if g["table"] is None:
        table_js = "null"
    else:
        table_js = f'"{g["table"]}"'
    guest_js_rows.append(
        f'  {{ id: "{g["id"]}", name: "{g["name"]}", table: {table_js} }}'
    )

(root / "guests.js").write_text(
    f"""// Guest personalization — use ?guest=id in the URL
// Example: index.html?guest=udara-kavinda
//
// Keep in sync with guests-test.txt
// Codes: C = Couple, R = Reserved, 1–18 = guest tables

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
for i, g in enumerate(guests, 1):
    table_txt = f" (Table {g['table']})" if g["table"] else ""
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

print(f"Synced {len(guests)} guests")
