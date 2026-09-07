#!/usr/bin/env python3
"""
gsc_snapshot_score.py — score a GSC snapshot against the kill criteria in
docs/seo/scale-blueprint-2026-08.md §10.

Track D tooling: the blueprint's d14/d30/d60/d90 checks were never run
against any tracker artifact before this — see HANDOFF.md. This script
doesn't fetch GSC data itself (this project authenticates to GSC via the
gscServer MCP tool in-session, not a standalone script — see the note in
docs/seo/gsc-snapshots/README.md). It scores a snapshot JSON someone
already produced in that shape, so the kill-criteria check is a repeatable,
five-second command instead of a manual re-read of the blueprint each time.

Usage:
    python tests/scripts/gsc_snapshot_score.py docs/seo/gsc-snapshots/2026-09-07.json
    python tests/scripts/gsc_snapshot_score.py <snapshot.json> --json

Snapshot format: see docs/seo/gsc-snapshots/2026-09-07.json for a real
example and the required "kill_criteria_pages" block.
"""

import argparse
import json
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8")
except AttributeError:
    pass  # Python <3.7 or a stream that doesn't support reconfigure


def score(snapshot: dict) -> dict:
    kc = snapshot.get("kill_criteria_pages", {})
    results = []
    for key, data in kc.items():
        status = data.get("status", "UNKNOWN")
        results.append({"criterion": key, **data})

    passed = sum(1 for r in results if str(r["status"]).startswith("PASS"))
    failed = sum(1 for r in results if str(r["status"]).startswith("FAIL"))
    pending = len(results) - passed - failed

    return {
        "snapshot_date": snapshot.get("snapshot_date"),
        "summary": {"pass": passed, "fail": failed, "pending_or_not_due": pending, "total": len(results)},
        "results": results,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("snapshot", help="Path to a snapshot JSON file")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    with open(args.snapshot, encoding="utf-8") as f:
        snapshot = json.load(f)

    result = score(snapshot)

    if args.json:
        print(json.dumps(result, indent=2))
        return

    print(f"Kill-criteria scorecard — snapshot {result['snapshot_date']}")
    print(f"  PASS: {result['summary']['pass']}  FAIL: {result['summary']['fail']}  PENDING/NOT DUE: {result['summary']['pending_or_not_due']}")
    print()
    for r in result["results"]:
        marker = "PASS" if str(r["status"]).startswith("PASS") else ("FAIL" if str(r["status"]).startswith("FAIL") else "----")
        print(f"  [{marker:4s}] {r['criterion']:35s} {r['status']}")

    if result["summary"]["fail"] > 0:
        sys.exit(1)


if __name__ == "__main__":
    main()
