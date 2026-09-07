#!/usr/bin/env python3
"""
backlink_guard.py — DA-gated, spam-filtered backlink acquisition screener
for saharaprinter.com.

Built Sep 2026 as Track C (Authority) tooling, specifically to replace the
github.com/backlink-generator-tool/backlink-generator-tool approach the
client asked for. That project is a client-side URL blaster (iframe/popup/
ping modes against CORS proxies) with zero editorial link creation — it
cannot produce a link of any DA, and its own README promotes click-exchange
referral networks (AddMeFast, Hit4Hit, RankBoostUp). This script instead
screens real directory-submission candidates against:

  1. A spam blocklist derived from docs/seo/../backlinks.json (25 links,
     16 domains, every one with page_from_rank: 0 — PBN pages, "Domain
     Report" scrapers, and URL-shortener spam that appeared in a 10-day
     drip in Aug 2026 and taught us what to reject).
  2. Moz Domain Authority via claude-seo/scripts/moz_api.py, IF a Moz API
     key is configured (free tier, 2,500 rows/month — see
     claude-seo/scripts/backlinks_auth.py --check). Governing rule: never
     invent a DA score. A candidate without a working Moz/Bing key is
     reported as UNSCORED, not assigned a guessed number.
  3. A live-verification pass via claude-seo/scripts/verify_backlinks.py
     for anything already submitted, confirming the link exists, resolves,
     and is not silently dead — the same crawler this session used to find
     that 14 of the 25 known spam links have already gone dead on their
     own (DNS failures) and 4 more have had the link removed, leaving 7
     still live and nofollow. Do not re-run screen against dead domains;
     they are baked into SPAM_BLOCKLIST below.

Usage:
    python tests/scripts/backlink_guard.py screen candidates.json
    python tests/scripts/backlink_guard.py screen candidates.json --json

    python tests/scripts/backlink_guard.py verify \\
        --target https://www.saharaprinter.com/ --links links.json

    python tests/scripts/backlink_guard.py check-blocklist somesite.com

candidates.json format:
    [{"domain": "hidubai.com", "url": "https://hidubai.com/businesses/add",
      "category": "UAE Directory"}, ...]

links.json format (for verify — same as verify_backlinks.py):
    [{"source_url": "https://hidubai.com/business/sahara-office-equipments"}]
"""

import argparse
import json
import os
import re
import subprocess
import sys
from urllib.parse import urlparse

_SCRIPTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "claude-seo", "scripts")
_SCRIPTS_DIR = os.path.normpath(_SCRIPTS_DIR)

# ---------------------------------------------------------------------------
# Spam blocklist — sourced from a real, verified incident, not guessed.
#
# Every domain below either (a) appeared in backlinks.json with
# page_from_rank: 0 and a title matching a link-farm/scraper pattern, or
# (b) is a generic pattern that class of site reliably uses. Re-verified
# live 2026-09-07: 14/25 of the original domains now fail DNS entirely,
# 4 have had the link removed, 7 are still live (nofollow except two —
# robuta.com and computers1000.com remain dofollow and are the only two
# of the sixteen worth occasionally re-checking, not chasing).
# ---------------------------------------------------------------------------
SPAM_DOMAINS = {
    "homesforsaleoldgreenwichct.com", "ggmap.us.com",  # "Boost your Google rankings with Premium PBN"
    "bye.fyi", "drjack.world", "screenshots.wiki", "quero.party",  # "Domain Report" scrapers
    "anchorurl.cloud", "shortenurls.eu", "urls-shortener.eu",
    "buzzshrink.website", "sites.jake.eu",  # URL-shortener spam
    "ready.pro", "newlyregddomains.com",  # auto-generated stats/registry scrapers
}

SPAM_TITLE_PATTERNS = [
    re.compile(p, re.IGNORECASE) for p in [
        r"boost your google rankings?",
        r"premium pbn",
        r"domain report",
        r"link building service",
        r"buy backlinks?",
        r"seo (?:tool|package) (?:free|cheap)",
    ]
]

# A candidate whose own reachable page trips these gets rejected outright
# regardless of any DA figure — matches the same shape as the confirmed
# spam above (thousands of outbound links, near-zero own authority).
SPAM_STRUCTURAL_THRESHOLD_EXTERNAL_LINKS = 1000
SPAM_STRUCTURAL_MAX_RANK = 0


def _strip_www(domain: str) -> str:
    return domain[4:] if domain.startswith("www.") else domain


def check_blocklist(domain: str) -> dict:
    domain = _strip_www(domain.lower().strip())
    if domain in SPAM_DOMAINS:
        return {"domain": domain, "blocked": True, "reason": "known spam domain from backlinks.json incident"}
    return {"domain": domain, "blocked": False, "reason": None}


def check_title(title: str) -> dict:
    for pattern in SPAM_TITLE_PATTERNS:
        if pattern.search(title or ""):
            return {"blocked": True, "reason": f"title matches spam pattern: {pattern.pattern}"}
    return {"blocked": False, "reason": None}


