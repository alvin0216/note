---
title: 评论列表被恶意攻击解决方案
date: 2020-09-09 10:47:42
---

<span class='green'>举个场景：你的项目有个评论功能，那有人不断的进行评论，或者是恶意评论你怎么处理？</span>

### 恶意评论

前后端去过滤关键字进行转译、或者直接不允许评论

### 不断的进行评论

方案 1：在评论次数过多的情况下，添加**验证码**输入。就像密码登录一样，输入密码错误几次后一段时间内不允许登录，有个锁去实现。

- 几分钟评论几次，如果超过，返回就给一个参数，这个参数代表他再做评论要验证码。

方案 2：节流处理。服务端也做节流处理，设置类似锁的概念，用 redis 去存储之类的。

方案 3：封禁恶意 IP，怎么去封？

- 手工 看日志去封，找到恶意用户直接找到 IP 去封禁。
- 。。。