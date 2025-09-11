import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/Store/authSlice';
import { FaBars } from 'react-icons/fa'; // Importing the hamburger icon

const Navbar = () => {
  const { user, token } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  // State to control the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex space-x-7">
            <Link to="/" className="flex items-center py-4">
              <span className="font-semibold text-gray-700 text-lg">FoodDelivery</span>
            </Link>
          </div>

          {/* Desktop Navbar Links */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/restaurants" className="py-4 px-2 text-gray-700 font-semibold hover:text-green-500 transition duration-300">
              Restaurants
            </Link>
            {token ? (
              <>
                <Link to="/cart" className="py-4 px-2 text-gray-700 font-semibold hover:text-green-500 transition duration-300 relative">
                  Cart
                  {items.length > 0 && (
                    <span className="absolute top-2 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {items.length}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className="py-4 px-2 text-gray-700 font-semibold hover:text-green-500 transition duration-300">
                  Orders
                </Link>
                <span className="py-4 px-2 text-gray-700">Hello, {user?.name}</span>
                <button onClick={handleLogout} className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-400 transition duration-300">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-400 transition duration-300">
                  Login
                </Link>
                <Link to="/register" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-400 transition duration-300">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Icon for Mobile/Tablets */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700">
              <FaBars className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (visible when isMenuOpen is true) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-0 left-0 w-full mt-16">
          <div className="flex flex-col items-center space-y-3 py-4">
            <Link to="/restaurants" className="text-gray-700 font-semibold hover:text-green-500">Restaurants</Link>
            {token ? (
              <>
                <Link to="/cart" className="text-gray-700 font-semibold hover:text-green-500 relative">
                  Cart
                  {items.length > 0 && (
                    <span className="absolute top-2 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {items.length}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className="text-gray-700 font-semibold hover:text-green-500">Orders</Link>
                <span className="text-gray-700">Hello, {user?.name}</span>
                <button onClick={handleLogout} className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-400">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-400">
                  Login
                </Link>
                <Link to="/register" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-400">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
