import LoginForm from '@/custom/Login'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    const userId = window.localStorage.getItem("userId")
    if (userId) {
      navigate('/home')
    }
  }, [navigate])
  
  return <LoginForm />
}

export default Login
