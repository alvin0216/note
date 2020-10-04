---
title: curry
date: 2020-08-26 14:07:57
---

```js
/**
 * fn.length 也即参数长度
 *   nest 函数中参数等于 fn.length 时，执行 fn
 *   否则递归 返回函数
 */
function curry(fn) {
  return function nest(...args) {
    if (args.length === fn.length) return fn(...args)
    else return (...innerArgs) => nest(...args, ...innerArgs)
  }
}

const add = (x, y) => x + y

let addCurry = curry(add)
console.log(addCurry(1)(2)) // 3
console.log(addCurry(1, 2)) // 3
```
