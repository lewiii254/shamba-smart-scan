
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ForumPost } from "@/hooks/use-forum";
import { useAuth } from "@/components/AuthProvider";

interface PostCardProps {
  post: ForumPost;
  onClick: (postId: string) => void;
  onToggleLike: (postId?: string, commentId?: string) => Promise<boolean>;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick, onToggleLike }) => {
  const { user } = useAuth();
  const formattedDate = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });
  
  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await onToggleLike(post.id);
  };
  
  return (
    <Card 
      className="mb-4 hover:shadow-md transition-shadow cursor-pointer border-green-100 bg-white/90"
      onClick={() => onClick(post.id)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <Avatar className="h-10 w-10 border border-green-100">
              <AvatarImage src={post.author_avatar} alt={post.author_name} />
              <AvatarFallback className="bg-green-100 text-green-800">
                {post.author_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-green-800 line-clamp-1">{post.title}</h3>
              <p className="text-sm text-green-600">{post.author_name}</p>
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
          <Button
            variant="ghost"
            size="sm"
            className={`h-6 flex items-center p-0 ${post.user_has_liked ? 'text-green-700' : 'text-gray-600 hover:text-green-700'}`}
            onClick={handleLike}
            disabled={!user}
          >
            <ThumbsUp className={`h-4 w-4 mr-1 ${post.user_has_liked ? 'fill-current' : ''}`} />
            <span>{post.likes_count}</span>
          </Button>
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{post.comments?.length || 0}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
