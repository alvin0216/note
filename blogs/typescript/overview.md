---
title: Typescript 汇总
date: 2019-07-15 13:00:28
sidebar: 'auto'
tags:
  - Typescript
categories:
  - Typescript
---

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup)

## 类型运算

`|` 表示联合类型，`&` 表示交叉类型。

```ts
type Type1 = 'a' | 'b';
type Type2 = 'b' | 'c';
type Type3 = Type1 | Type2; // "a" | "b" | "c"
type Type4 = Type1 & Type2; // "b"
```

结合接口看一下：

```ts
interface A {
  name: string;
}

interface B {
  age: number;
}

type C = A & B; // { name: string, age: number }
type D = A | B; // { name: string } | { age: number } 必须要实现其中一个
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
  userId: string;
  friendList: {
    fristName: string;
    lastName: string;
  }[];
};

type UserIdType = User['userId']; // string
type FriendList = User['friendList']; // { fristName: string; lastName: string; }[]
type Friend = FriendList[number]; // { fristName: string; lastName: string; }
```

在上面的例子中，我们利用类型键入的功能从 `User` 类型中计算出了其他的几种类型。`FriendList[number]` 这里的 `number` 是关键字，用来取数组子项的类型。在元组中也可以使用字面量数字得到数组元素的类型。

```ts
type Tuple = [number, string];
type First = Tuple[0]; // number
type Second = Tuple[1]; // string
```

### typeof value 获取属性类型

`typeof` 关键字在 JS 中用来获取变量的类型，运算结果是一个字符串（值）。而在 TS 中表示的是推算一个变量的类型（类型）

```ts
const age = 18;
type Age = typeof age; // type Age = 18

const obj = { name: 'alvin' };
type A = typeof obj; // type A = { name: string }
```

### keyof Type 获取 key 值

`keyof` 关键字可以用来获取一个对象类型的所有 `key` 类型。

```ts
type User = {
  id: string;
  name: string;
};

type UserKeys = keyof User; //"id" | "name"
```

`enum` 在 Typescript 中有一定的特殊性（有时表示类型，又是表示值），如果要获取 enum 的 key 类型，需要先把它当成值，用 typeof 再用 keyof。

```ts
enum ActiveType {
  Active,
  Inactive
}

type KeyOfType = keyof typeof ActiveType; // "Active" | "Inactive"
```

### extends

`extends` 关键字同样存在多种用途，在 `interface` 中表示类型扩展，在条件类型语句中表示布尔运算，在泛型中起到限制的作用，在 `class` 中表示继承。

```ts
// 表示类型扩展
interface A {
  a: string;
}

interface B extends A {
  // { a: string, b: string }
  b: string;
}

// 条件类型中起到布尔运算的功能
type Bar<T> = T extends string ? 'string' : never;
type C = Bar<number>; // never
type D = Bar<string>; // string
type E = Bar<'fooo'>; // string

// 起到类型限制的作用
type Foo<T extends object> = T;
type F = Foo<number>; // 类型“number”不满足约束“object”。
type G = Foo<string>; // 类型“string”不满足约束“object”。
type H = Foo<{}>; // OK

// 类继承
class I {}
class J extends I {}
```

## 泛型

```ts
type Foo<T, U = string> = {
  // 多参数、默认值
  foo: Array<T>; // 可以传递
  bar: U;
};

type A = Foo<number>; // type A = { foo: number[]; bar: string; }
type B = Foo<number, number>; // type B = { foo: number[]; bar: number; }
```

泛型参数还可以有限制，例如下面的例子 extends 的作用是限制 T 至少是个 `HTMLElement` 类型。

```ts
type MyEvent<T extends HTMLElement = HTMLElement> = {
  target: T;
  type: string;
};
```

`Typescript` 自带了一些泛型工具，下面逐个介绍并附上实现代码。

### 映射类型

### 关键字 in

in 关键字在类型中表示类型映射，和索引签名的写法有些相似。下面的例子中声明一个 Props 的类型，key 类型为 `'count' | 'id'` `类型，value` 为 `number` 类型。

```ts
type Props = {
  [key in 'count' | 'id']: number;
};

// OK
const props1: Props = {
  count: 1,
  id: 1
};

const props2: Props = {
  count: '1', // ERROR
  id: 1
};

const props3: Props = {
  count: 1,
  id: 1,
  name: 1 // ERROR
};
```

### `Record<K,T>` 属性 K 定义为类型 T

比如

```ts
Record<'name' | 'desc', string> // { name: string, desc: string }

enum ErrorCodes {
  Timeout = 10001,
  ServerBusy = 10002
}

const ErrorMessageMap: Record<ErrorCodes, string> = {
  [ErrorCodes.Timeout]: 'Timeout, please try again',
  [ErrorCodes.ServerBusy]: 'Server is busy now'
}
```

代码实现：

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

### Partial 可选值

```ts
type User = {
  id?: string;
  gender: 'male' | 'female';
};

type PartialUser = Partial<User>; // { id?: string, gender?: 'male' | 'female'}
```

