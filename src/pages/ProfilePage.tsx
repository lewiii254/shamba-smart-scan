
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UserCircle, Mail, Calendar, Key } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/AuthProvider";
import { Separator } from "@/components/ui/separator";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50/50">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-800">Not Authenticated</CardTitle>
            <CardDescription className="text-green-600">
              Please sign in to view your profile
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate("/auth")} className="bg-green-600 hover:bg-green-700">
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-green-50/50 transition-all duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={handleGoBack}
            className="mr-4 text-green-800 hover:text-green-600 hover:bg-green-100/80 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </Button>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-green-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
            <CardHeader className="text-center pb-2 bg-gradient-to-r from-green-50 to-green-100">
              <div className="mx-auto mb-4 relative">
                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                  <AvatarImage src="" alt={user?.email || "User"} />
                  <AvatarFallback className="bg-green-100 text-green-800 text-2xl">
                    {user?.email?.charAt(0).toUpperCase() || <UserCircle className="h-12 w-12" />}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl font-bold text-green-800 mb-1">
                User Profile
              </CardTitle>
              <CardDescription className="text-green-600">
                Manage your account information
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center p-3 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors">
                  <Mail className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-green-700">Email Address</div>
                    <div className="text-base">{user?.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors">
                  <Key className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-green-700">User ID</div>
                    <div className="text-base truncate">{user?.id}</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors">
                  <Calendar className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-green-700">Last Sign In</div>
                    <div className="text-base">
                      {user?.last_sign_in_at 
                        ? new Date(user.last_sign_in_at).toLocaleString() 
                        : "Not available"}
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6 bg-green-100" />
              
              <div className="rounded-lg bg-green-50/70 p-4 text-sm text-green-700">
                <p className="font-medium mb-1">Account Security</p>
                <p>Your account is protected with secure authentication. For security reasons, some account information can only be changed through the authentication settings.</p>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-center pt-2 pb-6">
              <Button 
                variant="outline" 
                className="border-green-600 text-green-700 hover:bg-green-50 mr-3"
                onClick={() => navigate("/")}
              >
                Return to Home
              </Button>
              <Button 
                variant="default"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => navigate("/scan")}
              >
                Scan Plants
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
