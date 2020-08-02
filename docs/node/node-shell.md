---
title: 用 node 写命令行脚本
date: 2020-01-09 09:50:33
---

用来方便使用，免去繁琐的创建过程，所以写了个脚本工具，记录下来。

需求：执行 `node` 文件，在控制台输入 文章标题、文章分类、以及文件名后自动创建 `MD` 文件。实现的功能如下：

![](https://gitee.com/alvin0216/cdn/raw/master/img/node/node-shell.gif)

创建的内容如下：

```md
---
title: node
date: 2020-01-09 10:09:38
---
```

路径则是 `xxx/docs/node/node.md`

## 前置知识

- [commander](https://github.com/tj/commander.js): 解析用户命令行输入
- [inquirer](https://github.com/SBoudrias/Inquirer.js): 常见的交互式命令行用户界面的集合
- [chalk](https://github.com/chalk/chalk): 美化命令行，进行着色

### commander

[commander](https://github.com/tj/commander.js)灵感来自 `Ruby`，它提供了用户命令行输入和参数解析的强大功能，可以帮助我们简化命令行开发。
根据其官方的描述，具有以下特性:

- 参数解析
- 强制多态
- 可变参数
- Git 风格的子命令
- 自动化帮助信息
- 自定义帮助等

**example**

```js
const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
program
  .command('module')
  .alias('m')
  .description('输入名称')
  .option('-n, --name [moduleName]', '模块名称')
  .action(option => {
    console.log('Hello World', option.name)
  })

program.parse(process.argv)
```

```js
$ node app m -n guosw // 输出：Hello World guosw
```

**commander API**

- `command` – 定义命令行指令，后面可跟上一个 `name`，用空格隔开，如 `.command( ‘app [name] ‘)`
- `alias` – 定义一个更短的命令行指令 ，如执行命令`\$ app m` 与之是等价的
- `description` – 描述，它会在 `help` 里面展示
- `option` – 定义参数。它接受四个参数，在第一个参数中，它可输入短名字 -a 和长名字–app ,使用 | 或者,分隔，在命令行里使用时，这两个是等价的，区别是后者可以在程序里通过回调获取到；第二个为描述, 会在 `help` 信息里展示出来；第三个参数为回调函数，他接收的参数为一个`string`，有时候我们需要一个命令行创建多个模块，就需要一个回调来处理；第四个参数为默认值
- `action` – 注册一个 callback 函数,这里需注意目前回调不支持 let 声明变量
- `parse` – 解析命令行

### inquirer

在开发的过程中，我们需要频繁的跟命令行进行交互，借助 `inquirer` 这个模块就能轻松实现，它提供了用户界面和查询会话流程。它的语法是这样的（直接从[官方](https://github.com/SBoudrias/Inquirer.js)拷贝~~）

```js
var inquirer = require('inquirer')
inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then(function(answers) {
    // Use user feedback for... whatever!!
  })
```

**inquirer 功能简介**

- `input` – 输入
- `validate` – 验证
- `list` – 列表选项
- `confirm` – 提示
- `checkbox` – 复选框等等

**example**

```js
inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: '请输入文章标题',
      validate: function(input) {
        return !input ? '标题不能为空' : true
      }
    }
  ])
  .then(answers => {
    console.log(answers) // { title: 'xxxx' }
  })
```

## 代码

```js
const program = require('commander')
const inquirer = require('inquirer') // 命令行交互
const fs = require('fs')
const path = require('path')
const chalk = require('chalk') // console.log color
const getDate = require('./getDate')

// 查询目录
const list = fs.readdirSync('./docs') // 读取文件目录，里面还包含了文件
const folderList = list.filter(pathname => {
  const filePath = path.resolve(__dirname, `../docs/${pathname}`)
  return pathname !== '.vuepress' && fs.statSync(filePath).isDirectory()
})

program
  .command('page')
  .alias('p')
  .description('脚本命令')
  .option('-a, --name [moduleName]', '模块名称')
  .action(async option => {
    const result = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: '请输入文章标题',
        validate: function(input) {
          return !input ? '标题不能为空' : true
        }
      },
      {
        type: 'list',
        name: 'tag',
        message: '请选择分类',
        choices: folderList
      },
      {
        type: 'input',
        name: 'filename',
        message: '请输入文件名',
        validate: function(input) {
          return !input ? '文件名不能为空' : true
        }
      }
    ])

    // 创建文件
    const { title, tag, filename } = result
    const filePath = path.resolve(__dirname, `../docs/${tag}/${filename}.md`)
    const prefix = '---\n' + `title: ${title}\n` + `date: ${getDate()}\n` + '---\n'
    fs.writeFileSync(filePath, prefix)
    console.log(chalk.green('create page success: '), filePath)
  })

program.parse(process.argv)
```

命令行 `node xx.js page` 或者 `node xx.js p` 即可触发上面的命令

## 参考

[跟着老司机玩转 Node 命令行](https://aotu.io/notes/2016/08/09/command-line-development/index.html)
