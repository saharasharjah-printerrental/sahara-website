#!/usr/bin/env node
/**
 * Cross-platform agent-browser wrapper
 * Detects OS and runs the correct binary
 * Usage: node ab.js <args>
 */
import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { platform, arch } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const binDir = join(__dirname, '..', '..', 'node_modules', 'agent-browser', 'bin');

const binaries = {
  'win32-x64': 'agent-browser-win32-x64.exe',
  'linux-x64': 'agent-browser-linux-x64',
  'darwin-x64': 'agent-browser-darwin-x64',
  'darwin-arm64': 'agent-browser-darwin-arm64',
  'linux-arm64': 'agent-browser-linux-arm64',
};

const key = `${platform()}-${arch()}`;
const binary = binaries[key] || binaries['linux-x64'];
const binPath = join(binDir, binary);

const args = process.argv.slice(2);
const cmd = spawn(binPath, args, {
  stdio: 'inherit',
  shell: false,
});

cmd.on('close', (code) => process.exit(code ?? 0));
cmd.on('error', (err) => {
  console.error('Failed to run agent-browser:', err.message);
  process.exit(1);
});
