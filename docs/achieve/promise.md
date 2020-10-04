---
title: Promises/A+
date: 2020-06-17 23:05:48
---

代码仓库 [实现一个 PromiseA+ 规范的 promise](https://github.com/alvin0216/my-promise)

## 第一步：搭建基本框架

> new Promise(executor), `executor` 参数是函数类型

```js
class MyPromise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }
    const reslove = value => {}
    const reject = value => {}
    try {
      executor(reslove, reject)
    } catch (e) {
      reject(e)
    }
  }
}
```

测试

```js
new Promise() // TypeError: Promise resolver undefined is not a function
```

## 第二步：实现 then 方法

```js
new Promise(resolve => resolve(1)).then(value => console.log(value))
// 1
```

### Promise 的状态

有等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。

1. executor 回调执行 `resolve`: `pending` -> `fulfilled`，执行 `onFulfilled`
2. executor 回调执行 `reject`: `pending` -> `rejected`, 执行 `onRejected`

### then(onFulfilled, onRejected)

Promise.then 方法中的回调参数 `onFulfilled`, `onRejected`

- `onFulfilled` 或 `onRejected` 不为函数，忽略执行。若执行异常，并返回拒因 e。
- `then` 方法必须返回一个 `promise` ，为的执行链式调用。`promise.then().then()`

代码：

```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }

    this.status = PENDING // 当前状态
    this.value = undefined // 终值
    this.reason = undefined // 拒因

    const reslove = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
      }
    }

    const reject = value => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
      }
    }

    try {
      executor(reslove, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      typeof onFulfilled === 'function' && onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      typeof onRejected === 'function' && onRejected(this.reason)
    }

    return this
  }
}
```

### then 方法支持链式

考虑一个问题：Promise 支持链式调用

```js
new Promise(resolve => resolve(1)).then().then(value => console.log(value)) // 1
```

换成 `MyPromise` 却无法输出，所以 then 方法继续包装，当其中 `onFulfilled`, `onRejected` 不为函数时包装为函数：

```js
then(onFulfilled, onRejected) {
  // onFulfilled, onRejected 参数校验
  if (typeof onFulfilled !== 'function') {
    onFulfilled = function (value) {
      return value
    }
  }

  if (typeof onRejected !== 'function') {
    onRejected = function (reason) {
      throw reason
    }
  }

 if (this.status === FULFILLED) {
    typeof onFulfilled === 'function' && onFulfilled(this.value)
  }

  if (this.status === REJECTED) {
    typeof onRejected === 'function' && onRejected(this.reason)
  }

  return this
}
```

## 第三步：then 方法异步执行

`onFulfilled` 和 `onRejected` 只有在执行环境堆栈仅包含**平台代码**时才可被调用

这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 `onFulfilled` 和 `onRejected` 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。这个事件队列可以采用“宏任务（macro-task）”机制或者“微任务（micro-task）”机制来实现。由于 promise 的实施代码本身就是平台代码（译者注：即都是 JavaScript），故代码自身在处理在处理程序时可能已经包含一个任务调度队列。

```js
new Promise((resolve, reject) => {
  console.log(1)
  resolve()
}).then(value => {
  console.log(2)
})

console.log(3)
// 1 3 2
```

`MyPromise` 仍然是 1 2 3 同步执行。我们给执行 `onFulfilled` 和 `onRejected` 时加个异步即可。

```js
new Promise((resolve, reject) => {
  console.log(1)
  setTimeout(() => {
    resolve()
  })
}).then(value => {
  console.log(2)
})
// 1 2
```

换成 MyPromise 后只输出 1，原因在于 `executor` 异步 `resolve`，而 `MyPromise` 中 `resolve` 仍然是同步的，then 却先一步执行了，导致这段代码没执行：

```js
const reslove = value => {
  if (this.status === PENDING) {
    this.status = FULFILLED
    this.value = value
  }
}
```

状态并没有修改，`this.status` 仍然是 `pending`, `then` 中:

```js {3}
then(onFulfilled, onRejected) {
  // ...
  if (this.status === FULFILLED) {
    typeof onFulfilled === 'function' && onFulfilled(this.value)
  }

  if (this.status === REJECTED) {
    typeof onRejected === 'function' && onRejected(this.reason)
  }

  return this
}
```

`this.status === FULFILLED` false，自然也没执行了 `onFulfilled`。

这里解决办法是：执行 then 的时候先存起来，等 reslove 的时候再一一执行即可：

```js {14,15,22,32,69}
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }

    this.status = PENDING // 当前状态
    this.value = undefined // 终值
    this.reason = undefined // 拒因
    this.onFulfilledCallbacks = [] // 成功态回调队列
    this.onRejectedCallbacks = [] //拒绝态回调队列

    const reslove = value => {
      setTimeout(() => {
        if (this.status === PENDING) {
          this.status = FULFILLED
          this.value = value
          this.onFulfilledCallbacks.forEach(cb => cb(this.value))
        }
      })
    }

    const reject = value => {
      setTimeout(() => {
        if (this.status === PENDING) {
          this.status = REJECTED
          this.reason = reason
          this.onRejectedCallbacks.forEach(cb => cb(this.reason))
        }
      })
    }

    try {
      executor(reslove, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    // onFulfilled, onRejected 参数校验
    if (typeof onFulfilled !== 'function') {
      onFulfilled = function (value) {
        return value
      }
    }

    if (typeof onRejected !== 'function') {
      onRejected = function (reason) {
        throw reason
      }
    }

    if (this.status === FULFILLED) {
      setTimeout(() => {
        typeof onFulfilled === 'function' && onFulfilled(this.value)
      })
    }

    if (this.status === REJECTED) {
      setTimeout(() => {
        typeof onRejected === 'function' && onRejected(this.reason)
      })
    }

    if (this.status === PENDING) {
      this.onFulfilledCallbacks.push(value => {
        setTimeout(() => {
          onFulfilled(this.value)
        })
      })

      this.onRejectedCallbacks.push(reason => {
        setTimeout(() => {
          onRejected(this.reason)
        })
      })
    }

    return this
  }
}
```

## 第四步：处理 onFulfilled, onRejected 返回值

```js
new Promise((resolve, reject) => {
  resolve('A')
})
  .then(value => {
    return 'B'
  })
  .then(value => {
    console.log(value)
  })
  .then(value => {
    console.log(value)
  })
// B undefined
```

`onFulfilled`, `onRejected` 如果有返回值 `x`, 进一步判断：

x 为 object，或者为 function 的时候，则将 x 作为函数的作用域 this 调用之。

比如：

```js
new Promise((resolve, reject) => {
  resolve('A')
})
  .then(value => {
    return new Promise(resolve => resolve('B')) // Promise 也可能是个函数
  })
  .then(value => {
    console.log(value)
  })
// B
```

所以这里进行判断，先包装 then 方法

```js
then(onFulfilled, onRejected) {
   // onFulfilled, onRejected 参数校验
   if (typeof onFulfilled !== 'function') {
     onFulfilled = function (value) {
       return value
     }
   }
   if (typeof onRejected !== 'function') {
     onRejected = function (reason) {
       throw reason
     }
   }
   let promise2 = new MyPromise((resolve, reject) => {
     if (this.status === FULFILLED) {
       setTimeout(() => {
         try {
           const x = onFulfilled(this.value)
           resolvePromise(promise2, x, resolve, reject)
         } catch (e) {
           reject(e)
         }
       })
     }
     if (this.status === REJECTED) {
       setTimeout(() => {
         try {
           const x = onRejected(this.reason)
           resolvePromise(promise2, x, resolve, reject)
         } catch (e) {
           reject(e)
         }
       })
     }
     if (this.status === PENDING) {
       this.onFulfilledCallbacks.push(value => {
         setTimeout(() => {
           try {
             const x = onFulfilled(this.value)
             resolvePromise(promise2, x, resolve, reject)
           } catch (e) {
             reject(e)
           }
         })
       })
       this.onRejectedCallbacks.push(reason => {
         setTimeout(() => {
           try {
             const x = onRejected(this.reason)
             resolvePromise(promise2, x, resolve, reject)
           } catch (e) {
             reject(e)
           }
         })
       })
     }
   })
   return promise2
}
```

这里用 resolvePromise 对返回值进行判断

### x 与 promise 相等

如果 `promise` 和 x 指向同一对象，以 `TypeError` 为据因拒绝执行 `promise`

看完这段代码就知道了：

```js
let p = new Promise(resolve => resolve())

let p1 = p.then(() => {
  return p1 // 循环调用
})
//  Chaining cycle detected for promise
```

所以先判断是否循环调用

```js
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new TypeError('Chaining cycle detected for promise')
  }
}
```

### x 为对象或函数

把 x.then 赋值给 then

> 这步我们先是存储了一个指向 x.then 的引用，然后测试并调用该引用，以避免多次访问 x.then 属性。这种预防措施确保了该属性的一致性，因为其值可能在检索调用时被改变。

如果 then 是函数，将 x 作为函数的作用域 this 调用之。

```js
let then = x.then
if (typeof then === 'function') {
  then.call(
    x,
    value => {
      resolvePromise(promise2, value, resolve, reject)
    },
    reject
  )
}
```

如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用

```js
let called = false
let then = x.then
if (typeof then === 'function') {
  then.call(
    x,
    value => {
      if (called) return
      called = true
      resolvePromise(promise2, value, resolve, reject)
    },
    reason => {
      if (called) return
      called = true
      reject(reason)
    }
  )
}
```

如果调用 then 方法抛出了异常 e, 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之, 否则以 e 为据因拒绝 promise

最终代码：

```js
function resolvePromise(promise2, x, resolve, reject) {
  // 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
  if (promise2 === x) {
    throw new TypeError('Chaining cycle detected for promise')
  }

  // x 为 function / object
  if ((x && typeof x === 'object') || typeof x === 'function') {
    // 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
    let called = false
    try {
      // 如果 then 是函数，将 x 作为函数的作用域 this 调用之
      let then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          value => {
            if (called) return
            called = true
            resolvePromise(promise2, value, resolve, reject)
          },
          reason => {
            if (called) return
            called = true
            reject(reason)
          }
        )
      } else {
        if (called) return
        called = true
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}
```
