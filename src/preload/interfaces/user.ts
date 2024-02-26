export interface IUser {
  id: number
  name: string
  email: string
}

export interface ICreateUserArgs {
  name: string
  email: string
}

export interface IUpdateUserArgs {
  userId: number
  newName: string
  newEmail: string
}

export interface IDeleteUserArgs {
  userId: number
}

export interface IUserResponse {
  success: boolean
  user?: IUser
  error?: string
}

export interface IUsersResponse {
  success: boolean
  users?: IUser[]
  error?: string
}
