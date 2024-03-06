import { ipcMain } from 'electron'
import { db } from '../index'
import {
  ICreateOrderResourceArgs,
  IUpdateOrderResourceArgs,
  IDeleteOrderResourceArgs
} from '../../preload/interfaces/IOrderResources'

ipcMain.handle('create-order-resource', (_event, args: ICreateOrderResourceArgs) => {
  const { order_id, resource_id, amount } = args
  const sql = `INSERT INTO "order_resource" (order_id, resource_id, amount) VALUES (?, ?, ?)`
  const values = [order_id, resource_id, amount || null]

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

ipcMain.handle('get-all-order-resources', (_event) => {
  const sql = 'SELECT * FROM order_resource'

  return new Promise((resolve) => {
    db.all(sql, (err, rows) => {
      if (err) {
        console.log(err)
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true, orderResources: rows })
      }
    })
  })
})

ipcMain.handle('update-order-resource', (_event, args: IUpdateOrderResourceArgs) => {
  const { order_id, resource_id, amount } = args
  const sql = `UPDATE order_resource SET amount = ? WHERE order_id = ? AND resource_id = ?`
  const values = [amount || null, order_id, resource_id]

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

ipcMain.handle('delete-order-resource', (_event, args: IDeleteOrderResourceArgs) => {
  const { order_id, resource_id } = args
  const sql = 'DELETE FROM order_resource WHERE order_id = ? AND resource_id = ?'
  const values = [order_id, resource_id]

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
