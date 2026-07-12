import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
const AdminLayout = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar isOpen={open} setIsOpen={setOpen} />
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow p-4 flex items-center justify-between">
          <button onClick={() => setOpen(!open)} className="p-2">
            <i className="fas fa-bars text-xl"></i>
          </button>
          <h1 className="text-2xl font-bold">Admin</h1>
          <div></div>
        </div>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
