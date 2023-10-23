# mine-desktop

一个使用 Vite + TS + Vue3.x + Electron 开发的桌面软件 👍

<h2 align="center">
  <a href="https://github.com/biaov/mine-desktop/releases/tag/v1.0.8"><img src="https://img.shields.io/badge/version-1.0.8-blue?logo=npm" /></a>
  <a href="https://github.com/biaov/mine-desktop/blob/main/LICENSE"><img src="https://img.shields.io/github/license/biaov/mine-desktop.svg?logo=Unlicense" /></a>
  <a href="https://github.com/biaov/mine-desktop/blob/main/.eslintrc.js"><img src="https://img.shields.io/badge/eslint-prettier-blue?logo=eslint" /></a>
</h2>

## 支持环境

- windows

## 技术栈

`Vite` + `TypeScript` + `Vue3.x` + `Electron` + `Eslint` + `Less` + `NodeJs`

## 下载地址

- [最新版本](https://github.com/biaov/mine-desktop/releases/tag/v1.0.7)
- [所有版本](https://github.com/biaov/mine-desktop/releases)

## 特性

- 激活系统
- 锁屏
- 关机
- 重启
- 定时关机
- 取消定时关机
- 设置磁盘图标
- 重置磁盘图标
- 屏幕显示
- 输入法刷字数
- 电脑桌面的显示和隐藏
- 生成短链

## 安装依赖

```sh
npm i
```

## 运行项目

```sh
npm start
```

- 如果遇到 `NODE_MODULE_VERSION` 不一致的问题，则运行以下命令解决

```sh
npm run rebuild
```

## 打包项目

```sh
npm run build
```

## 目录解析

```MD
├── mine-desktop ---------------- 项目名称
│   ├── .vscode --------------------- VSCode 配置
│   ├── app ------------------------- Electron 主进程
│   │   ├── assets ------------------ 静态资源
│   │   ├── main -------------------- 主进程
│   │   ├── preload ----------------- 预加载
│   │   ├── vite.config.ts ---------- Vite 配置
│   ├── hooks ----------------------- 打包钩子
│   ├── public ---------------------- 静态资源
│   ├── scripts --------------------- 脚本
│   ├── src ------------------------- Vue 项目
│   │   ├── api --------------------- 接口
│   │   ├── assets ------------------ 静态资源
│   │   ├── components -------------- 组件
│   │   ├── composables ------------- 组合式 API
│   │   ├── config ------------------ 配置
│   │   ├── router ------------------ 路由
│   │   ├── styles ------------------ 样式
│   │   ├── utils ------------------- 工具
│   │   ├── views ------------------- 页面
│   │   ├── App.vue ----------------- 根组件
│   │   ├── env.d.ts ---------------- 环境变量类型
│   │   ├── main.ts ----------------- 入口文件
│   ├── .editorconfig --------------- 编辑器配置
│   ├── .eslintignore --------------- Eslint 忽略文件
│   ├── .eslintrc.js ---------------- Eslint 配置
│   ├── .gitignore ------------------ Git 忽略文件
│   ├── .ncurc.json ----------------- ncu 配置
│   ├── .npmrc ---------------------- npm 配置
│   ├── .prettierignore ------------- Prettier 忽略文件
│   ├── .prettierrc ----------------- Prettier 配置
│   ├── electron-builder.json ------- electron-builder 配置
│   ├── index.html ------------------ 入口 HTML
│   ├── LICENSE --------------------- 开源协议
│   ├── package-lock.json ----------- 锁定安装时的包的版本号
│   ├── package.json ---------------- 项目配置
│   ├── README.md ------------------- 项目说明
│   ├── tsconfig.json --------------- TypeScript 配置
│   ├── vite.config.ts -------------- Vite 配置
```

## 依赖解析

- `@ant-design/icons-vue`: `ant-design-vue` 图标库
- `ant-design-vue`: Vue UI 框架
- `axios`: 接口请求工具
- `dayjs`: 时间处理工具
- `robotjs`: 模拟键盘和鼠标
- `vue`: 前端框架
- `vue-router`: 路由
- `@electron/rebuild`: 重建 Electron
- `@types/node`: `node` 的类型
- `@typescript-eslint/eslint-plugin`: 检测和修复 TS 代码
- `@typescript-eslint/parser`: 解析 TS 代码并生成抽象语法树（AST），以供 Eslint 进行代码检查
- `@vitejs/plugin-vue`: Vite 解析 Vue 文件
- `cross-env`: 跨平台设置环境变量
- `electron`: 桌面应用框架
- `electron-builder`: `electron` 打包工具
- `eslint`: 代码检查工具
- `eslint-config-airbnb-base`: airbnb-base 代码编写规范
- `eslint-config-prettier`: 将 Prettier 规则集成到 ESlint 检查中
- `eslint-plugin-import`: 检测和修复 JS 中的模块导入导出问题
- `eslint-plugin-prettier`: 检测不符合 Prettier 格式的代码
- `eslint-plugin-vue`: 检测和修复 Vue 代码
- `less`: CSS 预编译器
- `prettier`: 代码格式化
- `typescript`: 编程语言
- `vite`: 项目构建工具
- `vite-plugin-eslint`: 检查代码格式的 Vite 插件
- `vue-tsc`: 编译 TS 单文件 Vue 文件的工具

## 贡献者们

[![贡献者们](https://contrib.rocks/image?repo=biaov/mine-desktop)](https://github.com/biaov/mine-desktop/graphs/contributors)
