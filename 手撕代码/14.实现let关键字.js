// 1、具有块级作用域
// 2、没有变量提升
// 3、具有暂时性死区
// 4、不能重复声明

(function () {
  var c = 3;
  console.log(c); //1
})();
console.log(c); //c is not defined
