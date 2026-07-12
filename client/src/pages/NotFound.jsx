import { Link } from 'react-router-dom'
const NotFound = () => <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4"><div className="text-center"><div className="text-9xl font-bold text-gray-300 mb-4">404</div><h1 className="text-4xl font-bold text-gray-900 mb-4">Not Found</h1><Link to="/" className="inline-block px-8 py-3 bg-green-500 text-white rounded-lg font-bold">Back Home</Link></div></div>
export default NotFound
