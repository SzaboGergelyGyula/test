import { ipcRenderer } from 'electron'
import { IResourceResponse, IResourcesResponse } from '../interfaces/IResource'

export const createResource = async (
  name: string,
  categoryId: number,
  price: number,
  amount?: number
): Promise<IResourceResponse> => {
  const response = await ipcRenderer.invoke('create-resource', { name, categoryId, price, amount })
  return response
}

export const getAllResources = async (): Promise<IResourcesResponse> => {
  const response = await ipcRenderer.invoke('get-all-resources')
  return response
}

export const updateResource = async (
  id: number,
  newName: string,
  newCategoryId: number,
  newPrice: number,
  newAmount?: number
): Promise<IResourceResponse> => {
  const response = await ipcRenderer.invoke('update-resource', {
    id,
    newName,
    newCategoryId,
    newPrice,
    newAmount
  })
  return response
}

export const deleteResource = async (id: number): Promise<IResourceResponse> => {
  return ipcRenderer.invoke('delete-resource', { id })
}
