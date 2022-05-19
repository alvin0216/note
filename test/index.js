/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let res = s[0];
  let len = s.length;
  for (let i = 1; i < len; i++) {
    let [l, r] = [i, i];
    // 左回文 bb 情况
    while (l > 0 && s[i] === s[l - 1]) l--;

    // 右回文
    while (r < len - 1 && s[i] === s[r + 1]) r++;

    // 左右回文 bab 情况
    while (l > 0 && r < len - 1 && s[l - 1] === s[r + 1]) {
      l--;
      r++;
    }

    if (l < r) {
      let cur = s.slice(l, r + 1);
      res = cur.length > res.length ? cur : res;
    }
  }

  return res;
};

longestPalindrome('babad');
longestPalindrome('cbbd');
