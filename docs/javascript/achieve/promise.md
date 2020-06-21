---
title: Promises/A+ 的模拟实现
date: 2020-06-17 23:05:48
---

什么是 `Promise` 可以通过下面的文章了解，阅读后再回来翻看这篇文章。

- [Promises/A+](https://promisesaplus.com/)
- [Promises/A+ 译文](https://www.ituring.com.cn/article/66566)

## 初步实现

```js
new Promise((resolve, reject) => {
  console.log('promise start')
  resolve(1)
})
  .then()
  .then(value => {
    console.log(value)
  })

//  my promise start
//  1
```

```js
/**
 * 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
 * 2. executor 接受两个参数，分别是 resolve 和 reject
 * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 4. promise 的状态一旦确认，就不会再改变
 * 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled,
 *    和 promise 失败的回调 onRejected then方法返回 promise
 * */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
  constructor(executor) {
    // 校验参数
    if (typeof executor !== 'function') {
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }

    this.status = PENDING // 当前状态
    this.value = null // 终值
    this.reason = null // 拒因

    const resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
      }
    }

    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = function(value) {
        return value
      }
    }

    if (typeof onRejected !== 'function') {
      onRejected = function(reason) {
        return reason
      }
    }

    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
    return this
  }
}
```

验证

```js
// 参数校验
new MyPromise() // Uncaught TypeError: Promise resolver undefined is not a function

// 源例子校验
new MyPromise((resolve, reject) => {
  console.log('my promise start')
  resolve(1)
})
  .then()
  .then(value => {
    console.log(value)
  })
// my promise start
// 1
```

## 解决异步问题

```js
console.log(1)
new MyPromise((resolve, reject) => {
  console.log(2)
  resolve(1)
}).then(
  value => {
    console.log(3)
    console.log('value:', value)
  },
  err => console.log('error:', err)
)

console.log(4)
// 1, 2, 3, value: 1, 4
// 原生 Promise 则为 1, 2, 4, 3, value: 1
```

原因在于

```js
then(onFulfilled, onRejected) {
  // ...
  if (this.status === FULFILLED) {
    onFulfilled(this.value) // 立即执行
  }

  if (this.status === REJECTED) {
    onRejected(this.reason)
  }
}
```

修改一下

```js
then(onFulfilled, onRejected) {
  // ...
  if (this.status === FULFILLED) {
    setTimeout(() => {
      onFulfilled(this.value)
    })
  }

  if (this.status === REJECTED) {
    setTimeout(() => {
       onRejected(this.reason)
    })
  }
}
```

执行结果

```js
1, 2, 4, 3, value: 1
```

仍然还有问题：

```js
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('do reslove')
  })
}).then(value => {
  console.log(value)
})
// 无结果 应该输出 do reslove
```

因为在 `then` 中 `status` 是 `pending` 状态。怎么解决呢。

添加 `onFulfilledCallbacks` 成功回调函数， `onRejectedCallbacks`， 失败回调函数。

在 then 方法中判断 `this.status === PENDING` 时，分别执行对应的方法

```js {14,15,20,26,63,64,65,66,67,68,69,70,71,72,73,74,75}
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
  constructor(executor) {
    // 校验参数
    if (typeof executor !== 'function') {
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }

    this.status = PENDING // 当前状态
    this.value = null // 终值
    this.reason = null // 拒因
    this.onFulfilledCallbacks = [] // 成功回调
    this.onRejectedCallbacks = [] // 失败回调

    const resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = this.onFulfilledCallbacks.forEach(fn => fn(value))
      }
    }

    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = this.onRejectedCallbacks.forEach(fn => fn(reason))
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
    // 执行 executor 方法
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = function(value) {
        return value
      }
    }

    if (typeof onRejected !== 'function') {
      onRejected = function(reason) {
        throw reason
      }
    }

    if (this.status === FULFILLED) {
      setTimeout(() => {
        onFulfilled(this.value)
      })
    }

    if (this.status === REJECTED) {
      setTimeout(() => {
        onRejected(this.reason)
      })
    }

    if (this.status === PENDING) {
      this.onFulfilledCallbacks.push(value => {
        setTimeout(() => {
          onFulfilled(value)
        })
      })

      this.onRejectedCallbacks.push(value => {
        setTimeout(() => {
          onRejected(this.reason)
        })
      })
    }

    return this
  }
}
```

结果

```js
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('do reslove')
  })
}).then(value => {
  console.log(value)
})
// do reslove
```

## then 返回值

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('do reslove')
  })
})
  .then(value => {
    return '返回一个字符串 --- ' + value
  })
  .then(value2 => {
    console.log(value2)
  })

// 返回一个字符串 --- do reslove
//  MyPromise 结果：do reslove
```

then 方法必须返回一个 promise 对象

如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)

如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e。

如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值。

如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因。

不论 promise1 被 reject 还是被 resolve 时 promise2 都会被 resolve，只有出现异常时才会被 rejected。

--- 太多了 不写了。。。

## 最终
