---
title: 队列的实现与应用
date: 2020-05-08 15:56:34
---

我们已经接触了栈，接下来要说的队列和栈十分相似，**他们都是线性表，元素都是有序的**。

队列遵循的是 FIFO，也就是先进先出的原则。队列从尾部添加新元素，从顶部移除元素，最新添加的元素必须排列在队列的末尾。

![](https://gitee.com/alvin0216/cdn/raw/master/img/algorithm/stack/5.png)

:::details 队列的方法

| 方法名  | 操作                                                                   |
| ------- | ---------------------------------------------------------------------- |
| enqueue | 向队列尾部添加一个（或是多个）元素。                                   |
| dequeue | 移除队列的第一个元素，并返回被移除的元素。                             |
| front   | 回队列的第一个元素——最先被添加的也是最先被移除的元素。队列不做任何变动 |
| isEmpty | 检查队列是否为空                                                       |
| size    | 获取队列长度                                                           |
| print   | 打印队列的元素                                                         |

:::

## 队列的实现

代码：

```js
function Queue() {
  let items = []

  // 向队列添加元素（一个或多个）
  this.enqueue = function(element) {
    if (element instanceof Array) items = items.concat(element)
    else items.push(element)
  }

  // 从队列移除元素
  this.dequeue = function() {
    return items.shift()
  }

  // 返回队列中的第一个元素
  this.front = function() {
    return items[0]
  }

  // 判断队列是否为空
  this.isEmpty = function() {
    return items.length === 0
  }

  // 返回队列的长度
  this.size = function() {
    return items.length
  }

  // 清空队列
  this.clear = function() {
    items = []
  }

  // 打印队列内的所有元素
  this.print = function() {
    console.log(items.toString())
  }
}
```

与栈的实现方式类似，唯一不同的是从队列移除元素时取的是队列头部的元素（最先添加的），而栈则是取的顶部元素（最后添加的）。下面是一些测试用例及返回结果：

```js
let queue = new Queue()
console.log(queue.isEmpty()) // true

queue.enqueue('John')
queue.enqueue(['Jack', 'Camila'])
queue.print() // John,Jack,Camila
console.log(queue.size()) // 3
console.log(queue.isEmpty()) // false
console.log(queue.front()) // John

console.log(queue.dequeue()) // John
queue.print() // Jack,Camila

queue.clear()
queue.print() //
```

注意，我们允许批量向队列中添加元素，为此我们需要判断 `enqueue` 方法的参数类型，如果参数是数组，则用 `concat()`函数连接两个数组，如果参数不是数组，则直接用 `push()` 函数将元素添加到队列中。

## ES6 版本（Class && WeakMap）<Badge text="闭包" type="warning" />

与栈的实现方式一样，这里我们也同样给出用 ES6 的 `WeakMap` 类来实现的队列版本。

```js
let Queue = (function() {
  const items = new WeakMap()

  class Queue {
    constructor() {
      items.set(this, [])
    }

    enqueue(element) {
      let q = items.get(this)
      if (element instanceof Array) items.set(this, q.concat(element))
      else q.push(element)
    }

    dequeue() {
      let q = items.get(this)
      return q.shift()
    }

    front() {
      return items.get(this)[0]
    }

    isEmpty() {
      return items.get(this).length === 0
    }

    size() {
      return items.get(this).length
    }

    clear() {
      items.set(this, [])
    }

    print() {
      console.log(items.get(this).toString())
    }
  }

  return Queue
})()
```

## 优先队列

所谓优先队列，顾名思义，就是说插入到队列中的元素可以根据优先级设置先后顺序。优先级越高位置越靠前，优先级越低位置越靠后。假设优先级用数字来表示，如果数字越小表示的优先级越高，形成的队列就称之为最小优先队列，反之则称之为最大优先队列。下面是实现的代码：

```js
function PriorityQueue() {
  let items = []

  this.enqueue = function(obj) {
    if (obj instanceof Array) {
      // 批量入列
      for (let i = 0; i < obj.length; i++) {
        this.enqueue(obj[i])
      }
    } else {
      // 元素入列
      if (this.isEmpty()) {
        items.push(obj)
      } else {
        let isEnqueue = false // 标志：当前的 item 是否入队
        for (let i = 0; i < items.length; i++) {
          if (obj.priority < items[i].priority) {
            items.splice(i, 0, obj) // // 优先级高，即将priority值小的元素插入到队列的前面
            isEnqueue = true
            break
          }
        }
        !isEnqueue && items.push(obj) // 没有入队则 push 到队列中
      }
    }
  }

  // 从队列移除元素
  this.dequeue = function() {
    return items.shift()
  }

  // 返回队列中的第一个元素
  this.front = function() {
    return items[0]
  }

  // 判断队列是否为空
  this.isEmpty = function() {
    return items.length === 0
  }

  // 返回队列的长度
  this.size = function() {
    return items.length
  }

  // 清空队列
  this.clear = function() {
    items = []
  }

  // 打印队列内的所有元素
  this.print = function() {
    items.forEach(function(item) {
      console.log(`${item.element} - ${item.priority}`)
    })
  }
}
```

可以看到，唯一有区别的只有 `enqueue` 方法。我们规定所有添加到优先队列的元素都必须满足`{element, priority}`这种 JSON 格式，以保证队列中的每一个元素都有一个 `priority` 属性来表示优先级。如果要添加的元素的优先级和队列中已有元素的优先级相同，仍然遵循队列的先进先出原则。如果队列中所有元素的优先级比要添加的元素的优先级都高，则将元素添加到队列的末尾。我们将 `print()`方法也做了一些调整，以方便查看输出结果。

```TS
let queue = new PriorityQueue()
console.log(queue.isEmpty()) // true

queue.enqueue({ element: 'John', priority: 2 })
queue.enqueue([{ element: 'Jack', priority: 1 }, { element: 'Camila', priority: 1 }])
queue.print(); // Jack - 1, Camila - 1, John - 2
```

## 循环队列

[击鼓传花游戏](https://baike.baidu.com/item/%E5%87%BB%E9%BC%93%E4%BC%A0%E8%8A%B1/5447380?fr=aladdin)，在这个游戏中，孩子们围成一个圆圈，把花尽快的传递给旁边的人。某一时刻传花停止，这个时候花落在谁手里，谁就退出圆圈结束游戏。重复这个过程，直到只剩下一个孩子。例子如下：

例：每循环到 3 则淘汰出局一位，参与者 `[a, b, c, d, e, f]`

| 循环       | 状态     | 出局 |
| ---------- | -------- | :--: |
| 第一次循环 | a1 b2 c3 |  c   |
| 第二次循环 | d1 e2 f3 |  f   |
| 第三次循环 | a1 b1 d3 |  d   |
| 第四次循环 | e1 a2 b3 |  b   |
| 第五次循环 | e1 a2 e3 |  e   |
| 第六次循环 | a        |  a   |

使用循环队列，轻松实现整个过程：

```TS
function game(playerList, number) {
  var queue = new Queue()
  var outer

  for (let i = 0; i < playerList.length; i++) {
    queue.enqueue(playerList[i])
  }

  while (queue.size() > 1) { // 游戏玩家大于 1 时，循环传花
    for (let i = 0; i < number - 1; i++) {
      queue.enqueue(queue.dequeue()) // 当到 number 次之内时，队列头出列入列到最后一位，达到循环效果
    }
    outer = queue.dequeue() // 当到 number 次 出列淘汰！
    console.log('淘汰玩家 --', outer)
  }
  return queue.dequeue()
}

var playerList = ['a', 'b', 'c', 'd', 'e', 'f']

game(playerList, 3)
// 淘汰玩家 -- c >> 淘汰玩家 -- f >> 淘汰玩家 -- d >> 淘汰玩家 -- b >> 淘汰玩家 -- e
```

---

参考 [JavaScript 数据结构——队列的实现与应用](https://www.cnblogs.com/jaxu/p/11268862.html)
