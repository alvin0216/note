---
title: 隐式转换
date: 2019-07-15 13:00:28
sidebar: 'auto'
tags:
  - Javascript
categories:
  - Javascript
---

<!-- <tree :data='[]' /> -->

## 数据类型

- 基本数据类型：`undefined`、`null`、`boolean`、`string`、`number`、`symbol`
- 引用类型：`Object`、`Array`、`Date`、`RegExp`、`Function`

区别在于基本数据类型存储于栈中，引用类型存储于堆中。

通用的判断方式是 `typeof` 和 `instanceof`。然而有时候并不准确，比如

```js
typeof null === 'object';
```

> 准确判断类型可以采用：`Object.prototype.toString.call()`

### 为什么 typeof null 会是 object？

js 在底层存储变量的时候，会在变量的机器码的低位 1-3 位存储其类型信息

- 000：对象
- 010：浮点数
- 100：字符串
- 110：布尔
- 1：整数

对于 `undefined` 和 `null` 来说，这两个值的信息存储是有点特殊的。

- `null`：所有机器码均为 0
- `undefined`：用 −2^30 整数来表示

因为机器码的缘故。所以才导致了这个问题的存在。这里仅做了解即可！了解更多请查阅 [MDN typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)

### Null 和 undefined 的区别

这里可以看 [阮一峰 undefined 与 null 的区别](http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

这里简单做阐述：`null` 表示此处没值，而`undefined` 表示未定义，所以有：

```js
1 + null === 1;
1 + undefined === NaN;
```

## 隐式转换

js 中一个难点就是 js 隐形转换，因为 js 在一些操作符下其类型会做一些变化，所以 js 灵活，同时造成易出错，并且难以理解。

涉及隐式转换最多的两个运算符 `+` 和 `==`。

- **`+` 运算符即可数字相加，也可以字符串相加。**
- **`==` 不同于 `===` ，故也存在隐式转换。**
- **`- * /` 这些运算符只会针对 `number` 类型，故转换的结果只能是转换成 `number` 类型。**

隐式转换中主要涉及到三种转换：

1. 将值转为原始值，`ToPrimitive()`。
2. 将值转为数字，`ToNumber()`。
3. 将值转为字符串，`ToString()`。

### 通过 ToPrimitive 将值转换为原始值

js 引擎内部的抽象操作 `ToPrimitive` 有着这样的签名：`ToPrimitive(input, PreferredType?)`

`input` 是要转换的值，`PreferredType` 是可选参数，可以是 `Number` 或 `String` 类型。他只是一个转换标志，转化后的结果并不一定是这个参数所值的类型，但是转换结果一定是一个原始值（或者报错）。

#### 如果 PreferredType 被标记为 Number，则会进行下面的操作流程来转换输入的值。

1. 如果输入的值已经是一个原始值，则直接返回它
2. 否则，如果输入的值是一个对象，则调用该对象的 `valueOf()` 方法，如果 `valueOf()` 方法的返回值是一个原始值，则返回这个原始值。
3. 否则，调用这个对象的 `toString()` 方法，如果 `toString()` 方法返回的是一个原始值，则返回这个原始值。
4. 否则，抛出 `TypeError` 异常。

#### 如果 PreferredType 被标记为 String，则会进行下面的操作流程来转换输入的值。

1. 如果输入的值已经是一个原始值，则直接返回它
2. 否则，调用这个对象的 `toString()` 方法，如果 toString()方法返回的是一个原始值，则返回这个原始值。
3. 否则，如果输入的值是一个对象，则调用该对象的 `valueOf()` 方法，如果 `valueOf()` 方法的返回值是一个原始值，则返回这个原始值。
4. 否则，抛出 TypeError 异常。

既然 `PreferredType` 是可选参数，那么如果没有这个参数时，怎么转换呢？`PreferredType` 的值会按照这样的规则来自动设置：

1. 该对象为 `Date` 类型，则 `PreferredType` 被设置为 `String`
2. 否则，`PreferredType` 被设置为 `Number`

#### toString 和 valueOf

那这两个方法在对象里是否一定存在呢？答案是肯定的。在控制台输出 `Object.prototype`，你会发现其中就有 `valueOf` 和 `toString` 方法，而 `Object.prototype` 是所有对象原型链顶层原型，所有对象都会继承该原型的方法，故任何对象都会有 `valueOf` 和 `toString` 方法。

先看看对象的 `valueOf` 函数，其转换结果是什么？对于 js 的常见内置对象：`Date`, `Array`, `Math`, `Number`, `Boolean`, `String`, `Array`, `RegExp`, `Function`。

```ts
// Number、Boolean、String这三种构造函数生成的基础值的对象形式，
// === 通过 valueOf 转换后会变成相应的原始值 ===
var num = new Number('123');
num.valueOf(); // 123

var str = new String('12df');
str.valueOf(); // '12df'

var bool = new Boolean('fd');
bool.valueOf(); // true

// Date特殊的对象，其原型Date.prototype上内置的valueOf函数将日期转换为日期的毫秒的形式的数值
var a = new Date();
a.valueOf(); // 1515143895500

// 除此之外返回的都为this，即对象本身
var a = new Array();
a.valueOf() === a; // true

var b = new Object({});
b.valueOf() === b; // true
```

再来看看 `toString` 函数，其转换结果是什么

```ts
var num = new Number('123sd');
num.toString(); // 'NaN'

var str = new String('12df');
str.toString(); // '12df'

var bool = new Boolean('fd');
bool.toString(); // 'true'

var arr = new Array(1, 2);
arr.toString(); // '1,2'

var d = new Date();
d.toString(); // "Wed Oct 11 2017 08:00:00 GMT+0800 (中国标准时间)"

var func = function () {};
func.toString(); // "function () {}"

// 除这些对象及其实例化对象之外，其他对象返回的都是该对象的类型

var obj = new Object({});
obj.toString(); // "[object Object]"

Math.toString(); // "[object Math]"
```

从上面 valueOf 和 toString 两个函数对对象的转换可以看出为什么对于 ToPrimitive(input, PreferredType?)，PreferredType 没有设定的时候，除了 Date 类型，PreferredType 被设置为 String，其它的会设置成 Number。

因为 valueOf 函数会将 Number、String、Boolean 基础类型的对象类型值转换成 基础类型，Date 类型转换为毫秒数，其它的返回对象本身，而 toString 方法会将所有对象转换为字符串。显然对于大部分对象转换，valueOf 转换更合理些，因为并没有规定转换类型，应该尽可能保持原有值，而不应该想 toString 方法一样，一股脑将其转换为字符串。

所以对于没有指定 PreferredType 类型时，先进行 valueOf 方法转换更好，故将 PreferredType 设置为 Number 类型。

而对于 Date 类型，其进行 valueOf 转换为毫秒数的 number 类型。在进行隐式转换时，没有指定将其转换为 number 类型时，将其转换为那么大的 number 类型的值显然没有多大意义。（不管是在+运算符还是==运算符）还不如转换为字符串格式的日期，所以默认 Date 类型会优先进行 toString 转换。故有以上的规则：

PreferredType 没有设置时，Date 类型的对象，PreferredType 默认设置为 String，其他类型对象 PreferredType 默认设置为 Number。

### 通过 ToNumber 将值转换为数字

根据参数类型进行下面转换：

| 参数      | 结果                                                                      |
| --------- | ------------------------------------------------------------------------- |
| undefined | NaN                                                                       |
| null      | +0                                                                        |
| 布尔值    | true 转换 1，false 转换为+0                                               |
| 数字      | 无须转换                                                                  |
| 字符串    | 有字符串解析为数字，例如：‘324’转换为 324，‘qwer’转换为 NaN               |
| 对象(obj) | 先进行 ToPrimitive(obj, Number)转换得到原始值，在进行 ToNumber 转换为数字 |

### 通过 ToString 将值转换为字符串

| 参数      | 结果                                                                        |
| --------- | --------------------------------------------------------------------------- |
| undefined | 'undefined'                                                                 |
| null      | 'null'                                                                      |
| 布尔值    | 转换为'true' 或 'false'                                                     |
| 数字      | 数字转换字符串，比如：1.765 转为'1.765'                                     |
| 字符串    | 无须转换                                                                    |
| 对象(obj) | 先进行 ToPrimitive(obj, String)转换得到原始值，在进行 ToString 转换为字符串 |

讲了这么多，是不是还不是很清晰，先来看看一个例子：

```js
({} + {}) = ?
```

:::tip ans
两个对象的值进行+运算符，肯定要先进行隐式转换为原始类型才能进行计算。

1. 进行 ToPrimitive 转换，由于没有指定 PreferredType 类型，{}会使默认值为 Number，进行 ToPrimitive(input, Number)运算。
2. 所以会执行 valueOf 方法，({}).valueOf(),返回的还是{}对象，不是原始值。
3. 继续执行 toString 方法，({}).toString(),返回"[object Object]"，是原始值。

故得到最终的结果，`"[object Object]" + "[object Object]" = "[object Object][object object]"`
:::

再来一个指定类型的例子：

```js
2 * {} = ?
```

:::tip ans

1. 首先\*运算符只能对 number 类型进行运算，故第一步就是对{}进行 ToNumber 类型转换。
2. 由于{}是对象类型，故先进行原始类型转换，ToPrimitive(input, Number)运算。
3. 所以会执行 valueOf 方法，({}).valueOf(),返回的还是{}对象，不是原始值。
4. 继续执行 toString 方法，({}).toString(),返回"[object Object]"，是原始值。
5. 转换为原始值后再进行 ToNumber 运算，"[object Object]"就转换为 NaN。

故最终的结果为 `2 * NaN = NaN`
:::

## == 运算符隐式转换

略 详见 - [你所忽略的 js 隐式转换](https://juejin.im/post/6844903557968166926)
