# Product demo source

This short film reuses the published v0.4.0 package's bundled synthetic demo
catalog. `cli-evidence.json` records the actual commands, outputs and exit codes.
The replay page is an editorial presentation of that output, with explicit
excerpts; it is not a product dashboard or continuous live terminal capture.

No MCP service is contacted. The 120-tool catalog is deliberately synthetic and
oversized. Schema token counts are estimates and provide no provider-tokenization,
model-quality, response-speed or cost-savings benchmark.

To reproduce the inputs in a scratch directory after installing
`mcp-context-budget==0.4.0`:

```python
from pathlib import Path
from mcp_context_budget.demo import write_demo_files
write_demo_files(Path('.'))
```

Run the captured `scan`, `select` and `check` commands from `cli-evidence.json`.
The selected lock passes the 6,000-token cap; the full lock fails with exit 1.
The normal `mcp-context-budget demo` command also exercises the bundled fixture.

Run `python3 build-replay.py` to regenerate `index.html` from captured evidence.
Serve this directory locally and adapt `demo.config.example.json` for
agent-demo-video. Rehearse with `FAKE_TTS=1` and inspect the contact sheet. Put the
real voice command, aligner configuration and output location in a private copy
of the config. The delivered demo uses local synthetic narration based on Dan's
voice. Voice references and private provider configuration are not public assets.

The site ships the final MP4, poster and phrase-level WebVTT captions under
`public/media/`. Source script, output evidence and the final recording's hash
support the reuse/refresh decision in `docs/product-demo.md`.
