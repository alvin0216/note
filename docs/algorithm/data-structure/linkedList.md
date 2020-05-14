---
title: 链表的实现与应用
date: 2020-05-10 15:16:26
---

## 链表简介

在前面两篇文章，我们运用 `javascript` 提供的 API 很容易的实现了[栈](./stack)和[队列](./queue)，但这种数据结构有一个很明显的缺点：**操作成本高**

无论我们在数组中的元素进行添加、移动或者删除时，我们会改变到他内部的所有元素。

链表用来存储有序的元素集合，与数组不同，链表中的元素并非保存在连续的存储空间内，每个元素由一个存储元素本身的节点和一个指向下一个元素的指针构成。当要移动或删除元素时，只需要修改相应元素上的指针就可以了。**对链表元素的操作要比对数组元素的操作效率更高**。

下面是链表数据结构的示意图：

![](../../../assets/algorithm/linkedList/1.png)

:::details 链表的基本方法

| 方法                      | 说明                                                          |
| ------------------------- | ------------------------------------------------------------- |
| insert(position, element) | 插入元素                                                      |
| append(element)           | 尾部添加元素                                                  |
| indexOf(element)          | 返回链表中某元素的索引，如果没有返回-1                        |
| remove(element)           | 从链表移除一项                                                |
| removeAt(position)        | 从链表特定位置移除一项                                        |
| size                      | 返回链表的长度                                                |
| toString                  | 重写继承自 Object 类的 toString()方法，因为我们使用了 Node 类 |
| print                     | 打印链表数据                                                  |

:::

## 单向链表的实现

要实现链表数据结构，关键在于保存 `head` 元素（即链表的头元素）以及每一个元素的 `next` 指针，有这两部分我们就可以很方便地遍历链表从而操作所有的元素。可以把链表想象成一条锁链，锁链中的每一个节点都是相互连接的，我们只要找到锁链的头，整条锁链就都可以找到了。让我们来看一下具体的实现方式。

基本骨架：

```js
class LinkedList {
  constructor() {
    this.length = 0
    this.head = null
  }

  append(element) {} // 向链表中添加节点

  insert(position, element) {} // 在链表的指定位置插入节点

  removeAt(position) {} // 删除链表中指定位置的元素，并返回这个元素的值

  remove(element) {} // 删除链表中对应的元素

  indexOf(element) {} // 在链表中查找给定元素的索引

  getElementAt(position) {} // 返回链表中索引所对应的元素

  isEmpty() {} // 判断链表是否为空

  size() {} // 返回链表的长度

  getHead() {} // 返回链表的头元素

  clear() {} // 清空链表

  toString() {} // 辅助方法，按指定格式输出链表中的所有元素，方便测试验证结果
}
```

首先我们需要一个辅助类，用来描述链表中的节点。这个类很简单，只需要两个属性，一个用来保存节点的值，一个用来保存指向下一个节点的指针。

```js
let Node = function(element) {
  this.element = element
  this.next = null
}
```

让我们从查找链表元素的方法 `getElementAt()` 开始，因为后面我们会多次用到它。

```js
getElementAt(position) {
  if (position < 0 || position >= this.length) return null

  let current = this.head
  for (let i = 0; i < position; i++) {
    current = current.next
  }
  return current
}
```

首先判断参数 `position` 的边界值，如果值超出了索引的范围（小于 0 或者大于 length - 1），则返回 null。我们从链表的 `head` 开始，遍历整个链表直到找到对应索引位置的节点，然后返回这个节点。是不是很简单？和所有有序数据集合一样，链表的索引默认从 0 开始，只要找到了链表的头（所以我们必须在 `LinkedList` 类中保存 `head` 值），然后就可以遍历找到索引所在位置的元素。

### 实现 append

有了 `getElementAt()`方法，接下来我们就可以很方便地实现 `append()`方法，用来在链表的尾部添加新节点。

