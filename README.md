# totokoa

一个基于 Astro 构建的静态博客项目，当前包含：

- 首页与博客列表页
- Markdown 文章页
- 标签聚合页
- RSS 输出
- Preact island 交互组件

## 技术栈

- Astro 6
- Preact
- TypeScript
- pnpm

## 本地开发

```sh
pnpm install
pnpm dev
```

默认本地地址为 `http://localhost:4321`。

## 常用命令

```sh
pnpm dev
pnpm build
pnpm preview
pnpm astro -- --help
```

## 目录概览

```text
src/
  components/   可复用组件，Astro 为主，少量 Preact
  layouts/      页面与文章布局
  pages/        文件系统路由与 Markdown 文章
  scripts/      轻量前端脚本
  styles/       全局样式
public/         静态资源
```

更详细的协作约束、目录说明和注意事项见 `AGENTS.md`。
