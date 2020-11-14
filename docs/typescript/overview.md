---
title: 概览
---

- [TypeScript 2.8 下的终极 React 组件模式](https://juejin.im/post/6844903612787720206)
- [[译] 使用 TypeScript 开发 React Hooks](https://juejin.im/post/6854573212374663176)
- [TypeScript 在 React 中使用总结](https://juejin.im/post/6844904112882974728)
- [Setup TypeScript with React](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup)

## 基本类型（一）

`number`、`string`、`boolean`、`null`、`undefined`、`symbol`

```js
let num: number = 18
let username: string = 'alvin'
let isDone: boolean = true

let u: undefined
let n: null = null
```

`void` `any` `never`

```ts
...

function log(): void { // void 表示函数无 return
  console.log(123)
}

let an: any = 1
an = 'alvin'

// 用于描述从不会有返回值的函数
// 用于描述总是抛出错误的函数
function error(message: string): never {
  throw new Error(message)
}
```

## 基本类型（二）

数组、元祖、对象、枚举

```ts
let list: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3] // 用泛型定义

// 元祖
let tuple: [string, number] = ['alvin', 18]
```

### 枚举

```ts
enum Bool {
  No,
  Yes
}
Bool { '0': 'No', '1': 'Yes', No: 0, Yes: 1 }
```

初始化枚举值

```ts
enum Bool2 {
  No = 'no',
  Yes = 'yes'
}
// 初始化枚举值，注意初始化第一个枚举值后，后面的值也必须初始化
// Bool2 { No: 'no', Yes: 'yes' }

Bool2.No // 访问枚举值 'no'
```

### 对象的类型 - 接口

```ts
interface Person {
  name: string
  age?: number // 可选属性
}

let tom: Person = { name: 'alvin' }
```

### 联合类型

联合类型使用 `|` 分隔每个类型。

```ts
let myFavoriteNumber: string | number
myFavoriteNumber = 'seven'
myFavoriteNumber = 7
```

访问联合类型的属性或方法时，只能访问到公用的属性或者方法：

```ts
function getLength(something: string | number): number {
  return something.length
}
// Property 'length' does not exist on type 'string | number'.
```

## 类型断言

`值 as 类型` 或者 `<类型>值`

当 `TypeScript` 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型中共有的属性或方法，而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法。

```ts
function getLength(something: string | number): number {
  return (something as string).length // 或者 (<string>something).length
}

getLength(2) // undefined
getLength('abc') // 3
```

## 类型别名

类型别名用来给一个类型起个新名字。

```ts
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}
```

## 声明文件

假如我们想使用第三方库 jQuery，ts 中，编译器并不知道 \$ 或 jQuery 是什么东西：

```ts
declare var jQuery: (selector: string) => any

jQuery('input')
```

然而很多地方是需要声明 不可能在每个文件都写声明语句 我们就可以写声明文件。

**新建 jQuery.d.ts**

```bash
/path/to/project
├── src
|  ├── index.ts
|  └── jQuery.d.ts
└── tsconfig.json
```

```ts
declare var jQuery: (selector: string) => any
```

- `declare var` 声明全局变量
- `declare function` 声明全局方法
- `declare class` 声明全局类
- `declare enum` 声明全局枚举类型
- `declare namespace` 声明（含有子属性的）全局对象
- `interface 和 type` 声明全局类型
- `export` 导出变量
- `export namespace` 导出（含有子属性的）对象
- `export default ES6` 默认导出
- `export = commonjs` 导出模块
- `export as namespace` UMD 库声明全局变量
- `declare global` 扩展全局变量
- `declare module` 扩展模块

## 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

```ts
function createArray(length: number, value: any): Array<any> {
  return new Array(length).fill(value)
}

// 使用泛型
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = new Array(length).fill(value)
  return result
}
```

### 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

```ts
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length) // Property 'length' does not exist on type 'T'
  return arg
}
```

我们可以对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量。

```ts
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}
```
