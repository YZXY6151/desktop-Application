// electron-main.js
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store').default;

const store = new Store();
let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 1000,
    minHeight: 700,
    frame: true,         // 使用系统原生窗口框架（带标题栏和按钮）
    resizable: true,     // 允许拖边调整大小
    minimizable: true,   // 允许最小化
    maximizable: true,   // 允许最大化
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  // 锁定宽高比例
  mainWindow.setAspectRatio(1000 / 700);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5174');
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  Menu.setApplicationMenu(null);
  mainWindow.webContents.openDevTools({ mode: 'detach' });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// electron-store IPC 监听
ipcMain.on('electron-store-get-data', (event, key) => {
  event.returnValue = store.get(key);
});
ipcMain.on('electron-store-set-data', (event, key, value) => {
  store.set(key, value);
  event.returnValue = true;
});

// 窗口控制 IPC 监听（可保留或移除，已无自定义 titlebar 时可删除）
ipcMain.on('window-minimize', () => {
  mainWindow && mainWindow.minimize();
});
ipcMain.on('window-toggle-maximize', () => {
  if (!mainWindow) return;
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});
ipcMain.on('window-close', () => {
  mainWindow && mainWindow.close();
});


// 初次更新时和npm install一起使用
// npm install @vitejs/plugin-react --save-dev