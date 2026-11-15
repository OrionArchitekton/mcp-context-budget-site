import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const evidence = (name) => new URL('../demos/live-run/' + name, import.meta.url);
const lock = (name) => JSON.parse(readFileSync(evidence(name), 'utf8'));

// The Demo terminal is the only <pre> on the page. Strip tags and React text
// separators so each rendered line can be matched as plain text.
function terminalLines() {
  const pre = html.match(/<pre\b[^>]*>([\s\S]*?)<\/pre>/)?.[1];
  assert.ok(pre, 'initial HTML must include the Demo terminal');
  return pre
    .replace(/<!--[\s\S]*?-->/g, '')
    .split(/<[^>]+>/)
    .map((s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#x27;/g, "'").trim())
    .filter(Boolean);
}

test('the Demo terminal shows only numbers recorded in the committed live-run locks', () => {
  for (const name of ['README.md', 'mcp.template.json', 'scan.lock.json', 'task.lock.json', 'cli-output.txt']) {
    assert.ok(existsSync(evidence(name)), 'demos/live-run/' + name + ' must be committed');
  }
  const scan = lock('scan.lock.json');
  const task = lock('task.lock.json');
  assert.equal(scan.config_fingerprint, task.config_fingerprint, 'both locks must come from the same config');
  const lines = terminalLines();
  for (const expected of [
    `SCAN_SERVERS=${scan.server_count}`,
    `SCAN_TOOLS=${scan.tool_count}`,
    `SCHEMA_TOKENS=${scan.total_schema_tokens}`,
    `SELECTED_SCHEMA_TOKENS=${scan.selected_schema_tokens}`,
    `SELECTED_TOOLS=${task.selected_tools.length}`,
    `AFTER_SCHEMA_TOKENS=${task.selected_schema_tokens}`,
    `SELECTED_SCHEMA_TOKENS=${task.selected_schema_tokens}`,
  ]) {
    assert.ok(lines.includes(expected), `terminal must show ${expected} from the lock`);
  }
  const shownTools = lines.filter((l) => l.startsWith('SELECTED_TOOL=')).map((l) => l.slice('SELECTED_TOOL='.length));
  assert.deepEqual(shownTools, task.selected_tools, 'selected tools must match task.lock.json, in order');
  const output = readFileSync(evidence('cli-output.txt'), 'utf8');
  for (const line of lines.filter((l) => /^[A-Z_]+=/.test(l))) {
    assert.ok(output.includes(line), `terminal output line "${line}" must appear in the captured cli-output.txt`);
  }
});

test('the Demo terminal names the pinned servers and is labelled apart from the synthetic video', () => {
  const text = terminalLines().join('\n');
  for (const pin of [
    'everything 2.3.0',
    'filesystem 2.3.0',
    'memory 2.1.1',
    'sequential-thinking 2.1.1',
    'git 2026.11.11',
    'time 2026.11.11',
    'fetch 2026.11.11',
  ]) {
    assert.ok(text.includes(pin), `terminal must name the pinned server version "${pin}"`);
  }
  assert.match(text, /separate live run, not the synthetic/);
  assert.match(text, /demos\/live-run/);
});
