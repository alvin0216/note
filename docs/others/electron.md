---
title: Electron
date: 2022-05-05 17:22:23
sidebar: auto
tags:
  - electron
categories:
  - 技术漫谈
---

# Electron 入门

[Electron 中文网](https://www.electronjs.org/zh/docs/latest)

[[toc]]

## 第一个 electron 程序

```bash
├── index.html
├── main.js
└── package.json
```

**package.json**

```json {2}
{
  "main": "main.js",
  "scripts": {
    "dev": "electron ."
  },
  "devDependencies": {
    "electron": "^21.0.0"
  }
}
```

### 创建页面

在可以为我们的应用创建窗口前，我们需要先创建加载进该窗口的内容。 在 Electron 中，各个窗口显示的内容可以是本地 HTML 文件，也可以是一个远程 url。

```html
<head>
  <title>Electron demo</title>
</head>
<body>
  <h2>Hello Electron</h2>
</body>
```

### electron 加载页面

将它加载进应用窗口中。 要做到这一点，你需要 两个 `Electron` 模块：

- [app](https://www.electronjs.org/zh/docs/latest/api/app) 模块，它控制应用程序的事件生命周期。
- [BrowserWindow](https://www.electronjs.org/zh/docs/latest/api/browser-window) 模块，它创建和管理应用程序 窗口

```js
const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  // 将index.html加载进一个新的BrowserWindow实例
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile('index.html');
  // 也可以是一个地址 比如 win.loadFile('http://localhost:3000');
};

app.whenReady().then(() => {
  createWindow();
});
```

### 管理窗口的生命周期

```jsx
app.whenReady().then(() => {
  createWindow();
  // 如果没有窗口打开则打开一个窗口 (macOS)
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 关闭所有窗口时退出应用 (Windows & Linux)
app.on('window-all-closed', () => {
  // 如果用户不是在 macOS(darwin) 上运行程序，则调用 app.quit()。
  if (process.platform !== 'darwin') app.quit();
});
```

### 读取 node 环境变量

我们知道渲染进程默认跑在网页页面上，而并非 Node.js 里。

Electron 的主进程是一个拥有着完全操作系统访问权限的 Node.js 环境。那么我们可以在渲染器的网页加载之前注入 **预加载脚本** 获取我们想要的 node 环境变量。

```js {7-9}
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
  win.webContents.openDevTools();
};
```

```js
// preload.js (这里不能引入 node 一些方法哦，比如 const fs = require('fs') 会报错)
window.addEventListener('DOMContentLoaded', () => {
  for (const dependency of ['chrome', 'node', 'electron']) {
    const p = document.createElement('p');
    p.innerHTML = `${dependency}: ${process.versions[dependency]}`;
    document.body.appendChild(p);
  }
});
```

### contextBridge 扩展属性

预加载脚本像 `Chrome` 扩展的 内容脚本（`Content Script`）一样，会在渲染器的网页加载之前注入。 如果你想向渲染器加入需要**特殊权限**的功能，你可以通过 `contextBridge` 接口定义 全局对象。

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // 能暴露的不仅仅是函数，我们还可以暴露变量
});
```

```html
<head>
  <title>Electron demo</title>
</head>
<body>
  <h2>Hello Electron</h2>
  <script>
    console.log(window.versions);
  </script>
</body>
```

## 在进程之间通信

我们之前提到，Electron 的主进程和渲染进程有着清楚的分工并且不可互换。 这代表着无论是从渲染进程直接访问 Node.js 接口，亦或者是从主进程访问 HTML 文档对象模型 (DOM)，都是不可能的。

<!-- 例如我们在 `preload.js` 写 `const fs = require('fs');` 就会报错的 -->

解决这一问题的方法是使用进程间通信 (IPC)。

- emit: 在预处理脚本中暴露一个被称为 `ipcRenderer.invoke` 的函数来触发该处理程序
- on: 在主进程中设置你的 handle 监听器。`ipcMain.handle`

```js
// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  ping: () => ipcRenderer.invoke('ping'),
});
```

```js
// main.js
app.whenReady().then(() => {
  // 将index.html加载进一个新的BrowserWindow实例
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadFile('index.html');
  ipcMain.handle('ping', () => 'pong');
});
```

最终我们可以在页面中调用 `contextBridge` 拓展的属性 `verions.ping` 触发：

```html
<h2>Hello Electron</h2>
<script>
  const func = async () => {
    const response = await window.versions.ping();
    console.log(response); // 打印 'pong'
  };
  func();
</script>
```

预加载脚本包含在浏览器窗口加载网页之前运行的代码。 其可访问 DOM 接口和 Node.js 环境，并且经常在其中使用 contextBridge 接口将特权接口暴露给渲染器。

由于主进程和渲染进程有着完全不同的分工，Electron 应用通常使用预加载脚本来设置进程间通信 (IPC) 接口以在两种进程之间传输任意信息。
