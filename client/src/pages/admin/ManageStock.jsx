import { useState, useEffect } from 'react'
import { getAdminProducts, toggleProductStock, deleteProduct } from '../../services/adminService'
import { Link } from 'react-router-dom'

const ManageStock = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAdminProducts().then((d) => {
      setProducts(d.products || [])
      setLoading(false)
    })
  }, [])

  const handleToggle = async (id) => {
    try {
      await toggleProductStock(id)
      setProducts(products.map((p) => (p._id === id ? { ...p, inStock: !p.inStock } : p)))
    } catch (err) {
      console.error('Error toggling stock:', err)
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete product')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Manage Stock</h2>
        <Link
          to="/admin/add-product"
          className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold"
        >
          <i className="fas fa-plus"></i> Add Product
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-6">
            <i className="fas fa-spinner animate-spin text-3xl text-green-500"></i>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Image</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Stock Action</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded"></div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium">{p.name}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{p.category?.name}</td>
                    <td className="px-6 py-4">Rs {p.price}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          p.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {p.inStock ? 'In Stock' : 'Out'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggle(p._id)}
                        className={`px-4 py-2 rounded font-semibold text-white ${
                          p.inStock ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                        }`}
                      >
                        {p.inStock ? 'Disable' : 'Enable'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(p._id, p.name)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete product"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
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
export default ManageStock