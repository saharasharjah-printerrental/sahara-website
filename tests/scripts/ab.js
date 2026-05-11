#!/usr/bin/env node
/**
 * Cross-platform agent-browser wrapper
 * Detects OS and runs the correct binary via the agent-browser.js CLI wrapper
 * Usage: node ab.js <args>
 */
import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const binPath = join(__dirname, '..', '..', 'node_modules', 'agent-browser', 'bin', 'agent-browser.js');

const args = process.argv.slice(2);
const cmd = spawn(binPath, args, {
  stdio: 'inherit',
  windowsHide: false,
});

cmd.on('close', (code) => process.exit(code ?? 0));
cmd.on('error', (err) => {
  console.error('Failed to run agent-browser:', err.message);
  process.exit(1);
});
