---
title: 分页拉取批量数据
date: 2020-05-19 10:12:58
---

> 用 promise 递归实现拉取 100 条数据，每次拉取 20 条，结束条件为当次拉取不足 20 条或者已经拉取 100 条数据

```js
let dataList = []

for (let i = 0; i < 100; i++) {
  dataList.push(i)
}

function fetchList(size, total) {
  return new Promise((reslove, reject) => {
    let result = []

    const ajax = fetchCount => {
      let start = fetchCount * 20
      let end = start + 20
      console.log('fetch', dataList.slice(start, end))
      return Promise.resolve(dataList.slice(start, end))
    }

    const doFetch = fetchCount => {
      ajax(fetchCount).then(list => {
        result = [...result, ...list]
        result.length >= total || list.length < 20 ? reslove(result) : doFetch(fetchCount + 1)
      })
    }

    doFetch(0)
  })
}

fetchList(20, 100).then(res => console.log(res))
```
