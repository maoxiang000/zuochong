const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: width,
    height: height,
    transparent: true,      // 开启透明背景
    frame: false,           // 无边框
    alwaysOnTop: true,      // 始终置顶
    hasShadow: false,
    resizable: false,
    skipTaskbar: true,      // 不在任务栏显示
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 鼠标穿透核心逻辑：忽略鼠标事件，除非鼠标在宠物身上
  win.setIgnoreMouseEvents(true, { forward: true });

  // 监听前端发来的鼠标穿透控制
  ipcMain.on('set-ignore-mouse-events', (event, ignore, options) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win.setIgnoreMouseEvents(ignore, { forward: true });
  });

  // 加载页面，并带上 hash 标记，告诉 App.tsx 进入透明模式
  win.loadFile(path.join(__dirname, 'dist', 'index.html'), { hash: 'transparent' });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});