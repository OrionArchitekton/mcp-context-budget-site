#!/usr/bin/env bash
# Reproduce the 2026-11-14 (UTC) mcp-context-budget run on the seven MCP reference servers.
# Read-only: starts each server locally over stdio, sends initialize and tools/list, exits.
# SP is any empty scratch folder. Versions are pinned so the counts reproduce.
set -euo pipefail
SP=${SP:?set SP to an empty scratch folder}
cd "$SP"
python3.11 -m venv venv
venv/bin/pip install -q mcp-context-budget==0.4.0
npm install --prefix "$SP/npmsrv" --ignore-scripts --no-audit --no-fund \
  @modelcontextprotocol/server-everything@2.3.0 @modelcontextprotocol/server-filesystem@2.3.0 \
  @modelcontextprotocol/server-memory@2.1.1 @modelcontextprotocol/server-sequential-thinking@2.1.1
uv venv -q -p 3.11 "$SP/pysrv"
VIRTUAL_ENV="$SP/pysrv" uv pip install -q mcp-server-git==2026.11.11 mcp-server-time==2026.11.11 mcp-server-fetch==2026.11.11
mkdir -p run/allowed run/repo run/memstore && git -C run/repo init -q
sed -e "s#<SP>#$SP#g" -e "s#<node>#$(command -v node)#g" "$(dirname "$0")/mcp.template.json" > run/mcp.json
cd run
M=../venv/bin/mcp-context-budget
O="--config mcp.json --allow-start --start-timeout-seconds 20 --max-stdio-bytes 1048576"
$M scan $O --out scan.report.md --lock-out scan.lock.json            # expect SCAN_TOOLS=60 SCHEMA_TOKENS=11061
$M check --lock scan.lock.json --max-schema-tokens 4000 || echo "rc=$? (expected 1)"
$M select $O --task "review the unstaged git diff and read the changed file" \
  --max-tools 6 --max-schema-tokens 4000 --out-lock task.lock.json  # expect 6 tools, 786
$M check --lock task.lock.json --max-schema-tokens 4000             # expect PASS, rc 0
$M check --lock task.lock.json --max-schema-tokens 4000 --require-tool filesystem/read_text_file || echo "rc=$? (expected 1)"
