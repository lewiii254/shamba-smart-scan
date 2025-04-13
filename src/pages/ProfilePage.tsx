
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UserCircle, Mail, Calendar, Key, Camera, Edit, Save, History, BookOpen, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/AuthProvider";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.email?.split('@')[0] || "User");
  const [bio, setBio] = useState("No bio available");
  
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
      duration: 3000,
    });
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
        
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-green-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
            <CardHeader className="text-center pb-2 bg-gradient-to-r from-green-50 to-green-100">
              <div className="mx-auto mb-4 relative">
                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                  <AvatarImage src="" alt={user?.email || "User"} />
                  <AvatarFallback className="bg-green-100 text-green-800 text-2xl">
                    {user?.email?.charAt(0).toUpperCase() || <UserCircle className="h-12 w-12" />}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute bottom-0 right-0 bg-white rounded-full shadow-sm hover:bg-green-50"
                >
                  <Camera className="h-4 w-4 text-green-700" />
                </Button>
              </div>
              <CardTitle className="text-2xl font-bold text-green-800 mb-1">
                {isEditing ? (
                  <Input 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="max-w-[250px] mx-auto text-center"
                  />
                ) : (
                  displayName
                )}
              </CardTitle>
              <CardDescription className="text-green-600">
                {user?.email}
              </CardDescription>
            </CardHeader>
            
            <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mx-6 my-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="px-6">
                <CardContent className="pt-2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-green-800">Personal Information</h3>
                    {!isEditing ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-1 border-green-600 text-green-700 hover:bg-green-50"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    ) : (
                      <Button 
                        variant="default" 
                        size="sm" 
                        onClick={handleSaveProfile}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                      >
                        <Save className="h-4 w-4" />
                        Save
                      </Button>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-green-700 mb-1 block">Bio</label>
                        <Input 
                          as="textarea"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="h-24 min-h-[80px]"
                        />
                      </div>
                    </div>
                  ) : (
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
                      
                      <div className="flex items-start p-3 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors">
                        <UserCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-green-700">Bio</div>
                          <div className="text-base">{bio}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Separator className="my-6 bg-green-100" />
                  
                  <div className="rounded-lg bg-green-50/70 p-4 text-sm text-green-700">
                    <p className="font-medium mb-1">Account Security</p>
                    <p>Your account is protected with secure authentication. For security reasons, some account information can only be changed through the authentication settings.</p>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="activity" className="px-6">
                <CardContent className="pt-2 pb-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Recent Activity</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start p-3 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors">
                      <History className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">Scanned tomato plant</div>
                        <div className="text-sm text-green-700">2 days ago</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-3 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors">
                      <BookOpen className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">Viewed disease library</div>
                        <div className="text-sm text-green-700">1 week ago</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-3 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors">
                      <Video className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">Watched "Sustainable Farming" tutorial</div>
                        <div className="text-sm text-green-700">2 weeks ago</div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-green-600 text-green-700 hover:bg-green-50 mt-4"
                    >
                      View All Activity
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="saved" className="px-6">
                <CardContent className="pt-2 pb-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Saved Items</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start p-3 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors">
                      <BookOpen className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">Early Blight Disease Guide</div>
                        <div className="text-sm text-green-700">Saved from Disease Library</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-3 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors">
                      <Video className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                      <div>
                        <div className="font-medium">Crop Rotation Techniques</div>
                        <div className="text-sm text-green-700">Saved from Video Tutorials</div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-green-600 text-green-700 hover:bg-green-50 mt-4"
                    >
                      Manage Saved Items
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
            
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
