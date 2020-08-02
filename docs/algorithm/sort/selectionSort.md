---
title: 选择排序
date: 2020-05-19 15:05:55
---

## 算法步骤

- 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置
- 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
- 重复第二步，直到所有元素均排序完毕。

![](https://gitee.com/alvin0216/cdn/raw/master/img/algorithm/sort/selectionSort.png)

## 第一版：基本实现

```TS
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

function selectionSort(arr) {
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    let minIndex = i

    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    if (i !== minIndex) {
      swap(arr, i, minIndex)
    }
  }

  return arr
}

// test
let arr = [4, 2, 3, 6, 5]
console.log(selectionSort(arr)) // [ 2, 3, 4, 5, 6 ]
```

## 第二版：找到最大值

如果你想在每次内循环中找到最大值并把其交换到数组的末尾（相比较 `minIndex` 有点麻烦），以下是实现的代码：

```js
function selectionSort2(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let maxIndex = i

    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j
      }
    }
    if (i !== maxIndex) {
      swap(arr, i, maxIndex)
    }
  }

  return arr
}
```

## 属性

- 不稳定
- Θ(n²) 无论什么输入，均为 Θ(n²)
- Θ(n) 交换: 注意，这里只有 n 次的交换，选择排序的唯一优点

动画来源

---

- 动画来源 [图解面试算法](https://github.com/MisterBooo/LeetCodeAnimation)
- 参考 [优雅的 JavaScript 排序算法（ES6）](https://juejin.im/post/5ab62ec36fb9a028cf326c49)
