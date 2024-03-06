import { ipcRenderer } from 'electron'
import { ICategoryResponse, ICategoriesResponse } from '../interfaces/ICategories'

export const createCategory = async (categoryName: string): Promise<ICategoryResponse> => {
  const response = await ipcRenderer.invoke('create-category', { categoryName })
  return response
}
export const getAllCategories = async (): Promise<ICategoriesResponse> => {
  const response = await ipcRenderer.invoke('get-all-categories')
  return response
}
export const updateCategory = async (
  id: number,
  newCategoryName: string
): Promise<ICategoryResponse> => {
  return ipcRenderer.invoke('update-category', { id, newCategoryName })
}
export const deleteCategory = async (categoryId: number): Promise<ICategoryResponse> => {
  return ipcRenderer.invoke('delete-category', { categoryId })
}
