import Button from '../components/atoms/Button'
import { useGlobalContext } from '../hooks/useGlobalContext'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type MainPageProps = {
  setSelectedTable: Dispatch<SetStateAction<number | undefined>>
  setSelectedRoute: Dispatch<SetStateAction<string>>
}

export default function MainPage({
  setSelectedTable,
  setSelectedRoute
}: MainPageProps): JSX.Element {
  const [daysLoaded, setDaysLoaded] = useState<boolean>(false)
  const [hasOpenedDay, setHasOpenedDay] = useState<boolean>(false)
  const { tables, days } = useGlobalContext()

  useEffect(() => {
    findOpenedDay()
  }, [])

  useEffect(() => {
    if (daysLoaded) {
      const openedDay = days.find((day) => day.open && !day.close)
      setHasOpenedDay(!!openedDay)
    }
  }, [daysLoaded, days])

  const findOpenedDay = async (): Promise<void> => {
    const openedDay = days.find((day) => day.open && !day.close)
    setHasOpenedDay(!!openedDay)
    setDaysLoaded(true)
  }

  return (
    <>
      <div className="flex flex-wrap m-10">
        <ul className="flex flex-wrap">
          {tables.map((table) => (
            <li key={table.id}>
              <Button
                onClick={(): void => {
                  console.log(table.id)
                  setSelectedTable(table.id)
                }}
                onDoubleClick={(): void => setSelectedRoute('ordering')}
                disabled={!hasOpenedDay}
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
