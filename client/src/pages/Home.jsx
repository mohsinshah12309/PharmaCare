import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid'
import { getAllProducts } from '../services/productService'
const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getAllProducts({ limit: 12 }).then(d => {
      setProducts(d.products || [])
      setLoading(false)
    })
  }, [])
  return <div className="min-h-screen bg-gray-50"><section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-20"><div className="max-w-7xl mx-auto px-4"><h1 className="text-5xl font-bold mb-4">Your Health is Our Priority</h1><p className="text-lg text-green-50 mb-6">Quality medicines delivered to your doorstep</p><Link to="/category/medicine" className="inline-block px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100">Shop Now</Link></div></section><section className="py-12 px-4"><div className="max-w-7xl mx-auto"><h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2><ProductGrid products={products} loading={loading} /></div></section></div>
}
export default Home
