
import React from "react";
import { Button } from "@/components/ui/button";
import { X, Menu, Bell } from "lucide-react";
import NavItems from "./NavItems";
import { useAuth } from "@/components/AuthProvider";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/components/NotificationProvider";
import { formatDistanceToNow } from 'date-fns';

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
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications();
  
  // Filter nav items based on auth state
  const handleToggleMenu = () => setIsOpen(!isOpen);
  
  const formatTimestamp = (date: Date): string => {
    return formatDistanceToNow(date, { addSuffix: true });
  };
  
  return (
    <>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative text-gray-600 mr-1"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <div className="p-2 border-b">
              <div className="flex justify-between items-center">
                <DropdownMenuLabel className="font-medium">Notifications</DropdownMenuLabel>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all as read
                  </Button>
                )}
              </div>
            </div>
            <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <React.Fragment key={notification.id}>
                    <DropdownMenuItem 
                      className={`p-3 cursor-pointer ${!notification.read ? 'bg-amber-50' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="w-full">
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-gray-500">{notification.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatTimestamp(notification.timestamp)}</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </React.Fragment>
                ))
              ) : (
                <div className="py-6 text-center text-gray-500">No notifications</div>
              )}
            </DropdownMenuGroup>
            {notifications.length > 0 && (
              <div className="p-2 border-t text-center">
                <Button variant="ghost" size="sm" className="w-full text-amber-700">
                  View all notifications
                </Button>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      <Button
        variant="ghost"
        className="ml-1 text-gray-600"
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
