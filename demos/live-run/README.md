# Demo terminal: live run evidence

The Demo terminal on /works/mcp-context-budget/ is an excerpt of one real run,
trimmed but not altered. This folder holds what that run produced, so each
displayed command, count, selected tool and exit code can be checked or
reproduced.

This run is separate from the product video above it. The video replays the
package's bundled synthetic fixture (five servers, 120 tools; see
`../product/` and `../../docs/product-demo.md`). This run scanned real servers.

## What ran

- Date: 2026-11-14, 23:49:09Z to 23:50:39Z (UTC).
- Tool: `mcp-context-budget==0.4.0` from PyPI.
- Servers: the seven MCP reference servers from
  https://github.com/modelcontextprotocol/servers, pinned:
  - npm `@modelcontextprotocol/server-everything@2.3.0`
  - npm `@modelcontextprotocol/server-filesystem@2.3.0`
  - npm `@modelcontextprotocol/server-memory@2.1.1`
  - npm `@modelcontextprotocol/server-sequential-thinking@2.1.1`
  - PyPI `mcp-server-git==2026.11.11`
  - PyPI `mcp-server-time==2026.11.11`
  - PyPI `mcp-server-fetch==2026.11.11`
- Each server was started locally over stdio for `initialize` and `tools/list`
  only. The filesystem allowed directory and the memory file's folder were
  empty, and the git repository was freshly initialized with no commits.

## Files

| File | What it is |
|---|---|
| `mcp.template.json` | The config used, one `mcpServers` entry per server. |
| `scan.lock.json` | Lock written by `scan`: 7 servers, 60 tools, 11061 estimated schema tokens. |
| `scan.report.md` | Report written by the same `scan`. |
| `task.lock.json` | Lock written by `select`: the 6 selected tools, 786 estimated schema tokens. |
| `cli-output.txt` | Captured stdout and exit codes of each command, in order. |
| `reproduce.sh` | Installs the pinned versions in a scratch folder and reruns the commands. |

## Sanitizing

Two local values were replaced with placeholders, in the config and in each
lock's `source_manifest`, and nothing else was changed: `<SP>` for the scratch
folder that held the installs and the run, and `<node>` for the local Node.js
binary (v24.13.1). `config_fingerprint` in both locks is the value the tool
computed from the real paths, so recomputing it from the template gives a
different value. Both locks carry the same fingerprint because they came from
the same config.

## Limits

Token counts come from the tool's own estimator, `chars_div_4_v1`
(characters divided by four). They are not a provider tokenization, and they
say nothing about model quality, latency or cost. The counts hold for the
pinned server versions above; a server release can change them.

Selection is keyword ranking. `everything/trigger-list-changed` comes from the
reference test server and matched the word "changed" in the task. The tool
proposes a set; a person reviews the lock.

`tests/live-run.test.mjs` fails the build if the terminal shows a count,
selected tool or output line that these files do not record.
