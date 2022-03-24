---
title: awsome
date: 2022-03-24 00:20:07
sidebar: auto
tags:
  - javascript
categories:
  - javascript
---

## eventloop

### 题目 1

:::: tabs

::: tab 题目

```js
var b = () => {
  try {
    async function async1() {
      console.log(1);
      await async2();
      console.log(2); // a
    }
    //
    async function async2() {
      console.log(3);
    }
    async1();
    new Promise(function (resolve, reject) {
      reject(8);
      console.log(4);
    })
      .catch((e) => {
        console.log(5); // b
        console.log(e);
      })
      .then(() => {
        console.log(6);
      });
    console.log(7);
  } catch (error) {
    console.log(error);
  }
};

b();
```

:::

::: tab 答案与解析

```js
var b = () => {
  try {
    async function async1() {
      console.log(1);
      await async2();
      console.log(2); // a
    }
    async function async2() {
      console.log(3);
    }
    async1();
    new Promise(function (resolve, reject) {
      reject(8);
      console.log(4);
    })
      .catch((e) => {
        console.log(5); // b
        console.log(e);
      })
      .then(() => {
        console.log(6);
      });
    console.log(7);
  } catch (error) {
    console.log(error);
  }
};
b();

// 1 3 4 7 2 5 8 6
```

前面都好理解最后一个 6 呢？

```js
new Promise(function (resolve, reject) {
  reject(8);
  console.log(4);
})
  .then(() => {
    console.log(6);
  })
  .catch((e) => {
    console.log(5);
    console.log(e);
  });

// 4 5 8

new Promise(function (resolve, reject) {
  reject(8);
  console.log(4);
})

  .catch((e) => {
    console.log(5); // b
    console.log(e);
  })
  .then(() => {
    console.log(6);
  });
// 4 5 8 6
```

catch 先，会执行 then

:::

::::

### 题目 2

:::: tabs

::: tab 题目

```js
const b = () => {
  try {
    async function async1() {
      console.log(1);
      const b = await 99;
      console.log(b);
      const c = await async2();
      console.log(2);
      console.log(c);
    }
    const lbl = Promise.resolve('101');
    const gsw = Promise.reject('102');
    async function async2() {
      console.log(3);
      return new Promise((resolve, reject) => {
        console.log(lbl);
        setTimeout(() => {
          resolve(98);
        }, 100);
      });
    }
    async1();
    new Promise(function (resolve, reject) {
      resolve(8);
      console.log(4);
    })
      .catch((e) => {
        console.log(5);
        console.log('e', e);
      })
      .then(() => {
        Promise.reject(100);
        console.log(6);
      });

    console.log(7);
  } catch (error) {
    console.log(error);
  }
};
```

:::

::: tab 答案与解析

:::

```js
var b = () => {
  try {
    async function async1() {
      console.log(1);
      const b = await 99;
      console.log(b); // a
      const c = await async2();
      console.log(2); // c
      console.log(c);
    }
    const lbl = Promise.resolve('101');
    const gsw = Promise.reject('102');
    async function async2() {
      console.log(3);
      return new Promise((resolve, reject) => {
        console.log(lbl);
        setTimeout(() => {
          // d
          resolve(98);
        }, 100);
      });
    }
    async1();
    new Promise(function (resolve, reject) {
      resolve(8);
      console.log(4);
    })
      .catch((e) => {
        console.log(5);
        console.log('e', e);
      })
      .then(() => {
        // b
        Promise.reject(100);
        console.log(6);
      });

    console.log(7);
  } catch (error) {
    console.log(error);
  }
};
b();
// 1 4 7 99 3 Promise<101> 6  2 98
```

::::

<!-- :::: tabs

::: tab 题目

:::


::: tab 答案与解析

:::

:::: -->
<!-- :::: tabs

::: tab 题目

:::


::: tab 答案与解析

:::

:::: -->
