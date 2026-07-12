import { useState, useEffect } from 'react'
import { getAdminCategories, createCategory, deleteCategory } from '../../services/adminService'

const ManageCategories = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadCategories = () => {
    getAdminCategories().then((d) => {
      setCategories(d.categories || [])
      setLoading(false)
    })
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createCategory({ name, description })
      setName('')
      setDescription('')
      loadCategories()
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating category')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return
    try {
      await deleteCategory(id)
      loadCategories()
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting category')
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold">Manage Categories</h2>

      <form onSubmit={handleAdd} className="bg-white rounded-lg shadow p-8 space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Category name"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Description (optional)"
          rows="2"
        />
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-bold text-white bg-green-500 hover:bg-green-600"
        >
          Add Category
        </button>
      </form>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-xl font-bold">Existing Categories</h3>
        </div>
        {loading ? (
          <div className="p-6 text-center">
            <i className="fas fa-spinner animate-spin text-3xl text-green-500"></i>
          </div>
        ) : (
          <table className="w-full">
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{cat.name}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{cat.slug}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
export default ManageCategories