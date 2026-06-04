# 2026-06-04 Vercel production and eldritch.feian.online DNS record

## Status

The site is deployed and verified on the Vercel production alias and GitHub Pages.

- Vercel production alias: <https://cthulhu-chronicle-demo.vercel.app>
- GitHub Pages: <https://feianxc.github.io/eldritch-archive-chronicle/>
- Target custom domain: <https://eldritch.feian.online>

The target custom domain has now been added to the Vercel project and appears in Vercel alias listings, but it is not live yet because the DNS record does not exist at the DNS provider. Certificate issuance cannot complete until DNS points to Vercel.

## Commands run

```bash
npm run check
git push origin main
vercel deploy --prod --yes
vercel domains add eldritch.feian.online
vercel alias set <production-deployment-url> eldritch.feian.online
vercel alias ls
vercel domains inspect eldritch.feian.online
Resolve-DnsName eldritch.feian.online
```

## Vercel-side result

- `vercel domains add eldritch.feian.online` succeeded.
- `vercel alias ls` shows `eldritch.feian.online` assigned to the latest production deployment.
- `vercel alias set ... eldritch.feian.online` still ends with a certificate issuance response error while DNS is absent.
- `vercel domains inspect eldritch.feian.online` continues to report the required DNS record below.

## Verified artifacts

- Vercel production alias HTTP: `200`
- Vercel `data/works.json` HTTP: `200`
- GitHub Pages build status: `built`
- GitHub Pages public HTTP: `200`
- Public index contains the relationship network section and cache-busted `20260604a` CSS/JS references.

## DNS requirement for eldritch.feian.online

Vercel reported the required DNS record:

```text
Type: A
Name: eldritch
Value: 76.76.21.21
Proxy: DNS only / unproxied is recommended for Vercel verification
```

Current DNS lookup result:

```text
Resolve-DnsName eldritch.feian.online
DNS name does not exist / NXDOMAIN
```

HTTP/HTTPS requests to `eldritch.feian.online` are therefore not valid site-verification evidence yet. Any 502 seen through a local proxy is not an origin response from the deployed site.

## Public QA screenshots

- `E:/codex_media/cthulhu_chronicle_next/public-vercel-desktop-playwright.png`
- `E:/codex_media/cthulhu_chronicle_next/public-vercel-mobile-playwright.png`

## Next verification after DNS is added

```bash
vercel alias set <latest-production-deployment-url> eldritch.feian.online
vercel domains inspect eldritch.feian.online
Resolve-DnsName eldritch.feian.online
Invoke-WebRequest https://eldritch.feian.online/
Invoke-WebRequest https://eldritch.feian.online/data/works.json
```