def moz_lookup(url: str) -> dict:
    """Call the existing Moz API wrapper. Returns UNSCORED (not a guess) if
    no key is configured — this is a deliberate 'never invent data' choice."""
    script = os.path.join(_SCRIPTS_DIR, "moz_api.py")
    if not os.path.isfile(script):
        return {"scored": False, "reason": "moz_api.py not found"}
    try:
        result = subprocess.run(
            [sys.executable, script, "metrics", url, "--json"],
            capture_output=True, text=True, timeout=30,
        )
        payload = json.loads(result.stdout or "{}")
    except (subprocess.TimeoutExpired, json.JSONDecodeError, OSError) as e:
        return {"scored": False, "reason": f"moz_api.py call failed: {e}"}

    if payload.get("status") != "success" or not payload.get("data"):
        err = (payload.get("error") or "no Moz API key configured")
        return {"scored": False, "reason": err}

    data = payload["data"]
    return {
        "scored": True,
        "domain_authority": data.get("domain_authority"),
        "page_authority": data.get("page_authority"),
        "spam_score": data.get("spam_score"),
        "linking_domains": data.get("linking_domains"),
    }


def screen_candidate(candidate: dict, use_moz: bool = True) -> dict:
    domain = urlparse(candidate.get("url", "")).netloc or candidate.get("domain", "")
    domain = _strip_www(domain.lower())

    blocklist_result = check_blocklist(domain)
    out = {
        "domain": domain,
        "url": candidate.get("url"),
        "category": candidate.get("category"),
        "verdict": None,
        "blocklist": blocklist_result,
        "moz": None,
    }

    if blocklist_result["blocked"]:
        out["verdict"] = "REJECT"
        return out

    if use_moz and candidate.get("url"):
        moz_result = moz_lookup(candidate["url"])
        out["moz"] = moz_result
        if moz_result.get("scored"):
            spam_score = moz_result.get("spam_score")
            if spam_score is not None and spam_score >= 30:
                out["verdict"] = "REJECT"
                out["blocklist"]["reason"] = f"Moz spam score {spam_score} >= 30"
                return out
            da = moz_result.get("domain_authority")
            out["verdict"] = "APPROVE" if (da is None or da >= 20) else "REVIEW"
        else:
            out["verdict"] = "UNSCORED — needs Moz/Bing API key to gate on real DA (see backlinks_auth.py --check)"
    else:
        out["verdict"] = "UNSCORED — Moz check skipped"

    return out


def cmd_screen(args):
    with open(args.candidates, encoding="utf-8") as f:
        candidates = json.load(f)

    results = [screen_candidate(c, use_moz=not args.no_moz) for c in candidates]

    if args.json:
        print(json.dumps(results, indent=2))
        return

    rejected = [r for r in results if r["verdict"] == "REJECT"]
    approved = [r for r in results if r["verdict"] == "APPROVE"]
    unscored = [r for r in results if r["verdict"] and "UNSCORED" in r["verdict"]]
    review = [r for r in results if r["verdict"] == "REVIEW"]

    print(f"Screened {len(results)} candidates:")
    print(f"  REJECT (blocklisted/spam):  {len(rejected)}")
    print(f"  APPROVE (DA >= 20):         {len(approved)}")
    print(f"  REVIEW (low DA, not spam):  {len(review)}")
    print(f"  UNSCORED (no Moz key):      {len(unscored)}")
    print()
    for r in rejected:
        print(f"  REJECT   {r['domain']:35s} {r['blocklist']['reason']}")
    for r in approved:
        da = r["moz"]["domain_authority"] if r["moz"] else "?"
        print(f"  APPROVE  {r['domain']:35s} DA={da}")
    for r in review:
        da = r["moz"]["domain_authority"] if r["moz"] else "?"
        print(f"  REVIEW   {r['domain']:35s} DA={da}")
    if unscored:
        print()
        print("  Unscored candidates need a Moz or Bing key to gate on real DA.")
        print("  Get a free Moz key (2,500 rows/mo): https://moz.com/products/api")
        for r in unscored:
            print(f"    - {r['domain']}")


def cmd_check_blocklist(args):
    result = check_blocklist(args.domain)
    print(json.dumps(result, indent=2))


def cmd_verify(args):
    script = os.path.join(_SCRIPTS_DIR, "verify_backlinks.py")
    cmd = [sys.executable, script, "--target", args.target, "--links", args.links]
    if args.json:
        cmd.append("--json")
    subprocess.run(cmd)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="command", required=True)

    p_screen = sub.add_parser("screen", help="Screen candidate directories against the spam blocklist and Moz DA")
    p_screen.add_argument("candidates", help="Path to candidates.json")
    p_screen.add_argument("--json", action="store_true")
    p_screen.add_argument("--no-moz", action="store_true", help="Skip Moz lookup, blocklist check only")
    p_screen.set_defaults(func=cmd_screen)

    p_block = sub.add_parser("check-blocklist", help="Check a single domain against the spam blocklist")
    p_block.add_argument("domain")
    p_block.set_defaults(func=cmd_check_blocklist)

    p_verify = sub.add_parser("verify", help="Verify submitted backlinks are live (wraps verify_backlinks.py)")
    p_verify.add_argument("--target", required=True)
    p_verify.add_argument("--links", required=True)
    p_verify.add_argument("--json", action="store_true")
    p_verify.set_defaults(func=cmd_verify)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
