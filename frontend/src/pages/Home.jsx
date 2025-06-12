import { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

export default function Home({ isLoggedIn }) {
  const [showForm, setShowForm] = useState('login') // default: login

  return (
    <div className="min-h-screen flex bg-gray-700 items-center justify-center">
      <div className="relative bg-gray-400  border border-white/20 shadow-xl rounded-3xl w-full max-w-4xl m-10 text-center animate-fade-in">
        <h1 className="text-4xl font-extrabold m-6 tracking-tight">
          {isLoggedIn ? '🎉 Welcome Back!' : '👋 Welcome to Admin Portal'}
        </h1>

        <p className="text-black/80 text-lg mb-10">
          {isLoggedIn
            ? 'You are logged in and ready to explore.'
            : 'Please log in or sign up to continue.'}
        </p>

        {!isLoggedIn ? (
          <>
            <div className="flex border-t border-gray-600 justify-center">
              <button
                onClick={() => setShowForm('login')}
                className={`px-6 py-5 w-full font-medium shadow-lg transition ${
                  showForm === 'login'
                    ? 'bg-red-500'
                    : ''
                }`}
              > 
                Log In
              </button>

              <button
                onClick={() => setShowForm('signup')}
                className={`px-6 py-5 w-full font-medium shadow-lg transition ${
                  showForm === 'signup'
                    ? 'bg-red-500'
                    : ''
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Conditionally show form */}
            {showForm === 'login' && <Login />}
            {showForm === 'signup' && <Signup />}
          </>
        ) : (
          <div>
            <a href="/dashboard">
            <button className="mb-20  px-6 py-3 bg-red-500 hover:bg-red-600 transition rounded-xl font-medium shadow-lg">
              Go to Dashboard
            </button>
          </a>
          </div>
        )}

        <div className="absolute bottom-4 left-1/2 transform text-bold -translate-x-1/2 text-xs text-black/90">
          © {new Date().getFullYear()} Admin Portal
        </div>
      </div>
    </div>
  )
}
