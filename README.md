# mcp-context-budget-site

Vite/React microsite for the `mcp-context-budget` project page at
`https://www.danmercede.com/works/mcp-context-budget/`.

## Role

This repo owns the marketing/presentation surface for `mcp-context-budget`:
layout, copy, metadata, static assets, and Vercel routing/cache config. The
source project owns the Python CLI, tests, specs, Docker packaging, and config
apply behavior.

## Source Of Truth

- Product repo: `../mcp-context-budget-oss`
- Site copy: `constants.ts`
- Metadata: `index.html`
- Routing/cache: `vercel.json`

## Local Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Boundaries

Keep claims grounded in the source project README, pyproject metadata, docs,
specs, and released behavior. Do not change the MCP budget CLI from this repo.
