import { useState } from "react";
import bg from '../assets/bg.png'
import Footer from '../component/Footer';
import Header from '../component/Header1';
import { useFavorites } from "../context/FavoritesContext";


export default function LoginPage() {
 const { loginUser } = useFavorites();  // use context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token
        localStorage.setItem("token", data.token);

        // Use context login (this will also save user in localStorage)
        loginUser({
          name: data.name,
          email: data.email,
          _id: data._id,
        });

        alert("Login successful!");
        window.location.href = "/";
      } else {
        alert(data.error || data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Header />      <div className="flex items-center justify-center min-h-screen h-screen bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${bg})` }}>
        <div className="bg-white shadow-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back!</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-2 rounded-full font-semibold shadow hover:from-orange-600 hover:to-yellow-500"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-orange-600 font-medium">Register</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
