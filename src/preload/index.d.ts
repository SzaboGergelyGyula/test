import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    userApi: {
      createUser: (name: string, email: string) => Promise<void>
      updateUser: (id: number, newName: string, newEmail: string) => Promise<void>
      deleteUser: (id: number) => Promise<void>
      getAllUsers: () => Promise<{ success: boolean; users: IUser[] }>
    }
  }
}
