import { GlobalContextProvider } from './hooks/useGlobalContext'
import MainPage from './pages/MainPage'
import NavBar from './components/NavBar'
import SideList from './components/SideList'
import Ordering from './pages/Ordering'
import ResourceManagement from './pages/ResourceManagement'
import TablesManagement from './pages/TablesManagement'
import CategoryManagement from './pages/CategoryManagement'
import DayManagement from './pages/DayManagement'
import { useEffect, useState } from 'react'

function App(): JSX.Element {
  const [selectedTable, setSelectedTable] = useState<number | undefined>(undefined)
  const [selectedRoute, setSelectedRoute] = useState('mainpage')

  useEffect(() => {
    console.log('selectedRoute: ' + selectedRoute)
    console.log('selectedTable: ' + selectedTable)
  }, [])

  return (
    <>
      <GlobalContextProvider>
        <NavBar
          selectedRoute={selectedRoute}
          selectedTable={selectedTable}
          setSelectedRoute={setSelectedRoute}
          setSelectedTable={setSelectedTable}
        />
        <div className="w-full">
          <div className="flex">
            <div className="w-3/4">
              {((): JSX.Element => {
                switch (selectedRoute) {
                  case 'resourceManagement':
                    return <ResourceManagement />
                  case 'tableManagement':
                    return <TablesManagement />
                  case 'categoryManagement':
                    return <CategoryManagement />
                  case 'dayManagement':
                    return <DayManagement />
                  case 'mainpage':
                    return (
                      <MainPage
                        setSelectedTable={setSelectedTable}
                        setSelectedRoute={setSelectedRoute}
                      />
                    )
                  case 'ordering':
                    return <Ordering selectedTable={selectedTable} />
                  default:
                    return <></>
                }
              })()}
            </div>
            <div className="w-1/4">
              {selectedTable || selectedRoute === 'mainpage' ? (
                <SideList
                  selectedTable={selectedTable}
                  setSelectedTable={setSelectedTable}
                  selecteRoute={selectedRoute}
                  setSelectedRoute={setSelectedRoute}
                />
              ) : null}
            </div>
          </div>
        </div>
      </GlobalContextProvider>
    </>
  )
}

export default App
