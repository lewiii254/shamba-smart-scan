
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Camera, History, MessageSquare, BookOpen, Users, Video, Info } from "lucide-react";

interface NavItemsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobile?: boolean;
  closeMenu?: () => void;
}

export const navItems = [
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
    name: "Community Forum", 
    path: "/community-forum", 
    icon: <Users className="h-5 w-5 mr-2" />,
    authRequired: false
  },
  { 
    name: "Video Tutorials", 
    path: "/video-library", 
    icon: <Video className="h-5 w-5 mr-2" />,
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

const NavItems: React.FC<NavItemsProps> = ({ activeTab, setActiveTab, isMobile = false, closeMenu }) => {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string, tabName: string) => {
    navigate(path);
    setActiveTab(tabName.toLowerCase());
    if (isMobile && closeMenu) {
      closeMenu();
    }
  };
  
  return (
    <>
      {navItems.map((item) => (
        <Button
          key={item.name}
          variant="ghost"
          className={`flex items-center ${isMobile ? "justify-start" : ""} px-3 py-2 text-sm font-medium ${
            (activeTab === item.name.toLowerCase() || 
              (window.location.pathname === item.path && activeTab === "")) 
              ? "bg-green-100 text-green-800" 
              : "text-gray-600 hover:bg-green-50 hover:text-green-700"
          }`}
          onClick={() => handleNavigation(item.path, item.name)}
        >
          {item.icon}
          {item.name}
        </Button>
      ))}
    </>
  );
};

export default NavItems;
