import Button from '../components/atoms/Button'
import { useGlobalContext } from '../hooks/useGlobalContext'
import { IDay } from '../interfaces/interfaces'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type MainPageProps = {
  setSelectedTable: Dispatch<SetStateAction<number | undefined>>
}

export default function MainPage({ setSelectedTable }: MainPageProps): JSX.Element {
  const [disabled, setDisabled] = useState<boolean>(false)
  const { tables, days } = useGlobalContext()
  const navigate = useNavigate()

  useEffect(() => {
    const findOpenedDay = (): IDay | undefined => {
      return days.find((day) => day.open && !day.close)
    }
    if (!findOpenedDay()) setDisabled(true)
  }, [])

  return (
    <>
      <div className="flex flex-wrap m-10 ">
        <ul className="flex flex-wrap">
          {tables.map((table) => (
            <li key={table.id}>
              <Button
                onClick={(): void => {
                  navigate('/:tableId/')
                  setSelectedTable(table.id)
                }}
                onDoubleClick={(): void => navigate('/:tableId/table')}
                disabled={disabled}
                size={'rectangle'}
              >
                {table.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
