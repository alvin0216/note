---
title: 深拷贝实现
date: 2020-05-25 18:07:24
---

```js
// ? 可以继续遍历的数据类型
const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const argsTag = '[object Arguments]'

// ? 可以继续遍历的数据类型
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const errorTag = '[object Error]'
const regexpTag = '[object RegExp]'
const funcTag = '[object Function]'

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag]

// ? 工具函数 - 通用的 while 循环
function forEach(array, iteratee) {
  let index = -1
  const length = array.length

  while (++index < length) {
    iteratee(array[index], index)
  }
  return array
}

// ? 工具函数 - 判断是否为引用类型
function isObject(target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}

function getType(target) {
  return Object.prototype.toString.call(target)
}

// ? 工具函数 - 初始化数据
function getInit(target) {
  const Ctor = target.constructor
  return new Ctor()
}

// ? 工具函数 - cloneSymbol
function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target))
}

// ? 工具函数 - cloneReg
function cloneReg(target) {
  const reFlags = /\w*$/
  const result = new target.constructor(target.source, reFlags.exec(target))
  result.lastIndex = target.lastIndex
  return result
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const funcString = func.toString()
  if (func.prototype) {
    const param = paramReg.exec(funcString)
    const body = bodyReg.exec(funcString)
    if (body) {
      if (param) {
        const paramArr = param[0].split(',')
        return new Function(...paramArr, body[0])
      } else {
        return new Function(body[0])
      }
    } else {
      return null
    }
  } else {
    return eval(funcString)
  }
}

function cloneOtherType(target, type) {
  const Ctor = target.constructor
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target)
    case regexpTag:
      return cloneReg(target)
    case symbolTag:
      return cloneSymbol(target)
    case funcTag:
      return cloneFunction(target)
    default:
      return null
  }
}

function clone(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target
  }

  //
  const type = getType(target)
  let cloneTarget
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type)
  } else {
    return cloneOtherType(target, type)
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target)
  }

  map.set(target, cloneTarget)

  // 克隆set
  if (type === setTag) {
    target.forEach(value => {
      cloneTarget.add(clone(value, map))
    })
    return cloneTarget
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map))
    })
    return cloneTarget
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target)
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value
    }
    cloneTarget[key] = clone(target[key], map)
  })

  return cloneTarget
}
```

测试

```js
const map = new Map()
map.set('key', 'value')
map.set('ConardLi', 'code秘密花园')

const set = new Set()
set.add('ConardLi')
set.add('code秘密花园')

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  symbol: Object(Symbol(1)),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  func1: () => {
    console.log('code秘密花园')
  },
  func2: function(a, b) {
    return a + b
  }
}
const result = clone(target)

console.log(target)
console.log(result)
```

[如何写出一个惊艳面试官的深拷贝?](https://juejin.im/post/5d6aa4f96fb9a06b112ad5b1)
