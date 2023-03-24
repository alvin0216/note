---
title: Proxy
date: 2022-05-16 22:19:10
sidebar: auto
tags:
  - Proxy
categories:
  - Javascript
---

1. 知道 `proxy` 吗
2. 为什么 `vue` 用 `proxy` 取代 `defineProperty`

## defineProperty 的缺点

```js
let obj = {};
Object.defineProperty(obj, 'age', { get() {}, set() {} });
```

上面的使用中，我们只监听了一个属性的变化.，但是在实际情况中，我们通常需要一次监听多个属性的变化。

- `defineProperty` 无法对新增的属性进行劫持。
  - vue2 的话重写了数组方法才可以的。如果需要对新属性监听，可以通过 `$set`
- `defineProperty` 一次只能对一个属性进行监听，需要遍历来对所有属性监听。深度监听一个对象性能开销大（递归）

`Object.definePorperty()` 进行数据监听是比较麻烦的，需要大量的手动处理。这也是为什么在 `Vue3.0` 中尤雨溪转而采用 `Proxy`。

## Proxy 支持 13 种拦截操作

除了 get 和 set 来拦截读取和赋值操作之外，Proxy 还支持对其他多种行为的拦截。下面是一个简单介绍，想要深入了解的可以去 MDN 上看看。

1. get(target, propKey, receiver)：拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']。
2. set(target, propKey, value, receiver)：拦截对象属性的设置，比如 proxy.foo = v 或 proxy['foo'] = v，返回一个布尔值。
3. has(target, propKey)：拦截 propKey in proxy 的操作，返回一个布尔值。
4. deleteProperty(target, propKey)：拦截 delete proxy[propKey]的操作，返回一个布尔值。
5. ownKeys(target)：拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
6. getOwnPropertyDescriptor(target, propKey)：拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
7. defineProperty(target, propKey, propDesc)：拦截 Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
8. preventExtensions(target)：拦截 Object.preventExtensions(proxy)，返回一个布尔值。
9. getPrototypeOf(target)：拦截 Object.getPrototypeOf(proxy)，返回一个对象。
10. isExtensible(target)：拦截 Object.isExtensible(proxy)，返回一个布尔值。
11. setPrototypeOf(target, proto)：拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
12. apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
13. construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)。
