#!/usr/bin/env node
/**
 * Master test runner - orchestrates all test suites sequentially
 * Exit code: 0 if all pass, 1 if any fail
 */
import { spawn } from 'child_process';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SCRIPT_DIR = join(ROOT, 'tests/scripts');
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const suites = [
  { name: 'Smoke Tests',        script: 'run-smoke-tests.sh',     cwd: SCRIPT_DIR },
  { name: 'Accessibility Tests', script: 'run-a11y-tests.sh',    cwd: SCRIPT_DIR },
  { name: 'Visual Regression',  script: 'run-visual-tests.sh',   cwd: SCRIPT_DIR },
  { name: 'Screenshot Capture', script: 'run-screenshot-tests.sh', cwd: SCRIPT_DIR },
  { name: 'TypeScript Flows',   script: 'tsx smoke-tests.ts',    cwd: SCRIPT_DIR },
];

function sh(command, cwd = ROOT) {
  return new Promise((resolve, reject) => {
    const isWin = process.platform === 'win32';
    const shell = isWin ? 'cmd.exe' : '/bin/bash';
    const flag = isWin ? '/c' : '-c';

    console.log(`  $ ${command}`);
    const child = spawn(shell, [flag, command], {
      cwd,
      stdio: 'inherit',
      env: { ...process.env, BASE_URL },
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(new Error(`Exit code: ${code}`));
      }
    });

    child.on('error', reject);
  });
}

async function main() {
  console.log('═══════════════════════════════════════════════');
  console.log('  Sahara E2E Test Suite - All Tests');
  console.log(`  Base URL: ${BASE_URL}`);
  console.log(`  Platform: ${process.platform}`);
  console.log('═══════════════════════════════════════════════');

  // Check if server is running
  try {
    execSync(`curl -sf --max-time 3 ${BASE_URL}`, { encoding: 'utf-8', stdio: 'ignore' });
    console.log(`✓ Server is running at ${BASE_URL}\n`);
  } catch {
    console.error(`✗ Cannot reach server at ${BASE_URL}`);
    console.error('  Start the dev server first: npm run dev');
    console.error('  Or set BASE_URL: BASE_URL=http://localhost:3001 npm run test:e2e');
    process.exit(1);
  }

  let totalFailed = 0;

  for (const suite of suites) {
    console.log(`\n── ${suite.name} ──────────────────────────`);
    try {
      await sh(suite.script, suite.cwd);
      console.log(`✓ ${suite.name} passed`);
    } catch (err) {
      console.error(`✗ ${suite.name} FAILED`);
      totalFailed++;
    }
  }

  console.log('\n═══════════════════════════════════════════════');
  if (totalFailed === 0) {
    console.log('  ✓ ALL TEST SUITES PASSED');
    process.exit(0);
  } else {
    console.log(`  ✗ ${totalFailed} suite(s) failed`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
