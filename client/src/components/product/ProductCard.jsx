import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useState } from 'react'
const ProductCard = ({ product }) => {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const handleAdd = (e) => {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }
  return <Link to={`/product/${product._id}`}><div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl h-full flex flex-col"><div className="relative bg-gray-200 h-48 flex items-center justify-center"><img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />{!product.inStock && <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs">Out</div>}</div><div className="p-4 flex-1 flex flex-col"><h3 className="font-semibold text-gray-800 line-clamp-2 mb-1">{product.name}</h3><p className="text-lg font-bold text-green-600">Rs {product.price}</p></div><button onClick={handleAdd} disabled={!product.inStock} className={`w-full py-2 font-semibold transition ${!product.inStock ? 'bg-gray-300 text-gray-600' : 'bg-green-500 text-white hover:bg-green-600'} ${added ? 'bg-green-700' : ''}`}><i className={`fas ${added ? 'fa-check' : 'fa-shopping-cart'}`}></i> {added ? 'Added!' : 'Add'}</button></div></Link>
}
export default ProductCard
