# 2026-06-04 Personal Server Deployment

## Public URL

- <https://blog.feian.online/eldritch/>

## Deployment shape

This release uses the existing personal server and the already-active `blog.feian.online` tunnel. No new DNS record was required.

The site is served as a path-mounted static app:

```text
blog.feian.online/eldritch/* -> 127.0.0.1:8089 -> /srv/apps/eldritch-archive/public-root/eldritch
```

## Server paths

```text
/srv/apps/eldritch-archive/releases/20260604-101555
/srv/apps/eldritch-archive/current
/srv/apps/eldritch-archive/public-root/eldritch
```

`/srv/apps/eldritch-archive/current` points to the active release. `/srv/apps/eldritch-archive/public-root/eldritch` points to `current`, so browser-relative asset paths such as `./assets/...`, `./styles.css`, `./script.js` and `./data/works.json` keep working under `/eldritch/`.

## Services

```text
eldritch-archive-static.service
  ExecStart=/usr/bin/python3 -m http.server 8089 --bind 127.0.0.1 --directory /srv/apps/eldritch-archive/public-root

cloudflared-personal-blog.service
  active tunnel for blog.feian.online
```

Cloudflared ingress rule added before the blog root rule:

```yaml
- hostname: blog.feian.online
  path: ^/eldritch(/.*)?$
  service: http://127.0.0.1:8089
```

The previous tunnel config was backed up before editing:

```text
/etc/cloudflared/personal-blog.yml.bak.20260604101632
```

## Artifact

```text
E:\codex_media\cthulhu_chronicle_next\eldritch-site-20260604-server.tar.gz
SHA256 f4ff9893003dff7f251056084bf1987878dc8712d6864f0c1fbb3546cbad4eab
```

## Server verification

```text
eldritch-archive-static.service: active
cloudflared-personal-blog.service: active
local http://127.0.0.1:8089/eldritch/: HTTP 200
public https://blog.feian.online/eldritch/: HTTP 200
public data counts: works=35, sources=6, edges=33
blog root https://blog.feian.online/: HTTP 200
```
