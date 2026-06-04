# 不可名状作品编年史 · Eldritch Archive

一个克苏鲁与洛夫克拉夫特式怪奇文学作品编年史网页。当前版本已经从概念页升级为完整静态站点：包含电影感首页、生成式视觉资产、数据驱动文献库、首次发表刊物、合作/署名信息、英文全文外链、译名对照、作品关系网络、互动检索台、来源说明与多平台部署。

## 在线访问

- 自定义子域名：<https://eldritch.feian.online>
- Vercel：<https://cthulhu-chronicle-demo.vercel.app>
- GitHub Pages：<https://feianxc.github.io/eldritch-archive-chronicle/>
- 开源仓库：<https://github.com/Feianxc/eldritch-archive-chronicle>

## 本次升级重点

- 扩展文献数据：`data/works.json` 收录 35 条作品记录，包含创作年、首次发表日期、发表刊物/书籍、卷期、合作作者/署名背景、主题、地点、母题、全文外链、译名对照和来源标签。
- 新增作品关系网络：33 条 curated edges，覆盖梦境循环、深海神话、禁书与档案、远古城市、米斯卡塔尼克线索、血统身份、科学与宇宙深时、合作署名、期刊发表脉络。
- 增加真实图像素材：`hero-cinematic.png`、`atlas-wall.png`、`reading-desk.png`、`relationship-observatory.png`，以及 35 张作品缩略图。
- 增强交互体验：年代筛选、关键词搜索、主题筛选、随机档案、神话节点联动、关系网络筛选、关系定位、卡片 hover 倾斜。
- 增加首屏与滚动动效：滚动进度、粒子尘埃、雾层漂移、星图旋转、时间线脉冲、羊皮纸浮动。
- 保留静态部署能力：Vercel、GitHub Pages 与 Cloudflare 子域名均可承载。

## 本地运行

```bash
npm run check
npm run serve
```

默认打开：<http://127.0.0.1:4173/>
如果 4173 端口被本机策略占用，可临时运行：

```bash
python -m http.server 5178 --bind 127.0.0.1
```

## 数据来源边界

站点只提供书目信息、中文摘要与索引结构，不收录长篇原文摘录。数据源入口：

- The H. P. Lovecraft Archive：作品创作年代、标题与书目信息校核
- The H. P. Lovecraft Archive: Publication Order：首次发表日期、期刊/书籍与卷期校核
- The H. P. Lovecraft Archive: Electronic Texts：逐篇英文全文外链入口
- Project Gutenberg：公开文本入口，按该站实际收录为准
- Internet Archive：历史馆藏检索入口
- Wikisource：公共领域文本交叉入口，按该站实际收录为准

## 项目结构

```text
assets/                  生成式背景、图谱、阅读桌、徽章、关系网络背景和缩略图
data/works.json          文献数据源与关系网络数据
scripts/enrich-bibliography.py  书目、外链、译名、关系数据补充脚本
scripts/qa-smoke.mjs     静态结构与数据校验
scripts/generate-upgrade-assets.py  缩略图生成脚本
index.html               页面结构
styles.css               视觉系统与动效
script.js                数据渲染与交互逻辑
vercel.json              Vercel 静态部署配置
```

## License

MIT
