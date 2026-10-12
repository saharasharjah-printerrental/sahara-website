// Spawns the locally installed `vercel build` for the @cloudflare/next-on-pages
// pipeline. npm injects the user's allow-scripts config as npm_config_* env vars
// into npm-run children (and npx would re-inject them), while npm's install
// inside `vercel build` rejects the env form (EALLOWSCRIPTS). Invoke vercel's
// CLI directly and strip the vars so the install reads the project .npmrc.
const { spawnSync } = require("child_process");
const path = require("path");

delete process.env.npm_config_allow_scripts;
delete process.env.npm_config_legacy_peer_deps;

const pkgDir = path.join(process.cwd(), "node_modules", "vercel");
const entry = path.join(pkgDir, "dist", "vc.js");
if (!require("fs").existsSync(entry)) {
  console.error("vercel not found in node_modules — run: npm install");
  process.exit(1);
}

const result = spawnSync(process.execPath, [entry, "build", ...process.argv.slice(2)], {
  stdio: "inherit",
  env: process.env,
});
if (result.error) {
  console.error(result.error.message);
}
process.exit(result.status ?? 1);
