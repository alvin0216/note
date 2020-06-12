---
title: 数字签名和证书
date: 2020-06-09 10:26:57
---

基于**为什么 CA 的证书可以使得公钥正确传输给客户端**，这里再解析一下。本文转自 [看完还不懂 HTTPS 我直播吃翔](https://zhuanlan.zhihu.com/p/25976060)

https 通信完整流程图：

![](../../assets/http/https/certificate1.png)

## 第一层（安全传输数据）

假如我们要实现一个功能：一个用户 A 给一个用户 B 发消息，但是要保证这个消息的内容只能被 A 和 B 知道，其他的无论是墨渊上神还是太上老君都没办法破解或者篡改消息的内容。

由于消息不想被其他人看到，所以我们自然而然就会想到为消息加密，并且只有 A 和 B 才有解密的密钥。这里需要考虑几点:

1. 使用什么加密方式？
2. 密钥怎么告知对方？

对于第一个问题，加密算法分为两类：对称加密和非对称加密，这里我们选择对称机密，原因有如下几个：

1. 对称加密速度快，加密时 CPU 资源消耗少；
2. 非对称加密对待加密的数据的长度有比较严格的要求，不能太长，但是实际中消息可能会很长，因此非对称加密就满足不了；

对于第二个问题，这是导致整个 https 通信过程很复杂的根本原因。 如果 A 或 B 直接把他们之间用于解密的密钥通过互联网传输给对方，那一旦密钥被第三者劫持，第三者就能正确解密 A,B 之间的通信数据。

## 第二层（安全传输密钥）

通过第一层的描述，第二层需要解决的问题是：**安全地传输 A,B 之间用于解密数据的密钥**。

因为如果传输过程中这把密钥被第三者拿到了，就能解密传通信数据，所以，这把密钥必须得加密，就算第三者劫持到这把加密过的密钥，他也不能解密，得到真正的密钥。

那就是用非对称加密咯，那如何应用非对称加密来加密那把密钥呢？

考虑如下方式：

![](../../assets/http/https/certificate2.png)

分析一下上面步骤的可行性：

- 上述步骤中最终用于加密数据的密钥是客户端生成并且用公钥加密之后传给服务器的，因为私钥只有服务器才有，所以也就只有服务器才能解开客户端上报的密钥；
- 要保证传输的密钥只能被服务器解密，就得保证用于加密密钥的公钥一定是服务器下发的，绝对不可能被第三方篡改过；

因为还可能存在一种"中间人攻击"的情况，如下图：

![](../../assets/http/https/certificate3.png)

这种情况下，客户端和服务器之间通信的数据就完全被坏人破解了。

## 第三层（安全传输公钥）🌟

从上一层可以知道，要保证数据的安全，就必须得保证服务器给客户端下发的公钥是真正的公钥，而不是中间人伪造的公钥。那怎么保证呢？

那就得引入数字证书了，数字证书是服务器主动去权威机构申请的，证书中包含了上一个图中的加密过的 A 公钥和权威机构的信息，所以服务器只需要给客户端下发数字证书即可。现在流程图如下：

![](../../assets/http/https/certificate4.png)

那数字证书中的 A 公钥是如何加密的呢？

答案是非对称加密，只不过这里是使用只有权威机构自己才有的私钥加密。

等一下，既然 A 公钥被权威机构的私钥加密了，那客户端收到证书之后怎么解密证书中的 A 公钥呢?需要有权威机构的公钥才能解密啊！那这个权威机构的公钥又是怎么安全地传输给客户端的呢？感觉进入了鸡生蛋，蛋生鸡的悖论了~~

<blockquote class='box'>

别慌，**答案是权威机构的公钥不需要传输，因为权威机构会和主流的浏览器或操作系统合作，将他们的公钥内置在浏览器或操作系统环境中**。客户端收到证书之后，只需要从证书中找到权威机构的信息，并从本地环境中找到权威机构的公钥，就能正确解密 A 公钥。

</blockquote>

这样就绝对安全了吗？既然权威技能能给服务器签发数字证书，那为什么就不可能给中间人签发数字证书呢?毕竟赚钱的生意权威机构也不会拒绝的呀。

试想一下：

<blockquote class='box'>

服务器给客户端下发数字证书时证书被中间人劫持了，中间人将服务器的证书替换成自己的证书下发给客户端，客户端收到之后能够通过权威机构的公钥解密证书内容（因为中间人的证书也是权威机构私钥加密的），从而获取公钥，但是，这里的公钥并不是服务器原本的 A 公钥，而是中间人自己证书中的 B 公钥。从第二层可知，如果不能保证客户端收到的公钥是服务器下发的，那整个通信数据的安全就没法保证。简单总结就是证书被调包~

</blockquote>

所以，还得保证客户端收到的证书就是服务器下发的证书，没有被中间人篡改过。

## 第四层（安全传输证书）🌟

这一层，我们的任务是：**保证客户端收到的证书是服务器下发的证书，没有被中间人篡改过**。

所以，这里就有两个需求:

- 证明证书内容没有被第三方篡改过；
- 证明证书是服务器下发的

其实这些问题，数字证书本身已经提供方案了，数字证书中除了包含加密之后的服务器公钥，权威机构的信息之外，还包含了证书内容的签名

先通过 Hash 函数计算得到证书数字摘要，然后用权威机构私钥加密数字摘要得到数字签名，签名计算方法以及证书对应的域名。这样一来，客户端收到证书之后：

<blockquote class='box'>

- 使用权威机构的公钥解密数字证书，得到证书内容（服务器的公钥）以及证书的数字签名，然后根据证书上描述的计算证书签名的方法计算一下当前证书的签名，与收到的签名作对比，如果一样，表示证书一定是服务器下发的，没有被中间人篡改过。
  - 因为中间人虽然有权威机构的公钥，能够解析证书内容并篡改，但是篡改完成之后中间人需要将证书重新加密，但是中间人没有权威机构的私钥，无法加密，强行加密只会导致客户端无法解密，如果中间人强行乱修改证书，就会导致证书内容和证书签名不匹配。**所以证书签名就能判断证书是否被篡改**
  - 除非黑客足够牛逼，能申请一份一模一样的证书，并且被加到浏览器的信任证书列表里，还要通过证书透明度服务的监督
- 再考虑证书被掉包的情况：中间人同样可以向权威机构申请一份证书，然后在服务器给客户端下发证书的时候劫持原证书，将自己的假证书下发给客户端，客户端收到之后依然能够使用权威机构的公钥解密证书，并且证书签名也没问题。但是这个时候客户端还需要检查证书中的域名和当前访问的域名是否一致。如果不一致，会发出警告！

</blockquote>

从上面的分析可以看到，数字证书中的信息确实能让客户端辨别证书的真伪。

---

整个过程都是客户端怎么核实证书是否有效，有效则证明公钥是正确的。证书到手，权威机构的公钥不需要传输，因为权威机构会和主流的浏览器或操作系统合作，将他们的公钥内置在浏览器或操作系统环境中。所以浏览器内置公钥，可以解密。

黑客也想拿到公钥，见上。CA 证书不会乱颁发，所以黑客拿到证书也无可奈何。

至于服务端怎么确认客户端身份、token 域名那些就可以确认了。