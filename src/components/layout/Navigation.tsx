
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import UserMenu from "./UserMenu";
import NavItems from "./NavItems";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Close mobile menu when navigating
  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl">🌿</span>
                <span className="font-bold text-gray-900 text-lg hidden md:block">AI Crop Doctor</span>
              </Link>
              
              {/* Display premium badge if user has premium subscription */}
              {user && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-full hidden md:flex items-center">
                  PREMIUM
                </span>
              )}
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:ml-6 md:flex items-center space-x-4">
              <NavItems />
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/subscription">
                  <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                    Upgrade
                  </Button>
                </Link>
                <UserMenu />
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/auth?mode=signin">Log in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/auth?mode=signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <NavItems mobile />
        </div>
        {/* Mobile auth buttons */}
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center justify-between px-4">
            {user ? (
              <div className="flex w-full justify-between items-center">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img 
                      className="h-10 w-10 rounded-full"
                      src={user.user_metadata?.avatar_url || "/placeholder.svg"}
                      alt="User avatar"
                    />
                  </div>
                  <div className="ml-3 text-left">
                    <div className="text-base font-medium text-gray-800">
                      {user.user_metadata?.full_name || "User"}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </div>
                <Link to="/subscription">
                  <Button variant="outline" size="sm" className="text-green-600 border-green-600">
                    Upgrade
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex w-full gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/auth?mode=signin">Log in</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link to="/auth?mode=signup">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
          {user && (
            <div className="mt-3 space-y-1 px-2">
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Your Profile
              </Link>
              <Link
                to="/history"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Scan History
              </Link>
              <Button 
                variant="ghost"
                className="w-full justify-start px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                // onClick={signOut}
              >
                Sign out
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
