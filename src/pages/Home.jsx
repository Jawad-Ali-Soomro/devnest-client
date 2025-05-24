import { Sidebar } from '@/custom'
import { useFetchUser } from '@/hooks/FetchUser'
import AdminDashboard from '@/screens/AdminDashboard'
import UserDashboard from '@/screens/UserDashboard'
import React, { useState } from 'react'

const Home = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, loading } = useFetchUser()
  console.log(user)

  if (loading) return <p>Loading....</p>

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} role={user?.role} />
      <div className="flex flex-col flex-grow p-5">
        <div
          className="w-[40px] cursor-pointer mb-5 fixed"
          onClick={() => setIsOpen(!isOpen)}
          style={{
              transform: isOpen ? 'translateX(80px)' : 'translateX(0)',
              transition: '.3s'
          }}
        >
          <div className="h-[2px] mb-1 bg-black rounded"></div>
          <div className="h-[2px] w-[20px] mb-1 bg-black rounded"></div>
          <div className="h-[2px] bg-black rounded"></div>
        </div>
        {user?.role === 'user' && <UserDashboard />}
        {user?.role === 'admin' && <AdminDashboard />}
      </div>
    </div>
  )
}

export default Home
