# mine-desktop

一个使用 Vite + TS + Vue3.x + Electron 开发的桌面软件 👍

<h2 align="center">
  <a href="https://github.com/biaov/mine-desktop/releases"><img src="https://shields.io/github/v/release/biaov/mine-desktop.svg?logo=github&label=version" alt="version" /></a>
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
- [x] 打开第三方应用程序
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

## 贡献者们

[![贡献者们](https://contrib.rocks/image?repo=biaov/mine-desktop)](https://github.com/biaov/mine-desktop/graphs/contributors)
