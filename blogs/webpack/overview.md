---
title: 你真的熟练使用 webpack 吗？
date: 2019-07-15 13:00:28
sidebar: 'auto'
tags:
  - 写作中
  - Webpack
categories:
  - Webpack
---

- 什么是 webpack，webpack 的打包过程是怎么样的？
- webpack 基础配置的属性有哪些
- 什么是 loader?什么是 plugin?他们执行先后关系是什么？
- 提高 webpack 的构建速度
- 是否自己写过 plugin(一旦你回答写过，马上问题就来了)
- 是否用过 compiler ，介绍其中几个方法？

## webpack 的打包过程是怎么样的?

`webpack` 是一个打包模块化 `javascript` 的工具，在 `webpack` 里一切文件皆模块，

通过 `loader` 转换文件，通过 `plugin` 注入钩子，最后输出由多个模块组合成的文件，

`webpack` 专注构建模块化项目。

...
