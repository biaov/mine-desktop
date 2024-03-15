# mine-desktop

一个使用 Vite + TS + Vue3.x + Electron 开发的桌面软件 👍

<h2 align="center">
  <a href="https://github.com/biaov/mine-desktop/releases"><img src="https://shields.io/github/v/release/biaov/mine-desktop.svg?logo=github&label=版本" alt="version" /></a>
  <a href="https://github.com/biaov/mine-desktop/blob/main/LICENSE"><img src="https://img.shields.io/github/license/biaov/mine-desktop.svg" alt="LICENSE" /></a>
  <a href="https://github.com/biaov/mine-desktop/blob/main/.eslintrc.js"><img src="https://img.shields.io/badge/eslint-prettier-blue?logo=eslint" alt="eslint" /></a>
</h2>

## 下载地址

- [x] [所有版本](https://github.com/biaov/mine-desktop/releases)

## 支持环境

- `Windows`

## 技术栈

`Vite` + `TypeScript` + `Vue3.x` + `Electron` + `Eslint` + `Less` + `NodeJs`

## 特性

- [x] 激活系统
- [x] 锁屏
- [x] 关机
- [x] 重启
- [x] 定时关机
- [x] 取消定时关机
- [x] 设置磁盘图标
- [x] 重置磁盘图标
- [x] 屏幕显示
- [ ] 输入法刷字数
- [x] 电脑桌面的显示和隐藏
- [x] 生成短链
- [x] 打开应用程序
- [x] 自动更新，支持 Windows

## 安装依赖

```sh
npm i
```

## 运行项目

```sh
npm start
```

## 打包项目

```sh
npm run build
```

## 目录解析

```MD
├── mine-desktop ---------------- 项目名称
│   ├── .vscode --------------------- VSCode 配置
│   ├── build ------------------------- 打包配置
│   ├── electron ------------------------- Electron 主进程
│   │   ├── assets ------------------ 静态资源
│   │   ├── main -------------------- 主进程
│   │   ├── preload ----------------- 预加载
│   ├── public ---------------------- 静态资源
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
│   │   └── main.ts ----------------- 入口文件
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
└   └── vite.config.ts -------------- Vite 配置
```

## 依赖解析

### dependencies

- `@ant-design/icons-vue`: `ant-design-vue` 图标库
- `ant-design-vue`: Vue UI 框架
- `axios`: 接口请求工具
- `dayjs`: 时间处理工具
- `electron-log`: Electron 日志工具
- `electron-updater`: 自动更新软件程序
- `vue`: 前端框架
- `vue-router`: 路由

### devDependencies

- `@types/node`: `node` 的类型
- `@typescript-eslint/eslint-plugin`: 检测和修复 TS 代码
- `@typescript-eslint/parser`: 解析 TS 代码并生成抽象语法树（AST），以供 Eslint 进行代码检查
- `@vitejs/plugin-vue`: Vite 解析 Vue 文件
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
- `vite-plugin-electron`: vite 支持 electron 的插件
- `vite-plugin-electron-renderer`: vite 支持 electron 的渲染插件

## 贡献者们

[![贡献者们](https://contrib.rocks/image?repo=biaov/mine-desktop)](https://github.com/biaov/mine-desktop/graphs/contributors)
