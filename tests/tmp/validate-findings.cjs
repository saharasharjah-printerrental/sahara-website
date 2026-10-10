const d = require(require('path').resolve(process.argv[2] || 'tests/tmp/security-findings-2026-10-05.json'));
const ok = ['critical', 'high', 'medium', 'low', 'info'];
const os = ['fixed', 'partially-fixed', 'unfixed', 'accepted-risk'];
const req = ['id', 'title', 'severity', 'status', 'category', 'affectedPaths', 'evidence', 'verification', 'residualRisk'];
let bad = [];
if (d.version !== '1.0' || !d.generatedAt || !Array.isArray(d.findings)) bad.push('top-level');
d.findings.forEach((f, i) => {
  req.forEach(k => { if (!(k in f)) bad.push(i + ':' + k); });
  if (!ok.includes(f.severity)) bad.push(i + ':severity=' + f.severity);
  if (!os.includes(f.status)) bad.push(i + ':status=' + f.status);
  if (!Array.isArray(f.affectedPaths)) bad.push(i + ':affectedPaths');
});
console.log(bad.length ? bad : 'schema OK, ' + d.findings.length + ' findings');
