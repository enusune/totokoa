# AGENTS.md

本文件面向在此仓库内协作的 AI agent 或自动化代码助手。目标是减少误改生成物、避免破坏 Astro 内容路由，并保持当前博客站点的实现约定。

## 项目概况

- 技术栈：Astro 6 + Preact + TypeScript（`type: module`）
- 包管理：`pnpm`
- Node 版本：`>=22.12.0`
- 站点类型：静态博客站点，包含文章页、标签页、RSS、站点地图
- 线上站点地址配置在 `astro.config.mjs` 的 `site`

## 目录结构

```text
/
├── AGENTS.md
├── astro.config.mjs           # Astro 配置，含 site / integrations
├── package.json               # 依赖与脚本
├── public/                    # 原样拷贝到产物目录的静态资源
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── assets/                # 构建期引用的资源
│   ├── components/            # 复用组件，Astro 为主，少量 Preact 岛
│   ├── layouts/               # 页面与文章布局
│   ├── pages/                 # 文件系统路由
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── blog.astro
│   │   ├── rss.xml.js
│   │   ├── posts/             # Markdown 文章
│   │   │   ├── post-1.md
│   │   │   └── post-2.md
│   │   └── tags/
│   │       ├── index.astro
│   │       └── [tag].astro
│   ├── scripts/               # 轻量前端脚本，如菜单交互
│   └── styles/
│       └── global.css         # 全局设计变量与基础样式
├── .astro/                    # Astro 生成目录，不要手改
├── dist/                      # 构建产物，不要手改
└── node_modules/              # 依赖目录，不要手改
```

## 关键文件职责

- `src/layouts/BaseLayout.astro`
  站点主布局。负责 SEO、OG、Twitter Card、RSS link、主题初始化、全站头尾结构。
- `src/layouts/MarkdownPostLayout.astro`
  Markdown 文章布局。依赖文章 frontmatter 渲染标题、描述、作者、发布时间、标签。
- `src/pages/blog.astro`
  通过 `import.meta.glob("./posts/*.md", { eager: true })` 收集文章列表。
- `src/pages/tags/[tag].astro`
  基于 Markdown frontmatter 中的 `tags` 生成静态标签页。
- `src/pages/rss.xml.js`
  基于 `./**/*.md` 生成 RSS。文章目录调整时要确认这里仍能覆盖到目标内容。
- `src/components/Greeting.tsx`
  当前唯一明显的 Preact 交互组件。若新增交互优先保持 island 模式，不要把整页无必要改成客户端框架渲染。
- `src/styles/global.css`
  全局 token、暗色模式变量、基础排版、导航样式。新增样式优先复用现有 CSS variables。

## 运行命令

- `pnpm dev`：启动本地开发环境
- `pnpm build`：生成静态产物到 `dist/`
- `pnpm preview`：预览构建结果
- `pnpm astro ...`：运行 Astro CLI

若做了路由、文章 frontmatter、RSS、标签页相关修改，至少执行一次 `pnpm build` 验证静态生成是否正常。

## 内容与路由约束

- `src/pages/` 是文件系统路由，改名或挪动文件会直接改变 URL。
- 文章当前默认放在 `src/pages/posts/*.md`。如果迁移文章目录，必须同步检查：
  - `src/pages/blog.astro`
  - `src/pages/tags/index.astro`
  - `src/pages/tags/[tag].astro`
  - `src/pages/rss.xml.js`
- `src/pages/tags/[tag].astro` 依赖每篇文章的 `frontmatter.tags`。缺失、类型错误或混用字符串/数组，都会影响标签页生成。
- `MarkdownPostLayout.astro` 依赖这些 frontmatter 字段：
  - `title`
  - `description`
  - `author`
  - `pubDate`
  - `tags`
  - `image`（可选，但若提供应保持 `{ url, alt }` 结构）
- `pubDate` 会被转换为 `Date` 并参与排序。不要写不可解析的日期格式。
- 标签链接当前直接输出为 `/tags/${tag}`。若 tag 含空格、斜杠或特殊字符，应先评估 slug 方案，不要直接引入会破坏路由的 tag 值。

## UI 与实现约束

- 默认优先使用 `.astro` 组件；只有在确实需要客户端状态或事件时才使用 Preact。
- 不要随意替换 `BaseLayout.astro` 中的 SEO meta、canonical、RSS link、主题初始化脚本。
- 暗色模式依赖 `<html>` 上的 `.dark` 类和 `global.css` 中的变量覆盖；不要改成与现有机制冲突的实现。
- `src/scripts/menu.js` 通过 `.menu` 和 `aria-expanded` 控制导航展开。修改导航组件时要保持这个约定同步。
- 全局视觉已基于 CSS variables 建立。新增样式优先复用：
  - `--color-*`
  - `--space-*`
  - `--font-size-*`
  - `--font-weight-*`
- 当前布局入口应统一收敛到 `BaseLayout.astro` 或 `MarkdownPostLayout.astro`，不要引入新的平行布局体系，除非任务明确要求重构。

## 禁止直接修改的内容

- `.astro/`
- `dist/`
- `node_modules/`

这些目录是生成物或依赖目录。需要变更结果时，应修改源文件并重新构建，而不是直接编辑产物。

## 协作边界

- 尽量保持单包项目结构，不要在无明确需求时引入 workspace、monorepo 或额外构建层。
- 不要无故修改 `astro.config.mjs` 中的 `site`，这会影响 canonical URL、sitemap、RSS 输出。
- 不要无故移除 `@astrojs/preact`、`@astrojs/rss`、`@astrojs/sitemap`。
- 仓库 `.gitignore` 已忽略 `.DS_Store`，但当前 `src/pages/.DS_Store` 已进入工作树；后续若清理杂项文件，可以删除它，但不要依赖它。
- README 目前仍带有 Astro starter 模板内容。若任务涉及文档更新，可以顺手清理，但这不是功能开发的前置条件。

## 修改前后的最低检查

- 新增或修改页面后，检查对应 URL 是否仍可静态生成。
- 新增或修改 Markdown 文章后，检查：
  - 博客列表页是否正常展示
  - 标签页是否正常收录
  - RSS 构建是否成功
- 修改布局或样式后，至少确认桌面与移动端导航没有明显回归。
