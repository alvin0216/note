const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // 能暴露的不仅仅是函数，我们还可以暴露变量
});

// All the Node.js APIs are available in the preload process.
// 它拥有与Chrome扩展一样的沙盒。
// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector);
//     if (element) element.innerText = text;
//   };

//   for (const dependency of ['chrome', 'node', 'electron']) {
//     replaceText(`${dependency}-version`, process.versions[dependency]);
//   }
// });

const btn1 = this.document.querySelector('#btn1');
const BrowserWindow = require('electron').remote.BrowserWindow;

window.onload = function () {
  btn1.onclick = () => {
    newWin = new BrowserWindow({
      width: 500,
      height: 500,
    });
    newWin.loadFile('yellow.html');
    newWin.on('close', () => {
      win = null;
    });
  };
};
