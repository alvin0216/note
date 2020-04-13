## javascript

### 题 1

以下哪些值是假值

```js
0
new Number(0)('')(' ')
new Boolean(false)
undefined
```

- A: 0, '', undefined
- B: 0, new Number(0), '', new Boolean(false), undefined
- C: 0, '', new Boolean(false), undefined
- D: All

:::details 答案与解析

> A, `javascript` 中有 6 个假值
> `undefined` `null` `NaN` `0` `''` `false`
>
> 函数构造函数 `new Number` `new Boolean` 都是真值  

:::
