/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let min = Infinity;
  let max = 0;
  for (const price of prices) {
    min = Math.min(min, price);
    max = Math.max(max, price - min);
  }
  return max;
};
