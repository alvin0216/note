Function.prototype.mycall = function (obj, ...args) {
  // 默认 window 环境
  let context = obj || window;
  context._fn = this;
  let result = context._fn(...args);
  delete context._fn;
  return result;
};

// apply
Function.prototype.myApply = function (obj, args) {
  let context = obj || window;
  context._fn = this;
  let result = context._fn(...args);
  delete context._fn;
  return result;
};

function fn(age) {
  console.log(this.name, age);
}

fn.mycall({ name: 'alvin' }, 18);
fn.myApply({ name: 'alvin' }, [18]);
