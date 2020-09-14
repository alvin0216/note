---
title: node 中的 eventloop
date: 2020-09-14 15:38:28
---

![](https://gitee.com/alvin0216/cdn/raw/master/img/browser/eventloop/node.png)

## 阶段

- **定时器检测阶段(timers)**：本阶段执行 timer 的回调，即 setTimeout、setInterval 里面的回调函数。
- **I/O 事件回调阶段(I/O callbacks)**：执行延迟到下一个循环迭代的 I/O 回调，即上一轮循环中未被执行的一些 I/O 回调。
- **闲置阶段(idle, prepare)**：仅系统内部使用。
- **轮询阶段(poll)**：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
- **检查阶段(check)**：setImmediate() 回调函数在这里执行
- **关闭事件回调阶段(close callback)**：一些关闭的回调函数，如：socket.on('close', ...)。

**三大重点阶段**

日常开发中的绝大部分异步任务都是在 poll、check、timers 这 3 个阶段处理的,所以我们来重点看看。

### timers

timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。同样，在 Node 中定时器指定的时间也不是准确时间，只能是尽快执行。

### poll

poll 是一个至关重要的阶段，poll 阶段的执行逻辑流程图如下：

<img class='small' alt='node poll' src='https://gitee.com/alvin0216/cdn/raw/master/img/browser/eventloop/poll.png' />

如果当前已经存在定时器，而且有定时器到时间了，拿出来执行，eventLoop 将回到 timers 阶段。

如果没有定时器, 会去看回调函数队列。

- 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
- 如果 poll 队列为空时，会有两件事发生
  - 如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
  - 如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去,一段时间后自动进入 check 阶段。

### check

check 阶段。这是一个比较简单的阶段，直接执行 setImmdiate 的回调。

## process.nextTick

process.nextTick 是一个独立于 eventLoop 的任务队列。

在每一个 eventLoop 阶段完成后会去检查 nextTick 队列，如果里面有任务，会让这部分任务优先于微任务执行。

```js
setImmediate(() => {
  console.log('timeout1')
  Promise.resolve().then(() => console.log('promise resolve'))
  process.nextTick(() => console.log('next tick1'))
})
setImmediate(() => {
  console.log('timeout2')
  process.nextTick(() => console.log('next tick2'))
})
setImmediate(() => console.log('timeout3'))
setImmediate(() => console.log('timeout4'))
```

在 node11 之前，因为每一个 eventLoop 阶段完成后会去检查 nextTick 队列，如果里面有任务，会让这部分任务优先于微任务执行，因此上述代码是先进入 check 阶段，执行所有 setImmediate，完成之后执行 nextTick 队列，最后执行微任务队列，因此输出为

```js
// timeout1 timeout2 timeout3 timeout4
// next tick1 next tick2 promise resolve
```

在 node11 之后，process.nextTick 是微任务的一种,因此上述代码是先进入 check 阶段，执行一个 setImmediate 宏任务，然后执行其微任务队列，再执行下一个宏任务及其微任务,因此输出为

```js
timeout1 next tick1 promise resolve
timeout2 next tick2
timeout3
timeout4
```

## 实例

```js
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function() {
    console.log('promise2')
  })
}, 0)
```

首先说 node 版本 >= 11 的，它会和浏览器表现一致，一个定时器运行完立即运行相应的微任务。

```js
node >= 11

timer1
promise1
time2
promise2
```

而 node 版本小于 11 的情况下，对于定时器的处理是:

**若第一个定时器任务出队并执行完，发现队首的任务仍然是一个定时器，那么就将微任务暂时保存，直接去执行新的定时器任务，当新的定时器任务执行完后，再一一执行中途产生的微任务。**

```js
timer1
timer2
promise1
promise2
```
