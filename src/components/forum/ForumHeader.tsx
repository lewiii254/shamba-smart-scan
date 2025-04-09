
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";

interface ForumHeaderProps {
  onSearch: (query: string) => void;
}

const ForumHeader: React.FC<ForumHeaderProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Community Forum</h1>
          <p className="text-green-600 mt-1">Share and learn from fellow growers</p>
        </div>
        
        {user && (
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            onClick={() => alert("New post functionality would be implemented here")}
          >
            <Plus className="h-5 w-5" />
            <span>New Post</span>
          </Button>
        )}
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input 
          className="pl-10 bg-white/90 border-green-100 focus-visible:ring-green-500"
          placeholder="Search forum posts..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ForumHeader;
