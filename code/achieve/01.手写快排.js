/**
 * 算法复杂度 O(nlog(n)
 */
function quickSort(arr) {
  let len = arr.length;
  if (len < 2) return arr;

  let pv = arr[0];
  let [left, right] = [[], []];

  for (let i = 1; i < arr.length; i++) {
    arr[i] < pv ? left.push(arr[i]) : right.push(arr[i]);
  }

  return [...quickSort(left), pv, ...quickSort(right)];
}
