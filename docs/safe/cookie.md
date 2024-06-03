---
title: Cookie
date: 2020-06-10 16:01:15
---

## 相关属性

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/cookie3.png)

| Field    | 作用                                                               |
| -------- | ------------------------------------------------------------------ |
| httpOnly | boolean，不能通过 document.cookie 访问到 cookie，有效防止 xss 攻击 |
| secure   | true, cookie 只会在 https 和 ssl 等安全协议下传输                  |
| samesite | 第三方 cookie 的一些协定                                           |
| expires  | 绝对过期时间                                                       |
| max-age  | 相对过期时间                                                       |
| domain   | cookie 的 domain 限制                                              |
| path     | 限制 cookie 的路由匹配                                             |

## SameSite

| SameSite | 作用                                                                                                                 |
| -------- | -------------------------------------------------------------------------------------------------------------------- |
| Strict   | 浏览器完全禁止第三方请求携带 Cookie                                                                                  |
| Lax      | 就宽松一点了，但是只能在 **get 方法提交表单**况或者 **a 标签发送 get 请求**的情况下可以携带 Cookie，其他情况均不能。 |
| None     | 默认自动携带 Cookie                                                                                                  |

## 相关文章

- [Cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)
- [看完这篇 Session、Cookie、Token，和面试官扯皮就没问题了](https://juejin.cn/post/6844904115080790023)
- [概念区分，什么是跨站，什么是跨域](https://cloud.tencent.com/developer/article/1751237)
- [当 CORS 遇到 SameSite](https://juejin.cn/post/6844904095271288840)
- [阮一峰：Cookie 的 SameSite 属性](https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)
- [✨ 当浏览器全面禁用三方 Cookie](https://juejin.cn/post/6844904128557105166)
- [✨ Chrome 80+以後的第三方 cookie 政策](https://www.youtube.com/watch?v=lrNwwcA9SKs)
