export interface ITable {
  id: number
  name: string
}

export interface ICreateTableArgs {
  name: string
}

export interface IUpdateTableArgs {
  id: number
  newName: string
}

export interface IDeleteTableArgs {
  tableId: number
}

export interface ITableResponse {
  success: boolean
  table?: ITable
  error?: string
}

export interface ITablesResponse {
  success: boolean
  tables?: ITable[]
  error?: string
}
