function myNew(Father, ...args) {
  let obj = Object.create({});
  obj.__proto__ = Father.prototype;
  let result = Father.apply(obj, args);
  return typeof result === 'object' ? result : obj;
}

function Person(name) {
  this.age = 18;
  this.name = name;
}

let p1 = new Person('foo');

console.log(p1, myNew(Person, 'boo'));
