const { app, BrowserWindow, ipcMain } = require('electron')
const electronStore = require("electron-store")
const path = require('path')

const store = new electronStore()

const createWindow = () => {

  const mainWindow = new BrowserWindow({
    width: 800,
    minWidth: 800,
    height: 600,
    minHeight: 600,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadURL('http://localhost:3000')

  ipcMain.on("minimize-window", () => {
    mainWindow.minimize()
  })

  ipcMain.on("maximize-window", () => {
    mainWindow.isMaximized() ? mainWindow.unmaximize()
      : mainWindow.maximize()
  })

  ipcMain.on("close-window", () => {
    mainWindow.close()
  })
}

ipcMain.on("get-store", (event, key) => {
  const resp = store.get(key)

  if(resp) return event.reply("resp-store", resp)
  else return event.reply("resp-store", false)
})

ipcMain.on("set-users", (event, user) => {
  const users = store.get("users")
  if(users) {
    const newUsers = [...users, user]
    store.set("users", newUsers)
  } else {
    store.set("users", [user])
  }
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

