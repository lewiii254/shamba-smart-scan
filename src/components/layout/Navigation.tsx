
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Leaf, Camera, Menu, X, History, LogOut, User, LogIn, Info, MessageSquare, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/AuthProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account"
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: "An error occurred while signing out",
        variant: "destructive"
      });
    }
  };
  
  const navItems = [
    { 
      name: "Home", 
      path: "/", 
      icon: <Leaf className="h-5 w-5 mr-2" />,
      authRequired: false
    },
    { 
      name: "Scan Plants", 
      path: "/scan", 
      icon: <Camera className="h-5 w-5 mr-2" />,
      authRequired: true
    },
    { 
      name: "Disease Library", 
      path: "/disease-library", 
      icon: <BookOpen className="h-5 w-5 mr-2" />,
      authRequired: false
    },
    { 
      name: "History", 
      path: "/history", 
      icon: <History className="h-5 w-5 mr-2" />,
      authRequired: true
    },
    { 
      name: "Expert Chat", 
      path: "/specialist-chat", 
      icon: <MessageSquare className="h-5 w-5 mr-2" />,
      authRequired: true
    },
    { 
      name: "About", 
      path: "/about", 
      icon: <Info className="h-5 w-5 mr-2" />,
      authRequired: false
    }
  ];
  
  // Filter nav items based on auth state
  const filteredNavItems = navItems.filter(item => 
    !item.authRequired || (item.authRequired && user)
  );
  
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
              {filteredNavItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`flex items-center px-3 py-2 text-sm font-medium ${
                    (activeTab === item.name.toLowerCase() || 
                     (window.location.pathname === item.path && activeTab === "")) 
                      ? "bg-green-100 text-green-800" 
                      : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`}
                  onClick={() => {
                    navigate(item.path);
                    setActiveTab(item.name.toLowerCase());
                  }}
                >
                  {item.icon}
                  {item.name}
                </Button>
              ))}
            </div>
          )}
          
          {/* Auth Buttons */}
          <div className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" alt={user.email || ""} />
                      <AvatarFallback className="bg-green-100 text-green-800">
                        {user.email?.charAt(0).toUpperCase() || <User className="h-6 w-6" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white">
                  <DropdownMenuItem className="font-normal flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span className="truncate">{user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="default"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => navigate("/auth")}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
            
            {/* Mobile Menu Button */}
            {isMobile && (
              <Button
                variant="ghost"
                className="ml-2 text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
                <span className="sr-only">Open menu</span>
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobile && isMenuOpen && (
          <div className="md:hidden pt-2 pb-4 border-t border-green-100">
            <div className="flex flex-col space-y-1">
              {filteredNavItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`flex items-center justify-start px-3 py-2 text-sm font-medium ${
                    (activeTab === item.name.toLowerCase() || 
                     (window.location.pathname === item.path && activeTab === "")) 
                      ? "bg-green-100 text-green-800" 
                      : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`}
                  onClick={() => {
                    navigate(item.path);
                    setActiveTab(item.name.toLowerCase());
                    setIsMenuOpen(false);
                  }}
                >
                  {item.icon}
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
