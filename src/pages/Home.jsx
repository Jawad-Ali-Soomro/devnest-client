import { useFetchUser } from '@/hooks/FetchUser'
import AdminDashboard from '@/screens/AdminDashboard'
import UserDashboard from '@/screens/UserDashboard'

const Home = () => {
  const { user, loading } = useFetchUser()
  console.log(user)

  if (loading) return <p>Loading....</p>

  return (
      <div>
          {user?.role === 'user' && <UserDashboard />}
        {user?.role === 'admin' && <AdminDashboard />}
      </div>
  )
}

export default Home
