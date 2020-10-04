---
title: 'ES6: generator'
date: 2020-09-10 16:21:00
---

```js
function* generator() {
  yield 'hello'
  yield 'world'
  return 'ending'
}

const hw = generator()

console.log(hw.next()) // { value: 'hello', done: false }
console.log(hw.next()) // { value: 'world', done: false }
console.log(hw.next()) // { value: 'ending', done: false }
console.log(hw.next()) // { value: undefined, done: true }

// 遍历
for (const iterator of hw) {
  console.log(iterator) // hello world
}
```

- next()、throw()、return()

`next()` 是将 `yield` 表达式替换成一个值。

```js
const g = function* (x, y) {
  let result = yield x + y
  return result
}

const gen = g(1, 2)
gen.next() // Object {value: 3, done: false}

gen.next(1) // Object {value: 1, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = 1;
```

`throw()` 是将 `yield` 表达式替换成一个 `throw` 语句。

```js
gen.throw(new Error('出错了')) // Uncaught Error: 出错了
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));
```

`return()` 是将 `yield` 表达式替换成一个 `return` 语句。

```js
gen.return(2) // Object {value: 2, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;
```

---

参考 [ruanyifeng generator](https://es6.ruanyifeng.com/#docs/generator)
