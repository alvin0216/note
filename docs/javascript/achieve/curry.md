---
title: curry 的实现
date: 2020-06-02 21:39:33
---

在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。例如

```js
function add(a, b) {
  return a + b
}

// 假设有一个 curry 函数可以做到柯里化
var sum = curry(add)
sum(1)(2) // 3
```

## 第一版

第一步 先实现 `curry(add, 1, 2)()` 或者 `curry(add, 1)(2)`， 也即

curry 包装返回了函数，该函数执行时把上一个函数的参数也带进来了。

```js
function curry(fn) {
  let args = Array.prototype.slice.call(arguments, 1) // 提取 curry(fn, param1, param2...) 中的参数
  return function() {
    return fn.apply(this, [...args, ...arguments])
  }
}

function add(a, b) {
  return a + b
}
```

:::details 测试

```js
curry(add, 1)(2) // 3
let sum = curry(add, 1, 2)
sum() // 3

let sum2 = curry(add)

sum2(1, 2) // 3
```

已经有柯里化的感觉了，但是还没有达到要求，不过我们可以把这个函数用作辅助函数，帮助我们写真正的 curry 函数。

:::

## 第二版

实现 `sum(1)(2)(3)`

```js
function subCurry(fn) {
  let args = Array.prototype.slice.call(arguments, 1) // 提取 curry(fn, param1, param2...) 中的参数
  return function() {
    return fn.apply(this, [...args, ...arguments])
  }
}

function curry(fn, length) {
  const len = length || fn.length // fn.length 属性指明函数的形参个数

  return function() {
    if (arguments.length < len) {
      let combined = [fn, ...arguments]
      return curry(subCurry.apply(this, combined), len - arguments.length) // 递归实现
    } else {
      return fn.apply(this, arguments)
    }
  }
}
```

:::details 测试

```js
var fn = curry(function(a, b, c) {
  console.log(a, b, c)
})

fn('a', 'b', 'c') // ["a", "b", "c"]
fn('a', 'b')('c') // ["a", "b", "c"]
fn('a')('b')('c') // ["a", "b", "c"]
fn('a')('b', 'c') // ["a", "b", "c"]
```

:::
