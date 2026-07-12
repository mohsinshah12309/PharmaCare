import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'
import { useAuth } from '../context/AuthContext'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await loginUser({ email, password })
      login(res.user, res.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }
  return <div className="min-h-screen bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center px-4 py-12"><div className="w-full max-w-md bg-white rounded-lg shadow-xl"><div className="bg-green-600 text-white py-8 px-6 text-center"><i className="fas fa-pills text-5xl mb-3 block"></i><h1 className="text-3xl font-bold">PharmaCare</h1><p className="text-green-100 mt-2">Login</p></div><form onSubmit={handleSubmit} className="p-8 space-y-6">{error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"><i className="fas fa-exclamation-circle"></i> {error}</div>}<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500" placeholder="Email" required /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500" placeholder="Password" required /><button type="submit" disabled={loading} className={`w-full py-3 rounded-lg font-bold text-white transition ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}>{loading ? 'Logging in...' : 'Login'}</button></form><div className="bg-gray-50 px-8 py-6 border-t"><p className="text-center"><Link to="/register" className="text-green-600 font-bold">Register</Link></p></div></div></div>
}
export default Login
