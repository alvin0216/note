---
title: HTTP2 服务端推送功能实操
date: 2019-09-25 13:00:28
sidebar: 'auto'
tags:
  - http2
categories:
  - 网络协议
---

## 服务器推送功能解决了什么痛点？

客户端发送请求给服务器，服务器返回请求的资源，通常是 HTML 文件，HTML 文件包含一些资源链接(比如.js, .css 等)。浏览器解析 HTML 文件，获取资源链接，然后分别请求这些资源。

这一机制的问题在于，它迫使用户等待这样一个过程：**直到一个 HTML 文档下载完毕后，浏览器才能发现和获取页面的关键资源。从而延缓了页面渲染，拉长了页面加载时间**。

有了 Server Push，就有了解决上述问题的方案。Server Push 能让服务器在用户没有明确询问下，抢先地“推送”一些网站资源给客户端。只要正确地使用，我们可以根据用户正在访问的页面，给用户发送一些即将被使用的资源。

## 代码实操

- [HTTP/2 Server Push with Node.js](https://blog.risingstack.com/node-js-http-2-push/)

使用内置的 `http2` 模块，我们可以创建一个 `http2` 服务器。有趣的一点在于，当 `index.htm`l 被请求时，我们会主动推送其他资源：`bundle1.js` 和 `bundle2.js`。这样的话，`bundle1.js` 和 `bundle2.js` 可以在浏览器请求它们之前就推送过去了。

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/http2-push.png)

目录

```bash
├── package.json
├── public
│   ├── bundle1.js
│   ├── bundle2.js
│   └── index.html
├── src
│   ├── helper.js
│   └── server.js
└── ssl
    ├── cert.pem
    └── key.pem
```

index.html

```html
<html>
  <body>
    <h1>HTTP2 Push!</h1>
  </body>
  <script src="bundle1.js"></script>
  <script src="bundle2.js"></script>
</html>
```

server.js 主要是 `pushStream`

```js
const http2 = require('http2');
const server = http2.createSecureServer({ cert, key }, requestHandler);

function push(stream, filePath) {
  const { file, headers } = getFile(filePath);
  const pushHeaders = { [HTTP2_HEADER_PATH]: filePath };

  stream.pushStream(pushHeaders, (pushStream) => {
    pushStream.respondWithFD(file, headers);
  });
}

function requestHandler(req, res) {
  // Push files with index.html
  if (reqPath === '/index.html') {
    push(res.stream, 'bundle1.js');
    push(res.stream, 'bundle2.js');
  }

  // Serve file
  res.stream.respondWithFD(file.fileDescriptor, file.headers);
}
```

::: details src

**server.js**

```js
const fs = require('fs');
const path = require('path');
const http2 = require('http2');
const helper = require('./helper');

const { HTTP2_HEADER_PATH } = http2.constants;
const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../public');

const publicFiles = helper.getFiles(PUBLIC_PATH);
const server = http2.createSecureServer(
  {
    cert: fs.readFileSync(path.join(__dirname, '../ssl/cert.pem')),
    key: fs.readFileSync(path.join(__dirname, '../ssl/key.pem')),
  },
  requestHandler
);

// Push file
function push(stream, path) {
  const file = publicFiles.get(path);

  if (!file) {
    return;
  }

  stream.pushStream({ [HTTP2_HEADER_PATH]: path }, (pushStream) => {
    pushStream.respondWithFD(file.fileDescriptor, file.headers);
  });
}

// Request handler
function requestHandler(req, res) {
  const reqPath = req.url === '/' ? '/index.html' : req.url;
  const file = publicFiles.get(reqPath);

  // File not found
  if (!file) {
    res.statusCode = 404;
    res.end();
    return;
  }

  // Push with index.html
  if (reqPath === '/index.html') {
    push(res.stream, '/bundle1.js');
    push(res.stream, '/bundle2.js');
  }

  // Serve file
  res.stream.respondWithFD(file.fileDescriptor, file.headers);
}

server.listen(PORT, (err) => {
  console.log(`Server listening on ${PORT}`);
});
```

