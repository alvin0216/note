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

> A, `javascript`  中有  6  个假值
>  `undefined` `null` `NaN` `0` `''` `false`
>
> 函数构造函数  `new Number` `new Boolean`  都是真值

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

> `undefined` `number` >> `let x = y = 1` 是以下表达式的缩写：

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

> `undefined` `hello world` `undefined`

:::

### 题 4 - object

以下输出什么

```js
const obj = { a: 'one', b: 'two', a: 'three' }
console.log(obj)
```

:::details 答案与解析

> `{ a: 'three', b: 'two' }`
>
> 如果对象有两个相同名称的键名，则将替代前面的键。但值会覆盖前面的键值，

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

> 1 2 4
>
> continue 指跳过当前循环，执行下一个

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

> 通过 `yield` 关键字，我们在 Generator 函数里执行 `yield` 表达式.通过 `yield*`关键字,我们可以在一个 `Generator` 函数里面执行( `yield` 表达式)另一个 `Generator` 函数,或可遍历的对象(如数组).
>
> 在函数 `func1` 中，我们通过 `yield` 关键字 `yield` 了一个完整的数组`['a'， 'b', 'c']`。
>
> 函数 one 通过 next 方法返回的对象的 value 属性的值( one. next().value)等价于数组`['a', 'b'，'c']`.

```js
console.log(one.next().value) // ['a', 'b', 'c']
console.log(one.next().value) // undefined
```

> 在函数 `func2` 中，我们使用 `yield*`关键字。就相当于函数 two 第-个 `yield` 的值，等价于在迭代器中第一个 `yield` 的值。数组`['a', 'b'，'c']`就是这个迭代器.第一个 `yield` 的值就是 a,所以我们第一-次调用 two.next() .value 时，就返回 a。

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

::: details 答案与解析

> arr: `[1, 2, 3]`

:::
