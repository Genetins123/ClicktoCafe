import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Homepage from './Pages/Homepage';
import Contact from './Pages/Contact';
import About from './Pages/About'
import Admin from './admin/components/Admin';
import Takeaway from './Pages/takeaway';
function App() {
  return (
    <>   
    
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/takeaway" element={<Takeaway />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
   


</>

  );
}

export default App;
