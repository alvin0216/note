var name = 'Nicolas';
function Person() {
  this.name = 'Smiley';
  this.sayName = function () {
    console.log(this.name);
  };
  setTimeout(this.sayName, 2000);
}

var person = new Person();
person.sayName();
