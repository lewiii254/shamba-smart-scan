
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, MessageSquare, Loader2 } from "lucide-react";

const Index = () => {
  const [image, setImage] = useState<string | null>(null);
  const [advice, setAdvice] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!image) return;
    
    setIsLoading(true);
    
    // Mock AI analysis response - in a real app, this would call the AI service
    setTimeout(() => {
      setDiagnosis("Tomato Late Blight (Phytophthora infestans)");
      setAdvice(
        "1. Remove and destroy infected plant parts.\n" +
        "2. Apply copper-based fungicide according to label instructions.\n" +
        "3. Ensure proper spacing between plants for good air circulation.\n" +
        "4. Water at the base of plants to keep foliage dry.\n" +
        "5. Rotate crops in future plantings."
      );
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-800 mb-2">Crop Doctor</h1>
          <p className="text-lg text-green-700">AI-powered assistant for plant disease diagnosis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-green-700">Upload Plant Image</CardTitle>
              <CardDescription>Take or upload a photo of your plant to analyze</CardDescription>
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
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                    onClick={() => setImage(null)}
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-green-300 rounded-md p-12 w-full text-center mb-4">
                  <Upload className="mx-auto h-12 w-12 text-green-400" />
                  <p className="mt-2 text-sm text-green-600">Click to upload or drag and drop</p>
                </div>
              )}
              
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className={image ? "hidden" : "block w-full text-sm text-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"}
              />
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700" 
                onClick={handleAnalyze}
                disabled={!image || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Plant"
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-green-700">Diagnosis & Treatment</CardTitle>
              <CardDescription>AI-generated advice for your crop</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                  <p className="mt-4 text-green-600">Analyzing your plant...</p>
                </div>
              ) : diagnosis ? (
                <div>
                  <h3 className="font-bold text-lg mb-2 text-orange-600">Diagnosis:</h3>
                  <p className="mb-4 p-3 bg-orange-50 rounded-md">{diagnosis}</p>
                  
                  <h3 className="font-bold text-lg mb-2 text-green-600">Recommended Treatment:</h3>
                  <div className="p-3 bg-green-50 rounded-md whitespace-pre-line">
                    {advice}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <MessageSquare className="h-12 w-12 mb-4" />
                  <p>Upload and analyze an image to receive diagnosis</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {diagnosis && (
                <Button 
                  variant="outline" 
                  className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  onClick={() => {
                    setDiagnosis(null);
                    setAdvice(null);
                    setImage(null);
                  }}
                >
                  Start New Scan
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
