---
title: 理解 Session 与 Cookie
date: 2020-06-10 16:01:15
sidebar: auto
tags:
  - 浏览器
  - cookie
categories:
  - 浏览器
---

## cookie 是什么

这个讲起来很简单，了解 http 的同学，肯定知道，http 是一个无状态的协议，而 cookie 的作用就是来标示一端用户信息。

第一次访问网站的时候，浏览器发出请求，服务器响应请求后，会将 cookie 放入到响应请求中，在浏览器第二次发请求的时候，会把 cookie 带过去，服务端会辨别用户身份，当然服务器也可以修改 cookie 内容

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

## Session

Session 的作用呢，和 cookie 差不多，整个 cookie 呢是客户端的 session 呢，在服务端它呢，是用来解决 HTTP 协议不能维持状态的，这个问题正由于 session 是存在服务端的，所以呢，他不会在网络中进行传输，所以相比起 cookie 呢，Session 会相对安全一些，但是呢，Session 是依赖于 cookie 的什么意思呢？当用户去访问某一个站点的时候，服务器端呢，会为这个用户去产生一个唯一的 session ID，并且呢，他把这个 session ID 以 cookie 的方式发送到客户端，我们来看一下啊，因为。

![](https://gitee.com/alvin0216/cdn/raw/master/images/session.png)

第一的时候呢，会给服务端去发送一个请求，服务端收到这个请求，他会做一个初始化 session ID 的这样一个操作，因为他第一次访问，所以这个时候呢，服务端是没有 ID 的，所以他要创建一个 session ID，然后呢，将这个 session ID 存储在我们的数据结构里面，假设是一个 KV 这样的一个结构，那么屁呢存的 session ID value 呢，存的是 session 的一个具体的信息，然后呢，他将这个 session ID 写入在库里面，返回我们的客户端，当他第二次访问的时候呢，那么服务端肯定会根据他 request 里面传过来的，这个 session ID，能够在服务器里面去找到这个对应的 session，所以呢，服务器就会认为哦，你已经登录了或者说呢。你已经开始保持了一个绘画，直到服务端这个 session 过期，所以呢，当 session 过期的时候，我们有时候呢，从网站里就会自动的退出来，当我们的浏览器禁用了 cookie 之后呢，Session 实际上是没有办法运作的，所以呢，他们就提出来了，一种方式是我们前面所说的 url 传参的
