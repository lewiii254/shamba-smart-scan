
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, Home, History, Info, LogOut } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {isMobile && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="icon"
            className="bg-white shadow-md"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            {mobileNavOpen ? <X /> : <Menu />}
          </Button>
        </div>
      )}

      <nav className={`
        ${isMobile ? 'fixed inset-0 z-40 bg-white/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out' : 'sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-10'}
        ${isMobile && !mobileNavOpen ? '-translate-x-full' : 'translate-x-0'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 text-green-700">
              <Link to="/">
                <img 
                  src="/placeholder.svg" 
                  alt="Crop Doctor Logo" 
                  className="w-8 h-8 text-green-500" 
                />
              </Link>
              <span className="text-xl font-bold">Crop Doctor</span>
            </div>
            
            <div className={`${isMobile ? 'flex flex-col items-center mt-20 space-y-8' : 'flex items-center space-x-4'}`}>
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 text-green-700"
                asChild
              >
                <Link to="/">
                  <Home size={18} />
                  <span>Home</span>
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 text-green-700"
                onClick={() => {
                  setActiveTab("history");
                  if (isMobile) setMobileNavOpen(false);
                }}
                asChild
              >
                <Link to="/history">
                  <History size={18} />
                  <span>History</span>
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 text-green-700"
                onClick={() => {
                  setActiveTab("about");
                  if (isMobile) setMobileNavOpen(false);
                }}
                asChild
              >
                <Link to="/about">
                  <Info size={18} />
                  <span>About</span>
                </Link>
              </Button>

              {user && (
                <>
                  <div className="flex items-center space-x-2 ml-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={user.email || ""} />
                      <AvatarFallback className="bg-green-200 text-green-800">
                        {user.email ? user.email.substring(0, 2).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-green-800 hidden md:inline">
                      {user.email}
                    </span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-2 text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
