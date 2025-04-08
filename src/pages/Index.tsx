import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { ScanHistory } from "@/types/database";

// Components
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ScanHeader from "@/components/scan/ScanHeader";
import ImageUpload from "@/components/scan/ImageUpload";
import DiagnosisResult from "@/components/scan/DiagnosisResult";
import AIExplanation from "@/components/scan/AIExplanation";
import ScanHistoryList from "@/components/history/ScanHistoryList";
import AboutContent from "@/components/about/AboutContent";

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
  const { user } = useAuth();
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
  const [processingStage, setProcessingStage] = useState(0);
  const [confidence, setConfidence] = useState<number | null>(null);
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

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-500";
    if (confidence >= 0.8) return "bg-green-400";
    if (confidence >= 0.7) return "bg-yellow-400";
    if (confidence >= 0.6) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="scan" className="text-lg" onClick={() => window.history.pushState(null, "", "/scan")}>Scan</TabsTrigger>
            <TabsTrigger value="history" className="text-lg" onClick={() => window.history.pushState(null, "", "/history")}>History</TabsTrigger>
            <TabsTrigger value="about" className="text-lg" onClick={() => window.history.pushState(null, "", "/about")}>About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scan" className="space-y-4">
            <ScanHeader 
              title="Crop Doctor AI"
              description="Our advanced AI model analyzes plant images to detect diseases and provide treatment recommendations"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImageUpload 
                image={image}
                isLoading={isLoading}
                handleImageUpload={handleImageUpload}
                handleAnalyze={handleAnalyze}
                setImage={setImage}
              />
              
              <DiagnosisResult 
                isLoading={isLoading}
                processingStage={processingStage}
                diagnosis={diagnosis}
                description={description}
                symptoms={symptoms}
                advice={advice}
                confidence={confidence}
                handleReset={handleReset}
              />
            </div>

            <AIExplanation />
          </TabsContent>
          
          <TabsContent value="history">
            <ScanHeader 
              title="AI Scan History"
              description="Review your previous plant diagnoses and treatments"
            />
            
            <ScanHistoryList 
              scanHistory={scanHistory}
              handleViewHistoryScan={handleViewHistoryScan}
              handleClearHistory={handleClearHistory}
              setActiveTab={setActiveTab}
              getConfidenceColor={getConfidenceColor}
            />
          </TabsContent>
          
          <TabsContent value="about">
            <AboutContent />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
