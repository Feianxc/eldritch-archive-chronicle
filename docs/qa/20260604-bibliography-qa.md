# 2026-06-04 Bibliographic Index QA

## Scope

Added a bibliographic index room that exposes three research surfaces from the existing work data:

- publication venue constellation
- collaboration and credit dossier
- title alias crosswalk

## Local command check

```bash
npm run check
```

Result: pass

```json
{
  "worksChecked": 35,
  "sourceCount": 6,
  "failures": [],
  "warnings": []
}
```

## Browser interaction check

Target: `http://127.0.0.1:5178/?v=20260604b`

Observed state:

- bibliography section exists
- main navigation links to `#bibliography`
- publication cards: 8
- collaboration cards: 2
- alias rows: 12
- work cards remain: 35
- network edges remain: 33
- source items remain: 6
- horizontal overflow: false
- browser warning/error logs: none

## Evidence

- Local bibliographic index screenshot: `E:/codex_media/cthulhu_chronicle_next/local-bibliography-browser-full.png`