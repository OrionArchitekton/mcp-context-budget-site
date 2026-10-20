---
verified: 2026-10-19
review_after: 2027-01-19
topics: [demo, startup, release]
references: [specs/demo-startup-spec.md, package.json]
---

# Demo startup validation

Run `npm ci`, `npm test`, `npx tsc --noEmit` and `npm audit`. Hold the client bundle, play the native video and select captions before releasing it. Verify player identity, progress and caption selection survive at desktop/mobile sizes. Repeat normal playback, seeking, captions and JavaScript-free rendering. Compare all media hashes with the prior approved set.

After Dan approves this fix PR, merge through the existing release gates and verify https://www.danmercede.com/works/mcp-context-budget/ itself. Source/local proof does not establish that the public fix is deployed. Roll back by reverting this PR or restoring the preceding site deployment. No recording or source-tool release changes.

Dependency audit baseline (2026-10-19): the unchanged approved lockfile reports 12 inherited build-tool findings, 9 high and 3 moderate. Treat the audit as informational for this narrowly scoped startup fix. Compare the output with this baseline and investigate any new advisory or lockfile change before release; approval of this PR does not establish a clean dependency audit.
