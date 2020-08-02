---
title: Javascript 中的数据类型
date: 2020-05-06 22:07:38
---

> 面试官：说说 `JavaScript` 中的基本类型有哪些？以及各个数据类型是如何存储的？

`JavaScript` 的数据类型包括`原始类型`和`引用类型(对象类型)`。

最基本常用到原始类型包括以下 6 个：

- `String`
- `Number`
- `Boolean`
- `null`
- `undefined`
- `Symbol`

引用类型统称为 `Object` 类型，如果细分的话，分为以下 5 个：

- `Object`
- `Array`
- `Date`
- `RegExp`
- `Function`

## 数据类型的存储形式

栈（`Stack`）和堆（`Heap`），是两种基本的数据结构。

- `Stack` 在内存中自动分配内存空间的；
- `Heap` 在内存中动态分配内存空间的，不一定会自动释放。一般我们在项目中将对象类型手动置为 `null` 原因，减少无用内存消耗。

原始类型（存在栈内存中）和对象类型（存在堆内存中）分别在内存中的存在形式如下图示：

![](https://gitee.com/alvin0216/cdn/raw/master/img/javascript/data-types/1.png)

原始类型是按值形式存放在栈中的数据段，内存空间可以自由分配，同时可以按值直接访问。

```js
var a = 10
var b = a
b = 30
console.log(a) // 10值
console.log(b) // 30值
```

过程图示：

![](https://gitee.com/alvin0216/cdn/raw/master/img/javascript/data-types/2.png)

引用类型是存放在**堆**内存中，每个对象在堆内存中有一个引用地址，就像是每个房间都有一个房间号一样。引用类型在栈中保存的就是这个对象在堆内存的引用地址，我们所说的“房间号”。通过“房间号”可以快速查找到保存在堆内存的对象。

```js
var obj1 = new Object()
var obj2 = obj1
obj2.name = '小鹿'
console.log(obj1.name) // 小鹿
```

过程图示：

![](https://gitee.com/alvin0216/cdn/raw/master/img/javascript/data-types/3.png)

## Null 和 undefined 的区别

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

```js
var i;
i // undefined

function f(x){console.log(x)}
f() // undefined

var  o = new Object();
o.p // undefined

var x = f();
x // undefined
。
```

[阮一峰 undefined 与 null 的区别](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

## typeof 与 instanceof

### typeof

```js
typeof undefined // 'undefined'
typeof '10' // 'String'
typeof 10 // 'Number'
typeof false // 'Boolean'
typeof Symbol() // 'Symbol'
typeof Function // ‘function'
typeof null // ‘Object’
typeof [] // 'Object'
typeof {} // 'Object'
```

`typeof` 一般被用于判断一个变量的类型，我们可以利用 `typeof` 来判断 `number`, `string`, `object`, `boolean`, `function`, `undefined`, `symbol` 这七种类型。这种判断能帮助我们搞定一些问题，比如在判断不是 object 类型的数据的时候，typeof 能比较清楚的告诉我们具体是哪一类的类型。但是，很遗憾的一点是，typeof 在判断一个 object 的数据的时候只能告诉我们这个数据是 object, 而不能细致的具体到是哪一种 object, 比如 👉

```js
let s = new String('abc')
typeof s === 'object' // true
s instanceof String // true
```

要想判断一个数据具体是哪一种 `object` 的时候，我们需要利用 `instanceof` 这个操作符来判断。

### instanceof

既然 `typeof` 对对象类型都返回 `Object` 类型情况的局限性，我们可以使用 `instanceof` 来进行**判断某个对象是不是另一个对象的实例**。返回值的是一个布尔类型。

```js
var a = []
console.log(a instanceof Array) // true
```

`instanceof` 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 `prototype` 属性，

我们再测一下 ES6 中的 `class` 语法糖是什么类型。

```js
class A {}
console.log(A instanceof Function) // true
```

假设现在有 `a instanceof b` 一条语句，则其 `instanceof` 内部实际做了如下判断：

```js
while (a.__proto__ !== null) {
  if (a.__proto__ === b.prototype) {
    return true
  }
  a.__proto__ = a.__proto__.proto__
}
if (a.__proto__ == null) {
  return false
}
```

a 会一直沿着隐式原型链 `__proto__` `向上查找直到a.__proto__.__proto__ ...... === b.prototype`为止，如果找到则返回 `true`，也就是 `a` 为 `b` 的一个实例。否则返回 `false`，`x` 不是 `b`的实例。

:::warning 注意
原型链中的 prototype 随时可以被改动的，改变后的值可能不存在于 object 的原型链上，instanceof 返回的值可能就返回 false。
:::

更多详见 [instanceof 的实现](./instanceof.md)

### typeof null 等于 Object?

来谈谈关于 `typeof` 的原理吧，我们可以先想一个很有意思的问题，`js` 在底层是怎么存储数据的类型信息呢？或者说，一个 `js` 的变量，在它的底层实现中，它的类型信息是怎么实现的呢？

其实，js 在底层存储变量的时候，会在变量的机器码的低位 1-3 位存储其类型信息 👉

- 000：对象
- 010：浮点数
- 100：字符串
- 110：布尔
- 1：整数

but, 对于 `undefined` 和 `null` 来说，这两个值的信息存储是有点特殊的。

`null`：所有机器码均为 0

`undefined`：用 −2^30 整数来表示

**不同的对象在底层原理的存储是用二进制表示的，在 `javaScript` 中，如果二进制的前三位都为 0 的话，系统会判定为是 `Object` 类型。null 的存储二进制是 `000`，也是前三位，所以系统判定 `null` 为 `Object` 类型。**

然而用 `instanceof` 来判断的话 👉

```js
null instanceof null
// TypeError: Right-hand side of 'instanceof' is not an object
```

`null` 直接被判断为不是 object，这也是 JavaScript 的历史遗留 bug，可以参考[typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)

因此在用 typeof 来判断变量类型的时候，我们需要注意，最好是用 typeof 来判断基本数据类型（包括 `symbol`），避免对 `null` 的判断。

### Object.prototype.toString

还有一个不错的判断类型的方法，就是 `Object.prototype.toString`，我们可以利用这个方法来对一个变量的类型来进行比较准确的判断

```js
Object.prototype.toString.call(1) // "[object Number]"
Object.prototype.toString.call('hi') // "[object String]"
Object.prototype.toString.call({ a: 'hi' }) // "[object Object]"
Object.prototype.toString.call([1, 'a']) // "[object Array]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(() => {}) // "[object Function]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
```

## 类型转换

`javaScript` 是一种弱类型语言，变量不受类型限制，所以在特定情况下我们需要对类型进行转换。

「类型转换」分为`显式类型转换`和`隐式类型转换`。每种转换又分为`原始类型转换`和`对象类型转换`。

显式类型转换就是我们所说强制类型转换。

### 转化为 String

| 数据类型  | String 类型              |
| --------- | ------------------------ |
| 数字      | 转化为数字对应的字符串   |
| true      | 转化为字符串 "true"      |
| null      | 转化为字符串 "null"      |
| undefined | 转化为字符串 “undefined” |
| Object    | 转化为 "[object Object]" |

```js
String(123) // "123"
String(true) // "true"
String(null) // "null"
String(undefined) // "undefined"
String([1, 2, 3]) // "1,2,3"
String({}) // "[object Object]"
```

### 转化为 Boolean 过滤假值

```js
var result = ['', undefined, null, NaN, false, 0].filter(Boolean) // []
```

`Boolean` 方法可以用来过滤假值，如上 `''`, `undefined`, `null`, `NaN`, `false`, `0` 转化为 `Boolean` 为 `false`

```js
Boolean('')         // false
Boolean(undefined)  // false
Boolean(null)       // false
Boolean(NaN)        // false
Boolean(false)      // false
Boolean(0)          // false
Boolean({})		    // true
Boolean([])		  。// true
```

### 转化为 Number

| 数据类型  | 数字类型                                                                  |
| --------- | ------------------------------------------------------------------------- |
| 字符串    | 1. 数字转化为对应的数字 2) 其他转化为 NaN                                 |
| 布尔类型  | 1. true 转化为 12) false 转化为 0                                         |
| null      | 0                                                                         |
| undefined | NaN                                                                       |
| 数组      | 1. 数组为空转化为 0；2) 数组只有一个元素转化为对应元素；3) 其他转化为 NaN |
| 空字符串  | 0                                                                         |

