---
title: 入门
---

基本类型：`number`、`string`、`boolean`、`null`、`undefined`、`symbol`

```js
let num: number = 18
let username: string = 'alvin'
let isDone: boolean = true

let u: undefined
let n: null = null
```

高级类型 `void` `any` `never`

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
