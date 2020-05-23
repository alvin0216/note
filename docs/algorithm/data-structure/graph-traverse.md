---
title: 图的遍历
date: 2020-05-23 19:57:46
---

## 图的遍历基本思路

和树类似，我们也可以对图进行遍历，以访问图中的所有顶点。图的遍历方式分为两种：**广度优先（Breadth-First Search，BFS）**和**深度优先（Depth-First Search，DFS）**。对图的遍历可以用来寻找特定的顶点或两个顶点之间的最短路径，以及检查图是否连通、图中是否含有环等。

![](../../../assets/algorithm/graph/7.png)

| 算法     | 数据结构 | 描述                                                                   |
| -------- | -------- | ---------------------------------------------------------------------- |
| 深度优先 | 栈       | 将图的顶点存入栈中，顶点是沿着路径被探索的，存在新的相邻顶点就去访问。 |
| 广度优先 | 队列     | 将图的顶点存入队列中，最先入队列的顶点先被探索。                       |

:::details 图遍历的基本思路

![](../../../assets/algorithm/graph/8.png)

:::

## 广度优先遍历 <Badge text="队列" />

广度优先算法会从指定的第一个顶点开始遍历图，先访问这个顶点的所有相邻顶点，然后再访问这些相邻顶点的相邻顶点，以此类推。最终，广度优先算法会先广后深地访问图中的所有顶点。

比如上面的例子。广度优先遍历会先把 A 旁边的节点全部遍历一遍。第一层遍历 A -> B -> C -> D 结束，再遍历第二层 D -> E -> F，所以相当于优先遍历图的横向，当然对于图来说没有横向的概念的，这里只是为了方便理解。

![](../../../assets/algorithm/graph/9.png)

在接下来要实现的算法中，我们按照如下的约定对图中的顶点进行遍历，每个顶点最多访问两次：

- 白色：表示该顶点未被访问。
- 灰色：表示该顶点被访问过，但未被探索。
- 黑色：表示该顶点被访问并且被探索过。

由于我们采用邻接表的方式来存储图的数据，对于图的每个顶点，都有一个字典与之对应，字典的键值为顶点的值，字典的内容为与该顶点相邻的顶点列表。基于这种数据结构，我们可以考虑将所有顶点的邻接顶点存入队列，然后依次处理队列中的顶点。下面是具体的遍历步骤：

1. 将开始顶点存入队列。
2. 遍历开始顶点的所有邻接顶点，如果这些邻接顶点没有被访问过（颜色为白色），则将它们标记为被访问（颜色为灰色），然后加入队列。
3. 将开始顶点标记为被处理（颜色为黑色）。
4. 循环处理队列中的顶点，直到队列为空。

:::details 队列、字典类、图代码

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

class Dictionary {
  constructor() {
    this.items = {}
  }

  set(key, value) {
    // 向字典中添加或修改元素
    this.items[key] = value
  }

  get(key) {
    // 通过键值查找字典中的值
    return this.items[key]
  }

  delete(key) {
    // 通过使用键值来从字典中删除对应的元素
    if (this.has(key)) {
      delete this.items[key]
      return true
    }
    return false
  }

  has(key) {
    // 判断给定的键值是否存在于字典中
    return this.items.hasOwnProperty(key)
  }

  clear() {
    // 清空字典内容
    this.items = {}
  }

  size() {
    // 返回字典中所有元素的数量
    return Object.keys(this.items).length
  }

  keys() {
    // 返回字典中所有的键值
    return Object.keys(this.items)
  }

  values() {
    // 返回字典中所有的值
    return Object.values(this.items)
  }

  getItems() {
    // 返回字典中的所有元素
    return this.items
  }
}

class Graph {
  constructor() {
    this.vertices = [] // 用来存放图中的顶点
    this.adjList = new Dictionary() // 用来存放图中的边
  }

