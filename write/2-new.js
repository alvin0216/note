function myNew(Father, ...rest) {
  let obj = Object.create({}); // 1. 创建新对象
  obj.__proto__ = Father.prototype; // 2. 对象的 __proto__ 执行父函数
  let result = Father.call(obj, ...rest); // 3. 执行构造函数
  return typeof result === 'object' ? result : obj;
}

function Father(name) {
  this.name = name;
}

let instance = myNew(Father, 'alvin');

console.log(instance);
