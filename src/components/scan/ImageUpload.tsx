
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  image: string | null;
  isLoading: boolean;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAnalyze: () => void;
  setImage: (image: string | null) => void;
}

const ImageUpload = ({ image, isLoading, handleImageUpload, handleAnalyze, setImage }: ImageUploadProps) => {
  const { toast } = useToast();

  return (
    <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-green-700">Upload Plant Image</CardTitle>
        <CardDescription>Take a clear photo of the affected plant part for best results</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {image ? (
          <div className="relative w-full h-64 mb-4">
            <img 
              src={image} 
              alt="Uploaded plant" 
              className="w-full h-full object-cover rounded-md" 
            />
            <button 
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
              onClick={() => setImage(null)}
            >
              &times;
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-green-300 rounded-md p-12 w-full text-center mb-4 cursor-pointer hover:bg-green-50 transition-colors" onClick={() => document.getElementById('image-upload')?.click()}>
            <Upload className="mx-auto h-12 w-12 text-green-400" />
            <p className="mt-2 text-sm text-green-600">Click to upload or drag and drop</p>
            <p className="text-xs text-green-500 mt-1">JPG, PNG or WEBP</p>
          </div>
        )}
        
        <input 
          id="image-upload"
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="hidden"
        />

        <Button 
          className={`w-full ${!image ? 'bg-green-300' : 'bg-green-600 hover:bg-green-700'}`} 
          onClick={handleAnalyze}
          disabled={!image || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              AI Analyzing...
            </>
          ) : (
            "Analyze with AI"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
