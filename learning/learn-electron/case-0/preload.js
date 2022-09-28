const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  // 能暴露的不仅仅是函数，我们还可以暴露变量
});

window.addEventListener('DOMContentLoaded', () => {
  for (const dependency of ['chrome', 'node', 'electron']) {
    const p = document.createElement('p');
    p.innerHTML = `${dependency}: ${process.versions[dependency]}`;
    document.body.appendChild(p);
  }
});
