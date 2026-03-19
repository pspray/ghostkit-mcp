# ghostkit MCP Server - Security Tools for AI

[![MCP Compatible](https://img.shields.io/badge/MCP-compatible-31E1CD)](https://modelcontextprotocol.io)
[![Tools](https://img.shields.io/badge/tools-26-31E1CD)](https://ghostkit.net/mcp)
[![License](https://img.shields.io/badge/license-proprietary-white)](https://ghostkit.net/terms)

MCP server that gives Claude, Cursor, Windsurf, and any MCP-compatible AI client access to 26 security and developer tools. Ask your AI to decode a JWT, analyze HTTP security headers, hash a payload, or inspect a phishing URL, and it picks the right tool automatically.

**Free during early access.** [Sign in and get your API key](https://ghostkit.net/login)

## What you can do with it

Ask your AI things like:

- "Decode this JWT and tell me if it's expired"
- "Check this HTTP response for missing security headers"
- "Analyze the CSP policy and grade it"
- "Is this URL a phishing attempt? Check for homoglyphs"
- "Generate an Ed25519 keypair"
- "Decode this Ethereum calldata"
- "Hash this string with SHA-256 and MD5"
- "Inspect these email headers for SPF/DKIM issues"

The MCP server routes each request to the right tool. No manual tool selection needed.

## All 26 tools

### Decode & Transform
- **Encoder/Decoder** - Base64, Hex, URL, HTML entities, Unicode, Octal with auto-detection
- **JWT Decoder** - Parse headers, claims, expiry, and flag security warnings (alg:none, missing iss)
- **JS Deobfuscator** - Decode hex/unicode strings, unpack arrays, unwrap eval(), beautify output
- **SAML Decoder** - Decode base64 SAML responses, extract assertions, attributes, and conditions

### Inspect & Analyze
- **URL Analyzer** - Break down URLs, detect phishing indicators, homoglyphs, suspicious TLDs, defang for sharing
- **Email Header Analyzer** - Trace message routes, check SPF/DKIM/DMARC, detect spoofing
- **CSP Analyzer** - Parse Content-Security-Policy, detect unsafe-inline/eval, grade A-F
- **CORS Checker** - Detect wildcard origins, credential leaks, missing preflight headers
- **Character Inspector** - Find zero-width chars, homoglyphs, mixed scripts, bidi control characters
- **Cookie Analyzer** - Parse Set-Cookie headers, check Secure/HttpOnly/SameSite, detect misconfigurations
- **Entropy Analyzer** - Shannon entropy calculation, detect encrypted/compressed/obfuscated data
- **Hex Viewer** - Hex + ASCII dump with magic byte file signature detection
- **HTTP Response Inspector** - Parse raw responses, audit security headers, flag info leaks
- **Certificate Decoder** - Decode PEM certificates, show subject, issuer, SANs, expiry, key details

### Format & Compare
- **JSON Formatter** - Validate, pretty-print, minify, report key count and nesting depth
- **YAML/TOML Formatter** - Parse, format, convert between YAML, TOML, and JSON
- **Code Diff** - Line-by-line unified diff between two code snippets
- **Regex Tester** - Test patterns with match positions and capture groups
- **Timestamp Converter** - Convert Unix/ISO/human dates, relative time, auto-detect format

### Crypto & Network
- **Hash Generator** - MD5, SHA-1, SHA-256, SHA-512 with optional hash comparison
- **Password Generator** - Cryptographically secure passwords and passphrases with entropy scoring
- **RSA/EC Key Generator** - Generate RSA, ECDSA, ECDH, Ed25519 keypairs in PEM format
- **IP/CIDR Calculator** - Subnet math, host ranges, private/reserved detection, membership checks

### Web3 & Blockchain
- **Keccak-256 Hasher** - Compute Keccak-256 hashes, Ethereum function selectors, event topics
- **ABI Decoder** - Decode Ethereum calldata into function calls (transfer, approve, swap, etc.)
- **Transaction Decoder** - Parse RLP-encoded transactions (Legacy, EIP-2930, EIP-1559)

## Quick start

### 1. Get your API key

[Sign in at ghostkit.net](https://ghostkit.net/login) and create a free API key from your account page.

### 2. Clone and install

```bash
git clone https://github.com/pspray/ghostkit-mcp.git
cd ghostkit-mcp
npm install
```

### 3. Connect to your AI client

<details>
<summary><strong>Claude Desktop</strong></summary>

Add to your `claude_desktop_config.json`:

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
</details>

<details>
<summary><strong>Claude Code (CLI)</strong></summary>

```bash
GHOSTKIT_API_KEY=gk_your_key_here \
  claude mcp add ghostkit -- node /path/to/ghostkit-mcp/index.js
```
</details>

<details>
<summary><strong>Cursor / Windsurf / other MCP clients</strong></summary>

Add to your MCP configuration (check your client's docs for the exact file):

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
</details>

Replace `/path/to/ghostkit-mcp` with the actual path where you cloned the repo.

## How it works

This repo is a thin MCP client. On startup it fetches the tool definitions from the ghostkit API, then forwards each tool call to the backend for execution. Your AI client sees 26 tools it can call, and the actual processing happens server-side.

This means you always have the latest tools without pulling updates, and no security-sensitive computation runs on your machine.

Requires a [ghostkit API key](https://ghostkit.net/login) for authentication.

## Links

- [ghostkit.net/mcp](https://ghostkit.net/mcp) - Full documentation, pricing, and setup guide
- [ghostkit.net/toolkit](https://ghostkit.net/toolkit) - Try all 26 tools in your browser for free
- [ghostkit.net/recon](https://ghostkit.net/recon) - URL intelligence scanner

## License

Proprietary. See [Terms of Use](https://ghostkit.net/terms).
