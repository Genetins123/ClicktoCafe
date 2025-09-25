import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function LoginModal({ isOpen, onClose, onSwitchToSignup }) {
  const navigate = useNavigate();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        emailOrPhone,
        password,
      });

      console.log("Login Success:", response.data);

      // Save JWT token & user
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Show success message
      alert(response.data.message);

      // Close modal
      onClose();
      navigate("/home");  // Example: Redirect to homepage

      // Optionally reload page to update header immediately
      window.location.reload(); // Or use a global state update if using context/Redux

    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };


  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
          <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
        </Transition.Child>

        {/* Modal Panel */}
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
            <div className="bg-[#272424] rounded-2xl shadow-lg w-full max-w-3xl md:max-w-2xl sm:max-w-xl xs:max-w-sm p-10 sm:p-10 xs:p-6 relative">

              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
                onClick={onClose}
              >
                <X size={24} />
              </button>

              {/* Logo + Title */}
              <div className="flex flex-row justify-center items-center mb-6 flex-wrap">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                  alt="logo"
                  className="w-12 h-12 mr-5 mb-2 sm:w-10 sm:h-10 sm:mr-3 xs:w-8 xs:h-8 xs:mr-2"
                />
                <h2 className="text-3xl font-bold text-orange-500 sm:text-2xl xs:text-xl">
                  ClickToCafe
                </h2>
              </div>

              {/* Content */}
              <div className="flex flex-col md:flex-row gap-6">

                {/* Left Side - Login Form */}
                <div className="w-full md:w-1/2 md:pr-6 border-gray-700 md:border-r mb-6 md:mb-0">
                  <h3 className="text-white font-bold text-xl mb-3">Login</h3>
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Email / Phone"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      className="p-3 rounded-lg bg-[#272424] text-white border border-gray-700 focus:border-orange-500 focus:ring-orange-300 outline-none transition"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="p-3 rounded-lg bg-[#272424] text-white border border-gray-700 focus:border-orange-500 focus:ring-orange-300 outline-none transition"
                      required
                    />

                    {/* Remember Me + Forgot */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-400 mt-1 gap-2 sm:gap-0">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 accent-orange-500 rounded"
                        />
                        <span className="hover:text-white">Remember me</span>
                      </label>
                      <button className="text-orange-500 hover:underline" type="button">
                        Forgot password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg mt-3 font-medium transition"
                    >
                      Login
                    </button>
                  </form>

                  <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                    * By logging in, I agree with all the{" "}
                    <span className="text-orange-500 cursor-pointer hover:underline">
                      Terms & Conditions
                    </span>
                  </p>
                </div>

                {/* Right Side - Social Login */}
                <div className="w-full md:w-1/2 md:pl-6 flex flex-col items-center gap-4">
                  <p className="text-gray-400 text-sm text-center md:text-left">Or Login with</p>

                  <button className="w-full flex items-center font-bold justify-center gap-2 bg-black shadow-xl hover:bg-gray-800 text-white py-2 rounded-lg transition">
                    <img
                      src="https://www.svgrepo.com/show/355037/google.svg"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    Continue with Google
                  </button>

                  <button className="w-full flex items-center font-bold justify-center gap-2 bg-black shadow-xl hover:bg-gray-800 text-white py-2 rounded-lg transition">
                    <img
                      src="https://www.svgrepo.com/show/512702/mobile.svg"
                      alt="OTP"
                      className="w-5 h-5"
                    />
                    OTP Sign in
                  </button>

                  <p className="text-sm text-gray-400 mt-3 text-center md:text-left">
                    Don’t have an account?{" "}
                    <button
                      onClick={() => {
                        onClose();
                        onSwitchToSignup();
                      }}
                      className="text-orange-500 hover:underline"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