**helper**

```js
const fs = require('fs');
const path = require('path');
const mime = require('mime');

function getFiles(baseDir) {
  const files = new Map();

  fs.readdirSync(baseDir).forEach((fileName) => {
    const filePath = path.join(baseDir, fileName);
    const fileDescriptor = fs.openSync(filePath, 'r');
    const stat = fs.fstatSync(fileDescriptor);
    const contentType = mime.lookup(filePath);

    files.set(`/${fileName}`, {
      fileDescriptor,
      headers: {
        'content-length': stat.size,
        'last-modified': stat.mtime.toUTCString(),
        'content-type': contentType,
      },
    });
  });

  return files;
}

module.exports = { getFiles };
```

:::

:::details public

**bandle1**

```js
console.log('Bundle 1');
document.body.innerHTML += '<p>Bundle 1 loaded</p>';
```

**bandle2**

```js
console.log('Bundle 2');
document.body.innerHTML += '<p>Bundle 2 loaded</p>';
```

:::

::: details ssl

**cert.pem**

```js
-----BEGIN CERTIFICATE-----
MIIDtTCCAp2gAwIBAgIJAN9jdYICeY33MA0GCSqGSIb3DQEBBQUAMEUxCzAJBgNV
BAYTAkFVMRMwEQYDVQQIEwpTb21lLVN0YXRlMSEwHwYDVQQKExhJbnRlcm5ldCBX
aWRnaXRzIFB0eSBMdGQwHhcNMTcwODE2MTMyNDA2WhcNMjcwODE0MTMyNDA2WjBF
MQswCQYDVQQGEwJBVTETMBEGA1UECBMKU29tZS1TdGF0ZTEhMB8GA1UEChMYSW50
ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
CgKCAQEA4NGiIEgDf3NdOlpGAROY8ZNPJrhR6gNPTAIZKz314wDUJTF54a8ioeUn
rsKL0Z5H67MmZ5LcsZO9jprrBaSFAIyFdiqQKOSWkXA+LZCEhqaCR0cOIOy0TEKb
MxsABW+6hSoBXk1tK3IQntEcs22qQZll+Y++jUBck+XaCwAmpsk4ofqfLPHcvidj
gHOYkKQg/fFIm81M1NKgdbQpW2/akob56kdh4scZrpwa6MxEylKppTjZ0jfF0cnv
rrs4QTWvoIowfAMrrd/TJV5P8Ei5KcckJe8shlgoEOxtRrAjhIEUmZOT0yho7BcA
C+Zudul0XJhcAPjbHirQ0+G4Agy3FwIDAQABo4GnMIGkMB0GA1UdDgQWBBQqMeql
vTY7xAXbu5YXhnD4lBK1xjB1BgNVHSMEbjBsgBQqMeqlvTY7xAXbu5YXhnD4lBK1
xqFJpEcwRTELMAkGA1UEBhMCQVUxEzARBgNVBAgTClNvbWUtU3RhdGUxITAfBgNV
BAoTGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZIIJAN9jdYICeY33MAwGA1UdEwQF
MAMBAf8wDQYJKoZIhvcNAQEFBQADggEBAEm90w4C0rFqxVVVojAYXrcvLD0E5iwA
3eEn+uD1dMy56he0LZNXlf3s3mZlRYE8+oGvydcMuXrmisVcvIuFQlES2M6y8S2b
CW6xeir4+VKWR97c3p+M48rUfV8YGb2d6YBLNlekAT/S55Bhfy15sYWt+9LIi4i+
ToqywlIfiMcwpBZLD1UTPs7b66Rx7LHmMFXpNfDugp8JHphLJRmXFNgZNNmi0Re0
vDMgUWlgVzV9oMTjp0Ioafbtqcykg0JS+3KsXHWVQPWrw1wsBjje4XJLIIY1+W75
tHBk3PL42xP5vPgRJ/8X22pFXnC/0MK6fKg5VdvwJQDBlYxbpcM3W+g=
-----END CERTIFICATE-----
```

