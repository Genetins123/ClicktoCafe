import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import CartDropdown from "./CartDropdown";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import Sidebar from "./Sidebar"; // Sidebar import
import { ChevronDown, Search } from "lucide-react";


import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ShoppingCartIcon, Bars3Icon, LockClosedIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Load cart safely
  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem("cart");
      const parsed = savedCart && savedCart !== "undefined" ? JSON.parse(savedCart) : [];
      setCartItems(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error("Error loading cart:", err);
      setCartItems([]);
    }
  };

  // ✅ Load user & cart on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined" && storedUser.trim() !== "") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user:", err);
        setUser(null);
      }
    }

    loadCart();

    const handleCartUpdate = () => loadCart();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header className="bg-[#292525] text-white p-1 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto max-w-6xl flex items-center justify-between">

        {/* Left Section: Logo & Location */}
        <Link to="/" className="flex items-center space-x-4">
          <div className="bg-orange-500 p- rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
              />
            </svg>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer text-sm">
            <FontAwesomeIcon icon={faLocationDot} className="text-orange-500" />
            <span>Select your location</span>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </Link>


        {/* Right Section */}
        <div className="flex items-center space-x-6">
          <div className="hidden lg:flex z-10 lg:flex-1 lg:justify-end gap-6 items-center">

           

            {/* User */}
            {user ? (
              <Menu as="div" className="relative">
                <MenuButton className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-orange-200 text-orange-600 font-semibold">
                  Hi, {user.username} 👋
                </MenuButton>
                <MenuItems className="absolute right-0 mt-2 z-60 w-48 origin-top-right rounded-md bg-[#1f1f1f] shadow-lg ring-1 ring-black/20 focus:outline-none">
                  <div className="py-1 flex flex-col">
                    {[
                      { label: "Favourites", to: "/favorites" },
                      { label: "Profile", to: "/account" },
                     
                      { label: "Settings", to: "/settings" },
                    ].map((item, idx) => (
                      <MenuItem key={idx}>
                        {({ active }) => (
                          <Link
                            to={item.to}
                            className={`block px-4 py-2 text-sm text-white hover:bg-gray-700 transition ${active ? "bg-gray-700" : ""
                              }`}
                          >
                            {item.label}
                          </Link>
                        )}
                      </MenuItem>
                    ))}
                    {/* Logout */}
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition ${active ? "bg-gray-700" : ""
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
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 gap-2 px-6 rounded-lg shadow-lg flex items-center space-x-2"
              >
                <LockClosedIcon className="h-5 w-5" />
                Sign In
              </button>
            )}


            {/* Popups */}
            <LoginModal
              isOpen={isLoginOpen}
              onClose={() => setIsLoginOpen(false)}
              onSwitchToSignup={() => {
                setIsLoginOpen(false);
                setIsSignupOpen(true);
              }}
            />
            <SignupModal
              isOpen={isSignupOpen}
              onClose={() => setIsSignupOpen(false)}
              onSwitchToLogin={() => {
                setIsSignupOpen(false);
                setIsLoginOpen(true);
              }}
            />
          </div>

          {/* Mobile Hamburger */}
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2">
            <Bars3Icon className="h-7 w-7 text-orange-500" />
          </button>
        </div>
      </div>

      {/* Sidebar outside container */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onSignIn={() => setIsLoginOpen(true)}
        onSignUp={() => setIsSignupOpen(true)}
      />
    </header>
  );
};

export default Header;
