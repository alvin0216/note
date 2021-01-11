const exec = require('child_process').exec
const dateFormatter = require('./.vuepress/utils/dateFormatter')
const chalk = require('chalk')

function execute(cmd) {
  exec(cmd, function(error, stdout, stderr) {
    if (error) {
      console.error(error)
    } else {
      console.log(chalk.green('SUCCESS PUSH:'), dateFormatter())
    }
  })
}

execute(
  `
    git add .vuepress blogs
    git commit -m 'updated at ${dateFormatter()}'
    git push
  `
)
