
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WeatherData } from "@/types/forum";
import { Skeleton } from "@/components/ui/skeleton";
import { CloudSun, CloudRain, Wind, Droplets } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("New York");
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        // In a real application, this would be replaced with your actual weather API call
        // For demo purposes, we'll simulate a successful API response
        const mockWeatherData: WeatherData = {
          location: location,
          current: {
            temp_c: 22,
            condition: {
              text: "Partly cloudy",
              icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"
            },
            wind_kph: 15,
            humidity: 65,
            precip_mm: 0.2
          },
          forecast: {
            forecastday: [
              {
                date: new Date().toISOString().split('T')[0],
                day: {
                  maxtemp_c: 24,
                  mintemp_c: 18,
                  condition: {
                    text: "Partly cloudy",
                    icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"
                  },
                  daily_chance_of_rain: 20
                }
              },
              {
                date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                day: {
                  maxtemp_c: 26,
                  mintemp_c: 17,
                  condition: {
                    text: "Sunny",
                    icon: "//cdn.weatherapi.com/weather/64x64/day/113.png"
                  },
                  daily_chance_of_rain: 0
                }
              },
              {
                date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
                day: {
                  maxtemp_c: 23,
                  mintemp_c: 19,
                  condition: {
                    text: "Light rain",
                    icon: "//cdn.weatherapi.com/weather/64x64/day/296.png"
                  },
                  daily_chance_of_rain: 70
                }
              }
            ]
          }
        };
        
        // Show toast to confirm data is loading
        toast({
          title: "Weather Data",
          description: "Weather data has been loaded successfully for " + location,
        });
        
        // Simulate network delay
        setTimeout(() => {
          setWeather(mockWeatherData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch weather data");
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to fetch weather data",
          variant: "destructive"
        });
      }
    };

    fetchWeather();
  }, [location, toast]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  if (error) {
    return (
      <Card className="bg-white/90 border-red-100">
        <CardContent className="pt-6">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 border-green-100 mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-green-800 flex items-center gap-2">
          <CloudSun className="h-5 w-5" />
          Weather Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : weather ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-medium">{weather.location}</h3>
                <p className="text-gray-500 text-sm">Today's Forecast</p>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  <img 
                    src={`https:${weather.current.condition.icon}`} 
                    alt={weather.current.condition.text}
                    className="h-10 w-10"
                  />
                  <span className="text-2xl ml-1">{weather.current.temp_c}°C</span>
                </div>
                <p className="text-sm text-gray-600">{weather.current.condition.text}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="flex flex-col items-center bg-green-50 p-2 rounded-md">
                <Wind className="h-4 w-4 text-green-600 mb-1" />
                <span className="text-xs text-gray-600">Wind</span>
                <span className="text-sm font-medium">{weather.current.wind_kph} km/h</span>
              </div>
              <div className="flex flex-col items-center bg-green-50 p-2 rounded-md">
                <Droplets className="h-4 w-4 text-green-600 mb-1" />
                <span className="text-xs text-gray-600">Humidity</span>
                <span className="text-sm font-medium">{weather.current.humidity}%</span>
              </div>
              <div className="flex flex-col items-center bg-green-50 p-2 rounded-md">
                <CloudRain className="h-4 w-4 text-green-600 mb-1" />
                <span className="text-xs text-gray-600">Precipitation</span>
                <span className="text-sm font-medium">{weather.current.precip_mm} mm</span>
              </div>
            </div>
            
            <Tabs defaultValue="forecast" className="w-full">
              <TabsList className="bg-green-50 w-full mb-2">
                <TabsTrigger value="forecast" className="flex-1">3-Day Forecast</TabsTrigger>
              </TabsList>
              <TabsContent value="forecast" className="mt-0">
                <div className="grid grid-cols-3 gap-2">
                  {weather.forecast.forecastday.map((day) => (
                    <div key={day.date} className="flex flex-col items-center p-2 border border-green-100 rounded-md">
                      <p className="text-xs font-medium">{formatDate(day.date)}</p>
                      <img 
                        src={`https:${day.day.condition.icon}`} 
                        alt={day.day.condition.text}
                        className="h-8 w-8 my-1"
                      />
                      <div className="flex gap-1 text-xs">
                        <span className="text-gray-800">{day.day.maxtemp_c}°</span>
                        <span className="text-gray-500">{day.day.mintemp_c}°</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <CloudRain className="h-3 w-3 text-blue-500 mr-1" />
                        <span className="text-xs">{day.day.daily_chance_of_rain}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
