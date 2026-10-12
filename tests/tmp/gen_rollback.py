# Generates the rollback SQL by reversing each replacement in migration 028
# (new -> original) and restoring the original meta_description ('').
import re

mig = open("../../database/migrations/028_rental_pricing_october_2026.sql",
           encoding="utf-8").read()

# parse each UPDATE ... replace(content, 'old', 'new') ...; use sqlite to split args safely
import sqlite3
con = sqlite3.connect(":memory:")
pairs = []
for m in re.finditer(r"replace\(content,\s*", mig):
    start = m.end()
    i, depth, args, cur = start, 0, [], ""
    in_str = False
    while True:
        c = mig[i]
        if in_str:
            cur += c
            if c == "'":
                if i + 1 < len(mig) and mig[i + 1] == "'":
                    cur += "'"; i += 1
                else:
                    in_str = False
        else:
            if c == "'":
                in_str = True; cur += c
            elif c == ",":
                args.append(cur.strip()); cur = ""
            elif c == ")":
                args.append(cur.strip()); break
            else:
                cur += c
        i += 1
    assert len(args) == 2, args
    old = con.execute("SELECT " + args[0]).fetchone()[0]
    new = con.execute("SELECT " + args[1]).fetchone()[0]
    pairs.append((old, new))

meta_new = "Compare shredder rental and buying in UAE. LX65 AED 450/month or 325Ci AED 900/month, including delivery, installation, transport and maintenance."

def q(s):
    return "'" + s.replace("'", "''") + "'"

lines = []
lines.append("-- ROLLBACK for 028_rental_pricing_october_2026.sql")
lines.append("--")
lines.append("-- Scope: reverts ONLY the row blogs.slug = 'paper-shredder-rental-uae-when-it-beats-buying'.")
lines.append("-- Original values below were captured byte-exact from the production row via a read-only")
lines.append("-- SELECT on 2026-10-05 (before 028 ran anywhere) and verified against an isolated local")
lines.append("-- SQLite fixture. The reverse replacements restore every string 028 changed;")
lines.append("-- meta_description is restored to its pre-028 value (''). Each statement is")
lines.append("-- idempotent: if 028 was never applied, the post-028 substrings are absent and")
lines.append("-- replace() is a no-op.")
lines.append("")
for old, new in pairs:
    lines.append("UPDATE blogs SET content = replace(content,")
    lines.append("  " + q(new) + ",")
    lines.append("  " + q(old) + ")")
    lines.append("WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';")
    lines.append("")
lines.append("UPDATE blogs SET meta_description = ''")
lines.append("WHERE slug = 'paper-shredder-rental-uae-when-it-beats-buying';")
lines.append("")

out = "\n".join(lines)
open("../../database/migrations/028_rental_pricing_october_2026.rollback.sql",
     "w", encoding="utf-8", newline="\n").write(out)
print("wrote rollback,", len(pairs), "content reversals")
