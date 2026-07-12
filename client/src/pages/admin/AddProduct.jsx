import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/adminService";
import { getCategories } from "../../services/productService";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
    inStock: true,
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then((d) => {
      const cats = d.categories || d || [];
      setCategories(cats);
      if (cats.length > 0) {
        setForm((f) => ({ ...f, category: cats[0].slug }));
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("inStock", form.inStock);
      if (form.image) formData.append("image", form.image);
      await createProduct(formData);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Add Product</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Name"
          required
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Description"
          rows="4"
        />
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Price"
          required
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        >
          {categories.map((cat) => (
            <option key={cat._id || cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.inStock}
            onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
          />
          In Stock
        </label>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-bold text-white transition ${
            loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};
export default AddProduct;