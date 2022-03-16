// 2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。

// 1 2 3 4 5

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function (nums) {
  let min = 0,
    max = 14,
    set = new Set();

  for (let n of nums) {
    if (n === 0) continue;
    max = Math.max(n, max);
    min = Math.min(n, min);
    // 若有重复，提前返回 false
    if (set.has(n)) return false;
    set.add(n);
  }

  // 最大牌 - 最小牌 < 5 则可构成顺子
  return max - min < 5;
};
