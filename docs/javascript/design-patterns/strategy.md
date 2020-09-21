---
title: 策略模式
date: 2020-09-21 17:39:58
---

优缺点：

- 避免代码中的多重判断条件。
- 策略模式很好的体现了开放-封闭原则，将一策略封装在策略类中。便于切换，理解，扩展。
- 策略模式在程序中或多或少的增加了策略类。但比堆砌在业务逻辑中要清晰明了。
- 违反最少知识原则，必须要了解各种策略类，才能更好的在业务中应用。

实操：

代码耦合度过高，多重策略下代码更加混乱，必须非常熟悉业务。（更适合单次策略扩展）

## 简单的业务场景

```js
var calculateBonus = function(performanceLevel, salary) {
  if (performanceLevel === 'S') {
    return salary * 4
  }
  if (performanceLevel === 'A') {
    return salary * 3
  }
  if (performanceLevel === 'B') {
    return salary * 2
  }
}

calculateBonus('S', 2000) // 8000
calculateBonus('A', 2000) // 6000
```

如果新增条件，则需要修改 `calculateBonus` 函数，如此下去，这个方法内部将变得冗杂。

设计模式中很重要的一点就是将不变和变分离出来。

```js
var strategies = {
  S: function(salary) {
    return salary * 4
  },
  A: function(salary) {
    return salary * 3
  },
  B: function(salary) {
    return salary * 2
  }
}

var calculateBonus = function(level, salary) {
  return strategies[level](salary)
}

console.log(calculateBonus('S', 10000)) // 40000
console.log(calculateBonus('S', 20000)) // 80000
```

## 实现表单验证

实现

```js
// 模拟 dom
let dom = {
  name: { value: 'alvin' },
  password: { value: '123456228' },
  phone: { value: '15622335088' }
}

let validator = new Validator()
// 添加校验规则
validator.add(dom.name, 'isNonEmpty', '用户名不能为空')
validator.add(dom.password, 'minLength:6', '密码长度不能少于6位')
validator.add(dom.phone, 'isMobile', '手机格式不正确')

let errorMsg = validator.verify()

if (errorMsg) {
  console.log(errorMsg)
} else {
  console.log('验证通过')
}
```

代码：

```js
// 定义好决策
const strategies = {
  isNonEmpty: function(value, errorMsg) {
    if (value === '') return errorMsg
  },
  minLength: function(value, length, errorMsg) {
    if (value.length < length) return errorMsg
  },
  isMobile: function(value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) return errorMsg
  }
}

// 定义 决策类
let Validator = function() {
  this.cache = []
}

// 进行验证
Validator.prototype.verify = function() {
  for (let i = 0; i < this.cache.length; i++) {
    const validatorFunc = this.cache[i]
    const errorMsg = validatorFunc()
    if (errorMsg) return errorMsg
  }
}

// 添加决策
Validator.prototype.add = function(dom, rule, errorMsg) {
  let ary = rule.split(':')
  this.cache.push(function() {
    let strategy = ary.shift()
    // ...ary 将剩余的参数也传入
    return strategies[strategy].apply(dom, [dom.value, ...ary, errorMsg])
  })
}
```

## 多重策略

多重策略是什么意思呢？我上个条件是根据另一个策略完成的。

比如我判断我银行卡有多少钱来决定我要购买东西。

1. 今天是不是还款日 2. 上个月是否有剩余或者欠款 3. 发工资了吗 多少工资... 得到我存款状态是什么级别

然后我购买东西由级别决定，其次购买了 A 就不会购买 B， 购买了 C 一定会购买 D 等等...

我可以把条件全输出，这时候要定义多策略，代码也是会累赘。。。
