/**
 * 组合继承，实例化的时候 会执行两次父构造函数
 */
function func() {
  function Father(age) {
    this.age = age;
  }

  function Child(name, age) {
    this.name = name;
    Father.call(this, age); // 借用构造函数继承
  }

  Child.prototype = new Father();
  Child.prototype.constructor = Child; // 构造函数要指向自身

  var c = new Child('alvin', 18);
  console.log('func', c);
}

func();

/**
 * 利用中转函数
 */
function better() {
  function Father(age) {
    this.age = age;
  }

  function Child(name, age) {
    this.name = name;
    Father.call(this, age); // 借用构造函数继承
  }

  var Temp = function () {};
  Temp.prototype = new Father();
  Child.prototype = new Temp();
  Child.prototype.constructor = Child; // 构造函数要指向自身

  var c = new Child('alvin', 18);
  console.log('better', c);
}

better();
