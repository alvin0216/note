---
title: 洗牌算法
date: 2020-09-07 09:45:52
---

## 数组乱序

数组乱序，我们可以利用原生的 sort + Math.random() 方法。

```js
arr.sort(() => Math.random() - 0.5);
```

这种写法是有问题的，它并不能真正地随机打乱数组。

比如 `['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']` 排序 1000 次，统计 a 出现的索引

```js
let n = 10000;

let count = new Array(10).fill(0);

for (let i = 0; i < n; i++) {
  let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  arr.sort(() => Math.random() - 0.5);
  count[arr.indexOf('a')]++;
}

count; // [ 2891, 2928, 1927, 1125, 579, 270, 151, 76, 34, 19 ]
```

即进行 10000 次排序后，字母'a'（数组中的第一个元素）有约 2891 次出现在第一个位置、2928 次出现在第二个位置，与之对应的只有 19 次出现在最后一个位置。如果把这个分布绘制成图像，会是下面这样：

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/shuffle1.png)

类似地，我们可以算出字母'f'（数组中的第六个元素）在各个位置出现的分布为[ 312, 294, 579, 1012, 1781, 2232, 1758, 1129, 586, 317 ]，图像如下：

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/shuffle2.png)

**如果排序真的是随机的，那么每个元素在每个位置出现的概率都应该一样，实验结果各个位置的数字应该很接近**，而不应像现在这样明显地集中在原来位置附近。因此，我们可以认为，使用形如 arr.sort(() => Math.random() - 0.5)这样的方法得到的并不是真正的随机排序。

Array.sort 对短数组使用的是插入排序，对长数组则使用了快速排序。

## 在数组每个项添加随机数

改造数组里的项 `{ v: value, r: random }`, 然后排序时比较这个随机数.

```js
arr.sort((a, b) => a.r - b.r);
```

完整代码：

```js
function shuffle(arr) {
  let new_arr = arr.map((i) => ({ v: i, r: Math.random() }));

  new_arr.sort((a, b) => a.r - b.r);

  // 更新 arr
  arr.splice(0, arr.length, ...new_arr.map((i) => i.v));
}

let n = 10000;
let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
let count = new Array(arr.length).fill(0);

for (let i = 0; i < n; i++) {
  shuffle(arr);
  count[arr.indexOf('a')]++;
}

count; // [1000, 1020, 924, 1031, 1032, 986, 1024, 1003, 1010, 970]
```

这个方法可以认为足够随机了。

## Fisher–Yates shuffle

上面的方法虽然满足随机性要求了，但在性能上并不是很好，需要遍历几次数组，还要对数组进行 `splice` 等操作。

Fisher–Yates shuffle 算法步骤是

1. 在 0 - arr.length - 1 取一个随机数，交换到最后一个位置。
2. 在 0 - arr.length - 2 取一个随机数，交换到倒数第二个位置
3. 重复上面的过程，直到 i 等于 0

```JS
function shuffle(arr) {
  let i = arr.length

  while (i) {
    let j = Math.floor(Math.random() * i--)
    [arr[j], arr[i]] = [arr[i], arr[j]]
  }
}
```
