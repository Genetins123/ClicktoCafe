'use client'
import { Link, useLocation } from 'react-router-dom';  // useLocation import

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation(); // current path kidaikum

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Takeaway", path: "/takeaway" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Logo */}
        <div className="flex  lg:flex-1">
          <a href="/" className="-m-1.5 flex text-xl flex-row font-bold items-center gap-2  justify-center text-orange-500   p-1.5">
            
            <img
              alt=""
              src="https://png.pngtree.com/png-clipart/20210309/original/pngtree-coffee-logo-png-image_5898135.jpg"
              className="h-8 w-auto"
            />
            ClicktoCafe
          </a>
          
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* Desktop Nav Links */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-bold ${
                location.pathname === link.path
                  ? "text-black"   // Active page -> black
                  : "text-gray-500 hover:text-black" // Inactive -> gray
              }`}
            >
              {link.name}
            </Link>
          ))}
        </PopoverGroup>

        {/* Login Btn */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/LoginPage" className="
            bg-gradient-to-r from-orange-500 to-yellow-400 
            text-white font-semibold 
            px-6 py-2 
            rounded-full 
            shadow-lg 
            hover:from-orange-600 hover:to-yellow-500 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
          ">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
          <a href="/" className="-m-1.5 flex flex-row font-bold items-center gap-2  justify-center text-orange-500   p-1.5">
            
            <img
              alt=""
              src="https://png.pngtree.com/png-clipart/20210309/original/pngtree-coffee-logo-png-image_5898135.jpg"
              className="h-8 w-auto"
            />
            ClicktoCafe
          </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Mobile Nav Links */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block rounded-lg px-3 py-2 text-base font-semibold ${
                      location.pathname === link.path
                        ? "text-black"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  to="/loginpage"
                  className="block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-500 hover:text-black"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
