export interface ITable {
  id: number
  name: string
}

export interface IOrder {
  id: number
  table_id: number
  discount_value: number
  payed: Date
}

export interface IResource {
  id: number
  category_id: number
  name: string
  price: number
  amount?: number
}

export interface IOrderResource {
  order_id: number
  resource_id: number
  amount?: number
}

export interface IDay {
  id: number
  open: Date
  close?: Date
  summary?: number
}

export interface ICategory {
  id: number
  category_name: string
}
