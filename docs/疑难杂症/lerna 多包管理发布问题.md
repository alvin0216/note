---
title: lerna 多包管理发布问题
date: 2022-03-28 17:01:43
sidebar: auto
tags:
  - lerna
categories:
  - 技术漫谈
---

使用 lerna 作为多包管理，发布上会带来一些问题。比如用户 a 开发组件 A、用户 b 开发组件 B。

lerna publish 会检测所有子包的修改，统一发布。用户 a 发布的时候，发现用户 b 的修改并未发布，会把用户 b 的修改中的组件 B 也发版上去了！！！

解决方案：

通过分支处理，feat-comA，feat-comB。

merge 到 main 分支之后，通过 ci/cd 自动发布到组件库中。
