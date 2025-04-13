
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useNotifications, Notification } from "@/components/NotificationProvider";
import { formatDistanceToNow } from 'date-fns';

const NotificationCenter: React.FC = () => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications();

  const formatTimestamp = (date: Date): string => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative text-gray-600"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-2 border-b">
          <div className="flex justify-between items-center">
            <DropdownMenuLabel className="font-medium text-base">Notifications</DropdownMenuLabel>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        <DropdownMenuGroup className="max-h-[400px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification: Notification) => (
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
  );
};

export default NotificationCenter;
