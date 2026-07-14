import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../services/productService'
import { useCart } from '../context/CartContext'

const ProductDetails = () => {
  const { id } = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState(null)

  useEffect(() => {
    getProductById(id).then((d) => {
      const p = d.product || d
      setProduct(p)
      if (p.units && p.units.length > 0) setSelectedUnit(p.units[0])
      setLoading(false)
    })
  }, [id])

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    )
  if (!product)
    return (
      <div className="text-center py-12">
        <p className="text-2xl font-bold">Not Found</p>
      </div>
    )

  const hasUnits = product.units && product.units.length > 0
  const displayPrice = selectedUnit ? selectedUnit.price : product.price

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product, selectedUnit)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="text-green-600 mb-8 inline-block">
          ← Home
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-lg">
          <div className="bg-gray-200 h-96 rounded flex items-center justify-center">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-5xl font-bold text-green-600 mb-6">Rs {displayPrice}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {hasUnits && (
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Select Option</label>
                <select
                  value={selectedUnit?.label}
                  onChange={(e) =>
                    setSelectedUnit(product.units.find((u) => u.label === e.target.value))
                  }
                  className="w-full border rounded-lg px-4 py-2"
                >
                  {product.units.map((u) => (
                    <option key={u.label} value={u.label}>
                      {u.label} — Rs {u.price}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex items-center gap-4 mb-4">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 border rounded">
                −
              </button>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border py-2"
              />
              <button onClick={() => setQty(qty + 1)} className="px-4 py-2 border rounded">
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-3 rounded-lg font-bold text-white transition ${
                product.inStock ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300'
              } ${added ? 'bg-green-700' : ''}`}
            >
              <i className={`fas ${added ? 'fa-check' : 'fa-shopping-cart'}`}></i>{' '}
              {added ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductDetails