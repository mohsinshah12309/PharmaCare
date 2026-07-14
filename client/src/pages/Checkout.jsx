import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart, getTotalPrice } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postal: "",
    paymentMethod: "cod",
  });

  const total = getTotalPrice();
  const grandTotal = total * 1.05;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const orderItems = items.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
        unitLabel: item.unitLabel || null,
      }));

      await api.post("/orders", {
        items: orderItems,
        shippingAddress: form.address,
        paymentMethod: form.paymentMethod,
        name: form.name,
        phone: form.phone,
        city: form.city,
        postal: form.postal,
        totalAmount: grandTotal,
      });

      clearCart();
      navigate("/order-confirmation");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <form
            onSubmit={handleSubmit}
            className="md:col-span-2 bg-white rounded-lg shadow p-8"
          >
            <h2 className="text-2xl font-bold mb-4">Shipping</h2>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <div className="space-y-4 mb-8">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Name"
                required
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Email"
                required
              />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Phone"
                required
              />
              <textarea
                rows="3"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Address"
                required
              ></textarea>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                  placeholder="City"
                  required
                />
                <input
                  type="text"
                  value={form.postal}
                  onChange={(e) => setForm({ ...form, postal: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                  placeholder="Postal"
                  required
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Payment</h2>
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 p-3 border rounded-lg">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={form.paymentMethod === "cod"}
                  onChange={(e) =>
                    setForm({ ...form, paymentMethod: e.target.value })
                  }
                />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-lg">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={form.paymentMethod === "card"}
                  onChange={(e) =>
                    setForm({ ...form, paymentMethod: e.target.value })
                  }
                />
                <span>Card</span>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-white transition ${
                loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>
          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">Summary</h2>
            <div className="space-y-4 pb-6 border-b">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>Rs {(total * 0.05).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-bold mt-6">
              <span>Total</span>
              <span className="text-green-600">Rs {grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
