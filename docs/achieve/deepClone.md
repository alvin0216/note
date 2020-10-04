---
title: 实现深拷贝
date: 2020-05-25 18:07:24
---

## 递归实现深拷贝

1. 获取克隆对象的类型，如果不是 `Object` 类型则直接返回
2. 如果是 `Object` 类型，遍历递归复制

```js
function clone(target) {
  // 获取 target 类型
  const type = Object.prototype.toString.call(target).slice(8, -1)

  if (type !== 'Object') return target

  let cloneTarget = {}
  for (const key in target) {
    cloneTarget[key] = clone(target[key])
  }
  return cloneTarget
}
```

::: details 测试

```js
const target = {
  name: 'alvin',
  others: { age: 12 }
}

let newTarget = clone(target)
newTarget.others.age = 18 // target 12, newTarget 18
```

:::

## 可继续遍历的类型

可遍历类型的有 Object、Array、Set、Map、Arguments，克隆这些可遍历对象的时候需要遍历复制内部的属性值，不能只复制引用。

但是上面的代码只是对 `Object` 类型进行了遍历复制。这远远不够的。

我们去掉限制看下：

```js
function clone(target) {
  let cloneTarget = {}
  for (const key in target) {
    cloneTarget[key] = clone(target[key])
  }
  return cloneTarget
}

const target = {
  nums: [1, 2],
  map: new Map([['name', 'Kobe']]),
  Set: new Set([1])
}
clone(target) //{ nums: { '0': {}, '1': {} }, map: {}, set: {} }
```

怎么做让他们可以遍历复制其他数据，需要进行一些处理的。

我们首先需要获取它们的初始化数据，例如上面的`[]`和`{}`，我们可以通过拿到 `constructor` 的方式来通用的获取。

例如：`const target = {}` 就是 `const target = new Object()` 的语法糖。另外这种方法还有一个好处：因为我们还使用了原对象的构造方法，所以它可以保留对象原型上的数据，如果直接使用普通的{}，那么原型必然是丢失了的。

```js
// 举个例子
let target = []
const Ctor = target.constructor // [Function: Array]
const cloneTarget = new Ctor()
```

ok，知道原理后改写 `clone` 函数：

```js
const deepTypes = ['Map', 'Set', 'Array', 'Object', 'Arguments'] // 可遍历类型
function clone(target) {
  // 获取 target 类型
  const type = Object.prototype.toString.call(target).slice(8, -1)

  // 如果是可继续遍历的类型 如 Object、Array 等等
  if (deepTypes.includes(type)) {
    let cloneTarget = new target.constructor() // 拿到构造函数新建一个实例

    for (const key in target) {
      cloneTarget[key] = clone(target[key])
    }
    return cloneTarget
  }

  // 默认返回不可在遍历的类型
  return target
}
```

map、set 结构需要特殊处理。

```js
const deepTypes = ['Map', 'Set', 'Array', 'Object', 'Arguments'] // 可遍历类型
function clone(target) {
  // 获取 target 类型
  const type = Object.prototype.toString.call(target).slice(8, -1)

  // 如果是可继续遍历的类型 如 Object、Array 等等
  if (deepTypes.includes(type)) {
    let cloneTarget = new target.constructor() // 拿到构造函数新建一个实例

    // map 的特殊处理
    if (type === 'Map') {
      target.forEach((value, key) => {
        cloneTarget.set(key, clone(value))
      })
      return cloneTarget
    }

    // Set 的特殊处理
    if (type === 'Set') {
      target.forEach(value => {
        cloneTarget.add(clone(value))
      })
      return cloneTarget
    }

    for (const key in target) {
      cloneTarget[key] = clone(target[key])
    }
    return cloneTarget
  }

  // 默认返回不可在遍历的类型
  return target
}
```

## 不可继续遍历的类型

上面我们已经考虑的 `object`、`array` 都属于可以继续遍历的类型等等，因为它们内存都还可以存储其他数据类型的数据。

其他剩余的类型我们把它们统一归类成不可处理的数据类型，我们依次进行处理：

比如复制 Bool、Number、String、String、Date、Error 这几种类型我们都可以直接用构造函数和原始数据创建一个新对象：

```js
const deepTypes = ['Map', 'Set', 'Array', 'Object', 'Arguments'] // 可遍历类型

function clone(target) {
  // 获取 target 类型
  const type = Object.prototype.toString.call(target).slice(8, -1)

  // 如果是可遍历类型
  if (deepTypes.includes(type)) {
    //
  }

  if (type === 'RegExp') {
    return cloneReg(target) // cloneReg 可以在外面去写
  }

  if (type === 'Symbol') {
    return Object(Symbol.prototype.valueOf.call(target))
  }

  //... cloneFunction 等等等

  // 默认返回 target
  return target
}
```

## 考虑循环引用的问题

```js
const target = {}
target.aaa = target
console.log(clone(target)) // RangeError: Maximum call stack size exceeded
```

解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。

```js
const deepTypes = ['Map', 'Set', 'Array', 'Object', 'Arguments']

function clone(target, map = new WeakMap()) {
  // 获取 target 类型
  const type = Object.prototype.toString.call(target).slice(8, -1)
  if (map.has(target)) return map.get(target) // 解决循环引用问题

  // 如果是可继续遍历的类型 如 Object、Array 等等
  if (deepTypes.includes(type)) {
    let cloneTarget = new target.constructor() // 拿到构造函数新建一个实例
    map.set(target, cloneTarget) // 添加引用标记
    // map 的特殊处理
    if (type === 'Map') {
      target.forEach((value, key) => {
        cloneTarget.set(key, clone(value, map))
      })
      return cloneTarget
    }

    // Set 的特殊处理
    if (type === 'Set') {
      target.forEach(value => {
        cloneTarget.add(clone(value, map))
      })
      return cloneTarget
    }

    for (const key in target) {
      cloneTarget[key] = clone(target[key], map)
    }
    return cloneTarget
  }

  // 默认返回不可在遍历的类型
  return target
}
```

[如何写出一个惊艳面试官的深拷贝?](https://juejin.im/post/5d6aa4f96fb9a06b112ad5b1)
