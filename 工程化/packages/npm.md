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

## NPM 依赖包版本号

- `~` 会匹配最近的小版本依赖包，比如~1.2.3 会匹配所有 1.2.x 版本，但是不包括 1.3.0
- `^` 会匹配最新的大版本依赖包，比如^1.2.3 会匹配所有 1.x.x 的包，包括 1.3.0，但是不包括 2.0.0
- `*` 这意味着安装最新版本的依赖包

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
