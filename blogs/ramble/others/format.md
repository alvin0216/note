---
title: 实现一个金额展示格式化的函数
date: 2018-10-01 09:50:33
sidebar: 'auto'
tags:
  - 面试
categories:
  - 技术漫谈
---

实现一个金额展示格式化的函数 formatAmount，金额展示规则为整数部分每三位用逗号分割，小数部分展示两位。输入数据不是数字时返回 "-"。

```js
// 举例：
// formatAmount(2688) => "2,688.00"
// formatAmount("2e6") => "2,000,000.00"
// formatAmount(-2.33333333) => "-2.33"、
// formatAmount("Alibaba") => "-"
```

答案：

```js
function formatAmount(num) {
  const floatNum = parseFloat(num);
  if (isNaN(floatNum)) return '-';

  const v = floatNum.toLocaleString('en-IN', {
    minimumFractionDigits: 2 // 小数点至少保留到后两位
  });

  // replace 考虑情况为 小数点后面不止两位
  return v.replace(/(\.\d{2})(.?)/, ($1, $2) => $2);
}
```

::: theorem isNaN

`isNaN()` 函数通常用于检测 `parseFloat()` 和 `parseInt()` 的结果，以判断它们表示的是否是合法的数字。

```js
console.log(isNaN(123)); // false
console.log(isNaN('123')); // false
console.log(isNaN('hello')); // true
console.log(isNaN('')); // false
console.log(isNaN(true)); // false
```

注意： 传空字符串或者布尔值会发生转化，表现与数字一致。

:::
