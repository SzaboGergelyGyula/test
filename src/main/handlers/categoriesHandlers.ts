import { ipcMain } from 'electron'
import { db } from '../index'
import {
  ICreateCategoryArgs,
  IUpdateCategoryArgs,
  IDeleteCategoryArgs
} from '../../preload/interfaces/ICategories'

// @ts-ignore (for event)
ipcMain.handle('create-category', (event, args: ICreateCategoryArgs) => {
  const sql = 'INSERT INTO categories (category_name) VALUES (?)'
  const { categoryName } = args

  return new Promise((resolve) => {
    db.run(sql, [categoryName], (err) => {
      if (err) {
        console.log(err.message)
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true })
      }
    })
  })
})

// @ts-ignore (for event)
ipcMain.handle('get-all-categories', (_event) => {
  const sql = 'SELECT * FROM categories'

  return new Promise((resolve) => {
    db.all(sql, (err, rows) => {
      if (err) {
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true, categories: rows })
      }
    })
  })
})

// @ts-ignore (for event)
ipcMain.handle('update-category', async (event, args: IUpdateCategoryArgs) => {
  const { id, newCategoryName } = args
  const sql = 'UPDATE categories SET category_name = ? WHERE id = ?'

  return new Promise((resolve) => {
    db.run(sql, [newCategoryName, id], (err) => {
      if (err) {
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true })
      }
    })
  })
})

// @ts-ignore (for event)
ipcMain.handle('delete-category', async (event, args: IDeleteCategoryArgs) => {
  const { categoryId } = args
  const sql = 'DELETE FROM categories WHERE id = ?'

  return new Promise((resolve) => {
    db.run(sql, [categoryId], (err) => {
      if (err) {
        resolve({ success: false, error: err.message })
      } else {
        resolve({ success: true })
      }
    })
  })
})
