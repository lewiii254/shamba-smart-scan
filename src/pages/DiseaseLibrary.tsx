
import { useState, useEffect } from "react";
import { Search, Filter, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import DiseaseDetail from "@/components/disease/DiseaseDetail";
import { diseaseData } from "@/data/diseases";
import { useIsMobile } from "@/hooks/use-mobile";

const DiseaseLibrary = () => {
  const [activeTab, setActiveTab] = useState("disease-library");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Filter diseases based on search term and category
  const filteredDiseases = diseaseData.filter((disease) => {
    const matchesSearch = 
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.symptoms.some(symptom => 
        symptom.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
    const matchesCategory = 
      selectedCategory === "all" || 
      disease.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Handle disease selection
  const handleDiseaseSelect = (diseaseId: string) => {
    setSelectedDisease(diseaseId);
    if (isMobile) {
      // For mobile, switch to the details tab when a disease is selected
      document.getElementById("details-tab")?.click();
    }
  };
  
  // Get unique categories for filter dropdown
  const categories = Array.from(
    new Set(diseaseData.map((disease) => disease.category))
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Plant Disease Library</h1>
          <p className="text-green-700 max-w-2xl mx-auto">
            Search through our comprehensive database of plant diseases, learn about symptoms, causes, and treatment options.
          </p>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by disease name, symptoms, or description..."
            className="pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex justify-end mb-4">
          <div className="flex items-center">
            <Filter className="mr-2 text-green-700" size={16} />
            <span className="text-green-700 mr-2">Filter by:</span>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          {isMobile ? (
            <Tabs defaultValue="list">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="list">Disease List</TabsTrigger>
                <TabsTrigger value="details" id="details-tab">Disease Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="mt-0">
                <ScrollArea className="h-[60vh]">
                  <div className="grid grid-cols-1 gap-4">
                    {filteredDiseases.length > 0 ? (
                      filteredDiseases.map((disease) => (
                        <DiseaseCard
                          key={disease.id}
                          disease={disease}
                          onSelect={handleDiseaseSelect}
                          isSelected={disease.id === selectedDisease}
                        />
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <Info className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No diseases found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter terms.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="details" className="mt-0">
                {selectedDisease ? (
                  <DiseaseDetail 
                    disease={diseaseData.find(d => d.id === selectedDisease)!} 
                  />
                ) : (
                  <div className="text-center py-20">
                    <Info className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No disease selected</h3>
                    <p className="mt-1 text-sm text-gray-500">Select a disease from the list to view details.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex">
              <div className="w-1/3 pr-4 border-r border-gray-200">
                <h2 className="text-lg font-semibold text-green-800 mb-4">Disease List</h2>
                <ScrollArea className="h-[70vh]">
                  <div className="grid grid-cols-1 gap-4 pr-2">
                    {filteredDiseases.length > 0 ? (
                      filteredDiseases.map((disease) => (
                        <DiseaseCard
                          key={disease.id}
                          disease={disease}
                          onSelect={handleDiseaseSelect}
                          isSelected={disease.id === selectedDisease}
                        />
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <Info className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No diseases found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter terms.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="w-2/3 pl-6">
                <h2 className="text-lg font-semibold text-green-800 mb-4">Disease Details</h2>
                {selectedDisease ? (
                  <DiseaseDetail 
                    disease={diseaseData.find(d => d.id === selectedDisease)!} 
                  />
                ) : (
                  <div className="text-center py-20">
                    <Info className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No disease selected</h3>
                    <p className="mt-1 text-sm text-gray-500">Select a disease from the list to view details.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Disease Card Component
interface DiseaseCardProps {
  disease: any;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const DiseaseCard = ({ disease, onSelect, isSelected }: DiseaseCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-shadow hover:shadow-lg ${
        isSelected ? 'border-green-500 border-2' : ''
      }`}
      onClick={() => onSelect(disease.id)}
    >
      <CardHeader className="py-3 px-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-md font-medium text-green-800">{disease.name}</CardTitle>
          <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
            {disease.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-2 px-4">
        <CardDescription className="text-sm line-clamp-2">
          {disease.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="py-2 px-4">
        <div className="flex items-center text-xs text-gray-500">
          <span>Severity: </span>
          <SeverityIndicator severity={disease.severity} />
        </div>
      </CardFooter>
    </Card>
  );
};

// Severity Indicator Component
const SeverityIndicator = ({ severity }: { severity: number }) => {
  const getColor = (level: number) => {
    return level <= severity ? 
      'bg-red-500' : 
      'bg-gray-200';
  };
  
  return (
    <div className="flex items-center ml-2">
      {[1, 2, 3, 4, 5].map((level) => (
        <div 
          key={level}
          className={`w-2 h-2 rounded-full mx-0.5 ${getColor(level)}`}
        />
      ))}
    </div>
  );
};

export default DiseaseLibrary;
