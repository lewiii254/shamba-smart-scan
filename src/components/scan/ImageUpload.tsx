
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { verifyPlantImage } from "@/utils/imageVerification";

interface ImageUploadProps {
  image: string | null;
  isLoading: boolean;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAnalyze: () => void;
  setImage: (image: string | null) => void;
}

const ImageUpload = ({ image, isLoading, handleImageUpload, handleAnalyze, setImage }: ImageUploadProps) => {
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isValidPlant, setIsValidPlant] = useState(true);
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null);

  const processImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      setIsVerifying(true);
      setVerificationMessage(null);
      setIsValidPlant(true);
      
      reader.onload = async () => {
        const imageUrl = reader.result as string;
        
        // Verify if the image contains a plant
        try {
          const { isPlant, message } = await verifyPlantImage(imageUrl);
          
          if (isPlant) {
            setImage(imageUrl);
            setIsValidPlant(true);
            setVerificationMessage(null);
            toast({
              title: "Image Verified",
              description: "Plant image successfully detected.",
            });
          } else {
            setImage(imageUrl); // Still set the image to show it
            setIsValidPlant(false);
            setVerificationMessage(message);
            toast({
              title: "Verification Warning",
              description: message,
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Image verification error:", error);
          setImage(imageUrl); // Still set the image
          setIsValidPlant(true); // Default to allowing analysis
          toast({
            title: "Verification Error",
            description: "Could not verify image, but you can still proceed.",
            variant: "destructive",
          });
        }
        
        setIsVerifying(false);
      };
      
      reader.readAsDataURL(file);
    }
  };

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
              onClick={() => {
                setImage(null);
                setVerificationMessage(null);
                setIsValidPlant(true);
              }}
            >
              &times;
            </button>
            
            {!isValidPlant && verificationMessage && (
              <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white p-2 rounded-b-md flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">{verificationMessage}</span>
              </div>
            )}
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
          onChange={processImageUpload} 
          className="hidden"
        />

        {isVerifying ? (
          <Button className="w-full bg-yellow-500" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying Image...
          </Button>
        ) : (
          <Button 
            className={`w-full ${!image ? 'bg-green-300' : !isValidPlant ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'}`} 
            onClick={handleAnalyze}
            disabled={!image || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                AI Analyzing...
              </>
            ) : !isValidPlant ? (
              "Analyze Anyway (Not a Plant?)"
            ) : (
              "Analyze with AI"
            )}
          </Button>
        )}
        
        {!isValidPlant && verificationMessage && !isVerifying && (
          <p className="mt-2 text-sm text-red-500 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {verificationMessage}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
