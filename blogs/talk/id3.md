---
title: 决策树 ID3 算法
date: 2020-10-01 09:50:33
sidebar: 'auto'
tags:
  - 决策树
categories:
  - 技术漫谈
---

决策树是一种**机器学习**的方法。决策树的生成算法有 ID3, C4.5 和 C5.0 等。

决策树 就是用熵对数据 分段 然后 层层条件 判断

:::details 什么是机器学习？

常见应用：**豆瓣推荐、广告投放**

- 通过数据+算法得出模型，模型的本质是对世界规律的数字化抽象 🔥
- 大致关系是：大数据=>人工智能=>机器学习=>深度学习
- 大致模型的流程:确定参数=>判别
- 经典的机器学习算法包括：
  - 决策树 ：基于规则的一种分类算法
  - 朴素贝叶斯 ：基于概率的一种分类算法，主要用于文本的分类
  - SVM ：主要用于非线性可分的分类算法
  - K-Means：对数据进行初步聚类，是数据挖掘中非常重要算法之一
  - KNN ：基于距离的一种分类算法
  - 线性回归：主要用于预测目标结果为连续值的问题
  - 逻辑回归：主要用于预测目标结果为离散值的问题
  - 神经网络 ：主要用于深度学习

那什么是机器学习呢？

<span style='font-size: 18px; color: red;'>1. 人类是如何思考的？</span>

机器学习有点像人类的决策过程，我们先看下人类的思考过程。

假设我们去买橘子，嫩黄的橘子比暗黄的甜。所以我们有了一个简单的判断标准：只挑嫩黄的橘子。

<span style='font-size: 18px; color: red;'>2. 计算机是如何实现的？</span>

普通计算机算法是如何实现这个过程的呢？如果用计算机程序来帮你挑选橘子，你会写下这样的规则：

```js
if (嫩黄) return 橘子;
else return 橘子不甜;
```

我们会用这些规则来挑选橘子。但是如果在我们的橘子实验中有了新的发现，我们就不得不手动修改这份规则列表。

比如在我们买回的橘子中有些是酸的，经过品尝各种不同类型的橘子，我们发现那些大个人儿的，嫩黄的橘子才是甜的。所以我们修改了规则：

```js
if (嫩黄 && 大个) return 橘子;
else return 橘子不甜;
```

我们会发现这个普通的计算机算法有个缺点，那就是：我们得搞清楚影响橘子甜度的所有因素的错综复杂的细节。如果问题越来越复杂，我们就要针对所有的橘子类型，手动地制定挑选规则就变得非常困难。

那如何解决克服这个缺点呢？机器学习算法可以解决这个问题。

<span style='font-size: 18px; color: red;'>3. 机器学习算法是什么？？</span>

机器学习算法是由前面的普通算法演化而的来。通过自动地从提供的数据中学习，它会让我们的程序变得更“聪明”。

我们将这个训练数据提供给一个机器学习算法，然后它就会学习出一个关于橘子的特征和它是否甜之间关系的模型。

下次我们再去市场买橘子，面对新的橘子（测试数据），然后将新的橘子输入这个训练好的模型，模型会直接输出这个橘子是甜的，还是不甜的。

有了这个模型，我们现在可以满怀自信的去买橘子了，根本不用考虑那些挑选橘子的细节。只需要将橘子的物理属性输入这个模型就直接可以知道橘子是不是甜。

更重要的是，我们可以让这个模型随着时间越变越好（增强学习），当这个模型读进更多的训练数据，它就会更加准确，并且在做了错误的预测之后进行自我修正。

这还不是最棒的地方，最棒的地方在于，我们可以用同样的机器学习算法去训练不同的模型，比如我们可以使用同样的机器算法来预测苹果， 西瓜的模型。这是常规计算机程序办不到的。

参考：

