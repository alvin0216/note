---
title: 点击劫持
date: 2020-09-06 00:02:57
---

> 一种视觉上的欺骗手段，用户点击后实际上点击的是黑客构建的按钮...可以利用图片或者 iframe

场景：“点击查看美女图片”、“点击获取金币”。。。

### ClickJacking 示例

下面通过两个简单的页面来进行演示说明。alert 页面上有一个按钮，点击时调用 alert() 函数。

```html
<!-- alert.html -->
<button onclick="alert('我被点击了!')">alert页面按钮</button>
```

clickjacking 页面上有一个没有绑定点击事件的按钮，同时在 firame 中引入 alert 页面，通过设置它的样式，让 alert 页面透明显示，并将其中的按钮与 clickjacking 页面的按钮位置重叠。

```html
<!-- clickjacking.html -->
<button>当前页面按钮</button>
<iframe
  src="http://127.0.0.1:5501/24/views/alert.html"
  frameborder="0"
  style="opacity: 0.5;position:absolute;left: 0;top:0"
></iframe>
```

当用户想点击 clickjacking 页面按钮时，实际上点击的却是 alert 页面按钮。

### ClickJacking 防御

通过例子可以看到 ClickJacking 的攻击原理主要是利用了 iframe，所以可以通过设置响应头部字段 X-Frame-Options HTTP 来告诉浏览器允许哪些域名引用当前页面。X-Frame-Options 的值有 3 个，具体如下。

- `DENY`：浏览器会拒绝当前页面加载任何 frame 页面；
- `SAMEORIGIN`：frame 页面的地址只能为同源域名下的页面；
- `ALLOW-FROM origin`：允许 frame 加载的页面地址；

---

除了上面的防御手段，我们还可以用漏洞扫描工具（比如 [BeEF](https://beefproject.com) 对网站进行测试，提前发现安全漏洞。

点击劫持算是一种很多人不大关注的攻击，他需要诱使用户与页面进行交互，实施的攻击成本更高。另外开发者可能会觉得是用户犯蠢，不重视这种攻击方式。
