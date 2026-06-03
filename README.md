# 不可名状作品编年史 · Eldritch Archive

一个克苏鲁与洛夫克拉夫特式怪奇文学作品编年史网页。当前版本已经从概念页升级为完整静态站点：包含电影感首页、生成式视觉资产、数据驱动文献库、年代索引、神话图谱、互动检索台、来源说明与双平台部署。

## 在线访问

- Vercel 子域名：<https://cthulhu-chronicle-demo.vercel.app>
- GitHub Pages：<https://feianxc.github.io/eldritch-archive-chronicle/>
- 开源仓库：<https://github.com/Feianxc/eldritch-archive-chronicle>

## 本次升级重点

- 增加首屏动效：滚动进度、粒子尘埃、雾层漂移、星图旋转、时间线脉冲、羊皮纸浮动。
- 增加真实图像素材：`hero-cinematic.png`、`atlas-wall.png`、`reading-desk.png`，以及 35 张作品缩略图。
- 扩展文献数据：`data/works.json` 收录 35 条作品记录，包含创作年、发表年、主题、地点、母题、图谱节点和来源标签。
- 改为数据驱动渲染：文献卡片、调查札记和深层时间线由本地 JSON 生成。
- 增强交互体验：年代筛选、关键词搜索、主题筛选、随机档案、图谱节点联动、卡片 hover 倾斜。
- 增加部署配置：`vercel.json`、`.vercelignore`，并保留 GitHub Pages 静态部署能力。

## 本地运行

```bash
npm run check
npm run serve
```

打开：<http://127.0.0.1:4173/>

## 数据来源边界

站点只提供书目信息、中文摘要与索引结构，不收录长篇原文摘录。数据源入口：

- The H. P. Lovecraft Archive：作品年表与书目信息校核
- Project Gutenberg：公开文本入口，按该站实际收录为准
- Internet Archive：历史馆藏检索入口

## 项目结构

```text
assets/                  生成式背景、图谱、阅读桌、徽章和缩略图
data/works.json          文献数据源
scripts/qa-smoke.mjs     静态结构与数据校验
scripts/generate-upgrade-assets.py  缩略图生成脚本
index.html               页面结构
styles.css               视觉系统与动效
script.js                数据渲染与交互逻辑
vercel.json              Vercel 静态部署配置
```

## License

MIT
