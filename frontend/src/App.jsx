import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import UnifiedHeader from './component/Header';
import Header1 from './component/Header1';
import Footer from './component/Footer';
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import FloatingCartButton from "./component/FloatingCartButton";
import CartSidebar from "./component/CartSidebar";
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Homepage from './Pages/Homepage';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Admin from './admin/components/Admin';
import MyAccountPage from './Pages/MyAccountPage';
import Takeaway from './Pages/Takeaway';
import RestaurantFoods from './Pages/RestaurantFoods';
import FavoritesPage from './Pages/FavoritesPage';
import CartPage from './Pages/CartPage';
import Home from './Pages/Home';
import Restaurant from './Pages/Restaurant';
import CheckoutPage from './Pages/CheckoutPage';
import Categories from './Pages/Categories';
import OrdersPage from './Pages/OrdersPage';

// Layout wrapper to handle header/footer logic
const Layout = ({ user, children }) => {
  const location = useLocation();

  const isAdminPage = location.pathname === '/admin'; // ONLY exact /admin

  return (
    <>
      {!isAdminPage && <UnifiedHeader />}
      {!isAdminPage && user && <Header1 />}

      <div className="pt-[120px]">
        {children}
      </div>

      {!isAdminPage && <Footer />}
    </>
  );
};

function App() {
  const [user, setUser] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <BrowserRouter>
          <CartProvider>

      <Layout user={user}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/takeaway" element={<Takeaway />} />
          <Route path='/restaurant' element={<Restaurant />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/orders' element={<OrdersPage />} />

          {/* Admin page */}
          <Route path="/admin" element={<Admin />} />

          <Route path="/account" element={<MyAccountPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/restaurant/:id" element={<RestaurantFoods />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>

      </Layout>
        {/* Floating cart + sidebar */}
        <FloatingCartButton onOpen={() => setIsCartOpen(true)} />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Toaster position="top-center" reverseOrder={false} />
      </CartProvider>

    </BrowserRouter>

  );
}

export default App;
