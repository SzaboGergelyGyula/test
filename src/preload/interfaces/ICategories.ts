export interface ICategory {
  id: number
  categoryName: string
}

export interface ICreateCategoryArgs {
  categoryName: string
}

export interface IUpdateCategoryArgs {
  id: number
  newCategoryName: string
}

export interface IDeleteCategoryArgs {
  categoryId: number
}

export interface ICategoryResponse {
  success: boolean
  category?: ICategory
  error?: string
}

export interface ICategoriesResponse {
  success: boolean
  categories?: ICategory[]
  error?: string
}
