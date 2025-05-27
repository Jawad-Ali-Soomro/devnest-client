import React from 'react'
import { getUser } from '../hooks'
import { AdminDashboard, UserDashboard } from '../components';

const Dashboard = () => {
    getUser()
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const renderDashboards = () => {
        if (userInfo && userInfo.role === "admin") {
            return <AdminDashboard />;
        } else if (userInfo && userInfo.role === "user") {
            return <UserDashboard />
        } else {
            return <h1>Welcome to the Dashboard</h1>;
        }
    }
  return (
       renderDashboards()
   
  )
}

export default Dashboard
