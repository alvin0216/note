---
title: Cookie
date: 2020-06-10 16:01:15
sidebar: auto
tags:
  - 浏览器
  - cookie
categories:
  - 浏览器
---

## cookie 与 session

### 什么是 Cookie

HTTP 是无状态的协议（对于事务处理没有记忆能力，每次客户端和服务端会话完成时，服务端不会保存任何会话信息）：每个请求都是完全独立的，服务端无法确认当前访问者的身份信息，无法分辨上一次的请求发送者和这一次的发送者是不是同一个人。所以服务器与浏览器为了进行会话跟踪（知道是谁在访问我），就必须主动的去维护一个状态，这个状态用于告知服务端前后两个请求是否来自同一浏览器。而这个状态需要通过 cookie 或者 session 去实现

Cookie 主要用于以下三个方面：

- 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）

![](https://gitee.com/alvin0216/cdn/raw/master/images/cookie3.png)

### 什么是 Session

Session 代表着服务器和客户端一次会话的过程。Session 对象存储特定用户会话所需的属性及配置信息。这样，当用户在应用程序的 Web 页之间跳转时，存储在 Session 对象中的变量将不会丢失，而是在整个用户会话中一直存在下去。当客户端关闭会话，或者 Session 超时失效时会话结束。

### Cookie 和 Session 有什么不同？

1. Cookie 存储在客户端，比较容易遭到不法获取，Session 存储在服务端，安全性相对 Cookie 要好一些
2. 有效期不同，Cookie 可设置为长时间保持，比如我们经常使用的默认登录功能，Session 一般失效时间较短，客户端关闭或者 Session 超时都会失效。
3. ...

### Cookie 和 Session，他们有什么关联？

![](https://gitee.com/alvin0216/cdn/raw/master/images/session.png)

用户第一次请求服务器的时候，服务器根据用户提交的相关信息，创建创建对应的 Session ，请求返回时将此 Session 的唯一标识信息 SessionID 返回给浏览器，浏览器接收到服务器返回的 SessionID 信息后，会将此信息存入到 Cookie 中，同时 Cookie 记录此 SessionID 属于哪个域名。

当用户第二次访问服务器的时候，请求会自动判断此域名下是否存在 Cookie 信息，如果存在自动将 Cookie 信息也发送给服务端，服务端会从 Cookie 中获取 SessionID，再根据 SessionID 查找对应的 Session 信息，如果没有找到说明用户没有登录或者登录失效，如果找到 Session 证明用户已经登录可执行后面操作。

根据以上流程可知，SessionID 是连接 Cookie 和 Session 的一道桥梁，大部分系统也是根据此原理来验证用户登录状态。

既然服务端是根据 Cookie 中的信息判断用户是否登录，那么如果浏览器中禁止了 Cookie，如何保障整个机制的正常运转。

## 浏览器针对 cookie 的策略

chrome80 版本以后默认把 cookie 的 SameSite 属性设置为 Lax，以此来对第三方 cookie 做一些限制，对于使用第三方 cookie 场景的系统，往往会造成登陆异常，系统崩溃等大问题。
Safari 13.1、Firefox 79 版本中，三方 Cookie 已经被默认禁用

### 什么是第三方 cookie？

我们打开天猫的网站，看他的控制台 application 中的 cookie：

![](https://gitee.com/alvin0216/cdn/raw/master/images/cookie4.png)

我们可以发现，在天猫的网站下，不只是有 `.tmall.com` 下的 `cookie`，还有.taobao.com 下的很多 cookie。

当我们在访问 `www.tmall.com` 的时候，将与页面网址同站的 Cookie 叫做第一方 cookie，与页面网址跨站的 cookie 称为第三方 cookie（.taobao.com）。

举例：`a.jd.com` 网址下

- `.mercury.jd.com` 下的 Cookie---第一方 Cookie
- `.a.taobao.com` 下的 Cookie---第三方 Cookie

但是，我从来没有在电脑上访问过 taobao.com 啊？为什么他会出现在我的 cookie 中呢？

### 第三方 cookie 是怎么得到的？

继续上面的例子，`.taobao.com` 下的 cookie 是如何写入`.tmall.com` 网站的？

---通过跨站发送请求

我们在打开天猫网站进行登录的时候，发现有一个 `pass.tmall.com/add` 的请求，它就是天猫登录的接口，它把用户名和密码发给天猫的服务端。登录成功之后服务端通过 set-cookie 字段向本站注入了与登录相关的 cookie（在.tmall.com 域名下）。

同时页面会向淘宝（`login.taobao.com`）发送请求，由于淘宝和天猫用的是同一套登录系统，淘宝服务端可以获取到此时的天猫登录信息，将该信息通过 set-cookie 的形式绑定在.taobao.com 域名下。

这样，打开淘宝之后，可以直接登录淘宝。

---

- [当浏览器全面禁用三方 Cookie](https://juejin.cn/post/6844904128557105166)

<!--





### 第三方 cookie

访问 www.taobao.com 该网站会把一些 cookie 写入到 .taobao.com 这个域下。然而打开控制台你会看到，并里面还有很多其他域下的 Cookie，这些所有非当前域下的 Cookie 都属于第三方 Cookie，虽然你可能从来没访问过这些域，但是他们已经悄咪咪的通过这些第三方 Cookie 来标识你的信息，然后把你的个人信息发送过去了。 -->

<!-- ## 第三方 Cookie

### cookie 的属性

- name：这个显而易见，就是代表 cookie 的名字的意思
- value：值
- domain：这个是指的域名，这个代表的是，cookie 绑定的域名，如果没有设置，就会自动绑定到执行语句的当前域，还有值得注意的点，统一个域名下的二级域名也是不可以交换使用 cookie 的，比如，你设置 www.baidu.com 和 image.baidu.com,依旧是不能公用的
- path： path 这个属性默认是'/'，这个值匹配的是 web 的路由，举个例子：

  ```js
  //默认路径
  www.baidu.com;
  //blog路径
  www.baidu.com / blog;
  ```

  我为什么说的是匹配呢，就是当你路径设置成/blog 的时候，其实它会给/blog、/blogabc 等等的绑定 cookie

  - max-age： cookie 的有效期
  - secure：这个属性译为安全，http 不仅是无状态的，还是不安全的协议，容易被劫持，打个比方，你在手机端浏览网页的时候，有没有中国移动图标跳出来过，闲言少叙，当这个属性设置为 true 时，此 cookie 只会在 https 和 ssl 等安全协议下传输
  - HttpOnly：这个属性是面试的时候常考的，如果这个属性设置为 true，就不能通过 js 脚本来获取 cookie 的值，能有效的防止 xss 攻击。

### cookie 被禁用

如果 cookie 无法自动携带，如果是试用 axios，检查是否开启 `withCredentials`.

谷歌浏览器默认的 samesite 属性是 `lax`，大部分是不允许自动携带 cookie 的，也可能存在这个原因。解决方案自查。

- [当浏览器全面禁用三方 Cookie](https://juejin.cn/post/6844904128557105166)

## Session

Session 的作用呢，和 cookie 差不多，整个 cookie 呢是客户端的 session 呢，在服务端它呢，是用来解决 HTTP 协议不能维持状态的，这个问题正由于 session 是存在服务端的，所以呢，他不会在网络中进行传输，所以相比起 cookie 呢，Session 会相对安全一些，但是呢，Session 是依赖于 cookie 的什么意思呢？当用户去访问某一个站点的时候，服务器端呢，会为这个用户去产生一个唯一的 session ID，并且呢，他把这个 session ID 以 cookie 的方式发送到客户端，我们来看一下啊，因为。

![](https://gitee.com/alvin0216/cdn/raw/master/images/session.png)

第一的时候呢，会给服务端去发送一个请求，服务端收到这个请求，他会做一个初始化 session ID 的这样一个操作，因为他第一次访问，所以这个时候呢，服务端是没有 ID 的，所以他要创建一个 session ID，然后呢，将这个 session ID 存储在我们的数据结构里面，假设是一个 KV 这样的一个结构，那么屁呢存的 session ID value 呢，存的是 session 的一个具体的信息，然后呢，他将这个 session ID 写入在库里面，返回我们的客户端，当他第二次访问的时候呢，那么服务端肯定会根据他 request 里面传过来的，这个 session ID，能够在服务器里面去找到这个对应的 session，所以呢，服务器就会认为哦，你已经登录了或者说呢。你已经开始保持了一个绘画，直到服务端这个 session 过期，所以呢，当 session 过期的时候，我们有时候呢，从网站里就会自动的退出来，当我们的浏览器禁用了 cookie 之后呢，Session 实际上是没有办法运作的，所以呢，他们就提出来了，一种方式是我们前面所说的 url 传参的 -->
