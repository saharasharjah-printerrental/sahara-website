// Call the Vibe browser MCP relay (streamable-HTTP JSON-RPC).
// Usage: node scripts/backlinks/vibe-relay.mjs <toolName> '<json-args>'
// Prints the text content of the tool result (trimmed to --max-chars via VIBE_MAX_CHARS).
const URL = 'https://relay.api.vibebrowser.app/mcp/4c740f10-3238-40ee-83b8-7a14607268cd';
const [tool, argsJson] = process.argv.slice(2);
const args = argsJson ? JSON.parse(argsJson) : {};
const res = await fetch(URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
  body: JSON.stringify({ jsonrpc: '2.0', id: Date.now(), method: 'tools/call', params: { name: tool, arguments: args } }),
});
const body = await res.text();
let parsed;
try { parsed = JSON.parse(body); } catch {
  // SSE stream: take the last data: line
  const line = body.split('\n').filter(l => l.startsWith('data: ')).pop();
  parsed = JSON.parse(line.slice(6));
}
if (parsed.error) {
  console.error('ERROR:', JSON.stringify(parsed.error));
  process.exit(1);
}
const maxChars = Number(process.env.VIBE_MAX_CHARS || 6000);
for (const part of parsed.result?.content ?? []) {
  const text = part.text ?? JSON.stringify(part);
  console.log(text.length > maxChars ? text.slice(0, maxChars) + `\n...[truncated ${text.length - maxChars} chars]` : text);
}
