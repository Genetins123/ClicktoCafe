// src/pages/RegisterPage.jsx
import bg from '../assets/bg.png'
import Footer from '../component/Footer';
import Header from '../component/Header';
export default function RegisterPage() {
  return (
    <>
    
    <Header />
    <div className="flex items-center justify-center h-screen bg-no-repeat bg-center bg-cover h-screen" style={{ backgroundImage: `url(${bg})` }}>
      <div className="bg-white  shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-2 rounded-full font-semibold shadow hover:from-orange-600 hover:to-yellow-500"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/loginpage " className="text-orange-600 font-medium">Login</a>
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}
