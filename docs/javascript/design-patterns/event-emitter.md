---
title: 发布订阅模式
date: 2020-07-15 09:43:34
---

## 简版

```js
class EventEmitter {
  constructor() {
    this.events = new Map()
  }

  addListener(eventName, listener) {
    if (typeof listener !== 'function') throw new TypeError('listener is not a function')

    const handler = this.events.get(eventName)
    if (!handler) {
      this.events.set(eventName, [listener])
    } else {
      // 判断是否是同个函数
      const hasSame = handler.some(fn => fn === listener)
      !hasSame && handler.push(listener)
      this.events.set(eventName, handler)
    }
  }

  emit(eventName, ...args) {
    const handler = this.events.get(eventName)

    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        handler[i].call(this, ...args)
      }
    }

    return true
  }
}
```

测试

```js
const event = new EventEmitter()

function func(...args) {
  console.log('func: ', ...args)
}

event.addListener('aaa', func)
event.addListener('aaa', func)
event.addListener('aaa', () => {
  console.log('匿名')
})

event.emit('aaa', 1, 2)
// func:  1 2
// 匿名
```

## 添加 removeListener

```js
class EventEmitter {
  // ...
  removeListener(eventName, listener) {
    const handler = this.events.get(eventName)

    if (Array.isArray(handler)) {
      const newHandler = handler.filter(fn => fn !== listener)
      this.events.set(eventName, newHandler)
    }
  }

  removeAllListener(eventName) {
    this.events.delete(eventName)
  }
}
```

但是匿名函数并不能移除监听...

## 增加最大监听数

最终代码：

```js
const MAX_LISTENERS = 10

class EventEmitter {
  constructor() {
    this.events = new Map()
  }

  addListener(eventName, listener) {
    if (typeof listener !== 'function') throw new TypeError('listener is not a function')

    const handler = this.events.get(eventName)
    if (!handler) {
      this.events.set(eventName, [listener])
    } else {
      // 判断是否是同个函数
      const hasSame = handler.some(fn => fn === listener)
      !hasSame && handler.push(listener)

      if (handler.length > MAX_LISTENERS) {
        throw new RangeError(`The maximum number of listener is ${MAX_LISTENERS}`)
      }

      this.events.set(eventName, handler)
    }
  }

  emit(eventName, ...args) {
    const handler = this.events.get(eventName)

    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        handler[i].call(this, ...args)
      }
    }

    return true
  }

  removeListener(eventName, listener) {
    const handler = this.events.get(eventName)

    if (Array.isArray(handler)) {
      const newHandler = handler.filter(fn => fn !== listener)
      this.events.set(eventName, newHandler)
    }
  }

  removeAllListener(eventName) {
    this.events.delete(eventName)
  }
}
```

- [面试官:既然 React/Vue 可以用 Event Bus 进行组件通信,你可以实现下吗?](https://juejin.im/post/5ac2fb886fb9a028b86e328c)
- [发布订阅模式，在工作中它的能量超乎你的想象](https://juejin.im/post/5b125ad3e51d450688133f22)
