import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Bug, Cloud, Thermometer, Droplets, Wind, Calendar, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface PestThreat {
  id: string;
  name: string;
  scientific: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  probability: number;
  peakSeason: string;
  affectedCrops: string[];
  environmentalTriggers: string[];
  preventionMethods: string[];
  description: string;
}

interface EnvironmentalData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  soilMoisture: number;
  updated: Date;
}

const PestPrediction = () => {
  const [currentWeather, setCurrentWeather] = useState<EnvironmentalData>({
    temperature: 26.5,
    humidity: 75,
    rainfall: 2.3,
    windSpeed: 8.2,
    soilMoisture: 68,
    updated: new Date()
  });
  
  const [pestThreats, setPestThreats] = useState<PestThreat[]>([]);
  const [selectedCrop, setSelectedCrop] = useState('maize');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const mockPestThreats: PestThreat[] = useMemo(() => [
    {
      id: 'fall-armyworm',
      name: 'Fall Armyworm',
      scientific: 'Spodoptera frugiperda',
      riskLevel: 'high',
      probability: 85,
      peakSeason: 'October - December',
      affectedCrops: ['Maize', 'Sorghum', 'Rice'],
      environmentalTriggers: ['High humidity (>70%)', 'Temperature 20-30°C', 'Recent rainfall'],
      preventionMethods: [
        'Use pheromone traps for early detection',
        'Plant push-pull companion crops',
        'Apply neem-based biopesticides',
        'Maintain field hygiene'
      ],
      description: 'A devastating pest that can cause 20-50% yield loss in maize crops if not controlled early.'
    },
    {
      id: 'aphids',
      name: 'Aphids',
      scientific: 'Aphidoidea',
      riskLevel: 'medium',
      probability: 65,
      peakSeason: 'February - April',
      affectedCrops: ['Tomatoes', 'Beans', 'Cabbage'],
      environmentalTriggers: ['Mild temperatures', 'Low wind', 'Nitrogen-rich plants'],
      preventionMethods: [
        'Introduce beneficial insects',
        'Use reflective mulches',
        'Apply insecticidal soap',
        'Regular monitoring'
      ],
      description: 'Sap-sucking insects that weaken plants and transmit viruses.'
    },
    {
      id: 'cutworms',
      name: 'Cutworms',
      scientific: 'Noctuidae',
      riskLevel: 'medium',
      probability: 45,
      peakSeason: 'March - May',
      affectedCrops: ['Maize', 'Beans', 'Vegetables'],
      environmentalTriggers: ['Moist soil', 'Cool nights', 'Weedy areas'],
      preventionMethods: [
        'Use collar barriers around plants',
        'Clear weeds before planting',
        'Apply beneficial nematodes',
        'Evening inspections'
      ],
      description: 'Larvae that cut young plants at soil level, causing plant death.'
    }
  ], []);

  useEffect(() => {
    analyzePestRisk();
  }, [analyzePestRisk]);

  const analyzePestRisk = useCallback(async () => {
    setIsLoading(true);
    
    // Simulate analysis based on environmental conditions
    setTimeout(() => {
      const filteredThreats = mockPestThreats.filter(threat => 
        threat.affectedCrops.some(crop => 
          crop.toLowerCase().includes(selectedCrop.toLowerCase())
        )
      );
      
      // Adjust probability based on current conditions
      const adjustedThreats = filteredThreats.map(threat => {
        let adjustedProb = threat.probability;
        
        // Adjust based on weather conditions
        if (currentWeather.humidity > 70 && threat.environmentalTriggers.some(trigger => 
          trigger.toLowerCase().includes('humidity'))) {
          adjustedProb += 10;
        }
        
        if (currentWeather.temperature > 20 && currentWeather.temperature < 30 &&
          threat.environmentalTriggers.some(trigger => trigger.includes('20-30°C'))) {
          adjustedProb += 15;
        }
        
        return {
          ...threat,
          probability: Math.min(95, adjustedProb)
        };
      });
      
      setPestThreats(adjustedThreats);
      setIsLoading(false);
    }, 1500);
  }, [selectedCrop, currentWeather.humidity, currentWeather.temperature, mockPestThreats]);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-red-600';
    if (probability >= 60) return 'text-orange-600';
    if (probability >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const crops = ['Maize', 'Tomatoes', 'Beans', 'Cabbage', 'Rice', 'Sorghum'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🐛 Pest Prediction & Prevention
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered pest prediction using environmental patterns and historical data
          </p>
        </div>

        <Tabs defaultValue="prediction" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="prediction" className="gap-2">
              <Bug className="h-4 w-4" />
              Predictions
            </TabsTrigger>
            <TabsTrigger value="environmental" className="gap-2">
              <Cloud className="h-4 w-4" />
              Environment
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <Calendar className="h-4 w-4" />
              Pest Calendar
            </TabsTrigger>
            <TabsTrigger value="prevention" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Prevention
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prediction" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Crop Selection</CardTitle>
                <CardDescription>Select your crop to get specific pest predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {crops.map((crop) => (
                    <Button
                      key={crop}
                      variant={selectedCrop === crop.toLowerCase() ? "default" : "outline"}
                      onClick={() => setSelectedCrop(crop.toLowerCase())}
                      className="text-sm"
                    >
                      {crop}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {isLoading ? (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                  <p>Analyzing pest risk for {selectedCrop}...</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pestThreats.map((threat) => (
                  <Card key={threat.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Bug className="h-5 w-5" />
                            {threat.name}
                          </div>
                          <p className="text-sm text-gray-500 font-normal italic">
                            {threat.scientific}
                          </p>
                        </div>
                        <Badge className={getRiskColor(threat.riskLevel)}>
                          {threat.riskLevel}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">{threat.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Risk Probability:</span>
                          <span className={`text-sm font-bold ${getProbabilityColor(threat.probability)}`}>
                            {threat.probability}%
                          </span>
                        </div>
                        <Progress value={threat.probability} className="h-2" />
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Peak Season:</h4>
                        <Badge variant="secondary">{threat.peakSeason}</Badge>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Environmental Triggers:</h4>
                        <div className="flex flex-wrap gap-1">
                          {threat.environmentalTriggers.map((trigger, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {trigger}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Prevention Methods:</h4>
                        <ul className="text-xs space-y-1">
                          {threat.preventionMethods.slice(0, 3).map((method, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <span className="text-green-600">•</span>
                              {method}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="environmental" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5" />
                  Current Environmental Conditions
                </CardTitle>
                <CardDescription>
                  Real-time data affecting pest activity - Last updated: {currentWeather.updated.toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Thermometer className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Temperature</p>
                    <p className="text-2xl font-bold text-orange-600">{currentWeather.temperature}°C</p>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Droplets className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Humidity</p>
                    <p className="text-2xl font-bold text-blue-600">{currentWeather.humidity}%</p>
                  </div>
                  
                  <div className="text-center p-4 bg-cyan-50 rounded-lg">
                    <Cloud className="h-8 w-8 text-cyan-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Rainfall</p>
                    <p className="text-2xl font-bold text-cyan-600">{currentWeather.rainfall}mm</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Wind className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Wind Speed</p>
                    <p className="text-2xl font-bold text-gray-600">{currentWeather.windSpeed} km/h</p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Droplets className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Soil Moisture</p>
                    <p className="text-2xl font-bold text-green-600">{currentWeather.soilMoisture}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Risk Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="font-medium">High Humidity Alert</span>
                    </div>
                    <Badge className="bg-red-500">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium">Optimal Temperature for Pests</span>
                    </div>
                    <Badge className="bg-yellow-500">Monitor</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Wind className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Good Air Circulation</span>
                    </div>
                    <Badge className="bg-green-500">Good</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Pest Calendar</CardTitle>
                <CardDescription>Plan your pest management activities throughout the year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Spring', 'Summer', 'Autumn', 'Winter'].map((season, index) => (
                    <div key={season} className="p-4 border rounded-lg">
                      <h3 className="font-semibold text-lg mb-3">{season}</h3>
                      <div className="space-y-2">
                        {mockPestThreats.slice(index, index + 2).map((threat) => (
                          <div key={threat.id} className="text-sm">
                            <div className="flex items-center gap-2">
                              <Bug className="h-3 w-3" />
                              <span className="font-medium">{threat.name}</span>
                            </div>
                            <p className="text-gray-600 ml-5">{threat.peakSeason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prevention" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integrated Pest Management</CardTitle>
                <CardDescription>Comprehensive prevention strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Biological Control</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">•</span>
                        Introduce beneficial insects (ladybugs, parasitic wasps)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">•</span>
                        Use microbial pesticides (Bt, nematodes)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">•</span>
                        Plant companion crops (push-pull system)
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Cultural Control</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        Crop rotation and diversification
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        Proper field sanitation
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        Optimal planting dates
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default PestPrediction;