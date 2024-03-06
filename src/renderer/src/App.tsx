import { Route, Routes, useLocation } from 'react-router-dom'
import { GlobalContextProvider } from './hooks/useGlobalContext'
import MainPage from './pages/MainPage'
import NavBar from './components/NavBar'
import SideList from './components/SideList'
import Ordering from './pages/Ordering'
import ResourceManagement from './pages/ResourceManagement'
import TablesManagement from './pages/TablesManagement'
import CategoryManagement from './pages/CategoryManagement'
import DayManagement from './pages/DayManagement'
import { useState } from 'react'

function App(): JSX.Element {
  const [selectedTable, setSelectedTable] = useState<number | undefined>(undefined)

  const location = useLocation()

  return (
    <>
      <GlobalContextProvider>
        <div className="w-full">
          <div className="flex">
            <div className="w-3/4">
              <NavBar />
              <Routes>
                <Route path="/" element={<MainPage setSelectedTable={setSelectedTable} />} />
                <Route
                  path="/:tableId"
                  element={<MainPage setSelectedTable={setSelectedTable} />}
                />
                <Route
                  path="/:tableId/table"
                  element={<Ordering selectedTable={selectedTable} />}
                />
                <Route path="/resourceManagement" element={<ResourceManagement />} />
                <Route path="/tablesManagement" element={<TablesManagement />} />
                <Route path="/categoryManagement" element={<CategoryManagement />} />
                <Route path="/dayManagement" element={<DayManagement />} />
              </Routes>
            </div>
            {location.pathname === '/' ||
            location.pathname === '/:tableId/' ||
            location.pathname === '/:tableId/table' ? (
              <div className="w-1/4">
                <SideList selectedTable={selectedTable} setSelectedTable={setSelectedTable} />
              </div>
            ) : null}
          </div>
        </div>
      </GlobalContextProvider>
    </>
  )
}

export default App
