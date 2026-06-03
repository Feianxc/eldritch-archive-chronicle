# 2026-06-03 GitHub Pages 升级部署记录

## 结论

视觉升级已推送到公开 GitHub 仓库，并通过 GitHub Pages 构建。

- Repo：<https://github.com/Feianxc/eldritch-archive-chronicle>
- Pages：<https://feianxc.github.io/eldritch-archive-chronicle/>
- Commit：$head
- Pages source：main branch, root folder

## 命令

`ash
git push origin main
gh api repos/Feianxc/eldritch-archive-chronicle/pages/builds/latest
Invoke-WebRequest https://feianxc.github.io/eldritch-archive-chronicle/
Invoke-WebRequest https://feianxc.github.io/eldritch-archive-chronicle/data/works.json
`

## 构建状态

`	ext
Pages status: built
Pages commit: 6d99f5e55282d1914fade14bae88cade9e0e9f49
`

## 公开访问验证

`	ext
HTML: 200
Title: 不可名状作品编年史 | Eldritch Archive
CSS/JS cache version: 20260603d
Data: 200
Works: 35
Sources: 3
`

## 公开截图

- E:/codex_media/cthulhu_chronicle_upgrade/github-pages-desktop-1680.png
- E:/codex_media/cthulhu_chronicle_upgrade/github-pages-mobile-390.png

## 本轮变更摘要

- 新增 data/works.json，35 条作品记录。
- 新增生成式图片资产和作品缩略图。
- 新增 Vercel 静态部署配置。
- 升级 index.html、styles.css、script.js 为数据驱动和动效版本。
- 更新 QA 脚本，检查数据源、缩略图、关键资产和公开文案边界。
