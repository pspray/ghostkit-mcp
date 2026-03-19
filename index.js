import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const API_BASE = process.env.GHOSTKIT_API_BASE || "https://ghostkit.net/api";
const API_KEY = process.env.GHOSTKIT_API_KEY;

if (!API_KEY) {
  console.error("GHOSTKIT_API_KEY environment variable is required.");
  console.error("Get your API key at https://ghostkit.net/login");
  process.exit(1);
}

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API error ${res.status}: ${body}`);
  }
  return res.json();
}

// Fetch tool definitions from the API on startup
let tools = [];
try {
  const data = await api("/mcp/tools");
  tools = data.tools;
} catch (err) {
  console.error("Failed to fetch tools from ghostkit.net:", err.message);
  process.exit(1);
}

const server = new Server(
  { name: "ghostkit", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, () => ({ tools }));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: params } = request.params;

  try {
    return await api("/mcp/call", {
      method: "POST",
      body: JSON.stringify({ tool: name, params: params || {} }),
    });
  } catch (err) {
    return {
      content: [{ type: "text", text: `Error: ${err.message}` }],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
