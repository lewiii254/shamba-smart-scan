
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, ExternalLink, BookmarkPlus, Share2 } from "lucide-react";
import { VideoTutorial } from "@/types/video";
import { useToast } from "@/hooks/use-toast";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoTutorial | null;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, video }) => {
  const { toast } = useToast();
  
  if (!video) return null;
  
  const handleWatchLater = () => {
    // Store in localStorage for persistence
    const watchLater = JSON.parse(localStorage.getItem('watchLater') || '[]');
    if (!watchLater.find((v: any) => v.id === video.id)) {
      watchLater.push(video);
      localStorage.setItem('watchLater', JSON.stringify(watchLater));
      toast({
        title: "Added to Watch Later",
        description: `${video.title} has been saved to your watch later list.`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Already in Watch Later",
        description: "This video is already in your watch later list.",
        duration: 2000,
      });
    }
  };
  
  const handleShare = async () => {
    const videoUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: videoUrl,
        });
      } else {
        await navigator.clipboard.writeText(videoUrl);
        toast({
          title: "Link Copied!",
          description: "Video link has been copied to your clipboard.",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Share Failed",
        description: "Unable to share video. Please try again.",
        duration: 3000,
        variant: "destructive"
      });
    }
  };

  const handleOpenInYouTube = () => {
    window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0">
        <DialogHeader className="p-4 flex flex-row items-center justify-between">
          <div className="flex-1 mr-4">
            <DialogTitle className="text-xl text-amber-800 line-clamp-2">{video.title}</DialogTitle>
            <div className="flex items-center mt-2 space-x-4">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {video.category.charAt(0).toUpperCase() + video.category.slice(1)}
              </Badge>
              <span className="text-sm text-gray-500">{video.duration}</span>
              <span className="text-sm text-gray-500">{video.views} views</span>
            </div>
          </div>
          <DialogClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Video tutorial: {video.title}
        </DialogDescription>
        
        {/* YouTube Video Player */}
        <div className="aspect-video w-full bg-black">
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=0&rel=0&modestbranding=1&controls=1&showinfo=0`} 
            title={video.title}
            frameBorder="0" 
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        
        <div className="p-4">
          {/* Instructor Info */}
          <div className="flex items-center mb-4">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage src={video.instructor.avatar} />
              <AvatarFallback className="bg-amber-100 text-amber-800">
                {video.instructor.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-amber-800">{video.instructor.name}</h3>
              <p className="text-sm text-gray-600">Agricultural Expert</p>
            </div>
          </div>
          
          {/* Video Description */}
          <p className="text-amber-700 mb-4 leading-relaxed">{video.description}</p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleWatchLater}>
                <BookmarkPlus className="h-4 w-4 mr-1" />
                Watch Later
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleOpenInYouTube}>
                <ExternalLink className="h-4 w-4 mr-1" />
                Open in YouTube
              </Button>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-500">Category: {video.category.charAt(0).toUpperCase() + video.category.slice(1)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
