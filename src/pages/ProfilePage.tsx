
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/AuthProvider";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen bg-green-50/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={handleGoBack}
            className="mr-4 text-green-800 hover:text-green-600 hover:bg-green-100/80"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </Button>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-md border-green-100">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" alt={user?.email || "User"} />
                  <AvatarFallback className="bg-green-100 text-green-800 text-2xl">
                    {user?.email?.charAt(0).toUpperCase() || <UserCircle className="h-12 w-12" />}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl font-bold text-green-800">
                User Profile
              </CardTitle>
              <CardDescription className="text-green-600">
                Manage your account information
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-3 items-center border-b border-green-100 pb-3">
                  <span className="font-medium text-green-700">Email:</span>
                  <span className="col-span-2">{user?.email}</span>
                </div>
                
                <div className="grid grid-cols-3 items-center border-b border-green-100 pb-3">
                  <span className="font-medium text-green-700">User ID:</span>
                  <span className="col-span-2 truncate">{user?.id}</span>
                </div>
                
                <div className="grid grid-cols-3 items-center border-b border-green-100 pb-3">
                  <span className="font-medium text-green-700">Last Sign In:</span>
                  <span className="col-span-2">
                    {user?.last_sign_in_at 
                      ? new Date(user.last_sign_in_at).toLocaleString() 
                      : "Not available"}
                  </span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-center pt-6">
              <Button 
                variant="outline" 
                className="border-green-600 text-green-700 hover:bg-green-50"
                onClick={() => navigate("/")}
              >
                Return to Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
