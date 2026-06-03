# 2026-06-03 GitHub Pages 升级部署记录

## 目标

把视觉升级、动效系统、扩展数据源和新增素材推送到公开 GitHub 仓库，并等待 GitHub Pages 构建完成。

## 当前远程

- Repo：<https://github.com/Feianxc/eldritch-archive-chronicle>
- Pages：<https://feianxc.github.io/eldritch-archive-chronicle/>
- Pages source：`main` branch, root folder

## 本轮待验证项

推送后执行：

```bash
gh api repos/Feianxc/eldritch-archive-chronicle/pages/builds/latest
Invoke-WebRequest https://feianxc.github.io/eldritch-archive-chronicle/
Invoke-WebRequest https://feianxc.github.io/eldritch-archive-chronicle/data/works.json
```

## 本轮变更摘要

- 新增 `data/works.json`，35 条作品记录。
- 新增生成式图片资产和作品缩略图。
- 新增 Vercel 静态部署配置。
- 升级 `index.html`、`styles.css`、`script.js` 为数据驱动和动效版本。
- 更新 QA 脚本，检查数据源、缩略图、关键资产和公开文案边界。
