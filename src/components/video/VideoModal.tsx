
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { VideoTutorial } from "@/types/video";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoTutorial | null;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, video }) => {
  if (!video) return null;

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
        <div className="aspect-video w-full">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-amber-800">{video.instructor.name}</h3>
          <p className="text-amber-700 mt-2">{video.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">{video.views} views</span>
            <span className="text-sm text-gray-500">Category: {video.category.charAt(0).toUpperCase() + video.category.slice(1)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
