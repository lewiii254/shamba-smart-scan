
import React, { useState, useEffect } from "react";
import { forumPosts } from "@/data/forumPosts";
import ForumHeader from "@/components/forum/ForumHeader";
import ForumCategories from "@/components/forum/ForumCategories";
import PostCard from "@/components/forum/PostCard";
import PostDetail from "@/components/forum/PostDetail";
import { ForumCategory, ForumPost } from "@/types/forum";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import FooterSection from "@/components/landing/FooterSection";

const CommunityForum: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");
  const [activeCategory, setActiveCategory] = useState<ForumCategory>('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<ForumPost[]>(forumPosts);
  
  // Get post ID from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const postId = params.get('post');
    if (postId) {
      setSelectedPostId(postId);
    }
  }, [location.search]);
  
  // Filter posts based on category and search query
  useEffect(() => {
    let filtered = [...forumPosts];
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.tags.includes(activeCategory)
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredPosts(filtered);
  }, [activeCategory, searchQuery]);
  
  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    navigate(`/community-forum?post=${postId}`);
  };
  
  const handleBackClick = () => {
    setSelectedPostId(null);
    navigate('/community-forum');
  };
  
  const selectedPost = forumPosts.find(post => post.id === selectedPostId);
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedPost ? (
          <PostDetail post={selectedPost} onBack={handleBackClick} />
        ) : (
          <>
            <ForumHeader onSearch={setSearchQuery} />
            <ForumCategories 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
            
            {filteredPosts.length > 0 ? (
              <div className="space-y-4">
                {filteredPosts.map(post => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onClick={handlePostClick} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-green-700">No posts found matching your criteria</p>
                <p className="text-gray-600 mt-2">Try adjusting your search or category filters</p>
              </div>
            )}
          </>
        )}
      </main>
      
      <FooterSection />
    </div>
  );
};

export default CommunityForum;
