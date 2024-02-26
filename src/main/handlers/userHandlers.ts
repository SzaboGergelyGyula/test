import { ipcMain } from 'electron'
import { db } from '../index'

ipcMain.handle('create-user', (event, args) => {
  const { name, email } = args
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)'
  return new Promise((resolve) => {
    db.run(sql, [name, email], (err) => {
      if (err) {
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true })
      }
    })
  })
})

ipcMain.handle('get-all-users', (event) => {
  const sql = 'SELECT * FROM users'
  return new Promise((resolve) => {
    db.all(sql, (err, rows) => {
      if (err) {
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true, users: rows })
      }
    })
  })
})

ipcMain.handle('update-user', async (event, args) => {
  const { id, name, email } = args
  const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?'

  return new Promise((resolve) => {
    db.run(sql, [name, email, id], (err) => {
      if (err) {
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true })
      }
    })
  })
})

ipcMain.handle('delete-user', async (event, args) => {
  const { id } = args
  const sql = 'DELETE FROM users WHERE id = ?'

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