```js
append(element) {
  let node = new Node(element)

  // 如果当前链表为空，则将head指向node
  if (this.head === null) this.head = node
  else {
    // 否则，找到链表尾部的元素，然后添加新元素
    let current = this.getElementAt(this.length - 1)
    current.next = node
  }

  this.length++
}
```

如果链表的 `head` 为 `null`（这种情况表示链表为空），则直接将 `head` 指向新添加的元素。否则，通过 `getElementAt()`方法找到链表的最后一个节点，将该节点的 `next` 指针指向新添加的元素。新添加的元素的 `next` 指针默认为 `null`，链表最后一个元素的 `next` 值为 `null`。将节点挂到链表上之后，不要忘记将链表的长度加 1，我们需要通过 `length` 属性来记录链表的长度。

### 实现 insert

接下来我们要实现 `insert()`方法，可以在链表的任意位置添加节点。

```js
insert(position, element) {
  // position不能超出边界值
  if (position < 0 || position > this.length) return false

  let node = new Node(element)

  if (position === 0) {
    node.next = this.head
    this.head = node
  }
  else {
    let previous = this.getElementAt(position - 1)
    node.next = previous.next
    previous.next = node
  }

  this.length++
  return true
}
```

首先也是要判断参数 `position` 的边界值，不能越界。当 `position` 的值为 0 时，表示要在链表的头部插入新节点，对应的操作如下图所示。将新插入节点的 `next` 指针指向现在的 head，然后更新 `head` 的值为新插入的节点。

![](../../../assets/algorithm/linkedList/2.png)

如果要插入的节点在链表的中间或者尾部，对应的操作如下图。

![](../../../assets/algorithm/linkedList/3.png)

假设链表长度为 3，要在位置 2 插入新节点，我们首先找到位置 2 的前一个节点 `previous node`，将新节点 `new node`的 `next` 指针指向 `previous node` 的 `next` 所对应的节点，然后再将 `previous node` 的 `next` 指针指向 new node，这样就把新节点挂到链表中了。

考虑一下，当插入的节点在链表的尾部，这种情况也是适用的。而如果链表为空，即链表的 `head` 为 `null`，则参数 `position` 会超出边界条件，从而 `insert()`方法会直接返回 `false`。

最后，别忘了更新 `length` 属性的值，将链表的长度加 1。

### 实现 removeAt

按照相同的方式，我们可以很容易地写出 `removeAt()`方法，用来删除链表中指定位置的节点。

```js
removeAt(position) {
  // position不能超出边界值
  if (position < 0 || position >= this.length) return null

  let current = this.head

  if (position === 0) this.head = current.next
  else {
    let previous = this.getElementAt(position - 1)
    current = previous.next
    previous.next = current.next
  }

  this.length--
  return current.element
}
```

下面两张示意图说明了从链表头部和其它位置删除节点的情况。

![](../../../assets/algorithm/linkedList/4.png)
![](../../../assets/algorithm/linkedList/5.png)

如果要删除的节点为链表的头部，只需要将 `head` 移到下一个节点即可。

如果当前链表只有一个节点，那么下一个节点为 `null`，此时将 `head` 指向下一个节点等同于将 `head` 设置成 `null`，删除之后链表为空。

如果要删除的节点在链表的中间部分，我们需要找出 `position` 所在位置的前一个节点，将它的 `next` 指针指向 `position` 所在位置的下一个节点。总之，删除节点只需要修改相应节点的指针，使断开位置左右相邻的节点重新连接上。被删除的节点由于再也没有其它部分的引用而被丢弃在内存中，等待垃圾回收器来清除。

### 实现 indexOf

下面我们来看看 `indexOf()`方法，该方法返回给定元素在链表中的索引位置。

```js
indexOf(element) {
  let current = this.head

  for (let i = 0; i < this.length; i++) {
    if (current.element === element) return i
    current = current.next
  }

  return -1
}
```

我们从链表的头部开始遍历，直到找到和给定元素相同的元素，然后返回对应的索引号。如果没有找到对应的元素，则返回-1。

### 完整代码

