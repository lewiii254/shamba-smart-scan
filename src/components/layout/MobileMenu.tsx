
import React from "react";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import NavItems from "./NavItems";
import { useAuth } from "@/components/AuthProvider";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  setIsOpen, 
  activeTab, 
  setActiveTab 
}) => {
  const { user } = useAuth();
  
  // Filter nav items based on auth state
  const handleToggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <>
      <Button
        variant="ghost"
        className="ml-2 text-gray-600"
        onClick={handleToggleMenu}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
        <span className="sr-only">Open menu</span>
      </Button>
      
      {isOpen && (
        <div className="md:hidden pt-2 pb-4 border-t border-green-100 absolute top-16 left-0 right-0 bg-white z-50 shadow-md">
          <div className="flex flex-col space-y-1 px-4">
            <NavItems 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              isMobile={true} 
              closeMenu={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
