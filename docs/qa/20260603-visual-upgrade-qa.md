# 2026-06-03 视觉升级 QA

## 结论

本轮视觉升级已通过本地静态检查、内置浏览器 DOM/交互验证、Playwright + Chrome 截图验证，以及 Vercel 子域名公开访问验证。

## 本地静态检查

命令：

```bash
npm run check
```

结果：

```json
{
  "filesChecked": 17,
  "worksChecked": 35,
  "sourceCount": 3,
  "failures": [],
  "warnings": []
}
```

## 内置浏览器验证

URL：`http://127.0.0.1:4173/?qa=upgrade-local`

页面识别：

- Title：`不可名状作品编年史 | Eldritch Archive`
- H1：`不可名状 / 作品编年史`
- Work cards：35
- Case items：35
- Deep timeline items：35
- Hero image asset：`hero-cinematic.png` 已加载
- Atlas image asset：`atlas-wall.png` 已加载
- Console errors/warnings：无

交互验证：

- 输入 `南极` 后，结果为 1 条，命中 `疯狂山脉`。
- 输入 `深海` 后，结果为 4 条，命中 `达贡`、`神殿`、`克苏鲁的呼唤`、`印斯茅斯之影`。
- 图谱节点与主题筛选会联动刷新结果。

## 截图验证

Browser 截图接口在本轮本地页面上出现一次 `Page.captureScreenshot` 超时，因此截图证据改用 Playwright + 本机 Chrome channel 获取。DOM、日志和交互仍通过内置浏览器验证。

截图文件：

- `E:/codex_media/cthulhu_chronicle_upgrade/local-desktop-1680.png`
- `E:/codex_media/cthulhu_chronicle_upgrade/local-mobile-390.png`
- `E:/codex_media/cthulhu_chronicle_upgrade/local-library.png`
- `E:/codex_media/cthulhu_chronicle_upgrade/vercel-desktop-1680.png`
- `E:/codex_media/cthulhu_chronicle_upgrade/vercel-mobile-390.png`

## 视觉对齐检查

| 检查点 | 参考概念 | 当前实现 | 结果 |
|---|---|---|---|
| 首屏氛围 | 深海档案馆、黄铜星图、手稿与右侧时间线 | 生成式 hero 背景、左侧大标题、右侧脉冲时间线 | 通过 |
| 图像素材 | 不依赖纯 CSS 模拟 | 新增 hero、atlas、reading desk 和 35 张缩略图 | 通过 |
| 文献库 | 搜索台、阅读桌、来源面板、非重复卡片 | 数据驱动卡片、左侧时期筛选、右侧来源说明 | 通过 |
| 神话图谱 | 星图节点、路径、时间河 | atlas 背景、可点击节点、节点说明联动 | 通过 |
| 动效 | 有首屏、滚动、悬停和环境动效 | 粒子、雾层、旋转星图、卡片倾斜、按钮扫光、reveal | 通过 |
| 移动端 | 首屏可读，纵向堆叠 | 390px 截图未出现横向溢出 | 通过 |
| 可访问性 | 动效需有降级 | `prefers-reduced-motion` 禁用主要动画 | 通过 |

## 已知限制

- Vercel 自动连接 GitHub 仓库时报缺少 GitHub Login Connection，但 CLI 仍完成了生产部署与别名绑定。
- 自有域名 DNS 子域名没有配置，因为当前没有可用域名和 DNS 权限证据；本轮已使用 Vercel 分配的生产子域名完成部署。
