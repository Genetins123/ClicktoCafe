import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const Sidebar = ({ open, setOpen, onSignIn, onSignUp }) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={() => setOpen(false)}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        </Transition.Child>

        {/* Sidebar panel */}
        <div className="fixed inset-y-0 right-0 flex max-w-full">
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in duration-200 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="w-80 bg-[#1e1e1e] text-white shadow-xl flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={() => setOpen(false)} className="p-2">
                  <XMarkIcon className="h-6 w-6 text-gray-300" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 px-4 py-6 space-y-4">
                <button className="block w-full text-left border-b border-gray-700 pb-2">Terms & Conditions</button>
                <button className="block w-full text-left border-b border-gray-700 pb-2">Privacy Policy</button>

                <div className="flex items-center justify-between border-b border-gray-700 pb-2">
                  <span>Theme Mode</span>
                  <input type="checkbox" className="accent-orange-500" />
                </div>

                <div className="flex items-center justify-between border-b border-gray-700 pb-2">
                  <span>Language</span>
                  <select className="bg-[#1e1e1e] text-white border-none outline-none">
                    <option value="en">EN 🇺🇸</option>
                    <option value="ta">TA 🇮🇳</option>
                  </select>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-6 border-t border-gray-700">
                <button
                  onClick={() => {
                    setOpen(false);
                    onSignIn();  // ✅ Trigger Sign In Modal
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <LockClosedIcon className="h-5 w-5" />
                  Sign In
                </button>

                <p className="text-center text-sm text-gray-400 mt-3">
                  Don’t have an account?{" "}
                  <button
                    onClick={() => {
                      setOpen(false);
                      onSignUp();  // ✅ Trigger Sign Up Modal
                    }}
                    className="text-orange-500 font-semibold"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Sidebar;
