---
title: 类
---

## protected private

一般情况下都是 public

```ts
class Person {
  private name: string = 'alvin'
  protected age: number = 18

  log() {
    console.log(this.name) // 只能在 Person 类内部使用
  }
}

class Man extends Person {
  constructor() {
    super()
    console.log(this.age) // protected 可以在派生类中使用
  }
}
```

readonly、 static

```ts
class Person {
  static age: number = 18
  readonly from: string = 'china' // 只读
}
console.log(Person.age)
```

## 抽象类

无法实例，抽象类中的抽象方法必须在派生类实现。

```ts
abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    console.log('Department name: ' + this.name)
  }

  abstract printMeeting(): void // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing') // 在派生类的构造函数中必须调用 super()
  }

  printMeeting(): void {
    console.log('The Accounting Department meets each Monday at 10am.')
  }

  generateReports(): void {
    console.log('Generating accounting reports...')
  }
}
let department: Department = new AccountingDepartment() // 允许创建一个对抽象类型的引用
department.printName()
department.printMeeting()
department.generateReports() // 错误: 方法在声明的抽象类中不存在
```

## 把类当做接口使用

```ts
class Point {
  x: number
  y: number
}

interface Point3d extends Point {
  z: number
}

let point3d: Point3d = { x: 1, y: 2, z: 3 }
```
