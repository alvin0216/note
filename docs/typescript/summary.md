---
title: TS 实践
---

## 类型运算

### 集合运算

> `|` 表示联合类型，`&` 表示交叉类型。

`|` 在 JS 中表示位或运算符，在 Typescript 中用来计算两个类型的`并集`。

```ts
type Type1 = 'a' | 'b'
type Type2 = 'b' | 'c'
type Type3 = Type1 | Type2 // "a" | "b" | "c"
```

`&` 在 JS 中表示位与运算符，在 Typescript 中用来计算两个类型的`交集`。

```ts
type Type1 = 'a' | 'b'
type Type2 = 'b' | 'c'
type Type3 = Type1 | Type2 // "b"
```

结合接口看一下：

```ts
interface A {
  name: string
}

interface B {
  age: number
}

type C = A & B
// C { name: string, age: number }
// C { A | B } 实现接口 A 或者 B 都可以
```

还可以利用 & 去做接口增加属性约束

```ts
type C = A & { age: number } // C 相当于在 接口 A 上增加 age 约束
```

### 索引签名

索引签名可以用来定义对象内的属性、值的类型，例如定义一个 React 组件，允许 `Props` 可以传任意 `key` 为 `string`，`value` 为 `number` 的 `props`。

```tsx
interface Props {
  [key: string]: number
}

<Component count={1} /> // OK
<Component count={true} /> // Error

const c: Props = {
  num: 1, // OK
  name: 'alvin' // Error
};
```

### 类型键入

类型键入允许 `Typescript` 像对象取属性值一样使用类型。

```ts
type User = {
  userId: string
  friendList: {
    fristName: string
    lastName: string
  }[]
}

type UserIdType = User['userId'] // string
type FriendList = User['friendList'] // { fristName: string; lastName: string; }[]
type Friend = FriendList[number] // { fristName: string; lastName: string; }
```

在上面的例子中，我们利用类型键入的功能从 `User` 类型中计算出了其他的几种类型。`FriendList[number]` 这里的 `number` 是关键字，用来取数组子项的类型。在元组中也可以使用字面量数字得到数组元素的类型。

```ts
type Tuple = [number, string]
type First = Tuple[0] // number
type Second = Tuple[1] // string
```

### typeof value

`typeof` 关键字在 JS 中用来获取变量的类型，运算结果是一个字符串（值）。而在 TS 中表示的是推算一个变量的类型（类型）

```ts
const age = 18
type Age = typeof age // type Age = 18

const obj = { name: 'alvin' }
type A = typeof obj // type A = { name: string }
```

### keyof Type

`keyof` 关键字可以用来获取一个对象类型的所有 `key` 类型。

```ts
type User = {
  id: string
  name: string
}

type UserKeys = keyof User //"id" | "name"
```

`enum` 在 Typescript 中有一定的特殊性（有时表示类型，又是表示值），如果要获取 enum 的 key 类型，需要先把它当成值，用 typeof 再用 keyof。

```ts
enum ActiveType {
  Active,
  Inactive
}

type KeyOfType = keyof typeof ActiveType // "Active" | "Inactive"
```

### extends

`extends` 关键字同样存在多种用途，在 `interface` 中表示类型扩展，在条件类型语句中表示布尔运算，在泛型中起到限制的作用，在 `class` 中表示继承。

```ts
// 表示类型扩展
interface A {
  a: string
}

interface B extends A {
  // { a: string, b: string }
  b: string
}

// 条件类型中起到布尔运算的功能
type Bar<T> = T extends string ? 'string' : never
type C = Bar<number> // never
type D = Bar<string> // string
type E = Bar<'fooo'> // string

// 起到类型限制的作用
type Foo<T extends object> = T
type F = Foo<number> // 类型“number”不满足约束“object”。
type G = Foo<string> // 类型“string”不满足约束“object”。
type H = Foo<{}> // OK

// 类继承
class I {}
class J extends I {}
```

<!--



















-->
<!--
## Promise

```ts
function getResponse(): Promise<string> {
  return Promise.resolve('alvin')
}
```

或者指定泛型输入：

```ts
interface IResponse<T> {
  message: string
  result: T
  success: boolean
}

function getResponse(): Promise<IResponse<number[]>> {
  return Promise.resolve({
    message: 'alvin',
    result: [1, 2, 3],
    success: true
  })
}
```

