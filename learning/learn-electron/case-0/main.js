const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

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
  win.webContents.openDevTools();
  ipcMain.handle('ping', () => 'pong');
});

// 管理窗口的生命周期
app.on('window-all-closed', () => {
  // 如果用户不是在 macOS(darwin) 上运行程序，则调用 app.quit()。
  if (process.platform !== 'darwin') app.quit();
});
