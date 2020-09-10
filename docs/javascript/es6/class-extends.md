---
title: 继承
date: 2020-09-10 00:21:17
---

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

```js
class A {
  log() {
    console.log('A')
  }
}

class B extends A {
  constructor() {
    // 子类的构造函数必须执行一次super函数
    super() // super 作为函数调用时，代表父类的构造函数
  }

  bb() {
    super.log() // 当作对象调用
  }

  cc() {
    super() // 会报错
  }
}
```
