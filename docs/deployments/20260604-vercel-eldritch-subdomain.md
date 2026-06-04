# 2026-06-04 Vercel production and eldritch.feian.online DNS record

## Status

The site is deployed and verified on the Vercel production alias and GitHub Pages.

- Vercel production alias: <https://cthulhu-chronicle-demo.vercel.app>
- GitHub Pages: <https://feianxc.github.io/eldritch-archive-chronicle/>
- Target custom domain: <https://eldritch.feian.online>

The target custom domain is not live yet because the DNS record does not exist at the DNS provider.

## Commands run

```bash
npm run check
git push origin main
vercel deploy --prod --yes
vercel alias set https://cthulhu-chronicle-demo-84s12rga0-feians-projects.vercel.app eldritch.feian.online
vercel domains inspect eldritch.feian.online
```

## Verified artifacts

- Commit: `6574492b2c0fd8d0e4fe04c53d22b8913c65f87e`
- Vercel production alias HTTP: `200`
- Vercel `data/works.json` HTTP: `200`
- GitHub Pages build status: `built`
- GitHub Pages build commit: `6574492b2c0fd8d0e4fe04c53d22b8913c65f87e`
- GitHub Pages public HTTP: `200`

## DNS requirement for eldritch.feian.online

Vercel reported the required DNS record:

```text
Type: A
Name: eldritch
Value: 76.76.21.21
Proxy: DNS only / unproxied is recommended for Vercel verification
```

Current DNS lookup for `eldritch.feian.online` returned no record, so HTTPS validation cannot complete yet.

## Public QA screenshots

- `E:/codex_media/cthulhu_chronicle_next/public-vercel-desktop-playwright.png`
- `E:/codex_media/cthulhu_chronicle_next/public-vercel-mobile-playwright.png`

## Notes

The Vercel unique deployment URL required authorization in this workspace, but the production alias is public and verified. The custom domain should be retested after the DNS record is added.