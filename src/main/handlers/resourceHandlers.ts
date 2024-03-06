import { ipcMain } from 'electron'
import { db } from '../index'
import {
  ICreateResourceArgs,
  IDeleteResourceArgs,
  IUpdateResourceArgs
} from '../../preload/interfaces/IResource'

ipcMain.handle('create-resource', (_event, args: ICreateResourceArgs) => {
  const { name, categoryId, price, amount } = args
  const sql = `INSERT INTO "resource" (name, category_id, price, amount) VALUES (?, ?, ?, ?)`
  const values = [name, categoryId, price, amount || null]

  return new Promise((resolve) => {
    db.run(sql, values, (err) => {
      if (err) {
        console.log(err.message)
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true })
      }
    })
  })
})

ipcMain.handle('get-all-resources', (_event) => {
  const sql = 'SELECT * FROM resource'

  return new Promise((resolve) => {
    db.all(sql, (err, rows) => {
      if (err) {
        console.log(err)
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true, resources: rows })
      }
    })
  })
})

ipcMain.handle('update-resource', async (_event, args: IUpdateResourceArgs) => {
  const { id, newName, newCategoryId, newPrice, newAmount } = args
  const sql = `UPDATE resource SET name = ?, category_id = ?, price = ?, amount = ? WHERE id = ?`
  const values = [newName, newCategoryId, newPrice, newAmount || null, id]

  return new Promise((resolve) => {
    db.run(sql, values, (err) => {
      if (err) {
        console.log(err)
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true })
      }
    })
  })
})

ipcMain.handle('delete-resource', async (_event, args: IDeleteResourceArgs) => {
  const { id } = args
  const sql = 'DELETE FROM resource WHERE id = ?'

  return new Promise((resolve) => {
    db.run(sql, [id], (err) => {
      if (err) {
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true })
      }
    })
  })
})
