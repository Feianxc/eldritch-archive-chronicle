# 2026-06-03 Vercel 子域名部署记录

## 结论

生产子域名已创建并部署：

- <https://cthulhu-chronicle-demo.vercel.app>

GitHub Pages 原部署仍保留：

- <https://feianxc.github.io/eldritch-archive-chronicle/>

## 命令

```bash
vercel whoami
vercel deploy --prod --yes
```

## 账号与项目

- Vercel scope：`feians-projects`
- Vercel project：`cthulhu-chronicle-demo`
- Production alias：`https://cthulhu-chronicle-demo.vercel.app`

## 部署结果

Vercel CLI 完成生产部署后，将生产别名绑定到：

```text
https://cthulhu-chronicle-demo.vercel.app
```

## 公开访问验证

```text
https://cthulhu-chronicle-demo.vercel.app                 HTTP 200
https://cthulhu-chronicle-demo.vercel.app/data/works.json HTTP 200, works=35, sources=3
```

## 自有 DNS 子域名状态

已检查：

- 仓库不存在 `CNAME`。
- GitHub Pages API 返回 `cname: null`。
- GitHub profile `blog` 字段为空。
- 本地仓库没有可推断的自有域名配置。

因此无法在没有域名和 DNS 授权的情况下创建例如 `eldritch.example.com` 这类自有子域名。本轮已完成可执行的子域名部署路径：Vercel 生产子域名。

如后续提供域名，建议 DNS 配置：

```text
CNAME eldritch.<your-domain> -> cname.vercel-dns.com
```

或 GitHub Pages：

```text
CNAME eldritch.<your-domain> -> Feianxc.github.io
```
