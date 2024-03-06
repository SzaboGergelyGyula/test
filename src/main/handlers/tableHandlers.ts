import { ipcMain } from 'electron'
import { db } from '../index'
import {
  ICreateTableArgs,
  IDeleteTableArgs,
  IUpdateTableArgs
} from '../../preload/interfaces/ITable'

ipcMain.handle('create-table', (_event, args: ICreateTableArgs) => {
  const sql = 'INSERT INTO tables (name) VALUES (?)'
  const { name } = args

  return new Promise((resolve) => {
    db.run(sql, [name], (err) => {
      if (err) {
        console.log(err.message)
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true })
      }
    })
  })
})

ipcMain.handle('get-all-tables', (_event) => {
  const sql = 'SELECT * FROM tables'

  return new Promise((resolve) => {
    db.all(sql, (err, rows) => {
      if (err) {
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true, tables: rows })
      }
    })
  })
})

ipcMain.handle('update-table', async (_event, args: IUpdateTableArgs) => {
  const { id, newName } = args
  const sql = 'UPDATE tables SET name = ? WHERE id = ?'

  return new Promise((resolve) => {
    db.run(sql, [newName, id], (err) => {
      if (err) {
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true })
      }
    })
  })
})

ipcMain.handle('delete-table', async (_event, args: IDeleteTableArgs) => {
  const { tableId } = args
  const sql = 'DELETE FROM tables WHERE id = ?'

  return new Promise((resolve) => {
    db.run(sql, [tableId], (err) => {
      if (err) {
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true })
      }
    })
  })
})
