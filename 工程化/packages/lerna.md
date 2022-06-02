---
title: lerna 包管理器
date: 2019-07-15 13:00:28
sidebar: auto
tags:
  - lerna
  - 前端工程化
categories:
  - 前端工程化
---

## 相关资料

- [lerna 中文](http://www.febeacon.com/lerna-docs-zh-cn/routes/commands/)
- [基于 lerna 和 yarn workspace 的 monorepo 工作流](https://zhuanlan.zhihu.com/p/71385053)
- [lerna+yarn workspace+monorepo 项目的最佳实践](https://juejin.cn/post/6844903918279852046)
- [lerna 多包管理实践](https://juejin.cn/post/6844904194999058440)
- [在使用 lerna 的实践中遇到了一些问题，这里汇总一下，供大家参考](https://www.bilibili.com/read/cv5101274/)
- [深入 lerna 发包机制 —— lerna publish](https://zhuanlan.zhihu.com/p/362042945)
- [【译】配置 Monorepo 的几种  工具 lerna、npm、yarn 及其性能对比](https://zhuanlan.zhihu.com/p/350317373)

常用配置

```bash
lerna init # 初始化
lerna clean -y # 快速删除包
lerna add --scope=aa @alvin/tools # 往 aa 包里添加 @alvin/tools
lerna run start --scope=aa --scope=bb --parallel # 启动所有命令
lerna create xx # 新建包
lerna publish # 发布
lerna version # 打版本
```

## yarn workspaces

::::tabs

::: tab 配置

```json
// lerna.json
{
  "packages": ["packages/*"],
  "version": "independent",
  "npmClient": "yarn",
  "useWorkspaces": true
}

// root packages.json
"workspace": ["packages/*"]
```

这样执行 `yarn` 或者 `yarn install` 就和 `lerna bootstrap --hoist` 一样了。此时执行 `lerna bootstrap` 的意义不大，因为它只是调用 `yarn install` 本身罢了。
:::

::: tab 常用命令

```bash
# 下面的命令将显示你当前项目的工作空间依赖树。

yarn workspaces info

# 下一个指令可以让你在选定的工作空间（即包）中运行所选的yarn命令。
yarn workspace <package-name> <command>

# 举个例子
yarn workspace packageA add -D react
yarn workspace packageA remove react

# 如果你想为所有的包添加一个共同的依赖关系，进入项目的根目录并使用-W
yarn add react -W
```

即 yarn 将所有的依赖关系提升到根级。因此，yarn 只在项目中包含一次依赖关系。

```json
// package.json
{
  //...
  "workspaces": {
    "packages": ["packages/*"],
    "nohoist": ["**/react-native"]
  }
  //...
}
```

:::

::::

## lerna publish

```bash
lerna changed # 查看那些包修改了 需要发布
lerna publish # 不配置的话 默认让你选择版本 并且会推送 tag 到远程服务器
lerna publish --cancary # 不推送 tag
```

以@开头包的发布问题，发布 package 的名字如果是以@开头的，例如 `@alvin/tools`，npm 默认以为是私人发布，需要使用 `npm publish --access public` 发布。但是 lerna publish 不支持该参数，解决方法参考: [issue](https://github.com/lerna/lerna/issues/914)

```json
// package.json
{
  "name": "@alvin/tools",
  "publishConfig": {
    "access": "publish" // 如果该模块需要发布，对于scope模块，需要设置为publish，否则需要权限验证
  }
}
```

## 引入包编译不通过？

webpack 配置

```js
 chainWebpack(config) {
    config.module
      .rule('ts-in-node_modules')
      .include.add(/node_modules\/@alvin/)
      .add(/Text/) // 这里是文件夹的名字 比如 packages/Text
      .add(/Input/)
      .end();
  }
```
