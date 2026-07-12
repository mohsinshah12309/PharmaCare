import { useState, useEffect } from 'react'
import { getAdminProducts, toggleProductStock } from '../../services/adminService'
const ManageStock = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getAdminProducts().then(d => {
      setProducts(d.products || [])
      setLoading(false)
    })
  }, [])
  const handleToggle = async (id) => {
    try {
      await toggleProductStock(id)
      setProducts(products.map(p => p._id === id ? {...p, inStock: !p.inStock} : p))
    } catch (err) {
      console.error('Error toggling stock:', err)
    }
  }
  return <div><h2 className="text-3xl font-bold mb-8">Manage Stock</h2><div className="bg-white rounded-lg shadow overflow-hidden">{loading ? <div className="p-6"><i className="fas fa-spinner animate-spin text-3xl text-green-500"></i></div> : <div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-sm font-semibold">Product</th><th className="px-6 py-3 text-left text-sm font-semibold">Status</th><th className="px-6 py-3 text-left text-sm font-semibold">Action</th></tr></thead><tbody>{products.map(p => <tr key={p._id} className="border-b hover:bg-gray-50"><td className="px-6 py-4 font-medium">{p.name}</td><td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-sm font-semibold ${p.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{p.inStock ? 'In Stock' : 'Out'}</span></td><td className="px-6 py-4"><button onClick={() => handleToggle(p._id)} className={`px-4 py-2 rounded font-semibold text-white ${p.inStock ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}>{p.inStock ? 'Disable' : 'Enable'}</button></td></tr>)}</tbody></table></div>}</div></div>
}
export default ManageStock
