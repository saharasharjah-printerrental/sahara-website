# Local fixture validation for migration 028. Creates an isolated SQLite DB
# in /tmp (gitignored area), inserts a replica of the live article row,
# applies migration 028 twice, and verifies idempotency + scoping.
import sqlite3, sys, os

ROOT = r"C:\Users\DK\Documents\GitHub\sahara-website"
DB = os.path.join(ROOT, "tests", "tmp", "028_fixture.db")
SLUG = "paper-shredder-rental-uae-when-it-beats-buying"

MIGRATION = open(os.path.join(ROOT, "database", "migrations",
    "028_rental_pricing_october_2026.sql"), encoding="utf-8").read()

# Load live row captured via read-only wrangler SELECT on 2026-10-05.
# Stored in a separate file to keep this script readable.
import importlib.util
spec = importlib.util.spec_from_file_location(
    "live_row", os.path.join(ROOT, "tests", "tmp", "live_row.py"))
live = importlib.util.module_from_spec(spec)
spec.loader.exec_module(live)

if os.path.exists(DB):
    os.remove(DB)
con = sqlite3.connect(DB)
cur = con.cursor()
cur.execute("""CREATE TABLE blogs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  image TEXT DEFAULT '',
  author TEXT DEFAULT 'Sahara Printer',
  category TEXT DEFAULT '',
  isActive INTEGER DEFAULT 1,
  publishedAt TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  meta_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  meta_keywords TEXT DEFAULT ''
)""")
# also a decoy row to prove scoping
cur.execute("INSERT INTO blogs (id, title, slug, content, meta_description) VALUES ('decoy', 'Decoy', 'decoy-slug', 'AED 150 stays here', 'decoy meta')")
cur.execute("INSERT INTO blogs (id, title, slug, excerpt, content, meta_description) VALUES (?, ?, ?, ?, ?, ?)",
    (live.ID, live.TITLE, SLUG, live.EXCERPT, live.CONTENT, live.META_DESCRIPTION))
con.commit()

orig = cur.execute("SELECT content, meta_description FROM blogs WHERE slug=?", (SLUG,)).fetchone()
# save original for rollback construction
open(os.path.join(ROOT, "tests", "tmp", "028_original.txt"), "w", encoding="utf-8", newline="").write(orig[0])

checks = []

def run_migration():
    try:
        cur.executescript(MIGRATION)
        con.commit()
        return None
    except Exception as e:
        return str(e)

err1 = run_migration()
checks.append(("migration applies without error (run 1)", err1 is None, err1 or ""))
after1 = cur.execute("SELECT content, meta_description FROM blogs WHERE slug=?", (SLUG,)).fetchone()

# intended replacements landed
must_land = [
    "Paper shredder rental in Dubai costs AED 450/month for the smaller Fellowes Powershred LX65 or AED 900/month for the larger 325Ci.",
    "Rent shredder: LX65 AED 450/month or 325Ci AED 900/month; request a quote for shorter terms",
    "Compare the total cost for your required rental duration with the purchase price and maintenance costs.",
    "LX65: 450/month; 325Ci: 900/month",
    "2,700 (LX65) or 5,400 (325Ci), based on six total rental months",
    "The LX65 is AED 450/month and the 325Ci is AED 900/month across Dubai, Sharjah and Abu Dhabi",
    '<a href="/quote/paper-shredder-rental/">Get a Shredder Rental Quote</a>',
    "Compare shredder rental and buying in UAE. LX65 AED 450/month or 325Ci AED 900/month",
]
missing = [s for s in must_land if s not in after1[0] and s not in after1[1]]
checks.append(("(a) all intended replacements landed", not missing, f"missing: {missing}" if missing else ""))

# old strings gone
old_strings = [
    "Paper shredder rental in Dubai starts from AED 150",
    "Rent shredder (2-week contract): AED 300–600 all-inclusive",
    "Winner: Rental — saves AED 1,200–2,400 per year.",
    "From 150, customised to your contract term",
    "Typically 900–2,400",
    "All available for delivery and setup across Dubai, Sharjah, and Abu Dhabi from AED 150",
    '<a href="/rental-calculator/">Get a Free Quote</a>',
]
leftover = [s for s in old_strings if s in after1[0]]
checks.append(("(d) obsolete rent-versus-buy claims removed", not leftover, f"leftover: {leftover}" if leftover else ""))

# idempotency
err2 = run_migration()
after2 = cur.execute("SELECT content, meta_description FROM blogs WHERE slug=?", (SLUG,)).fetchone()
checks.append(("(b) run 2: no error", err2 is None, err2 or ""))
checks.append(("(b) run 2: content byte-identical to run 1", after1 == after2, "" if after1 == after2 else "content changed on re-run"))

# unrelated content preserved (prefix/suffix chunks untouched by migration)
head_ok = after1[0][:200] == orig[0][:200]
# unrelated paragraphs still present
unrelated = [
    "UAE Federal Law No. 45 of 2021 on Personal Data Protection",
    "DIN P-4 (cross-cut) is sufficient",
    "Same-day delivery available in Dubai and Sharjah",
    "3-year total (continuous use)</td><td>3,600–7,400",  # buy-side prices untouched
    "A comparable office shredder costs AED 800–3,000 to buy.",
]
gone = [s for s in unrelated if s not in after1[0]]
checks.append(("(c) unrelated copy + buy-side prices preserved", head_ok and not gone, f"missing: {gone}, head_ok={head_ok}" if gone or not head_ok else ""))

# decoy row untouched
decoy = cur.execute("SELECT content FROM blogs WHERE slug='decoy-slug'").fetchone()[0]
checks.append(("(scope) decoy row untouched", decoy == "AED 150 stays here", decoy))

for name, ok, detail in checks:
    print(("PASS" if ok else "FAIL"), "-", name, (":: " + detail if detail and not ok else ""))

con.close()
sys.exit(0 if all(ok for _, ok, _ in checks) else 1)
