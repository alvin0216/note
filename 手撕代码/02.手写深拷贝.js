/**
 * 如何写出一个惊艳面试官的深拷贝? https://juejin.cn/post/6844903929705136141
 */

// 需要深拷贝的类型，这里就列出一部分
let deepTags = ['Array', 'Object', 'Set', 'Map'];

function clone(target, map = new WeakMap()) {
  // 1. 类型判断
  let type = Object.prototype.toString.call(target).slice(8, -1);

  if (deepTags.includes(type)) {
    // 防止循环引用
    if (map.has(target)) return map.get(target);
    // 拿到构造函数新建一个实例 这里有可能是 Map 等结构
    let cloneTarget = new target.constructor();
    map.set(target, cloneTarget);

    if (type === 'Set') {
      for (let key of target) {
        cloneTarget.add(clone(key, target));
      }
      return cloneTarget;
    }

    if (type === 'Map') {
      for (let [key, value] of target) {
        cloneTarget.set(key, clone(value, map));
      }
      return cloneTarget;
    }

    // 克隆对象
    for (const key in target) {
      cloneTarget[key] = clone(target[key]);
    }

    return cloneTarget;
  }

  return target;
}

let map = new Map([['age', 18]]);
console.log(map, clone(map));

let obj = { age: 18 };
let obj2 = clone(obj);
obj2.age = 20;

console.log(obj, obj2);
