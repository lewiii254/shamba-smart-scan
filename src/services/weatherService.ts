
import { toast } from "@/hooks/use-toast";

// API key for OpenWeather
const API_KEY = "eff684b92a05891673901c34dc44d75f";

// Weather data types
export interface WeatherData {
  location: string;
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
    precip_mm: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        daily_chance_of_rain: number;
      };
    }>;
  };
}

// Get user's location based on browser geolocation
export const getUserLocation = (): Promise<{lat: number, lon: number}> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(error);
          toast({
            title: "Location Error",
            description: "Unable to access your location. Using default location.",
            variant: "destructive"
          });
          // Return default coordinates (Nairobi, Kenya)
          resolve({lat: -1.292066, lon: 36.821946});
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      reject(new Error("Geolocation not supported"));
      toast({
        title: "Location Error",
        description: "Geolocation is not supported by your browser. Using default location.",
        variant: "destructive"
      });
      // Return default coordinates (Nairobi, Kenya)
      resolve({lat: -1.292066, lon: 36.821946});
    }
  });
};

// Get current weather and forecast data
export const getWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Get city name from API response
    const locationName = data.city.name;
    
    // Current weather (first item in the list)
    const current = data.list[0];
    
    // Create a structure that matches our WeatherData interface
    const weatherData: WeatherData = {
      location: locationName,
      current: {
        temp_c: Math.round(current.main.temp),
        condition: {
          text: current.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`
        },
        wind_kph: Math.round(current.wind.speed * 3.6), // Convert m/s to km/h
        humidity: current.main.humidity,
        precip_mm: current.rain ? current.rain["3h"] || 0 : 0
      },
      forecast: {
        forecastday: []
      }
    };
    
    // Process forecast data
    // Group by day and extract data for the next 3 days
    const days = new Map();
    
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      
      if (!days.has(date)) {
        days.set(date, {
          temps: [],
          icons: [],
          descriptions: [],
          precipChances: []
        });
      }
      
      const day = days.get(date);
      day.temps.push(item.main.temp);
      day.icons.push(item.weather[0].icon);
      day.descriptions.push(item.weather[0].description);
      day.precipChances.push(item.pop * 100); // Probability of precipitation (0-1)
    });
    
    // Get the next 3 days (including today)
    const dayKeys = Array.from(days.keys()).slice(0, 3);
    
    weatherData.forecast.forecastday = dayKeys.map(date => {
      const dayData = days.get(date);
      
      // Calculate max and min temperatures
      const maxTemp = Math.round(Math.max(...dayData.temps));
      const minTemp = Math.round(Math.min(...dayData.temps));
      
      // Get the most common weather icon and description for the day
      const iconCounts = dayData.icons.reduce((acc: {[key: string]: number}, icon: string) => {
        acc[icon] = (acc[icon] || 0) + 1;
        return acc;
      }, {});
      
      const mostCommonIcon = Object.entries(iconCounts)
        .sort((a, b) => (b[1] as number) - (a[1] as number))[0][0];
      
      const descriptionCounts = dayData.descriptions.reduce((acc: {[key: string]: number}, desc: string) => {
        acc[desc] = (acc[desc] || 0) + 1;
        return acc;
      }, {});
      
      const mostCommonDescription = Object.entries(descriptionCounts)
        .sort((a, b) => (b[1] as number) - (a[1] as number))[0][0];
      
      // Calculate chance of rain (max probability of precipitation)
      const maxPrecipChance = Math.round(Math.max(...dayData.precipChances));
      
      return {
        date,
        day: {
          maxtemp_c: maxTemp,
          mintemp_c: minTemp,
          condition: {
            text: mostCommonDescription,
            icon: `https://openweathermap.org/img/wn/${mostCommonIcon}@2x.png`
          },
          daily_chance_of_rain: maxPrecipChance
        }
      };
    });
    
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    toast({
      title: "Weather Data Error",
      description: "Failed to fetch weather data. Using mock data instead.",
      variant: "destructive"
    });
    
    // Return mock data in case of error
    return getMockWeatherData();
  }
};

// Provide mock weather data as a fallback
const getMockWeatherData = (): WeatherData => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  return {
    location: "Nairobi, Kenya",
    current: {
      temp_c: 24,
      condition: {
        text: "Partly cloudy",
        icon: "https://openweathermap.org/img/wn/02d@2x.png"
      },
      wind_kph: 12,
      humidity: 58,
      precip_mm: 0.1
    },
    forecast: {
      forecastday: [
        {
          date: today.toISOString().split('T')[0],
          day: {
            maxtemp_c: 26,
            mintemp_c: 20,
            condition: {
              text: "Partly cloudy",
              icon: "https://openweathermap.org/img/wn/02d@2x.png"
            },
            daily_chance_of_rain: 15
          }
        },
        {
          date: tomorrow.toISOString().split('T')[0],
          day: {
            maxtemp_c: 27,
            mintemp_c: 19,
            condition: {
              text: "Sunny",
              icon: "https://openweathermap.org/img/wn/01d@2x.png"
            },
            daily_chance_of_rain: 5
          }
        },
        {
          date: dayAfterTomorrow.toISOString().split('T')[0],
          day: {
            maxtemp_c: 25,
            mintemp_c: 18,
            condition: {
              text: "Light rain",
              icon: "https://openweathermap.org/img/wn/10d@2x.png"
            },
            daily_chance_of_rain: 40
          }
        }
      ]
    }
  };
};
