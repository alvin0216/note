---
title: vdom 的 diff 入门实现
date: 2020-07-22 10:26:34
---

## 关于 diff

> `diff` 就是比较两个 `vdom-tree` 的差异，以达到更新只需要更新的 dom 节点的目的，（dom 操作耗费的性能较大）。

`diff` 算法大概就是当状态发生改变的时候，重新构造一个新的 `Virtual DOM`，然后根据与老的 `Virtual DOM` 对比，生成 `patches` 补丁，打到对应的需要修改的地方。

```js
// 挂载
let el = render(virtualDom)
renderDom(el, document.getElementById('root'))

let patches = diff(virtualDom, virtualDom2) // 找出差异化的补丁对象
patch(el, patches) // 打补丁 --> 更新 dom
```

## diff 是如何比较的

最开始经典的<span class='orange'>深度优先遍历 DFS 算法</span>，其复杂度为 `O(n^3)`，存在高昂的 `diff` 成本，这意味着 1000 个节点就要进行数 10 亿次的比较，这是非常消耗性能的。react 大胆的将 diff 的复杂度从 O(n^3)降到了 O(n)，

| 深度优先遍历的方式                                                     | 广度优先遍历的方式                                                       | DFS & BFS                                  |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------ |
| ![](https://gitee.com/alvin0216/cdn/raw/master/img/react/dfs-diff.png) | ![](https://gitee.com/alvin0216/cdn/raw/master/img/react/react-diff.png) | ![](../../../assets/algorithm/graph/7.png) |

react 采用了同级的比较:

![](https://gitee.com/alvin0216/cdn/raw/master/img/react/vdom-diff.png)

当我们拿到 patches 对象后，遍历方式去更新 dom 仍然是

![](https://gitee.com/alvin0216/cdn/raw/master/img/react/update-dom.png)

## 比较规则

本文的实现。。

- 新的 DOM 节点不存在: `{type: 'REMOVE', index}`
- 文本的变化: `{type: 'TEXT', text: 1}`
- 当节点类型相同时，去看一下属性是否相同，产生一个属性的补丁包 `{type: 'ATTR', attr: {class: 'list-group'}}`
- 节点类型不相同，直接采用替换模式: `{type: 'REPLACE', newNode}`

## vdom diff 的简单实现

```bash
├── contants.js # 常量
├── diff.js     # diff 核心
├── element.js  # 渲染、更新 dom
├── index.js    # 入口
└── patch.js    # 通过 diff 保存的补丁，进行打补丁
```

`contants.js`

```js
export const REMOVE = Symbol.for('REMOVE') // 删除节点
export const REPLACE = Symbol.for('REPLACE') // 替换节点

export const TEXT = Symbol.for('TEXT') // 更新文本
export const ATTR = Symbol.for('ATTR') // 更新属性
```

### index.js

```js
import { createElement, render, renderDom } from './element'
import diff from './diff'
import patch from './patch'

let virtualDom = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item' }, ['A']),
  createElement('li', { class: 'item' }, ['B']),
  createElement('li', { class: 'item' }, ['C'])
])

let virtualDom2 = createElement('ul', { class: 'list-group' }, [
  createElement('li', { class: 'item' }, ['A changed']),
  createElement('li', { class: 'item' }, ['B']),
  createElement('p', { class: 'page' }, [
    createElement('a', { class: 'link', href: 'https://blog.alvin.run' }, ['C replaced'])
  ]),
  createElement('li', { class: 'item' }, ['这个是新增的节点'])
])

let el = render(virtualDom)
renderDom(el, document.getElementById('root'))

let patches = diff(virtualDom, virtualDom2)
console.log(patches)

// 给元素打补丁，重新更新视图
patch(el, patches)

// 遗留问题
// 如果平级互换，会导致重新渲染
// 新增节点 不生效
// index
```

### element.js

```js
class Element {
  constructor(type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
}

function createElement(type, props, children) {
  return new Element(type, props, children)
}

// 设置属性
function setAttr(dom, key, value) {
  switch (key) {
    case 'value': // dom是一个input或者textarea
      if (dom.tagName.toUpperCase() === 'INPUT' || dom.tagName.toUpperCase() === 'TEXTAREA') {
        dom.value = value
      } else {
        dom.setAttribute(key, value)
      }
      break
    case 'style':
      dom.style.cssText = value
      break
    default:
      dom.setAttribute(key, value)
      break
  }
}

function render(vdom) {
  let dom = document.createElement(vdom.type)
  for (const key in vdom.props) {
    setAttr(dom, key, vdom.props[key])
  }
  vdom.children.forEach(child => {
    child = child instanceof Element ? render(child) : document.createTextNode(child)
    dom.appendChild(child)
  })

  return dom
}

function renderDom(dom, container) {
  container.appendChild(dom)
}

export { Element, createElement, setAttr, render, renderDom }
```

### diff.js ✨

```js
import { REMOVE, REPLACE, TEXT, ATTR } from './contants'

function diff(oldTree, newTree) {
  // 声明变量 patches 用来存放补丁的对象
  let patches = {}

  // 第一次比较应该是树的第0个索引
  let index = 0

  // 递归树，将比较后的结果放在补丁 patches 内
  dfsWalk(oldTree, newTree, index, patches)

  return patches
}

function dfsWalk(oldNode, newNode, index, patches) {
  // 每个元素都有一个补丁
  let currentPatches = []

  switch (true) {
    case !newNode:
      currentPatches.push({ type: REMOVE, index })
      break

    case isString(oldNode) && isString(newNode): // 判断文本是否一致
      if (oldNode !== newNode) {
        currentPatches.push({ type: TEXT, text: newNode })
      }
      break

    case oldNode.type === newNode.type:
      // 比较属性是否有更改
      let attr = diffAttr(oldNode.props, newNode.props)

      if (Object.keys(attr).length > 0) {
        currentPatches.push({ type: ATTR, attr })
      }

      // 如果有子节点，遍历子节点
      diffChildren(oldNode.children, newNode.children, patches)
      break

    // 说明节点被替换了
    default:
      currentPatches.push({ type: REPLACE, newNode })
      break
  }

  // 当前元素确实有补丁
  if (currentPatches.length) {
    // 将元素和补丁对应起来，放到大补丁包中
    patches[index] = currentPatches
  }
}

function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]'
}

function diffAttr(oldAttrs, newAttrs) {
  let patch = {}
  // 判断老的属性中和新的属性的关系
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key] // 有可能还是undefined
    }
  }

  for (let key in newAttrs) {
    // 老节点没有新节点的属性
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key]
    }
  }
  return patch
}

// 所有都基于一个序号来实现
let mountIndex = 0

function diffChildren(oldChildren, newChildren, patches) {
  // 比较老的第一个和新的第一个
  oldChildren.forEach((child, index) => {
    dfsWalk(child, newChildren[index], ++mountIndex, patches)
  })
}

export default diff
```

### patch.js ✨

```js
import { REMOVE, REPLACE, TEXT, ATTR } from './contants'
import { Element, render, setAttr } from './element'

let allPatches
let index = 0 // 默认哪个需要打补丁

function patch(node, patches) {
  allPatches = patches

  dfsWalk(node)
}

function dfsWalk(node) {
  let current = allPatches[index++]
  let childNodes = node.childNodes

  // 先序深度，继续遍历递归子节点
  childNodes.forEach(child => dfsWalk(child))

  if (current) {
    doPatch(node, current) // 打上补丁
  }
}

function doPatch(node, patches) {
  // 遍历所有打过的补丁
  patches.forEach(patch => {
    switch (patch.type) {
      case ATTR:
        for (let key in patch.attr) {
          let value = patch.attr[key]
          if (value) {
            setAttr(node, key, value)
          } else {
            node.removeAttribute(key)
          }
        }
        break
      case TEXT:
        node.textContent = patch.text
        break
      case REPLACE:
        let newNode = patch.newNode
        newNode = newNode instanceof Element ? render(newNode) : document.createTextNode(newNode)
        node.parentNode.replaceChild(newNode, node)
        break
      case REMOVE:
        node.parentNode.removeChild(node)
        break
      default:
        break
    }
  })
}

export default patch
```

---

- [源码地址](https://github.com/alvin0216/alvin-code-store/tree/master/vdom-diff)
- [React 源码分析与实现(三)：实操 DOM Diff](https://www.jianshu.com/p/7b580d2e51d5)
- [让虚拟 DOM 和 DOM-diff 不再成为你的绊脚石](https://juejin.im/post/5c8e5e4951882545c109ae9c)
- [simple-virtual-dom](https://github.com/livoras/simple-virtual-dom)
