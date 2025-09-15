import React, { useState, useRef } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Satellite, Plane, MapPin, TrendingUp, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface DroneData {
  id: string;
  area: string;
  coordinates: { lat: number; lng: number };
  captureDate: Date;
  images: string[];
  analysis: {
    healthIndex: number;
    diseaseDetected: string[];
    affectedArea: number;
    severity: 'low' | 'medium' | 'high';
  };
}

const DroneAnalysis = () => {
  const [droneFiles, setDroneFiles] = useState<File[]>([]);
  const [satelliteCoords, setSatelliteCoords] = useState({ lat: '', lng: '' });
  const [analysisResults, setAnalysisResults] = useState<DroneData[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleDroneUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setDroneFiles(prev => [...prev, ...files]);
    }
  };

  const analyzeDroneImages = async () => {
    if (droneFiles.length === 0) {
      toast({
        title: 'No Images',
        description: 'Please upload drone images first.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      const mockResults: DroneData[] = droneFiles.map((file, index) => ({
        id: `drone-${index}`,
        area: `Field Sector ${index + 1}`,
        coordinates: { lat: -1.286389 + (index * 0.01), lng: 36.817223 + (index * 0.01) },
        captureDate: new Date(),
        images: [URL.createObjectURL(file)],
        analysis: {
          healthIndex: Math.random() * 100,
          diseaseDetected: ['Late Blight', 'Aphid Infestation'][Math.floor(Math.random() * 2)] ? ['Late Blight'] : [],
          affectedArea: Math.random() * 50,
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high'
        }
      }));
      
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
      toast({
        title: 'Analysis Complete',
        description: `Analyzed ${droneFiles.length} drone images successfully.`,
      });
    }, 3000);
  };

  const fetchSatelliteData = async () => {
    if (!satelliteCoords.lat || !satelliteCoords.lng) {
      toast({
        title: 'Coordinates Required',
        description: 'Please enter latitude and longitude coordinates.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Fetching Satellite Data',
      description: `Getting data for coordinates: ${satelliteCoords.lat}, ${satelliteCoords.lng}`,
    });

    // Simulate satellite data fetch
    setTimeout(() => {
      toast({
        title: 'Satellite Data Retrieved',
        description: 'Latest vegetation indices and weather patterns downloaded.',
      });
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🛰️ Drone & Satellite Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Large-scale crop monitoring using drone imagery and satellite data for precision agriculture
          </p>
        </div>

        <Tabs defaultValue="drone" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="drone" className="gap-2">
              <Plane className="h-4 w-4" />
              Drone Analysis
            </TabsTrigger>
            <TabsTrigger value="satellite" className="gap-2">
              <Satellite className="h-4 w-4" />
              Satellite Data
            </TabsTrigger>
            <TabsTrigger value="results" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Analysis Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drone" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Drone Images
                </CardTitle>
                <CardDescription>
                  Upload high-resolution drone images for AI-powered crop analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleDroneUpload}
                  className="hidden"
                />
                
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                  variant="outline"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Select Drone Images
                </Button>

                {droneFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {droneFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Drone image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Badge className="absolute top-1 right-1 text-xs">
                          {index + 1}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}

                <Button 
                  onClick={analyzeDroneImages}
                  disabled={isAnalyzing || droneFiles.length === 0}
                  className="w-full"
                >
                  {isAnalyzing ? 'Analyzing Images...' : 'Analyze Drone Images'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Drone Analysis Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">🎯</div>
                    <h3 className="font-semibold">Disease Detection</h3>
                    <p className="text-sm text-gray-600">Identify diseases across large areas</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">📊</div>
                    <h3 className="font-semibold">Health Mapping</h3>
                    <p className="text-sm text-gray-600">Generate crop health heatmaps</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl mb-2">📈</div>
                    <h3 className="font-semibold">Yield Prediction</h3>
                    <p className="text-sm text-gray-600">Predict harvest outcomes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="satellite" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Satellite className="h-5 w-5" />
                  Satellite Data Integration
                </CardTitle>
                <CardDescription>
                  Access real-time satellite imagery and vegetation indices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Latitude</label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="-1.286389"
                      value={satelliteCoords.lat}
                      onChange={(e) => setSatelliteCoords(prev => ({ ...prev, lat: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Longitude</label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="36.817223"
                      value={satelliteCoords.lng}
                      onChange={(e) => setSatelliteCoords(prev => ({ ...prev, lng: e.target.value }))}
                    />
                  </div>
                </div>
                
                <Button onClick={fetchSatelliteData} className="w-full">
                  <Satellite className="h-4 w-4 mr-2" />
                  Fetch Satellite Data
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Satellite Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-green-600 mb-2">🌍 Sentinel-2</h3>
                    <p className="text-sm text-gray-600">
                      High-resolution multispectral imaging for vegetation monitoring
                    </p>
                    <Badge variant="secondary" className="mt-2">10m resolution</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-blue-600 mb-2">🛰️ Landsat 8</h3>
                    <p className="text-sm text-gray-600">
                      Long-term earth observation for agricultural analysis
                    </p>
                    <Badge variant="secondary" className="mt-2">30m resolution</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-purple-600 mb-2">🌿 MODIS</h3>
                    <p className="text-sm text-gray-600">
                      Daily global vegetation indices and climate data
                    </p>
                    <Badge variant="secondary" className="mt-2">250m resolution</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-orange-600 mb-2">🌡️ Weather Data</h3>
                    <p className="text-sm text-gray-600">
                      Real-time weather and climate information
                    </p>
                    <Badge variant="secondary" className="mt-2">Hourly updates</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {analysisResults.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Analysis Results</h3>
                  <p className="text-gray-500">Upload and analyze drone images to see results here.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analysisResults.map((result) => (
                  <Card key={result.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{result.area}</span>
                        <Badge className={getSeverityColor(result.analysis.severity)}>
                          {result.analysis.severity}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {result.coordinates.lat.toFixed(4)}, {result.coordinates.lng.toFixed(4)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <img
                        src={result.images[0]}
                        alt={result.area}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Health Index:</span>
                          <span className="text-sm">{result.analysis.healthIndex.toFixed(1)}%</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Affected Area:</span>
                          <span className="text-sm">{result.analysis.affectedArea.toFixed(1)}%</span>
                        </div>
                        
                        {result.analysis.diseaseDetected.length > 0 && (
                          <div>
                            <span className="text-sm font-medium flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3 text-red-500" />
                              Diseases Detected:
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {result.analysis.diseaseDetected.map((disease, index) => (
                                <Badge key={index} variant="destructive" className="text-xs">
                                  {disease}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default DroneAnalysis;