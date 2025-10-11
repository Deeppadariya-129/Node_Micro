import React, { useState } from 'react'
import Navbar from './pages/Navbar'
import AddTodo from './pages/AddTodo'
import LoginScreen from './pages/LoginScreen'
import GetallTodo from './pages/GetallTodo'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <div className='bg-slate-900 min-h-screen text-white'>
      {/* 👇 if login screen is showing, hide Navbar + AddTodo */}
      {showLogin ? (
        <LoginScreen onClose={() => setShowLogin(false)} />
      ) : (
        <>
          <Navbar onLoginClick={() => setShowLogin(true)} />
          <AddTodo />
          <GetallTodo />   
        </>
      )}
    </div>
  )
}

export default App
