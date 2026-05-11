#!/usr/bin/env node
/**
 * MCP server entry point — ESM
 * Exposes agent-browser via MCP stdio protocol
 */
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { AgentBrowser, PlaywrightBrowserBackend } from "@agent-browser-io/browser";
import { z } from "zod";

const backend = new PlaywrightBrowserBackend();
const browser = new AgentBrowser(backend);
let launched = false;

async function ensureLaunched() {
  if (!launched) { await browser.launch(); launched = true; }
}

const ok = (t) => ({ content: [{ type: "text", text: t }] });
const err = (e) => ({ content: [{ type: "text", text: `Error: ${e instanceof Error ? e.message : String(e)}` }] });

const server = new McpServer({ name: "agent-browser", version: "0.1.0" }, { capabilities: { tools: {} } });

server.registerTool("agent_browser_launch", {
  title: "Launch Browser", description: "Launch the browser (idempotent).",
  inputSchema: z.object({}),
}, async () => { try { await ensureLaunched(); return ok("Browser launched."); } catch (e) { return err(e); } });

server.registerTool("agent_browser_navigate", {
  title: "Navigate", description: "Navigate to a URL.",
  inputSchema: z.object({ url: z.string().describe("URL to open") }),
}, async ({ url }) => { try { await ensureLaunched(); await browser.navigate(url); return ok(`Navigated to ${url}`); } catch (e) { return err(e); } });

server.registerTool("agent_browser_get_wireframe", {
  title: "Get Wireframe", description: "Return the ASCII wireframe with element refs.",
  inputSchema: z.object({}),
}, async () => { try { await ensureLaunched(); const wf = await browser.getWireframe(); return ok(wf || "(empty)"); } catch (e) { return err(e); } });

server.registerTool("agent_browser_click", {
  title: "Click", description: "Click element by ref ID.",
  inputSchema: z.object({ ref: z.string().describe("Ref ID from wireframe") }),
}, async ({ ref }) => { try { await ensureLaunched(); await browser.click(ref); return ok(`Clicked ${ref}`); } catch (e) { return err(e); } });

server.registerTool("agent_browser_fill", {
  title: "Fill", description: "Fill input by ref.",
  inputSchema: z.object({ ref: z.string(), text: z.string() }),
}, async ({ ref, text }) => { try { await ensureLaunched(); await browser.fill(ref, text); return ok(`Filled ${ref}`); } catch (e) { return err(e); } });

server.registerTool("agent_browser_type", {
  title: "Type", description: "Type text into element by ref.",
  inputSchema: z.object({ ref: z.string(), text: z.string() }),
}, async ({ ref, text }) => { try { await ensureLaunched(); await browser.type(ref, text); return ok(`Typed into ${ref}`); } catch (e) { return err(e); } });

server.registerTool("agent_browser_hover", {
  title: "Hover", description: "Hover over element by ref.",
  inputSchema: z.object({ ref: z.string() }),
}, async ({ ref }) => { try { await ensureLaunched(); await browser.hover(ref); return ok(`Hovered ${ref}`); } catch (e) { return err(e); } });

server.registerTool("agent_browser_scroll", {
  title: "Scroll", description: "Scroll page.",
  inputSchema: z.object({ direction: z.enum(["up", "down", "left", "right"]), pixels: z.number().optional() }),
}, async ({ direction, pixels }) => { try { await ensureLaunched(); await browser.scroll(direction, pixels); return ok(`Scrolled ${direction}`); } catch (e) { return err(e); } });

server.registerTool("agent_browser_screenshot", {
  title: "Screenshot", description: "Take a screenshot.",
  inputSchema: z.object({ path: z.string().optional(), fullPage: z.boolean().optional() }),
}, async ({ path: p, fullPage }) => {
  try { await ensureLaunched(); await browser.screenshot(p, { fullPage }); return ok(p ? `Saved to ${p}` : "Screenshot taken"); }
  catch (e) { return err(e); }
});

server.registerTool("agent_browser_close", {
  title: "Close Browser", description: "Close the browser.",
  inputSchema: z.object({}),
}, async () => { try { if (launched) { await browser.close(); launched = false; } return ok("Closed."); } catch (e) { return err(e); } });

const transport = new StdioServerTransport();
await server.connect(transport);
