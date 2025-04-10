
import React from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

interface VideoSearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const VideoSearchFilter: React.FC<VideoSearchFilterProps> = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory
}) => {
  return (
    <>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input 
          className="pl-10 border-amber-200 focus-visible:ring-amber-500"
          placeholder="Search for tutorials..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
        <TabsList className="bg-amber-100 mb-6">
          <TabsTrigger value="all">All Videos</TabsTrigger>
          <TabsTrigger value="disease">Disease ID</TabsTrigger>
          <TabsTrigger value="prevention">Prevention</TabsTrigger>
          <TabsTrigger value="treatment">Treatment</TabsTrigger>
          <TabsTrigger value="techniques">Techniques</TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

export default VideoSearchFilter;
