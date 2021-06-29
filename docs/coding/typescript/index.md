---
title: Typescript 手记
date: 2019-05-01
categories: Typescript
---

## 资料

## unknown vs any

`unknown` 指的是不可预先定义的类型，和 `any` 相比，，不同的地方是，在静态编译的时候，`unknown` 不能调用任何方法，而 `any` 可以。

```ts
let foo: unknown = 'foo';
foo.length; // Error: 静态检查不通过报错

let foo: any = 'foo';
foo.length; //  Pass: any类型相当于放弃了静态检查
```

## never

用法见 [TypeScript 中的 never 类型具体有什么用？](https://www.zhihu.com/question/354601204/answer/888551021)

## 实战

### 定义 reducer
