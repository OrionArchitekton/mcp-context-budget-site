import { ProductData } from './types';

const GITHUB = 'https://github.com/OrionArchitekton/mcp-context-budget';
const RELEASE = 'https://github.com/OrionArchitekton/mcp-context-budget/releases/tag/v0.3.0';

/**
 * Single source of truth for the mcp-context-budget microsite.
 *
 * All install/usage/demo content is GROUNDED in the real tool repo
 * (README.md, CHANGELOG.md, cli.py, pyproject.toml as of v0.3.0). The tool is
 * GitHub-release / Docker only — NOT on PyPI — so the quickstart never claims a
 * `pip install mcp-context-budget` PyPI command.
 */
export const PRODUCT_DATA: ProductData = {
  name: 'mcp-context-budget',
  tagline:
    'Measure and enforce MCP tool-surface budgets before your coding agent starts.',
  credibility:
    'Open source (MIT) · Local-first · Dependency-free core · CI-enforceable.',
  canonical: 'https://mcp-context-budget.danmercede.com/',
  metaDescription:
    'mcp-context-budget is a local-first, MIT-licensed CLI that measures the token budget each MCP server adds to your coding agent, selects a lean tool set, and fails CI when the tool surface exceeds budget.',

  problem: {
    heading: 'The problem',
    body:
      "MCP servers quietly inflate an agent's tool surface — many tools, thousands of tokens of schemas — bloating context, slowing runs, and raising cost before the agent does any real work, with no static way to see or cap it.",
  },

  whatItDoes: {
    heading: 'What it does',
    body:
      'A local-first CLI that scans your MCP config, measures the token budget each server and tool adds, selects a lean task-relevant tool set, and ENFORCES it in CI — failing the build when the surface exceeds budget. No runtime service, no proxy, nothing leaves your machine.',
  },

  cta: {
    primaryLabel: 'View on GitHub',
    primaryUrl: GITHUB,
    secondaryLabel: 'Read the v0.3.0 release notes',
    secondaryUrl: RELEASE,
  },

  quickstart: {
    heading: 'Quickstart',
    intro:
      'Not on PyPI — install from source or run the Docker image. The core CLI has no external runtime dependency.',
    blocks: [
      {
        title: 'Install from source',
        note: 'Requires Python 3.11+',
        command: [
          'git clone https://github.com/OrionArchitekton/mcp-context-budget',
          'cd mcp-context-budget',
          'python3.11 -m venv .venv && . .venv/bin/activate',
          "pip install -e '.[dev]'",
        ].join('\n'),
      },
      {
        title: 'Prove the spine (no config required)',
        command: [
          'mcp-context-budget demo \\',
          '  --task "triage a GitHub issue and update one ticket" \\',
          '  --max-tools 8 \\',
          '  --max-schema-tokens 6000 \\',
          '  --max-response-tokens 4000',
        ].join('\n'),
      },
      {
        title: 'Or run it via Docker',
        command: [
          'docker build -t mcp-context-budget:local .',
          'docker run --rm mcp-context-budget:local demo \\',
          '  --task "triage a GitHub issue" \\',
          '  --max-tools 8 --max-schema-tokens 6000 --max-response-tokens 4000',
        ].join('\n'),
      },
    ],
  },

  // Command surface verified against mcp_context_budget/cli.py subparsers (v0.3.0).
  commands: [
    {
      name: 'scan',
      description:
        'Estimate schema and response-token cost from an MCP config or tools/list fixture; emit a report and a lockfile.',
    },
    {
      name: 'select',
      description:
        'Pick a smaller task-relevant tool set with deterministic SQLite FTS5/BM25 ranking, under max-tools and max-schema-tokens.',
    },
    {
      name: 'semantic-select',
      description:
        'Rank tools by embedding similarity (deterministic fixture mode, or optional local Ollama) before applying the budget caps.',
    },
    {
      name: 'check',
      description:
        'Re-validate a lockfile against schema and response budgets — the CI gate that fails the build on a regression.',
    },
    {
      name: 'compress-responses',
      description:
        'Deterministically compress recorded response fixtures under a response budget, with before/after proof.',
    },
    {
      name: 'config-apply',
      description:
        'Turn a selected-tool lock into a safe local MCP config patch — dry-run by default, write requires --write and makes a backup.',
    },
    {
      name: 'config-audit',
      description:
        'Read-only hygiene check that flags plaintext secrets in MCP config files without ever printing the values.',
    },
    {
      name: 'export',
      description:
        'Export the budget result (e.g. SARIF) for code-scanning and CI surfacing.',
    },
  ],

  demo: {
    heading: 'Demo',
    intro:
      'A scan measures the surface, select trims it under budget, the result is written to a lockfile, and check fails the build when the surface regresses past the cap.',
    lines: [
      { kind: 'comment', text: '# 1. Measure the current MCP tool surface' },
      {
        kind: 'command',
        text: 'mcp-context-budget scan --tool-list tools.json --lock-out mcp-budget.lock.json',
      },
      { kind: 'output', text: 'CATALOG_SERVERS=5   CATALOG_TOOLS=120' },
      { kind: 'output', text: 'SCHEMA_TOKENS=18,420   RESPONSE_TOKENS=9,310', tone: 'muted' },
      { kind: 'output', text: '' },
      { kind: 'comment', text: '# 2. Select a lean task-relevant tool set under budget' },
      {
        kind: 'command',
        text: 'mcp-context-budget select --tool-list tools.json \\',
      },
      {
        kind: 'command',
        text: '  --task "triage a GitHub issue" --max-tools 8 \\',
      },
      {
        kind: 'command',
        text: '  --max-schema-tokens 6000 --out-lock mcp-budget.lock.json',
      },
      { kind: 'output', text: 'SELECTED_TOOLS=8   AFTER_SCHEMA_TOKENS=5,740' },
      { kind: 'output', text: 'wrote mcp-budget.lock.json', tone: 'muted' },
      { kind: 'output', text: '' },
      { kind: 'comment', text: '# 3. Enforce the budget in CI' },
      {
        kind: 'command',
        text: 'mcp-context-budget check --lock mcp-budget.lock.json \\',
      },
      {
        kind: 'command',
        text: '  --max-schema-tokens 6000 --max-response-tokens 4000',
      },
      { kind: 'output', text: 'BUDGET_STATUS=PASS', tone: 'ok' },
      { kind: 'output', text: '' },
      { kind: 'comment', text: '# ...later, someone adds three more MCP servers. CI re-runs check:' },
      { kind: 'output', text: 'SCHEMA_TOKENS=7,980 exceeds --max-schema-tokens 6000' },
      { kind: 'output', text: 'BUDGET_STATUS=FAIL  (exit 1 — build blocked)', tone: 'fail' },
    ],
  },

  differentiators: {
    heading: 'Why it is different',
    points: [
      {
        title: 'Local-first',
        body:
          'No runtime service, no proxy, no hosted dashboard. The CLI runs on your machine and nothing leaves it. Semantic ranking can optionally call a local Ollama — only when you explicitly ask for it.',
      },
      {
        title: 'Dependency-free core',
        body:
          'The core package ships with zero Python dependencies. It scans, measures, selects, and enforces using the standard library — easy to vendor, audit, and trust in a build pipeline.',
      },
      {
        title: 'CI-enforceable',
        body:
          'A lockfile plus a check command turns "our context is bloated" into a build gate. The check exits non-zero when the schema or response budget regresses, so the surface stops growing silently.',
      },
      {
        title: 'Honest, never a false PASS',
        body:
          'config-apply binds each lock to its config by fingerprint and reports PARTIAL (not a fake PASS) when a command-discovered server cannot be statically enforced. Secret audits redact values; reports never print literal secrets.',
      },
    ],
  },

  links: [
    { label: 'GitHub repository', url: GITHUB, primary: true },
    { label: 'v0.3.0 release notes', url: RELEASE, primary: true },
    { label: 'Dan Mercede', url: 'https://www.danmercede.com' },
  ],

  footerNote: 'MIT licensed. Built by Dan Mercede.',
};
