import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cashflow-user')
    return saved ? JSON.parse(saved) : null
  })

  function login(userData) {
    localStorage.setItem(
      'cashflow-user',
      JSON.stringify(userData)
    )
    setUser(userData)
  }

  function logout() {
    localStorage.removeItem('cashflow-user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
