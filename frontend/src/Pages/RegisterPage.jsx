// src/pages/RegisterPage.jsx
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ Eye icons
import bg from "../assets/bg.png";
import Footer from "../component/Footer";
import Header from "../component/Header";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/home/user/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
      } else {
        setSuccess("✅ Account created successfully!");
        setForm({ name: "", email: "", password: "" });
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <>
      <Header />
      <div
        className="flex items-center justify-center h-screen bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="bg-white shadow-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Create Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            {/* Password with show/hide */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-2 rounded-full font-semibold shadow hover:from-orange-600 hover:to-yellow-500"
            >
              Register
            </button>
          </form>

          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
          {success && <p className="mt-4 text-center text-green-600">{success}</p>}

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/loginpage" className="text-orange-600 font-medium">
              Login
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
