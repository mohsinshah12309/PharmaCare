import { useState, useEffect } from 'react'
import { getAdminProducts } from '../../services/adminService'
import { Link } from 'react-router-dom'
import { socket } from '../../services/socket'

const AdminDashboard = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ totalProducts: 0, totalCategories: 6, inStock: 0, outOfStock: 0 })
  const [liveOrders, setLiveOrders] = useState([])

  useEffect(() => {
    getAdminProducts({ limit: 10 }).then(d => {
      const ps = d.products || []
      setProducts(ps)
      setStats({ totalProducts: d.total || ps.length, totalCategories: 6, inStock: ps.filter(p => p.inStock).length, outOfStock: ps.filter(p => !p.inStock).length })
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    socket.connect()

    socket.on('new-order', (order) => {
      setLiveOrders((prev) => [order, ...prev].slice(0, 5))
    })

    return () => {
      socket.off('new-order')
      socket.disconnect()
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <Link to="/admin/add-product" className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold">
          <i className="fas fa-plus"></i> Add
        </Link>
      </div>

      {liveOrders.length > 0 && (
        <div className="bg-green-50 border border-green-300 rounded-lg p-4 space-y-2">
          <p className="font-semibold text-green-800 flex items-center gap-2">
            <i className="fas fa-bolt"></i> Live Orders
          </p>
          {liveOrders.map((o, i) => (
            <div key={i} className="text-sm text-green-900 flex justify-between border-b border-green-200 pb-1">
              <span>
                {o.orderNumber} — {o.customerName} ({o.itemCount} item{o.itemCount > 1 ? 's' : ''})
              </span>
              <span className="font-bold">Rs {o.totalAmount}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total</p>
          <p className="text-3xl font-bold">{stats.totalProducts}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Categories</p>
          <p className="text-3xl font-bold">{stats.totalCategories}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">In Stock</p>
          <p className="text-3xl font-bold text-green-600">{stats.inStock}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Out</p>
          <p className="text-3xl font-bold text-red-600">{stats.outOfStock}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-xl font-bold">Recent</h3>
        </div>
        {loading ? (
          <div className="p-6 text-center">
            <i className="fas fa-spinner animate-spin text-3xl text-green-500"></i>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{p.name}</td>
                    <td className="px-6 py-4">Rs {p.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${p.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {p.inStock ? 'In' : 'Out'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
export default AdminDashboard