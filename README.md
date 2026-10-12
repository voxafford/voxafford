# VoxAfford project website

A standalone project page for **VoxAfford: Multi-Scale Voxel-Token Fusion for Open-Vocabulary 3D Affordance Detection** (CoRL 2026).

The website uses HTML, CSS, and JavaScript. It has no package installation, build step, external font dependency, or server-side application.

## 发布到 GitHub Pages

1. 在自己的 GitHub 账号下新建 **voxafford** 仓库。使用 GitHub Free 时，选择公开仓库。
2. 将本目录的文件直接上传到仓库根目录，保留 **assets/** 目录结构。**index.html** 必须在根目录。
3. 打开仓库的 **Settings → Pages**。
4. 在 **Build and deployment** 中选择 **Deploy from a branch**。
5. 选择 **main** 分支和 **/(root)** 目录，点击 **Save**。
6. 等待 GitHub Pages 部署完成，以 Pages 设置页面显示的网址为准。

项目网站通常位于：你的用户名.github.io/voxafford/。正式网址需要部署成功后确认。

官方说明：[Configuring a publishing source for GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

GitHub Pages 部署后，页面会根据域名和路径显示对应的 GitHub 仓库按钮。如果使用自定义域名，可在 index.html 的 repository 元数据中填写完整仓库链接。

## 本地预览

直接用浏览器打开 **index.html** 即可预览。也可以安装 Python 后运行：

    python serve.py

然后打开 http://127.0.0.1:8765。停止服务时按 Ctrl+C。

## 文件说明

| 文件 | 用途 |
|---|---|
| index.html | 网站内容、作者信息、资源链接与 BibTeX |
| styles.css | 桌面与手机排版 |
| app.js | 结果切换、图片放大与复制引用 |
| assets/*.webp | 从论文原始 PDF 图中导出的图片 |
| assets/voxafford-paper.pdf | 当前 camera-ready 论文 |
| .nojekyll | 让 GitHub Pages 直接发布静态文件 |
| serve.py | 可选的本地预览服务 |

## 更新内容

- 更新论文：替换 assets/voxafford-paper.pdf。
- 更新图：替换对应的 assets/*.webp，并同步 HTML 中的图片尺寸。
- 更新结果：修改 app.js 中的 observations，并同步 index.html 的默认完整观测表格。
- 更新作者或引用：修改 index.html。

本站 OpenAD 数据来自论文 Table 1，真机成功次数来自 Table 7。完整实验设置、结果和分析请参阅论文 PDF。

论文 PDF、图表及研究内容的权利由原作者保留。
