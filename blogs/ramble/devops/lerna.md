---
title: lerna 多包管理器
date: 2020-12-21 10:21:59
sidebar: 'auto'
tags:
  - 前端工程化
  - lerna
  - 写作中
categories:
  - 技术漫谈
---

[lerna](https://github.com/lerna/lerna)

:::details why lerna?

- [lerna 学习（一）思路篇](https://www.notion.so/lerna-46698561615e401bb0c354b6d80d3cba)
- [lerna 学习（二）](https://www.notion.so/lerna-b9fb718a0ce74664884ea61112938c91)
- [lerna 学习（三）发布篇](https://www.notion.so/lerna-b96d60a9f4494121990337b2b858870c)
- [源自 Babel 的多包管理工具：Lerna](https://mp.weixin.qq.com/s/6VXTi8utr5ig7VBfkJxttA)

lerna 是标准的 `mono-repo` 的工具，与普遍的 `multi-repo` 的组织架构有着显著的区别。

传统开发即是 multi-repo 的，即一个 module 一个仓库，比如公司内部提炼的常用工具、常用组件都是分开存放，开发的时候 install 在同一个项目里。

而 mono-repo 则是一个仓库包含整个项目的所有，分成多个 package 目录分开管理，统一处理相互依赖。比如 Babel、react、angular 等等知名的库都是采用了 mono-repo 的方式。比如 babel，babel-cli、babel-core、babel-node 等等工具都是放在了同一个仓库“babel”中的，而我们安装的时候实际上是 yarn add @babel/babel-core 这样的安装方式。这就是很典型的 mono-repo 的模式，整个 babel 的产品都内聚到了 babel 的整个仓库内。

**mono-repo 的优点**

- 项目规范可以更轻松的整合;
- 模块间依赖稳定，统一更新，避免了开发人员相互间使用对方模块时版本更新不一致导致的 bug;
- 可以更高效的复用模块，加快开发效率;
- 各模块间相互依赖，开发又相对独立，避免对于特定项目的过强的耦合;
- 统一整合各个模块单独的更新生成一个 CHANGELOG;
- 唯一的仓库，避免用户 issue 的分散，以及 issue 的 scope 的不明确。

**mono-repo 的缺点**

- 仓库体积会非常的大;
- 统一 CHANGELOG 也会混入一些和整体项目无关的模块更新。

:::
