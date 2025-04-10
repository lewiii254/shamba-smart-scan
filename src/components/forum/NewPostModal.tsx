
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { NewPostData, ForumCategory } from "@/types/forum";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postData: NewPostData) => void;
}

const NewPostModal: React.FC<NewPostModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const categories: { value: ForumCategory; label: string }[] = [
    { value: 'disease', label: 'Disease Identification' },
    { value: 'prevention', label: 'Prevention' },
    { value: 'treatment', label: 'Treatment' },
    { value: 'techniques', label: 'Growing Techniques' },
    { value: 'questions', label: 'Questions' },
  ];

  const handleAddTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSelectCategory = (category: string) => {
    if (!tags.includes(category)) {
      setTags([...tags, category]);
    }
  };
  
  const resetForm = () => {
    setTitle("");
    setContent("");
    setTags([]);
    setTag("");
    setIsSubmitting(false);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your post",
        variant: "destructive"
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter content for your post",
        variant: "destructive"
      });
      return;
    }

    if (tags.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one tag",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Call the onSubmit callback with the form data
      onSubmit({
        title,
        content,
        tags
      });
      
      // Reset form after successful submission
      resetForm();
      
    } catch (error) {
      console.error("Error submitting post:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-green-800">Create New Post</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-green-700">Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write a descriptive title..."
              className="border-green-100 focus-visible:ring-green-500"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content" className="text-green-700">Content</Label>
            <Textarea 
              id="content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your experience, question or advice..."
              className="min-h-[150px] border-green-100 focus-visible:ring-green-500"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-green-700">Categories</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {categories.map((category) => (
                <Badge 
                  key={category.value} 
                  variant="outline"
                  className={`cursor-pointer ${tags.includes(category.value) ? 'bg-green-100 text-green-800' : 'bg-gray-50'}`}
                  onClick={() => handleSelectCategory(category.value)}
                >
                  {category.label}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-green-700">Additional Tags</Label>
            <div className="flex">
              <Input 
                id="tags" 
                value={tag} 
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add tag and press Enter"
                className="border-green-100 focus-visible:ring-green-500"
                disabled={isSubmitting}
              />
              <Button 
                type="button" 
                onClick={handleAddTag} 
                className="ml-2 bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                Add
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((t) => (
                  <Badge key={t} className="bg-green-100 text-green-800 flex items-center gap-1">
                    {t}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleRemoveTag(t)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleClose} 
            className="border-green-200 text-green-700 hover:bg-green-50"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="bg-green-600 hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewPostModal;
