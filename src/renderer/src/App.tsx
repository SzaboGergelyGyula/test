import { ChangeEvent, useEffect, useState } from 'react'

interface IUser {
  id: number
  name: string
  email: string
}

function App(): JSX.Element {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [users, setUsers] = useState<IUser[]>([])

  const createUser = async (): Promise<void> => {
    await window.userApi.createUser(name, email)
    setName('')
    setEmail('')
    fetchUsers()
  }

  const updateUser = async (id: number, newName: string, newEmail: string): Promise<void> => {
    await window.userApi.updateUser(id, newName, newEmail)
    fetchUsers()
  }

  const deleteUser = async (id: number): Promise<void> => {
    await window.userApi.deleteUser(id)
    fetchUsers()
  }

  const fetchUsers = async (): Promise<void> => {
    const response = await window.userApi.getAllUsers()
    if (response.success) {
      setUsers(response.users)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Electron-Vite React Tailwind Sqlite3 Example base
      </h1>
      <div>
        <h1>User Management</h1>
        <div>
          <h2>Create User</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
          />
          <button onClick={createUser}>Create</button>
        </div>
        <div>
          <h2>Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} - {user.email}
                <> </>
                <button
                  onClick={(): Promise<void> => updateUser(user.id, 'New Name', 'new@example.com')}
                >
                  Update
                </button>
                <> </>
                <button onClick={(): Promise<void> => deleteUser(user.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
