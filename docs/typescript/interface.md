---
title: 接口
---

## 添加索引签名

```ts
interface SquareConfig {
  readonly color?: string // readonly 只读属性 不可被修改
  width?: number
  [propName: string]: any
}

const createSquare = (params: SquareConfig) => {
  return 'yes'
}

createSquare({ name: 'alvin' }) // 不会报错啦 ==> [propName: string]: any;
```

## 函数接口

```ts
interface SearchFunc {
  (source: string, subString: string): boolean
}

const mySearch: SearchFunc = (source, subString) => source.search(subString) > -1
```

## 接口与类

### 接口继承接口

```ts
interface Person {
  name: string
}

interface Student extends Person {
  age: number
}

let s: Student = { name: 'alvin', age: 10 }

// 如果需要继承多个接口
interface Student extends Person, Humanity {....}
```

### 合成接口

```ts
interface Person {
  name: string
  age: number
}

let p = <Person>{
  name: 'ALVIN'
  // 没有定义 age 属性也不会报错
}
```

### 类实现接口

```ts
interface Person {
  name: string
}

class Student implements Person {
  name: string // 这里需要定义接口中的属性 才不会报错
  constructor() {}
}
```
