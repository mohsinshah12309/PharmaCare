import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser, loginUser } from '../services/authService'
import { useAuth } from '../context/AuthContext'
const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await registerUser({ name: form.name, email: form.email, password: form.password })
      const res = await loginUser({ email: form.email, password: form.password })
      login(res.user, res.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }
  return <div className="min-h-screen bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center px-4 py-12"><div className="w-full max-w-md bg-white rounded-lg shadow-xl"><div className="bg-green-600 text-white py-8 px-6 text-center"><i className="fas fa-pills text-5xl mb-3 block"></i><h1 className="text-3xl font-bold">PharmaCare</h1><p className="text-green-100 mt-2">Register</p></div><form onSubmit={handleSubmit} className="p-8 space-y-4">{error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"><i className="fas fa-exclamation-circle"></i> {error}</div>}<input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" placeholder="Name" required /><input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" placeholder="Email" required /><input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" placeholder="Password" required /><input type="password" value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" placeholder="Confirm Password" required /><button type="submit" disabled={loading} className={`w-full py-3 rounded-lg font-bold text-white transition ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}>{loading ? 'Creating...' : 'Register'}</button></form><div className="bg-gray-50 px-8 py-6 border-t"><p className="text-center"><Link to="/login" className="text-green-600 font-bold">Login</Link></p></div></div></div>
}
export default Register
