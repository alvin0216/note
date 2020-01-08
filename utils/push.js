const exec = require('child_process').exec
const getDate = require('./getDate')

function execute(cmd) {
  exec(cmd, function(error, stdout, stderr) {
    if (error) {
      console.error(error)
    } else {
      console.log('success')
    }
  })
}

execute(
  `
    git add .
    git commit -m 'update at ${getDate()}'
    git push
  `
)
