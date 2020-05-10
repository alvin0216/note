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

 
![](../../../assets/algorithm/linkedList/2.png)

## 链表的实现

### append

![](../../../assets/algorithm/linkedList/3.png)