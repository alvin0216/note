(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{875:function(v,_,t){"use strict";t.r(_);var a=t(3),s=Object(a.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("p",[v._v("HTTP 报文是通过明文传输，这样很容易造成信息泄漏。(例如大家都熟悉的抓包工具:"),t("code",[v._v("Wireshark")]),v._v(" 就可以截获 HTTP 请求)")]),v._v(" "),t("table",[t("thead",[t("tr",[t("th",[v._v("风险")]),v._v(" "),t("th",[v._v("描述")]),v._v(" "),t("th",[v._v("策略")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[t("strong",[v._v("窃听风险")])]),v._v(" "),t("td",[v._v("第三方可以获知通信内容")]),v._v(" "),t("td",[v._v("对称和非对称加密")])]),v._v(" "),t("tr",[t("td",[t("strong",[v._v("篡改风险")])]),v._v(" "),t("td",[v._v("第三方可以修改通信内容")]),v._v(" "),t("td",[v._v("摘要算法")])]),v._v(" "),t("tr",[t("td",[t("strong",[v._v("冒充风险")])]),v._v(" "),t("td",[v._v("第三方可以冒充他人身份参与通信")]),v._v(" "),t("td",[v._v("证书校验")])])])]),v._v(" "),t("h2",{attrs:{id:"在-tcp-基础上套了-ssl"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#在-tcp-基础上套了-ssl"}},[v._v("#")]),v._v(" 在 tcp 基础上套了 ssl")]),v._v(" "),t("p",[v._v("HTTPS 默认端口 "),t("code",[v._v("443")]),v._v(", 和 HTTP 不同之处在于 HTTPS 的下层协议套多了一层 "),t("code",[v._v("SSL/TSL")]),v._v(" 协议。")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/https-vs-http.png",alt:""}})]),v._v(" "),t("ul",[t("li",[v._v("SSL：（Secure Socket Layer，安全套接字层），位于可靠的面向连接的网络层协议和应用层协议之间的一种协议层。SSL 通过互相认证、使用数字签名确保完整性、使用加密确保私密性，以实现客户端和服务器之间的安全通讯。该协议由两层组成：SSL 记录协议和 SSL 握手协议。")]),v._v(" "),t("li",[v._v("TLS：(Transport Layer Security，传输层安全协议)，用于两个应用程序之间提供保密性和数据完整性。该协议由两层组成：TLS 记录协议和 TLS 握手协议。")])]),v._v(" "),t("p",[v._v("也就是说掌握 HTTPS 关键之处还是掌握 SSL/TSL 是怎么解决三大风险的。")]),v._v(" "),t("ul",[t("li",[v._v("防窃听，基于对称加密和非对称加密混合实现，使得密文无法被破解。")]),v._v(" "),t("li",[v._v("篡改：通过摘要算法生成唯一值，只要有修改立马就可以发现。")]),v._v(" "),t("li",[v._v("身份证书：则是通过数字签名和 CA 证书。")])]),v._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/ssl.png",alt:""}})]),v._v(" "),t("h2",{attrs:{id:"防窃听"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#防窃听"}},[v._v("#")]),v._v(" 防窃听")]),v._v(" "),t("p",[v._v("那就是加密，黑客即使截获你的报文也无法知道里面的信息")]),v._v(" "),t("h3",{attrs:{id:"对称加密"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#对称加密"}},[v._v("#")]),v._v(" 对称加密")]),v._v(" "),t("p",[v._v("“对称加密”很好理解，客户端双方都有密钥，这两个密钥一样，用来加密/解密报文。常见算法为 "),t("code",[v._v("AES")]),v._v(" 和 "),t("code",[v._v("ChaCha20")]),v._v("。")]),v._v(" "),t("p",[v._v("下面是一个通过 "),t("code",[v._v("AES")]),v._v(" 算法加密的传输过程：")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/symmetric-encryption.png",alt:""}})]),v._v(" "),t("p",[v._v("这样黑客截获了密文后也无法得知里面的内容，除非他也有密钥。")]),v._v(" "),t("p",[v._v("对称加密看上去没问题了，但其中有一个很大的问题："),t("strong",[v._v("如何把密钥安全地传递给对方")]),v._v("，术语叫“"),t("strong",[v._v("密钥交换")]),v._v("”。")]),v._v(" "),t("div",{staticClass:"custom-block theorem"},[t("p",{staticClass:"title"},[v._v("对称加密为什么要进行密钥交换？对称加密就一个密钥，客户端服务端各保存一份就可以了，为啥要传输交换呢？")]),t("ul",[t("li",[v._v("关键是“如何各保存一份”，两边加密通信必须要使用相同的密钥才行，不交换如何才能保持一致呢？")]),v._v(" "),t("li",[v._v("而且简单的一对一还好说，现实情况是网站要面对成千上万的用户，如何与这么多的客户端保持一致？")]),v._v(" "),t("li",[v._v("还有，如果总使用一个密钥，就很容易被破解，风险高，需要定期更换，最好是一次一密。")]),v._v(" "),t("li",[v._v("所以，为了安全起见，每次通信前双方都要交换密钥，这样就实现了“各保存一份”，用完就扔掉，下次重新交换。")])])]),t("h3",{attrs:{id:"非对称加密"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#非对称加密"}},[v._v("#")]),v._v(" 非对称加密")]),v._v(" "),t("p",[v._v("非对称加密可以解决“"),t("strong",[v._v("密钥交换")]),v._v("”的问题。网站秘密保管私钥，在网上任意分发公钥，你想要登录网站只要用公钥加密就行了，密文只能由私钥持有者才能解密。而黑客因为没有私钥，所以就无法破解密文。")]),v._v(" "),t("p",[v._v("特点：")]),v._v(" "),t("ul",[t("li",[v._v("任何经过 A 的公钥进行加密的信息，只有 A 的私钥才能解密")]),v._v(" "),t("li",[v._v("任何有公钥的人可以确认对方发送的消息是被私钥加密过的")]),v._v(" "),t("li",[v._v("非对称加密解密计算开销远远大于对称加密")]),v._v(" "),t("li",[v._v("公钥加密私钥可以解密，反过来私钥加密公钥是可以解密的")])]),v._v(" "),t("p",[v._v("下面是非对称加密的过程：")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/asymmetric.png",alt:""}})]),v._v(" "),t("p",[v._v("由于黑客不知道后面的密钥是什么，所以也解密不出来。但是非对称加密也面临着风险：")]),v._v(" "),t("p",[v._v("首先非对称加密面临着性能开销的问题，，但因为它们都是基于复杂的数学难题，运算速度很慢，如果仅用非对称加密，虽然保证了安全，但通信速度有如乌龟、蜗牛，实用性就变成了零。")]),v._v(" "),t("p",[v._v("其次，服务端如何和客户端安全通信？")]),v._v(" "),t("ol",[t("li",[v._v("通过公钥加密，客户端没有私钥无法解密。")]),v._v(" "),t("li",[v._v("通过私钥加密，客户端有公钥可以解密。黑客也知道公钥，因为公钥是公开的，所以也不行。")])]),v._v(" "),t("h3",{attrs:{id:"混合加密"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#混合加密"}},[v._v("#")]),v._v(" 混合加密")]),v._v(" "),t("p",[v._v("下面也是一个混合加密的例子：")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/hybrid-encryption.png",alt:""}})]),v._v(" "),t("ol",[t("li",[v._v("客户端索要公钥")]),v._v(" "),t("li",[v._v("服务端返回公钥")]),v._v(" "),t("li",[v._v("客户端用伪随机数成会话秘钥，就是我们对称加密生成的密钥")]),v._v(" "),t("li",[v._v("它用公钥加密之后进行传递("),t("strong",[v._v("这个时候被加密的不是数据 是这个会话秘钥 等于把钥匙加密了")]),v._v(") 这里的公钥就是非对称加密中的公钥 他是由服务器传递过去的。")]),v._v(" "),t("li",[v._v("服务端用非对称加密的私钥去解密 拿到我们的会话秘钥")]),v._v(" "),t("li",[v._v("客户端和服务端都能用同一个会话秘钥进行加解密了（使用的对称加密）")])]),v._v(" "),t("p",[v._v("这样就算传输过程被攻击者截取到了被加密的会话秘钥 他没有服务器的私钥是无法得到会话秘钥的。")]),v._v(" "),t("h2",{attrs:{id:"防篡改-摘要算法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#防篡改-摘要算法"}},[v._v("#")]),v._v(" 防篡改（摘要算法）")]),v._v(" "),t("p",[v._v("HTTPS 第二个目的是对网站服务器进行真实身份认证")]),v._v(" "),t("p",[v._v("先来看一个问题 上一步我们已经解决了数据加密的问题 虽然攻击者无法解密数据 但是他可以"),t("strong",[v._v("篡改数据")]),v._v(" 我们怎么知道数据没被动过呢")]),v._v(" "),t("details",{staticClass:"custom-block details"},[t("summary",[v._v("那就用到了摘要算法，常见算法 MD5, SHA-2")]),v._v(" "),t("ul",[t("li",[v._v("摘要算法: 特殊的“单向”加密算法，它只有算法，没有密钥，加密后的数据无法解密，不能从摘要逆推出原文。")]),v._v(" "),t("li",[v._v("因为摘要算法对输入具有“单向性”和“雪崩效应”，输入的微小不同会导致输出的剧烈变化，所以也被 TLS 用来生成伪随机数")]),v._v(" "),t("li",[v._v("你可以把摘要算法近似地理解成一种特殊的压缩算法，它能够把任意长度的数据“压缩”成固定长度、而且独一无二的“摘要”字符串，就好像是给这段数据生成了一个数字“指纹”。")])])]),v._v(" "),t("p",[v._v("摘要算法保证了“数字摘要”和原文是完全等价的。所以，我们只要在原文后附上它的摘要，就能够保证数据的完整性。")]),v._v(" "),t("ol",[t("li",[v._v("客户端发送用 Hash 函数生成消息摘要。"),t("code",[v._v("MD5(data)...")])]),v._v(" "),t("li",[v._v("服务端收到后使用同样的方法计算信息的摘要，如果一致，就说明消息是完整可信的，没有被修改。")])]),v._v(" "),t("div",{staticClass:"custom-block danger"},[t("p",[v._v("使用摘要算法后同样存在一个问题：黑客可以把"),t("strong",[v._v("摘要也一起修改")]),v._v("了，就像一开始所说的，黑客可以伪装成网站来窃取信息。而反过来，他也可以伪装成你，向网站发送支付、转账等消息，网站没有办法确认你的身份，钱可能就这么被偷走了。")])]),v._v(" "),t("h2",{attrs:{id:"防冒充-ca-证书"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#防冒充-ca-证书"}},[v._v("#")]),v._v(" 防冒充（ca 证书）")]),v._v(" "),t("p",[v._v("其实最后还有一个很关键的点是 我们刚刚所有的假设都基于 客户端的公钥是服务器传递过来的 那如果攻击者伪造了服务器的公钥怎么办呢")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/alvin0216/cdn/raw/master/images/fake.png",alt:""}})]),v._v(" "),t("p",[v._v("解决上述身份验证问题的关键是确保获取的公钥途径是合法的，能够验证服务器的身份信息，为此需要引入权威的第三方机构 CA。")]),v._v(" "),t("ol",[t("li",[t("p",[v._v("服务方 S 向第三方机构 CA 提交公钥、组织信息、个人信息(域名)等信息并申请认证;")])]),v._v(" "),t("li",[t("p",[v._v("CA 通过线上、线下等多种手段验证申请者提供信息的真实性，如组织是否存在、企业是否合法，是否拥有域名的所有权等;")])]),v._v(" "),t("li",[t("p",[v._v("如信息审核通过，CA 会向申请者签发认证文件-证书。")]),v._v(" "),t("ul",[t("li",[v._v("客户端 C 向服务器 S 发出请求时，S 返回证书文件;- 证书包含以下信息：申请者公钥、申请者的组织信息和个人信息、签发机构 CA 的信息、有效时间、证书序列号等信息的明文，同时包含一个签名;")]),v._v(" "),t("li",[v._v("签名的产生算法：首先，使用散列函数计算公开的明文信息的信息摘要，然后，采用 CA 的私钥对信息摘要进行加密，密文即签名;")])])]),v._v(" "),t("li",[t("p",[v._v("客户端 C 向服务器 S 发出请求时，S 返回证书文件;")])]),v._v(" "),t("li",[t("p",[v._v("客户端 C 读取证书中的相关的明文信息，采用相同的散列函数计算得到信息摘要，然后，利用对应 CA 的公钥解密签名数据，对比证书的信息摘要，如果一致，则可以确认证书的合法性，即公钥合法;")])]),v._v(" "),t("li",[t("p",[v._v("客户端然后验证证书相关的域名信息、有效时间等信息;")])]),v._v(" "),t("li",[t("p",[v._v("客户端会内置信任 CA 的证书信息(包含公钥)，如果 CA 不被信任，则找不到对应 CA 的证书，证书也会被判定非法。")])])]),v._v(" "),t("p",[v._v("在这个过程注意几点：")]),v._v(" "),t("ol",[t("li",[v._v("申请证书不需要提供私钥，确保私钥永远只能服务器掌握;")]),v._v(" "),t("li",[v._v("证书的合法性仍然依赖于非对称加密算法，证书主要是增加了服务器信息以及签名;")]),v._v(" "),t("li",[v._v('内置 CA 对应的证书称为根证书，颁发者和使用者相同，自己为自己签名，即自签名证书（为什么说"部署自签 SSL 证书非常不安全"）')]),v._v(" "),t("li",[v._v("证书=公钥+申请者与颁发者信息+签名;")])])])}),[],!1,null,null,null);_.default=s.exports}}]);