代码实现：

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

以上面的例子为例：

```ts
//  keyof T
type K = keyof User // "id" | "gender"
P in K // 获取属性类型
?: K[P] // 变成可选值
```

### Required 必选值

`Required` 和 Partial 的作用相反，是将对象类型的属性都变成必须。

```ts
type Required<T> = { [P in keyof T]-?: T[P] };
```

`-?` 符号在这里表示的意思是去掉可选符号 `?`。

### Readonly 只读

```ts
type ReadonlyUser = Readonly<User>; // { readonly id?: string, readonly gender: 'male' | 'female'}

const user: ReadonlyUser = {
  id: '1',
  gender: 'male'
};

user.gender = 'femail'; // 无法分配到 "gender" ，因为它是只读属性。
```

代码实现：

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

### Pick 属性提取

```ts
type Location = {
  latitude: number;
  longitude: number;
  city: string;
  address: string;
  province: string;
  district: string;
};

type LatLong = Pick<Location, 'latitude' | 'longitude'>; //  { latitude: number; longitude: number; }

const region: LatLong = {
  latitude: 22.545001,
  longitude: 114.011712
};
```

代码实现：

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

### Omit 属性排除

`Omit` 结合了 `Pick` 和 `Exclude`，将忽略对象类型中的部分 keys。

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, 'description'>; // { title: string; completed: boolean; }

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
};
```

代码实现：

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### 条件类型

### 三目运算符

`Typescript` 类型运算也支持“三目运算符”，称之为条件类型，一般通过 `extends` 关键字判断条件成不成立，成立的话得到一个类型，不成立的话返回另一个类型。条件类型通常是与泛型同时出现的（：因为如果是已知固定类型就没必要再判断了。

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<number>; // false
type B = IsString<string>; // true
```

在处理并集时，条件类型还具有条件分配的逻辑，`number | string` 做条件运算等价于 `number 条件运算 | string` 条件运算

```ts
type ToArray<T> = T[];
type A = ToArray<number | string>; // (string | number)[]

type ToArray2<T> = T extends unknown ? T[] : T[];
type B = ToArray2<number | string>; // string[] | number[]
```

### info 动态推导

除了显示声明泛型参数，`Typescrip`t 还支持动态推导泛型，用到的是 `infer` 关键字。什么场景下还需要动态推导？通常是需要通过传入的泛型参数去获取新的类型，这和直接定义一个新的泛型参数不一样。

例如现在定义了 `ApiResponse` 的两个具体类型 `UserResponse` 和 `EventResponse`，如果想得到 `User` 实体类型和 `Event` 实体类型需要怎么做？

```ts
type ApiResponse<T> = {
  code: number;
  data: T;
};

type UserResponse = ApiResponse<{
  id: string;
  name: string;
}>;

type EventResponse = ApiResponse<{
  id: string;
  title: string;
}>;
```

当然可以拎出来单独定义新的类型。

```ts
type User = {
  id: string;
  name: string;
};

type UserResponse = ApiResponse<User>;
```

但如果类型是由其他人提供的就不好处理了。这时可以尝试下使用 `infer`，代码如下：

```ts
type ApiResponseEntity<T> = T extends ApiResponse<infer U> ? U : never;

type User = ApiResponseEntity<UserResponse>; // { id: string; name: string; }
type Event = ApiResponseEntity<EventResponse>; // { id: string; title: string; }
```

示例中，判断传入的类型 T 是不是 `T extends ApiResponse<infer U>` 的子集，这里的 `infer` 既是让 `Typescript` 尝试去理解 `T` 具体是那种类型的 `ApiResponse`，生成新的泛型参数 `U`。如果满足 `extends` 条件则将 `U` 类型返回。

充分理解了条件类型和 `infer` 关键字之后，`Typescript` 自带的条件泛型工具也就很好理解了。

### ReturnType 获取返回值类型

```ts
type A = (a: number) => string;
type B = ReturnType<A>; // string
```

代码实现：

```ts
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

### Parameters 获取方法的参数类型

```ts
function func(name: string, age: number) {}

type FuncParameters = Parameters<typeof func>;
// type FuncParameters = [name: string, age: number]

typeof func; // (name: string, age: number) => void
```

代码实现：

```ts
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

- [参考](https://juejin.im/post/6876981358346895368)

### Exclude 属性排除

```ts
type A = number | string;
type B = string;
type C = Exclude<A, B>; // number
```

代码实现：

```ts
type Exclude<T, U> = T extends U ? never : T;
```

### Extract 属性交集

Extract 用来计算 T 中可以赋值给 U 的类型

```ts
type A = number | string;
type B = string;
type C = Extract<A, B>; // string
```

代码实现：

```ts
type Extract<T, U> = T extends U ? T : never;
```

### NonNullable 排除 null 和 undefined

```ts
type A = {
  a?: number | null
}
type B = NonNullable(A['a']) // number
```

代码实现：

```ts
type NonNullable<T> = T extends null | undefined ? never : T;
```
