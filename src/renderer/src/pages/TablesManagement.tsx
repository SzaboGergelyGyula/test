import Button from '../components/atoms/Button'
import { useGlobalContext } from '../hooks/useGlobalContext'
import { ChangeEvent, useState } from 'react'

export default function TablesManagement(): JSX.Element {
  const [tableName, setTableName] = useState('')
  const [newName, setNewName] = useState('')
  const [updateId, setUpdateId] = useState<number | undefined>(undefined)

  const { tables, fetchTables } = useGlobalContext()

  const createTable = async (): Promise<void> => {
    await window.tableApi.createTable(tableName)
    setTableName('')
    fetchTables()
  }

  const updateTable = async (id: number): Promise<void> => {
    await window.tableApi.updateTable(id, newName)
    setUpdateId(undefined)
    setNewName('')
    fetchTables()
  }

  const deleteTable = async (id: number): Promise<void> => {
    await window.tableApi.deleteTable(id)
    fetchTables()
  }

  return (
    <>
      <div className="m-5">
        <h1>Asztalok kezelése</h1>
        <div>
          <h2>Új asztal készítése</h2>
          <input
            type="text"
            placeholder="Asztal neve"
            defaultValue={tableName}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setTableName(e.target.value)}
            className="border-2 rounded-full h-10 px-3"
          />
          <Button onClick={createTable} variant={'blue'}>
            Készít
          </Button>
        </div>
        <div className="">
          <h2 className="pb-2">Asztalok</h2>
          <ul className="w-full table">
            <li>
              <span className="table-cell min-w-[100px] text-center border-b-2">Id</span>
              <span className="table-cell min-w-[200px] text-center border-b-2">Név</span>
              <span className="table-cell min-w-[180px] text-center border-b-2">Módosítás</span>
              <span className="table-cell min-w-[180px] text-center border-b-2">Törlés</span>
            </li>
            {tables
              ? tables.map((table) => (
                  <li key={table.id}>
                    <div>
                      <span className="table-cell min-w-[100px] text-center border-b-2">
                        {table.id}
                      </span>
                      <span className="table-cell min-w-[200px] text-center border-b-2">
                        {table.name}
                      </span>
                      {updateId !== table.id ? (
                        <span className="table-cell min-w-[100px] text-center border-b-2">
                          <Button variant={'blue'} onClick={(): void => setUpdateId(table.id)}>
                            Módosít
                          </Button>
                        </span>
                      ) : (
                        <span className="table-cell min-w-[180px] text-center border-b-2"></span>
                      )}
                      <span className="table-cell min-w-[100px] text-center border-b-2">
                        <Button
                          variant={'red'}
                          onClick={(): Promise<void> => deleteTable(table.id)}
                        >
                          Töröl
                        </Button>
                      </span>
                    </div>
                    {updateId === table.id ? (
                      <div>
                        <span className="table-cell min-w-[100px] text-center border-b-2">
                          {table.id}
                        </span>
                        <span className="table-cell min-w-[180px] text-center border-b-2 p-2">
                          <input
                            type="text"
                            placeholder="Name"
                            value={newName}
                            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                              setNewName(e.target.value)
                            }
                            className="border-2 rounded-full h-10 px-3"
                          />
                        </span>
                        <span className="table-cell min-w-[180px] text-center border-b-2">
                          <Button
                            variant={'blue'}
                            onClick={(): Promise<void> => updateTable(table.id)}
                          >
                            Módosítás
                          </Button>
                        </span>
                        <span className="table-cell min-w-[180px] text-center border-b-2"></span>
                      </div>
                    ) : null}
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </>
  )
}
