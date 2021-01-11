---
title: iframe 和 postMessage
date: 2020-07-14 13:00:28
sidebar: 'auto'
tags:
  - HTML
  - postMessage
categories:
  - HTML & CSS
---

- [MDN iframe](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)
- [qiankun 为什么不是-iframe](https://www.yuque.com/kuitos/gky7yw/gesexv)

## iframe

:::details iframe 常用属性

1. frameborder:是否显示边框，1(yes),0(no)
2. height:框架作为一个普通元素的高度，建议在使用 css 设置。
3. width:框架作为一个普通元素的宽度，建议使用 css 设置。
4. name:框架的名称，window.frames[name]时专用的属性。
5. scrolling:框架的是否滚动。yes,no,auto。
6. src：内框架的地址，可以使页面地址，也可以是图片的地址。
7. srcdoc , 用来替代原来 HTML body 里面的内容。但是 IE 不支持, 不过也没什么卵用
8. sandbox: 对 iframe 进行一些列限制，IE10+支持

:::

直接放代码：

```ts
const Iframe: React.FC<{}> = props => {
  return (
    <div className='box' style={{ height: '60vh' }}>
      <iframe
        // props
        id='aliIframe'
        name='aliIframe'
        src='http://127.0.0.1:5500/dist/index.html'
        // UI
        width='100%'
        height='100%' // 坑点注意 这里 height 100vh 是无法生效的； height='800' 生效 800px
        frameBorder='0'>
        您的浏览器不支持 iframe
      </iframe>
    </div>
  );
};
```

## postMessage

如何进行跨域的通信，其实就是通过这个 [postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

```ts
// parent to iframe
aliIframeRef.current?.contentWindow?.postMessage(
  { method: 'parentToIframe', data: { name: 'alibaba' } },
  '*'
);

// iframe
window.addEventListener('message', e => {
  if (e.data.method === 'parentToIframe') {
    document.getElementById('message').innerHTML = `接收到父级发来的消息 ${JSON.stringify(
      e.data.data
    )}`;
  }
});
```

反过来也是一样。

完整代码：

:::: tabs

::: tab 效果

![](https://gitee.com/alvin0216/cdn/raw/master/images/iframe.png)

:::

::: tab Iframe.tsx

```tsx
import React, { useState, useEffect, useRef } from 'react';

function useIframeMethod() {
  const aliIframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    aliIframeRef.current?.addEventListener('load', () => {
      console.log('iframe 加载完成');
    });

    window.addEventListener('message', e => {
      if (e.data.method === 'iframeToParent') {
        // 这里可以对 e.origin 进行判断
        alert(`接收到 iframe 的消息 ${JSON.stringify(e.data.data)}`);
      }
    });
  }, []);

  return {
    aliIframeRef,
    // JavaScript获取iframe子页面全局变量 document.getElementById('aliIframe').contentWindow
    getWindow() {
      try {
        console.log(aliIframeRef.current?.contentWindow);
      } catch (error) {
        alert('注意 这里同域下才可以获取 iframe 的 window 对象');
      }
    },
    emit() {
      console.log(aliIframeRef.current?.contentWindow?.postMessage);

      aliIframeRef.current?.contentWindow?.postMessage(
        { method: 'parentToIframe', data: { name: 'alibaba' } },
        '*'
      );
    }
  };
}

interface IframeProps {}

const Iframe: React.FC<IframeProps> = props => {
  const { aliIframeRef, getWindow, emit } = useIframeMethod();

  return (
    <>
      <div className='box' style={{ height: '60vh' }}>
        <iframe
          // props
          ref={aliIframeRef}
          id='aliIframe'
          name='aliIframe'
          src='http://127.0.0.1:5500/dist/index.html'
          // UI
          width='100%'
          height='100%' // 坑点注意 这里 height 100vh 是无法生效的； height='800' 生效 800px
          frameBorder='0'>
          您的浏览器不支持 iframe
        </iframe>
      </div>

      <hr />
      <ul>
        <li>
          <a href='http://www.baidu.com' target='aliIframe'>
            iframe 跳转到指定网址
          </a>
        </li>
        <li>
          <button onClick={getWindow}>获取子页面全局变量</button>
        </li>
        <li>
          <button onClick={emit}>发送消息给 iframe</button>
        </li>
      </ul>
    </>
  );
};

export default Iframe;
```

:::

::: tab index.html (iframe 开的页面)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h2>window.number = 18</h2>
    <button id="btn1">给父级发送消息</button>
    <p id="message"></p>

    <script>
      window.number = 18;

      window.addEventListener('message', e => {
        if (e.data.method === 'parentToIframe') {
          document.getElementById('message').innerHTML = `接收到父级发来的消息 ${JSON.stringify(
            e.data.data
          )}`;
        }
      });

      document.getElementById('btn1').onclick = function() {
        window.parent.postMessage(
          {
            method: 'iframeToParent',
            data: { name: 'alibaba' }
          },
          '*'
        );
      };
    </script>
  </body>
</html>
```

:::

::::
