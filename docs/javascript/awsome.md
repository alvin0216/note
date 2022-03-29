---
title: awsome
date: 2022-03-24 00:20:07
sidebar: auto
tags:
  - Javascript
categories:
  - Javascript
---

## eventloop

### Promise（catch & then）

```js
new Promise(function (resolve, reject) {
  reject(1);
  console.log(2);
})
  .catch((e) => {
    console.log(3);
    console.log('catch', e);
  })
  .then(() => {
    console.log(4);
  });

// 2 3 catch 1 4
```

把 then 放前面呢？

```js
new Promise(function (resolve, reject) {
  reject(1);
  console.log(2);
})

  .then(() => {
    console.log(4);
  })
  .catch((e) => {
    console.log(3);
    console.log('catch', e);
  });

// 2 3 catch 1
```

如果没有 catch，会被 try catch 里面捕捉吗？：

```js
try {
  new Promise(function (resolve, reject) {
    reject(1);
    console.log(2);
  }).then(() => {
    console.log(3);
  });
} catch (error) {
  console.log('error', error);
}
// 2 不会
```

### Promise & setTimeout

```js
setTimeout(() => {
  console.log(1);
});

Promise.resolve()
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  });

// 2 3 1
```