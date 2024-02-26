import { ipcRenderer } from 'electron'
import {
  ICreateUserArgs,
  IDeleteUserArgs,
  IUpdateUserArgs,
  IUserResponse,
  IUsersResponse
} from '../interfaces/user'

export const createUser = async (args: ICreateUserArgs): Promise<IUserResponse> => {
  const response = await ipcRenderer.invoke('create-user', { args })
  return response
}
export const getAllUsers = async (): Promise<IUsersResponse> => {
  const response = await ipcRenderer.invoke('get-all-users')
  return response
}
export const updateUser = async (args: IUpdateUserArgs): Promise<IUserResponse> => {
  return ipcRenderer.invoke('update-user', { args })
}
export const deleteUser = async (args: IDeleteUserArgs): Promise<IUserResponse> => {
  return ipcRenderer.invoke('delete-user', { args })
}
