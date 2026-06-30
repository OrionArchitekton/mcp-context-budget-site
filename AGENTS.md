# AGENTS.md - mcp-context-budget-site

## Repo Role

`mcp-context-budget-site` is the Vite/React microsite for the
`mcp-context-budget` project page. It owns presentation, metadata, static
assets, and redirect/cache config for the site surface.

## Boundaries

- Owns site copy, layout, Open Graph metadata, Vercel config, and static assets.
- Does not own the `mcp-context-budget` Python implementation, release process,
  or config-apply behavior.
- Keep product claims grounded in the source project README, pyproject metadata,
  docs, specs, and released behavior.

## Authority Order

1. `/home/orion/src/orion-estate/platform/orion-estate-audit/AGENTS.md`
2. Source project: `../mcp-context-budget-oss/README.md` and `../mcp-context-budget-oss/pyproject.toml`
3. This repo's `README.md`, `constants.ts`, `index.html`, and `vercel.json`
4. Vite build output and package scripts

## Validation

```bash
npm install
npm run build
```

For docs-only changes, run `git diff --check` at minimum.
