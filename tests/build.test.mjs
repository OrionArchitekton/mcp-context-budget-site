import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');

test('the product demo is playable and accurately disclosed in initial HTML', () => {
  assert.match(html, /<h1\b[^>]*>mcp-context-budget<\/h1>/);
  assert.match(html, /rel="canonical" href="https:\/\/www\.danmercede\.com\/works\/mcp-context-budget\/"/);
  assert.match(html, /pypi\.org\/project\/mcp-context-budget/);
  const video = html.match(/<video\b[^>]*>[\s\S]*?<\/video>/)?.[0];
  assert.ok(video, 'initial HTML must include the playable product demo');
  assert.match(video, /\bcontrols\b/);
  assert.match(video, /\bplaysinline\b/i);
  assert.match(video, /preload="none"/);
  assert.doesNotMatch(video, /\bautoplay\b/);
  const track = video.match(/<track\b[^>]*>/)?.[0];
  assert.ok(track, 'demo must include a captions track');
  assert.match(track, /kind="captions"/);
  assert.match(track, /srclang="en"/i);
  assert.match(track, /src="\/works\/mcp-context-budget\/media\/[^"?#]+\.vtt"/);
  assert.match(video, /poster="\/works\/mcp-context-budget\/media\/[^"?#]+\.jpg"/);
  const source = video.match(/<source\b[^>]*>/)?.[0];
  assert.ok(source, 'demo must include a playable source');
  assert.match(source, /src="\/works\/mcp-context-budget\/media\/[^"?#]+\.mp4"/);
  assert.match(source, /type="video\/mp4"/);
  const outsidePlayer = html.replace(/<video\b[^>]*>[\s\S]*?<\/video>/g, '');
  assert.match(outsidePlayer, /<a\b[^>]*href="\/works\/mcp-context-budget\/media\/[^"?#]+\.mp4"[^>]*\bdownload\b/,
    'the download fallback must remain available when MP4 playback is unsupported');
  assert.match(html, /bundled synthetic fixture/);
  assert.match(html, /estimated schema tokens/);
  assert.match(html, /synthetic narration/);
  assert.match(html, /<summary\b[^>]*>Read the transcript<\/summary>/);
  assert.match(html, /The selected lock passes/);
  const media = [...html.matchAll(/(?:src|poster)="(\/works\/mcp-context-budget\/media\/[^"?#]+)"/g)].map(m => m[1]);
  for (const extension of ['mp4', 'jpg', 'vtt']) {
    assert.ok(media.some(path => path.endsWith('.' + extension)), extension);
  }
  for (const asset of media) {
    assert.ok(existsSync(new URL('../dist/' + asset.replace('/works/mcp-context-budget/', ''), import.meta.url)), asset);
  }
});
