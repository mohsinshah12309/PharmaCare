import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
const AdminRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth()
  if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div></div>
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (user?.role !== 'admin') return <Navigate to="/" replace />
  return children
}
export default AdminRoute
