---
title: Javascript 中的数据类型
date: 2020-05-06 22:07:38
---

## 数据类型与判断方式

| 原始类型                                                     | 引用类型                                        |
| ------------------------------------------------------------ | ----------------------------------------------- |
| `String`、`Number`、`Boolean`、`null`、`undefined`、`Symbol` | `Object`、`Array`、`Date`、`RegExp`、`Function` |

原始类型存储在栈中、引用类型存储在堆中

判断方式 typeof instanceof，更多时候更推崇 `Object.prototype.toString.call()`

```js
typeof null === 'object'
[] instanceof Array // Error

Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
```

### typeof null = object?

来谈谈关于 `typeof` 的原理吧，我们可以先想一个很有意思的问题，`js` 在底层是怎么存储数据的类型信息呢？或者说，一个 `js` 的变量，在它的底层实现中，它的类型信息是怎么实现的呢？

其实，js 在底层存储变量的时候，会在变量的机器码的低位 1-3 位存储其类型信息 👉

- 000：对象
- 010：浮点数
- 100：字符串
- 110：布尔
- 1：整数

but, 对于 `undefined` 和 `null` 来说，这两个值的信息存储是有点特殊的。

- `null`：所有机器码均为 0
- `undefined`：用 −2^30 整数来表示

**不同的对象在底层原理的存储是用二进制表示的，在 `javaScript` 中，如果二进制的前三位都为 0 的话，系统会判定为是 `Object` 类型。null 的存储二进制是 `000`，也是前三位，所以系统判定 `null` 为 `Object` 类型。**

然而用 `instanceof` 来判断的话 👉

```js
null instanceof null
// TypeError: Right-hand side of 'instanceof' is not an object
```

`null` 直接被判断为不是 object，这也是 JavaScript 的历史遗留 bug，可以参考[typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)

因此在用 typeof 来判断变量类型的时候，我们需要注意，最好是用 typeof 来判断基本数据类型（包括 `symbol`），避免对 `null` 的判断。

### Null 和 undefined 的区别

```js
console.log(null == undefined) // true
console.log(null === undefined) // false
```

**null 表示"没有对象"，即该处不应该有值**。典型用法是：

```js
1. 作为函数的参数，表示该函数的参数不是对象。
2. 作为对象原型链的终点。

Object.getPrototypeOf(Object.prototype) // null
```

**undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义**。典型用法是：

```js
1. 变量被声明了，但没有赋值时，就等于 undefined。
2. 调用函数时，应该提供的参数没有提供，该参数等于 undefined。
3. 对象没有赋值的属性，该属性的值为 undefined。
4. 函数没有返回值时，默认返回 undefined。
```

```JS
var i;
i // undefined

function f(x){console.log(x)}
f() // undefined

var  o = new Object();
o.p // undefined

var x = f();
x // undefined
```

[阮一峰 undefined 与 null 的区别](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

## 隐式类型转化（valueOf 与 toString）

举个例子：

```JS
'1' + 2 // '12'
2 - '1' // 1
[1] + 2 // '12'
```

`valueOf` 与 `toString`: 二者并存的情况下，在数值运算中，优先调用了 valueOf，字符串运算中，优先调用了 toString。

balabal...

实现

```js
a == 1 && a == 2 && a == 3 // true
```

重写 toString

```js
let a = [1, 2, 3]
a.toString = a.shift
a == 1 && a == 2 && a == 3 // true
```

---

- [ecma262 标准](https://tc39.es/ecma262/#sec-ordinarytoprimitive)
- [你所忽略的 js 隐式转换](https://juejin.im/post/6844903557968166926)
- [🔥 动画：《大前端吊打面试官系列》 之原生 JavaScript 精华篇](https://juejin.im/post/5e34d19de51d4558864b1d1f)
- [浅谈 instanceof 和 typeof 的实现原理](https://juejin.im/post/5b0b9b9051882515773ae714)
- [全面分析 toString 与 valueOf，并随手解决掉几道大厂必备面试题](https://juejin.im/post/6873215243804213262)
