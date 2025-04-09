
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import NewPostModal from "./NewPostModal";
import { NewPostData } from "@/types/forum";
import { useToast } from "@/hooks/use-toast";

interface ForumHeaderProps {
  onSearch: (query: string) => void;
  onNewPost?: (post: NewPostData) => void;
}

const ForumHeader: React.FC<ForumHeaderProps> = ({ onSearch, onNewPost }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const { toast } = useToast();
  
  const handleNewPostSubmit = (postData: NewPostData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a post",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }
    
    if (onNewPost) {
      onNewPost(postData);
      toast({
        title: "Success",
        description: "Your post has been successfully created!",
      });
    } else {
      // If no onNewPost handler is provided, show a toast message
      toast({
        title: "Post created",
        description: "Your post has been successfully created!",
      });
    }
    setIsNewPostModalOpen(false);
  };
  
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Community Forum</h1>
          <p className="text-green-600 mt-1">Share and learn from fellow growers</p>
        </div>
        
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          onClick={() => {
            if (user) {
              setIsNewPostModalOpen(true);
            } else {
              toast({
                title: "Login Required",
                description: "You need to log in to create a post",
              });
              navigate('/auth');
            }
          }}
        >
          <Plus className="h-5 w-5" />
          <span>New Post</span>
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input 
          className="pl-10 bg-white/90 border-green-100 focus-visible:ring-green-500"
          placeholder="Search forum posts..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <NewPostModal 
        isOpen={isNewPostModalOpen}
        onClose={() => setIsNewPostModalOpen(false)}
        onSubmit={handleNewPostSubmit}
      />
    </div>
  );
};

export default ForumHeader;
