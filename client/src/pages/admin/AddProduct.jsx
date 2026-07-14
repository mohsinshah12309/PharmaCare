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
  const [units, setUnits] = useState([]); // [{ label: '', price: '' }]
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

  const addUnitRow = () => {
    setUnits([...units, { label: "", price: "" }]);
  };

  const updateUnitRow = (index, field, value) => {
    const newUnits = units.map((u, i) => (i === index ? { ...u, [field]: value } : u));
    setUnits(newUnits);
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

      // Only include units that have both a label and a price filled in
      const validUnits = units.filter((u) => u.label.trim() && u.price !== "");
      formData.append("units", JSON.stringify(validUnits));

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
          <p className="text-xs text-gray-500 mt-1">
            Used if no unit options are added below, or as a fallback display price.
          </p>
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

        {/* Unit options section */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold">
              Unit Options <span className="text-gray-500 font-normal">(optional — e.g. "1 Tablet", "Pack of 6")</span>
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
              No unit options added — this product will sell at the default price above.
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