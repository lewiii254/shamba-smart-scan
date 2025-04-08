
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md py-6 border-t border-green-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-green-700 mb-4 md:mb-0">
            <span className="font-semibold">© 2025 Crop Doctor</span>
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="text-green-600 hover:text-green-800 transition-colors">Home</Link>
            <Link to="/scan" className="text-green-600 hover:text-green-800 transition-colors">Scan</Link>
            <Link to="/specialist-chat" className="text-green-600 hover:text-green-800 transition-colors">Expert Chat</Link>
            <Link to="/about" className="text-green-600 hover:text-green-800 transition-colors">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