- [什么是机器学习？](https://www.zhihu.com/question/33892253/answer/602901993)
- [机器学习、优化理论、统计分析、数据挖掘、神经网络、人工智能、模式识别之间的关系是什么？](https://www.zhihu.com/question/20747381/answer/568518288)

:::

## JS 简单实现决策树(ID3 算法)

### 准备测试数据

假设公司有个小姐姐相亲见面为例，得到以下是已经见面或被淘汰了的数据:

```js
let data = [
  { 姓名: '余夏', 年龄: 29, 长相: '帅', 体型: '瘦', 收入: '高', 见面: '见' },
  { 姓名: '豆豆', 年龄: 25, 长相: '帅', 体型: '瘦', 收入: '高', 见面: '见' },
  { 姓名: '帅常荣', 年龄: 26, 长相: '帅', 体型: '胖', 收入: '高', 见面: '见' },
  { 姓名: '王涛', 年龄: 22, 长相: '帅', 体型: '瘦', 收入: '高', 见面: '见' },
  { 姓名: '李东', 年龄: 23, 长相: '帅', 体型: '瘦', 收入: '高', 见面: '见' },
  { 姓名: '王五五', 年龄: 23, 长相: '帅', 体型: '瘦', 收入: '低', 见面: '见' },
  { 姓名: '王小涛', 年龄: 22, 长相: '帅', 体型: '瘦', 收入: '低', 见面: '见' },
  { 姓名: '李缤', 年龄: 21, 长相: '帅', 体型: '胖', 收入: '高', 见面: '见' },
  { 姓名: '刘明', 年龄: 21, 长相: '帅', 体型: '胖', 收入: '低', 见面: '不见' },
  { 姓名: '红鹤', 年龄: 21, 长相: '不帅', 体型: '胖', 收入: '高', 见面: '不见' },
  { 姓名: '李理', 年龄: 32, 长相: '帅', 体型: '瘦', 收入: '高', 见面: '不见' },
  { 姓名: '周州', 年龄: 31, 长相: '帅', 体型: '瘦', 收入: '高', 见面: '不见' },
  { 姓名: '李乐', 年龄: 27, 长相: '不帅', 体型: '胖', 收入: '高', 见面: '不见' },
  { 姓名: '韩明', 年龄: 24, 长相: '不帅', 体型: '瘦', 收入: '高', 见面: '不见' },
  { 姓名: '小吕', 年龄: 28, 长相: '帅', 体型: '瘦', 收入: '低', 见面: '不见' },
  { 姓名: '李四', 年龄: 25, 长相: '帅', 体型: '瘦', 收入: '低', 见面: '不见' },
  { 姓名: '王鹏', 年龄: 30, 长相: '帅', 体型: '瘦', 收入: '低', 见面: '不见' }
];
```

### 搭建决策树基本函数

```js
function DecisionTree(config) {
  if (typeof config == 'object' && !Array.isArray(config)) this.training(config);
}
DecisionTree.prototype = {
  //分割函数
  _predicates: {},
  //统计属性值在数据集中的次数
  countUniqueValues(items, attr) {},
  //获取对象中值最大的Key  假设 counter={a:9,b:2} 得到 "a"
  getMaxKey(counter) {},
  //寻找最频繁的特定属性值
  mostFrequentValue(items, attr) {},
  //根据属性切割数据集
  split(items, attr, predicate, pivot) {},
  //计算熵
  entropy(items, attr) {},
  //生成决策树
  buildDecisionTree(config) {},
  //初始化生成决策树
  training(config) {},
  //预测 测试
  predict(data) {}
};

let decisionTree = new DecisionTree();
```

### 计算熵(entropy)函数

这里的话我主要讲解下:计算熵的函数、生成决策树函数(信息增益)、与预测函数的实现

![](https://gitee.com/alvin0216/cdn/raw/master/images/id3.png)

我们可以知道计算 H(S)(也就是熵)需要得到 p(x)=x/总数量 然后进行计算累加就行了

```js
//......略
//统计属性值在数据集中的次数
countUniqueValues(items, attr) {
    var counter = {}; // 获取不同的结果值 与出现次数
    for (var i of items) {
        if (!counter[i[attr]]) counter[i[attr]] = 0;
        counter[i[attr]] += 1;
    }
    return counter;
},
//......略
//计算熵
entropy(items, attr) {
    var counter = this.countUniqueValues(items, attr); //计算值的出现数
    var p, entropy = 0; //H(S)=entropy=∑(P(Xi)(log2(P(Xi))))
    for (var i in counter) {
        p = counter[i] / items.length; //P(Xi)概率值
        entropy += -p * Math.log2(p); //entropy+=-(P(Xi)(log2(P(Xi))))
    }
    return entropy;
},
//......略
var decisionTree = new DecisionTree();
console.log("函数 countUniqueValues 测试:");
console.log("   长相", decisionTree.countUniqueValues(data, "长相")); //测试
console.log("   年龄", decisionTree.countUniqueValues(data, "年龄")); //测试
console.log("   收入", decisionTree.countUniqueValues(data, "收入")); //测试
console.log("函数 entropy 测试:");
console.log("   长相", decisionTree.entropy(data, "长相")); //测试
console.log("   年龄", decisionTree.entropy(data, "年龄")); //测试
console.log("   收入", decisionTree.entropy(data, "收入")); //测试
```

### 信息增益

根据公式我们知道要得到信息增益的值需要得到:

- H(S) 训练集熵
- p(t) 分支元素的占比
- H(t) 分支数据集的熵

其中 t 我们就先分 match(合适的)和 on match(不合适),所以 H(t):

- H(match) 分割后合适的数据集的熵
- H(on match) 分割后不合适的数据集的熵

所以信息增益 G=H(S)-(p(match)H(match)+p(on match)H(on match))， 因为 p(match)=match 数量/数据集总项数量

信息增益 G=H(S)-((match 数量)xH(match)+(on match 数量)xH(on match))/数据集总项数量

```js
//......略
buildDecisionTree(config){
    var trainingSet = config.trainingSet;//训练集
    var categoryAttr = config.categoryAttr;//用于区分的类别属性
    //......略
    //初始计算 训练集的熵
    var initialEntropy = this.entropy(trainingSet, categoryAttr);//<===H(S)
    //......略
    var alreadyChecked = [];//标识已经计算过了
    var bestSplit = { gain: 0 };//储存当前最佳的分割节点数据信息
    //遍历数据集
    for (var item of trainingSet) {
        // 遍历项中的所有属性
        for (var attr in item) {
            //跳过区分属性与忽略属性
            if ((attr == categoryAttr) || (ignoredAttributes.indexOf(attr) >= 0)) continue;
            var pivot = item[attr];// 当前属性的值
            var predicateName = ((typeof pivot == 'number') ? '>=' : '=='); //根据数据类型选择判断条件
            var attrPredPivot = attr + predicateName + pivot;
            if (alreadyChecked.indexOf(attrPredPivot) >= 0) continue;//已经计算过则跳过
            alreadyChecked.push(attrPredPivot);//记录
            var predicate = this._predicates[predicateName];//匹配分割方式
            var currSplit = this.split(trainingSet, attr, predicate, pivot);
            var matchEntropy = this.entropy(currSplit.match, categoryAttr);//  H(match) 计算分割后合适的数据集的熵
            var notMatchEntropy = this.entropy(currSplit.notMatch, categoryAttr);// H(on match) 计算分割后不合适的数据集的熵
             //计算信息增益:
             // IG(A,S)=H(S)-(∑P(t)H(t)))
             // t为分裂的子集match(匹配),on match(不匹配)
             // P(match)=match的长度/数据集的长度
             // P(on match)=on match的长度/数据集的长度
             var iGain = initialEntropy - ((matchEntropy * currSplit.match.length
                        + notMatchEntropy * currSplit.notMatch.length) / trainingSet.length);
              //不断匹配最佳增益值对应的节点信息
              if (iGain > bestSplit.gain) {
                  //......略
              }
        }
    }
    //......递归计算分支
}
```

### 预测功能

预测功能的话就只要将要预测的值传入,循环去寻找符合条件的分支,直到找到最后的所属分类为止,这里就不详细解释了

```js
 //......略
//预测 测试
predict(data) {
    var attr, value, predicate, pivot;
    var tree = this.root;
    while (true) {
        if (tree.category) {
            return tree.category;
        }
        attr = tree.attribute;
        value = data[attr];
        predicate = tree.predicate;
        pivot = tree.pivot;
        if (predicate(value, pivot)) {
            tree = tree.match;
        } else {
            tree = tree.notMatch;
        }
    }
}
//......略
```

实现方法转自 [JS 简单实现决策树(ID3 算法)](https://blog.csdn.net/weixin_33726313/article/details/89612346)
