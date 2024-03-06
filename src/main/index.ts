import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils/dist'
import icon from '../../resources/icon.png?asset'
import { Database } from 'sqlite3'

import './handlers/tableHandlers'
import './handlers/orderHandlers'
import './handlers/resourceHandlers'
import './handlers/orderResourceHandlers'
import './handlers/dayHandlers'
import './handlers/categoriesHandlers'

const dbFilePath = join(app.getPath('appData'), 'vendeglatas.db')

export const db = new Database(dbFilePath)

db.run(`PRAGMA foreign_keys = ON;`)
db.run(`
CREATE TABLE IF NOT EXISTS tables (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name TEXT NOT NULL
);`)
db.run(`
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  table_id INTEGER NOT NULL,
  discount_value INTEGER CHECK (discount_value >= 0 AND discount_value <= 100),
  payed DATE,
  FOREIGN KEY (table_id) REFERENCES "tables"(id) ON DELETE CASCADE
);`)
db.run(`
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  category_name TEXT NOT NULL
);`)
db.run(`
CREATE TABLE IF NOT EXISTS resource (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  category_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  amount INTEGER,
  FOREIGN KEY (category_id) REFERENCES "categories"(id)
);`)
db.run(`
CREATE TABLE IF NOT EXISTS order_resource (
  order_id INTEGER NOT NULL,
  resource_id INTEGER NOT NULL,
  amount INTEGER,
  FOREIGN KEY (order_id) REFERENCES "orders"(id),
  FOREIGN KEY (resource_id) REFERENCES "resource"(id)
);`)
db.run(`
CREATE TABLE IF NOT EXISTS days (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  open DATE NOT NULL,
  close DATE,
  summary INTEGER
);`)

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
