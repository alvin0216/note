var thousandSeparator = function (n) {
  let s = n.toString();
  let j = s.length;
  let result = [];
  while (j - 3 > 0) {
    result.unshift(s.slice(j - 3, j));
    j -= 3;
  }
  if (j > 0) result.unshift(s.slice(0, j));

  return result.join('.');
};

thousandSeparator(1234);
