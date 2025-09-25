import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [message, setMessage] = useState(""); // ✅ Success/Error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      setMessage("Please accept the terms and conditions");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const userData = { username: userName, email, phone, password, confirmPassword };

    try {
      const response = await axios.post("http://localhost:5000/api/user/register", userData);
      setMessage(response.data.message); // ✅ Show success message

      // Reset form
      setUserName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setAcceptedTerms(false);

      // Close signup and open login modal after 1 sec
      setTimeout(() => {
        onClose();
        onSwitchToLogin();
      }, 1000);

    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-300 transform"
          enterFrom="scale-95 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="transition ease-in duration-200 transform"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-95 opacity-0"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#272424] p-10 sm:p-10 xs:p-6 rounded-2xl shadow-lg w-full max-w-3xl relative">
              
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
                onClick={onClose}
              >
                <X size={24} />
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-center mb-3 flex-wrap">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                  alt="logo"
                  className="w-12 h-12 mr-0 sm:mr-5 mb-2 sm:mb-0"
                />
                <h2 className="text-4xl sm:text-3xl xs:text-2xl font-bold text-orange-500 text-center sm:text-left">
                  ClickToCafe
                </h2>
              </div>

              <div className="flex justify-center mb-6">
                <h3 className="text-white font-bold text-xl">Sign Up</h3>
              </div>

              {/* ✅ Message */}
              {message && (
                <p className={`text-center mb-4 ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
                  {message}
                </p>
              )}

              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="User Name *"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="p-3 rounded-lg bg-[#272424] text-white border border-gray-700 focus:border-orange-500 focus:ring-orange-300 outline-none transition w-full"
                  required
                />

                <input
                  type="email"
                  placeholder="Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 rounded-lg bg-[#272424] text-white border border-gray-700 focus:border-orange-500 focus:ring-orange-300 outline-none transition w-full"
                  required
                />

                <input
                  type="text"
                  placeholder="Phone *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-3 rounded-lg bg-[#272424] text-white border border-gray-700 focus:border-orange-500 focus:ring-orange-300 outline-none transition w-full"
                  required
                />

                <input
                  type="password"
                  placeholder="Password *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 rounded-lg bg-[#272424] text-white border border-gray-700 focus:border-orange-500 focus:ring-orange-300 outline-none transition w-full"
                  required
                />

                <input
                  type="password"
                  placeholder="Confirm Password *"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-3 rounded-lg bg-[#272424] text-white border border-gray-700 focus:border-orange-500 focus:ring-orange-300 outline-none transition w-full"
                  required
                />

                <div className="flex items-center gap-2 text-sm text-gray-400 mt-4 sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-4 h-4 accent-orange-500 rounded"
                    required
                  />
                  <p>
                    I accept all the{" "}
                    <span className="text-orange-500 cursor-pointer hover:underline">
                      Terms and conditions
                    </span>
                  </p>
                </div>

                <div className="flex justify-center sm:col-span-2">
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-12 sm:px-24 py-2 rounded-lg mt-4 font-medium transition w-full sm:w-auto"
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <p className="text-center text-sm text-gray-400 mt-4">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    onClose();
                    onSwitchToLogin();
                  }}
                  className="text-orange-500 hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
