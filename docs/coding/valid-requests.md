---
title: 封装有效请求次数
date: 2020-09-11 10:03:41
---

群友遇到一道面试题，记录下

现要按照定顺序发起去进行第三方渠道授权的多个异步网络请求(未知数量，需设置数组) ,但是每个网络请求。如果报了或者失败了有多次重新请求本网络清求的机会(次数可设置)。直到当前网络请求节点的次数用完了，才算整个授权调用链
失败，需要封装成个函数，返回 Promise 可知道整体的调用链的完成情况以及每个节点的数据

我的思路

```js
function request(urls) {
  return new Promise((resolve, reject) => {
    const [item, ...nextList] = urls
    if (!item) return resolve('请求结束')
    if (item.maxCount === 0) return reject(`请求 ${item.url} 失败`)

    axios
      .get(item.url)
      .then(data => {
        console.log(`请求 ${item.url} 成功。结果为`, data)
        resolve(request(nextList))
      })
      .catch(err => {
        item.maxCount--
        console.log(`请求 ${item.url} 失败，剩余有效请求次数：`, item.maxCount)

        resolve(request(urls))
      })
  })
}
```

测试：

```js
let urls = [
  { url: 'https://mock.yonyoucloud.com/mock/13592/random/name', maxCount: 1 },
  { url: 'https://mock.yonyoucloud.com/mock/13592/random/name', maxCount: 3 },
  { url: 'https://mockyonyoucloud.com/mock/13592/random/name', maxCount: 3 }
]
request(urls)
  .then(res => {
    console.log('Reslove', res)
  })
  .catch(e => {
    console.log('Error: ', e)
  })

// 结果：

请求 `https://mock.yonyoucloud.com/mock/13592/random/name` 成功。结果为 {name: "Daniel Hall"}
请求 `https://mockyonyoucloud.com/mock/13592/random/name` 失败，剩余有效请求次数： 2
请求 `https://mockyonyoucloud.com/mock/13592/random/name` 失败，剩余有效请求次数： 1
请求 `https://mockyonyoucloud.com/mock/13592/random/name` 失败，剩余有效请求次数： 0
Error:  请求 `https://mockyonyoucloud.com/mock/13592/random/name` 失败
```

当然还可以新增 callback 属性。具体看需求了...
