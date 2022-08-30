---
title: 基础巩固
date: 2021-07-22 09:23:33
sidebar: auto
---

## 函数声明 & 函数提升

#### 输出是什么？

```js
fn();

function fn() {
  console.log(1);
}

fn();
function fn() {
  console.log(2);
}
```

<details><summary><b>答案</b></summary>
<p>

**答案: `2, 2` 函数声明覆盖了。**

</p>
</details>

---

#### 输出是什么？

```js
fn();

var fn = function () {
  console.log(1);
};

fn();
function fn() {
  console.log(2);
}
```

<details><summary><b>答案</b></summary>
<p>

**答案: `2 1`, 第一个 fn 函数提升，第二个 fn 被 var 函数重声明了**

</p>
</details>

---

#### 输出是什么？

```js
function a() {}

console.log(a.name);

a.name = '1111';

console.log(a.name);
```

<details><summary><b>答案</b></summary>
<p>

**答案: a, a**

</p>
</details>

## 作用域 & 闭包

#### 输出是什么？

```js
var a = 20;

function bar() {
  console.log(a);
}

function foo(fn) {
  var a = 10;
  fn();
}

foo(bar);
```

<details><summary><b>答案</b></summary>
<p>

**20**

</p>
</details>

---

#### 输出是什么？

```js
function fun(n, o) {
  console.log(o);
  return {
    fun: function (m) {
      return fun(m, n);
    },
  };
}

var a = fun(0);
a.fun(1);
a.fun(2);
a.fun(3);
var b = fun(0).fun(1).fun(2).fun(3);
var c = fun(0).fun(1);
c.fun(2);
c.fun(3);
```

<details><summary><b>答案</b></summary>
<p>

```js
var a = fun(0); // undefined => a closure { n: 0 }
a.fun(1); // 0
a.fun(2); // 0
a.fun(3); // 0
var b = fun(0).fun(1).fun(2).fun(3); // undefind 0 1 2
var c = fun(0).fun(1); // undefind 0
c.fun(2); // 1
c.fun(3); // 1
```

</p>
</details>

---

#### 输出是什么？

```js
let a = 3;
total = 0;

function func(a) {
  let result = [];
  for (var i = 0; i < 3; i++) {
    result[i] = function () {
      total += i * a;
      console.log(total);
    };
  }
  return result;
}

const bb = func(1);
bb[0]();
bb[1]();
bb[2]();
```

<details><summary><b>答案</b></summary>
<p>

**3 6 9**

</p>
</details>

## this

#### 输出是什么？

```js
var length = 10;
function func() {
  console.log(this.length);
}
var obj = {
  length: 5,
  run: function (func) {
    func();
    arguments[0]();
  },
};

obj.run(func, 123);
```

<details><summary><b>答案</b></summary>
<p>

- `func()` 执行环境是全局。`length = 10`
- `arguments[0]()`：arguments 也是对象，也有 `length` 属性. `length = 2`

</p>
</details>

---

#### 输出是什么？

```js
var name = 'global';

var obj = {
  name: 'obj',
  a() {
    return function () {
      console.log(this.name);
    };
  },
};

obj.a()();
```

<details><summary><b>答案</b></summary>
<p>

`global`

`obj.a()()` 执行环境是 `obj.a()` 也就是全局。

</p>
</details>

---

#### 输出是什么？

```js
var name = 'windowsName';

var a = {
  name: 'Cherry',
  func1: function () {
    console.log(this.name);
  },
  func2: function () {
    setTimeout(function () {
      console.log(this.name);
      this.func1();
    }, 100);
  },
};

a.func2();
```

<details><summary><b>答案</b></summary>
<p>

```js
var name = 'windowsName';

var a = {
  name: 'Cherry',
  func1: function () {
    console.log(this.name);
  },
  func2: function () {
    setTimeout(function () {
      console.log(this.name); // windowsName
      this.func1(); // this.func1 is not a function
    }, 100);
  },
};

a.func2();
```

this 的运行时是在一个定时器中，因为它是匿名函数被单独调用，其上下文是全局，所以没有 func1 这个方法。所以必然报错。

</p>
</details>

---

#### 输出是什么？

```js
var a = {
  b: function () {
    console.log(this);
  },
  c: () => {
    console.log(this);
  },
  d: {
    e: () => {
      console.log(this);
    },
    g: {
      i: () => {
        console.log(this);
      },
    },
  },
  f: function () {
    var func = () => {
      console.log(this);
    };
    func();
  },
};

a.b();
a.c();
a.d.e();
a.d.g.i();
a.f();
```

<details><summary><b>答案</b></summary>
<p>

```js
a.b(); // a
a.c(); // window
a.d.e(); // window
a.d.g.i(); // window
a.f(); // a
```

1. 箭头函数里面的 this 就是定义时上层作用域中的 this！
2. 注意 this 指的是**函数**运行时所在的环境，a 对象并没有被函数包裹，所以输出 window 是默认只想上一级环境，也就是 window

</p>
</details>

---

#### 输出是什么？

```js
var name = 'Nicolas';
function Person() {
  this.name = 'Smiley';
  this.sayName = function () {
    console.log(this.name);
  };
  setTimeout(this.sayName, 2000);
}

var person = new Person();
person.sayName();
```

<details><summary><b>答案</b></summary>
<p>

`Smiley`
`undefined`
`Nicolas`

</p>
</details>

## eventloop

```js
new Promise(function (resolve, reject) {
  reject(1);
  console.log(2);
})
  .catch((e) => {
    console.log(3);
    console.log('catch', e);
  })
  .then(() => {
    console.log(4);
  });

// 2 3 catch 1 4
```

把 then 放前面呢？

```js
new Promise(function (resolve, reject) {
  reject(1);
  console.log(2);
})

  .then(() => {
    console.log(4);
  })
  .catch((e) => {
    console.log(3);
    console.log('catch', e);
  });

// 2 3 catch 1
```

如果没有 catch，会被 try catch 里面捕捉吗？：

```js
try {
  new Promise(function (resolve, reject) {
    reject(1);
    console.log(2);
  }).then(() => {
    console.log(3);
  });
} catch (error) {
  console.log('error', error);
}
// 2 不会
```

---

```js
setTimeout(() => {
  console.log(1);
});

Promise.resolve()
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  });

// 2 3 1
```
