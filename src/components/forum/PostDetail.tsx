
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ArrowLeft, Send } from "lucide-react";
import { ForumPost } from "@/types/forum";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/components/AuthProvider";
import { Label } from "@/components/ui/label";

interface PostDetailProps {
  post: ForumPost;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  const { user } = useAuth();
  const [commentText, setCommentText] = React.useState("");
  
  const formattedDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  
  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    alert("Adding comment functionality would be implemented here");
    setCommentText("");
  };
  
  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        className="flex items-center text-green-700 hover:text-green-800 hover:bg-green-50 -ml-2"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Forum
      </Button>
      
      <Card className="border-green-100 bg-white/90">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div className="flex gap-3 items-center">
              <Avatar className="h-12 w-12 border border-green-100">
                <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                <AvatarFallback className="bg-green-100 text-green-800">
                  {post.authorName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-green-800">{post.title}</h3>
                <p className="text-green-600">
                  Posted by {post.authorName} • {formattedDate}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-6">
          <p className="text-gray-700 whitespace-pre-line mb-4">{post.content}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-green-50 text-green-700">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 pb-4 flex justify-start text-sm text-gray-600 border-b border-green-50">
          <Button variant="ghost" className="flex items-center text-gray-600 hover:text-green-700">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span>Like • {post.likes}</span>
          </Button>
        </CardFooter>
      </Card>
      
      <div>
        <h3 className="text-lg font-semibold text-green-800 mb-4">Comments ({post.comments.length})</h3>
        
        {/* Comment form */}
        {user && (
          <div className="mb-6">
            <Label htmlFor="comment" className="text-green-700 mb-2 block">Add a comment</Label>
            <div className="flex gap-2">
              <Textarea 
                id="comment"
                placeholder="Share your thoughts or advice..."
                className="resize-none bg-white border-green-100"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button 
                className="bg-green-600 hover:bg-green-700 h-auto self-end"
                onClick={handleCommentSubmit}
                disabled={!commentText.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
        
        {/* Comments list */}
        <div className="space-y-4">
          {post.comments.map((comment) => (
            <Card key={comment.id} className="border-green-50 bg-white/80">
              <CardHeader className="pb-2">
                <div className="flex gap-3 items-center">
                  <Avatar className="h-8 w-8 border border-green-100">
                    <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
                    <AvatarFallback className="bg-green-50 text-green-800">
                      {comment.authorName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-green-800">{comment.authorName}</p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-gray-700">{comment.content}</p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-start text-xs text-gray-600">
                <Button variant="ghost" size="sm" className="h-6 flex items-center text-gray-600 hover:text-green-700">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  <span>{comment.likes}</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
