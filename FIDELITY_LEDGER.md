# Fidelity Ledger

## 2026-06-02 asset-based refinement

### Source of truth
- Concept reference: `concept-reference.png`
- Rendered desktop screenshot: `qa-assets-desktop-1680.png` at `1680x960`
- Rendered mobile screenshot: `qa-assets-mobile-390.png` at `390x1100` viewport

### Material fixes made
1. Replaced the previous pure-CSS feel with project-local generated bitmap assets:
   - `assets/eldritch-bg.png`
   - `assets/parchment.png`
   - `assets/seal-book.png`
   - `assets/seal-mountain.png`
   - `assets/seal-wave.png`
   - `assets/seal-star.png`
2. Fixed the parchment internal layout bug: `.featured-scroll > :not(.scroll-asset)` had higher specificity than `.scroll-copy` / `.ribbon`, causing the manuscript text to be offset like normal flow instead of pinned inside the parchment. The selectors now explicitly target `.featured-scroll .ribbon` and `.featured-scroll .scroll-copy`.
3. Moved and scaled the hero block closer to the concept: smaller display title, tighter lead text, and earlier vertical placement.
4. Reduced parchment width and restored a clear gap between the CTA and parchment.
5. Shifted the right timeline rail toward the concept centerline and tightened timeline columns/seals.

### Browser evidence
- Desktop layout metrics after fix:
  - CTA bottom: `556px`
  - Parchment top: `580px`
  - CTA-to-parchment gap: `25px`
  - Parchment right edge: `958px`
  - Timeline rail container x: `993px`
  - Horizontal overflow: `false`
- Mobile layout metrics after fix:
  - Viewport: `390x1100`
  - Document height: `2449px`
  - Horizontal overflow: `false`
  - Parchment top: `565px`
  - Timeline top: `1238px`
- Asset loading check: all five `<img>` assets reported `complete: true` with natural dimensions.

### Comparison points checked
1. **Signature mood**: concept's dark teal abyss, occult charts, tentacles, and central Cthulhu silhouette are now carried by the generated background asset instead of rough CSS overlays.
2. **Hero hierarchy**: title now sits higher and no longer forces the CTA into the parchment layer.
3. **Parchment treatment**: the manuscript is a real generated torn-paper asset with aged texture and illustration, not a flat CSS panel.
4. **Parchment text placement**: the document title, metadata, body, and link are now anchored inside the right half of the manuscript as in the concept.
5. **Timeline anatomy**: the vertical brass rail is closer to the concept centerline; year/title/seal rhythm is preserved.
6. **Generated seals**: right-side archive marks use real image assets rather than CSS circles.
7. **Responsive behavior**: mobile has no horizontal overflow and keeps the hero → CTA → manuscript → timeline story order.

### Remaining intentional deviations
- Chinese text is code-native for readability/accessibility; only decorative manuscript, background, and seals are raster assets.
- Mobile uses a stacked editorial layout rather than trying to squeeze the full desktop split-screen composition into a phone viewport.

## 2026-06-03 complete-site release pass

### Added surface
- Expanded the single-screen concept into a complete static website: library, chronology index, mythos atlas, research/search desk, and open-source project note.
- Added `script.js` for local search, filter chips, random archive selection, and active navigation.
- Added open-source packaging: `README.md`, `LICENSE`, `package.json`, `.gitignore`, `.nojekyll`, `scripts/qa-smoke.mjs`, and QA/deployment docs.

### Verification evidence
- `npm run check`: pass, failures `0`, warnings `0`.
- Browser desktop: `1680x960`, horizontal overflow `false`, console errors/warnings `0`.
- Browser mobile: `390x1100`, horizontal overflow `false`, scroll top `0` after forced top capture.
- Interaction: filter `深海` plus query `印斯茅斯` produced exactly one visible case, `印斯茅斯日记残页`.

### Fidelity conclusion
The first viewport remains faithful to the accepted concept. The additional sections are intentional extensions using the same dark archive palette, brass rules, serif type hierarchy, generated seals, occult geometry, and document-list rhythm.
