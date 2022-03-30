---
title: esbuild
date: 2022-03-30 15:35:37
sidebar: auto
tags:
  - esbuild
categories:
  - 前端工程化
---

## esbuild 为什么这么快

![](https://pic4.zhimg.com/80/v2-467261081cda20568a060e16ca4c63f3_1440w.jpg)

```js
babel => AST => React => webpack => js

// use esbuild

esbuild => plugin(swc) => js
```

> vite 是开发环境使用的是 esbuild 来进行编译代码的，生成环境打包使用的是 rollup

## 缺陷

Esbuild 本身的限制，包括如下：

- 没有 TS 类型检查
- 不能操作 AST
- 不支持装饰器语法
- 产物 target 无法降级到 ES5 及以下

意味着需要 ES5 产物的场景只用 Esbuild 无法胜任。

- [Esbuild 为什么那么快](https://zhuanlan.zhihu.com/p/379164359)
- [esbuild 上生产](https://zhuanlan.zhihu.com/p/408379997)
- [精读《新一代前端构建工具对比》](https://zhuanlan.zhihu.com/p/372857206)
- [面对 ESM 的开发模式，webpack 还有还手之力吗？](https://www.zhihu.com/question/454975842/answer/1838767562)
