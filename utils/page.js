const program = require('commander')
const inquirer = require('inquirer') // 命令行交互
const fs = require('fs')
const path = require('path')
const chalk = require('chalk') // console.log color
const getDate = require('./getDate')

// 查询目录
const list = fs.readdirSync('./docs') // 读取文件目录，里面还包含了文件
const folderList = list.filter(f => /^[a-zA-Z]+$/.test(f)) // 过滤出纯目录

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
