
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  likes_count: number;
  comments?: ForumComment[];
  user_has_liked?: boolean;
}

export interface ForumComment {
  id: string;
  post_id: string;
  content: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  user_has_liked?: boolean;
}

export interface NewPostData {
  title: string;
  content: string;
  tags: string[];
}

export const useForum = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // Use raw SQL query to fetch posts since TypeScript types are not updated yet
      const { data: postsData, error } = await supabase
        .rpc('get_forum_posts_with_data', {});

      if (error) {
        // Fallback to direct table access if RPC doesn't exist
        console.log('RPC not found, using direct table access');
        const { data: directPostsData, error: directError } = await supabase
          .from('forum_posts' as any)
          .select('*')
          .order('created_at', { ascending: false });

        if (directError) throw directError;

        // Fetch comments and likes for each post
        const postsWithData = await Promise.all(
          (directPostsData || []).map(async (post: any) => {
            // Fetch comments
            const { data: comments } = await supabase
              .from('forum_comments' as any)
              .select('*')
              .eq('post_id', post.id)
              .order('created_at', { ascending: true });

            // Check if user has liked this post
            let userHasLiked = false;
            if (user) {
              const { data: userLike } = await supabase
                .from('forum_likes' as any)
                .select('id')
                .eq('user_id', user.id)
                .eq('post_id', post.id)
                .maybeSingle();
              userHasLiked = !!userLike;
            }

            // Check if user has liked each comment
            const commentsWithLikes = await Promise.all(
              (comments || []).map(async (comment: any) => {
                let commentUserHasLiked = false;
                if (user) {
                  const { data: userCommentLike } = await supabase
                    .from('forum_likes' as any)
                    .select('id')
                    .eq('user_id', user.id)
                    .eq('comment_id', comment.id)
                    .maybeSingle();
                  commentUserHasLiked = !!userCommentLike;
                }
                return { ...comment, user_has_liked: commentUserHasLiked };
              })
            );

            return {
              ...post,
              comments: commentsWithLikes,
              user_has_liked: userHasLiked
            } as ForumPost;
          })
        );

        setPosts(postsWithData);
      } else {
        setPosts(postsData || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch forum posts',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: NewPostData) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to create a post',
        variant: 'destructive'
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('forum_posts' as any)
        .insert({
          title: postData.title,
          content: postData.content,
          author_id: user.id,
          author_name: user.user_metadata?.full_name || user.email || 'Anonymous',
          author_avatar: user.user_metadata?.avatar_url,
          tags: postData.tags
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Your post has been published successfully!',
      });

      fetchPosts(); // Refresh posts
      return true;
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error',
        description: 'Failed to create post',
        variant: 'destructive'
      });
      return false;
    }
  };

  const addComment = async (postId: string, content: string) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to comment',
        variant: 'destructive'
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('forum_comments' as any)
        .insert({
          post_id: postId,
          content,
          author_id: user.id,
          author_name: user.user_metadata?.full_name || user.email || 'Anonymous',
          author_avatar: user.user_metadata?.avatar_url
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Comment added successfully!',
      });

      fetchPosts(); // Refresh posts
      return true;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to add comment',
        variant: 'destructive'
      });
      return false;
    }
  };

  const toggleLike = async (postId?: string, commentId?: string) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to like',
        variant: 'destructive'
      });
      return false;
    }

    try {
      // Check if user has already liked
      const { data: existingLike } = await supabase
        .from('forum_likes' as any)
        .select('id')
        .eq('user_id', user.id)
        .eq(postId ? 'post_id' : 'comment_id', postId || commentId)
        .maybeSingle();

      if (existingLike) {
        // Unlike
        const { error } = await supabase
          .from('forum_likes' as any)
          .delete()
          .eq('id', existingLike.id);

        if (error) throw error;
      } else {
        // Like
        const { error } = await supabase
          .from('forum_likes' as any)
          .insert({
            user_id: user.id,
            post_id: postId || null,
            comment_id: commentId || null
          });

        if (error) throw error;
      }

      fetchPosts(); // Refresh posts
      return true;
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: 'Error',
        description: 'Failed to update like',
        variant: 'destructive'
      });
      return false;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  return {
    posts,
    loading,
    createPost,
    addComment,
    toggleLike,
    refreshPosts: fetchPosts
  };
};
