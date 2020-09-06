---
title: SQL 注入
date: 2020-09-06 18:16:03
---

> sql 注入的原理是将 sql 代码伪装到输入参数中，传递到服务器解析并执行的一种攻击手法。

也就是 数据当作代码去执行了。。。

举个例子，我们登录一个网站。填写用户名和密码

<img class='small' alt='sql injection' src='https://gitee.com/alvin0216/cdn/raw/master/img/browser/security/sql.png' />

然后你的 sql 语句可能就是这样子：

```sql
select * from users where username='admin' -- and password=''
```

输入 `#` 或者 `--` 会忽略后面的语句，可以使得不用输入密码也可以登录你的网站，是不是很容易被攻击了。

其实上面的 sql 注入只是在参数层面做了些手脚，如果是引入了一些功能性的 sql 那就更危险了。譬如:

```sql
select * from users where username='admin' or 1=1; delete * from users;  -- and password=''
```

这个 sql 是删除全表，是非常危险的操作，因此 sql 注入这种还是需要特别注意的。

### 预防手段

参数校验啦、使用比较完善的框架、使用一些安全检测插件 比如安全狗等等。。。
