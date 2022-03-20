/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function (grid) {
  let row = grid.length,
    col = grid[0].length;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (i === 0 && j === 0) continue;
      else if (i == 0) {
        grid[i][j] += grid[i][j - 1];
      } else if (j === 0) {
        grid[i][j] += grid[i - 1][j];
      } else {
        grid[i][j] += Math.max(grid[i][j - 1], grid[i - 1][j]);
      }
    }
  }

  return grid[row - 1][col - 1];
};

maxValue([
  [1, 2, 5],
  [3, 2, 1],
]);

// let grid = [
//   [1, 2, 5],
//   [3, 2, 1],
// ];

// console.log(grid[1][0]);
