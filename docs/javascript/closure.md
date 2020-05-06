---
title: JavaScript 中的闭包
date: 2020-05-06 16:19:57
---

## 经典题目

```js
var data = []

for (var i = 0; i < 3; i++) {
  data[i] = function() {
    console.log(i)
  }
}

data[0]()
data[1]()
data[2]()
```

答案是都是 3
