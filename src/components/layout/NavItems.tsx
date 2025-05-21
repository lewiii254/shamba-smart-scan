
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
    name: "Scan Plants", 
    path: "/scan", 
    icon: <Camera className="h-5 w-5 mr-1" />,
    authRequired: true
  },
  { 
    name: "Disease Library", 
    path: "/disease-library", 
    icon: <BookOpen className="h-5 w-5 mr-1" />,
    authRequired: false
  },
  { 
    name: "Community", 
    path: "/community-forum", 
    icon: <Users className="h-5 w-5 mr-1" />,
    authRequired: false
  },
  { 
    name: "Videos", 
    path: "/video-library", 
    icon: <Video className="h-5 w-5 mr-1" />,
    authRequired: false
  },
  { 
    name: "History", 
    path: "/history", 
    icon: <History className="h-5 w-5 mr-1" />,
    authRequired: true
  },
  { 
    name: "Expert Chat", 
    path: "/specialist-chat", 
    icon: <MessageSquare className="h-5 w-5 mr-1" />,
    authRequired: true
  },
  { 
    name: "About", 
    path: "/about", 
    icon: <Info className="h-5 w-5 mr-1" />,
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
    <div className={`${isMobile ? 'flex flex-col space-y-1' : 'flex flex-wrap items-center gap-1'}`}>
      {navItems.map((item) => (
        <Button
          key={item.name}
          variant="ghost"
          size="sm"
          className={`${isMobile ? "justify-start w-full" : "px-2 py-1"} ${
            (activeTab === item.name.toLowerCase() || 
              (window.location.pathname === item.path && activeTab === "")) 
              ? "bg-green-100 text-green-800" 
              : "text-gray-600 hover:bg-green-50 hover:text-green-700"
          } flex items-center`}
          onClick={() => handleNavigation(item.path, item.name)}
        >
          {item.icon}
          <span className={isMobile ? "ml-1" : ""}>{isMobile ? item.name : item.name.split(' ')[0]}</span>
        </Button>
      ))}
    </div>
  );
};

export default NavItems;
