import { RegisterForm } from '@/custom'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const userId = window.localStorage.getItem("userId")
    if (userId) {
      navigate('/home')
    }
  }, [navigate])

  return (
    <div>
      <RegisterForm />
    </div>
  )
}

export default Register
