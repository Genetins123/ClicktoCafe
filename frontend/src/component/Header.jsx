import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Error parsing user:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/loginpage";
  };

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
          <a href="/" className="-m-1.5 flex text-xl flex-row font-bold items-center gap-2 text-orange-500 p-1.5">
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
              className={`font-bold ${
                location.pathname === link.path
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </PopoverGroup>

        {/* Right side (Login or Dropdown) */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4 items-center">
          {user ? (
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 text-orange-600 font-semibold">
                Hi, {user.name} 👋
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="py-1">
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : ""
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
                        className={`w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : ""
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
  )
}
