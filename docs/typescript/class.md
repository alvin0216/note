---
title: Typescript Class
---

## 访问修饰符 public protected private

```ts
class Person {
  public name: string = 'alvin' // public：可以在任何地方访问
  private age: number = 18 // private 表示只能在 只能在类“Person”中访问
  protected sex: string = '男' // protected 可以在 Person 及其子类中访问中访问

  say() {
    console.log(this.age)
  }
}

let p = new Person()
p.name //
p.say()

class Man extends Person {
  constructor() {
    super()
    console.log(this.sex)
  }
}

let m = new Man()
m.sex // Error 属性“sex”受保护，只能在类“Person”及其子类中访问
```

其他属性修饰符 `static`, `readonly`.

## abstract 抽象类

> 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。

```ts
abstract class Animal {
  abstract makeSound(): void // abstract 声明后必须在派生类中实现
  eat: string = '吃' // 普通属性
}

// 如果有构造函数
abstract class Animal {
  abstract makeSound(): void // abstract 声明后必须在派生类中实现
  constructor(public name: string) {}
}

class Cat extends Animal {
  constructor() {
    super('猫') // 必须调用 super
  }
  makeSound() {
    console.log(this.name, '喵')
  }
}
```

## 方法重载

```ts
class ProductService {
  getProducts(): void
  getProducts(id: number): void
  getProducts(id?: number) {
    if (typeof id === 'number') {
      console.log(`获取id为 ${id} 的产品信息`)
    } else {
      console.log(`获取所有的产品信息`)
    }
  }
}

const productService = new ProductService()
productService.getProducts(666) // 获取id为 666 的产品信息
productService.getProducts() // 获取所有的产品信息
```
