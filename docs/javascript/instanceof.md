---
title: 【未完成】 instanceof 的实现
date: 2020-05-07 16:10:24
---

`typeof` 一般被用于判断一个变量的类型，我们可以利用 `typeof` 来判断 `number`, `string`, `object`, `boolean`, `function`, `undefined`, `symbol` 等类型, 但 `typeof` 在判断一个 `object` 的数据的时候只能告诉我们这个数据是 `object`, 而不能细致的具体到是哪一种 `object`, 比如 👉

```js
let s = new String('abc')
typeof s === 'object' // true
s instanceof String // true
```

为此，引入了 `instanceof`。

- [一文带你深入剖析 instanceof 运算符](https://juejin.im/post/5d6e5c3d6fb9a06ae0721f5f)
- [浅谈 instanceof 和 typeof 的实现原理](https://juejin.im/post/5b0b9b9051882515773ae714)
