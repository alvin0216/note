## 模板

```js
result = [];

function backtrack(路径, 选择列表) {
  if ('满足结束条件') {
    // 这里就是对答案做更新,依据实际题目出发
    result.push(路径);
    return;
  } else {
    for (let i = 0; i < 选择列表.length; i++) {
      // 对一个选择列表做相应的选择

      做选择;

      backtrack(路径, 选择列表);

      // 既然是回溯算法,那么在一次分岔路做完选择后
      // 需要回退我们之前做的操作

      撤销选择;
    }
  }
}
```

## 题目

- [39. 组合总和](https://leetcode-cn.com/problems/combination-sum/)
- [40. 组合总和 II](https://leetcode-cn.com/problems/combination-sum-ii/)
- [46. 全排列](https://leetcode-cn.com/problems/permutations/)
- [47. 全排列 II](https://leetcode-cn.com/problems/permutations-ii/)
- [78. 子集](https://leetcode-cn.com/problems/subsets/)
- [90. 子集 II](https://leetcode-cn.com/problems/subsets-ii/)
