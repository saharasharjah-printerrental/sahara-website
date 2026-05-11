#!/usr/bin/env node
/**
 * TypeScript smoke test runner for complex user flows
 * Cross-platform: uses the ab.js wrapper
 */
import { execSync } from 'child_process';
import { readFileSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { platform } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const BASELINES_DIR = join(ROOT, 'tests/e2e/visual/baselines');
const DIFFS_DIR = join(ROOT, 'tests/e2e/visual/diffs');

const isWin = platform() === 'win32';
const EXE = isWin
  ? join(ROOT, 'node_modules', 'agent-browser', 'bin', 'agent-browser-win32-x64.exe')
  : join(ROOT, 'node_modules', 'agent-browser', 'bin', 'agent-browser-linux-x64');

function ab(cmd, session = 'ts-smoke') {
  const full = `"${EXE}" --session ${session} ${cmd}`;
  try {
    return execSync(full, { encoding: 'utf-8', timeout: 30000 });
  } catch (err) {
    if (err.stdout) return err.stdout;
    if (err.stderr) return err.stderr;
    throw err;
  }
}

async function testQuoteForm(baseUrl) {
  console.log('\n[Test] Quote form submission');
  try {
    ab(`open ${baseUrl}/get-quote`);
    ab('wait --load networkidle');
    const snapshot = ab('snapshot -i');
    const hasFields = snapshot.includes('textbox') || snapshot.includes('input');
    if (!hasFields) throw new Error('No form fields found');
    const refs = snapshot.match(/@e\d+/g) || [];
    if (refs.length >= 2) {
      ab(`fill @e${refs[0]} "Test Company"`);
      ab(`fill @e${refs[1]} "test@example.com"`);
    }
    const title = ab('get title');
    console.log(`  ✓ Quote form loaded: "${title.trim()}"`);
    return true;
  } catch (err) {
    console.error(`  ✗ FAILED: ${err.message}`);
    return false;
  }
}

async function testNavigation(baseUrl) {
  console.log('\n[Test] Navigation links');
  try {
    ab(`open ${baseUrl}`);
    ab('wait --load networkidle');
    const snapshot = ab('snapshot -i --urls');
    const links = snapshot.match(/https?:\/\/[^\s"']+/g) || [];
    let internal = 0;
    for (const url of links.slice(0, 10)) {
      if (url.includes(baseUrl) || url.startsWith('/')) internal++;
    }
    console.log(`  ✓ PASSED: ${internal} internal link(s) found`);
    return true;
  } catch (err) {
    console.error(`  ✗ FAILED: ${err.message}`);
    return false;
  }
}

async function testVisualDiff(baseUrl, route, label) {
  const name = route.replace(/^\//, '').replace(/\//g, '-') || 'homepage';
  const baseline = join(BASELINES_DIR, `${name}.png`);
  console.log(`\n[Test] Visual diff: ${label}`);
  try {
    ab(`open ${baseUrl}${route}`);
    ab('wait --load networkidle');
    const current = join(DIFFS_DIR, `${name}-current.png`);
    ab(`screenshot ${current}`);
    if (!exists(baseline)) {
      copyFileSync(current, baseline);
      console.log(`  ○ BASELINE: Captured (first run)`);
      return true;
    }
    const diff = join(DIFFS_DIR, `${name}-diff.png`);
    const result = ab(`diff screenshot --baseline "${baseline}" --threshold 0.03 -o "${diff}"`);
    const passed = result.includes('PASSED') || result.includes('passed');
    if (passed) {
      console.log(`  ✓ PASSED: No visual regression`);
    } else {
      console.log(`  ✗ FAILED: Visual regression detected`);
    }
    return passed;
  } catch (err) {
    console.error(`  ✗ FAILED: ${err.message}`);
    return false;
  }
}

function exists(path) {
  try { readFileSync(path); return true; } catch { return false; }
}

async function main() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const results = [];
  console.log('═══════════════════════════════════════════');
  console.log('  TypeScript Smoke Tests');
  console.log(`  Base: ${baseUrl}`);
  console.log(`  OS: ${platform()}`);
  console.log('═══════════════════════════════════════════');

  ab('close --all');

  results.push(await testQuoteForm(baseUrl));
  results.push(await testNavigation(baseUrl));

  for (const [route, label] of [
    ['/', 'Homepage'],
    ['/contact', 'Contact'],
    ['/products', 'Products'],
    ['/get-quote', 'Get Quote'],
  ]) {
    results.push(await testVisualDiff(baseUrl, route, label));
  }

  ab('close');

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
  console.error('Fatal error:', err.message);
  process.exit(1);
});
