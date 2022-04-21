Function.prototype.mycall = function (obj, ...args) {
  let context = obj || window;
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result;
};

function foo(age) {
  console.log(this.name, age);
}

foo.call({ name: 'bar' }, 18);
foo.mycall({ name: 'bar' }, 18);

// bind 无非就是将传参数改成数组，这里不在实现

Function.prototype.mybind = function (obj, ...bindArgs) {
  let closure = this;
  return function fBound(...args) {
    return closure.call(obj, ...bindArgs, ...args);
  };
};
