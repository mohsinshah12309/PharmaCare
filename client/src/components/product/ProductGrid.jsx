import ProductCard from './ProductCard'
const ProductGrid = ({ products, loading }) => {
  if (loading) return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{[...Array(8)].map((_, i) => <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"><div className="bg-gray-300 h-48"></div><div className="p-4 space-y-3"><div className="h-4 bg-gray-300 rounded w-3/4"></div></div></div>)}</div>
  if (!products || products.length === 0) return <div className="col-span-full py-12 text-center"><p className="text-gray-700 font-semibold">No products found</p></div>
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{products.map(p => <ProductCard key={p._id} product={p} />)}</div>
}
export default ProductGrid
