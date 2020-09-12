---
title: 概览
---

```JS
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}
```

## 冒泡/选择

- 冒泡 内外循环

```js
function bubbleSort(arr) {
  for (let j = arr.length - 1; j >= 0; j--) {
    for (let i = 0; i < j; i++) {
      if (arr[i] > arr[j]) {
        swap(arr, i, j)
      }
    }
  }
  return arr
}
```

- 选择 内循环找到最小 index

```js
function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      swap(arr, minIndex, i)
    }
  }
  return arr
}
```

## 插入排序

- 前面的都是有序的，后面比较的数直接忘有序的序列里插入即可。

<img class='small' alt='' src='https://user-gold-cdn.xitu.io/2019/4/15/16a1fee333ee4cc2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1' />

```js
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i]
    let prevIndex = i - 1
    while (arr[prevIndex] > current) {
      arr[prevIndex + 1] = arr[prevIndex] // 如果前一个比 current 大，则往后移动一位，prevIndex-- 继续循环
      prevIndex--
    }
    arr[prevIndex + 1] = current // 插入
  }

  return arr
}
```
