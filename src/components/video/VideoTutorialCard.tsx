
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Play } from "lucide-react";
import { VideoTutorial } from "@/types/video";

interface VideoTutorialCardProps {
  video: VideoTutorial;
  onVideoClick: (videoId: string) => void;
}

const VideoTutorialCard: React.FC<VideoTutorialCardProps> = ({ video, onVideoClick }) => {
  return (
    <Card 
      key={video.id} 
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" 
      onClick={() => onVideoClick(video.id)}
    >
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
  );
};

export default VideoTutorialCard;
