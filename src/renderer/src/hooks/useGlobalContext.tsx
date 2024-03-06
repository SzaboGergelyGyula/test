import { createContext, useContext, useEffect, useState } from 'react'
import {
  IDay,
  IOrder,
  IOrderResource,
  IResource,
  ITable,
  ICategory
} from '../interfaces/interfaces'

type GlobalContextProviderProps = {
  children: React.ReactNode
}

type GlobalContextProps = {
  tables: ITable[]
  orders: IOrder[]
  resources: IResource[]
  orderResources: IOrderResource[]
  days: IDay[]
  categories: ICategory[]
  fetchTables: () => void
  fetchOrders: () => void
  fetchResources: () => void
  fetchOrderResources: () => void
  fetchDays: () => void
  fetchCategories: () => void
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined)

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children
}: GlobalContextProviderProps) => {
  const [tables, setTables] = useState<ITable[]>([])
  const [orders, setOrders] = useState<IOrder[]>([])
  const [resources, setResources] = useState<IResource[]>([])
  const [orderResources, setOrderResources] = useState<IOrderResource[]>([])
  const [days, setDays] = useState<IDay[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])

  useEffect(() => {
    fetchTables()
    fetchOrders()
    fetchResources()
    fetchOrderResources()
    fetchDays()
    fetchCategories()
  }, [])

  const fetchTables = async (): Promise<void> => {
    const response = await window.tableApi.getAllTables()
    if (response.success) {
      setTables(response.tables)
    }
  }

  const fetchOrders = async (): Promise<void> => {
    const response = await window.orderApi.getAllOrders()
    if (response.success) {
      setOrders(response.orders)
    }
  }

  const fetchResources = async (): Promise<void> => {
    const response = await window.resourceApi.getAllResources()
    if (response.success) {
      setResources(response.resources)
    }
  }

  const fetchOrderResources = async (): Promise<void> => {
    const response = await window.orderResourceApi.getAllOrderResources()
    if (response.success) {
      setOrderResources(response.orderResources)
    }
  }

  const fetchDays = async (): Promise<void> => {
    const response = await window.dayApi.getAllDays()
    if (response.success) {
      setDays(response.days)
    }
  }

  const fetchCategories = async (): Promise<void> => {
    const response = await window.categoryApi.getAllCategories()
    if (response.success) {
      setCategories(response.categories)
    }
  }

  const value = {
    tables,
    orders,
    resources,
    orderResources,
    days,
    categories,
    fetchTables,
    fetchOrders,
    fetchResources,
    fetchOrderResources,
    fetchDays,
    fetchCategories
  }

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export function useGlobalContext(): GlobalContextProps {
  const context = useContext(GlobalContext)
  if (context === undefined) {
    throw new Error('GlobalContext must be used within an useGlobalContextProvider')
  }
  return context
}
