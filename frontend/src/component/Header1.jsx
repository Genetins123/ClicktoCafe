import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CartDropdown from "./CartDropdown";

import {
  PopoverGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Header() {
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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Takeaway", path: "/takeaway" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a
            href="/"
            className="-m-1.5 flex text-xl flex-row font-bold items-center gap-2 text-orange-500 p-1.5"
          >
            <img
              alt=""
              src="https://png.pngtree.com/png-clipart/20210309/original/pngtree-coffee-logo-png-image_5898135.jpg"
              className="h-8 w-auto"
            />
            ClicktoCafe
          </a>
        </div>

        {/* Desktop Nav Links */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-bold ${location.pathname === link.path
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </PopoverGroup>

        {/* Right side */}
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
              className="bg-gradient-to-r from-orange-500 to-yellow-400 
              text-white font-semibold px-6 py-2 
              rounded-full shadow-lg 
              hover:from-orange-600 hover:to-yellow-500
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Log in →
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
