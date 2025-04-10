
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Play } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

// Define video tutorial type
interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  category: string;
  instructor: {
    name: string;
    avatar: string;
    initials: string;
  };
}

const VideoLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const isMobile = useIsMobile();
  
  // Mock data for video tutorials
  const videoTutorials: VideoTutorial[] = [
    {
      id: "v1",
      title: "Identifying Common Plant Diseases",
      description: "Learn how to identify the most common plant diseases affecting crops in East Africa.",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      duration: "14:35",
      views: "15k",
      category: "disease",
      instructor: {
        name: "Dr. Alex Edwards",
        avatar: "/placeholder.svg",
        initials: "AE"
      }
    },
    {
      id: "v2",
      title: "Organic Farming Techniques",
      description: "Sustainable farming methods that improve soil health and increase crop yields.",
      thumbnail: "https://img.youtube.com/vi/XVOlXXnX1yk/hqdefault.jpg",
      duration: "23:12",
      views: "8.7k",
      category: "techniques",
      instructor: {
        name: "Mary Kimani",
        avatar: "/placeholder.svg",
        initials: "MK"
      }
    },
    {
      id: "v3",
      title: "Integrated Pest Management",
      description: "Effective strategies to manage pests while minimizing the use of chemical pesticides.",
      thumbnail: "https://img.youtube.com/vi/LZhnCxG0-qc/hqdefault.jpg",
      duration: "17:45",
      views: "12.3k",
      category: "prevention",
      instructor: {
        name: "John Ndegwa",
        avatar: "/placeholder.svg",
        initials: "JN"
      }
    },
    {
      id: "v4",
      title: "Soil Health Management",
      description: "Techniques to test and improve your soil for optimal plant growth.",
      thumbnail: "https://img.youtube.com/vi/J7J0XzcpWHs/hqdefault.jpg",
      duration: "19:23",
      views: "7.2k",
      category: "techniques",
      instructor: {
        name: "Sarah Omondi",
        avatar: "/placeholder.svg",
        initials: "SO"
      }
    },
    {
      id: "v5",
      title: "Disease Prevention Strategies",
      description: "Proactive measures to prevent common plant diseases in your crops.",
      thumbnail: "https://img.youtube.com/vi/BLJ8GVHrG-8/hqdefault.jpg",
      duration: "15:18",
      views: "9.5k",
      category: "prevention",
      instructor: {
        name: "Dr. Michael Njoroge",
        avatar: "/placeholder.svg",
        initials: "MN"
      }
    },
    {
      id: "v6",
      title: "Treating Fungal Infections",
      description: "Step-by-step guide to treating various fungal infections in plants.",
      thumbnail: "https://img.youtube.com/vi/L3lUOVTFtdU/hqdefault.jpg",
      duration: "21:47",
      views: "11.3k",
      category: "treatment",
      instructor: {
        name: "Elizabeth Wanjiru",
        avatar: "/placeholder.svg",
        initials: "EW"
      }
    }
  ];
  
  // Filter videos based on search query and active category
  const filteredVideos = videoTutorials.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || video.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  const handleVideoClick = (videoId: string) => {
    // In a real application, this would navigate to the video player page or open a modal
    console.log("Opening video:", videoId);
    alert("Video player functionality would open here for video ID: " + videoId);
  };
  
  return (
    <div className="min-h-screen bg-amber-50/50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-2">Video Tutorials</h1>
          <p className="text-amber-700">Educational content on farming practices, disease management, and more.</p>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input 
            className="pl-10 border-amber-200 focus-visible:ring-amber-500"
            placeholder="Search for tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="bg-amber-100 mb-6">
            <TabsTrigger value="all">All Videos</TabsTrigger>
            <TabsTrigger value="disease">Disease ID</TabsTrigger>
            <TabsTrigger value="prevention">Prevention</TabsTrigger>
            <TabsTrigger value="treatment">Treatment</TabsTrigger>
            <TabsTrigger value="techniques">Techniques</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeCategory} className="mt-0">
            <div className={`grid grid-cols-1 ${isMobile ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-6`}>
              {filteredVideos.length > 0 ? (
                filteredVideos.map(video => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleVideoClick(video.id)}>
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div className="bg-amber-500 rounded-full p-3">
                          <Play className="h-8 w-8 text-white" fill="white" />
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      <Badge className="absolute bottom-2 left-2 bg-amber-500/90">
                        {video.category.charAt(0).toUpperCase() + video.category.slice(1)}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-amber-800 text-lg line-clamp-1">{video.title}</h3>
                      <p className="text-amber-700 mt-2 text-sm line-clamp-2">{video.description}</p>
                      <div className="flex items-center mt-3 justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={video.instructor.avatar} />
                            <AvatarFallback>{video.instructor.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-600">{video.instructor.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{video.views} views</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-amber-800">No videos found matching your search criteria.</p>
                  <p className="text-amber-600 mt-2">Try adjusting your search or category filters.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VideoLibrary;
