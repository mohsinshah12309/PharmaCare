import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "../../services/productService";

const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((d) => {
      setCategories(d.categories || d || []);
    });
  }, []);

  return (
    <footer className="bg-gray-800 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              <i className="fas fa-pills text-green-500"></i> PharmaCare
            </h3>
            <p className="text-sm">Your trusted online pharmacy</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-green-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-green-500">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              {categories.map((cat) => (
                <li key={cat._id || cat.slug}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="hover:text-green-500"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-sm">Faisalabad, Pakistan</p>
            <p className="text-sm">info@pharmacare.com</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <p className="text-sm text-center">
            &copy; 2024 PharmaCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;