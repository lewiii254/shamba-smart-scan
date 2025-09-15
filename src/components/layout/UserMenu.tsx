
import React from "react";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, LogIn, Settings, Crown, Calendar } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { mockDataService } from "@/services/mockDataService";

const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut, isUsingMockData } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
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

  if (!user) {
    return (
      <Button 
        variant="default"
        className="bg-green-600 hover:bg-green-700 text-white"
        onClick={() => navigate("/auth")}
      >
        <LogIn className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    );
  }

  return (
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
          <div className="flex flex-col">
            <span className="truncate">{user.email}</span>
            {isUsingMockData && (
              <span className="text-xs text-amber-600">Demo Mode</span>
            )}
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate("/subscription")} className="cursor-pointer">
          <Crown className="mr-2 h-4 w-4" />
          <span>Subscription</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate("/plant-timeline")} className="cursor-pointer">
          <Calendar className="mr-2 h-4 w-4" />
          <span>Plant Timeline</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
