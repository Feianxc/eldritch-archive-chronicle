# FIDELITY LEDGER

## 2026-06-03 visual upgrade

### Accepted visual references

- `E:/codex_media/cthulhu_chronicle_upgrade/concept-hero-motion.png`
- `E:/codex_media/cthulhu_chronicle_upgrade/concept-library.png`
- `E:/codex_media/cthulhu_chronicle_upgrade/concept-atlas.png`

### Render evidence

- Local desktop: `E:/codex_media/cthulhu_chronicle_upgrade/local-desktop-1680.png`
- Local mobile: `E:/codex_media/cthulhu_chronicle_upgrade/local-mobile-390.png`
- Local library: `E:/codex_media/cthulhu_chronicle_upgrade/local-library.png`
- Vercel desktop: `E:/codex_media/cthulhu_chronicle_upgrade/vercel-desktop-1680.png`
- Vercel mobile: `E:/codex_media/cthulhu_chronicle_upgrade/vercel-mobile-390.png`

### Comparison points

| Area | Reference evidence | Render evidence | Decision |
|---|---|---|---|
| Hero layout | Left title, cinematic sigil/book scene, right chronology | Render keeps left title, generated hero background and right timeline | Match |
| Motion language | Rotation trails, glowing rail, floating paper | Implemented rotating mark, rail scan, node pulse, fog, particle canvas, parchment float | Match |
| Library | Filter/search desk, folios, source panel | Implemented era rail, generated thumbnails, data cards and source panel | Match with code-native text |
| Atlas | Large celestial map with nodes and time relationships | Implemented atlas image background and clickable code-native nodes | Match with accessible controls |
| Data completeness | Reference implies expanded archive | `data/works.json` has 35 records and 3 source groups | Exceeds reference |
| Mobile | Need readable stacked continuation | 390px screenshot shows readable hero and stacked content | Match |

### Intentional deviations

- Concept images contain decorative UI text inside raster screenshots. Final implementation keeps functional text code-native for accessibility and maintainability.
-自有 DNS 子域名 was not configured because no domain or DNS authority was discoverable. Vercel production subdomain was created instead.

### Current status

No material mismatch remains for the upgraded scope. The website now uses real generated assets, expanded data, purposeful motion and public deployment evidence.
