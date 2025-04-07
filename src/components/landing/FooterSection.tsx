
import React from "react";
import { Link } from "react-router-dom";
import { Sprout, Cloud, Sun } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md py-8 border-t border-green-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-4">Crop Doctor 🌱</h3>
            <p className="text-green-700 mb-4">Helping farmers and gardeners worldwide protect their plants with AI-powered diagnosis.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-600 hover:text-green-800 transition-colors">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="#" className="text-green-600 hover:text-green-800 transition-colors">
                <span className="sr-only">Facebook</span>
                📘
              </a>
              <a href="#" className="text-green-600 hover:text-green-800 transition-colors">
                <span className="sr-only">Instagram</span>
                📸
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-green-600 hover:text-green-800 transition-colors">Home</Link></li>
              <li><Link to="/scan" className="text-green-600 hover:text-green-800 transition-colors">Scan Plants</Link></li>
              <li><Link to="/history" className="text-green-600 hover:text-green-800 transition-colors">Scan History</Link></li>
              <li><Link to="/about" className="text-green-600 hover:text-green-800 transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-green-700">
                <Sprout className="h-5 w-5 text-green-600 mr-2" />
                support@cropdoctor.com
              </li>
              <li className="flex items-center text-green-700">
                <Cloud className="h-5 w-5 text-green-600 mr-2" />
                Download our mobile app
              </li>
              <li className="flex items-center text-green-700">
                <Sun className="h-5 w-5 text-green-600 mr-2" />
                Subscribe to plant tips
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-green-100">
          <div className="text-green-700 mb-4 md:mb-0">
            <span className="font-semibold">© 2025 Crop Doctor</span> - Growing a healthier world 🌎
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="text-green-600 hover:text-green-800 transition-colors">Privacy</Link>
            <Link to="/" className="text-green-600 hover:text-green-800 transition-colors">Terms</Link>
            <Link to="/" className="text-green-600 hover:text-green-800 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
