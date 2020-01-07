---
title: javascript question
date: 2020-01-06 14:02:40
---

## JSON.stringify

以下代码会输出什么？

```js
const obj = { a: 3, b: 4, c: null, d: undefined, get e() {} }
console.log(JSON.stringify(obj))
```

> 答案是

```bash
{"a":3,"b":4,"c":null,"today":"2020-01-06T06:20:10.183Z"}
```

`JSON.stringify` 会将 `function` `undefined` 等过滤，其他规则详见 [JSON.stringify](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

## 什么是防抖和节流？有什么区别？如何实现？

[防抖函数的实现](/javascript/debounce)