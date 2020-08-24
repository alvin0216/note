---
title: es5 和 es6 继承的区别
date: 2020-08-24 09:55:57
---

- ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（Parent.apply(this)）。

- ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到 this 上面（所以必须先调用 super 方法），然后再用子类的构造函数修改 this。
  - 在子类的构造函数中，只有调用 super 之后，才可以使用 this 关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有 super 方法才能调用父类实例。

---

ES5

```js
function Father() {}
Father.prototype.log = () => console.log('log...')

function Child(...args) {
  Father.apply(this, args)
}

Child.prototype = new Father()
Child.prototype.constructor = Child

// use
var c1 = new Child()
c1.log()
```

Class

```js
class Father {
  constructor(name) {
    this.name = name
  }
  log() {
    console.log(this.name)
  }
}

class Child extends Father {
  constructor(name) {
    super(name)
  }
}

var c1 = new Child('alvin')
c1.log()
```

参考：[es5 和 es6 继承的区别](https://www.cnblogs.com/shuhaonb/p/10364837.html)
