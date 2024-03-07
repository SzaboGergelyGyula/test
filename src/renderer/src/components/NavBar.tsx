import Button from './atoms/Button'
import { Dispatch, SetStateAction } from 'react'

type NavBarPropType = {
  selectedTable: number | undefined
  selectedRoute: string
  setSelectedRoute: Dispatch<SetStateAction<string>>
  setSelectedTable: Dispatch<SetStateAction<number | undefined>>
}

export default function NavBar({
  selectedRoute,
  setSelectedRoute,
  setSelectedTable
}: NavBarPropType): JSX.Element {
  return (
    <>
      {selectedRoute === 'mainpage' ? (
        <>
          <Button
            variant={'blue'}
            onClick={(): void => {
              setSelectedRoute('resourceManagement')
              setSelectedTable(undefined)
            }}
          >
            Leltár
          </Button>
          <Button
            variant={'blue'}
            onClick={(): void => {
              setSelectedRoute('tableManagement')
              setSelectedTable(undefined)
            }}
          >
            Asztalok kezelése
          </Button>
          <Button
            variant={'blue'}
            onClick={(): void => {
              setSelectedRoute('categoryManagement')
              setSelectedTable(undefined)
            }}
          >
            Kategóriák kezelése
          </Button>
          <Button
            variant={'blue'}
            onClick={(): void => {
              setSelectedRoute('dayManagement')
              setSelectedTable(undefined)
            }}
          >
            Napok
          </Button>
        </>
      ) : (
        <Button
          variant={'blue'}
          onClick={(): void => {
            setSelectedRoute('mainpage')
            setSelectedTable(undefined)
          }}
        >
          Vissza
        </Button>
      )}
    </>
  )
}
