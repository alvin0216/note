---
title: 反转字符串II
date: 2022-03-31 20:46:00
sidebar: auto
tags:
  - 字符串
categories:
  - leetcode
---

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  let arr = s.split('');

  for (let i = 0; i < s.length; i += 2 * k) {
    let y = Math.min(i + k, s.length) - 1;
    for (let x = i; x < y; x++, y--) {
      [arr[x], arr[y]] = [arr[y], arr[x]];
    }
  }

  return arr.join('');
};
```
