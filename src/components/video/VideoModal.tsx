
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
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
    toast({
      title: "Added to Watch Later",
      description: `${video.title} has been added to your watch later list.`,
      duration: 3000,
    });
    onClose();
  };
  
  const handleShare = () => {
    // Copy video URL to clipboard
    navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${video.youtubeId}`);
    
    toast({
      title: "Link Copied!",
      description: "Video link has been copied to your clipboard.",
      duration: 3000,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[850px] p-0">
        <DialogHeader className="p-4 flex flex-row items-center justify-between">
          <DialogTitle className="text-xl text-amber-800">{video.title}</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Video tutorial: {video.title}
        </DialogDescription>
        
        {/* ===========================================================
         * YouTube iframe customization: Start
         * 
         * You can customize the YouTube iframe here by:
         * 1. Modifying the container div styles for appearance
         * 2. Changing iframe parameters to control player features
         * 3. Adding custom player controls or styling
         *
         * YouTube URL parameters you can add to the src attribute:
         * - autoplay=1: Automatically play video when loaded
         * - controls=0: Hide player controls
         * - rel=0: Don't show related videos
         * - modestbranding=1: Hide YouTube logo
         * - fs=0: Disable fullscreen button
         * =========================================================== */}
        <div className="aspect-video w-full">
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${video.youtubeId}?si=IOQBFjdQ8UG7Ay9H`} 
            title={video.title}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
        </div>
        {/* ===========================================================
         * YouTube iframe customization: End
         * =========================================================== */}
        
        <div className="p-4">
          <h3 className="font-semibold text-amber-800">{video.instructor.name}</h3>
          <p className="text-amber-700 mt-2">{video.description}</p>
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleWatchLater}>
                Watch Later
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                Share
              </Button>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-500">{video.views} views</span>
              <span className="text-sm text-gray-500">Category: {video.category.charAt(0).toUpperCase() + video.category.slice(1)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
