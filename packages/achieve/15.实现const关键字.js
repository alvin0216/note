// configurable：是否可以被 delete 删除或者改变特征值
// enumerable：是否能通过 for-in 循环遍历返回属性
// writable：是否可以修改属性的值
// value：保存这个属性的数据值

function _const(key, value) {
  window[key] = value;
  Object.defineProperty(window, key, {
    enumerable: false,
    configurable: false,
    get: function () {
      return value;
    },
    set: function (newValue) {
      if (newValue !== value) {
        throw TypeError('这是只读变量，不可修改');
      } else {
        return value;
      }
    },
  });
}
