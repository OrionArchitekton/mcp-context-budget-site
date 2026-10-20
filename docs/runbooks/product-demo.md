---
verified: 2026-10-19
review_after: 2027-01-19
topics: [mcp-context-budget, product-demo, release, playback]
references: [constants.ts, vite.config.ts, vercel.json, docs/product-demo.md, demos/product/README.md]
---

# Product demo release and rollback

Run `npm ci`, `npm run build` and `npx tsc --noEmit`. The build runs the built-page
demo checks, so the same assertions run in the hosting build. Probe and completely
decode the final MP4. Inspect every scene for readable CLI output, synchronized
captions and the synthetic-fixture disclosure. Listening and creative acceptance
remain with Dan.

Preview the production build with `npm run preview`. At desktop and mobile sizes,
start playback, seek to the enforcement scene, enable captions and open the
transcript. Repeat without JavaScript. Confirm no media request starts before
interaction, no autoplay, no missing media and no horizontal overflow. Record
which release and media hash were verified.

The approved site PR deploys through the existing hosting integration. This
project owns the static origin; the hub proxies it under
`/works/mcp-context-budget/`. Keep media paths prefixed in page references and
stripped at the origin. No hub, domain or DNS change is required.

After the approved merge/deployment, verify actual playback and seeking at
`https://www.danmercede.com/works/mcp-context-budget/`. Confirm video returns
`video/mp4`, captions return WebVTT, the canonical still names this product and
requests do not return the hub HTML. A local video, green build or HTTP 200 alone
does not establish final-route playback. Record publication separately from
technical validation and creative acceptance.

Monitor the same page and media responses after release. Roll back by restoring
the previous hosting deployment or reverting this site's demo commit through its
normal PR flow. The package release, guide and hub route remain independent.

On subsequent releases, inspect existing recordings before making a replacement.
Reuse accurate material across patches. Refresh for material workflow, install,
support-boundary or CTA changes and preserve prior or failed render evidence.
