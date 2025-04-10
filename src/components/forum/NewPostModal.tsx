
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Loader2 } from "lucide-react";
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
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [tagsError, setTagsError] = useState("");
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
      setTagsError("");
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
      setTagsError("");
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    
    if (!title.trim()) {
      setTitleError("Please enter a title for your post");
      isValid = false;
    } else {
      setTitleError("");
    }
    
    if (!content.trim()) {
      setContentError("Please enter content for your post");
      isValid = false;
    } else {
      setContentError("");
    }
    
    if (tags.length === 0) {
      setTagsError("Please add at least one tag or category");
      isValid = false;
    } else {
      setTagsError("");
    }
    
    return isValid;
  };
  
  const resetForm = () => {
    setTitle("");
    setContent("");
    setTags([]);
    setTag("");
    setTitleError("");
    setContentError("");
    setTagsError("");
    setIsSubmitting(false);
  };

  const handleSubmit = () => {
    if (!validateForm()) {
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
      
      toast({
        title: "Success",
        description: "Your post has been created successfully!",
        variant: "default",
      });
      
      // Reset form after successful submission
      resetForm();
      onClose();
      
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
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) setTitleError("");
              }}
              placeholder="Write a descriptive title..."
              className={`border-green-100 focus-visible:ring-green-500 ${titleError ? 'border-red-300' : ''}`}
              disabled={isSubmitting}
            />
            {titleError && <p className="text-red-500 text-sm mt-1">{titleError}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content" className="text-green-700">Content</Label>
            <Textarea 
              id="content" 
              value={content} 
              onChange={(e) => {
                setContent(e.target.value);
                if (e.target.value.trim()) setContentError("");
              }}
              placeholder="Share your experience, question or advice..."
              className={`min-h-[150px] border-green-100 focus-visible:ring-green-500 ${contentError ? 'border-red-300' : ''}`}
              disabled={isSubmitting}
            />
            {contentError && <p className="text-red-500 text-sm mt-1">{contentError}</p>}
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
                className={`border-green-100 focus-visible:ring-green-500 ${tagsError ? 'border-red-300' : ''}`}
                disabled={isSubmitting}
              />
              <Button 
                type="button" 
                onClick={handleAddTag} 
                className="ml-2 bg-green-600 hover:bg-green-700"
                disabled={isSubmitting || !tag}
              >
                Add
              </Button>
            </div>
            
            {tagsError && <p className="text-red-500 text-sm mt-1">{tagsError}</p>}
            
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
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : "Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewPostModal;
