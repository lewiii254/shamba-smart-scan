
import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Leaf, Info, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md py-6 border-t border-green-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-green-700 mb-4 md:mb-0">
            <span className="font-semibold">© 2025 Crop Doctor</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link to="/" className="text-green-600 hover:text-green-800 transition-colors flex items-center">
              <Leaf className="h-4 w-4 mr-1" />
              <span>Home</span>
            </Link>
            <Link to="/scan" className="text-green-600 hover:text-green-800 transition-colors flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Scan</span>
            </Link>
            <Link to="/specialist-chat" className="text-green-600 hover:text-green-800 transition-colors flex items-center font-medium">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>Expert Chat</span>
            </Link>
            <Link to="/about" className="text-green-600 hover:text-green-800 transition-colors flex items-center">
              <Info className="h-4 w-4 mr-1" />
              <span>About</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
