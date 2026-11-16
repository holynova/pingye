<p><img src="./assets/readme/mark.svg" width="54" height="54" alt="拼页标志"></p>

# 拼页 · Pingye

把照片、作品和成绩拼成一张个人海报。换一套版式，继续编辑同一份内容。

Turn photos, projects, and milestones into a personal Bento poster. Switch layouts and keep editing the same content.

**[在线体验 / Cloudflare Demo](https://xiaosang.cc/pingye/)** · [GitHub Repo](https://github.com/holynova/pingye)

![拼页桌面编辑器。左侧是卡片，中央是个人海报，右侧是主题设置。](./assets/screenshot.png)

## 从一张卡开始 / Make a poster

点「样例」打开九套可编辑的稿件。每套样例单独保存，可从同一入口切回「我的稿件」。

Open **样例 (Examples)** to edit nine ready-made drafts. Each example saves separately from your own draft.

![九套可编辑样例，包括 iPhone 18 Pro、上海城市导览、相机和书籍](./assets/readme/examples.webp)

1. **填内容。** 添加身份、作品图、数字、短句、标签或链接。增删后，版式会自动调整。
2. **调整画面。** 九种版式共用一份稿件。点图片上的「裁剪」，可以拖动、缩放或拖四角调整取景。
3. **导出 PNG。** 横屏为 2304 × 1296，手机竖屏为 1296 × 2304。草稿和上传的图片保存在当前浏览器。

Add and reorder cards, switch among nine layouts, and crop images by dragging the photo or its corners. Export at 2304 × 1296 for landscape or 1296 × 2304 for phones. Drafts and uploaded images stay in the current browser.


iPhone 18 Pro 与上海样例使用示意图。规格与地点参考 [Apple 技术规格](https://support.apple.com/en-la/148590) 和 [上海城市漫步指南](https://english.shanghai.gov.cn/en-FAQs-StudyinShanghai/20251124/9f1658ae899240d19c52784bddfed782.html)。

<details>
<summary>手机竖版与裁剪界面 / Phone layout and crop editor</summary>
<br>
<img src="./assets/readme/mobile.png" width="245" alt="手机界面中的 9 比 16 个人海报">
<img src="./assets/readme/crop.png" width="525" alt="裁剪界面中的三分线、四角控制点和缩放控件">
</details>

## 本地运行 / Run locally

```sh
npm ci
npm run dev
```

## 发布 / Deploy

从项目 <code>main</code> 构建单文件产物，从作品集 <code>master</code> 手动发布到 Cloudflare。

Build from project <code>main</code>. Copy the output into the portfolio and deploy manually from its committed <code>master</code> checkout.

```sh
npm run deploy:check
cp dist/index.html "$PORTFOLIO_DIR/pingye/index.html"
# Commit and push the portfolio update on master, then deploy that checkout.
(cd "$PORTFOLIO_DIR" && node scripts/stage-cloudflare.mjs "$GALLERY_DIST" &&
  npx --yes wrangler@4.128.0 deploy --config wrangler.jsonc)
```

<img src="./assets/qr.png" width="120" height="120" alt="扫码打开拼页在线编辑器">
