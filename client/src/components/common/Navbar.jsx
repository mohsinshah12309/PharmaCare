import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useState, useEffect } from "react";
import { getCategories } from "../../services/productService";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((d) => {
      setCategories(d.categories || d || []);
    });
  }, []);

  return (
    <nav className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <i className="fas fa-pills text-3xl"></i>
          <span>PharmaCare</span>
        </Link>
        <div className="hidden md:flex gap-1">
          {categories.map((cat) => (
            <Link
              key={cat._id || cat.slug}
              to={`/category/${cat.slug}`}
              className="px-3 py-2 hover:bg-green-700 rounded"
            >
              {cat.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <i className="fas fa-shopping-cart text-2xl"></i>
            {getTotalItems() > 0 && (
              <span className="absolute top-1 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {getTotalItems()}
              </span>
            )}
          </Link>
          {user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 px-3 py-2 bg-green-700 rounded"
            >
              <i className="fas fa-cog"></i>Admin
            </Link>
          )}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2"
              >
                <i className="fas fa-user-circle text-2xl"></i>
                {user?.name}
              </button>
              {dropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold text-sm">{user?.name}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="px-4 py-2 bg-white text-green-600 rounded font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-700 rounded font-semibold"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;