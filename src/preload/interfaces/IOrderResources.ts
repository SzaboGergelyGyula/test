export interface IOrderResource {
  order_id: number
  resource_id: number
  amount?: number
}

export interface ICreateOrderResourceArgs {
  order_id: number
  resource_id: number
  amount?: number
}

export interface IUpdateOrderResourceArgs {
  order_id: number
  resource_id: number
  amount?: number
}

export interface IDeleteOrderResourceArgs {
  order_id: number
  resource_id: number
}

export interface IOrderResourceResonse {
  success: boolean
  orderResource?: IOrderResource
  error?: string
}

export interface IOrderResourcesResonse {
  success: boolean
  orderResources?: IOrderResource[]
  error?: string
}
