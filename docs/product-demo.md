# Product demo provenance

The 44.6-second recording uses the published v0.4.0 package and its bundled
synthetic fixture. Actual scan, select and check commands supply the replay;
their captured outputs and exit codes are in `demos/product/cli-evidence.json`.
The selected five-tool lock passes a 6,000 estimated-schema-token cap. The full
120-tool catalog fails that same cap with exit 1. The oversized fixture is not
a provider tokenization, model-quality, latency or cost-savings benchmark.

Agent-demo-video produces the final narrated, captioned 1920 by 1080 MP4 at
30 fps. Narration is synthesized locally based on Dan's voice and word-aligned
locally. The page discloses the synthetic voice, fixture and edited replay.
The public recipe contains the script, replay generator, captured output and a
portable config example. Voice references and private provider settings are not
public assets. See `demos/product/README.md` for reproduction.

The delivered MP4 SHA-256 is
`6f788dd2b596ccde54bfdf773f1fa59b9f7cf38c4659c20a7e592eb9c0e86882`.
`demos/product/media-manifest.json` records the probed format and caption count.
The complete delivered file was decoded successfully. Those technical checks do
not establish listening/creative acceptance or final public playback.

The native player, poster, English captions and transcript appear in both the
initial HTML and React page. Source and installation CTAs are preserved. See
`docs/runbooks/product-demo.md` for rollout, playback checks and rollback.

Review this recording against later releases and reuse it while accurate.
Refresh for material workflow, install, support-boundary or CTA changes. Preserve
prior recordings and failed renders. Additional channel publication is a
separate action from microsite preparation.

The automatic full-film transcript check flags the sentence spelling out 2,934.
Its raw final transcript contains the same number as digits, while the per-shot
word alignment contains the spoken number words. These observations support a
recognizer normalization warning rather than omitted narration. The original
warning is retained in the render evidence; listening acceptance is separate.

The raw pipeline render is preserved separately. Delivery normalizes its audio
toward -16 LUFS and -1.5 dBTP, copying the video stream and preserving caption
timing. The media manifest binds both source-render and delivered-file hashes.
