import LoginForm from '@/components/featured/auth/components/login-form'
import React from 'react'

const page = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col  min-h-screen items-center justify-center">
        <LoginForm />
      </div>
    </div>
  )
}

export default page