import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-grad4start to-grad4end text-grad2start py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="space-y-2">
          <h2 className="text-xl font-heading font-bold text-grad1end">StackFood</h2>
          <p className="text-sm font-body text-grad2start">
            Build your own multi-restaurant food ordering & delivery platform.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold font-heading text-grad1end">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Features</a></li>
            <li><a href="#" className="hover:text-white">Pricing</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold font-heading text-grad1end">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">Instagram</a>
          </div>
        </div>

      </div>
      <div className="border-t border-grad2end mt-8 pt-4 text-center text-sm">
        © 2025 StackFood. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
