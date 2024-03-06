import { Link, useLocation } from 'react-router-dom'
import Button from './atoms/Button'

export default function NavBar(): JSX.Element {
  const location = useLocation()

  return (
    <>
      {location.pathname === '/' || location.pathname === '/:tableId/' ? (
        <>
          <Link to={'/resourceManagement'}>
            <Button variant={'blue'}>Leltár</Button>
          </Link>
          <Link to={'/tablesManagement'}>
            <Button variant={'blue'}>Asztalok kezelése</Button>
          </Link>
          <Link to={'/categoryManagement'}>
            <Button variant={'blue'}>Kategóriák kezelése</Button>
          </Link>
          <Link to={'/dayManagement'}>
            <Button variant={'blue'}>Napok</Button>
          </Link>
        </>
      ) : (
        <Link to={'/'}>
          <Button variant={'blue'}>Vissza</Button>
        </Link>
      )}
    </>
  )
}