  // 向图中添加一个新顶点
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v)
      this.adjList.set(v, [])
    }
  }

  // 向图中添加a和b两个顶点之间的边
  addEdge(a, b) {
    // 如果图中没有顶点a，先添加顶点a
    if (!this.adjList.has(a)) {
      this.addVertex(a)
    }
    // 如果图中没有顶点b，先添加顶点b
    if (!this.adjList.has(b)) {
      this.addVertex(b)
    }

    this.adjList.get(a).push(b) // 在顶点a中添加指向顶点b的边
    this.adjList.get(b).push(a) // 在顶点b中添加指向顶点a的边
  }

  // 获取图的vertices
  getVertices() {
    return this.vertices
  }

  // 获取图中的adjList
  getAdjList() {
    return this.adjList
  }

  toString() {
    let s = ''
    this.vertices.forEach(v => {
      s += `${v} -> `
      this.adjList.get(v).forEach(n => {
        s += `${n} `
      })
      s += '\n'
    })
    return s
  }
}

let graph = new Graph()
let myVertices = ['A', 'B', 'C', 'D', 'E', 'F']
myVertices.forEach(graph.addVertex) // 添加顶点
// 添加边
graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('C', 'D')

console.log(graph.getVertices()) // 获取顶点列表 [ 'A', 'B', 'C', 'D', 'E', 'F' ]
console.log(graph.getAdjList())
/* adjList
    Dictionary {
     items: {
       A: [ 'B', 'C', 'D' ],
       B: [ 'A', 'E', 'F' ],
       C: [ 'A', 'D' ],
       D: [ 'A', 'C' ],
       E: [ 'B' ],
       F: [ 'B' ]
     }
   }
*/
```

:::

```JS
let Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
}

let initializeColor = vertices => {
  let color = {}
  vertices.forEach(v => (color[v] = Colors.WHITE))
  return color
}

let breadthFirstSearch = (graph, startVertex, callback) => {
  let vertices = graph.getVertices() // 获取顶点列表 本例 [ 'A', 'B', 'C', 'D', 'E', 'F' ]
  let adjList = graph.getAdjList() // 获取顶点的边
  let color = initializeColor(vertices) // 默认初始化为白色 未访问
  let queue = new Queue()

  queue.enqueue(startVertex)

  while (!queue.isEmpty()) {
    let u = queue.dequeue() // 取出当前顶点
    adjList.get(u).forEach(n => {
      if (color[n] === Colors.WHITE) { // 如果当前顶点未访问过
        color[n] = Colors.GREY // 访问节点。设置访问过但未探索
        queue.enqueue(n) // 入队列，继续访问
      }
    })

    color[u] = Colors.BLACK // 当前顶点已探索边完毕，设置为已探索。
    if (callback) callback(u)
  }
}
```

`breadthFirstSearch()`方法接收一个 graph 对象，图的数据通过该对象传入。参数 `startVertex` 指定了遍历的起始顶点。回调函数 callback 规定了要如何处理被遍历到的顶点。

首先通过 `initializeColor()`函数将所有的顶点标记为未被访问过（颜色为白色），这些颜色保存在以顶点值为 `key` 的 `color` 对象中。图的 `vertices` 和 `adjList` 属性可以通过 `getVertices()`和 `getAdjList(`)方法得到，然后构造一个队列 `queue`，按照上面描述的步骤对图的顶点进行遍历。

在前面我们给出的测试用例的基础上，添加下面的代码，来看看 `breadthFirstSearch()`方法的执行结果：

```js
breadthFirstSearch(graph, 'A', value => console.log(`visited vertex: ${value}`))
```

参数 `graph` 为前面测试用例中 `Graph` 类的实例，也就是我们用来保存图的数据的对象，'A'被作为遍历的起始顶点，在回调函数中，打印一行文本，用来展示顶点被遍历的顺序。下面是测试结果：

```js
visited vertex: A
visited vertex: B
visited vertex: C
visited vertex: D
visited vertex: E
visited vertex: F
```

尝试将'B'作为起始顶点，看看执行结果：

```js
visited vertex: B
visited vertex: A
visited vertex: E
visited vertex: F
visited vertex: C
visited vertex: D
```

为了方便理解，我们将顶点 `B` 放到最上面：

```js
         B
      /  |  \
    A    E   F
  /  \
C    D
```

### BFS - 寻找最短路径

前面展示了**广度优先算法**的工作原理，我们可以使用它做更多的事情，例如在一个图 G 中，从顶点 v 开始到其它所有顶点间的最短距离。我们考虑一下如何用 `BFS` 来实现寻找最短路径。

## 深度优先遍历<Badge text="栈" />

从 A 开始的话，遍历会不断的探寻最深的一个顶点，即 A -> B -> E，然后在逐渐往回寻找近的 B -> C -> D
