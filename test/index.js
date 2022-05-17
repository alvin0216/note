/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  let result = [];
  let path = [];

  function backtracking(i) {
    const len = path.length;
    if (len > 4) return;
    if (len === 4 && i === s.length) {
      result.push(path.join('.'));
      return;
    }
    for (let j = i; j < s.length; j++) {
      let str = s.slice(i, j + 1);
      if (str.length > 3 || Number(str) > 255) break;
      if (str.length > 1 && str[0] === '0') break; // 如果当前字符超过1位，但是前导位是0 则跳过
      path.push(str);
      backtracking(j + 1);
      path.pop();
    }
  }
  backtracking(0);
  return result;
};

restoreIpAddresses('25525511135');
restoreIpAddresses('0000');
restoreIpAddresses('101023');
