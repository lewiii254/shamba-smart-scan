
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Camera, History, MessageSquare, BookOpen, Users, Video, Info, 
  Plane, Bug, HandHeart, ChevronDown, Settings, MoreHorizontal, Calendar 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItemsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobile?: boolean;
  closeMenu?: () => void;
}

// Primary navigation items (always visible)
export const primaryNavItems = [
  { 
    name: "Scan", 
    path: "/scan", 
    icon: <Camera className="h-4 w-4 mr-1" />,
    authRequired: true
  },
  { 
    name: "History", 
    path: "/history", 
    icon: <History className="h-4 w-4 mr-1" />,
    authRequired: true
  },

  { 
    name: "Expert Chat", 
    path: "/specialist-chat", 
    icon: <MessageSquare className="h-4 w-4 mr-1" />,
    authRequired: true
  }
];

// Learning resources group
export const learningNavItems = [
  { 
    name: "Disease Library", 
    path: "/disease-library", 
    icon: <BookOpen className="h-4 w-4 mr-1" />,
    authRequired: false
  },
  { 
    name: "Video Library", 
    path: "/video-library", 
    icon: <Video className="h-4 w-4 mr-1" />,
    authRequired: false
  },
  { 
    name: "Community Forum", 
    path: "/community-forum", 
    icon: <Users className="h-4 w-4 mr-1" />,
    authRequired: false
  }
];

// Advanced tools group
export const advancedNavItems = [
  { 
    name: "Drone Analysis", 
    path: "/drone-analysis", 
    icon: <Plane className="h-4 w-4 mr-1" />,
    authRequired: false
  },
  { 
    name: "Pest Prediction", 
    path: "/pest-prediction", 
    icon: <Bug className="h-4 w-4 mr-1" />,
    authRequired: false
  },
  { 
    name: "Partnerships", 
    path: "/partnerships", 
    icon: <HandHeart className="h-4 w-4 mr-1" />,
    authRequired: false
  },
  { 
    name: "About", 
    path: "/about", 
    icon: <Info className="h-4 w-4 mr-1" />,
    authRequired: false
  }
];

// All navigation items for mobile
export const allNavItems = [...primaryNavItems, ...learningNavItems, ...advancedNavItems];

const NavItems: React.FC<NavItemsProps> = ({ activeTab, setActiveTab, isMobile = false, closeMenu }) => {
  const navigate = useNavigate();
  const [isLearningOpen, setIsLearningOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  const handleNavigation = (path: string, tabName: string) => {
    navigate(path);
    setActiveTab(tabName.toLowerCase());
    if (isMobile && closeMenu) {
      closeMenu();
    }
  };

  const isActive = (itemName: string, itemPath: string) => {
    return (activeTab === itemName.toLowerCase() || 
            (window.location.pathname === itemPath && activeTab === ""));
  };
  
  // Mobile view - show all items in a simple list
  if (isMobile) {
    return (
      <div className="flex flex-col space-y-1">
        {allNavItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            size="sm"
            className={`justify-start w-full ${
              isActive(item.name, item.path)
                ? "bg-green-100 text-green-800" 
                : "text-gray-600 hover:bg-green-50 hover:text-green-700"
            } flex items-center`}
            onClick={() => handleNavigation(item.path, item.name)}
          >
            {item.icon}
            <span className="ml-1">{item.name}</span>
          </Button>
        ))}
      </div>
    );
  }

  // Desktop view - organized dropdowns
  return (
    <div className="flex items-center gap-1">
      {/* Primary Navigation */}
      {primaryNavItems.map((item) => (
        <Button
          key={item.name}
          variant="ghost"
          size="sm"
          className={`px-3 py-2 ${
            isActive(item.name, item.path)
              ? "bg-green-100 text-green-800" 
              : "text-gray-600 hover:bg-green-50 hover:text-green-700"
          } flex items-center`}
          onClick={() => handleNavigation(item.path, item.name)}
        >
          {item.icon}
          <span>{item.name}</span>
        </Button>
      ))}

      {/* Learning Resources Dropdown */}
      <DropdownMenu open={isLearningOpen} onOpenChange={setIsLearningOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`px-3 py-2 text-gray-600 hover:bg-green-50 hover:text-green-700 flex items-center ${
              learningNavItems.some(item => isActive(item.name, item.path)) ? "bg-green-100 text-green-800" : ""
            }`}
          >
            <BookOpen className="h-4 w-4 mr-1" />
            Learn
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {learningNavItems.map((item) => (
            <DropdownMenuItem
              key={item.name}
              onClick={() => handleNavigation(item.path, item.name)}
              className="cursor-pointer"
            >
              {item.icon}
              <span>{item.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Advanced Tools Dropdown */}
      <DropdownMenu open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`px-3 py-2 text-gray-600 hover:bg-green-50 hover:text-green-700 flex items-center ${
              advancedNavItems.some(item => isActive(item.name, item.path)) ? "bg-green-100 text-green-800" : ""
            }`}
          >
            <MoreHorizontal className="h-4 w-4 mr-1" />
            More
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {advancedNavItems.map((item) => (
            <DropdownMenuItem
              key={item.name}
              onClick={() => handleNavigation(item.path, item.name)}
              className="cursor-pointer"
            >
              {item.icon}
              <span>{item.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavItems;
