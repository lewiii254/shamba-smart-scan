import React, { useState, useEffect, ChangeEvent } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { videoTutorials } from "@/data/videoTutorials";
import VideoTutorialCard from "@/components/video/VideoTutorialCard";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";

type ProfileActivity = {
  id: string;
  type: string;
  description: string;
  date: string;
};

// Sample activities data (would come from database in production)
const sampleActivities: ProfileActivity[] = [
  {
    id: "act1",
    type: "scan",
    description: "Scanned tomato plant leaves",
    date: "2023-05-15T10:30:00Z",
  },
  {
    id: "act2",
    type: "chat",
    description: "Consulted with agricultural expert",
    date: "2023-05-14T15:45:00Z",
  },
  {
    id: "act3",
    type: "watch",
    description: "Watched 'Organic Farming Techniques'",
    date: "2023-05-12T09:15:00Z",
  },
];

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+254712345678",
    location: "Nairobi, Kenya",
    farmType: "Mixed Crops",
    bio: "Small-scale farmer with 5 years of experience in organic farming practices."
  });
  const [savedVideos, setSavedVideos] = useState(videoTutorials.slice(0, 3));
  const [subscriptionStatus, setSubscriptionStatus] = useState("Free Plan");
  const [subscriptionEndDate, setSubscriptionEndDate] = useState("N/A");

  useEffect(() => {
    if (user) {
      // Load user profile data from Supabase (simplified for demo)
      console.log("Loading user data for:", user.id);
      // In production, fetch actual user data here
    }
  }, [user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      // In production, save to Supabase here
      toast({
        title: "Profile Updated!",
        description: "Your profile information has been updated successfully.",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was a problem updating your profile. Please try again.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={user?.user_metadata?.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback>{userData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle>{userData.fullName}</CardTitle>
                <CardDescription>{userData.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Subscription</p>
                    <p className="font-semibold">{subscriptionStatus}</p>
                    {subscriptionStatus !== "Free Plan" && (
                      <p className="text-xs text-gray-500">Expires: {subscriptionEndDate}</p>
                    )}
                  </div>
                  <Button className="w-full" variant="outline" onClick={() => window.location.href = "/subscription"}>
                    {subscriptionStatus === "Free Plan" ? "Upgrade Plan" : "Manage Subscription"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs defaultValue="profile">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="saved">Saved Items</TabsTrigger>
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
              </TabsList>
              
              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Manage your personal information and preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={userData.fullName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={userData.location}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farmType">Farm Type</Label>
                        <Input
                          id="farmType"
                          name="farmType"
                          value={userData.farmType}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={userData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {isEditing ? (
                      <>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={handleSaveProfile}>Save Changes</Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    )}
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your recent activities on the platform.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sampleActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4 border-b border-gray-100 pb-4">
                          <div className={`rounded-full p-2 ${
                            activity.type === 'scan' ? 'bg-green-100 text-green-600' : 
                            activity.type === 'chat' ? 'bg-blue-100 text-blue-600' : 
                            'bg-amber-100 text-amber-600'
                          }`}>
                            {activity.type === 'scan' ? '📷' : activity.type === 'chat' ? '💬' : '📺'}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.description}</p>
                            <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Saved Items Tab */}
              <TabsContent value="saved">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Items</CardTitle>
                    <CardDescription>
                      Videos and resources you've saved for later.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {savedVideos.map((video) => (
                        <VideoTutorialCard key={video.id} video={video} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Subscription Tab */}
              <TabsContent value="subscription">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Subscription</CardTitle>
                    <CardDescription>
                      Manage your subscription plan and payment methods.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold">Current Plan: {subscriptionStatus}</h3>
                      {subscriptionStatus !== "Free Plan" && (
                        <p className="text-sm text-gray-500">Your subscription will renew on {subscriptionEndDate}</p>
                      )}
                      <div className="mt-4">
                        <Button variant="outline" className="mr-2">View Plan Details</Button>
                        {subscriptionStatus !== "Free Plan" && (
                          <Button variant="destructive">Cancel Subscription</Button>
                        )}
                      </div>
                    </div>

                    {subscriptionStatus === "Free Plan" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <SubscriptionPlanCard 
                          title="Premium Monthly"
                          price="Ksh 999/month"
                          features={["Unlimited AI scans", "Priority chat support", "Access to expert consultations", "All video tutorials"]}
                          recommended={false}
                        />
                        <SubscriptionPlanCard 
                          title="Premium Annual"
                          price="Ksh 9,999/year"
                          features={["Everything in monthly", "2 months free", "Exclusive webinars", "Downloadable resources"]}
                          recommended={true}
                        />
                        <SubscriptionPlanCard 
                          title="Enterprise"
                          price="Custom pricing"
                          features={["Multi-user accounts", "API access", "Dedicated account manager", "Custom training"]}
                          recommended={false}
                          isEnterprise={true}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface SubscriptionPlanCardProps {
  title: string;
  price: string;
  features: string[];
  recommended: boolean;
  isEnterprise?: boolean;
}

const SubscriptionPlanCard = ({ title, price, features, recommended, isEnterprise = false }: SubscriptionPlanCardProps) => {
  return (
    <div className={`border rounded-lg p-6 relative ${recommended ? 'border-green-500 shadow-md' : ''}`}>
      {recommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold">
          Best Value
        </div>
      )}
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-2xl font-bold my-4">{price}</p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full" variant={isEnterprise ? "outline" : "default"}>
        {isEnterprise ? "Contact Sales" : "Subscribe"}
      </Button>
    </div>
  );
};

export default ProfilePage;
