---
title: 不可变数据
date: 2021-08-31 09:58:29
sidebar: auto
tags:
  - React
categories: React
---

- [阮一峰 ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/proxy)
- [带你重学 ES6 | proxy](https://juejin.cn/post/6857319959774265358)
- [带你重学 ES6 | Reflect](https://juejin.cn/post/6859162309449744391)
- [实现双向绑定 Proxy 比 defineproperty 优劣如何?](https://juejin.cn/post/6844903601416978439)

## 为什么强调不可变数据

```jsx
import React from 'react';

export default () => {
  const [obj, setObj] = useState({ name: 'alvin', others: { age: 18 } });
  const [count, setCount] = useState(0);

  const hanleClick = () => {
    obj.others.age = 99;
    setCount(prev => prev + 1);
  };

  return (
    <>
      <button onClick={hanleClick}>click</button>
      {JSON.stringify(obj, null, 2)}
    </>
  );
};
```

如上，点击后就会发现 obj 引用没变，但是 `obj.others.age` 修改了，然后也被重新渲染了，这是由于这就是引用类型的副作用导致的。

解决方案

1. 浅复制：只能复制一层
2. 深克隆：我们不仅要考虑到正则、Symbol、Date 等特殊类型,还要考虑到原型链和循环引用的处理，性能消耗大！
3. 深克隆的的性能相比于浅克隆大打折扣,但是浅克隆又不能从根本上杜绝引用类型的副作用，使用 immutable：
   - 即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。

## 实现简单的 immutable

`immer` 用法举例： `const nextState = produce(state, (draft) => {});`

```js
/** 浅复制 */
function shallowCopy(value) {
  if (Array.isArray(value)) return value.slice();
  if (value.__proto__ === undefined)
    return Object.assign(Object.create(null), value);
  return Object.assign({}, value);
}

function createState(target) {
  this.modified = false; // 是否被修改
  this.target = target; // 目标对象
  this.copy = undefined; // 拷贝的对象
}

createState.prototype = {
  // 对于get操作,如果目标对象没有被修改直接返回原对象,否则返回拷贝对象
  get: function(key) {
    if (!this.modified) return this.target[key];
    return this.copy[key];
  },

  // 对于set操作,如果目标对象没被修改那么进行修改操作,否则修改拷贝对象
  set: function(key, value) {
    if (!this.modified) this.markChanged();
    return (this.copy[key] = value);
  },

  // 标记状态为已修改,并拷贝
  markChanged: function() {
    if (!this.modified) {
      this.modified = true;
      this.copy = shallowCopy(this.target);
    }
  },
};

const PROXY_STATE = Symbol('proxy-state');

// 接受一个目标对象和一个操作目标对象的函数
function produce(state, producer) {
  const store = new createState(state);
  const proxy = new Proxy(store, {
    get(target, key) {
      if (key === PROXY_STATE) return target;
      return target.get(key);
    },
    set(target, key, value) {
      return target.set(key, value);
    },
  });

  producer(proxy);

  const newState = proxy[PROXY_STATE];
  if (newState.modified) return newState.copy;
  return newState.target;
}

const baseState = [
  { todo: 'Learn typescript', done: true },
  { todo: 'Try immer', done: false },
];

const nextState = produce(baseState, draft => {
  draft.push({ todo: 'Tweet about it', done: false });
  draft[1].done = true; // 这里会改到原属性
});

console.log(baseState, nextState);
```

执行结果：

```js
[
  { todo: 'Learn typescript', done: true },
  { todo: 'Try immer', done: true },
][
  ({ todo: 'Learn typescript', done: true },
  { todo: 'Try immer', done: true },
  { todo: 'Tweet about it', done: false })
];
```

## defineProperty vs Proxy

这个没特别的深入，

1. `defineProperty` 无法监听数组变化 比如 `arr[1] = 2`; 如果需要监听
2. `defineProperty` 只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历，如果属性值也是对象那么需要深度遍历,显然能劫持一个完整的对象是更好的选择。
3. `Proxy` 可以直接监听对象而非属性,`Proxy` 的劣势就是兼容性问题,而且无法用 `polyfill` 磨平
