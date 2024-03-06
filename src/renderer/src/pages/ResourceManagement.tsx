import Button from '../components/atoms/Button'
import { useGlobalContext } from '../hooks/useGlobalContext'
import { ChangeEvent, useState } from 'react'

export default function ResourceManagement(): JSX.Element {
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>()
  const [amount, setAmount] = useState<number>()
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined)

  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState<number>()
  const [newAmount, setNewAmount] = useState<number>()
  const [newCategoryId, setNewCategoryId] = useState<number | undefined>(undefined)
  const [updateId, setUpdateId] = useState<number | undefined>(undefined)

  const { resources, fetchResources, categories } = useGlobalContext()

  const createResource = async (): Promise<void> => {
    if (price && categoryId)
      await window.resourceApi.createResource(name, categoryId, price, amount)
    setName('')
    setCategoryId(undefined)
    setPrice(undefined)
    setAmount(0)
    fetchResources()
  }

  const updateResource = async (id: number): Promise<void> => {
    if (newCategoryId && newPrice && newAmount)
      await window.resourceApi.updateResource(id, newName, newCategoryId, newPrice, newAmount)
    setUpdateId(undefined)
    setNewName('')
    setNewCategoryId(undefined)
    setNewPrice(undefined)
    setNewAmount(0)
    fetchResources()
  }

  const deleteResource = async (id: number): Promise<void> => {
    await window.resourceApi.deleteResource(id)
    fetchResources()
  }

  return (
    <>
      <div className="m-5">
        <h1>Leltár kezelése</h1>
        <div>
          <h2>Új elem hozzáadása</h2>
          <input
            type="text"
            placeholder="Elem neve"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setName(e.target.value)}
            className="border-2 rounded-full h-10 px-3 m-2"
          />
          <input
            type="number"
            placeholder="Ár"
            value={price !== undefined ? price : ''}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              setPrice(parseInt(e.target.value))
            }
            className="border-2 rounded-full h-10 px-3 m-2"
          />
          <input
            type="number"
            placeholder="Mennyiség"
            value={amount !== undefined ? amount : ''}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              setAmount(parseInt(e.target.value))
            }
            className="border-2 rounded-full h-10 px-3 m-2"
          />
          <select
            onChange={(e: ChangeEvent<HTMLSelectElement>): void =>
              setCategoryId(parseInt(e.target.value))
            }
            defaultValue="none"
            className="border-2 rounded-full h-10 px-3 m-2"
          >
            <option value="none" disabled>
              Válassz kategóriát!
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
          <Button onClick={createResource} variant={'blue'}>
            Create
          </Button>
        </div>
        <div>
          <h2>Resources</h2>
          <ul className="w-full table">
            <li>
              <span className="table-cell min-w-[100px] text-center border-b-2">Id</span>
              <span className="table-cell min-w-[200px] text-center border-b-2">Név</span>
              <span className="table-cell min-w-[100px] text-center border-b-2">Ár</span>
              <span className="table-cell min-w-[100px] text-center border-b-2">Készlet</span>
              <span className="table-cell min-w-[200px] text-center border-b-2">Kategória</span>
              <span className="table-cell min-w-[180px] text-center border-b-2">Módosítás</span>
              <span className="table-cell min-w-[180px] text-center border-b-2">Törlés</span>
            </li>
            {resources.map((resource) => (
              <li key={resource.id}>
                <div>
                  <span className="table-cell min-w-[100px] text-center border-b-2">
                    {resource.id}
                  </span>
                  <span className="table-cell min-w-[200px] text-center border-b-2">
                    {resource.name}
                  </span>
                  <span className="table-cell min-w-[100px] text-center border-b-2">
                    {resource.price}
                  </span>
                  <span className="table-cell min-w-[100px] text-center border-b-2">
                    {resource.amount}
                  </span>
                  <span className="table-cell min-w-[200px] text-center border-b-2">
                    {
                      categories.find((category) => resource.category_id === category.id)
                        ?.category_name
                    }
                  </span>
                  {updateId !== resource.id ? (
                    <span className="table-cell min-w-[100px] text-center border-b-2">
                      <Button variant={'blue'} onClick={(): void => setUpdateId(resource.id)}>
                        Update
                      </Button>
                    </span>
                  ) : (
                    <span className="table-cell min-w-[180px] text-center border-b-2"></span>
                  )}
                  <span className="table-cell min-w-[100px] text-center border-b-2">
                    <Button
                      variant={'red'}
                      onClick={(): Promise<void> => deleteResource(resource.id)}
                    >
                      Delete
                    </Button>
                  </span>
                </div>
                {updateId === resource.id ? (
                  <div>
                    <span className="table-cell min-w-[100px] text-center border-b-2">
                      {resource.id}
                    </span>
                    <span className="table-cell w-[200px] text-center border-b-2">
                      <input
                        type="text"
                        placeholder="Elem neve"
                        value={newName}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                          setNewName(e.target.value)
                        }
                        className="border-2 rounded-full h-10 px-3 m-2 w-full"
                      />
                    </span>
                    <span className="table-cell w-[100px] text-center border-b-2">
                      <input
                        type="number"
                        placeholder="Ár"
                        value={newPrice !== undefined ? newPrice : ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                          setNewPrice(parseInt(e.target.value))
                        }
                        className="border-2 rounded-full h-10 px-3 m-2 w-full"
                      />
                    </span>
                    <span className="table-cell w-[100px] text-center border-b-2">
                      <input
                        type="number"
                        placeholder="Mennyiség"
                        value={newAmount !== undefined ? newAmount : ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                          setNewAmount(parseInt(e.target.value))
                        }
                        className="border-2 rounded-full h-10 pl-3 m-2 w-full"
                      />
                    </span>
                    <span className="table-cell min-w-[200px] text-center border-b-2">
                      <select
                        onChange={(e: ChangeEvent<HTMLSelectElement>): void =>
                          setNewCategoryId(parseInt(e.target.value))
                        }
                        defaultValue="none"
                        className="border-2 rounded-full h-10 px-3 m-2 "
                      >
                        <option value="none" disabled>
                          Válassz kategóriát!
                        </option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.category_name}
                          </option>
                        ))}
                      </select>
                    </span>
                    <span className="table-cell min-w-[100px] text-center border-b-2">
                      <Button
                        variant={'blue'}
                        onClick={(): Promise<void> => updateResource(resource.id)}
                      >
                        Módosítás
                      </Button>
                    </span>
                    <span className="table-cell min-w-[180px] text-center border-b-2"></span>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
