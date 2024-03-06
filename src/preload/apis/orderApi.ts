import { ipcRenderer } from 'electron'
import { IOrderResponse, IOrdersResponse } from '../interfaces/IOrder'

export const createOrder = async (
  table_id: number,
  discount?: number,
  payed?: Date
): Promise<IOrderResponse> => {
  const response = await ipcRenderer.invoke('create-order', { table_id, discount, payed })
  return response
}

export const getAllOrders = async (): Promise<IOrdersResponse> => {
  const response = await ipcRenderer.invoke('get-all-orders')
  return response
}

export const updateOrder = async (
  id: number,
  newTableId: number,
  newDiscount?: number,
  newPayed?: Date
): Promise<IOrderResponse> => {
  const response = await ipcRenderer.invoke('update-order', {
    id,
    newTableId,
    newDiscount,
    newPayed
  })
  return response
}

export const deleteOrder = async (id: number): Promise<IOrderResponse> => {
  return ipcRenderer.invoke('delete-order', { id })
}
