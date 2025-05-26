
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getUserLocation, getWeatherData } from "@/services/weatherService";
import { WeatherData } from "@/types/forum";
import { Skeleton } from "@/components/ui/skeleton";
import { CloudSun, CloudRain, Wind, Droplets } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("Loading...");
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");
        
        console.log('Fetching weather data...');
        
        // Get user's location (will fallback to Nairobi)
        const { lat, lon } = await getUserLocation();
        console.log('Location:', lat, lon);
        
        // Get weather data based on location
        const data = await getWeatherData(lat, lon);
        console.log('Weather data:', data);
        
        setWeather(data);
        setLocation(data.location);
        
        if (toast) {
          toast({
            title: "Weather Data",
            description: `Weather data loaded for ${data.location}`,
          });
        }
      } catch (err) {
        console.error("Error in weather component:", err);
        setError("Unable to load weather data");
        
        if (toast) {
          toast({
            title: "Weather Notice",
            description: "Using offline weather data",
            variant: "default"
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [toast]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch (error) {
      console.error('Date formatting error:', error);
      return dateString;
    }
  };

  if (error && !weather) {
    return (
      <Card className="bg-white/90 border-yellow-100">
        <CardContent className="pt-6">
          <p className="text-yellow-600">Weather data temporarily unavailable</p>
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
                  {weather.current.condition.icon && (
                    <img 
                      src={weather.current.condition.icon} 
                      alt={weather.current.condition.text}
                      className="h-10 w-10"
                      onError={(e) => {
                        console.log('Weather icon failed to load');
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
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
                      {day.day.condition.icon && (
                        <img 
                          src={day.day.condition.icon} 
                          alt={day.day.condition.text}
                          className="h-8 w-8 my-1"
                          onError={(e) => {
                            console.log('Forecast icon failed to load');
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
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
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500">Weather data unavailable</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
