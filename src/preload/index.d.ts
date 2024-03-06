import { ElectronAPI } from '@electron-toolkit/preload'
import { ICategory } from '@renderer/interfaces/interfaces'

declare global {
  interface Window {
    electron: ElectronAPI
    tableApi: {
      createTable: (name: string) => Promise<void>
      updateTable: (id: number, newName: string) => Promise<void>
      deleteTable: (id: number) => Promise<void>
      getAllTables: () => Promise<{ success: boolean; tables: ITable[] }>
    }
    orderApi: {
      createOrder: (table_id: number, discount?: number, payed?: Date) => Promise<void>
      updateOrder: (
        id: number,
        newTableId: number,
        newDiscount?: number,
        newPayed?: Date
      ) => Promise<void>
      deleteOrder: (id: number) => Promise<void>
      getAllOrders: () => Promise<{ success: boolean; orders: IOrder[] }>
    }
    resourceApi: {
      createResource: (
        name: string,
        categoryId: number,
        price: number,
        amount?: number
      ) => Promise<void>
      updateResource: (
        id: number,
        newName: string,
        newCategoryId: number,
        newPrice: number,
        newAmount?: number
      ) => Promise<void>
      deleteResource: (id: number) => Promise<void>
      getAllResources: () => Promise<{ success: boolean; resources: IResource[] }>
    }
    orderResourceApi: {
      createOrderResource: (order_id: number, resource_id: number, amount?: number) => Promise<void>
      updateOrderResource: (order_id: number, resource_id: number, amount?: number) => Promise<void>
      deleteOrderResource: (order_id: number, resource_id: number) => Promise<void>
      getAllOrderResources: () => Promise<{ success: boolean; orderResources: IOrderResource[] }>
    }
    dayApi: {
      createDay: (open: Date, close?: Date, summary?: number) => Promise<void>
      updateDay: (id: number, open: Date, close?: Date, summary?: number) => Promise<void>
      deleteDay: (id: number) => Promise<void>
      getAllDays: () => Promise<{ success: boolean; days: IDay[] }>
    }
    categoryApi: {
      createCategory: (categoryName: string) => Promise<void>
      updateCategory: (id: number, newCategoryName: string) => Promise<void>
      deleteCategory: (id: number) => Promise<void>
      getAllCategories: () => Promise<{ success: boolean; categories: ICategory[] }>
    }
  }
}
