
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import VideoTutorialCard from "@/components/video/VideoTutorialCard";
import VideoSearchFilter from "@/components/video/VideoSearchFilter";
import VideoModal from "@/components/video/VideoModal";
import { videoTutorials } from "@/data/videoTutorials";
import { VideoTutorial } from "@/types/video";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VideoLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  // Filter videos based on search query and active category
  const filteredVideos = videoTutorials.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || video.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
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
  
  return (
    <div className="min-h-screen bg-amber-50/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            onClick={handleGoBack}
            className="mr-4 text-amber-800 hover:text-amber-600 hover:bg-amber-100/80"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Home
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-2">Video Tutorials</h1>
          <p className="text-amber-700">Educational content on farming practices, disease management, and more.</p>
        </div>
        
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <VideoSearchFilter 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          
          <TabsContent value={activeCategory} className="mt-0">
            <div className={`grid grid-cols-1 ${isMobile ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-6`}>
              {filteredVideos.length > 0 ? (
                filteredVideos.map(video => (
                  <VideoTutorialCard 
                    key={video.id} 
                    video={video} 
                    onVideoClick={handleVideoClick} 
                  />
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
