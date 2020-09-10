---
title: 继承
date: 2020-09-10 00:21:17
---

super 代表的是父类的构造函数。

## super 关键字

```js
class A {}

class B extends A {
  constructor() {
    super() // 相当于 A.call(this)
  }
}

// 可以看成是
function A() {}
function B() {
  A.call(this) // super()
}
```

super 既可以当作函数使用，也可以当作对象使用。

- 作为函数时，`super()`只能用在子类的构造函数之中，用在其他地方就会报错。
- 当对象用是可以调用父类的方法，比如 `super.log()`

**在 `constructor` 在调用 `super` 前使用 `this` 会报错。**

```js
class A {}

class B extends A {
  constructor(name) {
    this.name = name // ReferenceError
    super() // 这里调用了
    this.name = name // 正确
  }
}
let c = new B('alvin')
```

## React 中不写 super

React 类组件不写 constructor 是没事的，因为会默认添加 constructor。

如果写了，一定要写，否则会报错。

```js
constructor(props) {
  super(props)
  // 在这里可以开始调用 this
}
```

super 中的 props 是否必要？ 作用是什么？？

- 可以不写 constructor，一旦写了 constructor，就必须在此函数中写 super()
- 此时组件才有自己的 this，在组件的全局中都可以使用 this 关键字，
- 否则如果只是 constructor 而不执行 super() 那么以后的 this 都是错的！！！

可以不写 `super(props)`，这样只是组件读取不到父组件传来的 `props` 而已。