**key.pem**

```js
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA4NGiIEgDf3NdOlpGAROY8ZNPJrhR6gNPTAIZKz314wDUJTF5
4a8ioeUnrsKL0Z5H67MmZ5LcsZO9jprrBaSFAIyFdiqQKOSWkXA+LZCEhqaCR0cO
IOy0TEKbMxsABW+6hSoBXk1tK3IQntEcs22qQZll+Y++jUBck+XaCwAmpsk4ofqf
LPHcvidjgHOYkKQg/fFIm81M1NKgdbQpW2/akob56kdh4scZrpwa6MxEylKppTjZ
0jfF0cnvrrs4QTWvoIowfAMrrd/TJV5P8Ei5KcckJe8shlgoEOxtRrAjhIEUmZOT
0yho7BcAC+Zudul0XJhcAPjbHirQ0+G4Agy3FwIDAQABAoIBAHHi4B04PcVffHel
6VZ8RfsCY5M6xgwklxPq8DMOlTPkZJNex95CqOmYOwz1cnzCkK5et3K6W9/89oZ6
Bdp66AFKLgWZNCPzAC82y9irH+dSDCbtYMPfBMqo5xPxdoZKfhMdH0pVMJtUkgTR
65cdU6UdfyH35lCJrRwi0NzHu8y6qMyH5tOcNOIXwn/LfZ6ZwVx2lKAjthmac2z0
35qknvCNfgadrsl5PLWZBYwy3qx208pUUojMciL9RtfO17F6ofMhueOoChnaHv6h
Lra3NpcuJlYdTTt3tgkTvfMXiZCMsWoV9q1+y9AcSojDJk4V6qiy0Nu8uQmSCRX8
g/2ilqECgYEA/9yejCxaUfgHlA6LkFFMNNkgh3AwHxfIiEBzCDxkUPlu0J1z+65S
UJLGLIgQoZN0UmN6a0YHHDxh0oxIvxoq+wc4PPIr9mmSsEt6YTUjYbYNIJ/5978b
CH+41VGCszqzd0NSJTW7aKL3XFE34kDascgTiDd82KmqaC5chShCoZECgYEA4PC4
qoNnAzILI9yM9hJcolrW9hf4pUXqG9orO7pr5/ETDVi74pNdKkb7MKE1snjTQBdu
rV5q09wu9+Owa5AoHLkvTify+EXlUrc4UeVxEdlOfoc/laONZkGaENxn4DTH4rMj
6nlzMNPcR0Hxud/UqLpWiI20I+dJwVzBA3z3eicCgYEAqNb+LQPLqlGhNpuOj3KG
dk1dwOJQbwQzyW22OxYXILQo4zMz6T50hUUFzzcOuoDifse0bfutD33tE5KNIsZy
3Go8O0OXrSinqvxzypfVPFJ1QTUwL8OFZEtcPjBmrj0rVqUvHOzjOb5ouxvBY+Vm
K3EbKoVrNlJn6A3H8frKVXECgYEAsnQnfRdcbTuRfPTnW/07Qo6gxYJFABGUZl5S
OENwggVOoSMJg/p3Sigf9fefWyTiK5Gre51RURz4oi8f8mXefNMpxW6KIw+InHPB
Ga/WYVuuG1F/T17+ueZHrSK+wi/9eEu4rbeGfHFH67xUYqtB0k5qglExXd6LM/07
H2JQD7cCgYAeU4FtW0VZdEtUkBLJhHHZ0l/UBtN/XhkpFjdrG9uJryX/2rnA8Zoh
vKhSG5iWdTDak4R2dt9yJrTr1sriI5P176t76eAR4jg0F3xeRpiaDDk7wdznwh9F
OKOJlLEHd9G2gryXAtUU4KPii3/Awgj/Kd37j7fssuMTQLB9bWIygQ==
-----END RSA PRIVATE KEY-----
```

:::

Node.js 8.4.0 已经开始支持 HTTP/2，执行 node 命令时，加上 `--expose-http2` 选项就可以使用了。
