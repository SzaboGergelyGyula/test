import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { createUser, getAllUsers, updateUser, deleteUser } from './apis/userApi'

// Custom APIs for renderer
const userApi = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
  // node: () => process.versions.node
  // ping: () => ipcRenderer.invoke('ping')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('userApi', userApi)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
