const exec = require('child_process').exec
const getDate = require('./getDate')

function execute(cmd) {
  exec(cmd, function(error, stdout, stderr) {
    if (error) {
      console.error(error)
    } else {
      console.log('SUCCESS PUSH:', getDate())
    }
  })
}

execute(
  `
    git add docs
    git commit -m 'updated at ${getDate()}'
    git push
  `
)
