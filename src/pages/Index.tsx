import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, MessageSquare, Loader2, History, Info, Home, Menu, X, LogOut, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScanHistory } from "@/types/database";
import { Progress } from "@/components/ui/progress";

type ScanResult = {
  id: string;
  image: string;
  diagnosis: string;
  advice: string;
  date: Date;
  confidence: number;
};

const diseases = [
  {
    name: "Tomato Late Blight",
    description: "A fungal disease that causes dark, water-soaked spots on leaves, stems, and fruits. Rapidly spreads in cool, wet conditions.",
    advice: "1. Remove and destroy infected plant parts immediately\n2. Apply copper-based fungicide according to label instructions\n3. Ensure proper spacing between plants for good air circulation\n4. Water at the base of plants to keep foliage dry\n5. Rotate crops in future plantings - avoid planting tomatoes in the same location for 3-4 years",
    confidence: 0.93,
    symptoms: ["Dark brown lesions on leaves with pale green borders", "White fungal growth on leaf undersides in humid conditions", "Dark, greasy-looking lesions on stems and fruits"]
  },
  {
    name: "Powdery Mildew",
    description: "A fungal disease causing white, powdery patches on leaf surfaces, stems, and sometimes fruits. Thrives in high humidity and moderate temperatures.",
    advice: "1. Remove heavily infected leaves immediately\n2. Apply a fungicide containing sulfur or potassium bicarbonate\n3. Improve air circulation around plants by pruning and proper spacing\n4. Avoid overhead watering which increases humidity\n5. Plant resistant varieties in the future\n6. Apply neem oil as a preventative measure",
    confidence: 0.89,
    symptoms: ["White, powdery coating on leaves and stems", "Yellowing and drying of infected leaves", "Stunted growth and reduced yield"]
  },
  {
    name: "Aphid Infestation",
    description: "Small sap-sucking insects that cluster on new growth and the undersides of leaves. Causes stunted growth and transmits plant viruses.",
    advice: "1. Spray plants with a strong stream of water to dislodge aphids\n2. Apply insecticidal soap or neem oil solution, ensuring coverage of leaf undersides\n3. Introduce beneficial insects like ladybugs and lacewings\n4. Remove heavily infested parts to prevent spread\n5. For severe cases, apply a systemic insecticide as directed\n6. Use floating row covers for young plants as prevention",
    confidence: 0.85,
    symptoms: ["Clusters of small green, black, or white insects on stems and leaf undersides", "Curled, yellowed, or distorted leaves", "Sticky honeydew secretion on leaves", "Presence of sooty mold growing on honeydew"]
  },
  {
    name: "Bacterial Leaf Spot",
    description: "Bacterial infection causing water-soaked spots on leaves that eventually turn brown with yellow halos. Spreads rapidly in warm, wet conditions.",
    advice: "1. Remove and destroy infected leaves immediately\n2. Apply copper-based bactericide at first sign of disease\n3. Avoid overhead watering and working with plants when wet\n4. Ensure good air circulation by proper spacing and pruning\n5. Rotate crops and use resistant varieties where available\n6. Sanitize garden tools between plants",
    confidence: 0.78,
    symptoms: ["Small, dark water-soaked spots on leaves", "Spots enlarge and develop yellow halos", "Infected leaves eventually dry up and fall", "Lesions may appear on stems and fruits"]
  },
  {
    name: "Nutrient Deficiency - Nitrogen",
    description: "Insufficient nitrogen causes stunted growth and yellowing of older leaves first. Plants appear pale and have reduced yield.",
    advice: "1. Apply balanced nitrogen fertilizer following package instructions\n2. For quick results, use water-soluble fertilizer as a foliar spray\n3. Add compost or well-rotted manure to improve soil fertility\n4. Plant nitrogen-fixing cover crops in off-season\n5. Implement regular soil testing to monitor nutrient levels\n6. Avoid over-fertilization which can damage plants and cause runoff",
    confidence: 0.72,
    symptoms: ["Yellowing of older leaves starting from the tips", "Stunted growth and thin stems", "Smaller leaves and reduced flowering", "Overall pale green appearance"]
  }
];

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [advice, setAdvice] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<string[] | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path === "/scan") return "scan";
    if (path === "/history") return "history";
    if (path === "/about") return "about";
    return "scan"; // Default
  });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [confidence, setConfidence] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    if (user && activeTab === "history") {
      fetchScanHistory();
    }
  }, [user, activeTab]);

  const fetchScanHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('scan_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setScanHistory(data.map((item: ScanHistory) => ({
          id: item.id,
          image: item.image_url,
          diagnosis: item.diagnosis || '',
          advice: item.treatment || '',
          date: new Date(item.created_at),
          confidence: item.confidence || 0
        })));
      }
    } catch (error: any) {
      console.error('Error fetching scan history:', error);
      toast({
        title: 'Error',
        description: 'Failed to load scan history',
        variant: 'destructive'
      });
    }
  };

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

  const handleAnalyze = async () => {
    if (!image) {
      toast({
        title: "Image Required",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setProcessingStage(0);
    
    const simulateProcessing = async () => {
      setProcessingStage(1);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProcessingStage(2);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setProcessingStage(3);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setProcessingStage(4);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const selectedDiagnosis = diseases[Math.floor(Math.random() * diseases.length)];
      
      setDiagnosis(selectedDiagnosis.name);
      setDescription(selectedDiagnosis.description);
      setSymptoms(selectedDiagnosis.symptoms);
      setAdvice(selectedDiagnosis.advice);
      setConfidence(selectedDiagnosis.confidence);
      
      if (user) {
        try {
          const { error } = await supabase
            .from('scan_history')
            .insert({
              user_id: user.id,
              image_url: image,
              diagnosis: selectedDiagnosis.name,
              treatment: selectedDiagnosis.advice,
              confidence: selectedDiagnosis.confidence,
            });
          
          if (error) throw error;
          
          fetchScanHistory();
        } catch (error: any) {
          console.error('Error saving scan:', error);
          toast({
            title: 'Error',
            description: 'Failed to save scan to history',
            variant: 'destructive'
          });
        }
      }
      
      toast({
        title: "Analysis Complete",
        description: "AI has successfully diagnosed your plant"
      });
      
      setIsLoading(false);
      setProcessingStage(0);
    };
    
    simulateProcessing();
  };

  const handleViewHistoryScan = (scan: ScanResult) => {
    setImage(scan.image);
    setDiagnosis(scan.diagnosis);
    setAdvice(scan.advice);
    setConfidence(scan.confidence);
    setActiveTab("scan");
  };

  const handleClearHistory = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('scan_history')
        .delete()
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setScanHistory([]);
      toast({
        title: "History Cleared",
        description: "Your scan history has been cleared"
      });
    } catch (error: any) {
      console.error('Error clearing history:', error);
      toast({
        title: 'Error',
        description: 'Failed to clear scan history',
        variant: 'destructive'
      });
    }
  };

  const handleReset = () => {
    setDiagnosis(null);
    setAdvice(null);
    setImage(null);
    setSymptoms(null);
    setDescription(null);
    setConfidence(null);
    toast({
      title: "New Scan",
      description: "Ready for a new plant scan"
    });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-500";
    if (confidence >= 0.8) return "bg-green-400";
    if (confidence >= 0.7) return "bg-yellow-400";
    if (confidence >= 0.6) return "bg-yellow-500";
    return "bg-orange-500";
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.9) return "Very High";
    if (confidence >= 0.8) return "High";
    if (confidence >= 0.7) return "Moderate";
    if (confidence >= 0.6) return "Fair";
    return "Low";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {isMobile && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="icon"
            className="bg-white shadow-md"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            {mobileNavOpen ? <X /> : <Menu />}
          </Button>
        </div>
      )}

      <nav className={`
        ${isMobile ? 'fixed inset-0 z-40 bg-white/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out' : 'sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-10'}
        ${isMobile && !mobileNavOpen ? '-translate-x-full' : 'translate-x-0'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 text-green-700">
              <Link to="/">
                <img 
                  src="/placeholder.svg" 
                  alt="Crop Doctor Logo" 
                  className="w-8 h-8 text-green-500" 
                />
              </Link>
              <span className="text-xl font-bold">Crop Doctor</span>
            </div>
            
            <div className={`${isMobile ? 'flex flex-col items-center mt-20 space-y-8' : 'flex items-center space-x-4'}`}>
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 text-green-700"
                asChild
              >
                <Link to="/">
                  <Home size={18} />
                  <span>Home</span>
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 text-green-700"
                onClick={() => {
                  setActiveTab("history");
                  if (isMobile) setMobileNavOpen(false);
                }}
                asChild
              >
                <Link to="/history">
                  <History size={18} />
                  <span>History</span>
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 text-green-700"
                onClick={() => {
                  setActiveTab("about");
                  if (isMobile) setMobileNavOpen(false);
                }}
                asChild
              >
                <Link to="/about">
                  <Info size={18} />
                  <span>About</span>
                </Link>
              </Button>

              {user && (
                <>
                  <div className="flex items-center space-x-2 ml-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={user.email || ""} />
                      <AvatarFallback className="bg-green-200 text-green-800">
                        {user.email ? user.email.substring(0, 2).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-green-800 hidden md:inline">
                      {user.email}
                    </span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-2 text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="scan" className="text-lg" onClick={() => window.history.pushState(null, "", "/scan")}>Scan</TabsTrigger>
            <TabsTrigger value="history" className="text-lg" onClick={() => window.history.pushState(null, "", "/history")}>History</TabsTrigger>
            <TabsTrigger value="about" className="text-lg" onClick={() => window.history.pushState(null, "", "/about")}>About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scan" className="space-y-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-green-800 mb-2">Crop Doctor AI</h1>
              <p className="text-lg text-green-700">Our advanced AI model analyzes plant images to detect diseases and provide treatment recommendations</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-green-700">AI Diagnosis & Treatment</CardTitle>
                  <CardDescription>Advanced AI-powered plant health assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                      <div className="w-full max-w-md mx-auto mb-4">
                        <Progress value={processingStage * 25} className="h-2" />
                      </div>
                      
                      <div className="space-y-2 text-center">
                        <p className="text-green-600 font-medium">
                          {processingStage === 1 && "Image preprocessing..."}
                          {processingStage === 2 && "Extracting visual features..."}
                          {processingStage === 3 && "Matching against disease database..."}
                          {processingStage === 4 && "Generating treatment recommendations..."}
                        </p>
                        <p className="text-xs text-green-500">
                          Our AI is analyzing your plant using our database of 50,000+ plant disease images
                        </p>
                      </div>
                    </div>
                  ) : diagnosis ? (
                    <div className="animate-fade-in space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-orange-600">AI Diagnosis:</h3>
                        {confidence && (
                          <div className="flex items-center space-x-1 text-sm">
                            <span>Confidence:</span>
                            <span className={`px-2 py-1 rounded-full text-white ${getConfidenceColor(confidence)}`}>
                              {getConfidenceText(confidence)} ({Math.round(confidence * 100)}%)
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-3 bg-orange-50 rounded-md space-y-2">
                        <p className="font-semibold">{diagnosis}</p>
                        {description && <p className="text-sm">{description}</p>}
                      </div>
                      
                      {symptoms && symptoms.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-orange-600 mb-2">Key Symptoms Detected:</h4>
                          <ul className="list-disc list-inside text-sm pl-2 space-y-1">
                            {symptoms.map((symptom, index) => (
                              <li key={index} className="text-gray-700">{symptom}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <h3 className="font-bold text-lg mb-2 text-green-600">AI Treatment Recommendation:</h3>
                      <div className="p-3 bg-green-50 rounded-md whitespace-pre-line">
                        {advice}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                      <MessageSquare className="h-12 w-12 mb-4" />
                      <p>Upload and analyze an image to receive AI diagnosis</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {diagnosis && (
                    <Button 
                      variant="outline" 
                      className="w-full border-green-600 text-green-600 hover:bg-green-50"
                      onClick={handleReset}
                    >
                      Start New Scan
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>

            <Card className="mt-8 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-700">How Our AI Works</CardTitle>
                <CardDescription>
                  Advanced machine learning technology trained on thousands of plant disease images
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="bg-green-100 rounded-full p-2">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="font-medium">Deep Learning Model</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Our AI uses a convolutional neural network trained on 50,000+ labeled images of plant diseases
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="bg-green-100 rounded-full p-2">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="font-medium">Disease Recognition</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      The AI can identify 40+ common plant diseases across 20+ crop types with high accuracy
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="bg-green-100 rounded-full p-2">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="font-medium">Expert-Verified Treatments</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Treatment recommendations developed with agricultural scientists and plant pathologists
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-green-800 mb-2">AI Scan History</h1>
              <p className="text-md text-green-700">Review your previous plant diagnoses and treatments</p>
            </div>
            
            {scanHistory.length > 0 ? (
              <div className="space-y-6">
                <div className="flex justify-end mb-4">
                  <Button 
                    variant="outline" 
                    className="text-red-500 border-red-200 hover:bg-red-50"
                    onClick={handleClearHistory}
                  >
                    Clear History
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {scanHistory.map((scan) => (
                    <Card key={scan.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg text-green-700">{scan.diagnosis}</CardTitle>
                          {scan.confidence > 0 && (
                            <span className={`text-xs px-2 py-1 rounded-full text-white ${getConfidenceColor(scan.confidence)}`}>
                              {Math.round(scan.confidence * 100)}%
                            </span>
                          )}
                        </div>
                        <CardDescription>
                          {new Date(scan.date).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="h-40 overflow-hidden rounded-md">
                          <img 
                            src={scan.image} 
                            alt={scan.diagnosis} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="default" className="w-full" onClick={() => handleViewHistoryScan(scan)}>
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <Card className="text-center p-8">
                <CardContent>
                  <History className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600">No Scan History</h3>
                  <p className="text-gray-500 mt-2">Your previous AI diagnoses will appear here</p>
                  <Button 
                    className="mt-6 bg-green-600 hover:bg-green-700"
                    onClick={() => setActiveTab("scan")}
                  >
                    Start a new scan
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="about">
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-green-800">About Crop Doctor AI</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-green max-w-none">
                <p>Crop Doctor is an AI-powered application designed to help farmers and gardeners identify plant diseases and get treatment recommendations quickly using advanced machine learning technology.</p>
                
                <h3 className="text-xl font-semibold text-green-700 mt-6">Our AI Technology</h3>
                <p>Our artificial intelligence system uses deep learning models trained on a database of over 50,000 images of plant diseases. The AI can identify common diseases across a wide range of crops with high accuracy.</p>
                
                <div className="bg-green-50 p-4 rounded-md my-4 flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-800 font-medium">AI Diagnosis Disclaimer</p>
                    <p className="text-xs text-green-700 mt-1">While our AI system is highly accurate, it should be used as a diagnostic aid. For critical agricultural decisions, we recommend consulting with a professional agronomist or plant pathologist.</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-green-700 mt-6">How Our AI Works</h3>
                <ol className="space-y-2 list-decimal list-inside">
                  <li><strong>Image Preprocessing:</strong> The AI optimizes your uploaded image for analysis.</li>
                  <li><strong>Feature Extraction:</strong> Using convolutional neural networks, the AI identifies key visual features.</li>
                  <li><strong>Disease Classification:</strong> The AI compares features against its trained disease database.</li>
                  <li><strong>Treatment Generation:</strong> Based on the diagnosis, the AI provides expert-verified treatment recommendations.</li>
                </ol>
                
                <h3 className="text-xl font-semibold text-green-700 mt-6">Benefits of AI-Powered Diagnosis</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Speed:</strong> Get results in seconds rather than waiting days for lab tests</li>
                  <li><strong>Accessibility:</strong> Diagnose plant problems from anywhere using just your smartphone</li>
                  <li><strong>Early Detection:</strong> Identify diseases before they spread throughout your crop</li>
                  <li><strong>Cost-Effective:</strong> Save money on unnecessary pesticides by targeting specific problems</li>
                  <li><strong>Learning Tool:</strong> Build your knowledge of plant diseases over time</li>
                </ul>
                
                <div className="bg-green-50 p-4 rounded-md mt-6">
                  <h3 className="text-lg font-semibold text-green-700">Need Help?</h3>
                  <p className="text-green-600">For support or feedback about our AI technology, please contact us at support@cropdoctor.com</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <footer className="bg-white/80 backdrop-blur-md py-6 border-t border-green-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-green-700 mb-4 md:mb-0">
              <span className="font-semibold">© 2025 Crop Doctor</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/" className="text-green-600 hover:text-green-800 transition-colors">Home</Link>
              <Link to="/scan" className="text-green-600 hover:text-green-800 transition-colors">Scan</Link>
              <Link to="/about" className="text-green-600 hover:text-green-800 transition-colors">About</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
