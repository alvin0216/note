---
title: Babel 简易分析
date: 2020-08-04 01:04:00
---

- [AST Explorer](https://astexplorer.net/)：实时编辑看 `AST`，还带高亮
- [Javascript 可视化分词](https://resources.jointjs.com/demos/javascript-ast)

## Babel 都有哪些库

| 名称                                    | 描述                                                                                                                                                                          | 应用                                                                                                                  |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `Babylon` -> `@babel/parser`            | Babel 的解析器。最初是从 Acorn 项目 fork 出来的。Acorn 非常快，易于使用，并且针对非标准特性(以及那些未来的标准特性) 设计了一个基于插件的架构。                                | 可以用于接受一段代码，生成一段 Babel AST 格式的 AST                                                                   |
| `Babel-traverse` -> `@babel/traverse`   | 负责维护整棵树的状态，并且负责替换、移除和添加节点                                                                                                                            | 接受一段 AST，然后会遍历该 AST，并且提供了许多钩子来协助我们在遍历到某种 AST 节点类型时进行处理，如 callExpression 等 |
| `Babel-types` -> `@babel/types`         | 一个用于 AST 节点的 Lodash 式工具库， 它包含了构造、验证以及变换 AST 节点的方法。该工具库包含考虑周到的工具方法，对编写处理 AST 逻辑非常有用。                                | 这个库提供了 babel AST 所有的节点类型，用户可以使用这个库构造出一个新的 AST 节点，或者判断某个节点是什么类型等        |
| `Babel-generator` -> `@babel/generator` | Babel 的代码生成器，它读取 AST 并将其转换为代码和源码映射（sourcemaps）。                                                                                                     | 接受一段 AST ，返回一段代码                                                                                           |
| `Babel-template` -> `@babel/template`   | 另一个虽然很小但却非常有用的模块。它能让你编写字符串形式且带有占位符的代码来代替手动编码， 尤其是生成大规模 AST 的时候。在计算机科学中，这种能力被称为准引用（quasiquotes）。 | 将一些变量注入到模版代码中，然后获得注入后代码的 AST                                                                  |

## Babel 工作流程

<span class='pink'>步骤一：解析</span>

使用 `@babel/parser` 解析器进行语法解析，获得 `AST`

<span class='pink'>步骤二：转换</span>

使用 `@babel/traverse` 对 `AST` 进行深度遍历，处理各种 `AST` 节点

遍历过程中，能对每一种节点进行处理，这里可以使用到 `@babel/types` 对节点进行增删查改，或者也可以使用 `@babel/template` 来生成大量 AST 进行修改

<span class='pink'>步骤三：生成</span>

使用 `@babel/generator` 将处理后的 `AST` 转换回正常代码

一句话描述：`input string` -> `@babel/parser parser` -> `AST` -> `@babel/traverse transformer[s]` -> `AST` -> `@babel/generator` -> `output string`
这一点也可以在后文的 简易的 `babel` 代码解析 中看见

### Visitor

当 `Babel` 处理一个节点时，是以访问者的形式获取节点信息，并进行相关操作，这种方式是通过一个 `visitor` 对象来完成的，在 `visitor` 对象中定义了对于各种节点的访问函数，这样就可以针对不同的节点做出不同的处理。我们编写的 `Babel` 插件其实也是通过定义一个实例化 `visitor` 对象处理一系列的 AST 节点来完成我们对代码的修改操作。举个栗子：

我们想要处理代码中用来加载模块的 `import` 命令语句

```js
import { Ajax } from '../lib/utils'
```

那么我们的 `Babel` 插件就需要定义这样的一个 `visitor` 对象：

```yml
visitor: {
    Program: {
        enter(path, state) {
            console.log('start processing this module...');
        },
        exit(path, state) {
            console.log('end processing this module!');
        }
    },
    ImportDeclaration (path, state) {
    	console.log('processing ImportDeclaration...');
    	// do something
    }
}
```

当把这个插件用于遍历中时，每当处理到一个 import 语句，即 ImportDeclaration 节点时，都会自动调用 ImportDeclaration()方法，这个方法中定义了处理 import 语句的具体操作。ImportDeclaration()都是在进入 ImportDeclaration 节点时调用的，我们也可以让插件在退出节点时调用方法进行处理。

```yml
visitor: {
  ImportDeclaration: {
      enter(path, state) {
          console.log('start processing ImportDeclaration...');
          // do something
      },
      exit(path, state) {
          console.log('end processing ImportDeclaration!');
          // do something
      }
  },
}
```

当进入 ImportDeclaration 节点时调用 enter()方法，退出 ImportDeclaration 节点时调用 exit()方法。上面的 Program 节点（Program 节点可以通俗地解释为一个模块节点）也是一样的道理。值得注意的是，AST 的遍历采用深度优先遍历，所以上述 import 代码块的 AST 遍历的过程如下：

```js
─ Program.enter()
  ─ ImportDeclaration.enter()
  ─ ImportDeclaration.exit()
─ Program.exit()
```

所以当创建访问者时你实际上有两次机会来访问一个节点。

### Path

从上面的 visitor 对象中，可以看到每次访问节点方法时，都会传入一个 path 参数，这个 path 参数中包含了节点的信息以及节点和所在的位置，以供对特定节点进行操作。

具体来说 Path 是表示两个节点之间连接的对象。这个对象不仅包含了当前节点的信息，也有当前节点的父节点的信息，同时也包含了添加、更新、移动和删除节点有关的其他很多方法。具体地，Path 对象包含的属性和方法主要如下：

```js
── 属性
  - node   当前节点
  - parent  父节点
  - parentPath 父path
  - scope   作用域
  - context  上下文
  - ...
── 方法
  - get   当前节点
  - findParent  向父节点搜寻节点
  - getSibling 获取兄弟节点
  - replaceWith  用AST节点替换该节点
  - replaceWithMultiple 用多个AST节点替换该节点
  - insertBefore  在节点前插入节点
  - insertAfter 在节点后插入节点
  - remove   删除节点
  - ...
```

具体可以看 [babel-traverse](https://github.com/babel/babel/tree/master/packages/babel-traverse/src/path)

这里我们继续上面的例子，看看 path 参数的 node 属性包含哪些信息：

```js
visitor: {
	ImportDeclaration (path, state) {
	   console.log(path.node);
	   // do something
	}
}
```

打印结果如下：

```js
Node {
  type: 'ImportDeclaration',
  start: 5,
  end: 41,
  loc:
   SourceLocation {
     start: Position { line: 2, column: 4 },
     end: Position { line: 2, column: 40 } },
  specifiers:
   [ Node {
       type: 'ImportSpecifier',
       start: 14,
       end: 18,
       loc: [SourceLocation],
       imported: [Node],
       local: [Node] } ],
  source:
   Node {
     type: 'StringLiteral',
     start: 26,
     end: 40,
     loc: SourceLocation { start: [Position], end: [Position] },
     extra: { rawValue: '../lib/utils', raw: '\'../lib/utils\'' },
     value: '../lib/utils'
    }
}
```

可以发现除了 type、start、end、loc 这些常规字段，ImportDeclaration 节点还有 specifiers 和 source 这两个特殊字段，specifiers 表示 import 导入的变量组成的节点数组，source 表示导出模块的来源节点。

这里再说一下 specifier 中的 imported 和 local 字段，imported 表示从导出模块导出的变量，local 表示导入后当前模块的变量，还是有点费解，我们把 import 命令语句修改一下：

```js
import { Ajax as ajax } from '../lib/utils'
```

然后继续打印 specifiers 第一个元素的 local 和 imported 字段：

```js
Node {
  type: 'Identifier',
  start: 22,
  end: 26,
  loc:
   SourceLocation {
     start: Position { line: 2, column: 21 },
     end: Position { line: 2, column: 25 },
     identifierName: 'ajax' },
  name: 'ajax' }
Node {
  type: 'Identifier',
  start: 14,
  end: 18,
  loc:
   SourceLocation {
     start: Position { line: 2, column: 13 },
     end: Position { line: 2, column: 17 },
     identifierName: 'Ajax' },
  name: 'Ajax' }
```

这样就很明显了。如果不使用 as 关键字，那么 imported 和 local 就是表示同一个变量的节点了。

### State

State 是 visitor 对象中每次访问节点方法时传入的第二个参数。如果看 Babel 手册里的解释，可能还是有点困惑，简单来说，state 就是一系列状态的集合，包含诸如当前 plugin 的信息、plugin 传入的配置参数信息，甚至当前节点的 path 信息也能获取到，当然也可以把 babel 插件处理过程中的自定义状态存储到 state 对象中。

### Scopes（作用域）

这里的作用域其实跟 js 说的作用域是一个道理，也就是说 babel 在处理 AST 时也需要考虑作用域的问题，比如函数内外的同名变量需要区分开来，这里直接拿 Babel 手册里的一个例子解释一下。考虑下列代码：

```js
function square(n) {
  return n * n
}
```

我们来写一个把 n 重命名为 x 的 visitor。

```js
visitor: {
  FunctionDeclaration(path) {
    const param = path.node.params[0];
    paramName = param.name;
    param.name = "x";
  },

  Identifier(path) {
    if (path.node.name === paramName) {
      path.node.name = "x";
    }
 }
}
```

对上面的例子代码这段访问者代码也许能工作，但它很容易被打破：

```js
function square(n) {
  return n * n
}
var n = 1
```

上面的 visitor 会把函数 square 外的 n 变量替换成 x，这显然不是我们期望的。更好的处理方式是使用递归，把一个访问者放进另外一个访问者里面。

```js
visitor: {
  FunctionDeclaration(path) {
    const updateParamNameVisitor = {
        Identifier(path) {
          if (path.node.name === this.paramName) {
            path.node.name = "x";
          }
        }
      };
    const param = path.node.params[0];
    paramName = param.name;
    param.name = "x";
    path.traverse(updateParamNameVisitor, { paramName });
  },
}

```

---

- [理解 Babel 插件](https://developer.aliyun.com/article/62671)
- [Babel 插件开发&测试与简易源码分析](https://mp.weixin.qq.com/s/NuSupcY3Dbfku3dK-lo2FQ)
- [深入 Babel，这一篇就够了](https://juejin.im/post/6844903746804137991)
