---
title: iframe 打开全屏无效
date: 2022-03-30 11:21:42
sidebar: auto
tags:
  - 全屏
categories:
  - 技术漫谈
---

直接在 `iframe` 页面调用 `requestFullScreen()` 是没有效果的，需要在当前 `iframe` 的 `parent` 页面调用.

```js
function fullScreen(iframeId) {
  /* 获取父类的document */
  var parentDoc = parent.document;
  /* 定义一个接收元素的变量 */
  var thisIframe = null;
  $('iframe', parentDoc).each(function (index, e) {
    if (e.id == iframeId) {
      thisIframe = e;
    }
  });

  requestFullScreen(thisIframe);
}

/**
 * 调用全屏方法
 */
var requestFullScreen = function (element) {
  if (window.ActiveXObject) {
    var WsShell = new ActiveXObject('WScript.Shell');
    WsShell.SendKeys('{F11}');
  }
  //HTML W3C 提议
  else if (element.requestFullScreen) {
    element.requestFullScreen();
  }
  //IE11
  else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
  // Webkit (works in Safari5.1 and Chrome 15)
  else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
  // Firefox (works in nightly)
  else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  }
};
```
