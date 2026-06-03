# 不可名状作品编年史

一个克苏鲁与洛夫克拉夫特式怪奇文学作品编年史网页。页面以暗色档案馆为核心视觉，包含首页封面、文献库、年代索引、神话体系、调查札记和本地检索交互。

## 功能

- 暗色神秘档案馆视觉系统
- 生成式背景、羊皮纸和徽章素材
- 作品文献卡片与年代时间线
- 神话体系关系图谱
- 本地搜索、主题筛选和随机档案交互
- 响应式桌面端与移动端布局
- 可直接部署到 GitHub Pages 的静态站点

## 本地预览

```bash
python -m http.server 4173 --bind 127.0.0.1
```

打开：

```text
http://127.0.0.1:4173/index.html
```

## 质量检查

```bash
npm run check
```

检查内容包括：

- 必要文件存在
- 本地图片和脚本引用可解析
- 页面锚点可解析
- 公开页面没有内部工作流措辞
- 文献检索所需 DOM 结构存在

## 项目结构

```text
.
├── assets/                # 页面图片与图标素材
├── docs/                  # QA 与部署记录
├── scripts/               # 本地检查脚本
├── index.html             # 页面结构
├── styles.css             # 视觉系统与响应式样式
├── script.js              # 本地交互
├── PRODUCT.md             # 产品定位
├── DESIGN.md              # 视觉方向
└── FIDELITY_LEDGER.md     # 概念图还原记录
```

## 部署

本项目是纯静态站点，可以使用 GitHub Pages，Netlify，Vercel 或任意静态文件服务器。

GitHub Pages 推荐设置：

- Source：Deploy from a branch
- Branch：`main`
- Folder：`/root`

## 内容说明

页面使用怪奇文学和克苏鲁神话相关标题作为评论与索引用途，不包含原作正文摘录。站内说明文字为项目原创文案。

## License

MIT
