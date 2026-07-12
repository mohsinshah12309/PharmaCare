import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../components/product/ProductGrid";
import { getProductsByCategory } from "../services/productService";

const Medicine = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    getProductsByCategory(slug, { search }).then((d) => {
      setProducts(d.products || []);
      setLoading(false);
    });
  }, [slug, search]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 capitalize">
          {slug?.replace(/-/g, " ")}
        </h1>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-8"
        />
        <ProductGrid products={products} loading={loading} />
      </div>
    </div>
  );
};
export default Medicine;