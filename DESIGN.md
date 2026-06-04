# DESIGN

## Direction
Antique occult archive meets modern digital museum. The page should feel like a literary archive recovered from a deep-sea observatory, not a generic Halloween page.

## Palette
Use OKLCH tokens. Deep black-green body, abyssal teal surfaces, aged parchment highlights, brass accents, foggy jade glows.

## Typography
Serif display for literary gravitas. System sans for readable Chinese UI. Mono only for short archival labels and dates.

## Motifs
Star charts, thin brass rules, manuscript cards, vertical timeline rail, generated seals, generated work thumbnails, atlas wall imagery, relationship-observatory imagery, bibliographic ledger panels, subtle tentacle silhouettes, worn paper textures and restrained occult geometry.

## Motion system
- One cinematic page-load layer: title, manuscript and timeline enter with staggered timing.
- Ambient layer: particle dust, fog drift, rotating star maps and pulsing timeline nodes.
- Interaction layer: work-card tilt, button shimmer, filter state transitions, picked-card highlight, atlas-node glow and relationship-edge emphasis.
- Scroll layer: section and list reveals using IntersectionObserver.
- Accessibility: `prefers-reduced-motion` disables ambient and transform-heavy motion.

## Responsive approach
Desktop preserves the concept split-screen hero. Tablet and mobile stack the story as cover, manuscript, timeline, library, atlas, relationship graph, bibliographic index, search, source note and project note.

## Fidelity references used in the visual upgrade
- `E:/codex_media/cthulhu_chronicle_upgrade/concept-hero-motion.png`
- `E:/codex_media/cthulhu_chronicle_upgrade/concept-library.png`
- `E:/codex_media/cthulhu_chronicle_upgrade/concept-atlas.png`
- `E:/codex_media/cthulhu_chronicle_next/concept-network-bg.png`
