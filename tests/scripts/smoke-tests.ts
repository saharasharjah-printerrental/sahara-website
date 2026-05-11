#!/usr/bin/env node
/**
 * TypeScript smoke test runner for complex user flows
 * Uses agent-browser via child_process
 */
import { spawn, execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const BASELINES_DIR = join(ROOT, 'tests/e2e/visual/baselines');
const DIFFS_DIR = join(ROOT, 'tests/e2e/visual/diffs');

// ─── Helper: run agent-browser command ─────────────────────────────────────────
function ab(args, session = 'ts-smoke') {
  const cmd = ['agent-browser', `--session`, session, ...args];
  return execSync(cmd.join(' '), {
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe'],
    timeout: 30000,
  });
}

// ─── Helper: run with shell (captures stdout) ────────────────────────────────
function abShell(cmd, session = 'ts-smoke') {
  const full = `agent-browser --session ${session} ${cmd}`;
  return execSync(full, { encoding: 'utf-8', timeout: 30000 });
}

// ─── Test: Quote form submission ─────────────────────────────────────────────
async function testQuoteForm(baseUrl) {
  console.log('\n[Test] Quote form submission');
  try {
    abShell(`open ${baseUrl}/get-quote`);
    abShell('wait --load networkidle');

    const snapshot = abShell('snapshot -i');
    const hasNameField = snapshot.includes('textbox') || snapshot.includes('input');
    if (!hasNameField) throw new Error('No form fields found in quote form');

    const refs = snapshot.match(/@e\d+/g) || [];
    if (refs.length >= 2) {
      abShell(`fill @e${refs[0]} "Test Company"`);
      abShell(`fill @e${refs[1]} "test@example.com"`);
    }

    const title = abShell('get title');
    console.log(`  ✓ Quote form loaded: "${title.trim()}"`);
    return true;
  } catch (err) {
    console.error(`  ✗ FAILED: ${err.message}`);
    return false;
  }
}

// ─── Test: Navigation menu links ────────────────────────────────────────────
async function testNavigation(baseUrl) {
  console.log('\n[Test] Navigation links');
  try {
    abShell(`open ${baseUrl}`);
    abShell('wait --load networkidle');

    const snapshot = abShell('snapshot -i --urls');
    const links = snapshot.match(/https?:\/\/[^\s"']+/g) || [];
    console.log(`  Found ${links.length} link(s) with URLs`);

    let navLinks = 0;
    for (const url of links.slice(0, 10)) {
      if (url.includes(baseUrl) || url.startsWith('/')) {
        navLinks++;
      }
    }
    console.log(`  ✓ PASSED: ${navLinks} internal navigation link(s)`);
    return true;
  } catch (err) {
    console.error(`  ✗ FAILED: ${err.message}`);
    return false;
  }
}

// ─── Test: Visual diff for specific route ────────────────────────────────────
async function testVisualDiff(baseUrl, route, label) {
  const name = route.replace(/^\//, '').replace(/\//g, '-') || 'homepage';
  const baseline = join(BASELINES_DIR, `${name}.png`);

  console.log(`\n[Test] Visual diff: ${label}`);
  try {
    abShell(`open ${baseUrl}${route}`);
    abShell('wait --load networkidle');

    const current = join(DIFFS_DIR, `${name}-current.png`);
    abShell(`screenshot ${current}`);

    if (!exists(baseline)) {
      console.log(`  ○ BASELINE: Captured baseline (first run)`);
      execSync(`cp "${current}" "${baseline}"`, { encoding: 'utf-8' });
      return true;
    }

    const diff = join(DIFFS_DIR, `${name}-diff.png`);
    const result = abShell(`diff screenshot --baseline "${baseline}" --threshold 0.03 -o "${diff}"`);
    const passed = result.includes('PASSED') || result.includes('passed');

    if (passed) {
      console.log(`  ✓ PASSED: No visual regression`);
    } else {
      console.log(`  ✗ FAILED: Visual regression detected`);
      console.log(`  Diff saved: ${diff}`);
    }
    return passed;
  } catch (err) {
    console.error(`  ✗ FAILED: ${err.message}`);
    return false;
  }
}

function exists(path) {
  try {
    readFileSync(path);
    return true;
  } catch {
    return false;
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const results = [];

  console.log('═══════════════════════════════════════════');
  console.log('  TypeScript Smoke Tests');
  console.log(`  Base: ${baseUrl}`);
  console.log('═══════════════════════════════════════════');

  abShell('close --all');

  results.push(await testQuoteForm(baseUrl));
  results.push(await testNavigation(baseUrl));

  // Visual diff tests for key pages
  for (const [route, label] of [
    ['/', 'Homepage'],
    ['/contact', 'Contact'],
    ['/products', 'Products'],
    ['/get-quote', 'Get Quote'],
  ]) {
    results.push(await testVisualDiff(baseUrl, route, label));
  }

  abShell('close');

  const passed = results.filter(Boolean).length;
  const total = results.length;

  console.log('\n═══════════════════════════════════════════');
  if (passed === total) {
    console.log(`  ✓ All ${total} tests passed`);
    process.exit(0);
  } else {
    console.log(`  ✗ ${total - passed}/${total} test(s) failed`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
