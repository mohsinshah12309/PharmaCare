import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import AIChatWidget from "../components/common/AIChatWidget";
const MainLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <AIChatWidget />
    <Footer />
  </div>
);
export default MainLayout;
