import React, { createContext, useState, useEffect } from 'react'
export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = localStorage.getItem('token')
    const u = localStorage.getItem('user')
    if (t && u) { setToken(t); setUser(JSON.parse(u)) }
    setLoading(false)
  }, [])
  return <AuthContext.Provider value={{ user, token, loading, isAuthenticated: !!token, login: (u, t) => { setUser(u); setToken(t); localStorage.setItem('token', t); localStorage.setItem('user', JSON.stringify(u)) }, logout: () => { setUser(null); setToken(null); localStorage.clear() } }}>{children}</AuthContext.Provider>
}
export const useAuth = () => {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be within AuthProvider')
  return ctx
}
