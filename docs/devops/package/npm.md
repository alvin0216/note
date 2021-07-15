---
title: npm 常识
date: 2019-07-15 13:00:28
sidebar: auto
tags:
  - npm
  - 前端工程化
categories:
  - 前端工程化
---

## 常用命令

```bash
npm list --depth 0 -g # 查看全局的包，以及版本
npm view react # 查看包的信息

# 设置源 请用 nrm
npm config get registry

# 假设当前版本号 v1.0.0
npm version patch  # v1.0.1
npm version minor  # v1.1.0
npm version major  # v2.0.0
npm version 1.2.3  # v1.2.3
```

[npm 迁移到 yarn 的命令](https://yarn.bootcss.com/docs/migrating-from-npm/#toc-cli-commands-comparison)

## npx

```bash
# 项目内部安装了测试工具 项目的根目录下执行
node-modules/.bin/mocha --version

# 使用 npx 代替
npx mocha --version
```

只要 npx 后面的模块无法在本地发现，就会下载同名模块。比如，本地没有安装 http-server 模块，下面的命令会自动下载该模块，在当前目录启动一个 Web 服务。

npx 还可以执行 GitHub 上面的模块源码。

```bash
# 执行 Gist 代码
$ npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32

# 执行仓库代码
$ npx github:piuccio/cowsay hello
```

注意，远程代码必须是一个模块，即必须包含 `package.json` 和入口脚本。

## 发布一个 npm 包

[https://www.npmjs.com/](https://www.npmjs.com/) 注册一个账号，第一次注册要去校验邮箱！

```bash
npm login
# 输入账号名 & 密码 & 邮箱
npm whoami # 查看当前登录用户

npm publish # 发布
npm unpublish --force xxx # 取消发布
```

**publishConfig**

```js
"publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "tag": "beta",
    "access": "public"
}
```

`access` 如果是 `scoped` 包，一定需要设置为 `public`（付费账号除外）

## devDependencies vs dependencies

遇到坑点，比如我写了一个脚手架

```json
"devDependencies": {
  "commander": "^2.11.0"
},
"dependencies": {
  "cli-table3": "^0.6.0",
  "form-data": "^4.0.0",
  "node-fetch": "^2.6.1"
}
```

发布后下载，运行发现 `Error: Cannot find module 'commander'`，将依赖 `devDependencies` 中的 `comander` 移动到 `dependencies` 中重新发布版本就可以了。

例如：webpack，gulp 等打包工具，这些都是我们开发阶段使用的，代码提交线上时，不需要这些工具，所以我们将它放入 devDependencies 即可，但是像 jquery 这类插件库，是我们生产环境所使用的，所以如要放入 dependencies，如果未将 jquery 安装到 dependencies，那么项目就可能报错，无法运行
