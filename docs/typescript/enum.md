---
title: 枚举类型
---

```ts
enum Bool {
  No,
  Yes
}
//  Bool { '0': 'No', '1': 'Yes', No: 0, Yes: 1 }

// 初始化赋值
enum Bool2 {
  No = 'no',
  Yes = 'yes'
}
// Bool2 { No: 'no', Yes: 'yes' }
```

正常访问、使用即可

```ts
Bool.No // 0
Bool[0] // No
```

其他用法：

```ts
enum Num {
  A = 1,
  B = A + 1
}
```

接口使用：

```ts
interface CirCle {
  num: Num
}
```
