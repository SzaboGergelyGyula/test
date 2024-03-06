import { ipcRenderer } from 'electron'
import { ITableResponse, ITablesResponse } from '../interfaces/ITable'

export const createTable = async (name: string): Promise<ITableResponse> => {
  const response = await ipcRenderer.invoke('create-table', { name })
  return response
}
export const getAllTables = async (): Promise<ITablesResponse> => {
  const response = await ipcRenderer.invoke('get-all-tables')
  return response
}
export const updateTable = async (id: number, newName: string): Promise<ITableResponse> => {
  return ipcRenderer.invoke('update-table', { id, newName })
}
export const deleteTable = async (tableId: number): Promise<ITableResponse> => {
  return ipcRenderer.invoke('delete-table', { tableId })
}
