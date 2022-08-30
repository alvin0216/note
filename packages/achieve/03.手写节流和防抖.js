/** 防抖 */
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    let that = this;
    timer = setTimeout(() => {
      fn.apply(that, args);
    }, delay);
  };
}

/** 节流 */
function throttle(fn, delay) {
  let timer = null;
  return function (...args) {
    let that = this;
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(that, args);
        timer = null;
      }, delay);
    }
  };
}
