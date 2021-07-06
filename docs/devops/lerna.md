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

- [lerna 中文](http://www.febeacon.com/lerna-docs-zh-cn/routes/commands/)
- [基于 lerna 和 yarn workspace 的 monorepo 工作流](https://zhuanlan.zhihu.com/p/71385053)
- [lerna+yarn workspace+monorepo 项目的最佳实践](https://juejin.cn/post/6844903918279852046)

常用配置

```bash
lerna init # 初始化
lerna clean -y # 快速删除包
lerna add --scope=aa @alvin/tools # 往 aa 包里添加 @alvin/tools
lerna run start --scope=aa --scope=bb --parallel # 启动所有命令
lerna create xx # 新建包
lerna publish
```

## lerna + yarn workspace

lerna.json

```json
{
  "packages": ["packages/*"],
  "version": "independent",
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

package.json

```json
{
  "workspace": ["packages/*"]
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
