import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMoon, faAngleDown, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CartDropdown from "./CartDropdown";

// You'll need to install Font Awesome:
// npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
import {
  PopoverGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const Header = () => {
    const [user, setUser] = useState(null);
      const [cartItems, setCartItems] = useState([]);
      const location = useLocation();
    
      const loadCart = () => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        if (Array.isArray(savedCart)) {
          setCartItems(savedCart);
        } else {
          setCartItems([]);
        }
      };
    
      useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (err) {
            console.error("Error parsing user:", err);
          }
        }
    
        loadCart();
    
        // 🔹 Listen for cart updates from other components
        const handleCartUpdate = () => loadCart();
        window.addEventListener("cartUpdated", handleCartUpdate);
    
        return () => window.removeEventListener("cartUpdated", handleCartUpdate);
      }, []);
    
      const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        window.location.href = "/loginpage";
      };
    
      const removeFromCart = (id) => {
        const updatedCart = cartItems.filter((item) => item._id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated")); // 🔹 notify others
      };
    
      const totalPrice = Array.isArray(cartItems)
        ? cartItems.reduce(
          (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
          0
        )
        : 0;
  return (
    <header className="bg-[#292525] text-white p-4">
      <div className="container mx-auto max-w-6xl flex items-center justify-between">
        
        {/* Left Section: Logo & Location */}
        <div className="flex items-center space-x-4">
          <div className="bg-orange-500 p-2 rounded-full">
            {/* Replace with your logo/icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            </svg>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer text-sm">
            <FontAwesomeIcon icon={faLocationDot} className="text-orange-500" />
            <span>Select your location</span>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </div>
        
        {/* Right Section: Dark Mode, Language & Sign In */}
        <div className="flex items-center space-x-6">
          
        
          
          {/* Language
          <div className="flex items-center space-x-1 text-white/70">
            <img src="https://flagcdn.com/us.svg" alt="US Flag" className="h-4 w-6" />
            <span>En</span>
            <FontAwesomeIcon icon={faAngleDown} className="text-white/50" />
          </div>
           */}
          {/* Sign In Button */}
          
           <div className="hidden lg:flex z-10 lg:flex-1 lg:justify-end gap-6 items-center">
          {/* Cart */}
          <Menu as="div" className="relative">
            <MenuButton className="relative flex items-center px-3 py-2 rounded-full hover:bg-gray-100">
              <ShoppingCartIcon className="h-6 w-6 text-orange-600" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </MenuButton>
            <Menu.Items className="absolute right-0 mt-2 w-80  origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <CartDropdown cartItems={cartItems} />
            </Menu.Items>




          </Menu>

          {/* User */}
          {user ? (
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-orange-200 text-orange-600 font-semibold">
                Hi, {user.name} 👋
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="py-1">
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/account"
                        className={`block px-4 py-2 text-sm ${active ? "bg-gray-100" : ""
                          }`}
                      >
                        Profile
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`w-full text-left px-4 py-2 text-sm ${active ? "bg-gray-100" : ""
                          }`}
                      >
                        Logout
                      </button>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          ) : (
            <Link
              to="/LoginPage"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg flex items-center space-x-2"
            >
              Sign In →
            </Link>
          )}
        </div>
        </div>
      </div>
    </header>
  );
};

export default Header;