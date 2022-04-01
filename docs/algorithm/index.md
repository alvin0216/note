---
title: 算法
date: 2020-07-22 09:23:33
sidebar: auto
---

## 金额转化

```js
function formatPrice(price) {
  let str = String(price);
  let result = '';
  while (str.length > 3) {
    result = `,${str.slice(-3)}${result}`;
    str = str.slice(0, str.length - 3);
  }
  if (str) result = str + result;
  return result;
}
```
