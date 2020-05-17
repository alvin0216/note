---
title: 利用 github webhooks 实现自动化部署
date: 2020-01-05 15:37:52
---

> [Webhooks](https://developer.github.com/webhooks/) allow you to build or set up integrations which subscribe to certain events on GitHub.com.

通过 `webhooks` 可以订阅 `github` 项目中的各个事件，如 `push/issue` 等

以 `node` 作为脚本为例，借助 [github-webhook-handler](https://github.com/rvagg/github-webhook-handler) 这个库来实现监听以及进行某些操作。

## 搭建 Node 服务器

```bash
mkdir webhook-demo && cd webhook-demo

yarn init -y

yarn add github-webhook-handler

touch deploy.js
```

其代码为

```js
const http = require('http')
const createHandler = require('github-webhook-handler')
const handler = createHandler({ path: '/webhook', secret: 'myhashsecret' })
// path secret 保持和 GitHub Webhooks 后台设置的一致

http
  .createServer(function(req, res) {
    handler(req, res, function(err) {
      res.statusCode = 404
      res.end('no such location')
    })
  })
  .listen(6001)

handler.on('error', function(err) {
  console.error('Error:', err.message)
})

handler.on('push', function(event) {
  console.log('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref)
})

handler.on('issues', function(event) {
  console.log(
    'Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title
  )
})
```

在服务器上跑起来！

## 设置 webhooks

进入 `github` 的某个项目，`Settings` => `Webhooks` => `Add webhook`

创建 `Webhooks`，在 `Webhooks` 的页面我们可以看到一段简短的介绍：

> Webhooks allow external services to be notified when certain events happen. When the specified events happen, we’ll send a POST request to each of the URLs you provide.

有三个选项让你填写

- `Payload URL`: 填写服务器地址 如 `http://120.79.10.11:6001/webhook` （端口和 `path` 上面设置的一致）
- `Content type`: 勾选 `application/json`
- `Secert`: `myhashsecret`

以及有勾选是否只发送 `push` 事件等等

新建好之后，我们可以尝试 `push` 一下。

接着就可以看到在服务器跑起来的服务就输出

```bash
Received a push event for 项目名 to refs/heads/master
```

这时成功实现了对 `github push` 事件的监听。监听后我们需要进行特定的操作。

## 添加 shell 脚本

新建 `deploy.sh`

```bash
# deploy.sh
#! /bin/bash
# 确保脚本抛出遇到的错误
set -e

cd /work/note # cd 到项目地址

git pull

yarn

yarn build
```

有了脚本后在修改 `deploy.js` 文件

```js
const http = require('http')
const { spawn } = require('child_process')

const createHandler = require('github-webhook-handler')
const handler = createHandler({ path: '/webhook', secret: 'myhashsecret' })

http
  .createServer(function(req, res) {
    handler(req, res, function(err) {
      res.statusCode = 404
      res.end('no such location')
    })
  })
  .listen(6001)

handler.on('error', function(err) {
  console.error('Error:', err.message)
})

function runCommand(cmd, args, callback) {
  let response = ''
  const child = spawn(cmd, args)
  child.stdout.on('data', buffer => {
    response += buffer.toString()
  })
  child.stdout.on('end', () => callback(response))
}

handler.on('push', function(event) {
  console.log('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref)

  // push请求且为master执行shell脚本
  event.payload.ref === 'refs/heads/master' && runCommand('sh', ['./deploy.sh'], console.log)
})
```

大功告成！
