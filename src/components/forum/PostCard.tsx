
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ForumPost } from "@/types/forum";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: ForumPost;
  onClick: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const formattedDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  
  return (
    <Card 
      className="mb-4 hover:shadow-md transition-shadow cursor-pointer border-green-100 bg-white/90"
      onClick={() => onClick(post.id)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <Avatar className="h-10 w-10 border border-green-100">
              <AvatarImage src={post.authorAvatar} alt={post.authorName} />
              <AvatarFallback className="bg-green-100 text-green-800">
                {post.authorName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-green-800 line-clamp-1">{post.title}</h3>
              <p className="text-sm text-green-600">{post.authorName}</p>
            </div>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-gray-700 line-clamp-2 mb-3">{post.content}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between text-sm text-gray-600">
        <div className="flex gap-4">
          <div className="flex items-center">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{post.comments.length}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
