---
title: Javascript 常见问题
date: 2020-01-06 14:02:40
---

## javascript

### 题 1 - 假值

以下哪些值是假值

```ts
0
new Number(0)
''
' '
new Boolean(false)
undefined
```

- A: 0, '', undefined
- B: 0, new Number(0), '', new Boolean(false), undefined
- C: 0, '', new Boolean(false), undefined
- D: All

:::details 答案与解析

A `javascript`  中有  6  个假值
 `undefined` `null` `NaN` `0` `''` `false`
函数构造函数  `new Number` `new Boolean`  都是真值

:::

### 题 2 - let x = y = 1

以下分别输出什么

```bash
(() => {
  let x = y = 1
})()
console.log(typeof x)
console.log(typeof y)
```

:::details 答案与解析

`undefined` `number` >> `let x = y = 1` 是以下表达式的缩写：

```js
y = 1
let x = y
```

:::

### 题 3 - Map 结构

以下分别输出什么

```js
const map = new Map()
const fun = () => 'greeting'

map.set(fun, 'hello world')

map.get('greeting')

map.get(fun)

map.get(() => 'greeting')
```

:::details 答案与解析

`undefined` `hello world` `undefined`

:::

### 题 4 - object

以下输出什么

```js
const obj = { a: 'one', b: 'two', a: 'three' }
console.log(obj)
```

:::details 答案与解析

`{ a: 'three', b: 'two' }`

如果对象有两个相同名称的键名，则将替代前面的键。但值会覆盖前面的键值，

:::

### 题 5 - for 循环

以下输出什么

```js
for (let i = 1; i < 5; i++) {
  if (i === 3) continue
  console.log(i)
}
```

:::details 答案与解析

1 2 4

continue 指跳过当前循环，执行下一个

:::

### 题 6 - generator

以下分别输出什么

```js
function* func1() {
  yield ['a', 'b', 'c']
}

function* func2() {
  yield* ['a', 'b', 'c']
}

const one = func1()
const two = func2()

console.log(one.next().value)
console.log(two.next().value)
```

:::details 答案与解析

通过 `yield` 关键字，我们在 Generator 函数里执行 `yield` 表达式.通过 `yield*`关键字,我们可以在一个 `Generator` 函数里面执行( `yield` 表达式)另一个 `Generator` 函数,或可遍历的对象(如数组).

在函数 `func1` 中，我们通过 `yield` 关键字 `yield` 了一个完整的数组`['a'， 'b', 'c']`。

函数 one 通过 next 方法返回的对象的 value 属性的值( one. next().value)等价于数组`['a', 'b'，'c']`.

```js
console.log(one.next().value) // ['a', 'b', 'c']
console.log(one.next().value) // undefined
```

在函数 `func2` 中，我们使用 `yield*`关键字。就相当于函数 two 第-个 `yield` 的值，等价于在迭代器中第一个 `yield` 的值。数组`['a', 'b'，'c']`就是这个迭代器.第一个 `yield` 的值就是 a,所以我们第一-次调用 two.next() .value 时，就返回 a。

```js
console.log(two.next().value) // 'a'
console.log(two.next().value) // 'b'
console.log(two.next().value) // 'c'
```

:::

### 题 7 - 解构赋值

```bash
var arr = [1, 2]

({ item: arr[2] } = { item: 3 })
```

`arr` 输出什么

::: details 答案与解析

arr: `[1, 2, 3]`

:::

### 题 8 - 扩展符

```js
const obj = { name: 'hello', age: 11 }

function fun(...params) {
  console.log(params)
}

fun(obj)
```

::: details 答案与解析

[ { name: 'hello', age: 11 } ]

:::

### 题 9 - Array.push

```js
let newList = [1, 2, 3].push(4)
console.log(newList.push(5))
```

::: details 答案与解析

`Error` : `.push` 方法返回数组的长度，而不是数组本身！

:::

### 题 10 - for-of | for in

```js
const arr = ['a', 'b', 'c']

for (const item in arr) {
  console.log(item)
}

for (const item of arr) {
  console.log(item)
}
```

::: details 答案与解析

- 通过 `for-in` 循环，我们可以遍历一个对象自有的、继承的、可枚举的、非 `Symbol` 的属性。在数组中， 可枚举属性是数组元素的“键”，即它们的索引。 类似于 下面这个对象: `{0: 'a'，1: 'b', 2: 'c'}`, 其中键则是可枚举属性，因此输出 0，1，2

- 通过 `for-of` 循环，我们可以迭代可迭代对象(包括 `Array`，`Map`， `Set`， `String`， `arguments` 等) 。当我们迭代数组时，在每次迭代中，不同属性的值将被分配给变量 `item`, 因此输出 a, b, c

:::

### 题 11 - delete 变量

```js
const name = 'hello'
age = 18

console.log(delete name)
console.log(delete age)
```

::: details 答案与解析

`false`, `true`

`delete` 操作符返回一个布尔值，true 指删除成功，false 失败。 通过 `var`、`let`、`const` 声明的变量无法用 `delete` 操作符删除。

`name` 变量由 `const` 声明，所以删除失败。`age = 18` ，我们实际上添加了一个名为 `age` 的属性给全局变量，对象中的属性是可以删除的。全局对象也是如此。所以 `delete age` 返回 `true`

:::

### 题 12 - 隐式类型转换

```js
const a = {}
const b = { key: 'b' }
const c = { key: 'c' }

a[b] = 123
a[c] = 456

console.log(a[b])
```

:::details 答案与解析

对象键自动转换为字符串。我们试图将一个对象设置为对象 a 的键，其值为 123。

但是，当对象自动转换为字符串化时，它变成了`[Object object]`。所以我们在这里说的是 `a['Object object'] = 123`。然后，我们可以尝试再次做同样的事情。C 对象同样会发生隐式类型转换。那么，`a['Object Object'] = 456`

然后，我们打印 `a[b]`，它实际上是 `a['Object object']`。我们将其设置为 456，因此返回 456。

---

:::

### 题 13 - parseInt

```js
const num = parseInt('7*6', 10)
```

:::details 答案与解析

只返回了字符串中第一个字母.设定了进制后(也就是第二个参数，指定需要解析的数字是什么进制:十进制、十六机制、八进制、二进制等等.... `parseInt` 检查字符串中的字符是否合法.一旦遇到一个在指定进制中不合法的字符后，立即停止解析并且忽略后面所有的字符。

`*`就是不合法的数字字符。所以只解析到 `'7'`，并将其解析为十进制的 7。 `num` 的值即为 7

---

:::
