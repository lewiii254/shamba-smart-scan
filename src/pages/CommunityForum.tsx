
import React, { useState, useEffect } from "react";
import { forumPosts } from "@/data/forumPosts";
import ForumHeader from "@/components/forum/ForumHeader";
import ForumCategories from "@/components/forum/ForumCategories";
import PostCard from "@/components/forum/PostCard";
import PostDetail from "@/components/forum/PostDetail";
import WeatherWidget from "@/components/weather/WeatherWidget";
import { ForumCategory, ForumPost, NewPostData } from "@/types/forum";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import FooterSection from "@/components/landing/FooterSection";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CommunityForum: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("forum");
  const [activeCategory, setActiveCategory] = useState<ForumCategory>('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [posts, setPosts] = useState<ForumPost[]>(forumPosts);
  const [filteredPosts, setFilteredPosts] = useState<ForumPost[]>(forumPosts);
  
  // Update the active tab
  useEffect(() => {
    setActiveTab("community-forum");
  }, []);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const postId = params.get('post');
    if (postId) {
      setSelectedPostId(postId);
    }
  }, [location.search]);
  
  useEffect(() => {
    let filtered = [...posts];
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.tags.includes(activeCategory)
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredPosts(filtered);
  }, [activeCategory, searchQuery, posts]);
  
  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    navigate(`/community-forum?post=${postId}`);
  };
  
  const handleBackClick = () => {
    setSelectedPostId(null);
    navigate('/community-forum');
  };

  const handleNewPost = (postData: NewPostData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a post",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    const newPost: ForumPost = {
      id: `temp-${Date.now()}`,
      title: postData.title,
      content: postData.content,
      authorId: user.id || 'unknown',
      authorName: user.user_metadata?.full_name || user.email || 'Anonymous',
      authorAvatar: user.user_metadata?.avatar_url,
      createdAt: new Date().toISOString(),
      tags: postData.tags,
      likes: 0,
      comments: []
    };

    setPosts([newPost, ...posts]);
    
    toast({
      title: "Success",
      description: "Your post has been published successfully!",
    });
    
    // Navigate to the newly created post
    setTimeout(() => {
      handlePostClick(newPost.id);
    }, 300);
  };
  
  const selectedPost = posts.find(post => post.id === selectedPostId);
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedPost ? (
          <PostDetail post={selectedPost} onBack={handleBackClick} />
        ) : (
          <>
            <ForumHeader onSearch={setSearchQuery} onNewPost={handleNewPost} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
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
              </div>
              
              <div className="lg:col-span-1">
                <WeatherWidget />
                
                <Card className="bg-white/90 border-green-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-green-800">Forum Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Be respectful and supportive of other community members</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Use appropriate categories for your posts</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Include clear information when asking for help</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Share your successes and what you've learned</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </main>
      
      <FooterSection />
    </div>
  );
};

export default CommunityForum;
