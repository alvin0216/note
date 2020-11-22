---
title: 装饰器
---

> 注意 装饰器是一项实验性特性，在未来的版本中可能会发生改变。

ts 配置 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

## 装饰器组合

多个装饰器可以同时应用到一个声明上

1. 由上至下依次对装饰器表达式求值。
2. 求值的结果会被当作函数，由下至上依次调用。

```ts
function f() {
  console.log('f(): evaluated')
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('f(): called')
  }
}

function g() {
  console.log('g(): evaluated')
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('g(): called')
  }
}

class C {
  @f()
  @g()
  method() {}
}
```

在控制台里会打印出如下结果：

```js
f(): evaluated
g(): evaluated
g(): called
f(): called
```