```js
Number(10) // 10
Number('10') // 10
Number(null) // 0
Number('') // 0
Number(true) // 1
Number(false) // 0
Number([]) // 0
Number([5]) // 5
Number([1, 2]) // NaN
Number('10a') // NaN
Number(undefined) // NaN
```

## 四则运算 <Badge text="隐式类型转换" type="warning" />

> 加法运算符是在运行时决定，到底是执行相加，还是执行连接。运算数的不同，导致了不同的语法行为，这种现象称为“重载”。

如果双方都不是字符串，则将转化为**数字**或**字符串**。

- `Boolean` + `Boolean` 会转化为数字相加。
- `Boolean` + `Number` 布尔类型转化为数字相加。
- `Object` + `Number` 对象类型调用 `valueOf`，如果不是 `String`、`Boolean` 或者 `Number` 类型，则继续调用 `toString()`转化为字符串。

```yml
true + true  // 2
1 + true     // 2
[1] + 3      // '13'
```

字符串和字符串以及字符串和非字符串相加都会进行连接。

```js
1 + 'b' // ‘1b’
false + 'b' // ‘falseb’
```

其他运算

其他算术运算符（比如减法、除法和乘法）都不会发生重载。它们的规则是：所有运算子一律转为数值，再进行相应的数学运算。

