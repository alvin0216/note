---
title: 链表
date: 2020-05-10 15:16:26
---

链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由一个存储元素本事的节点和一个指向下一个元素的引用组成。相对于传统的数组，链表的一个好处在于，添加或者删除元素的时候不需要移动其他元素。然而，链表需要使用指针，因此实现链表时需要额外注意。

![](../../../assets/algorithm/linkedList/1.png)

## 链表的操作

| 方法                      | 说明                   |
| ------------------------- | ---------------------- |
| insert(position, element) | 插入元素               |
| append(element)           | 尾部添加元素           |
| indexOf(element)          | 获取元素索引           |
| remove(element)           | 从链表移除一项         |
| removeAt(position)        | 从链表特定位置移除一项 |
| size                      | 返回链表的长度         |
| toString                  | 返回                   |
| print                     | 打印链表数据           |

![](../../../assets/algorithm/linkedList/2.png)

## 单项链表的实现

### append

![](../../../assets/algorithm/linkedList/3.png)

### insert

![](../../../assets/algorithm/linkedList/4.png)

### removeAt

![](../../../assets/algorithm/linkedList/5.png)

### indexOf

![](../../../assets/algorithm/linkedList/6.png)

### 代码实现

```js {12,27,55,78,91}
function LinkedList() {
  var head = null // 链表头
  var length = 0 // 链表长度

  // 辅助类 节点
  var Node = function(element) {
    this.element = element
    this.next = null
  }

  // 链表尾添加元素
  this.append = function(element) {
    var node = new Node(element)
    if (head === null) {
      head = node
    } else {
      var current = head
      while (current.next) {
        // 循环 找到链表尾节点
        current = current.next
      }
      current.next = node
    }
    length++
  }

  this.insert = function(position, element) {
    if (position > -1 && position <= length) {
      var node = new Node(element)

      if (position === 0) {
        // 往链表头插入元素
        var current = head
        head = node
        head.next = current
      } else {
        var index = 0
        var previous = null
        var current = head
        while (index < position) {
          previous = current
          current = current.next
          index++
        }
        previous.next = node
        node.next = current
      }

      length++
      return true
    }
    return false
  }

  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      if (position === 0) {
        // 列表头移除元素
        var current = head
        head = current.next
      } else {
        var index = 0
        var previous = null
        var current = head
        while (index < position) {
          previous = current
          current = current.next
          index++
        }
        previous.next = current.next // current 就是被移除的元素
      }
      length--
      return current.element
    }
    return null
  }

  this.indexOf = function(element) {
    var index = 0
    var current = head
    while (current) {
      if (current.element === element) {
        return index
      }
      current = current.next
      index++
    }
    return -1
  }

  this.remove = function(element) {
    var index = this.indexOf(element)
    return this.removeAt(index)
  }

  this.isEmpty = () => length === 0

  this.size = () => length

  this.toString = function() {
    var current = head,
      string = ''

    while (current) {
      string += current.element
      current = current.next
    }
    return string
  }

  //获取头结点元素
  this.getHead = function() {
    return head.element
  }
}

var l = new LinkedList()

l.append(1) // ...
```

## 双向链表

![](../../../assets/algorithm/linkedList/7.png)

双向循环链表：将双向链表的头尾指针相连，就构成了双向循环链表。这种链表从任意一个节点都可以同时向两个方向进行节点遍历。

```js
function DoublyLinkedList() {
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
      while (current) {
        previous = current
        current = current.next
      }
      previous.next = node
      node.prev = previous
    }
    length++
  }

  /**
   * position === 0
   *  head === null [head = node]
   *  head !== null [head.prev = node, node.next = head] >>> finally = node
   *
   * position !== 0
   *  找到插入节点 previous node current >>> [previous.next = node, node.prev = previous, node.next = current, current.prev = node]
   */
  this.insert = function(position, element) {
    if (position > -1 && position <= length) {
      var node = new Node(element)

      if (position === 0) {
        // 往链表头插入元素
        if (!head) {
          head = node
        } else {
          node.next = head
          head.prev = node
          head = node
        }
      } else {
        var index = 0
        var previous = null
        var current = head
        while (index < position) {
          previous = current
          current = current.next
          index++
        }

        previous.next = node //先连上添加的节点
        node.prev = previous //再断开之前的连接

        node.next = current
        current.prev = node
        // now previous <<node>> current
      }

      length++
      return true
    }
    return false
  }

  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      if (position === 0) {
        // 列表头移除元素
        var current = head
        head = current.next
        head.prev = null
      } else {
        var index = 0
        var previous = null
        var current = head
        while (index < position) {
          previous = current
          current = current.next
          index++
        }
        if (position === length - 1) {
          // 移除最后一项
          previous.next = null
        } else {
          previous.next = current.next
          current.next.prev = previous
        }
      }
      length--
      return current.element
    }
    return null
  }

  this.indexOf = function(element) {
    var index = 0
    var current = head
    while (current) {
      if (current.element === element) {
        return index
      }
      current = current.next
      index++
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

  //获取未结点元素
  this.getTail = function() {
    var previous,
      current = head
    while (current) {
      previous = current
      current = current.next
    }
    return previous
  }
}

var l = new DoubleLinkedList()

l.append(1)
l.append(2)
l.append(3)
l.insert(0, 4)
l.insert(2, 5)
```

## 循环链表

![](../../../assets/algorithm/linkedList/8.png)

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
