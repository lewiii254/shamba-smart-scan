
import React, { useState, useMemo } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import VideoTutorialCard from "@/components/video/VideoTutorialCard";
import VideoSearchFilter from "@/components/video/VideoSearchFilter";
import VideoModal from "@/components/video/VideoModal";
import { videoTutorials } from "@/data/videoTutorials";
import { VideoTutorial } from "@/types/video";
import { ArrowLeft, PlayCircle, Clock, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VideoLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"views" | "duration" | "title">("views");
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  // Filter and sort videos
  const filteredAndSortedVideos = useMemo(() => {
    let filtered = videoTutorials.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            video.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || video.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort videos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "views":
          const aViews = parseInt(a.views.replace(/[^\d]/g, ''));
          const bViews = parseInt(b.views.replace(/[^\d]/g, ''));
          return bViews - aViews;
        case "duration":
          const aDuration = a.duration.split(':').reduce((acc, time) => (60 * acc) + +time, 0);
          const bDuration = b.duration.split(':').reduce((acc, time) => (60 * acc) + +time, 0);
          return bDuration - aDuration;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, activeCategory, sortBy]);
  
  const handleVideoClick = (videoId: string) => {
    const video = videoTutorials.find(v => v.id === videoId);
    if (video) {
      setSelectedVideo(video);
      setIsModalOpen(true);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  // Get category stats
  const categoryStats = useMemo(() => {
    const stats = {
      all: videoTutorials.length,
      disease: 0,
      prevention: 0,
      treatment: 0,
      techniques: 0
    };
    
    videoTutorials.forEach(video => {
      if (video.category in stats) {
        stats[video.category as keyof typeof stats]++;
      }
    });
    
    return stats;
  }, []);

  const totalViews = useMemo(() => {
    return videoTutorials.reduce((sum, video) => {
      const views = parseInt(video.views.replace(/[^\d]/g, ''));
      return sum + views;
    }, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={handleGoBack}
            className="mr-4 text-amber-800 hover:text-amber-600 hover:bg-amber-100/80"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Home
          </Button>
        </div>
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <PlayCircle className="h-8 w-8 text-amber-600 mr-3" />
            <h1 className="text-4xl font-bold text-amber-800">Video Learning Center</h1>
          </div>
          <p className="text-amber-700 text-lg mb-4">
            Master agricultural techniques with expert-led video tutorials covering disease management, prevention strategies, and modern farming methods.
          </p>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-amber-200">
              <div className="text-2xl font-bold text-amber-800">{videoTutorials.length}</div>
              <div className="text-sm text-amber-600">Total Videos</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-amber-200">
              <div className="text-2xl font-bold text-green-800">{Math.floor(totalViews / 1000)}k+</div>
              <div className="text-sm text-green-600">Total Views</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-amber-200">
              <div className="text-2xl font-bold text-blue-800">10+</div>
              <div className="text-sm text-blue-600">Expert Instructors</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center border border-amber-200">
              <div className="text-2xl font-bold text-purple-800">4</div>
              <div className="text-sm text-purple-600">Categories</div>
            </div>
          </div>
        </div>
        
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <VideoSearchFilter 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          
          {/* Sort Options */}
          <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
            <div className="flex flex-wrap gap-2">
              {Object.entries(categoryStats).map(([category, count]) => (
                <Badge 
                  key={category}
                  variant={activeCategory === category ? "default" : "secondary"}
                  className={`cursor-pointer ${
                    activeCategory === category 
                      ? "bg-amber-600 text-white" 
                      : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category === 'all' ? 'All Videos' : category.charAt(0).toUpperCase() + category.slice(1)} ({count})
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-amber-700">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "views" | "duration" | "title")}
                className="px-3 py-1 text-sm border border-amber-200 rounded-md bg-white/80 text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="views">Most Viewed</option>
                <option value="duration">Longest First</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </div>
          
          <TabsContent value={activeCategory} className="mt-0">
            {filteredAndSortedVideos.length > 0 ? (
              <div className={`grid grid-cols-1 ${isMobile ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-6`}>
                {filteredAndSortedVideos.map(video => (
                  <VideoTutorialCard 
                    key={video.id} 
                    video={video} 
                    onVideoClick={handleVideoClick} 
                  />
                ))}
              </div>
            ) : (
              <div className="col-span-full py-16 text-center bg-white/60 backdrop-blur-sm rounded-lg border border-amber-200">
                <div className="max-w-md mx-auto">
                  <Eye className="h-16 w-16 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-amber-800 mb-2">No videos found</h3>
                  <p className="text-amber-600 mb-4">
                    We couldn't find any videos matching your search criteria.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                    className="text-amber-700 border-amber-300 hover:bg-amber-50"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <VideoModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          video={selectedVideo}
        />
      </div>
    </div>
  );
};

export default VideoLibrary;