```js
1 * '2' // 2
1 * [] // 0
```

## == 和 === 的区别？

对于 `===` 来说，是严格意义上的相等，会比较两个操作符的类型和值。

- 如果 `X` 和 `Y` 的类型不同，返回 `false` ；
- 如果 `X` 和 `Y` 的类型相同，则根据下方表格进一步判断

| 条件                                                                                                                                    | 例子                                                       | 返回值                                  |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------- |
| undefined === undefined                                                                                                                 | undefined === undefined                                    | true                                    |
| null === null                                                                                                                           | null === null                                              | true                                    |
| String === String(当字符串顺序和字符完全相等的时候返回 true，否则返回 false)                                                            | ‘a’ === 'a' <br />'a' === 'aa'                             | true <br /> false                       |
| Boolean === Boolean                                                                                                                     | true === true <br /> true === false                        | true <br /> false                       |
| Symbol === Symbol                                                                                                                       | 相同的 Symbol 返回 true，不相同的 Symbol 返回 false        |                                         |
| Number === Number <br />① 其中一个为 NaN，返回 false <br />② X 和 Y 值相等，返回 true <br />③ 0 和 -0，返回 true <br />④ 其他返回 false | NaN ==== NaN <br />NaN === 1 <br />3 === 3 <br />+0 === -0 | false <br />false <br />true <br />true |

而对于 `==`来说，是非严格意义上的相等，先判断两个操作符的类型是否相等，如果类型不同，则先进行类型转换，然后再判断值是否相等。

- 如果 `X` 和 `Y` 的类型相同，返回 `X == Y` 的比较结果；
- 如果 `X` 和 `Y` 的类型不同，根据下方表格进一步判断;

> 1. 如果比较的两者中有布尔值(`Boolean`)，会把 `Boolean` 先转换为对应的`Number`，即 0 和 1，然后进行比较。
> 2. 如果比较的双方中有一方为`Number`，一方为 `String` 时，会把 `String` 通过`Number()` 方法转换为数字，然后进行比较。
> 3. 如果比较的双方中有一方为 `Boolean`，一方为 `String` 时，会将双方转换为数字，然后再进行比较。
> 4. 如果比较的双方中有一方为`Number`，一方为 `Object` 时，则会调用 `valueOf` 方法将 `Object` 转换为数字，然后进行比较。

| 条件                                                                 | 例子                       | 返回值          |
| -------------------------------------------------------------------- | -------------------------- | --------------- |
| null == undefined                                                    | null == undefined          | true            |
| String == Number，String 转 Number                                   | '2' == 2                   | true            |
| Boolean == Number，Boolean 转 Number                                 | true == 1                  | true            |
| Object == String,Number,Symbol，将 Object 转化为原始类型再比较值大小 | [1] == 1 <br /> [1] == '1' | true <br />true |
| 其他返回 false                                                       | false                      |

**参考自**

---

- [🔥 动画：《大前端吊打面试官系列》 之原生 JavaScript 精华篇](https://juejin.im/post/5e34d19de51d4558864b1d1f)
- [浅谈 instanceof 和 typeof 的实现原理](https://juejin.im/post/5b0b9b9051882515773ae714)
