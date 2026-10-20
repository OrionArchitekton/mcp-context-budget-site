# MCP context budget: scan, select, enforce

Recorded CLI output from the published v0.4.0 package. All inputs are the bundled
synthetic fixture. Token counts are estimates, not provider benchmarks. The page
is an editorial replay of captured CLI results, not a product dashboard.

### SHOT problem
- target: terminal
- url: index.html?scene=problem
- narration: Your MCP tool list can crowd the context before an agent starts. This is MCP context budget, a local tool for measuring and enforcing that surface.
- action: goto url="index.html?scene=problem"
- action: wait ms=400

### SHOT scan
- target: terminal
- url: index.html?scene=scan
- narration: I'm using the package's bundled synthetic fixture: five servers and one hundred twenty tools. These are estimated schema tokens, not a provider benchmark.
- action: goto url="index.html?scene=scan"
- action: wait ms=400

### SHOT select
- target: terminal
- url: index.html?scene=select
- narration: For issue triage, select keeps five relevant tools under a six thousand token cap. The selected schemas total two thousand nine hundred thirty four estimated tokens.
- action: goto url="index.html?scene=select"
- action: wait ms=400

### SHOT enforce
- target: terminal
- url: index.html?scene=enforce
- narration: The selected lock passes. The original full catalog fails the same cap and returns a nonzero exit code, so CI can stop the regression.
- action: goto url="index.html?scene=enforce"
- action: wait ms=400

### SHOT try
- target: terminal
- url: index.html?scene=try
- narration: Install from PyPI, try the bundled demo, then scan your own tools. The source and quickstart are linked below.
- action: goto url="index.html?scene=try"
- action: wait ms=400
