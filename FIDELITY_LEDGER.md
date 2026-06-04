# FIDELITY LEDGER

## 2026-06-04 relationship and data expansion

### Accepted visual references

- `E:/codex_media/cthulhu_chronicle_upgrade/concept-hero-motion.png`
- `E:/codex_media/cthulhu_chronicle_upgrade/concept-library.png`
- `E:/codex_media/cthulhu_chronicle_upgrade/concept-atlas.png`
- `E:/codex_media/cthulhu_chronicle_next/concept-network-bg.png`

### Render evidence

- Local desktop: `E:/codex_media/cthulhu_chronicle_next/local-desktop-1680.png`
- Local mobile: `E:/codex_media/cthulhu_chronicle_next/local-mobile-390.png`
- Local relationship network: `E:/codex_media/cthulhu_chronicle_next/browser-local-network-all-v3.png`
- Local deep-sea network filter: `E:/codex_media/cthulhu_chronicle_next/browser-local-network-deepsea-v2.png`
- Public Vercel desktop: `E:/codex_media/cthulhu_chronicle_next/public-vercel-desktop-playwright.png`
- Public Vercel mobile: `E:/codex_media/cthulhu_chronicle_next/public-vercel-mobile-playwright.png`

### Comparison points

| Area | Reference evidence | Render evidence | Decision |
|---|---|---|---|
| Hero layout | Left title, cinematic sigil/book scene, right chronology | Render keeps left title, generated hero background and right timeline | Match |
| Motion language | Rotation trails, glowing rail, floating paper | Implemented rotating mark, rail scan, node pulse, fog, particle canvas, parchment float | Match |
| Library | Filter/search desk, folios, source panel | Implemented era rail, generated thumbnails, publication details, aliases, full-text links and source panel | Exceeds reference |
| Atlas | Large celestial map with nodes and time relationships | Implemented atlas image background and clickable code-native nodes | Match with accessible controls |
| Relationship network | Generated observatory concept has brass nodes, edge lines and archive background | Implemented generated background, SVG nodes/edges, relation filters, detail panel and card locating | Match with code-native labels |
| Data completeness | Reference implies expanded archive | `data/works.json` has 35 records, 6 source groups, 35 publication entries, 35 full-text links, 2 collaborator/credit notes and 33 edges | Exceeds reference |
| Mobile | Need readable stacked continuation | 390px screenshot shows readable hero and stacked content | Match |

### Intentional deviations

- Concept images contain decorative text-like marks inside raster scenes. Final implementation keeps functional labels and controls code-native for accessibility and maintainability.
- The default full network view suppresses most labels until a node is selected or filtered, to avoid dense label collisions while preserving all 33 relationship edges.

### Current status

No material mismatch remains for the upgraded scope. The website now uses real generated assets, expanded bibliographic data, purposeful motion, a working relationship graph and deployable custom-domain configuration. Vercel and GitHub Pages are public; the custom domain is waiting on the external DNS record described in `docs/deployments/20260604-vercel-eldritch-subdomain.md`.
