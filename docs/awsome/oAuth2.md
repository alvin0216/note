---
title: oAuth2
date: 2020-07-03 11:05:20
sidebar: auto
tags:
  - oAuth2
categories:
  - 技术漫谈
---

## oAuth 是什么

> oAuth 目前最流行的授权机制，用来**授权第三方应用**，获取用户数据。

简单说，OAuth 就是一种授权机制，主要给第三方应用颁发一个有**时效性的令牌 access_token**，第三方应用根据这个 `access_token` 就可以去获取用户的相关资源，如头像，昵称，email 这些信息。

常见的应用：QQ 登录、微信登录、github 授权登录等等。

## 协议流程

在详细介绍 oAuth2 协议流程之前，先来简单了解几个角色，方便后续的理解。

- `Resource Owner`: 资源所有者，因为是请求用户的头像和昵称的一些信息，所以资源的所有者一般指用户自己。
- `Client`: 客户端，如 web 网站，app 等
- `Resource Server`: 资源服务器，托管受保护资源的服务器
- `Authorization Server`: 授权服务器，一般和资源服务器是同一家公司的应用，主要是用来处理授权，给客户端颁发令牌
- `User-agent`: 用户代理，一般为 web 浏览器，在手机上就是 app

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/oAuth2.png)

1. 用户打开客户端(Client)，客户端向授权服务器(Resource Owner)发送一个授权请求
2. 用户同意给客户端(Client)授权
3. 客户端使用刚才的授权去向认证服务器(Authorization Server)认证
4. 认证服务器认证通过后，会给客户端发放令牌(Access Token)
5. 客户端拿着令牌(Access Token)，去向资源服务器(Resource Server)申请获取资源
6. 资源服务器确认令牌之后，给客户端返回受保护的资源(Protected Resource)

---

## 授权方式

OAuth 2.0 对于如何颁发令牌的细节，规定得非常详细。具体来说，一共分成四种授权类型（authorization grant），即四种颁发令牌的方式，适用于不同的互联网场景。

- `授权码模式(authorization code)`： 最常用的流程，安全性也最高，它适用于那些有后端的 Web 应用。授权码通过前端传送，令牌则是储存在后端，而且所有与资源服务器的通信都在后端完成。这样的前后端分离，可以避免令牌泄漏。
- `隐藏式(implicit)`：允许直接向前端颁发令牌。这种方式没有授权码这个中间步骤。适用于**纯前端**，无后端的的 web。
- `密码模式(resource owner password credentials)`：这种方式需要用户给出自己的用户名/密码，显然风险很大，因此只适用于其他授权方式都无法采用的情况，而且必须是用户高度信任的应用。
- `凭证式（client credentials）`：适用于没有前端的命令行应用，即在命令行下请求令牌。

### 授权码模式(authorization code) ✨

```js
 +----------+
 | Resource |
 |   Owner  |
 |          |
 +----------+
      ^
      |
     (B)
 +----|-----+          Client Identifier      +---------------+
 |         -+----(A)-- & Redirection URI ---->|               |
 |  User-   |                                 | Authorization |
 |  Agent  -+----(B)-- User authenticates --->|     Server    |
 |          |                                 |               |
 |         -+----(C)-- Authorization Code ---<|               |
 +-|----|---+                                 +---------------+
   |    |                                         ^      v
  (A)  (C)                                        |      |
   |    |                                         |      |
   ^    v                                         |      |
 +---------+                                      |      |
 |         |>---(D)-- Authorization Code ---------'      |
 |  Client |          & Redirection URI                  |
 |         |                                             |
 |         |<---(E)----- Access Token -------------------'
 +---------+       (w/ Optional Refresh Token)

```

以 `github` 登录为例：

