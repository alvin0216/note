---
title: cookie 概述
---

我们知道 `HTTP` 的无状态，这既是优点也是缺点。优点是服务器没有状态差异，可以很容易地组成集群，而缺点就是无法支持需要记录状态的事务操作。

无状态，也就是每次 HTTP 请求服务端和客户端都不知道数据是哪来的，而 `cookie` 服务器拥有“记忆能力”。

## Cookie

> `HTTP Cookie` 是服务器发送到用户浏览器并保存在本地的一小块数据

![](https://gitee.com/alvin0216/cdn/raw/master/img/http/series/cookie.png)

第一次访问网站的时候，浏览器发出请求，服务器响应请求后，会将 `cookie` 放入到响应请求中，在浏览器第二次发请求的时候，会把 `cookie` 带过去，服务端会辨别用户身份，当然服务器也可以修改 `cookie` 内容

代码：

```js {8,13}
const http = require('http')

http
  .createServer(function (request, response) {
    if (request.url === '/') {
      response.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8',
        'Set-Cookie': 'id=123'
      })
      response.end(`
        <h2>Cookie</h2>
        <script>
          console.log(document.cookie)
        </script>
      `)
    }
  })
  .listen(3300)

console.log('http://127.0.0.1:3300')
```

可以看到请求的

- response headers 带上了 `Set-Cookie: id=123`
- console: `id=123`

如果你要设置多个 Cookie 可以这样

```js
response.writeHead(200, {
  'Content-Type': 'text/html;charset=utf-8',
  'Set-Cookie': ['id=123', 'age=18']
})
```

![](https://gitee.com/alvin0216/cdn/raw/master/img/http/series/cookie2.png)

而且下次请求时 HTTP 的 request header 也会带上 `Cookie: id=123; age=18`

```js
console.log(document.cookie) // id=123; age=18
```

| Set-Cookie | 描述                                                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Expires    | 过期的绝对时间                                                                                                                                                      |
| max-age    | 过期的相对时间，单位秒                                                                                                                                              |
| HttpOnly   | 我们可以通过 document.cookie 读取 cookie，这样子很不安全很容易受到 `XSS` 攻击，如果这个属性设置为 true，就不能通过 js 脚本来获取 cookie 的值，能有效的防止 xss 攻击 |
| secure     | http 不仅是无状态的，还是不安全的协议，容易被劫持当这个属性设置为 true 时，此 cookie 只会在 https 和 ssl 等安全协议下传输                                           |
| domain     | 这个是指的域名，这个代表的是，cookie 绑定的域名，如果没有设置，就会自动绑定到执行语句的当前域                                                                       |
| path       | 默认是'/'，匹配的是 web 的路由，比如 当你路径设置成/blog 的时候，其实它会给/blog、/blogabc 等等的绑定 cookie                                                        |
| ...        | ...                                                                                                                                                                 |

示例

```js
response.writeHead(200, {
  'Content-Type': 'text/html;charset=utf-8',
  'Set-Cookie': ['id=123; max-age:60', 'age=18; HttpOnly']
})
```

## Session

session 是另一种记录服务器和客户端会话状态的机制

session 是基于 cookie 实现的，session 存储在服务器端，sessionId 会被存储到客户端的 cookie 中

session 认证流程：

![](https://gitee.com/alvin0216/cdn/raw/master/img/http/series/session.png)

用户第一次请求服务器的时候，服务器根据用户提交的相关信息，创建创建对应的 Session ，请求返回时将此 Session 的唯一标识信息 `SessionID` 返回给浏览器，浏览器接收到服务器返回的 `SessionID` 信息后，会将此信息存入到 Cookie 中，同时 Cookie 记录此 `SessionID` 属于哪个域名。

当用户第二次访问服务器的时候，请求会自动判断此域名下是否存在 Cookie 信息，如果存在自动将 Cookie 信息也发送给服务端，服务端会从 Cookie 中获取 `SessionID`，再根据 `SessionID` 查找对应的 Session 信息，如果没有找到说明用户没有登录或者登录失效，如果找到 Session 证明用户已经登录可执行后面操作。

根据以上流程可知，SessionID 是连接 Cookie 和 Session 的一道桥梁，大部分系统也是根据此原理来验证用户登录状态。

## Cookie 和 Session 的区别

- **作用范围不同**，`Cookie` 保存在客户端（浏览器），`Session` 保存在服务器端。
- **存取方式的不同**，`Cookie` 只能保存 ASCII，`Session` 可以存任意数据类型，一般情况下我们可以在 `Session` 中保持一些常用变量信息，比如说 UserId 等。
- **有效期不同**，`Cookie` 可设置为长时间保持，比如我们经常使用的默认登录功能，`Session` 一般失效时间较短，客户端关闭或者 `Session` 超时都会失效。
- **隐私策略不同**，`Cookie` 存储在客户端，比较容易遭到不法获取，早期有人将用户的登录名和密码存储在 `Cookie` 中导致信息被窃取；`Session` 存储在服务端，安全性相对 `Cookie` 要好一些。
- **存储大小不同**， 单个 `Cookie` 保存的数据不能超过 4K，`Session` 可存储数据远高于 Cookie。

---

- [傻傻分不清之 Cookie、Session、Token、JWT](https://juejin.im/post/5e055d9ef265da33997a42cc)
- [Cookie 的 SameSite 属性](http://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)
