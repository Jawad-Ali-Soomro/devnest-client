import './App.css'
import ProtectedRoute from './hooks/ProtectedRoutes'
import { Login, Profile, Register } from './pages'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'

function App() {
  const commonRoutes = [
    {
      path: '/',
      element : <Login />
    },
    {
      path: '/register',
      element : <Register />
    },
      {
      path: '/home',
      element : <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    },
     {
      path: '/profile',
      element : <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
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
