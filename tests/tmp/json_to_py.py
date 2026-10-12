# Convert live_row.json (wrangler --json output) into live_row.py for fixture use.
import json

data = json.load(open("live_row.json", encoding="utf-8"))
row = data[0]["results"][0]
with open("live_row.py", "w", encoding="utf-8") as f:
    f.write("# Auto-captured read-only from production on 2026-10-05. Fixture input only.\n")
    f.write("ID = 'blog-shredder-rental-vs-buy'\n")
    f.write(f"TITLE = {row['title']!r}\n")
    f.write(f"EXCERPT = {row['excerpt']!r}\n")
    f.write(f"CONTENT = {row['content']!r}\n")
    f.write(f"META_DESCRIPTION = {row['meta_description']!r}\n")
print("written", len(row["content"]), "chars")