## 基础类型

### typeof

一般我们都是先定义类型，再去赋值使用，但是使用 `typeof` 我们可以把使用顺序倒过来。

```ts
let p = {
  name: 'alvin',
  list: [1, '2']
}

type Person = typeof p
```

相当于

```ts
interface Person {
  name: string
  list: (string | number)[]
}
```

### 使用联合类型

使用联合类型：可以通过管道(`|`)将变量设置多种类型，赋值时可以根据设置的类型来赋值。

```ts
interface Unit {
  sex: 1 | 2
  subject: 'Math' | 'English' | 'Chinese'
}
```

### &

```ts
interface P {
  name: string
}

interface T {
  age: number
}

let s: P & T = {
  name: 'alvin',
  age: 18
}
```

## 工具泛型使用技巧

### Partial 将所有的 props 属性都变为可选值

使用 `Partial` 将所有的 props 属性都变为可选值

```ts
type Partial<T> = { [P in keyof T]?: T[P] }
```

上面代码的意思是 `keyof T` 拿到 `T` 所有属性名, 然后 `in` 进行遍历, 将值赋给 `P` , 最后 `T[P]` 取得相应属性的值，中间的 `?` 用来进行设置为可选值。

```tsx
interface Unit {
  sex: 1 | 2
  subject: 'Math' | 'English' | 'Chinese'
}

let p: Partial<Unit> = {
  sex: 1
  // 没有写 subject 属性也不会报错啦
}
```

譬如你在 React 中写 props

```ts
interface BtnProps {
  size: 'large' | 'middle' | 'small'
}

const Button: React.FC<BtnProps> = props => {
  return <button>click</button>
}

// 在使用时一定要加 size 属性
const App = () => <Button size='small' />

// 使用 Partial 后，属性全部都是可选的，
const Button: React.FC<Partial<BtnProps>> = props => {
  return <button>click</button>
}
```

### 使用 Required 将所有 props 属性都设为必填项

```ts
type Required<T> = { [P in keyof T]-?: T[P] }
```

`-?` 的功能就是把可选属性的 `?` 去掉使该属性变成必选项，对应的还有 `+?` ，作用与 `-?` 相反，是把属性变为可选项。

### `Omit<T,K>` 属性排除

从对象 `T` 中排除 `key` 是 `K` 的属性。

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```

其中 `Pick` & `Exclude` 后面讲。示例，排除接口 `Person` 的 `name` 属性：

```ts
interface Person {
  name: string
  age: number
  sex: string
}

let person: Omit<Person, 'name'> = {
  age: 1,
  sex: '男'
}
```

### Pick 属性提取

从 `T` 中取出一系列 `K` 的属性。

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

示例：

```ts
interface Person {
  name: string
  age: number
  sex: string
}

// 相当于只拿接口的 name 和 age 属性
let person: Pick<Person, 'name' | 'age'> = {
  name: '小王',
  age: 21
}
```

### `Exclude<T,U>` 类型排除

从 `T` 中排除那些可以赋值给 `U` 的类型。

```ts
type Exclude<T, U> = T extends U ? never : T
```

示例：

```ts
type T = Exclude<1 | 2 | 3 | 4 | 5, 3 | 4> // T = 1|2|5
```

### `Extract<T,U>` 类型提取

```ts
type Extract<T, U> = T extends U ? T : never
```

示例：

```ts
type T = Extract<1 | 2 | 3 | 4 | 5, 3 | 4> // T = 3|4
```

### `Record<K,T>` 属性 K 定义为类型 T

将 `K` 中所有的属性的值转化为 `T` 类型。

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T
}
```

将 `name` 、 `age` 属性全部设为 `string` 类型。

```ts
let person: Record<'name' | 'age', string> = {
  name: '小王',
  age: '12'
}
```

### `NonNullable <T>`

排除 `T` 为 `null` 、`undefined`。

```ts
type NonNullable<T> = T extends null | undefined ? never : T
```

示例：

```ts
type T = NonNullable<string | string[] | null | undefined> // string | string[]
``` -->

- [参考](https://juejin.im/post/6876981358346895368)
