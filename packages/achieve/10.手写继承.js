// function Father() {}
// function Child() {
//   Father.call(this);
// }

// Child.prototype = new Father();
// Child.prototype.constructor = Child;

function Father(age) {
  this.age = age;
}

function Child(name, age) {
  this.name = name;
  Father.call(this, age);
}

function Temp() {}
Temp.prototype = new Father();
Child.prototype = new Temp();
Child.prototype.constructor = Child;

// done