![](https://alvin-cdn.oss-cn-shenzhen.aliyuncs.com/images/github-login.png)

(A). 用户在网站上使用 github 登录，首先会重定向到 github 的授权端点：

```bash
https://github.com/login/oauth/authorize?
response_type=code&
client_id=your_code&
redirect_uri=重定向的url&
scope=read&
state=uuid
```

| 字段          | 描述                                                                           |
| ------------- | ------------------------------------------------------------------------------ |
| response_type | 必须，在授权码模式中固定为 code                                                |
| client_id     | 必须，唯一标识了客户端，在 github 注册时获得的客户端 ID                        |
| redirect_url  | 客户端在 github 注册的重定向 url，用户同意或拒绝的时候都会跳转到这个重定向 url |
| scope         | 可选，请求资源范围，如有多项，使用多个空格隔开                                 |
| state         | 推荐，客户端生成的随机数，资源服务器会原样返回，防止 CSRF 的攻击               |

(B). 页面跳转后，github 会要求用户登录，然后询问是否给予客户端授权，用户点击同意。

(C). 然后 github 就会将授权码(Authorization Code)返回给 redirect_uri(重定向 uri)。

```bash
redirect_uri?code=xxxxxxx
```

| 字段  | 描述                 |
| ----- | -------------------- |
| code  | 必须，授权码         |
| state | 防止 CSRF 攻击的参数 |

(D). 客户端(Client)在通过在 URL 中取出授权码之后，就可以在后端向 github 请求令牌

| 字段          | 描述                                                   |
| ------------- | ------------------------------------------------------ |
| client_id     | 必须，客户端在 github 注册的唯一标识                   |
| client_secret | 必须，客户端在 github 注册时返回的密钥                 |
| grant_type    | 必须，authorization_code/refresh_code                  |
| code          | 必须，上一步中取出的授权码                             |
| redirect_uri  | 必须，完成授权之后的回调地址，与在 github 注册时的一致 |

(E). github 给 redirect_uri 指定的地址返回 AccessToken，通过 JSON 格式返回

```js
{
  "access_token":"xxxxxxx",
  "token_type":"bearer",
  "expires_in":3600,
  "refresh_token":"xxxxxxx"
}
```

客户端就可以在后端取到 `access_token`,在这段 json 中，还返回了一个 `refresh_token`，这个 `refresh_token` 表示用于访问下一次的更新令牌，`refresh_token` 的时效性比 `access_token` 长，当 `access_token` 过期时，可以使用 `refresh_token` 换取新的 `access_token`。

详情请见 [github 授权登录](./oAuth2-github.md)

### 简化模式

简化模式主要针对没有后端的纯前端应用，在这种情况下，因为没有后端，所以就不能采用授权码模式的这种流程了，必须要把 access_token 存在前端。

```js
 +----------+
 | Resource |
 |  Owner   |
 |          |
 +----------+
      ^
      |
     (B)
 +----|-----+          Client Identifier     +---------------+
 |         -+----(A)-- & Redirection URI --->|               |
 |  User-   |                                | Authorization |
 |  Agent  -|----(B)-- User authenticates -->|     Server    |
 |          |                                |               |
 |          |<---(C)--- Redirection URI ----<|               |
 |          |          with Access Token     +---------------+
 |          |            in Fragment
 |          |                                +---------------+
 |          |----(D)--- Redirection URI ---->|   Web-Hosted  |
 |          |          without Fragment      |     Client    |
 |          |                                |    Resource   |
 |     (F)  |<---(E)------- Script ---------<|               |
 |          |                                +---------------+
 +-|--------+
   |    |
  (A)  (G) Access Token
   |    |
   ^    v
 +---------+
 |         |
 |  Client |
 |         |
 +---------+
```

主要是 B 这个步骤，页面跳转到 github 网站，用户同意给予客户端授权。github 就会把令牌作为 URL 参数，跳转回到 redirect_uri 的这个回调地址。

```js
回调地址#token=xxxxxx
```

注意，令牌的位置是 URL 锚点（fragment），而不是查询字符串（querystring），这是因为 OAuth 2.0 允许跳转网址是 HTTP 协议，因此存在"中间人攻击"的风险，而浏览器跳转时，锚点不会发到服务器，就减少了泄漏令牌的风险。

### 密码模式

如果你高度信任某个应用，RFC 6749 也允许用户把用户名和密码，直接告诉该应用。该应用就使用你的密码，申请令牌，这种方式称为"密码式"（password）。

```js
+----------+
 | Resource |
 |  Owner   |
 |          |
 +----------+
      v
      |    Resource Owner
     (A) Password Credentials
      |
      v
 +---------+                                  +---------------+
 |         |>--(B)---- Resource Owner ------->|               |
 |         |         Password Credentials     | Authorization |
 | Client  |                                  |     Server    |
 |         |<--(C)---- Access Token ---------<|               |
 |         |    (w/ Optional Refresh Token)   |               |
 +---------+                                  +---------------+

        Figure 5: Resource Owner Password Credentials Flow
```

密码模式就是用户向客户端提供自己的账号和密码，客户端使用这些信息去向我们的服务提供商去索要一个授权。

### 客户端模式

客户端以自己的名义，而不是用户的名义，向“服务提供商”进行认证，如微信公众号以此 access_token 来拉取所有已关注用户的信息，docker 到 dockerhub 拉取镜像等。

```js
 +---------+                                  +---------------+
 |         |                                  |               |
 |         |>--(A)- Client Authentication --->| Authorization |
 | Client  |                                  |     Server    |
 |         |<--(B)---- Access Token ---------<|               |
 |         |                                  |               |
 +---------+                                  +---------------+

                 Figure 6: Client Credentials Flow
```

客户端模式，顾名思义就是指客户端以自己的名义而不是用户的名义去向服务的提供商去做一个认证，严格来说，这种模式并不是 oAuth 框架要解决的问题，在这种客户端模式下呢，它是直接通过客户端的密钥和 id 去获取一个 access_token 的，不需要用户去参与。

## 相关链接

- [阮一峰 OAuth 2.0 的一个简单解释](http://www.ruanyifeng.com/blog/2019/04/oauth_design.html)
- [阮一峰 OAuth 2.0 的四种方式](http://www.ruanyifeng.com/blog/2019/04/oauth_design.html)
- [理解 OAuth2 协议](https://juejin.im/post/5dd34a47f265da0c091575e5)
