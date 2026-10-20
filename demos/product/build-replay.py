"""Build a readable editorial replay from saved output of the published CLI."""
from pathlib import Path
import html
import json
import shlex

root = Path(__file__).parent
evidence = json.loads((root / 'cli-evidence.json').read_text())['commands']

def terminal(name):
    row = evidence[name]
    command = shlex.join(row['argv']).replace(' --', ' \\\n  --')
    return '<pre><span class="cmd">$ ' + html.escape(command) + '</span>\n\n' + html.escape('\n'.join(row['stdout'].splitlines()[:2])+'\n' if name=='select' else row['stdout']) + '\n<span class="exit">exit ' + str(row['exit_code']) + '</span></pre>'

scenes = [
    ('problem', 'Your tool list has a budget.', 'Measure the surface before the task starts.', terminal('fail')),
    ('scan', 'Start with the full catalog.', 'Five servers. 120 tools. A deliberately oversized fixture.', terminal('scan')),
    ('select', 'Keep the tools for this task.', 'Issue triage: five selected tools, under a 6,000-token cap.', terminal('select')),
    ('enforce', 'Make the budget a CI gate.', 'The same cap accepts the selected lock and rejects the full catalog.', '<div class="split"><div><h3>SELECTED LOCK</h3>'+terminal('pass')+'</div><div><h3>FULL CATALOG</h3>'+terminal('fail')+'</div></div>'),
    ('try', 'Try the bundled demo.', 'Local CLI. Static fixtures. No API calls.', '<pre><span class="cmd">$ pip install mcp-context-budget==0.4.0\n\n$ mcp-context-budget demo \\\n  --task "triage a GitHub issue and update one ticket" \\\n  --max-tools 8 \\\n  --max-schema-tokens 6000 \\\n  --max-response-tokens 4000</span></pre><p class="destination">danmercede.com/works/mcp-context-budget/</p>'),
]
body=''.join('<section id="'+key+'"><div class="eyebrow">'+str(i+1).zfill(2)+' / MCP-CONTEXT-BUDGET</div><h1>'+title+'</h1><p class="intro">'+sub+'</p>'+content+'</section>' for i,(key,title,sub,content) in enumerate(scenes))
page='''<!doctype html><html lang="en"><meta charset="utf-8"><title>MCP context budget: recorded CLI demo</title><style>
*{box-sizing:border-box}body{margin:0;width:1920px;height:1080px;background:#0b1721;color:#f5f5f0;font-family:Arial,sans-serif;padding:70px 100px}header{display:flex;justify-content:space-between;font:18px monospace;color:#b6c1c5;letter-spacing:2px}header strong{color:#e8a96a}section{display:none;margin-top:66px}.eyebrow{font:18px monospace;letter-spacing:3px;color:#e8a96a}h1{font-size:66px;letter-spacing:-2px;margin:20px 0 16px;line-height:1.1}.intro{font-size:27px;color:#c6d1d6;margin:0 0 30px}pre{background:#14242f;border:1px solid #344854;border-radius:12px;padding:24px 30px;font:30px/1.3 'DejaVu Sans Mono',monospace;white-space:pre-wrap;margin:0;color:#a5e1cb}.cmd{color:#f0f2ed}.exit{color:#b4c6d0;font-size:21px}.split{display:grid;grid-template-columns:1fr 1.25fr;gap:24px}.split pre{font-size:26px;min-height:330px}.split h3{font:19px monospace;color:#b6c1c5}.destination{font:28px monospace;color:#e8a96a;margin-top:30px}footer{position:absolute;left:100px;right:100px;bottom:130px;font:18px/1.5 monospace;color:#adbdc5;border-top:1px solid #344854;padding-top:16px}
</style><header><strong>DM / DAN MERCEDE</strong><span>OPEN SOURCE / v0.4.0 / MIT</span></header>'''+body+'''<footer>RECORDED CLI OUTPUT EXCERPTS / BUNDLED SYNTHETIC FIXTURE / TOKEN ESTIMATES, NOT A PROVIDER BENCHMARK<br>Edited replay of real commands. No hosted MCP servers or model calls.</footer><script>const scene=new URLSearchParams(location.search).get('scene')||'problem';document.getElementById(scene).style.display='block';</script></html>'''
(root/'index.html').write_text(page)
