// Temporary diagnostic + test harness: run the next-on-pages worker under
// Miniflare with an isolated D1, seed schema.sql, and surface real errors.
// Local test tooling only — never deployed.
import { Miniflare, Log } from 'miniflare';
import { readFileSync } from 'fs';

const PORT = Number(process.env.PORT || 3202);

const mf = new Miniflare({
  scriptPath: '.vercel/output/static/_worker.js/index.js',
  modules: true,
  compatibilityDate: '2024-12-16',
  compatibilityFlags: ['nodejs_compat'],
  d1Databases: ['DB'],
  d1Persist: 'tests/tmp/mf-state',
  bindings: {
    NEXT_PUBLIC_SITE_URL: `http://127.0.0.1:${PORT}`,
    ADMIN_EMAIL: 'admin@test.local',
    ADMIN_PASSWORD: 'test-admin-password',
  },
  log: new Log(console.error),
});

// Seed schema
const env = await mf.getBindings();
const db = env.DB;
const sql = readFileSync('database/schema.sql', 'utf8');
for (const stmt of sql.split(';')) {
  const s = stmt.trim();
  if (!s || s.startsWith('--')) continue;
  try { await db.exec(s); } catch (e) { console.error('schema stmt failed:', e.message, '|', s.slice(0, 80)); }
}
// Minimal seed for order tests: two priced supplies + payment settings
await db.exec("UPDATE supplies SET price='AED 120' WHERE id='1'");
await db.exec("UPDATE supplies SET price='AED 45' WHERE id='2'");
const r = await db.prepare('SELECT COUNT(*) n FROM supplies').first();
console.error('supplies seeded:', r.n);

const server = await mf.createServer();
server.listen(PORT, () => console.error('listening on ' + PORT));
