---
title: N皇后
date: 2022-03-31 20:46:00
sidebar: auto
tags:
  - 回溯算法
categories:
  - leetcode
---

[力扣题目链接](https://leetcode-cn.com/problems/n-queens/)

n  皇后问题 研究的是如何将 n  个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 n ，返回所有不同的  n  皇后问题 的解决方案。

每一种解法包含一个不同的  n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

示例 1：

![](https://code-thinking-1253855093.file.myqcloud.com/pics/20211020232201.png)

```js
- 输入：n = 4
- 输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
- 解释：如上图所示，4 皇后问题存在两个不同的解法。
```

示例 2：

```js
- 输入：n = 1
- 输出：[["Q"]]
```

```js
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
```
