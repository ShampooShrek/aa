const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("app", {
  send: (channel, args) => {
    ipcRenderer.send(channel, args)
  },
  on: (channel, listener) => {
    ipcRenderer.on(channel, listener)
  }
})