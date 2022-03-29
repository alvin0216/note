// 常规运行时错误，可以捕获 ✅
try {
  console.log(notdefined);
} catch (e) {
  console.log('捕获到异常：', e);
}
