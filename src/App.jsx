import './App.css'
import { Login } from './pages'
import {Routes, Route} from 'react-router-dom'

function App() {
  const commonRoutes = [
    {
      path: '/',
      element : <Login />
    }
  ]
  return (
    <>
      <Routes>
        {
          commonRoutes.map((route, idx) => {
            return <Route path={route.path} element={route.element} key={idx} />
          } )
        }
      </Routes>
    </>
  )
}

export default App
