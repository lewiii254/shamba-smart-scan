
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, MessageSquare, Loader2, History, Info, Home, Menu, X, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScanHistory } from "@/types/database";

type ScanResult = {
  id: string;
  image: string;
  diagnosis: string;
  advice: string;
  date: Date;
};

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [advice, setAdvice] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [activeTab, setActiveTab] = useState(() => {
    // Set the active tab based on the URL path
    const path = location.pathname;
    if (path === "/scan") return "scan";
    if (path === "/history") return "history";
    if (path === "/about") return "about";
    return "scan"; // Default
  });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Load scan history from database
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
          date: new Date(item.created_at)
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
    
    // Simulate different AI diagnosis responses
    const diagnoses = [
      {
        name: "Tomato Late Blight",
        advice: "1. Remove and destroy infected plant parts.\n2. Apply copper-based fungicide according to label instructions.\n3. Ensure proper spacing between plants for good air circulation.\n4. Water at the base of plants to keep foliage dry.\n5. Rotate crops in future plantings."
      },
      {
        name: "Powdery Mildew",
        advice: "1. Remove heavily infected leaves.\n2. Apply a fungicide containing sulfur or potassium bicarbonate.\n3. Improve air circulation around plants.\n4. Avoid overhead watering.\n5. Plant resistant varieties in the future."
      },
      {
        name: "Aphid Infestation",
        advice: "1. Spray plants with a strong stream of water to dislodge aphids.\n2. Apply insecticidal soap or neem oil.\n3. Introduce beneficial insects like ladybugs.\n4. Remove heavily infested parts.\n5. Apply a systemic insecticide for severe cases."
      }
    ];
    
    // Randomly select a diagnosis
    const selectedDiagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];
    
    setTimeout(async () => {
      const diagnosisResult = selectedDiagnosis.name;
      const adviceResult = selectedDiagnosis.advice;
      
      setDiagnosis(diagnosisResult);
      setAdvice(adviceResult);
      
      // Save to database if user is authenticated
      if (user) {
        try {
          const { error } = await supabase
            .from('scan_history')
            .insert({
              user_id: user.id,
              image_url: image,
              diagnosis: diagnosisResult,
              treatment: adviceResult,
              confidence: Math.random() * (0.99 - 0.70) + 0.70, // Random confidence between 70-99%
            });
          
          if (error) throw error;
          
          // Refresh scan history
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
        description: "Your plant has been diagnosed"
      });
      
      setIsLoading(false);
    }, 2000);
  };

  const handleViewHistoryScan = (scan: ScanResult) => {
    setImage(scan.image);
    setDiagnosis(scan.diagnosis);
    setAdvice(scan.advice);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Mobile Nav Toggle */}
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

      {/* Navigation Bar */}
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="scan" className="text-lg" onClick={() => window.history.pushState(null, "", "/scan")}>Scan</TabsTrigger>
            <TabsTrigger value="history" className="text-lg" onClick={() => window.history.pushState(null, "", "/history")}>History</TabsTrigger>
            <TabsTrigger value="about" className="text-lg" onClick={() => window.history.pushState(null, "", "/about")}>About</TabsTrigger>
          </TabsList>
          
          {/* Scan Tab */}
          <TabsContent value="scan" className="space-y-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-green-800 mb-2">Crop Doctor</h1>
              <p className="text-lg text-green-700">AI-powered assistant for plant disease diagnosis</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
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
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Plant"
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-green-700">Diagnosis & Treatment</CardTitle>
                  <CardDescription>AI-generated advice for your crop</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                      <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                      <p className="mt-4 text-green-600">Analyzing your plant...</p>
                      <p className="text-xs text-green-500 mt-2">This may take a moment</p>
                    </div>
                  ) : diagnosis ? (
                    <div className="animate-fade-in">
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
                      onClick={handleReset}
                    >
                      Start New Scan
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* History Tab */}
          <TabsContent value="history">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-green-800 mb-2">Scan History</h1>
              <p className="text-md text-green-700">View your previous plant scans</p>
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
                        <CardTitle className="text-lg text-green-700">{scan.diagnosis}</CardTitle>
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
                  <p className="text-gray-500 mt-2">Your previous scans will appear here</p>
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
          
          {/* About Tab */}
          <TabsContent value="about">
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-green-800">About Crop Doctor</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-green max-w-none">
                <p>Crop Doctor is an AI-powered application designed to help farmers and gardeners identify plant diseases and get treatment recommendations quickly.</p>
                
                <h3 className="text-xl font-semibold text-green-700 mt-6">How It Works</h3>
                <ol className="space-y-2 list-decimal list-inside">
                  <li>Upload a clear photo of the affected plant part (leaf, stem, fruit).</li>
                  <li>Our AI analyzes the image to identify signs of disease or nutrient deficiency.</li>
                  <li>Receive an instant diagnosis with detailed treatment recommendations.</li>
                  <li>Access your previous scans in the history section.</li>
                </ol>
                
                <h3 className="text-xl font-semibold text-green-700 mt-6">Benefits</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Early detection of plant diseases</li>
                  <li>Reduced crop losses</li>
                  <li>More targeted treatment approaches</li>
                  <li>Lower environmental impact through precise intervention</li>
                  <li>Built-in history to track plant health over time</li>
                </ul>
                
                <div className="bg-green-50 p-4 rounded-md mt-6">
                  <h3 className="text-lg font-semibold text-green-700">Need Help?</h3>
                  <p className="text-green-600">For support or feedback, please contact us at support@cropdoctor.com</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Footer */}
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
