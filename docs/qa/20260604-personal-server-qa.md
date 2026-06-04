# 2026-06-04 Personal Server QA

## Target

- URL: <https://blog.feian.online/eldritch/>
- Viewports: desktop `1440x1100`, mobile `390x900`

## Static smoke check

```text
npm run check
filesChecked=18
worksChecked=35
sourceCount=6
failures=[]
warnings=[]
```

## Server checks

```text
SSH alias: feian-personal
Service: eldritch-archive-static.service active
Tunnel: cloudflared-personal-blog.service active
Local route: http://127.0.0.1:8089/eldritch/ HTTP 200
Public route: https://blog.feian.online/eldritch/ HTTP 200
Data route: https://blog.feian.online/eldritch/data/works.json -> works=35, sources=6, edges=33
```

## Browser QA

```json
{
  "url": "https://blog.feian.online/eldritch/",
  "title": "不可名状作品编年史 | Eldritch Archive",
  "h1": "不可名状作品编年史",
  "workCards": 35,
  "visibleWorkCards": 35,
  "publicationCards": 8,
  "collaborationCards": 3,
  "aliasRows": 12,
  "networkEdges": 33,
  "sourceItems": 6,
  "searchInputExists": true,
  "horizontalOverflow": false,
  "hasFrameworkOverlay": false,
  "consoleEvents": [],
  "pageErrors": [],
  "badResponses": []
}
```

Interaction proof:

```json
{
  "query": "疯狂山脉",
  "visibleWorkCards": 1,
  "caseTextIncludesMountains": true,
  "firstVisibleTitle": "疯狂山脉"
}
```

Mobile proof:

```json
{
  "width": 390,
  "horizontalOverflow": false,
  "workCards": 35,
  "title": "不可名状作品编年史 | Eldritch Archive"
}
```

Screenshots were captured outside the repository:

```text
E:\codex_media\cthulhu_chronicle_next\server-public-desktop.png
E:\codex_media\cthulhu_chronicle_next\server-public-mobile.png
```

