# Release QA: Eldritch Archive Chronicle

Date: 2026-06-03

## Local smoke check

Command:

```bash
npm run check
```

Result: pass

Report file: `docs/qa/smoke-report.json`

## Browser verification

Target URL: `http://127.0.0.1:4173/index.html`

Browser path: local browser automation pass.

### Checks

| Check | Result | Evidence |
|---|---:|---|
| Page identity | Pass | Title: `不可名状作品编年史 | Eldritch Archive` |
| Not blank | Pass | DOM contained hero and `完整文献库` content |
| Framework overlay | Pass | Static site, no overlay detected |
| Console health | Pass | Browser warning/error log list was empty |
| Desktop layout | Pass | `1680x960`, horizontal overflow `false` |
| Mobile layout | Pass | `390x1100`, horizontal overflow `false`, scroll top `0` |
| Asset loading | Pass | All rendered image assets reported `complete: true` |
| Interaction | Pass | Filter `深海` + query `印斯茅斯` returned one visible case: `印斯茅斯日记残页` |

## Screenshots

- Desktop: `qa-release-desktop-1680.png`
- Interaction: `qa-release-interaction.png`
- Mobile: `qa-release-mobile-390.png`

User-visible copies are also available under `E:/codex_media/cthulhu_chronicle_release/`.

## Fidelity notes

Compared against `concept-reference.png` in the same QA pass. The release keeps the concept's dark teal archive atmosphere, large serif hero title, torn manuscript card, central brass rail, right-side timeline rhythm, and generated occult seal imagery. Downstream sections intentionally extend the concept into a complete static website while preserving the same palette, typography, rail/list anatomy, and generated-asset treatment.

## Remaining intentional deviations

- Downstream library, chronology, mythos, research, and about sections are designed extensions, not present in the original single-screen concept.
- Mobile stacks the composition for readability rather than forcing the desktop split-screen into a narrow viewport.

## Mobile fix pass

After public mobile screenshot review, the narrow header action and parchment copy scale were tightened for `390px` viewports.

Evidence from Browser local mobile pass:

- `.enter` right edge: `361px` inside a `390px` viewport
- `.scroll-copy` right edge: `336px` inside a `390px` viewport
- Horizontal overflow: `false`
- Screenshot: `E:/codex_media/cthulhu_chronicle_release/mobile-fix-local.png`
