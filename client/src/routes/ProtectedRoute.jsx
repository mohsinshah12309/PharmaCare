import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div></div>
  return isAuthenticated ? children : <Navigate to="/login" replace />
}
export default ProtectedRoute
