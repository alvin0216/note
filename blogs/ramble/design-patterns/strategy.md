---
title: 策略模式
date: 2021-01-04 13:23:50
sidebar: 'auto'
tags:
  - 设计模式
  - 策略模式
categories:
  - 技术漫谈
publish: false
---

优缺点：

- 避免代码中的多重判断条件。
- 策略模式很好的体现了开放-封闭原则，将一策略封装在策略类中。便于切换，理解，扩展。
- 策略模式在程序中或多或少的增加了策略类。但比堆砌在业务逻辑中要清晰明了。
- 违反最少知识原则，必须要了解各种策略类，才能更好的在业务中应用。

实操：

代码耦合度过高，多重策略下代码更加混乱，必须非常熟悉业务。（更适合单次策略扩展）

## 实现表单验证

```js
// 定义好决策
const strategies = {
  isNotEmpty: function(value, errorMsg) {
    if (value === '') return errorMsg;
  },
  minLength: function(value, length, errorMsg) {
    if (value.length < length) return errorMsg;
  },
  isMobile: function(value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) return errorMsg;
  }
};

// 定义 决策类
let Validator = function() {
  this.cache = [];
};

// 进行验证
Validator.prototype.verify = function() {
  for (let i = 0; i < this.cache.length; i++) {
    const validatorFunc = this.cache[i];
    const errorMsg = validatorFunc();
    if (errorMsg) return errorMsg;
  }
};

// 添加决策
Validator.prototype.add = function(dom, rule, errorMsg) {
  let ary = rule.split(':');
  this.cache.push(function() {
    let strategy = ary.shift();
    // ...ary 将剩余的参数也传入
    return strategies[strategy].apply(dom, [dom.value, ...ary, errorMsg]);
  });
};

// 模拟 dom
let dom = {
  name: { value: 'alvin' },
  password: { value: '123456228' },
  phone: { value: '156223350882' }
};

let validator = new Validator();
// 添加校验规则
validator.add(dom.name, 'isNotEmpty', '用户名不能为空');
validator.add(dom.password, 'minLength:6', '密码长度不能少于6位');
validator.add(dom.phone, 'isMobile', '手机格式不正确');

let errorMsg = validator.verify();

if (errorMsg) {
  console.log(errorMsg);
} else {
  console.log('验证通过');
}
```