链表类中的其它方法都比较简单，就不再分部讲解了，下面是完整的链表类的代码：

```js
class LinkedList {
  constructor() {
    this.length = 0
    this.head = null
  }

  append(element) {
    let node = new Node(element)

    // 如果当前链表为空，则将head指向node
    if (this.head === null) this.head = node
    else {
      // 否则，找到链表尾部的元素，然后添加新元素
      let current = this.getElementAt(this.length - 1)
      current.next = node
    }

    this.length++
  }

  insert(position, element) {
    // position不能超出边界值
    if (position < 0 || position > this.length) return false

    let node = new Node(element)

    if (position === 0) {
      node.next = this.head
      this.head = node
    } else {
      let previous = this.getElementAt(position - 1)
      node.next = previous.next
      previous.next = node
    }

    this.length++
    return true
  }

  removeAt(position) {
    // position不能超出边界值
    if (position < 0 || position >= this.length) return null

    let current = this.head

    if (position === 0) this.head = current.next
    else {
      let previous = this.getElementAt(position - 1)
      current = previous.next
      previous.next = current.next
    }

    this.length--
    return current.element
  }

  remove(element) {
    let index = this.indexOf(element)
    return this.removeAt(index)
  }

  indexOf(element) {
    let current = this.head

    for (let i = 0; i < this.length; i++) {
      if (current.element === element) return i
      current = current.next
    }

    return -1
  }

  getElementAt(position) {
    if (position < 0 || position >= this.length) return null

    let current = this.head
    for (let i = 0; i < position; i++) {
      current = current.next
    }
    return current
  }

  isEmpty() {
    // return this.head === null;
    return this.length === 0
  }

  size() {
    return this.length
  }

  getHead() {
    return this.head
  }

  clear() {
    this.head = null
    this.length = 0
  }

  toString() {
    let current = this.head
    let s = ''

    while (current) {
      let next = current.next
      next = next ? next.element : 'null'
      s += `[element: ${current.element}, next: ${next}] `
      current = current.next
    }

    return s
  }
}
```

:::details 测试用例

测试代码：

```js
let linkedList = new LinkedList()
linkedList.append(10)
linkedList.append(15)
linkedList.append(20)

console.log(linkedList.toString())

linkedList.insert(0, 9)
linkedList.insert(2, 11)
linkedList.insert(5, 25)
console.log(linkedList.toString())

console.log(linkedList.removeAt(0))
console.log(linkedList.removeAt(1))
console.log(linkedList.removeAt(3))
console.log(linkedList.toString())

console.log(linkedList.indexOf(20))

linkedList.remove(20)

console.log(linkedList.toString())

linkedList.clear()
console.log(linkedList.size())
```

测试结果：

```js
[element: 10, next: 15] [element: 15, next: 20] [element: 20, next: null]
[element: 9, next: 10] [element: 10, next: 11] [element: 11, next: 15] [element: 15, next: 20] [element: 20, next: 25] [element: 25, next: null]
9
11
25
[element: 10, next: 15] [element: 15, next: 20] [element: 20, next: null]
2
[element: 10, next: 15] [element: 15, next: null]
0
```

:::

## 双向链表

上面链表中每一个元素只有一个 next 指针，用来指向下一个节点，这样的链表称之为单向链表，我们只能从链表的头部开始遍历整个链表，任何一个节点只能找到它的下一个节点，而不能找到它的上一个节点。双向链表中的每一个元素拥有两个指针，一个用来指向下一个节点，一个用来指向上一个节点。

在双向链表中，除了可以像单向链表一样从头部开始遍历之外，还可以从尾部进行遍历。下面是双向链表的数据结构示意图：

![](../../../assets/algorithm/linkedList/6.png)

由于双向链表具有单向链表的所有特性，因此我们的双向链表类可以继承自前面的单向链表类，不过辅助类 Node 需要添加一个 prev 属性，用来指向前一个节点。

```js
let Node = function(element) {
  this.element = element
  this.next = null
  this.prev = null
}
```

