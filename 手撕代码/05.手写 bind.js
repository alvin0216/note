Function.prototype.myBind = function (obj, ...args) {
  let that = this;
  return function (...args2) {
    let context = obj || window;
    context._fn = that;
    let result = context._fn(...args, ...args2);
    delete context._fn;
    return result;
  };
};

// better

Function.prototype.myBind = function (context = window, ...bindArgs) {
  let closure = this; // 使用闭包保存 this

  let fBound = function (...args) {
    // 当作为构造函数时，this 指向实例
    // 当作为普通函数时，this 指向 context
    return closure.call(this instanceof fBound ? this : context, ...bindArgs, ...args);
  };

  let fNOP = function () {};
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

function fn(age, count) {
  console.log(this.name, age, count);
}

let newFunc = fn.myBind({ name: 'alvin' }, 18);
newFunc(20);

// test 2
let person = { name: 'alvin' };
function log(age, hobby) {
  console.log(this.name, age, hobby);
}
log.prototype.friend = 'kevin';

let logFunc = log.myBind(person, 18);
const p = new logFunc('dance'); // undefined 18 dance ==> this 指向了 p
console.log(p.friend); // kevin
