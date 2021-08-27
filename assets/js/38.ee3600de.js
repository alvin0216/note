(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{565:function(o,e,s){"use strict";s.r(e);var i=s(4),a=Object(i.a)({},(function(){var o=this,e=o.$createElement,s=o._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":o.$parent.slotKey}},[s("h2",{attrs:{id:"cookie-与-session"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cookie-与-session"}},[o._v("#")]),o._v(" cookie 与 session")]),o._v(" "),s("h3",{attrs:{id:"什么是-cookie"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是-cookie"}},[o._v("#")]),o._v(" 什么是 Cookie")]),o._v(" "),s("p",[o._v("HTTP 是无状态的协议（对于事务处理没有记忆能力，每次客户端和服务端会话完成时，服务端不会保存任何会话信息）：每个请求都是完全独立的，服务端无法确认当前访问者的身份信息，无法分辨上一次的请求发送者和这一次的发送者是不是同一个人。所以服务器与浏览器为了进行会话跟踪（知道是谁在访问我），就必须主动的去维护一个状态，这个状态用于告知服务端前后两个请求是否来自同一浏览器。而这个状态需要通过 cookie 或者 session 去实现")]),o._v(" "),s("p",[o._v("Cookie 主要用于以下三个方面：")]),o._v(" "),s("ul",[s("li",[o._v("会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）")]),o._v(" "),s("li",[o._v("个性化设置（如用户自定义设置、主题等）")]),o._v(" "),s("li",[o._v("浏览器行为跟踪（如跟踪分析用户行为等）")])]),o._v(" "),s("p",[s("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/cookie3.png",alt:""}})]),o._v(" "),s("h3",{attrs:{id:"什么是-session"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是-session"}},[o._v("#")]),o._v(" 什么是 Session")]),o._v(" "),s("p",[o._v("Session 代表着服务器和客户端一次会话的过程。Session 对象存储特定用户会话所需的属性及配置信息。这样，当用户在应用程序的 Web 页之间跳转时，存储在 Session 对象中的变量将不会丢失，而是在整个用户会话中一直存在下去。当客户端关闭会话，或者 Session 超时失效时会话结束。")]),o._v(" "),s("h3",{attrs:{id:"cookie-和-session-有什么不同"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cookie-和-session-有什么不同"}},[o._v("#")]),o._v(" Cookie 和 Session 有什么不同？")]),o._v(" "),s("ol",[s("li",[o._v("Cookie 存储在客户端，比较容易遭到不法获取，Session 存储在服务端，安全性相对 Cookie 要好一些")]),o._v(" "),s("li",[o._v("有效期不同，Cookie 可设置为长时间保持，比如我们经常使用的默认登录功能，Session 一般失效时间较短，客户端关闭或者 Session 超时都会失效。")]),o._v(" "),s("li",[o._v("...")])]),o._v(" "),s("h3",{attrs:{id:"cookie-和-session-他们有什么关联"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cookie-和-session-他们有什么关联"}},[o._v("#")]),o._v(" Cookie 和 Session，他们有什么关联？")]),o._v(" "),s("p",[s("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/session.png",alt:""}})]),o._v(" "),s("p",[o._v("用户第一次请求服务器的时候，服务器根据用户提交的相关信息，创建创建对应的 Session ，请求返回时将此 Session 的唯一标识信息 SessionID 返回给浏览器，浏览器接收到服务器返回的 SessionID 信息后，会将此信息存入到 Cookie 中，同时 Cookie 记录此 SessionID 属于哪个域名。")]),o._v(" "),s("p",[o._v("当用户第二次访问服务器的时候，请求会自动判断此域名下是否存在 Cookie 信息，如果存在自动将 Cookie 信息也发送给服务端，服务端会从 Cookie 中获取 SessionID，再根据 SessionID 查找对应的 Session 信息，如果没有找到说明用户没有登录或者登录失效，如果找到 Session 证明用户已经登录可执行后面操作。")]),o._v(" "),s("p",[o._v("根据以上流程可知，SessionID 是连接 Cookie 和 Session 的一道桥梁，大部分系统也是根据此原理来验证用户登录状态。")]),o._v(" "),s("p",[o._v("既然服务端是根据 Cookie 中的信息判断用户是否登录，那么如果浏览器中禁止了 Cookie，如何保障整个机制的正常运转。")]),o._v(" "),s("h2",{attrs:{id:"浏览器针对-cookie-的策略"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浏览器针对-cookie-的策略"}},[o._v("#")]),o._v(" 浏览器针对 cookie 的策略")]),o._v(" "),s("p",[o._v("chrome80 版本以后默认把 cookie 的 SameSite 属性设置为 Lax，以此来对第三方 cookie 做一些限制，对于使用第三方 cookie 场景的系统，往往会造成登陆异常，系统崩溃等大问题。\nSafari 13.1、Firefox 79 版本中，三方 Cookie 已经被默认禁用")]),o._v(" "),s("h3",{attrs:{id:"什么是第三方-cookie"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是第三方-cookie"}},[o._v("#")]),o._v(" 什么是第三方 cookie？")]),o._v(" "),s("p",[o._v("我们打开天猫的网站，看他的控制台 application 中的 cookie：")]),o._v(" "),s("p",[s("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/cookie4.png",alt:""}})]),o._v(" "),s("p",[o._v("我们可以发现，在天猫的网站下，不只是有 "),s("code",[o._v(".tmall.com")]),o._v(" 下的 "),s("code",[o._v("cookie")]),o._v("，还有.taobao.com 下的很多 cookie。")]),o._v(" "),s("p",[o._v("当我们在访问 "),s("code",[o._v("www.tmall.com")]),o._v(" 的时候，将与页面网址同站的 Cookie 叫做第一方 cookie，与页面网址跨站的 cookie 称为第三方 cookie（.taobao.com）。")]),o._v(" "),s("p",[o._v("举例："),s("code",[o._v("a.jd.com")]),o._v(" 网址下")]),o._v(" "),s("ul",[s("li",[s("code",[o._v(".mercury.jd.com")]),o._v(" 下的 Cookie---第一方 Cookie")]),o._v(" "),s("li",[s("code",[o._v(".a.taobao.com")]),o._v(" 下的 Cookie---第三方 Cookie")])]),o._v(" "),s("p",[o._v("但是，我从来没有在电脑上访问过 taobao.com 啊？为什么他会出现在我的 cookie 中呢？")]),o._v(" "),s("h3",{attrs:{id:"第三方-cookie-是怎么得到的"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#第三方-cookie-是怎么得到的"}},[o._v("#")]),o._v(" 第三方 cookie 是怎么得到的？")]),o._v(" "),s("p",[o._v("继续上面的例子，"),s("code",[o._v(".taobao.com")]),o._v(" 下的 cookie 是如何写入"),s("code",[o._v(".tmall.com")]),o._v(" 网站的？")]),o._v(" "),s("p",[o._v("---通过跨站发送请求")]),o._v(" "),s("p",[o._v("我们在打开天猫网站进行登录的时候，发现有一个 "),s("code",[o._v("pass.tmall.com/add")]),o._v(" 的请求，它就是天猫登录的接口，它把用户名和密码发给天猫的服务端。登录成功之后服务端通过 set-cookie 字段向本站注入了与登录相关的 cookie（在.tmall.com 域名下）。")]),o._v(" "),s("p",[o._v("同时页面会向淘宝（"),s("code",[o._v("login.taobao.com")]),o._v("）发送请求，由于淘宝和天猫用的是同一套登录系统，淘宝服务端可以获取到此时的天猫登录信息，将该信息通过 set-cookie 的形式绑定在.taobao.com 域名下。")]),o._v(" "),s("p",[o._v("这样，打开淘宝之后，可以直接登录淘宝。")]),o._v(" "),s("hr"),o._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://juejin.cn/post/6844904128557105166",target:"_blank",rel:"noopener noreferrer"}},[o._v("当浏览器全面禁用三方 Cookie"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);e.default=a.exports}}]);