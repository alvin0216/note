const fs = require('fs')
const getDate = require('./getDate')

// console.log('date:', getDate())
const prefix = `---
title: pageTitle
date: ${getDate()}
---
`

fs.writeFileSync('docs/newPage.md', prefix)
