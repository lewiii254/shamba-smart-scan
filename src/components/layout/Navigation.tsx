
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/components/AuthProvider";
import NavItems, { navItems } from "./NavItems";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  
  // Filter nav items based on auth state
  const filteredNavItems = navItems.filter(item => 
    !item.authRequired || (item.authRequired && user)
  );
  
  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (!isMobile && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, isMenuOpen]);
  
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-green-800">Crop Doctor</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-1">
              <NavItems activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          )}
          
          {/* Auth Buttons */}
          <div className="flex items-center">
            <UserMenu />
            
            {/* Mobile Menu Button */}
            {isMobile && (
              <MobileMenu 
                isOpen={isMenuOpen}
                setIsOpen={setIsMenuOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
