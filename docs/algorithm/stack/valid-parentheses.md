---
title: 栈-有效的括号
date: 2020-05-08 15:27:10
---

leetcode [20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'`  的字符串，判断字符串是否有效。

有效字符串需满足：

- 左括号必须用相同类型的右括号闭合。
- 左括号必须以正确的顺序闭合。

注意空字符串可被认为是有效字符串。

示例

```js
输入: '()'
输出: true

输入: '()[]{}'
输出: true

输入: '(]'
输出: false
```

:::tip

利用栈。

- 遇到左括号，一律推入栈中，
- 遇到右括号，将栈顶部元素拿出，如果不匹配则返回 false，如果匹配则继续循环。

```js
var isValid = function(s) {
  let stack = []

  for (let i = 0; i < s.length; i++) {
    let ch = s.charAt(i)
    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch)
    if (ch === ')' && stack.pop() !== '(') return false
    if (ch === ']' && stack.pop() !== '[') return false
    if (ch === '}' && stack.pop() !== '{') return false
  }
  return stack.length === 0
}
```

:::
