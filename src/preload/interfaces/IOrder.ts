export interface IOrder {
  id: number
  table_id: number
  discount: number
  payed: Date
}

export interface ICreateOrderArgs {
  table_id: number
  discount?: number
  payed?: Date
}

export interface IUpdateOrderArgs {
  id: number
  newTableId: number
  newDiscount?: number
  newPayed?: Date
}

export interface IDeleteOrderArgs {
  id: number
}

export interface IOrderResponse {
  success: boolean
  order?: IOrder
  error?: string
}

export interface IOrdersResponse {
  success: boolean
  orders?: IOrder[]
  error?: string
}
