import Button from '../components/atoms/Button'
import { useGlobalContext } from '../hooks/useGlobalContext'
import { ChangeEvent, useState } from 'react'

export default function CategoryManagement(): JSX.Element {
  const [categoryName, setCategoryName] = useState<string>('')
  const [newName, setNewName] = useState('')
  const [updateId, setUpdateId] = useState<number | undefined>(undefined)

  const { categories, fetchCategories } = useGlobalContext()

  const createCategory = async (): Promise<void> => {
    await window.categoryApi.createCategory(categoryName)
    setCategoryName('')
    fetchCategories()
  }

  const updateCategory = async (id: number): Promise<void> => {
    await window.categoryApi.updateCategory(id, newName)
    setUpdateId(undefined)
    setNewName('')
    fetchCategories()
  }

  const deleteCategory = async (id: number): Promise<void> => {
    await window.categoryApi.deleteCategory(id)
    fetchCategories()
  }

  return (
    <>
      <div className="m-5">
        <h1>Kategóriák kezelése</h1>
        <div>
          <h2>Kategória hozzáadása</h2>
          <input
            type="text"
            placeholder="Name"
            defaultValue={categoryName}
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setCategoryName(e.target.value)}
            className="border-2 rounded-full h-10 px-3"
          />
          <Button onClick={createCategory} variant={'blue'}>
            Készít
          </Button>
        </div>
        <div className="">
          <h2>Kategóriák</h2>
          <ul className="w-full table">
            <li>
              <span className="table-cell min-w-[100px] text-center border-b-2">Id</span>
              <span className="table-cell min-w-[200px] text-center border-b-2">Név</span>
              <span className="table-cell min-w-[180px] text-center border-b-2">Módosítás</span>
              <span className="table-cell min-w-[180px] text-center border-b-2">Törlés</span>
            </li>
            {categories
              ? categories.map((category) => (
                  <li key={category.id}>
                    <div>
                      <span className="table-cell min-w-[100px] text-center border-b-2">
                        {category.id}
                      </span>
                      <span className="table-cell min-w-[200px] text-center border-b-2">
                        {category.category_name}
                      </span>
                      <span className="table-cell min-w-[100px] text-center border-b-2">
                        <Button variant={'blue'} onClick={(): void => setUpdateId(category.id)}>
                          Módosít
                        </Button>
                      </span>
                      <span className="table-cell min-w-[100px] text-center border-b-2">
                        <Button
                          variant={'red'}
                          onClick={(): Promise<void> => deleteCategory(category.id)}
                        >
                          Töröl
                        </Button>
                      </span>
                    </div>
                    {updateId === category.id ? (
                      <div>
                        <span className="table-cell min-w-[100px] text-center border-b-2">
                          {category.id}
                        </span>
                        <span className="table-cell min-w-[200px] text-center border-b-2 p-2">
                          <input
                            type="text"
                            placeholder="Kategória neve"
                            value={newName}
                            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                              setNewName(e.target.value)
                            }
                            className="border-2 rounded-full h-10 px-3"
                          />
                        </span>
                        <span className="table-cell min-w-[100px] text-center border-b-2">
                          <Button
                            variant={'blue'}
                            onClick={(): Promise<void> => updateCategory(category.id)}
                          >
                            Módosít
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
