# ghostkit MCP Server

26 security tools for Claude, Cursor, and any MCP-compatible AI client.

Decode JWTs, analyze CSP policies, hash data, inspect URLs for phishing, deobfuscate JavaScript, generate cryptographic keys, decode Ethereum transactions, and more. Your AI picks the right tool automatically.

**Free during early access.** [Get your API key](https://ghostkit.net/login)

## Tools

| Category | Tools |
|---|---|
| Decode & Transform | Encoder/Decoder, JWT Decoder, JS Deobfuscator, SAML Decoder |
| Inspect & Analyze | URL Analyzer, Email Headers, CSP Analyzer, CORS Checker, Character Inspector, Cookie Analyzer, Entropy Analyzer, Hex Viewer, HTTP Response Inspector, Certificate Decoder |
| Format & Compare | JSON Formatter, YAML/TOML Formatter, Code Diff, Regex Tester, Timestamp Converter |
| Crypto & Network | Hash Generator (MD5/SHA), Password Generator, RSA/EC Key Generator, IP/CIDR Calculator |
| Web3 & Blockchain | Keccak-256 Hasher, ABI Decoder, Transaction Decoder |

## Setup

### 1. Get your API key

Sign in at [ghostkit.net/login](https://ghostkit.net/login) and create an API key from your account page.

### 2. Clone and install

```bash
git clone https://github.com/pspray/ghostkit-mcp.git
cd ghostkit-mcp
npm install
```

### 3. Configure your MCP client

**Claude Desktop** - add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ghostkit": {
      "command": "node",
      "args": ["/path/to/ghostkit-mcp/index.js"],
      "env": {
        "GHOSTKIT_API_KEY": "gk_your_key_here"
      }
    }
  }
}
```

**Claude Code (CLI)**:

```bash
GHOSTKIT_API_KEY=gk_your_key_here claude mcp add ghostkit -- node /path/to/ghostkit-mcp/index.js
```

Replace `/path/to/ghostkit-mcp` with the actual path where you cloned the repo.

## How it works

This MCP server is a thin client. It fetches tool definitions from the ghostkit API on startup, then forwards tool calls to the backend for execution. All processing happens server-side, so you always get the latest tools without updating.

Requires a ghostkit API key for authentication.

## Links

- [ghostkit.net/mcp](https://ghostkit.net/mcp) - Full tool list and documentation
- [ghostkit.net/toolkit](https://ghostkit.net/toolkit) - Try the tools in your browser (free, no account needed)

## License

Proprietary. See [Terms of Use](https://ghostkit.net/terms).
