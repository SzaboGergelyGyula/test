import { ipcRenderer } from 'electron'
import { IOrderResourceResonse, IOrderResourcesResonse } from '../interfaces/IOrderResources'

export const createOrderResource = async (
  order_id: number,
  resource_id: number,
  amount?: number
): Promise<IOrderResourceResonse> => {
  const response = await ipcRenderer.invoke('create-order-resource', {
    order_id,
    resource_id,
    amount
  })
  return response
}

export const getAllOrderResources = async (): Promise<IOrderResourcesResonse> => {
  const response = await ipcRenderer.invoke('get-all-order-resources')
  return response
}

export const updateOrderResource = async (
  order_id: number,
  resource_id: number,
  amount?: number
): Promise<IOrderResourceResonse> => {
  const response = await ipcRenderer.invoke('update-order-resource', {
    order_id,
    resource_id,
    amount
  })
  return response
}

export const deleteOrderResource = async (
  order_id: number,
  resource_id: number
): Promise<IOrderResourceResonse> => {
  return ipcRenderer.invoke('delete-order-resource', { order_id, resource_id })
}
