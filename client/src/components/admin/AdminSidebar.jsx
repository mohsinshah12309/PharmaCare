import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const AdminSidebar = ({ isOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <aside
      className={`${isOpen ? "w-64" : "w-20"} bg-gray-900 text-white transition-all duration-300 flex flex-col shadow-lg`}
    >
      <div className="p-4 border-b border-gray-700 flex items-center justify-center">
        <i className="fas fa-pills text-2xl text-green-500"></i>
        {isOpen && <span className="ml-3 font-bold">PharmaCare</span>}
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800"
        >
          <i className="fas fa-chart-line text-lg text-green-500"></i>
          {isOpen && <span>Dashboard</span>}
        </Link>
        <Link
          to="/admin/add-product"
          className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800"
        >
          <i className="fas fa-plus-circle text-lg text-green-500"></i>
          {isOpen && <span>Add</span>}
        </Link>
        <Link
          to="/admin/manage-stock"
          className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800"
        >
          <i className="fas fa-boxes text-lg text-green-500"></i>
          {isOpen && <span>Stock</span>}
        </Link>

        <Link
          to="/admin/manage-categories"
          className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800"
        >
          <i className="fas fa-tags text-lg text-green-500"></i>
          {isOpen && <span>Categories</span>}
        </Link>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700"
        >
          <i className="fas fa-sign-out-alt text-lg"></i>
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};
export default AdminSidebar;
