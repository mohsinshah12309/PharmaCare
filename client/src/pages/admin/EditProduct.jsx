import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../../services/adminService";
import { getCategories, getProductById } from "../../services/productService";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
    inStock: true,
  });
  const [currentImage, setCurrentImage] = useState("");
  const [units, setUnits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getCategories(), getProductById(id)]).then(([catData, prodData]) => {
      const cats = catData.categories || catData || [];
      setCategories(cats);

      const product = prodData.product || prodData;
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price ?? "",
        category: product.category?.slug || cats[0]?.slug || "",
        image: null,
        inStock: product.inStock,
      });
      setCurrentImage(product.image || "");
      setUnits(
        (product.units || []).map((u) => ({ label: u.label, price: u.price }))
      );
      setFetching(false);
    });
  }, [id]);

  const addUnitRow = () => {
    setUnits([...units, { label: "", price: "" }]);
  };

  const updateUnitRow = (index, field, value) => {
    setUnits(units.map((u, i) => (i === index ? { ...u, [field]: value } : u)));
  };

  const removeUnitRow = (index) => {
    setUnits(units.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("inStock", form.inStock);
      if (form.image) formData.append("image", form.image);

      const validUnits = units.filter((u) => u.label.trim() && u.price !== "");
      formData.append("units", JSON.stringify(validUnits));

      await updateProduct(id, formData);
      navigate("/admin/manage-stock");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <i className="fas fa-spinner animate-spin text-3xl text-green-500"></i>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Edit Product</h2>
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

        <div>
          <label className="block text-sm font-semibold mb-1">Default Price (Rs)</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Price"
            required
          />
        </div>

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

        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold">
              Unit Options <span className="text-gray-500 font-normal">(optional — e.g. "1 Tablet", "Pack of 10")</span>
            </label>
            <button
              type="button"
              onClick={addUnitRow}
              className="text-sm px-3 py-1 bg-green-500 text-white rounded font-semibold"
            >
              + Add Option
            </button>
          </div>
          {units.length === 0 && (
            <p className="text-xs text-gray-500">
              No unit options — this product sells at the default price above.
            </p>
          )}
          <div className="space-y-2">
            {units.map((unit, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={unit.label}
                  onChange={(e) => updateUnitRow(index, "label", e.target.value)}
                  placeholder="e.g. 1 Tablet"
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                />
                <input
                  type="number"
                  value={unit.price}
                  onChange={(e) => updateUnitRow(index, "price", e.target.value)}
                  placeholder="Price"
                  className="w-28 px-3 py-2 border rounded-lg text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeUnitRow(index)}
                  className="text-red-600 px-2"
                  title="Remove"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {currentImage && !form.image && (
          <div>
            <p className="text-sm font-semibold mb-1">Current Image</p>
            <img src={currentImage} alt="current" className="w-24 h-24 object-cover rounded border" />
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold mb-1">
            {currentImage ? "Replace Image (optional)" : "Image"}
          </label>
          <input
            type="file"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

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
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};
export default EditProduct;