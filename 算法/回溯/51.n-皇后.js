/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N 皇后
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  let result = [];

  // 初始化棋盘
  let chessBoard = new Array(n).fill([]).map(() => new Array(n).fill('.'));

  function backtrack(chessBoard, row) {
    if (row === n) {
      // end 终止条件

      result.push(chessBoard.map((item) => item.join(''))); // 推入res数组
      return;
    }

    for (let col = 0; col < n; col++) {
      // isVaild
      if (!isVaild(chessBoard, row, col)) continue;

      chessBoard[row][col] = 'Q';
      backtrack(chessBoard, row + 1);
      chessBoard[row][col] = '.';
    }
  }

  // 皇后不能处于同一行 同一列 统一斜角上！
  function isVaild(chessBoard, row, col) {
    // 之前的行
    for (let i = 0; i < row; i++) {
      // 所有的列
      for (let j = 0; j < n; j++) {
        if (
          chessBoard[i][j] == 'Q' && // 发现了皇后，并且和自己同列/对角线
          (j === col || i === row || i + j === row + col || i - j === row - col)
        ) {
          return false; // 不是合法的选择
        }
      }
    }
    return true;
  }

  backtrack(chessBoard, 0);
  console.log(result);
  return result;
};
// @lc code=end

solveNQueens(4);
