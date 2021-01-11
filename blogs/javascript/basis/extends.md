---
title: 浅谈继承
date: 2019-07-15 13:00:28
sidebar: 'auto'
tags:
  - Javascript
categories:
  - Javascript
---

推荐阅读 [阮一峰 Javascript 面向对象编程（二）：构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)

`javascript` 的继承是基于原型链上的继承，通过 `__proto__` 和 `prototype` 来模拟实现了这个概念。

比如，现在有一个"动物"对象的构造函数。

```js
function Animal() {
  this.species = '动物';
}
```

还有一个"猫"对象的构造函数。

```js
function Cat(name, color) {
  this.name = name;
  this.color = color;
}
```

怎样才能使"猫"继承"动物"呢？

## 构造函数绑定继承

第一种方法也是最简单的方法，使用 call 或 apply 方法，将父对象的构造函数绑定在子对象上，即在子对象构造函数中加一行：

```js {2}
function Cat(name, color) {
  Animal.apply(this, arguments);

  this.name = name;
  this.color = color;
}
```

:::tip 优点

实现了继承，且继承的属性为私有属性（各个实例之间互不影响），而且可以在继承的时候传参。

:::

:::danger 缺点

每次都要创建一次函数，我们希望的是函数可以共享，而不是每次都为实例创建多一个属性去存储函数。

:::

## prototype 继承

如果"猫"的 `prototype` 对象，指向一个 Animal 的实例，那么所有"猫"的实例，就能继承 `Animal` 了。

```js {1,2}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;

var cat1 = new Cat('大毛', '黄色');
alert(cat1.species); // 动物
```

代码的第一行，我们将 Cat 的 prototype 对象指向一个 Animal 的实例。

```js
Cat.prototype = new Animal();
```

它相当于完全删除了 prototype 对象原先的值，然后赋予一个新值。但是，第二行又是什么意思呢？

```js
Cat.prototype.constructor = Cat;
```

原来，任何一个 prototype 对象都有一个 constructor 属性，指向它的构造函数。如果没有"Cat.prototype = new Animal();"这一行，Cat.prototype.constructor 是指向 Cat 的；加了这一行以后，Cat.prototype.constructor 指向 Animal。

```js
alert(Cat.prototype.constructor == Animal); //true
```

更重要的是，每一个实例也有一个 constructor 属性，默认调用 prototype 对象的 constructor 属性。

```js
alert(cat1.constructor == Cat.prototype.constructor); // true
```

因此，在运行"Cat.prototype = new Animal();"这一行之后，cat1.constructor 也指向 Animal！

```js
alert(cat1.constructor == Animal); // true
```

这显然会导致继承链的紊乱（cat1 明明是用构造函数 Cat 生成的），因此我们必须手动纠正，将 Cat.prototype 对象的 constructor 值改为 Cat。这就是第二行的意思。

这是很重要的一点，编程时务必要遵守。下文都遵循这一点，即如果替换了 prototype 对象，

```ts
o.prototype = {};
```

那么，下一步必然是为新的 prototype 对象加上 constructor 属性，并将这个属性指回原来的构造函数。

```ts
o.prototype.constructor = o;
```

:::tip 优点

实现了继承，且继承的属性为共有属性，不需要每次 new 的时候都创建一份新的属性或者方法。

:::

:::danger 缺点

共享的属性相互影响，继承的时候不可以传参数。

:::

## 组合继承

既想要实现私有属性继承，又要共享方法继承，可以同时借用构造函数继承和原型继承：

```ts {9,13}
function Animal() {
  this.species = '动物';
}
Animal.prototype.bark = function(word) {
  console.log(this.species, this.name, word);
};

function Cat(name) {
  Animal.call(this);
  this.name = name;
}

Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;

let cat = new Cat('猫');
cat.bark('喵'); // 动物 猫 喵
```

`species` 也即私有属性，而 `bark` 共享函数存放在 `Animal` 原型上，完美实现了私有属性和共享函数的继承。

:::danger 缺点

调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）

:::

## 直接继承 prototype

由于 Animal 对象中，不变的属性都可以直接写入 Animal.prototype。所以，我们也可以让 Cat()跳过 Animal()，直接继承 Animal.prototype。

将 Cat 的 prototype 对象，然后指向 Animal 的 prototype 对象，这样就完成了继承。

```ts
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
```

与前一种方法相比，这样做的优点是效率比较高（不用执行和建立 Animal 的实例了），比较省内存。

缺点是 Cat.prototype 和 Animal.prototype 现在指向了同一个对象，那么任何对 Cat.prototype 的修改，都会反映到 Animal.prototype。

## 利用空对象作为中介

由于"直接继承 prototype"存在上述的缺点，所以就有第四种方法，利用一个空对象作为中介。

```ts
var F = function() {};
F.prototype = Animal.prototype;

Cat.prototype = new F();
Cat.prototype.constructor = Cat;
```

F 是空对象，所以几乎不占内存。这时，修改 Cat 的 prototype 对象，就不会影响到 Animal 的 prototype 对象。

```ts
alert(Animal.prototype.constructor); // Animal
```

我们将上面的方法，封装成一个函数，便于使用。

```ts
function extend(Child, Parent) {
  var F = function() {};
  F.prototype = Parent.prototype;
  Child.prototype = new F();

  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype;
}
```

使用的时候，方法如下

```ts
extend(Cat, Animal);
var cat1 = new Cat('大毛', '黄色');
alert(cat1.species); // 动物
```

这个 extend 函数，就是 YUI 库如何实现继承的方法。

另外，说明一点，函数体最后一行

```ts
Child.uber = Parent.prototype;
```

意思是为子对象设一个 uber 属性，这个属性直接指向父对象的 prototype 属性。（uber 是一个德语词，意思是"向上"、"上一层"。）这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。

推荐阅读 [JavaScript 深入之继承的多种方式和优缺点](https://github.com/mqyqingfeng/Blog/issues/16)
