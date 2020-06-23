---
title: promise 的链式调用执行机制
date: 2020-06-23 21:41:08
---

```js
new Promise((resolve, reject) => {
  console.log(1)
  resolve()
}).then(() => {
  console.log(2)
})
console.log(3)
```

执行顺序 1 3 2。再看看 `then` 方法内再来一个 `Promise`

## Promise.then 回调又一个 Promise

```JS {11}
new Promise((resolve, reject) => { // 称之为 outer
  console.log(1)
  resolve()
})
  .then(() => {
    console.log(2)
    new Promise((resolve, reject) => { // 称之为 inner
      console.log(2.1)
      resolve()
    })
      .then(() => { // 为什么先输出 2.2 再输出 3 -> 2.3 ?
        console.log(2.2)
      })
      .then(() => {
        console.log(2.3)
      })
  })
  .then(() => {
    console.log(3)
  })
```

> 当执行 then 方法时，如果前面的 promise 已经是 resolved 状态，则直接将回调放入微任务队列中

1. 执行 `outerPromise` 的 `executor`， `resolve` 入列 [**outerPromise.then1**]。输出 1
2. 执行 `outerPromise.then1`, 执行同步代码。输出 2，2.1。
   1. 执行内部 innerPromise 入列 [**innerPromise.then1**]
   2. outerPromise.then 执行完毕，下一轮 then 的调用也是一个微任务 入列 [**innerPromise.then1**, **outerPromise.then2**]
3. 执行微任务 `innerPromise.then1`, 输出 2.2。微任务入列 [**outerPromise.then2**, **innerPromise.then2**]
4. 执行微任务 `outerPromise.then2`, 输出 3 微任务结束
5. 执行微任务 `innerPromise.then2`, 输出 2.3 微任务结束

## Promise.then 回调返回 Promise

Promise.then 中 return Promise 呢？

```js {7}
new Promise((resolve, reject) => {
  console.log(1)
  resolve()
})
  .then(() => {
    console.log(2)
    return new Promise((resolve, reject) => {
      console.log(2.1)
      resolve()
    })
      .then(() => {
        console.log(2.2)
      })
      .then(() => {
        console.log(2.3)
      })
  })
  .then(() => {
    console.log(3)
  })
```

看源码实现后比较容易理解 `reslovePromise` 处理了 `onFulfilled` 的返回值：

```js
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
}
```

> 这里 `Promise` 的第二个 `then` 相当于是挂在新 `Promise` 的最后一个 `then` 的返回值上。

显而易见 执行顺序为 1 2 2.1 2.2 2.3 3

## 两个 Promise 是怎样一个执行顺序

```js
new Promise((resolve, reject) => {
  console.log(1)
  resolve()
}).then(() => {
  console.log(2)
})

new Promise((resolve, reject) => {
  console.log(3)
  resolve()
}).then(() => {
  console.log(4)
})
```

1 3 `2` `4`

同理 2 先入微任务队列，4 后入。所以先执行 2 后 4

## async / await

```js
async function foo() {
  console.log('foo')
  await bar()
  console.log('await 后面就像执行 Promise.then')
}

function bar() {
  console.log('bar')
}

foo()
```

foo -> bar -> `await 后面就像执行 Promise.then`

经典面试题：

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function() {
  console.log('settimeout')
}, 0)

async1()

new Promise(function(resolve) {
  console.log('promise1')
  resolve()
}).then(function() {
  console.log('promise2')
})
console.log('script end')
```

:::details 答案

- `script start`
- `async1 start`
- `async2`
- `promise1`
- `script end`
- `async1 end`
- `promise2`
- `settimeout`

:::

- 摘自 [Eventloop 不可怕，可怕的是遇上 Promise](https://juejin.im/post/5c9a43175188252d876e5903)
- 推荐 [这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)
- 推荐 [实现 promise A+ 规范的 promise](https://github.com/alvin0216/my-promise)