下面是继承自 `LinkedList` 类的双向链表类的基本骨架：

```js
class DoubleLinkedList extends LinkedList {
  constructor() {
    super()
    this.tail = null
  }
}
```

先来看看 `append()`方法的实现。当链表为空时，除了要将 `head` 指向当前添加的节点外，还要将 `tail` 也指向当前要添加的节点。当链表不为空时，直接将 `tail` 的 next 指向当前要添加的节点 `node`，然后修改 `node` 的 `prev` 指向旧的 `tail`，最后修改 `tail` 为新添加的节点。我们不需要从头开始遍历整个链表，而通过 `tail` 可以直接找到链表的尾部，这一点比单向链表的操作要更方便。最后将 length 的值加 1，修改链表的长度。

## 循环链表

<!-- ![](../../../assets/algorithm/linkedList/8.png) -->

循环链表可以像单向链表那样只有单向引用，也可以像双向链表那样有双向引用。循环链表和其他链表的区别在于最后一个元素指向下一个元素的引用不是 `null`，而是指向第一个元素（`head`）。

```js
function CircularLinkedList() {
  var head = null // 链表头
  var length = 0 // 链表长度

  // 辅助类 节点
  var Node = function(element) {
    this.element = element
    this.next = null
    this.prev = null
  }

  // 链表尾添加元素
  this.append = function(element) {
    var node = new Node(element)
    var current = head
    var previous = null

    if (head === null) {
      head = node
    } else {
      while (current.next !== head) {
        //最后一个元素将是head，而不是null

        current = current.next
      }
      current.next = node //建立连接
    }
    node.next = head //首尾相连起来变成一个环列表
    length++
  }

  this.insert = function(position, element) {
    if (position >= 0 && position <= length) {
      var node = new Node(element)
      var current = head
      var previous = null
      var index = 0

      if (position === 0) {
        // 往链表头插入元素
        node.next = current
        while (current.next !== head) {
          current = current.next
        }
        head = node
        current.next = head
      } else {
        while (index < position) {
          previous = current
          current = current.next
          index++
        }

        previous.next = node //先连上添加的节点
        node.next = current

        if (node.next === null) {
          //在最后一个元素更新
          node.next = head
        }
      }

      length++
      return true
    }
    return false
  }

  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      var current = head
      var previous = null
      var index = 0

      if (position === 0) {
        // 列表头移除元素
        while (current.next !== head) {
          current = current.next
        }
        head = head.next
        current.next = head //更新最后一项
      } else {
        while (index < position) {
          previous = current
          current = current.next
          index++
        }
        previous.next = current.next
      }
      length--
      return current.element
    }
    return null
  }

  this.indexOf = function(element) {
    var current = head
    var index = -1

    if (element == current.element) {
      //检查第一项
      return 0
    }
    index++
    while (current.next !== head) {
      //检查列表中间
      if (element == current.element) {
        return index
      }
      current = current.next
      index++
    }
    if (element == current.element) {
      //检查最后一项
      return index
    }
    return -1
  }

  this.remove = function(element) {
    var index = this.indexOf(element)
    return this.removeAt(index)
  }

  this.isEmpty = () => length === 0

  this.size = () => length

  //获取头结点元素
  this.getHead = () => head

  this.toString = function() {
    var current = head
    var s = current.element
    while (current.next !== head) {
      current = current.next
      s += ', ' + current.element
    }
    return s.toString()
  }

  this.print = function() {
    console.log(this.toString())
  }
}
```

## 后记

说到现在一直都是线性表，就是顺序数据结构，他们都是有顺序的，数据都是一条绳子上的蚂蚱。那么，如果数据是没有顺序的呢？那又该使用哪种数据结构呢？这个放到[数据结构——集合](./set)中学习。

参考

- [学习 Javascript 数据结构之链表](https://blog.damonare.cn/2016/11/26/%E5%AD%A6%E4%B9%A0Javascript%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B9%8B%E9%93%BE%E8%A1%A8/)
