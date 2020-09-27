---
title: 实现请求队列
date: 2020-09-27 14:49:36
---

1. 有最大并发数
2. 当一个新请求返回时，增加新请求
3. 请求完成后，按顺序打印结果

:::details 请求列表

```js
let list = [
  new Promise(resolve => {
    setTimeout(() => {
      resolve(1)
    }, 1500)
  }),
  new Promise(resolve => {
    setTimeout(() => {
      resolve(2)
    }, 500)
  }),
  new Promise(resolve => {
    setTimeout(() => {
      resolve(3)
    }, 100)
  }),
  new Promise(resolve => {
    setTimeout(() => {
      resolve(4)
    }, 1500)
  }),
  new Promise(resolve => {
    setTimeout(() => {
      resolve(5)
    }, 1500)
  })
]
```

:::

```js
function fetchQueue(list, maxNum = 2) {
  return new Promise((resolve, reject) => {
    let result = []
    let current = maxNum - 1
    list.slice(0, maxNum).forEach(ajax)

    function ajax(item, i) {
      item.then(
        val => {
          result[i] = val
          if (result.filter(v => typeof v !== 'undefined').length < list.length) {
            current++
            list[current] && ajax(list[current], current)
          } else {
            resolve(result)
          }
        },
        err => {}
      )
    }
  })
}

fetchQueue(list).then(res => {
  console.log(res)
})
```
