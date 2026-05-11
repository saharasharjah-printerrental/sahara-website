#!/usr/bin/env node
/**
 * Cloudflare Wrangler MCP Server
 * Wraps wrangler CLI commands for Pages, Workers, D1, R2, and KV management.
 */
const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require("@modelcontextprotocol/sdk/types.js");
const { execSync } = require("child_process");
const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const WRANGLER = path.resolve(PROJECT_ROOT, "node_modules/.bin/wrangler.cmd");

function runWrangler(args) {
  const cmd = `"${WRANGLER}" ${args}`;
  try {
    const stdout = execSync(cmd, {
      cwd: PROJECT_ROOT,
      encoding: "utf-8",
      maxBuffer: 5 * 1024 * 1024,
      timeout: 120000,
    });
    return { success: true, output: stdout.trim() };
  } catch (err) {
    return {
      success: false,
      output: (err.stdout || "").trim(),
      error: (err.stderr || err.message || "").trim(),
      code: err.status,
    };
  }
}

const server = new Server(
  {
    name: "cloudflare-wrangler-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "whoami",
      description: "Check Cloudflare authentication status (wrangler whoami)",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "pages_deploy",
      description: "Deploy the current build to Cloudflare Pages",
      inputSchema: {
        type: "object",
        properties: {
          branch: { type: "string", description: "Branch name for the deployment (optional)" },
          commitHash: { type: "string", description: "Git commit hash (optional)" },
          commitMessage: { type: "string", description: "Git commit message (optional)" },
        },
      },
    },
    {
      name: "pages_deployments_list",
      description: "List recent Pages deployments",
      inputSchema: {
        type: "object",
        properties: {
          projectName: { type: "string", description: "Cloudflare Pages project name" },
          limit: { type: "number", description: "Number of deployments to show (default 10)" },
        },
        required: ["projectName"],
      },
    },
    {
      name: "pages_deployment_info",
      description: "Get details of a specific Pages deployment",
      inputSchema: {
        type: "object",
        properties: {
          projectName: { type: "string", description: "Cloudflare Pages project name" },
          deploymentId: { type: "string", description: "Deployment ID" },
        },
        required: ["projectName", "deploymentId"],
      },
    },
    {
      name: "pages_project_info",
      description: "Get Cloudflare Pages project information",
      inputSchema: {
        type: "object",
        properties: {
          projectName: { type: "string", description: "Cloudflare Pages project name" },
        },
        required: ["projectName"],
      },
    },
    {
      name: "tail_logs",
      description: "Tail live Workers/Pages Function logs for a project",
      inputSchema: {
        type: "object",
        properties: {
          projectName: { type: "string", description: "Cloudflare Pages project name" },
          format: { type: "string", description: "Output format: pretty (default) or json" },
        },
        required: ["projectName"],
      },
    },
    {
      name: "d1_list",
      description: "List D1 databases",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "d1_query",
      description: "Execute a D1 SQL query",
      inputSchema: {
        type: "object",
        properties: {
          database: { type: "string", description: "D1 database name or ID" },
          sql: { type: "string", description: "SQL query to execute" },
        },
        required: ["database", "sql"],
      },
    },
    {
      name: "kv_list_namespaces",
      description: "List KV namespaces",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "r2_list_buckets",
      description: "List R2 buckets",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "r2_list_objects",
      description: "List objects in an R2 bucket",
      inputSchema: {
        type: "object",
        properties: {
          bucket: { type: "string", description: "R2 bucket name" },
          prefix: { type: "string", description: "Prefix filter (optional)" },
          limit: { type: "number", description: "Max results (default 100)" },
        },
        required: ["bucket"],
      },
    },
    {
      name: "dns_list",
      description: "List DNS records for the configured zone",
      inputSchema: { type: "object", properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const tool = request.params.name;
  const args = request.params.arguments || {};

  switch (tool) {
    case "whoami": {
      const res = runWrangler("whoami");
      return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
    }

    case "pages_deploy": {
      let cmd = `pages deploy .vercel/output/static --project-name=sahara-website`;
      if (args.branch) cmd += ` --branch="${args.branch}"`;
      if (args.commitHash) cmd += ` --commit-hash="${args.commitHash}"`;
      if (args.commitMessage) cmd += ` --commit-message="${args.commitMessage}"`;
      const res = runWrangler(cmd);
      return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
    }

    case "pages_deployments_list": {
      const limit = args.limit || 10;
      const res = runWrangler(`pages deployment list --project-name="${args.projectName}" --per-page=${limit} --format=json`);
      return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
    }

    case "pages_deployment_info": {
      const res = runWrangler(`pages deployment get "${args.deploymentId}" --project-name="${args.projectName}" --format=json`);
      return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
    }

    case "pages_project_info": {
      const res = runWrangler(`pages project list --format=json`);
      return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
    }

    case "tail_logs": {
      const format = args.format || "pretty";
      const res = runWrangler(`pages deployment tail --project-name="${args.projectName}" --format=${format}`);
      return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
    }

    case "d1_list": {
      const res = runWrangler("d1 list --json");
      return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
    }

    case "d1_query": {
      const res = runWrangler(`d1 execute "${args.database}" --command="${args.sql}" --json`);
      return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
    }

    case "kv_list_namespaces": {
      const res = runWrangler("kv:namespace list --json");
      return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
    }

    case "r2_list_buckets": {
      const res = runWrangler("r2 bucket list --json");
      return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
    }

    case "r2_list_objects": {
      const limit = args.limit || 100;
      let cmd = `r2 object list "${args.bucket}" --limit=${limit} --json`;
      if (args.prefix) cmd += ` --prefix="${args.prefix}"`;
      const res = runWrangler(cmd);
      return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
    }

    case "dns_list": {
      const res = runWrangler("dns record list --json");
      return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
    }

    default:
      throw new Error(`Unknown tool: ${tool}`);
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Cloudflare Wrangler MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
