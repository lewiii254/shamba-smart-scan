
import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Leaf, Info, Clock, Users, Phone, Mail, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Footer = () => {
  const isMobile = useIsMobile();
  
  return (
    <footer className="bg-white/80 backdrop-blur-md py-8 border-t border-green-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <div className="flex items-center space-x-2 text-green-700 mb-4">
              <img 
                src="/placeholder.svg" 
                alt="Crop Doctor Logo" 
                className="w-8 h-8 text-green-500" 
              />
              <span className="text-xl font-bold">Crop Doctor</span>
            </div>
            <p className="text-green-600 text-sm mb-4">
              Using advanced AI technology to help farmers diagnose and treat plant diseases, improving crop yields worldwide.
            </p>
            <div className="flex space-x-4 text-green-600">
              <a href="#" aria-label="Twitter" className="hover:text-green-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-1-4.8 4-8.5 7.5-5.5.7-.8 1.5-1.5 2.5-2z"></path></svg>
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-green-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-green-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-green-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-4">Quick Links</h3>
            <div className={`grid grid-cols-${isMobile ? '2' : '1'} gap-2`}>
              <Link to="/" className="text-green-600 hover:text-green-800 transition-colors flex items-center">
                <Leaf className="h-4 w-4 mr-2" />
                <span>Home</span>
              </Link>
              <Link to="/scan" className="text-green-600 hover:text-green-800 transition-colors flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Scan Plants</span>
              </Link>
              <Link to="/specialist-chat" className="text-green-600 hover:text-green-800 transition-colors flex items-center font-medium">
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>Expert Chat</span>
              </Link>
              <Link to="/about" className="text-green-600 hover:text-green-800 transition-colors flex items-center">
                <Info className="h-4 w-4 mr-2" />
                <span>About Us</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start text-green-600">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                <span className="text-sm">123 Farm Road, AgTech Valley, CA 94025</span>
              </div>
              <div className="flex items-center text-green-600">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">support@cropdoctor.com</span>
              </div>
              <div className="flex items-center text-green-600">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-green-600">
                <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                <Link to="/specialist-chat" className="text-sm hover:text-green-800 transition-colors">
                  Connect with Our Experts
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={`flex flex-col ${isMobile ? 'space-y-4' : 'md:flex-row'} justify-between items-center pt-4 border-t border-green-100`}>
          <div className="text-green-700">
            <span className="font-semibold">© 2025 Crop Doctor</span>
          </div>
          <div className="flex gap-4 md:gap-6">
            <Link to="/privacy" className="text-green-600 hover:text-green-800 transition-colors text-sm">Privacy</Link>
            <Link to="/terms" className="text-green-600 hover:text-green-800 transition-colors text-sm">Terms</Link>
            <Link to="/cookies" className="text-green-600 hover:text-green-800 transition-colors text-sm">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
