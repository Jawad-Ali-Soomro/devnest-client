import React from 'react'
import TopBar from './TopBar'
import '../styles/userDashboard.scss'

const UserDashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  return (
    <div className='flex user-dashboard'>
      <TopBar />
      <div className="container flex">
        <div className="left flex col">
          <div className="stats-cards flex">
            <div className="card cursor-pointer"></div>
            <div className="card cursor-pointer"></div>
            <div className="card cursor-pointer"></div>
          </div>
          stats
          followers
        </div>
        <div className="right flex col">
          notifications
          <br />
          friends
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
