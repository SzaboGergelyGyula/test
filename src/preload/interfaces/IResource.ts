export interface IResource {
  id: number
  categoryId: number
  name: string
  price: number
  amount?: number
}

export interface ICreateResourceArgs {
  name: string
  categoryId: number
  price: number
  amount?: number
}

export interface IUpdateResourceArgs {
  id: number
  newCategoryId: number
  newName: string
  newPrice: number
  newAmount?: number
}

export interface IDeleteResourceArgs {
  id: number
}

export interface IResourceResponse {
  success: boolean
  resource?: IResource
  error?: string
}

export interface IResourcesResponse {
  success: boolean
  resources?: IResource[]
  error?: string
}
