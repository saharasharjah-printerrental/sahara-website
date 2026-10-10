# Verify rollback: migration -> rollback restores the original row byte-exact;
# rollback is idempotent and a no-op when migration was never applied.
import sqlite3, os, importlib.util

ROOT = r"C:\Users\DK\Documents\GitHub\sahara-website"
DB = os.path.join(ROOT, "tests", "tmp", "028_fixture.db")
SLUG = "paper-shredder-rental-uae-when-it-beats-buying"

MIG = open(os.path.join(ROOT, "database", "migrations", "028_rental_pricing_october_2026.sql"), encoding="utf-8").read()
ROLLBACK = open(os.path.join(ROOT, "database", "migrations", "028_rental_pricing_october_2026.rollback.sql"), encoding="utf-8").read()
ORIGINAL = open(os.path.join(ROOT, "tests", "tmp", "028_original.txt"), encoding="utf-8", newline="").read()

spec = importlib.util.spec_from_file_location("live_row", os.path.join(ROOT, "tests", "tmp", "live_row.py"))
live = importlib.util.module_from_spec(spec); spec.loader.exec_module(live)

def fresh_db(path):
    if os.path.exists(path): os.remove(path)
    con = sqlite3.connect(path)
    con.execute("""CREATE TABLE blogs (id TEXT PRIMARY KEY, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL,
        excerpt TEXT DEFAULT '', content TEXT DEFAULT '', image TEXT DEFAULT '', author TEXT DEFAULT 'Sahara Printer',
        category TEXT DEFAULT '', isActive INTEGER DEFAULT 1, publishedAt TEXT, createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        meta_title TEXT DEFAULT '', meta_description TEXT DEFAULT '', meta_keywords TEXT DEFAULT '')""")
    return con

results = []

# Scenario 1: migrate then rollback -> byte-identical restore
con = fresh_db(DB + "1")
con.execute("INSERT INTO blogs (id,title,slug,excerpt,content,meta_description) VALUES (?,?,?,?,?,?)",
            ("1", live.TITLE, SLUG, live.EXCERPT, live.CONTENT, live.META_DESCRIPTION))
con.commit()
con.executescript(MIG); con.executescript(ROLLBACK)
row = con.execute("SELECT content, meta_description FROM blogs WHERE slug=?", (SLUG,)).fetchone()
results.append(("rollback restores content byte-exact", row[0] == ORIGINAL, f"len {len(row[0])} vs {len(ORIGINAL)}"))
results.append(("rollback restores meta_description to ''", row[1] == "", repr(row[1])))
# rollback again: idempotent
con.executescript(ROLLBACK)
row2 = con.execute("SELECT content, meta_description FROM blogs WHERE slug=?", (SLUG,)).fetchone()
results.append(("second rollback is a no-op", row2 == row, ""))

# Scenario 2: rollback alone on pristine row -> no-op, no errors
con = fresh_db(DB + "2")
con.execute("INSERT INTO blogs (id,title,slug,excerpt,content,meta_description) VALUES (?,?,?,?,?,?)",
            ("1", live.TITLE, SLUG, live.EXCERPT, live.CONTENT, live.META_DESCRIPTION))
con.commit()
try:
    con.executescript(ROLLBACK)
    err = None
except Exception as e:
    err = str(e)
row3 = con.execute("SELECT content, meta_description FROM blogs WHERE slug=?", (SLUG,)).fetchone()
results.append(("rollback-only on pristine row: no error", err is None, err or ""))
results.append(("rollback-only leaves pristine row unchanged", row3 == (live.CONTENT, live.META_DESCRIPTION), ""))

for name, ok, detail in results:
    print(("PASS" if ok else "FAIL"), "-", name, (":: " + detail if detail and not ok else ""))
raise SystemExit(0 if all(ok for _, ok, _ in results) else 1)
